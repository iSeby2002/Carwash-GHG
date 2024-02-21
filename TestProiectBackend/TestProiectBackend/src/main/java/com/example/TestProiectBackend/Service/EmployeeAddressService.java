package com.example.TestProiectBackend.Service;

import com.example.TestProiectBackend.Model.EmployeeAddress;
import org.springframework.stereotype.Component;

@Component
public interface EmployeeAddressService {
    void Insert(EmployeeAddress employeeAddress);
    void Update(EmployeeAddress employeeAddress);
    void Delete(EmployeeAddress employeeAddress);
    EmployeeAddress findFirstByEmployeeAddressId(Integer id);
    Iterable<EmployeeAddress> getAll();
}
