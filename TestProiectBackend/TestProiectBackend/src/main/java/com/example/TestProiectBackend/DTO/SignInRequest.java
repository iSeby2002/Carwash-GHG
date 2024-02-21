package com.example.TestProiectBackend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignInRequest {
    private String email;
    private String password;
}