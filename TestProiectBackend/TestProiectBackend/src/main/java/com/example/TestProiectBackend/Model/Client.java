package com.example.TestProiectBackend.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer clientId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    @OneToMany
    private List<Transaction> transactions;

    public Client(String firstName, String lastName, String email, String password, String phone){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }
}
