package com.revjobs.repository;

import com.revjobs.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByName(String name);
    List<Company> findByIsVerified(Boolean isVerified);
    List<Company> findByIndustry(String industry);
    List<Company> findByNameContainingIgnoreCase(String name);
}
