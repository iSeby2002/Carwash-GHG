package com.example.TestProiectBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditProfileRequest {
    private Integer profileId;
    private String profileFirstName;
    private String profileLastName;
    private String profilePhone;
}
