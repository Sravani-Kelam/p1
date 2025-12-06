package com.revjobs.dto;

import com.revjobs.model.ApplicationStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ApplicationDTO {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private Long candidateId;
    private String candidateName;
    private String coverLetter;
    private String resumeUrl;
    private ApplicationStatus status;
    private LocalDateTime appliedDate;
    private LocalDateTime lastUpdated;
}
