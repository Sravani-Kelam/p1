package com.revjobs.service;

import com.revjobs.dto.MessageDTO;
import com.revjobs.exception.ResourceNotFoundException;
import com.revjobs.model.Message;
import com.revjobs.model.User;
import com.revjobs.repository.MessageRepository;
import com.revjobs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public MessageDTO sendMessage(String senderEmail, Long receiverId, String content) {
        User sender = userRepository.findByEmail(senderEmail)
            .orElseThrow(() -> new ResourceNotFoundException("Sender not found"));
        
        User receiver = userRepository.findById(receiverId)
            .orElseThrow(() -> new ResourceNotFoundException("Receiver not found"));
        
        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        message.setIsRead(false);
        
        message = messageRepository.save(message);
        return convertToDTO(message);
    }
    
    public List<MessageDTO> getConversation(String userEmail, Long otherUserId) {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        User otherUser = userRepository.findById(otherUserId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        return messageRepository.findConversation(user, otherUser).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional
    public void markAsRead(Long messageId) {
        Message message = messageRepository.findById(messageId)
            .orElseThrow(() -> new ResourceNotFoundException("Message not found"));
        message.setIsRead(true);
        messageRepository.save(message);
    }
    
    private MessageDTO convertToDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setSenderId(message.getSender().getId());
        dto.setSenderName(message.getSender().getFirstName() + " " + message.getSender().getLastName());
        dto.setReceiverId(message.getReceiver().getId());
        dto.setReceiverName(message.getReceiver().getFirstName() + " " + message.getReceiver().getLastName());
        dto.setContent(message.getContent());
        dto.setIsRead(message.getIsRead());
        dto.setTimestamp(message.getTimestamp());
        return dto;
    }
}
