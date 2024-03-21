package com.backend.pizzaria.util;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SecurityConfig {
    public String encryptData(String dataToEncrypt) {
        try {
            // Obter uma instância de MessageDigest para MD5
            MessageDigest md = MessageDigest.getInstance("MD5");

            // Converter a string em bytes e atualizar o MessageDigest
            md.update(dataToEncrypt.getBytes());

            // Obter o hash dos bytes
            byte[] byteData = md.digest();

            // Converter o hash em uma representação hexadecimal
            StringBuilder sb = new StringBuilder();
            for (byte b : byteData) {
                sb.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
            }

            return sb.toString(); // Retorna o hash MD5 como uma string hexadecimal
        } catch (NoSuchAlgorithmException e) {
            // Tratamento de exceção caso o algoritmo MD5 não seja suportado
            e.printStackTrace();
            return null;
        }
    }
}
