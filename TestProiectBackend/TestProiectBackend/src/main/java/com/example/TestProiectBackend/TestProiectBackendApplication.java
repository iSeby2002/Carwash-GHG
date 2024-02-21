package com.example.TestProiectBackend;

import com.example.TestProiectBackend.Model.Client;
import com.example.TestProiectBackend.Repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

public class TestProiectBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TestProiectBackendApplication.class, args);

		//Client client = new Client(1,"Sebastian","Damian","damiansebastian2002@gmail.com","0770994687");

	}
}
