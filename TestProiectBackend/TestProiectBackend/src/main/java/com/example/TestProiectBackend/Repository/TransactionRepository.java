package com.example.TestProiectBackend.Repository;

import com.example.TestProiectBackend.Model.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Integer> {
    Transaction findFirstByTransactionId(Integer id);
    List<Transaction> findTransactionsByEmployeeId(Integer id);
    List<Transaction> findTransactionsByClientId(Integer id);
    List<Transaction> findTransactionsByServiceId(Integer id);
}
