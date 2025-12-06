package com.revjob.backend.controller;

import com.revjob.backend.entity.Profile;
import com.revjob.backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profiles")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {
    
    @Autowired
    private ProfileService profileService;
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<Profile> getProfileByUserId(@PathVariable Long userId) {
        return profileService.getProfileByUserId(userId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Profile> createProfile(@RequestBody Profile profile) {
        return ResponseEntity.ok(profileService.createProfile(profile));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Profile> updateProfile(@PathVariable Long id, @RequestBody Profile profile) {
        profile.setId(id);
        return ResponseEntity.ok(profileService.updateProfile(profile));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        profileService.deleteProfile(id);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/user/{userId}")
    public ResponseEntity<Profile> createOrUpdateProfile(@PathVariable Long userId, @RequestBody Profile profile) {
        return ResponseEntity.ok(profileService.createOrUpdateProfile(profile));
    }
}