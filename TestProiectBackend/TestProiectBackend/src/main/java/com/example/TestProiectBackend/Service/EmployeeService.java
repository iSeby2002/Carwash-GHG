package com.example.TestProiectBackend.Service;

import com.example.TestProiectBackend.DTO.EditEmployeeProfileRequest;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Transaction;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public interface EmployeeService {
    void Insert(Employee employee);
    void Update(Employee employee);
    void Delete(Employee employee);
    void DeleteById(Integer id);
    ResponseEntity insertEmployee(Employee employee);
    Employee findFirstByEmployeeId(Integer id);
    Iterable<Employee> getAll();
    void addTransaction(Transaction transaction);
    void deleteTransaction(Transaction transaction);
    ResponseEntity editEmployeeProfile(EditEmployeeProfileRequest editEmployeeProfileRequest);
}
