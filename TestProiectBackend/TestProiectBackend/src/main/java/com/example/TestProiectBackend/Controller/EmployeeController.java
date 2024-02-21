package com.example.TestProiectBackend.Controller;

import com.example.TestProiectBackend.DTO.EditEmployeeProfileRequest;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Service.Implementation.EmployeeServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/Employee")
public class EmployeeController {

    private final EmployeeServiceImplementation employeeServiceImplementation;

    @PostMapping("/GetById")
    public ResponseEntity readById(@RequestBody Integer id){
        Employee employee = employeeServiceImplementation.findFirstByEmployeeId(id);
        return ResponseEntity.status(HttpStatus.OK).body(employee);
    }

    @GetMapping("/GetAll")
    public ResponseEntity getAll(){
        Iterable<Employee> employees = employeeServiceImplementation.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(employees);
    }

    @PostMapping("/Insert")
    public void insert(@RequestBody Employee employee){
        employeeServiceImplementation.Insert(employee);
    }

    @PostMapping("/Update")
    public void update(@RequestBody Employee employee){
        employeeServiceImplementation.Update(employee);
    }

    @PostMapping("/Delete")
    public void delete(@RequestBody Employee employee){
        employeeServiceImplementation.Delete(employee);
    }

    @PostMapping("/UpdateEmployee")
    public ResponseEntity updateEmployee(@RequestBody EditEmployeeProfileRequest editEmployeeProfileRequest){
        return employeeServiceImplementation.editEmployeeProfile(editEmployeeProfileRequest);
    }

    @PostMapping("/InsertEmployee")
    public ResponseEntity insertEmployee(@RequestBody Employee employee){
        return employeeServiceImplementation.insertEmployee(employee);
    }
}
