package com.revjob.backend.repository;

import com.revjob.backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByReceiverId(Long receiverId);
    List<Message> findBySenderId(Long senderId);
    List<Message> findByReceiverIdAndIsRead(Long receiverId, Boolean isRead);
    List<Message> findByMessageType(Message.MessageType messageType);
}