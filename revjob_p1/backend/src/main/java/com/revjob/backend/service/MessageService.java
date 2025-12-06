package com.revjob.backend.service;

import com.revjob.backend.entity.Message;
import com.revjob.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    
    @Autowired
    private MessageRepository messageRepository;
    
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }
    
    public Optional<Message> getMessageById(Long id) {
        return messageRepository.findById(id);
    }
    
    public Message sendMessage(Message message) {
        return messageRepository.save(message);
    }
    
    public Message updateMessage(Message message) {
        return messageRepository.save(message);
    }
    
    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }
    
    public List<Message> getMessagesByReceiver(Long receiverId) {
        return messageRepository.findByReceiverId(receiverId);
    }
    
    public List<Message> getUnreadMessages(Long receiverId) {
        return messageRepository.findByReceiverIdAndIsRead(receiverId, false);
    }
    
    public Message markAsRead(Long messageId) {
        Optional<Message> message = messageRepository.findById(messageId);
        if (message.isPresent()) {
            message.get().setIsRead(true);
            return messageRepository.save(message.get());
        }
        throw new RuntimeException("Message not found");
    }
}