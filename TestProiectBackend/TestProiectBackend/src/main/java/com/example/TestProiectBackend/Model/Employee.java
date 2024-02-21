package com.example.TestProiectBackend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer employeeId;
    private String firstName;
    private String lastName;
    private Integer salary;
    private Boolean disponibility;
    @OneToOne(fetch = FetchType.EAGER)
    private EmployeeAddress employeeAddress;
    @OneToMany
    private List<Transaction> transactions;

    public Employee(String firstName, String lastName, Integer salary, Boolean disponibility, EmployeeAddress employeeAddress) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.disponibility = disponibility;
        this.employeeAddress = employeeAddress;
    }
}
