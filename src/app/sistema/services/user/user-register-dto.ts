export class UserRegisterDTO {
    public userName: string;
    public email: string;
    public password: string;
    public dateOfBirth: string;
    public gender: string;
    public street: string;
    public streetNumber: number;
    public cep: string;
    public neighborhood: string;
    public complement: string;
    public locality: string;
    public uf: string;
    public dd: number; // Adicionado para corresponder ao campo na tabela
    public admin: boolean;
    public phoneNumber: string; // Adicionado para corresponder ao campo na tabela

    constructor(userName: string, email: string, password: string, dateOfBirth: string,
        gender: string, street: string, streetNumber: number, cep: string, neighborhood: string,
        complement: string, locality: string, uf: string, dd: number, admin: boolean, phoneNumber: string) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.street = street;
        this.streetNumber = streetNumber;
        this.cep = cep;
        this.neighborhood = neighborhood;
        this.complement = complement;
        this.locality = locality;
        this.uf = uf;
        this.dd = dd;
        this.admin = admin;
        this.phoneNumber = phoneNumber;
    }
}
