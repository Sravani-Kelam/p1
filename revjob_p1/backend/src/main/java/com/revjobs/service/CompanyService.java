package com.revjobs.service;

import com.revjobs.exception.ResourceNotFoundException;
import com.revjobs.model.Company;
import com.revjobs.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;
    
    @Transactional
    public Company createCompany(Company company) {
        return companyRepository.save(company);
    }
    
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }
    
    public Company getCompanyById(Long id) {
        return companyRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
    }
    
    public List<Company> searchCompanies(String name) {
        return companyRepository.findByNameContainingIgnoreCase(name);
    }
    
    @Transactional
    public Company updateCompany(Long id, Company companyDetails) {
        Company company = getCompanyById(id);
        company.setName(companyDetails.getName());
        company.setDescription(companyDetails.getDescription());
        company.setIndustry(companyDetails.getIndustry());
        company.setWebsite(companyDetails.getWebsite());
        company.setLogo(companyDetails.getLogo());
        company.setLocation(companyDetails.getLocation());
        company.setEmployeeCount(companyDetails.getEmployeeCount());
        return companyRepository.save(company);
    }
    
    @Transactional
    public void deleteCompany(Long id) {
        Company company = getCompanyById(id);
        companyRepository.delete(company);
    }
}
