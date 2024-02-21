package com.example.TestProiectBackend.Service.Implementation;

import com.example.TestProiectBackend.DTO.EditEmployeeProfileRequest;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.EmployeeAddress;
import com.example.TestProiectBackend.Model.Transaction;
import com.example.TestProiectBackend.Repository.EmployeeAddressRepository;
import com.example.TestProiectBackend.Repository.EmployeeRepository;
import com.example.TestProiectBackend.Service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImplementation implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeAddressRepository employeeAddressRepository;

    @Override
    public void Insert(Employee employee) {
        employeeAddressRepository.save(employee.getEmployeeAddress());
        employeeRepository.save(employee);
    }

    @Override
    public void Update(Employee employee) {
        Employee e = employeeRepository.findFirstByEmployeeId(employee.getEmployeeId());
        EmployeeAddress employeeAddress = employeeAddressRepository.findFirstByEmployeeAddressId(employee.getEmployeeAddress().getEmployeeAddressId());
        if(e != null && employeeAddress != null) {
            e.setFirstName(employee.getFirstName());
            e.setLastName(employee.getLastName());
            e.setSalary(employee.getSalary());
            e.setDisponibility(employee.getDisponibility());

            employeeAddress.setStreetAddress(employee.getEmployeeAddress().getStreetAddress());
            employeeAddress.setCity(employee.getEmployeeAddress().getCity());
            employeeAddress.setState(employee.getEmployeeAddress().getState());
            employeeAddressRepository.save(employeeAddress);

            e.setEmployeeAddress(employeeAddress);
            employeeRepository.save(e);
        }
    }

    @Override
    public void Delete(Employee employee) {
        employeeRepository.delete(employee);
        employeeAddressRepository.delete(employee.getEmployeeAddress());
    }

    @Override
    public void DeleteById(Integer id) {
        Employee employee = employeeRepository.findFirstByEmployeeId(id);
        employeeRepository.deleteById(id);
        employeeAddressRepository.delete(employee.getEmployeeAddress());
    }

    @Override
    public ResponseEntity insertEmployee(Employee employee) {
        String firstName = employee.getFirstName();
        String lastName = employee.getLastName();
        Integer salary = employee.getSalary();
        String streetAddress = employee.getEmployeeAddress().getStreetAddress();
        String city = employee.getEmployeeAddress().getCity();
        String state = employee.getEmployeeAddress().getState();

        if (firstName == null && lastName == null && salary == null && streetAddress == null && city == null && state == null) {
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(firstName == null){
            return ResponseEntity.badRequest().body("First name is required!");
        }else if(lastName == null){
            return ResponseEntity.badRequest().body("Last name is required!");
        }else if(salary == null){
            return ResponseEntity.badRequest().body("Salary is required!");
        }else if(streetAddress == null) {
            return ResponseEntity.badRequest().body("Street Address is required!");
        }else if(city == null) {
            return ResponseEntity.badRequest().body("City is required!");
        }else if(state == null) {
            return ResponseEntity.badRequest().body("State is required!");
        }else if (firstName.isEmpty() && lastName.isEmpty() && streetAddress.isEmpty() && city.isEmpty() && state.isEmpty()) {
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(firstName.isEmpty()){
            return ResponseEntity.badRequest().body("First name is required!");
        }else if(lastName.isEmpty()){
            return ResponseEntity.badRequest().body("Last name is required!");
        }else if(streetAddress.isEmpty()){
            return ResponseEntity.badRequest().body("Street Address is required!");
        }else if(city.isEmpty()){
            return ResponseEntity.badRequest().body("City is required!");
        }else if(state.isEmpty()){
            return ResponseEntity.badRequest().body("State is required!");
        }else if(!isValidName(firstName)){
            return ResponseEntity.badRequest().body("First name is invalid!");
        }else if(!isValidName(lastName)){
            return ResponseEntity.badRequest().body("Last name is invalid!");
        }else if(!isValidStreetAddress(streetAddress)){
            return ResponseEntity.badRequest().body("Street Address is invalid!");
        }else if(!isValidStateOrCity(city)){
            return ResponseEntity.badRequest().body("City is invalid!");
        }else if(!isValidStateOrCity(state)){
            return ResponseEntity.badRequest().body("State is invalid!");
        }

        employeeAddressRepository.save(employee.getEmployeeAddress());
        employeeRepository.save(employee);
        return ResponseEntity.status(HttpStatus.OK).body(employee);
    }

    @Override
    public Employee findFirstByEmployeeId(Integer id) {
        return employeeRepository.findFirstByEmployeeId(id);
    }

    @Override
    public Iterable<Employee> getAll() {
        return employeeRepository.findAll();
    }

    @Override
    public void addTransaction(Transaction transaction) {
        Employee employee = employeeRepository.findFirstByEmployeeId(transaction.getEmployeeId());
        List<Transaction> transactions = employee.getTransactions();
        transactions.add(transaction);
        employee.setTransactions(transactions);
        employeeRepository.save(employee);
    }

    @Override
    public void deleteTransaction(Transaction transaction) {
        Employee employee = employeeRepository.findFirstByEmployeeId(transaction.getEmployeeId());
        List<Transaction> transactions = employee.getTransactions();
        transactions.remove(transaction);
        employee.setTransactions(transactions);
        employeeRepository.save(employee);
    }

    @Override
    public ResponseEntity editEmployeeProfile(EditEmployeeProfileRequest editEmployeeProfileRequest) {
        Integer employeeId = editEmployeeProfileRequest.getEmployeeProfileId();
        String firstName = editEmployeeProfileRequest.getEmployeeProfileFirstName();
        String lastName = editEmployeeProfileRequest.getEmployeeProfileLastName();
        Integer salary = editEmployeeProfileRequest.getEmployeeProfileSalary();
        String streetAddress = editEmployeeProfileRequest.getEmployeeProfileStreetAddress();
        String city = editEmployeeProfileRequest.getEmployeeProfileCity();
        String state = editEmployeeProfileRequest.getEmployeeProfileState();

        if (firstName == null && lastName == null && salary == null && streetAddress == null && city == null && state == null) {
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(firstName == null){
            return ResponseEntity.badRequest().body("First name is required!");
        }else if(lastName == null){
            return ResponseEntity.badRequest().body("Last name is required!");
        }else if(salary == null){
            return ResponseEntity.badRequest().body("Salary is required!");
        }else if(streetAddress == null) {
            return ResponseEntity.badRequest().body("Street Address is required!");
        }else if(city == null) {
            return ResponseEntity.badRequest().body("City is required!");
        }else if(state == null) {
            return ResponseEntity.badRequest().body("State is required!");
        }else if (firstName.isEmpty() && lastName.isEmpty() && streetAddress.isEmpty() && city.isEmpty() && state.isEmpty()) {
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(firstName.isEmpty()){
            return ResponseEntity.badRequest().body("First name is required!");
        }else if(lastName.isEmpty()){
            return ResponseEntity.badRequest().body("Last name is required!");
        }else if(streetAddress.isEmpty()){
            return ResponseEntity.badRequest().body("Street Address is required!");
        }else if(city.isEmpty()){
            return ResponseEntity.badRequest().body("City is required!");
        }else if(state.isEmpty()){
            return ResponseEntity.badRequest().body("State is required!");
        }else if(!isValidName(firstName)){
            return ResponseEntity.badRequest().body("First name is invalid!");
        }else if(!isValidName(lastName)){
            return ResponseEntity.badRequest().body("Last name is invalid!");
        }else if(!isValidStreetAddress(streetAddress)){
            return ResponseEntity.badRequest().body("Street Address is invalid!");
        }else if(!isValidStateOrCity(city)){
            return ResponseEntity.badRequest().body("City is invalid!");
        }else if(!isValidStateOrCity(state)){
            return ResponseEntity.badRequest().body("State is invalid!");
        }

        Employee employee = employeeRepository.findFirstByEmployeeId(employeeId);
        EmployeeAddress employeeAddress = employeeAddressRepository.findFirstByEmployeeAddressId(employee.getEmployeeAddress().getEmployeeAddressId());

        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        employee.setSalary(salary);

        employeeAddress.setStreetAddress(streetAddress);
        employeeAddress.setCity(city);
        employeeAddress.setState(state);
        employeeAddressRepository.save(employeeAddress);

        employee.setEmployeeAddress(employeeAddress);
        employeeRepository.save(employee);


        return ResponseEntity.status(HttpStatus.OK).body(employee);
    }

    public boolean isValidName(String name) {
        String regex = "^[A-Za-z ]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(name);
        return matcher.matches();
    }

    public boolean isValidStateOrCity(String stateOrCity) {
        String regex = "^[A-Za-z\\-' ]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(stateOrCity);
        return matcher.matches();
    }

    public boolean isValidStreetAddress(String streetAddress) {
        String regex = "^[A-Za-z0-9.,\\-'\" ]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(streetAddress);
        return matcher.matches();
    }
}
