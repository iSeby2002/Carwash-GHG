package com.example.TestProiectBackend.Service;

import com.example.TestProiectBackend.DTO.*;
import com.example.TestProiectBackend.Model.Client;
import com.example.TestProiectBackend.Model.Transaction;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public interface ClientService {
    void Insert(Client client);
    void Update(Client client);
    void Delete(Client client);
    void DeleteById(Integer id);
    Client findFirstByClientId(Integer id);
    Client findClientByEmail(String email);
    Iterable<Client> getAll();
    ResponseEntity singIn(SignInRequest signInRequest);
    ResponseEntity singUp(SignUpRequest signUpRequest);
    ResponseEntity editProfile(EditProfileRequest editProfileRequest);
    ResponseEntity editClientProfile(EditClientProfileRequest editClientProfileRequest);
    void addTransaction(Transaction transaction);
    void deleteTransaction(Transaction transaction);
    ResponseEntity changePassword(ChangePasswordRequest changePasswordRequest);
    Iterable<TransactionDetalis> getPastTransactions(Integer id);
    Iterable<TransactionDetalis> getFutureTransactions(Integer id);
}
