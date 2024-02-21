package com.example.TestProiectBackend.Service.Implementation;

import com.example.TestProiectBackend.DTO.*;
import com.example.TestProiectBackend.Model.Client;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Transaction;
import com.example.TestProiectBackend.Repository.ClientRepository;
import com.example.TestProiectBackend.Service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
@RequiredArgsConstructor
public class ClientServiceImplementation implements ClientService {

    private final ClientRepository clientRepository;
    private final EmployeeServiceImplementation employeeServiceImplementation;
    private final ServiceServiceImplementation serviceServiceImplementation;

    @Override
    public void Insert(Client client){
        clientRepository.save(client);
    }

    @Override
    public void Update(Client client) {
        Client c = clientRepository.findFirstByClientId(client.getClientId());
        if(c != null) {
            c.setFirstName(client.getFirstName());
            c.setLastName(client.getLastName());
            c.setEmail(client.getEmail());
            c.setPassword(client.getPassword());
            c.setPhone(client.getPhone());
            clientRepository.save(c);
        }
    }

    @Override
    public void Delete(Client client) {
        clientRepository.delete(client);
    }

    @Override
    public void DeleteById(Integer id) {
        clientRepository.deleteById(id);
    }

    @Override
    public Client findFirstByClientId(Integer id){
        return clientRepository.findFirstByClientId(id);
    }

    @Override
    public Client findClientByEmail(String email) {
        return clientRepository.findClientByEmail(email);
    }

    @Override
    public Iterable<Client> getAll() {
        ArrayList<Client> clients = (ArrayList<Client>) clientRepository.findAll();
        clients.remove(0);
        return clients;
    }

    @Override
    public ResponseEntity singIn(SignInRequest signInRequest) {
        String email = signInRequest.getEmail();
        String password = signInRequest.getPassword();

        if (email.isEmpty() && password.isEmpty()) {
            return ResponseEntity.badRequest().body("Email and password are required!");
        }else if(email.isEmpty()){
            return ResponseEntity.badRequest().body("Email is required!");
        }else if(password.isEmpty()){
            return ResponseEntity.badRequest().body("Password is required!");
        }else if(!isValidEmail(email) && !email.equals("admin")){
            return ResponseEntity.badRequest().body("Email is invalid!");
        }

        Client client = clientRepository.findClientByEmail(email);

        if (client == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email doesn't exist!");
        }

        if (!(password.equals(client.getPassword()))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password!");
        }

        if (email.equals("admin")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ADMIN ONLY");
        }

        return ResponseEntity.ok(client);
    }

    @Override
    public ResponseEntity singUp(SignUpRequest signUpRequest) {
        String firstName = signUpRequest.getFirstName();
        String lastName = signUpRequest.getLastName();
        String phone = signUpRequest.getPhone();
        String email = signUpRequest.getEmail();
        String password = signUpRequest.getPassword();
        String confirmPassword = signUpRequest.getConfirmPassword();

        if (firstName.isEmpty() && lastName.isEmpty() && phone.isEmpty() && email.isEmpty() && password.isEmpty() && confirmPassword.isEmpty()) {
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(firstName.isEmpty()){
            return ResponseEntity.badRequest().body("First name is required!");
        }else if(lastName.isEmpty()){
            return ResponseEntity.badRequest().body("Last name is required!");
        }else if(phone.isEmpty()){
            return ResponseEntity.badRequest().body("Phone is required!");
        }else if(email.isEmpty()){
            return ResponseEntity.badRequest().body("Email is required!");
        }else if(password.isEmpty()){
            return ResponseEntity.badRequest().body("Password is required!");
        }else if(confirmPassword.isEmpty()){
            return ResponseEntity.badRequest().body("Confirm password is required!");
        }else if(!isValidName(firstName)){
            return ResponseEntity.badRequest().body("First name is invalid!");
        }else if(!isValidName(lastName)){
            return ResponseEntity.badRequest().body("Last name is invalid!");
        }else if(!isValidPhone(phone)){
            return ResponseEntity.badRequest().body("Phone is invalid!");
        }else if(!isValidEmail(email)){
            return ResponseEntity.badRequest().body("Email is invalid!");
        }

        Client client = clientRepository.findClientByEmail(email);

        if (client != null) {
            return ResponseEntity.status(HttpStatus.FOUND).body("Account with this email already exist!");
        }

        if (!(password.equals(confirmPassword))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password and confirm password doesn't match!");
        }

        Client newClient = new Client(firstName, lastName, email, password, phone);
        clientRepository.save(newClient);
        client = clientRepository.findClientByEmail(newClient.getEmail());
        return ResponseEntity.status(HttpStatus.OK).body(client);
    }

    @Override
    public ResponseEntity editProfile(EditProfileRequest editProfileRequest) {
        Integer clientId = editProfileRequest.getProfileId();
        String firstName = editProfileRequest.getProfileFirstName();
        String lastName = editProfileRequest.getProfileLastName();
        String phone = editProfileRequest.getProfilePhone();

        System.out.println(editProfileRequest);

        if (firstName == null && lastName == null && phone == null) {
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(firstName == null){
            return ResponseEntity.badRequest().body("First name is required!");
        }else if(lastName == null){
            return ResponseEntity.badRequest().body("Last name is required!");
        }else if(phone == null){
            return ResponseEntity.badRequest().body("Phone is required!");
        }else if (firstName.isEmpty() && lastName.isEmpty() && phone.isEmpty()) {
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(firstName.isEmpty()){
            return ResponseEntity.badRequest().body("First name is required!");
        }else if(lastName.isEmpty()){
            return ResponseEntity.badRequest().body("Last name is required!");
        }else if(phone.isEmpty()){
            return ResponseEntity.badRequest().body("Phone is required!");
        }else if(!isValidName(firstName)){
            return ResponseEntity.badRequest().body("First name is invalid!");
        }else if(!isValidName(lastName)){
            return ResponseEntity.badRequest().body("Last name is invalid!");
        }else if(!isValidPhone(phone)){
            return ResponseEntity.badRequest().body("Phone is invalid!");
        }

        Client client = clientRepository.findFirstByClientId(clientId);
        client.setFirstName(firstName);
        client.setLastName(lastName);
        client.setPhone(phone);
        clientRepository.save(client);

        return ResponseEntity.status(HttpStatus.OK).body(client);
    }

    @Override
    public ResponseEntity editClientProfile(EditClientProfileRequest editClientProfileRequest) {
        Integer clientId = editClientProfileRequest.getClientProfileId();
        String firstName = editClientProfileRequest.getClientProfileFirstName();
        String lastName = editClientProfileRequest.getClientProfileLastName();
        String phone = editClientProfileRequest.getClientProfilePhone();
        String email = editClientProfileRequest.getClientProfileEmail();
        String password = editClientProfileRequest.getClientProfilePassword();

        if (firstName == null && lastName == null && phone == null && email == null && password == null) {
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(firstName == null){
            return ResponseEntity.badRequest().body("First name is required!");
        }else if(lastName == null){
            return ResponseEntity.badRequest().body("Last name is required!");
        }else if(phone == null){
            return ResponseEntity.badRequest().body("Phone is required!");
        }else if(email == null) {
            return ResponseEntity.badRequest().body("Email is required!");
        }else if(password == null) {
            return ResponseEntity.badRequest().body("Password is required!");
        }else if (firstName.isEmpty() && lastName.isEmpty() && phone.isEmpty() && email.isEmpty() && password.isEmpty()) {
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(firstName.isEmpty()){
            return ResponseEntity.badRequest().body("First name is required!");
        }else if(lastName.isEmpty()){
            return ResponseEntity.badRequest().body("Last name is required!");
        }else if(phone.isEmpty()){
            return ResponseEntity.badRequest().body("Phone is required!");
        }else if(email.isEmpty()){
            return ResponseEntity.badRequest().body("Email is required!");
        }else if(password.isEmpty()){
            return ResponseEntity.badRequest().body("Password is required!");
        }else if(!isValidName(firstName)){
            return ResponseEntity.badRequest().body("First name is invalid!");
        }else if(!isValidName(lastName)){
            return ResponseEntity.badRequest().body("Last name is invalid!");
        }else if(!isValidPhone(phone)){
            return ResponseEntity.badRequest().body("Phone is invalid!");
        }else if(!isValidEmail(email)){
            return ResponseEntity.badRequest().body("Email is invalid!");
        }

        Client client = clientRepository.findFirstByClientId(clientId);

        if (!client.getEmail().equals(email)) {
            Client c = clientRepository.findClientByEmail(email);
            if(c != null) {
                return ResponseEntity.status(HttpStatus.FOUND).body("Account with this email already exist!");
            }
        }

        client.setFirstName(firstName);
        client.setLastName(lastName);
        client.setPhone(phone);
        client.setEmail(email);
        client.setPassword(password);
        clientRepository.save(client);

        return ResponseEntity.status(HttpStatus.OK).body(client);
    }

    @Override
    public void addTransaction(Transaction transaction) {
        Client client = clientRepository.findFirstByClientId(transaction.getClientId());
        List<Transaction> transactions = client.getTransactions();
        transactions.add(transaction);
        client.setTransactions(transactions);
        clientRepository.save(client);
    }

    @Override
    public void deleteTransaction(Transaction transaction) {
        Client client = clientRepository.findFirstByClientId(transaction.getClientId());
        List<Transaction> transactions = client.getTransactions();
        transactions.remove(transaction);
        client.setTransactions(transactions);
        clientRepository.save(client);
    }

    @Override
    public ResponseEntity changePassword(ChangePasswordRequest changePasswordRequest) {
        Integer clientId = changePasswordRequest.getClientId();
        String currentPassword = changePasswordRequest.getCurrentPassword();
        String newPassword = changePasswordRequest.getNewPassword();
        String confirmPassword = changePasswordRequest.getConfirmPassword();

        if(currentPassword == null && newPassword == null && confirmPassword == null){
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(currentPassword == null){
            return ResponseEntity.badRequest().body("Current password field is required!");
        }else if(newPassword == null){
            return ResponseEntity.badRequest().body("New password field is required!");
        }else if(confirmPassword == null){
            return ResponseEntity.badRequest().body("Confirm password field is required!");
        }else if(currentPassword.isEmpty() && newPassword.isEmpty() && confirmPassword.isEmpty()){
            return ResponseEntity.badRequest().body("All fields are required!");
        }else if(currentPassword.isEmpty()){
            return ResponseEntity.badRequest().body("Current password field is required!");
        }else if(newPassword.isEmpty()){
            return ResponseEntity.badRequest().body("New password field is required!");
        }else if(confirmPassword.isEmpty()){
            return ResponseEntity.badRequest().body("Confirm password field is required!");
        }

        Client client = clientRepository.findFirstByClientId(clientId);

        if(!client.getPassword().equals(currentPassword)){
            return ResponseEntity.badRequest().body("Password entered in the \"Current Password\" field doesn't match the current password!");
        }else if(!newPassword.equals(confirmPassword)){
            return ResponseEntity.badRequest().body("Confirm password doesn't match the new password!");
        }else if(client.getPassword().equals(newPassword)){
            return ResponseEntity.badRequest().body("New password can't be the same as the current password!");
        }

        client.setPassword(newPassword);
        clientRepository.save(client);

        return ResponseEntity.status(HttpStatus.OK).body("Password changed with success!");
    }

    @Override
    public Iterable<TransactionDetalis> getPastTransactions(Integer id) {
        Client client = clientRepository.findFirstByClientId(id);
        Iterable<Transaction> transactions = client.getTransactions();

        List<Transaction> pastTransactions = new ArrayList<>();
        for(Transaction t: transactions){
            if(!isFutureDate(t.getTransactionDate())){
                pastTransactions.add(t);
            }
        }

        Collections.sort(pastTransactions, Comparator.comparing(Transaction::getTransactionDate, new DateComparator()));

        List<TransactionDetalis> pastTransactionsDetails = new ArrayList<>();
        for(Transaction t: pastTransactions){
            Employee employee = employeeServiceImplementation.findFirstByEmployeeId(t.getEmployeeId());
            com.example.TestProiectBackend.Model.Service service = serviceServiceImplementation.findFirstByServiceId(t.getServiceId());
            TransactionDetalis transactionDetalis = new TransactionDetalis(t.getTransactionId(), t.getTransactionDate(), employee.getFirstName(), employee.getLastName(), service.getServiceName(), service.getDescription());
            pastTransactionsDetails.add(transactionDetalis);
        }

        return pastTransactionsDetails;
    }

    @Override
    public Iterable<TransactionDetalis> getFutureTransactions(Integer id) {
        Client client = clientRepository.findFirstByClientId(id);
        Iterable<Transaction> transactions = client.getTransactions();

        List<Transaction> futureTransactions = new ArrayList<>();
        for(Transaction t: transactions){
            if(isFutureDate(t.getTransactionDate())){
                futureTransactions.add(t);
            }
        }

        Collections.sort(futureTransactions, Comparator.comparing(Transaction::getTransactionDate, new DateComparator()));

        List<TransactionDetalis> futureTransactionsDetails = new ArrayList<>();
        for(Transaction t: futureTransactions){
            Employee employee = employeeServiceImplementation.findFirstByEmployeeId(t.getEmployeeId());
            com.example.TestProiectBackend.Model.Service service = serviceServiceImplementation.findFirstByServiceId(t.getServiceId());
            TransactionDetalis transactionDetalis = new TransactionDetalis(t.getTransactionId(), t.getTransactionDate(), employee.getFirstName(), employee.getLastName(), service.getServiceName(), service.getDescription());
            futureTransactionsDetails.add(transactionDetalis);
        }

        return futureTransactionsDetails;
    }

    public boolean isValidName(String name) {
        String nameRegex = "^[A-Za-z ]+$";
        Pattern pattern = Pattern.compile(nameRegex);
        Matcher matcher = pattern.matcher(name);
        return matcher.matches();
    }

    public boolean isValidPhone(String phone) {
        String phoneRegex = "^(?:\\+40|0)[1-9][0-9]{8}$";
        Pattern pattern = Pattern.compile(phoneRegex);
        Matcher matcher = pattern.matcher(phone);
        return matcher.matches();
    }

    public boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
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


