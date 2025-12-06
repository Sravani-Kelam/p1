package com.revjob.backend.service;

import com.revjob.backend.entity.Company;
import com.revjob.backend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
    
    @Autowired
    private CompanyRepository companyRepository;
    
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }
    
    public Optional<Company> getCompanyById(Long id) {
        return companyRepository.findById(id);
    }
    
    public Company createCompany(Company company) {
        return companyRepository.save(company);
    }
    
    public Company updateCompany(Company company) {
        return companyRepository.save(company);
    }
    
    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }
    
    public List<Company> searchCompaniesByName(String name) {
        return companyRepository.findByNameContainingIgnoreCase(name);
    }
    
    public List<Company> getCompaniesByIndustry(String industry) {
        return companyRepository.findByIndustry(industry);
    }
}