package com.revjobs.dto;

import com.revjobs.model.ExperienceLevel;
import com.revjobs.model.JobStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class JobDTO {
    private Long id;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    private List<String> requirements;
    private Double salaryMin;
    private Double salaryMax;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    private Boolean remote;
    private ExperienceLevel experienceLevel;
    private String companyName;
    private JobStatus status;
    private LocalDateTime applicationDeadline;
    private LocalDateTime postedDate;
    private Long employerId;
}
