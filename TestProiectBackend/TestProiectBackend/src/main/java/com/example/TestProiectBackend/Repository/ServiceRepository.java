package com.example.TestProiectBackend.Repository;

import com.example.TestProiectBackend.Model.Service;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends CrudRepository<Service, Integer> {
    Service findFirstByServiceId(Integer id);
}
