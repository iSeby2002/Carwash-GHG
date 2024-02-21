package com.example.TestProiectBackend.Controller;

import com.example.TestProiectBackend.DTO.*;
import com.example.TestProiectBackend.Model.Client;
import com.example.TestProiectBackend.Model.Transaction;
import com.example.TestProiectBackend.Service.Implementation.ClientServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/Client")
public class ClientController {

    private final ClientServiceImplementation clientServiceImplementation;

    @PostMapping("/GetById")
    public ResponseEntity readById(@RequestBody Integer id){
        Client client = clientServiceImplementation.findFirstByClientId(id);
        return ResponseEntity.status(HttpStatus.OK).body(client);
    }

    @PostMapping("/GetByEmail")
    public ResponseEntity getByEmail(@RequestBody String email){
        String[] emails = email.split("\"");
        Client client = clientServiceImplementation.findClientByEmail(emails[1]);
        return ResponseEntity.status(HttpStatus.OK).body(client);
    }

    @PostMapping("/Insert")
    public ResponseEntity insert(@RequestBody Client client){
        clientServiceImplementation.Insert(client);
        Client c = clientServiceImplementation.findClientByEmail(client.getEmail());
        return ResponseEntity.status(HttpStatus.OK).body(c);
    }

    @GetMapping("/GetAll")
    public ResponseEntity getAll(){
        Iterable<Client> clients = clientServiceImplementation.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(clients);
    }

    @PostMapping("/Update")
    public ResponseEntity update(@RequestBody Client client){
        clientServiceImplementation.Update(client);
        Client c = clientServiceImplementation.findFirstByClientId(client.getClientId());
        return ResponseEntity.status(HttpStatus.OK).body(c);
    }

    @PostMapping("/DeleteById")
    public void delete(@RequestBody Integer id){
        clientServiceImplementation.DeleteById(id);
    }

    @PostMapping("/SignIn")
    public ResponseEntity signIn(@RequestBody SignInRequest signInRequest){
        return clientServiceImplementation.singIn(signInRequest);
    }

    @PostMapping("/SignUp")
    public ResponseEntity signUp(@RequestBody SignUpRequest signUpRequest){
        return clientServiceImplementation.singUp(signUpRequest);
    }

    @PostMapping("/EditProfile")
    public ResponseEntity editProfile(@RequestBody EditProfileRequest editProfileRequest){
        return clientServiceImplementation.editProfile(editProfileRequest);
    }

    @PostMapping("/ChangePassword")
    public ResponseEntity changePassword(@RequestBody ChangePasswordRequest changePasswordRequest){
        return clientServiceImplementation.changePassword(changePasswordRequest);
    }

    @PostMapping("/GetPastTransactions")
    public ResponseEntity getPastTransactions(@RequestBody Integer id){
        Iterable<TransactionDetalis> transactions = clientServiceImplementation.getPastTransactions(id);
        return ResponseEntity.status(HttpStatus.OK).body(transactions);
    }

    @PostMapping("/GetFutureTransactions")
    public ResponseEntity getFutureTransactions(@RequestBody Integer id){
        Iterable<TransactionDetalis> transactions = clientServiceImplementation.getFutureTransactions(id);
        return ResponseEntity.status(HttpStatus.OK).body(transactions);
    }

    @PostMapping("/UpdateClient")
    public ResponseEntity updateClient(@RequestBody EditClientProfileRequest editClientProfileRequest){
        return clientServiceImplementation.editClientProfile(editClientProfileRequest);
    }
}


