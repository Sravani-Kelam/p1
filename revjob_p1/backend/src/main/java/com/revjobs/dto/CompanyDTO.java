package com.revjobs.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CompanyDTO {
    private Long id;
    private String name;
    private String description;
    private String industry;
    private String website;
    private String logo;
    private String location;
    private Integer employeeCount;
    private Boolean isVerified;
    private LocalDateTime createdAt;
}
