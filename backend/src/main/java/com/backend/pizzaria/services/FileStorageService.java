package com.backend.pizzaria.services;

import com.backend.pizzaria.exceptions.FileStorageException;
import com.backend.pizzaria.exceptions.MyFileNotFoundException;
import com.backend.pizzaria.util.FileStorageConfig;
import jakarta.mail.Multipart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {
    private final Path fileStorageLocation;

    @Autowired//serve para injetar no contrutor, evita de Person person = new Person();
    public FileStorageService(FileStorageConfig fileStorageConfig){
        Path path = Paths.get(fileStorageConfig.getUploadDir())
                .toAbsolutePath().normalize();
        this.fileStorageLocation = path;

        try{
            Files.createDirectories(this.fileStorageLocation);
        }catch(Exception e){
          throw new FileStorageException("Could not create the directory where the uploaded files will be stored!!!", e);
        }
    }

    public String storeFile(MultipartFile file){
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            //Filename..txt(preciso validar a extensão)
            if(fileName.contains("..")){
                throw new FileStorageException("Sorry! Filename contains invalid path sequence" + fileName);
            }
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(),targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        }catch (Exception e){
            throw new FileStorageException(
                    "Could not store file" + fileName + ". Please try again!", e);
        }
    }

    public Resource loadFileAsResource(String fileName){
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()){
                return resource;
            }else {
                throw new MyFileNotFoundException("File not found");
            }

        }catch (Exception e){
            throw new MyFileNotFoundException("File not found" + fileName, e);
        }

    }
}
