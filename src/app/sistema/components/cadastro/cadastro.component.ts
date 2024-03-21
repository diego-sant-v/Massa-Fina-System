import { Component } from '@angular/core';
import { UserRegisterDTO } from '../../services/user/user-register-dto';
import { UserService } from '../../services/user/user-service';
import { ViaCepService } from './via_cep/via-cep.service';
import { formatDate } from '@angular/common';
import { SnackBarService } from 'src/app/components/snack-bar/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  userName: string = ''; 
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  dateOfBirth: string = '';
  street: string = '';
  streetNumber: number = 0;
  cep: string = '';
  gender: string = '';
  neighborhood: string = '';
  complement: string = '';
  locality: string = '';
  uf: string = '';
  dd: number = 0;
  phoneNumber: string = '';
  admin: boolean = false; 
  //LOGIN:
  loginEmail: string = '';
  loginPassword: string = '';
  constructor(private userService: UserService, private viaCepServie: ViaCepService, private matSnackBar: SnackBarService,
    private router: Router) {
    this.dateOfBirth = new Date().toISOString();
  }

  consultarCep(cep: string) {
    if(cep){
      this.viaCepServie.findInformationsCep(cep).subscribe({
        next: (informations) => {
          this.neighborhood = informations.bairro;
          this.locality = informations.localidade;
          this.street = informations.logradouro;
          this.uf = informations.uf;
          
          console.log('Informações do cep:', informations);
        },
        error:(error: any) => {
          console.log('Erro ao consultar cep', error);
        }
      });
    }else{
      return
    }
  }

  register() {
    const userDto = new UserRegisterDTO(
      this.userName,
      this.email,
      this.password,
      this.dateOfBirth,
      this.gender,
      this.street,
      this.streetNumber,
      this.cep,
      this.neighborhood,
      this.complement,
      this.locality,
      this.uf,
      this.dd,
      this.admin,
      this.phoneNumber
    );
    console.log('teste massa', userDto)
    this.userService.registerUser(userDto).subscribe({
      next: () => {
        console.log('Usuário registrado com sucesso');
        this.matSnackBar.openSnackBar("Usuário salvo com sucesso", "X")
      },
      error:(error: any) => {
        console.log('erro ao registrar usuário', error);
      }
    });
  }

  login(){
    this.userService.loginUser(this.loginEmail, this.loginPassword).subscribe({
      next: (result: UserRegisterDTO) => {
        this.loadHomeSistemByTipeUser(result.admin)
        this.matSnackBar.openSnackBar(`Bem vindo, ${result.userName}`, "X")
      },
      error:(error: any) => {
        console.log('erro ao registrar usuário', error);
      }
    });
  }

  loadHomeSistemByTipeUser(isAdmin: Boolean){
    if(isAdmin){
      this.router.navigate(['/admin-home']);
    }else{
      this.router.navigate(['/user-home']);
    }
  }

}
