package com.example.TestProiectBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EditClientProfileRequest {
    private Integer clientProfileId;
    private String clientProfileFirstName;
    private String clientProfileLastName;
    private String clientProfileEmail;
    private String clientProfilePassword;
    private String clientProfilePhone;
}
