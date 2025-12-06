package com.revjob.backend;

import com.revjob.backend.entity.User;
import com.revjob.backend.repository.UserRepository;
import com.revjob.backend.service.AuthService;
import com.revjob.backend.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @Mock
    private JwtService jwtService;
    
    @InjectMocks
    private AuthService authService;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
    @Test
    void testRegisterSuccess() {
        User user = new User("test@example.com", "password", "John", "Doe", User.Role.JOB_SEEKER);
        
        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        
        User result = authService.register(user);
        
        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
        verify(userRepository).save(any(User.class));
    }
    
    @Test
    void testLoginSuccess() {
        User user = new User("test@example.com", "encodedPassword", "John", "Doe", User.Role.JOB_SEEKER);
        
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "encodedPassword")).thenReturn(true);
        when(jwtService.generateToken("test@example.com")).thenReturn("token");
        
        String token = authService.login("test@example.com", "password");
        
        assertEquals("token", token);
    }
}