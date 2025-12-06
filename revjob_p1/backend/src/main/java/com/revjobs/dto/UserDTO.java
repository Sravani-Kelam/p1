package com.revjobs.dto;

import com.revjobs.model.User;
import com.revjobs.model.UserRole;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private UserRole role;
    private String profilePicture;
    private String phone;
    private String location;
    private String companyName;
    private String bio;
    
    public static UserDTO fromUser(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setProfilePicture(user.getProfilePicture());
        dto.setPhone(user.getPhone());
        dto.setLocation(user.getLocation());
        dto.setCompanyName(user.getCompanyName());
        dto.setBio(user.getBio());
        return dto;
    }
}
