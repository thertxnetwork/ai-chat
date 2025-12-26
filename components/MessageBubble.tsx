import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      {!message.isUser && (
        <View style={styles.aiIconContainer}>
          <Ionicons name="chatbubbles" size={16} color="#6366F1" />
        </View>
      )}
      <View style={styles.messageContent}>
        {!message.isUser && (
          <Text style={styles.label}>AI Assistant</Text>
        )}
        <View
          style={[
            styles.bubble,
            message.isUser ? styles.userBubble : styles.aiBubble,
          ]}
        >
          <Text
            style={[
              styles.text,
              message.isUser ? styles.userText : styles.aiText,
            ]}
          >
            {message.text}
          </Text>
        </View>
        <Text style={styles.timestamp}>
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 12,
    marginHorizontal: 16,
    alignItems: 'flex-start',
  },
  aiIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  messageContent: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  userBubble: {
    backgroundColor: '#6366F1',
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#111827',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 6,
    color: '#9CA3AF',
    letterSpacing: -0.1,
  },
});
