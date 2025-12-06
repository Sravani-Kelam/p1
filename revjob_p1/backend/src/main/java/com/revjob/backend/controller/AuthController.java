package com.revjob.backend.controller;

import com.revjob.backend.entity.User;
import com.revjob.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = new User(
                request.getEmail(),
                request.getPassword(),
                request.getFirstName(),
                request.getLastName(),
                User.Role.valueOf(request.getRole())
            );
            
            User savedUser = authService.register(user);
            return ResponseEntity.ok(new AuthResponse("User registered successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse(e.getMessage(), null));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = authService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(new AuthResponse("Login successful", token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse(e.getMessage(), null));
        }
    }
    
    public static class RegisterRequest {
        private String email;
        private String password;
        private String firstName;
        private String lastName;
        private String role;
        
        // Getters and Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }
    
    public static class LoginRequest {
        private String email;
        private String password;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    public static class AuthResponse {
        private String message;
        private String token;
        
        public AuthResponse(String message, String token) {
            this.message = message;
            this.token = token;
        }
        
        public String getMessage() { return message; }
        public String getToken() { return token; }
    }
}