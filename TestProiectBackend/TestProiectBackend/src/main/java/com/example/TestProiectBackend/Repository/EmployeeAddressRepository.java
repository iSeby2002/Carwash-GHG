package com.example.TestProiectBackend.Repository;

import com.example.TestProiectBackend.Model.EmployeeAddress;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeAddressRepository extends CrudRepository<EmployeeAddress, Integer> {
    EmployeeAddress findFirstByEmployeeAddressId(Integer id);
}
