package com.revjob.backend.service;

import com.revjob.backend.entity.Profile;
import com.revjob.backend.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class ProfileService {
    
    @Autowired
    private ProfileRepository profileRepository;
    
    public Optional<Profile> getProfileByUserId(Long userId) {
        return profileRepository.findByUserId(userId);
    }
    
    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }
    
    public Profile updateProfile(Profile profile) {
        return profileRepository.save(profile);
    }
    
    public void deleteProfile(Long id) {
        profileRepository.deleteById(id);
    }
    
    public Profile createOrUpdateProfile(Profile profile) {
        Optional<Profile> existingProfile = profileRepository.findByUserId(profile.getUser().getId());
        if (existingProfile.isPresent()) {
            profile.setId(existingProfile.get().getId());
        }
        return profileRepository.save(profile);
    }
}