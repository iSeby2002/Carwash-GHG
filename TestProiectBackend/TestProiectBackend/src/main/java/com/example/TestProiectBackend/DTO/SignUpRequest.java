package com.example.TestProiectBackend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String password;
    private String confirmPassword;
}
