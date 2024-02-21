package com.example.TestProiectBackend.Controller;

import com.example.TestProiectBackend.DTO.EditEmployeeProfileRequest;
import com.example.TestProiectBackend.Model.Service;
import com.example.TestProiectBackend.Service.Implementation.ServiceServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/Service")
public class ServiceController {

    private final ServiceServiceImplementation serviceServiceImplementation;

    @PostMapping("/GetById")
    public ResponseEntity readById(@RequestBody Integer id){
        Service service = serviceServiceImplementation.findFirstByServiceId(id);
        return ResponseEntity.status(HttpStatus.OK).body(service);
    }

    @GetMapping("/GetAll")
    public ResponseEntity getAll(){
        Iterable<Service> services = serviceServiceImplementation.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(services);
    }

    @PostMapping("/Insert")
    public void insert(@RequestBody Service service) {
        serviceServiceImplementation.Insert(service);
    }

    @PostMapping("/Update")
    public void update(@RequestBody Service service) {
        serviceServiceImplementation.Update(service);
    }

    @PostMapping("/Delete")
    public void delete(@RequestBody Service service) {
        serviceServiceImplementation.Delete(service);
    }

    @PostMapping("/UpdateService")
    public ResponseEntity updateService(@RequestBody Service service){
        return serviceServiceImplementation.editServiceProfile(service);
    }

    @PostMapping("/InsertService")
    public ResponseEntity insertService(@RequestBody Service service){
        return serviceServiceImplementation.insertService(service);
    }
}
