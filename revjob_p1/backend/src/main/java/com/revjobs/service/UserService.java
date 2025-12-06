package com.revjobs.service;

import com.revjobs.dto.UserDTO;
import com.revjobs.exception.ResourceNotFoundException;
import com.revjobs.model.User;
import com.revjobs.model.UserRole;
import com.revjobs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return UserDTO.fromUser(user);
    }
    
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return UserDTO.fromUser(user);
    }
    
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
            .map(UserDTO::fromUser)
            .collect(Collectors.toList());
    }
    
    public List<UserDTO> getUsersByRole(UserRole role) {
        return userRepository.findByRole(role).stream()
            .map(UserDTO::fromUser)
            .collect(Collectors.toList());
    }
    
    @Transactional
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhone(userDTO.getPhone());
        user.setLocation(userDTO.getLocation());
        user.setBio(userDTO.getBio());
        user.setProfilePicture(userDTO.getProfilePicture());
        
        user = userRepository.save(user);
        return UserDTO.fromUser(user);
    }
    
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepository.delete(user);
    }
}
