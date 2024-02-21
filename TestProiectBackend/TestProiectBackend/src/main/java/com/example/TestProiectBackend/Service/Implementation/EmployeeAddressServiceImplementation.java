package com.example.TestProiectBackend.Service.Implementation;

import com.example.TestProiectBackend.Model.EmployeeAddress;
import com.example.TestProiectBackend.Repository.EmployeeAddressRepository;
import com.example.TestProiectBackend.Service.EmployeeAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeAddressServiceImplementation implements EmployeeAddressService {

    private final EmployeeAddressRepository employeeAddressRepository;

    @Override
    public void Insert(EmployeeAddress employeeAddress) {

        employeeAddressRepository.save(employeeAddress);
    }

    @Override
    public void Update(EmployeeAddress employeeAddress) {

        EmployeeAddress ea = employeeAddressRepository.findFirstByEmployeeAddressId(employeeAddress.getEmployeeAddressId());
        if(ea != null) {
            ea.setStreetAddress(employeeAddress.getStreetAddress());
            ea.setCity(employeeAddress.getCity());
            ea.setState(employeeAddress.getState());
            employeeAddressRepository.save(ea);
        }
    }

    @Override
    public void Delete(EmployeeAddress employeeAddress) {

        employeeAddressRepository.delete(employeeAddress);
    }

    @Override
    public EmployeeAddress findFirstByEmployeeAddressId(Integer id) {

        return employeeAddressRepository.findFirstByEmployeeAddressId(id);
    }

    @Override
    public Iterable<EmployeeAddress> getAll() {
        return employeeAddressRepository.findAll();
    }
}
