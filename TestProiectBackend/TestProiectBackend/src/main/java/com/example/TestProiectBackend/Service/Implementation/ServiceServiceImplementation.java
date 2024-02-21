package com.example.TestProiectBackend.Service.Implementation;

import com.example.TestProiectBackend.Repository.ServiceRepository;
import com.example.TestProiectBackend.Service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class ServiceServiceImplementation implements ServiceService {

    private final ServiceRepository serviceRepository;

    @Override
    public void Insert(com.example.TestProiectBackend.Model.Service service) {
        serviceRepository.save(service);
    }

    @Override
    public void Update(com.example.TestProiectBackend.Model.Service service) {
        com.example.TestProiectBackend.Model.Service s = serviceRepository.findFirstByServiceId(service.getServiceId());
        if(s != null) {
            s.setServiceName(service.getServiceName());
            s.setDescription(service.getDescription());
            s.setPrice(service.getPrice());
            serviceRepository.save(s);
        }
    }

    @Override
    public void Delete(com.example.TestProiectBackend.Model.Service service) {
        serviceRepository.delete(service);
    }

    @Override
    public void DeleteById(Integer id) {
        serviceRepository.deleteById(id);
    }

    @Override
    public ResponseEntity insertService(com.example.TestProiectBackend.Model.Service service) {
        String serviceName = service.getServiceName();
        String description = service.getDescription();
        Integer price = service.getPrice();

        if(serviceName == null && description == null && price == null){
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(serviceName == null){
            return ResponseEntity.badRequest().body("Service name is required!");
        }else if(description == null){
            return ResponseEntity.badRequest().body("Description is required!");
        }else if(price == null){
            return ResponseEntity.badRequest().body("Price is required!");
        }else if(serviceName.isEmpty() && description.isEmpty()){
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(serviceName.isEmpty()){
            return ResponseEntity.badRequest().body("Service name is required!");
        }else if(description.isEmpty()){
            return ResponseEntity.badRequest().body("Description is required!");
        }else if(!isValidName(serviceName)){
            return ResponseEntity.badRequest().body("Service name is invalid!");
        }else if(!isValidName(description)){
            return ResponseEntity.badRequest().body("Description is invalid!");
        }

        serviceRepository.save(service);

        return ResponseEntity.status(HttpStatus.OK).body(service);
    }

    @Override
    public com.example.TestProiectBackend.Model.Service findFirstByServiceId(Integer id) {
        return serviceRepository.findFirstByServiceId(id);
    }

    @Override
    public Iterable<com.example.TestProiectBackend.Model.Service> getAll() {
        return serviceRepository.findAll();
    }

    @Override
    public ResponseEntity editServiceProfile(com.example.TestProiectBackend.Model.Service service) {
        Integer serviceId = service.getServiceId();
        String serviceName = service.getServiceName();
        String description = service.getDescription();
        Integer price = service.getPrice();

        if(serviceName == null && description == null && price == null){
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(serviceName == null){
            return ResponseEntity.badRequest().body("Service name is required!");
        }else if(description == null){
            return ResponseEntity.badRequest().body("Description is required!");
        }else if(price == null){
            return ResponseEntity.badRequest().body("Price is required!");
        }else if(serviceName.isEmpty() && description.isEmpty()){
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(serviceName.isEmpty()){
            return ResponseEntity.badRequest().body("Service name is required!");
        }else if(description.isEmpty()){
            return ResponseEntity.badRequest().body("Description is required!");
        }else if(!isValidName(serviceName)){
            return ResponseEntity.badRequest().body("Service name is invalid!");
        }else if(!isValidName(description)){
            return ResponseEntity.badRequest().body("Description is invalid!");
        }

        com.example.TestProiectBackend.Model.Service s = serviceRepository.findFirstByServiceId(serviceId);
        s.setServiceName(serviceName);
        s.setDescription(description);
        s.setPrice(price);
        serviceRepository.save(s);

        return ResponseEntity.status(HttpStatus.OK).body(s);
    }

    public boolean isValidName(String name) {
        String regex = "^[A-Za-z ]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(name);
        return matcher.matches();
    }
}
