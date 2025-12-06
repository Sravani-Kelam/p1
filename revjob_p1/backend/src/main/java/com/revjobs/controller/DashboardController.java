package com.revjobs.controller;

import com.revjobs.model.User;
import com.revjobs.repository.UserRepository;
import com.revjobs.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {
    private final DashboardService dashboardService;
    private final UserRepository userRepository;
    
    @GetMapping("/admin")
    public ResponseEntity<Map<String, Object>> getAdminStats() {
        return ResponseEntity.ok(dashboardService.getAdminDashboardStats());
    }
    
    @GetMapping("/employer")
    public ResponseEntity<Map<String, Object>> getEmployerStats(@RequestHeader("User-Email") String email) {
        User employer = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(dashboardService.getEmployerDashboardStats(employer));
    }
    
    @GetMapping("/jobseeker")
    public ResponseEntity<Map<String, Object>> getJobSeekerStats(@RequestHeader("User-Email") String email) {
        User jobSeeker = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(dashboardService.getJobSeekerDashboardStats(jobSeeker));
    }
}
