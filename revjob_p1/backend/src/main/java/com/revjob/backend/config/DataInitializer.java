package com.revjob.backend.config;

import com.revjob.backend.entity.*;
import com.revjob.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CompanyRepository companyRepository;
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Create sample users
        User jobSeeker = new User("john.doe@example.com", 
            passwordEncoder.encode("password123"), 
            "John", "Doe", User.Role.JOB_SEEKER);
        
        User employer = new User("employer@company.com", 
            passwordEncoder.encode("password123"), 
            "Jane", "Smith", User.Role.EMPLOYER);
        
        User admin = new User("admin@revjobs.com", 
            passwordEncoder.encode("password123"), 
            "Admin", "User", User.Role.ADMIN);
        
        userRepository.save(jobSeeker);
        userRepository.save(employer);
        userRepository.save(admin);
        
        // Create sample companies
        Company company1 = new Company();
        company1.setName("TechCorp Inc");
        company1.setDescription("Leading technology solutions provider");
        company1.setWebsite("https://techcorp.com");
        company1.setIndustry("Technology");
        company1.setLocation("San Francisco, CA");
        company1.setEmployer(employer);
        companyRepository.save(company1);
        
        // Create sample categories
        Category category1 = new Category("Software Development", 
            "Programming and software engineering roles", "code");
        Category category2 = new Category("Design", 
            "UI/UX and graphic design positions", "palette");
        categoryRepository.save(category1);
        categoryRepository.save(category2);
        
        // Create sample jobs
        Job job1 = new Job();
        job1.setTitle("Senior React Developer");
        job1.setDescription("We are looking for an experienced React developer...");
        job1.setRequirements("React, TypeScript, Node.js, 5+ years experience");
        job1.setJobType(Job.JobType.FULL_TIME);
        job1.setExperienceLevel(Job.ExperienceLevel.SENIOR);
        job1.setLocation("San Francisco, CA");
        job1.setCompany(company1);
        job1.setPostedBy(employer);
        jobRepository.save(job1);
        
        System.out.println("Sample data initialized successfully!");
    }
}