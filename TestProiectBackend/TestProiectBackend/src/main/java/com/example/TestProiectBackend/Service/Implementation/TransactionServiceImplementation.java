package com.example.TestProiectBackend.Service.Implementation;

import com.example.TestProiectBackend.DTO.TransactionDetalis;
import com.example.TestProiectBackend.DTO.TransactionDetalisAdmin;
import com.example.TestProiectBackend.Model.Client;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Transaction;
import com.example.TestProiectBackend.Repository.TransactionRepository;
import com.example.TestProiectBackend.Service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class TransactionServiceImplementation implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final EmployeeServiceImplementation employeeServiceImplementation;
    private final ClientServiceImplementation clientServiceImplementation;
    private final ServiceServiceImplementation serviceServiceImplementation;

    @Override
    public void Insert(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    @Override
    public ResponseEntity Update(Transaction transaction) {
        Transaction t = transactionRepository.findFirstByTransactionId(transaction.getTransactionId());
        if(t == null) {
            return ResponseEntity.badRequest().body("Transaction doesn't exist!");
        }else{
            clientServiceImplementation.deleteTransaction(t);
            employeeServiceImplementation.deleteTransaction(t);

            Employee e = employeeServiceImplementation.findFirstByEmployeeId(transaction.getEmployeeId());
            List<Transaction> employeeTransactions = e.getTransactions();
            if(!employeeTransactions.isEmpty()) {
                for (Transaction tl : employeeTransactions) {
                    if (tl.getTransactionDate().equals(transaction.getTransactionDate())) {
                        Employee employee = employeeServiceImplementation.findFirstByEmployeeId(transaction.getEmployeeId());
                        return ResponseEntity.badRequest().body(employee.getFirstName() + " " + employee.getLastName() + " is not free on the specified date and time!");
                    }
                }
            }

            Client c = clientServiceImplementation.findFirstByClientId(transaction.getClientId());
            List<Transaction> clientTransactions = c.getTransactions();
            if(!clientTransactions.isEmpty()) {
                for (Transaction tl : clientTransactions) {
                    if (tl.getTransactionDate().equals(transaction.getTransactionDate())) {
                        Client client = clientServiceImplementation.findFirstByClientId(transaction.getClientId());
                        return ResponseEntity.badRequest().body(client.getFirstName() + " " + client.getLastName() + " already has a reservation on the specified date and time!");
                    }
                }
            }
        }

        t.setClientId(transaction.getClientId());
        t.setEmployeeId(transaction.getEmployeeId());
        t.setServiceId(transaction.getServiceId());
        t.setTransactionDate(transaction.getTransactionDate());
        t.setPrice(transaction.getPrice());
        transactionRepository.save(t);

        clientServiceImplementation.addTransaction(t);
        employeeServiceImplementation.addTransaction(t);

        return ResponseEntity.status(HttpStatus.OK).body(t);
    }

    @Override
    public void Delete(Transaction transaction) {
        transactionRepository.delete(transaction);
    }

    @Override
    public Transaction findFirstByTransactionId(Integer id) {
        return transactionRepository.findFirstByTransactionId(id);
    }

    @Override
    public Iterable<Transaction> getAll() {
        List<Transaction> transactions = (List<Transaction>) transactionRepository.findAll();
        Collections.sort(transactions, Comparator.comparing(Transaction::getTransactionDate, new TransactionServiceImplementation.DateComparator()));
        return transactions;
    }

    @Override
    public Iterable<Transaction> getTransactionsByServiceId(Integer id) {
        return transactionRepository.findTransactionsByServiceId(id);
    }

    @Override
    public ResponseEntity makeATransaction(Transaction transaction) {
        System.out.println(transaction);
         if(transaction.getServiceId() == null){
            return ResponseEntity.badRequest().body("Must select a wash type!");
        }else if(transaction.getEmployeeId() == null){
            return ResponseEntity.badRequest().body("Must select an employee!");
        }else if(!validDate(transaction.getTransactionDate())){
            return ResponseEntity.badRequest().body("Can't make a reservation at the current hour or in the past!");
        }else if(transaction.getClientId() == null || transaction.getClientId() == 0){
             return ResponseEntity.badRequest().body("Must select a client!");
         }else{
            List<Transaction> employeeTransactions = transactionRepository.findTransactionsByEmployeeId(transaction.getEmployeeId());
            if(!employeeTransactions.isEmpty()) {
                for (Transaction t : employeeTransactions) {
                    if (t.getTransactionDate().equals(transaction.getTransactionDate())) {
                        Employee employee = employeeServiceImplementation.findFirstByEmployeeId(transaction.getEmployeeId());
                        return ResponseEntity.badRequest().body(employee.getFirstName() + " " + employee.getLastName() + " is not free on the specified date and time!");
                    }
                }
            }

            transactionRepository.save(transaction);
            clientServiceImplementation.addTransaction(transaction);
            employeeServiceImplementation.addTransaction(transaction);
            return ResponseEntity.status(HttpStatus.OK).body(transaction);
        }
    }

    @Override
    public ResponseEntity deleteTransactionById(Integer id) {
        Transaction transaction = transactionRepository.findFirstByTransactionId(id);
        if(transaction == null){
            return ResponseEntity.badRequest().body("Transaction doesn't exist!");
        }

        clientServiceImplementation.deleteTransaction(transaction);
        employeeServiceImplementation.deleteTransaction(transaction);
        transactionRepository.delete(transaction);
        return ResponseEntity.status(HttpStatus.OK).body("Transaction cancellation successful!");
    }

    @Override
    public ResponseEntity deleteAllTransactionByClientId(Integer id) {
        Client client = clientServiceImplementation.findFirstByClientId(id);
        while(!client.getTransactions().isEmpty()){
            ArrayList<Transaction> clientTransactions = (ArrayList<Transaction>) transactionRepository.findTransactionsByClientId(id);
            deleteTransactionById(clientTransactions.get(0).getTransactionId());
        }
        clientServiceImplementation.DeleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Client deleted successfully!");
    }

    @Override
    public ResponseEntity deleteAllTransactionByEmployeeId(Integer id) {
        Employee employee = employeeServiceImplementation.findFirstByEmployeeId(id);
        while(!employee.getTransactions().isEmpty()){
            ArrayList<Transaction> employeeTransactions = (ArrayList<Transaction>) transactionRepository.findTransactionsByEmployeeId(id);
            deleteTransactionById(employeeTransactions.get(0).getTransactionId());
        }
        employeeServiceImplementation.DeleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Employee deleted successfully!");
    }

    @Override
    public ResponseEntity deleteAllTransactionByServiceId(Integer id) {
        ArrayList<Transaction> serviceTransactions = (ArrayList<Transaction>) getTransactionsByServiceId(id);
        while(!serviceTransactions.isEmpty()){
            deleteTransactionById(serviceTransactions.get(0).getTransactionId());
            serviceTransactions = (ArrayList<Transaction>) getTransactionsByServiceId(id);
        }
        serviceServiceImplementation.DeleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Service deleted successfully!");
    }

    @Override
    public Iterable<TransactionDetalisAdmin> getPastTransactions() {
        Iterable<Transaction> transactions = transactionRepository.findAll();;

        List<Transaction> pastTransactions = new ArrayList<>();
        for(Transaction t: transactions){
            if(!isFutureDate(t.getTransactionDate())){
                pastTransactions.add(t);
            }
        }

        Collections.sort(pastTransactions, Comparator.comparing(Transaction::getTransactionDate, new TransactionServiceImplementation.DateComparator()));

        List<TransactionDetalisAdmin> pastTransactionsDetailsAdmin = new ArrayList<>();
        for(Transaction t: pastTransactions){
            Client client = clientServiceImplementation.findFirstByClientId(t.getClientId());
            Employee employee = employeeServiceImplementation.findFirstByEmployeeId(t.getEmployeeId());
            com.example.TestProiectBackend.Model.Service service = serviceServiceImplementation.findFirstByServiceId(t.getServiceId());
            TransactionDetalisAdmin transactionDetalisAdmin = new TransactionDetalisAdmin(t.getTransactionId(), t.getTransactionDate(), client.getFirstName(), client.getLastName(), employee.getFirstName(), employee.getLastName(), service.getServiceName(), service.getDescription());
            pastTransactionsDetailsAdmin.add(transactionDetalisAdmin);
        }

        return pastTransactionsDetailsAdmin;
    }

    @Override
    public Iterable<TransactionDetalisAdmin> getFutureTransactions() {
        Iterable<Transaction> transactions = transactionRepository.findAll();;

        List<Transaction> futureTransactions = new ArrayList<>();
        for(Transaction t: transactions){
            if(isFutureDate(t.getTransactionDate())){
                futureTransactions.add(t);
            }
        }

        Collections.sort(futureTransactions, Comparator.comparing(Transaction::getTransactionDate, new TransactionServiceImplementation.DateComparator()));

        List<TransactionDetalisAdmin> futureTransactionsDetailsAdmin = new ArrayList<>();
        for(Transaction t: futureTransactions){
            Client client = clientServiceImplementation.findFirstByClientId(t.getClientId());
            Employee employee = employeeServiceImplementation.findFirstByEmployeeId(t.getEmployeeId());
            com.example.TestProiectBackend.Model.Service service = serviceServiceImplementation.findFirstByServiceId(t.getServiceId());
            TransactionDetalisAdmin transactionDetalisAdmin = new TransactionDetalisAdmin(t.getTransactionId(), t.getTransactionDate(), client.getFirstName(), client.getLastName(), employee.getFirstName(), employee.getLastName(), service.getServiceName(), service.getDescription());
            futureTransactionsDetailsAdmin.add(transactionDetalisAdmin);
        }

        return futureTransactionsDetailsAdmin;
    }

    @Override
    public ResponseEntity getTotalIncome() {
        Integer totalIncome = 0;
        Iterable<Transaction> transactions = transactionRepository.findAll();;

        List<Transaction> pastTransactions = new ArrayList<>();
        for(Transaction t: transactions){
            if(!isFutureDate(t.getTransactionDate())){
                pastTransactions.add(t);
            }
        }

        for(Transaction t: pastTransactions){
            totalIncome += t.getPrice();
        }

        return ResponseEntity.status(HttpStatus.OK).body(totalIncome);
    }


    public boolean validDate(String date){
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MM yyyy HH");
        String formattedDateTime = currentDateTime.format(formatter);
        String[] currentDateParts = formattedDateTime.split("\\s+");
        int currentDay = Integer.parseInt(currentDateParts[0]);
        int currentMonth = Integer.parseInt(currentDateParts[1]);
        int currentYear = Integer.parseInt(currentDateParts[2]);
        int currentHour = Integer.parseInt(currentDateParts[3]);


        String[] dateParts = date.split("\\s+");
        int day = Integer.parseInt(dateParts[0]);
        int month = Integer.parseInt(dateParts[1]);
        int year = Integer.parseInt(dateParts[2]);
        int hour = Integer.parseInt(dateParts[3]);

        if(year < currentYear)return false;
        else if (year == currentYear) {
            if(month < currentMonth)return false;
            else if (month == currentMonth) {
                if(day < currentDay)return false;
                else if (day == currentDay) {
                    return hour > currentHour;
                }else return true;
            }else return true;
        }else return true;
    }

    public boolean isFutureDate(String date){
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MM yyyy HH");
        String formattedDateTime = currentDateTime.format(formatter);
        String[] currentDateParts = formattedDateTime.split("\\s+");
        int currentDay = Integer.parseInt(currentDateParts[0]);
        int currentMonth = Integer.parseInt(currentDateParts[1]);
        int currentYear = Integer.parseInt(currentDateParts[2]);
        int currentHour = Integer.parseInt(currentDateParts[3]);


        String[] dateParts = date.split("\\s+");
        int day = Integer.parseInt(dateParts[0]);
        int month = Integer.parseInt(dateParts[1]);
        int year = Integer.parseInt(dateParts[2]);
        int hour = Integer.parseInt(dateParts[3]);

        if(year < currentYear)return false;
        else if (year == currentYear) {
            if(month < currentMonth)return false;
            else if (month == currentMonth) {
                if(day < currentDay)return false;
                else if (day == currentDay) {
                    return hour > currentHour;
                }else return true;
            }else return true;
        }else return true;
    }

    private static class DateComparator implements Comparator<String> {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd MM yyyy HH");

        @Override
        public int compare(String date1, String date2) {
            try {
                Date d1 = dateFormat.parse(date1);
                Date d2 = dateFormat.parse(date2);
                return d1.compareTo(d2);
            } catch (ParseException e) {
                e.printStackTrace();
                return 0;
            }
        }
    }

}
