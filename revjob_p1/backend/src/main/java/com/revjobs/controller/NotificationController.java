package com.revjobs.controller;

import com.revjobs.dto.NotificationDTO;
import com.revjobs.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificationController {
    private final NotificationService notificationService;
    
    @GetMapping
    public ResponseEntity<List<NotificationDTO>> getUserNotifications(@RequestHeader("User-Email") String email) {
        return ResponseEntity.ok(notificationService.getUserNotifications(email));
    }
    
    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok().build();
    }
}
