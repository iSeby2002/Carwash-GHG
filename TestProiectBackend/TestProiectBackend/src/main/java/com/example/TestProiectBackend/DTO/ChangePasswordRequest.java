package com.example.TestProiectBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChangePasswordRequest {
    private Integer clientId;
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;
}
