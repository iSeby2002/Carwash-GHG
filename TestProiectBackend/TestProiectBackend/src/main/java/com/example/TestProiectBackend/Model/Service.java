package com.example.TestProiectBackend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer serviceId;
    private String serviceName;
    private String description;
    private Integer price;

    public Service(String serviceName, String description, Integer price) {
        this.serviceName = serviceName;
        this.description = description;
        this.price = price;
    }
}
