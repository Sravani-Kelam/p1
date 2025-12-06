package com.revjobs.controller;

import com.revjobs.dto.ApplicationDTO;
import com.revjobs.model.ApplicationStatus;
import com.revjobs.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ApplicationController {
    private final ApplicationService applicationService;
    
    @PostMapping
    public ResponseEntity<ApplicationDTO> applyForJob(@RequestBody Map<String, Object> request,
                                                      @RequestHeader("User-Email") String candidateEmail) {
        Long jobId = Long.valueOf(request.get("jobId").toString());
        String coverLetter = request.get("coverLetter").toString();
        
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(applicationService.applyForJob(jobId, candidateEmail, coverLetter));
    }
    
    @GetMapping("/candidate")
    public ResponseEntity<List<ApplicationDTO>> getCandidateApplications(@RequestHeader("User-Email") String email) {
        return ResponseEntity.ok(applicationService.getCandidateApplications(email));
    }
    
    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicationDTO>> getJobApplications(@PathVariable Long jobId) {
        return ResponseEntity.ok(applicationService.getJobApplications(jobId));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<ApplicationDTO> updateApplicationStatus(@PathVariable Long id,
                                                                  @RequestBody Map<String, String> request) {
        ApplicationStatus status = ApplicationStatus.valueOf(request.get("status"));
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status));
    }
}
