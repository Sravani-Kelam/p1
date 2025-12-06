package com.revjobs.controller;

import com.revjobs.dto.JobDTO;
import com.revjobs.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class JobController {
    private final JobService jobService;
    
    @PostMapping
    public ResponseEntity<JobDTO> createJob(@Valid @RequestBody JobDTO jobDTO, 
                                           @RequestHeader("User-Email") String employerEmail) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(jobService.createJob(jobDTO, employerEmail));
    }
    
    @GetMapping
    public ResponseEntity<List<JobDTO>> getAllJobs(@RequestParam(required = false) String status) {
        if ("active".equalsIgnoreCase(status)) {
            return ResponseEntity.ok(jobService.getActiveJobs());
        }
        return ResponseEntity.ok(jobService.getAllJobs());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<JobDTO>> searchJobs(@RequestParam String keyword) {
        return ResponseEntity.ok(jobService.searchJobs(keyword));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<JobDTO> updateJob(@PathVariable Long id, @Valid @RequestBody JobDTO jobDTO) {
        return ResponseEntity.ok(jobService.updateJob(id, jobDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}
