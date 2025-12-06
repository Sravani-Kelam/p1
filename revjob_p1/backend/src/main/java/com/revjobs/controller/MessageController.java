package com.revjobs.controller;

import com.revjobs.dto.MessageDTO;
import com.revjobs.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MessageController {
    private final MessageService messageService;
    
    @PostMapping
    public ResponseEntity<MessageDTO> sendMessage(@RequestBody Map<String, Object> request,
                                                  @RequestHeader("User-Email") String senderEmail) {
        Long receiverId = Long.valueOf(request.get("receiverId").toString());
        String content = request.get("content").toString();
        
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(messageService.sendMessage(senderEmail, receiverId, content));
    }
    
    @GetMapping("/conversation/{userId}")
    public ResponseEntity<List<MessageDTO>> getConversation(@PathVariable Long userId,
                                                            @RequestHeader("User-Email") String userEmail) {
        return ResponseEntity.ok(messageService.getConversation(userEmail, userId));
    }
    
    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        messageService.markAsRead(id);
        return ResponseEntity.ok().build();
    }
}
