package com.example.TestProiectBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TransactionDetalisAdmin {
    private Integer transactionId;
    private String transactionDate;
    private String clientFirstName;
    private String clientLastName;
    private String firstName;
    private String lastName;
    private String serviceName;
    private String description;
}
