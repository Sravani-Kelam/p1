package com.revjob.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String website;
    private String industry;
    private String location;

    @Column(name = "company_size")
    @Enumerated(EnumType.STRING)
    private CompanySize companySize;

    @Column(name = "logo_url")
    private String logoUrl;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private User employer;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum CompanySize {
        SIZE_1_10("1-10"),
        SIZE_11_50("11-50"),
        SIZE_51_200("51-200"),
        SIZE_201_500("201-500"),
        SIZE_501_1000("501-1000"),
        SIZE_1000_PLUS("1000+");

        private final String value;
        CompanySize(String value) { this.value = value; }
        public String getValue() { return value; }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Company() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public CompanySize getCompanySize() { return companySize; }
    public void setCompanySize(CompanySize companySize) { this.companySize = companySize; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public User getEmployer() { return employer; }
    public void setEmployer(User employer) { this.employer = employer; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}