package com.example.TestProiectBackend.Controller;

import com.example.TestProiectBackend.DTO.TransactionDetalis;
import com.example.TestProiectBackend.DTO.TransactionDetalisAdmin;
import com.example.TestProiectBackend.Model.Transaction;
import com.example.TestProiectBackend.Service.Implementation.TransactionServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/Transaction")
public class TransactionController {

    private final TransactionServiceImplementation transactionServiceImplementation;

    @PostMapping("/GetById")
    public ResponseEntity readById(@RequestBody Integer id){
        Transaction transaction = transactionServiceImplementation.findFirstByTransactionId(id);
        return ResponseEntity.status(HttpStatus.OK).body(transaction);
    }

    @GetMapping("/GetAll")
    public ResponseEntity getAll(){
        Iterable<Transaction> transactions = transactionServiceImplementation.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(transactions);
    }

    @PostMapping("/Insert")
    public ResponseEntity insert(@RequestBody Transaction transaction){
        return transactionServiceImplementation.makeATransaction(transaction);
    }

    @PostMapping("/Update")
    public ResponseEntity update(@RequestBody Transaction transaction){
        return transactionServiceImplementation.Update(transaction);
    }

    @PostMapping("/Delete")
    public void delete(@RequestBody Transaction transaction){
        transactionServiceImplementation.Delete(transaction);
    }

    @PostMapping("/DeleteById")
    public ResponseEntity deleteById(@RequestBody Integer id){
        return transactionServiceImplementation.deleteTransactionById(id);
    }

    @PostMapping("/DeleteClient")
    public ResponseEntity deleteClient(@RequestBody Integer id){
        return transactionServiceImplementation.deleteAllTransactionByClientId(id);
    }

    @PostMapping("/DeleteEmployee")
    public ResponseEntity deleteEmployee(@RequestBody Integer id){
        return transactionServiceImplementation.deleteAllTransactionByEmployeeId(id);
    }

    @PostMapping("/DeleteService")
    public ResponseEntity deleteService(@RequestBody Integer id){
        return transactionServiceImplementation.deleteAllTransactionByServiceId(id);
    }

    @PostMapping("/GetAllTransactionsByServiceId")
    public ResponseEntity getAllTransactionsByServiceId(@RequestBody Integer id){
        return ResponseEntity.status(HttpStatus.OK).body(transactionServiceImplementation.getTransactionsByServiceId(id));
    }

    @GetMapping("/GetTotalIncome")
    public ResponseEntity getTotalIncome(){
        return transactionServiceImplementation.getTotalIncome();
    }

    @GetMapping("/GetAllPastTransactions")
    public ResponseEntity getPastTransactions(){
        Iterable<TransactionDetalisAdmin> transactions = transactionServiceImplementation.getPastTransactions();
        return ResponseEntity.status(HttpStatus.OK).body(transactions);
    }

    @GetMapping("/GetAllFutureTransactions")
    public ResponseEntity getFutureTransactions(){
        Iterable<TransactionDetalisAdmin> transactions = transactionServiceImplementation.getFutureTransactions();
        return ResponseEntity.status(HttpStatus.OK).body(transactions);
    }
}
