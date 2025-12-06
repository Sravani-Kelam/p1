import React, { useState, useEffect } from 'react';
import { Box, Paper, List, ListItem, ListItemText, TextField, Button, Typography, Avatar, Divider } from '@mui/material';
import { Send } from '@mui/icons-material';
import { Message } from '../../types';
import { messageAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const MessageCenter: React.FC = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
    }
  }, [selectedConversation]);

  const fetchConversations = async () => {
    try {
      // Mock conversations data
      const mockConversations = [
        {
          userId: '2',
          name: 'Sarah Johnson',
          role: 'HR Manager at TechCorp',
          lastMessage: 'Thank you for your application. We would like to schedule an interview.',
          timestamp: new Date().toISOString(),
          unreadCount: 2
        },
        {
          userId: '3',
          name: 'Mike Chen',
          role: 'Recruiter at StartupXYZ',
          lastMessage: 'Your profile looks great! Are you available for a quick call?',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          unreadCount: 0
        }
      ];
      setConversations(mockConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (userId: string) => {
    try {
      // Mock messages data
      const mockMessages = [
        {
          id: '1',
          senderId: userId,
          receiverId: user?.id || '1',
          content: 'Hi! I reviewed your application for the Senior React Developer position.',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          read: true
        },
        {
          id: '2',
          senderId: user?.id || '1',
          receiverId: userId,
          content: 'Thank you for considering my application. I\'m very interested in this opportunity.',
          timestamp: new Date(Date.now() - 3300000).toISOString(),
          read: true
        },
        {
          id: '3',
          senderId: userId,
          receiverId: user?.id || '1',
          content: 'Great! We would like to schedule an interview. Are you available this week?',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          read: false
        }
      ];
      setMessages(mockMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      // Add message to current conversation
      const newMsg = {
        id: Date.now().toString(),
        senderId: user?.id || '1',
        receiverId: selectedConversation,
        content: newMessage,
        timestamp: new Date().toISOString(),
        read: false
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>
      
      <Box display="flex" height="600px">
        {/* Conversations List */}
        <Paper sx={{ width: 300, mr: 2 }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Conversations
          </Typography>
          <Divider />
          <List sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
            {conversations.map((conversation) => (
              <ListItem
                key={conversation.userId}
                sx={{ cursor: 'pointer', bgcolor: selectedConversation === conversation.userId ? 'action.selected' : 'transparent' }}
                onClick={() => setSelectedConversation(conversation.userId)}
              >
                <Avatar sx={{ mr: 2 }}>
                  {conversation.name.charAt(0)}
                </Avatar>
                <ListItemText
                  primary={conversation.name}
                  secondary={conversation.lastMessage}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Messages Area */}
        <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedConversation ? (
            <>
              {/* Messages */}
              <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.senderId === user?.id ? 'flex-end' : 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        maxWidth: '70%',
                        bgcolor: message.senderId === user?.id ? 'primary.main' : 'grey.100',
                        color: message.senderId === user?.id ? 'white' : 'text.primary',
                      }}
                    >
                      <Typography variant="body1">{message.content}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>

              {/* Message Input */}
              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Box display="flex" gap={1}>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={3}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button
                    variant="contained"
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    sx={{ minWidth: 'auto', px: 2 }}
                  >
                    <Send />
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="h6" color="text.secondary">
                Select a conversation to start messaging
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default MessageCenter;