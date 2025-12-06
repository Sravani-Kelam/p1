package com.revjob.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;

    private String subject;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "is_read")
    private Boolean isRead = false;

    @Column(name = "message_type")
    @Enumerated(EnumType.STRING)
    private MessageType messageType = MessageType.GENERAL;

    @ManyToOne
    @JoinColumn(name = "related_job_id")
    private Job relatedJob;

    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    public enum MessageType {
        APPLICATION, INTERVIEW, GENERAL, SYSTEM
    }

    @PrePersist
    protected void onCreate() {
        sentAt = LocalDateTime.now();
    }

    public Message() {}

    public Message(User sender, User receiver, String subject, String content) {
        this.sender = sender;
        this.receiver = receiver;
        this.subject = subject;
        this.content = content;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getSender() { return sender; }
    public void setSender(User sender) { this.sender = sender; }

    public User getReceiver() { return receiver; }
    public void setReceiver(User receiver) { this.receiver = receiver; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }

    public MessageType getMessageType() { return messageType; }
    public void setMessageType(MessageType messageType) { this.messageType = messageType; }

    public Job getRelatedJob() { return relatedJob; }
    public void setRelatedJob(Job relatedJob) { this.relatedJob = relatedJob; }

    public LocalDateTime getSentAt() { return sentAt; }
}