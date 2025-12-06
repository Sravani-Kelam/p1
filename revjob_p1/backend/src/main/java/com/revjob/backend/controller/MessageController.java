package com.revjob.backend.controller;

import com.revjob.backend.entity.Message;
import com.revjob.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {
    
    @Autowired
    private MessageService messageService;
    
    @GetMapping
    public ResponseEntity<List<Message>> getAllMessages() {
        return ResponseEntity.ok(messageService.getAllMessages());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable Long id) {
        return messageService.getMessageById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
        return ResponseEntity.ok(messageService.sendMessage(message));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable Long id, @RequestBody Message message) {
        message.setId(id);
        return ResponseEntity.ok(messageService.updateMessage(message));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        messageService.deleteMessage(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/receiver/{receiverId}")
    public ResponseEntity<List<Message>> getMessagesByReceiver(@PathVariable Long receiverId) {
        return ResponseEntity.ok(messageService.getMessagesByReceiver(receiverId));
    }
    
    @GetMapping("/unread/{receiverId}")
    public ResponseEntity<List<Message>> getUnreadMessages(@PathVariable Long receiverId) {
        return ResponseEntity.ok(messageService.getUnreadMessages(receiverId));
    }
    
    @PutMapping("/{id}/read")
    public ResponseEntity<Message> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(messageService.markAsRead(id));
    }
}