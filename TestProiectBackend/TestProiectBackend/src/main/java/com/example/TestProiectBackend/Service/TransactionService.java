package com.example.TestProiectBackend.Service;

import com.example.TestProiectBackend.DTO.SignInRequest;
import com.example.TestProiectBackend.DTO.TransactionDetalis;
import com.example.TestProiectBackend.DTO.TransactionDetalisAdmin;
import com.example.TestProiectBackend.Model.Transaction;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public interface TransactionService {
    void Insert(Transaction transaction);
    ResponseEntity Update(Transaction transaction);
    void Delete(Transaction transaction);
    Transaction findFirstByTransactionId(Integer id);
    Iterable<Transaction> getAll();
    Iterable<Transaction> getTransactionsByServiceId(Integer id);
    ResponseEntity makeATransaction(Transaction transaction);
    ResponseEntity deleteTransactionById(Integer id);
    ResponseEntity deleteAllTransactionByClientId(Integer id);
    ResponseEntity deleteAllTransactionByEmployeeId(Integer id);
    ResponseEntity deleteAllTransactionByServiceId(Integer id);
    Iterable<TransactionDetalisAdmin> getPastTransactions();
    Iterable<TransactionDetalisAdmin> getFutureTransactions();
    ResponseEntity getTotalIncome();
}
