package com.example.TestProiectBackend.Service;

import com.example.TestProiectBackend.Model.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public interface ServiceService {
    void Insert(Service service);
    void Update(Service service);
    void Delete(Service service);
    void DeleteById(Integer id);
    ResponseEntity insertService(Service service);
    Service findFirstByServiceId(Integer id);
    Iterable<Service> getAll();
    ResponseEntity editServiceProfile(Service service);
}
