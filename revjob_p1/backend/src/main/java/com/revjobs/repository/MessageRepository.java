package com.revjobs.repository;

import com.revjobs.model.Message;
import com.revjobs.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderOrReceiverOrderByTimestampDesc(User sender, User receiver);
    List<Message> findByReceiverAndIsRead(User receiver, Boolean isRead);
    
    @Query("SELECT m FROM Message m WHERE " +
           "(m.sender = :user1 AND m.receiver = :user2) OR " +
           "(m.sender = :user2 AND m.receiver = :user1) " +
           "ORDER BY m.timestamp DESC")
    List<Message> findConversation(@Param("user1") User user1, @Param("user2") User user2);
    
    Long countByReceiverAndIsRead(User receiver, Boolean isRead);
}
