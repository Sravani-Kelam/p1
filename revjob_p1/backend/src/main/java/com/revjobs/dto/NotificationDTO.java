package com.revjobs.dto;

import com.revjobs.model.NotificationType;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NotificationDTO {
    private Long id;
    private NotificationType type;
    private String title;
    private String message;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
