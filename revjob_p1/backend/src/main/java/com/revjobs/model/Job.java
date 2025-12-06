package com.revjobs.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;
    
    @ElementCollection
    @CollectionTable(name = "job_requirements", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "requirement")
    private List<String> requirements;
    
    private Double salaryMin;
    private Double salaryMax;
    
    @Column(nullable = false)
    private String location;
    
    private Boolean remote = false;
    
    @Enumerated(EnumType.STRING)
    private ExperienceLevel experienceLevel;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id", nullable = false)
    private User employer;
    
    private String companyName;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobStatus status = JobStatus.ACTIVE;
    
    private LocalDateTime applicationDeadline;
    
    @Column(updatable = false)
    private LocalDateTime postedDate;
    
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        postedDate = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
