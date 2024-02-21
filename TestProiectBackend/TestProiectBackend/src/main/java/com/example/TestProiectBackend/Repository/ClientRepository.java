package com.example.TestProiectBackend.Repository;

import com.example.TestProiectBackend.Model.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends CrudRepository<Client, Integer> {
    Client findFirstByClientId(Integer id);
    Client findClientByEmail(String email);
}
