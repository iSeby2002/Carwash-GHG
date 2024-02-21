package com.example.TestProiectBackend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class EmployeeAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer employeeAddressId;
    private String streetAddress;
    private String city;
    private String state;

    public EmployeeAddress(String streetAddress, String city, String state){
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
    }
}
