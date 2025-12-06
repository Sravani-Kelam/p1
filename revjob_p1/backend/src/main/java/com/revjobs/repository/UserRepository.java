package com.revjobs.repository;

import com.revjobs.model.User;
import com.revjobs.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    List<User> findByRole(UserRole role);
    List<User> findByIsActive(Boolean isActive);
    List<User> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName);
}
