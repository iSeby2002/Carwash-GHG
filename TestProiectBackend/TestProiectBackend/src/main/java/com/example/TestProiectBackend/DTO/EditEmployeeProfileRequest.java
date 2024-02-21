package com.example.TestProiectBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EditEmployeeProfileRequest {
    private Integer employeeProfileId;
    private String employeeProfileFirstName;
    private String employeeProfileLastName;
    private Integer employeeProfileSalary;
    private String employeeProfileStreetAddress;
    private String employeeProfileCity;
    private String employeeProfileState;
}
