package com.revjobs.service;

import com.revjobs.model.User;
import com.revjobs.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final MessageRepository messageRepository;
    private final NotificationRepository notificationRepository;
    
    public Map<String, Object> getAdminDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalJobs", jobRepository.count());
        stats.put("totalApplications", applicationRepository.count());
        stats.put("totalCompanies", userRepository.findByRole(com.revjobs.model.UserRole.EMPLOYER).size());
        return stats;
    }
    
    public Map<String, Object> getEmployerDashboardStats(User employer) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("postedJobs", jobRepository.findByEmployer(employer).size());
        stats.put("totalApplications", applicationRepository.findByJobEmployer(employer).size());
        stats.put("unreadMessages", messageRepository.countByReceiverAndIsRead(employer, false));
        return stats;
    }
    
    public Map<String, Object> getJobSeekerDashboardStats(User jobSeeker) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("appliedJobs", applicationRepository.findByCandidate(jobSeeker).size());
        stats.put("unreadMessages", messageRepository.countByReceiverAndIsRead(jobSeeker, false));
        stats.put("unreadNotifications", notificationRepository.countByUserAndIsRead(jobSeeker, false));
        return stats;
    }
}
