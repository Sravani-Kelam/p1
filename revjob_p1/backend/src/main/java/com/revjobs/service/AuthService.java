package com.revjobs.service;

import com.revjobs.dto.*;
import com.revjobs.exception.ResourceNotFoundException;
import com.revjobs.model.User;
import com.revjobs.repository.UserRepository;
import com.revjobs.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setCompanyName(request.getCompanyName());
        user.setPhone(request.getPhone());
        user.setIsActive(true);
        
        user = userRepository.save(user);
        
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, UserDTO.fromUser(user));
    }
    
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        
        if (!user.getIsActive()) {
            throw new RuntimeException("Account is deactivated");
        }
        
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, UserDTO.fromUser(user));
    }
}
