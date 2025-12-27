import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Message } from '../types';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <View 
      style={[
        styles.container,
        message.isUser && styles.userContainer
      ]}
    >
      {!message.isUser && (
        <View style={styles.aiIconContainer}>
          <Ionicons name="chatbubbles" size={16} color={COLORS.primary} />
        </View>
      )}
      <View style={[
        styles.messageContent,
        message.isUser && styles.userMessageContent
      ]}>
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
    marginVertical: SPACING.md,
    marginHorizontal: SPACING.lg,
    alignItems: 'flex-start',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  aiIconContainer: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    marginTop: 4,
  },
  messageContent: {
    flex: 1,
  },
  userMessageContent: {
    flex: 0,
    maxWidth: '85%',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
    letterSpacing: -0.2,
  },
  bubble: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  userBubble: {
    backgroundColor: COLORS.userBubble,
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: COLORS.aiBubble,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  userText: {
    color: COLORS.textInverse,
  },
  aiText: {
    color: COLORS.text,
  },
  timestamp: {
    fontSize: 11,
    marginTop: SPACING.xs,
    color: COLORS.textLight,
    letterSpacing: -0.1,
  },
});
