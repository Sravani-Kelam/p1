package com.revjobs.repository;

import com.revjobs.model.Notification;
import com.revjobs.model.NotificationType;
import com.revjobs.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
    List<Notification> findByUserAndIsRead(User user, Boolean isRead);
    List<Notification> findByUserAndType(User user, NotificationType type);
    Long countByUserAndIsRead(User user, Boolean isRead);
}
