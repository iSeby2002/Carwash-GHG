package com.example.TestProiectBackend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer transactionId;
    private Integer clientId;
    private Integer employeeId;
    private Integer serviceId;
    private String transactionDate;
    private Integer price;

    public Transaction(Integer clientId, Integer employeeId, Integer serviceId, String transactionDate, Integer price) {
        this.clientId = clientId;
        this.employeeId = employeeId;
        this.serviceId = serviceId;
        this.transactionDate = transactionDate;
        this.price = price;
    }
}
