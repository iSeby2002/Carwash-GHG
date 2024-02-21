package com.example.TestProiectBackend.Controller;

import com.example.TestProiectBackend.Model.EmployeeAddress;
import com.example.TestProiectBackend.Service.Implementation.EmployeeAddressServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/EmployeeAddress")
public class EmployeeAddressController {

    private final EmployeeAddressServiceImplementation employeeAddressServiceImplementation;

    @PostMapping("/GetById")
    public ResponseEntity readById(@RequestBody Integer id){
        EmployeeAddress employeeAddress = employeeAddressServiceImplementation.findFirstByEmployeeAddressId(id);
        return ResponseEntity.status(HttpStatus.OK).body(employeeAddress);
    }

    @GetMapping("/GetAll")
    public ResponseEntity getAll(){
        Iterable<EmployeeAddress> employeeAddresses = employeeAddressServiceImplementation.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(employeeAddresses);
    }

    @PostMapping("/Insert")
    public void insert(@RequestBody EmployeeAddress employeeAddress){
        employeeAddressServiceImplementation.Insert(employeeAddress);
    }

    @PostMapping("/Update")
    public void update(@RequestBody EmployeeAddress employeeAddress){
        employeeAddressServiceImplementation.Update(employeeAddress);
    }

    @PostMapping("/Delete")
    public void delete(@RequestBody EmployeeAddress employeeAddress){
        employeeAddressServiceImplementation.Delete(employeeAddress);
    }
}
