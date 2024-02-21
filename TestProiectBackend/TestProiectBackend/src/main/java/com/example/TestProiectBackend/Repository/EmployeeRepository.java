package com.example.TestProiectBackend.Repository;

import com.example.TestProiectBackend.Model.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Integer> {

    Employee findFirstByEmployeeId(Integer id);
}
