import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme';

export const Sidebar = ({ navigation }: any) => {
  const { sessions, currentSession, selectSession, createSession, deleteSession } = useChat();
  const { user } = useAuth();

  const handleNewChat = () => {
    createSession();
    navigation.closeDrawer();
  };

  const handleSelectSession = (sessionId: string) => {
    selectSession(sessionId);
    navigation.closeDrawer();
  };

  const handleDeleteSession = (sessionId: string, e: any) => {
    e.stopPropagation();
    Alert.alert(
      'Delete Chat',
      'Are you sure you want to delete this chat?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteSession(sessionId),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={20} color={COLORS.primary} />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.userEmail} numberOfLines={1}>
              {user?.email || 'user@example.com'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.newChatButton}
          onPress={handleNewChat}
        >
          <Ionicons name="add" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Chat Sessions */}
      <ScrollView style={styles.sessionsList}>
        <Text style={styles.sectionTitle}>Recent Chats</Text>
        {sessions.map((session) => (
          <TouchableOpacity
            key={session.id}
            style={[
              styles.sessionItem,
              session.id === currentSession?.id && styles.sessionItemActive,
            ]}
            onPress={() => handleSelectSession(session.id)}
          >
            <View style={styles.sessionIcon}>
              <Ionicons
                name="chatbubble-outline"
                size={18}
                color={
                  session.id === currentSession?.id
                    ? COLORS.primary
                    : COLORS.textLight
                }
              />
            </View>
            <View style={styles.sessionInfo}>
              <Text
                style={[
                  styles.sessionTitle,
                  session.id === currentSession?.id && styles.sessionTitleActive,
                ]}
                numberOfLines={1}
              >
                {session.title}
              </Text>
              <Text style={styles.sessionDate}>
                {session.updatedAt.toLocaleDateString()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={(e) => handleDeleteSession(session.id, e)}
            >
              <Ionicons name="trash-outline" size={16} color={COLORS.textLight} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            navigation.navigate('Settings');
            navigation.closeDrawer();
          }}
        >
          <Ionicons name="settings-outline" size={20} color={COLORS.text} />
          <Text style={styles.footerButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    letterSpacing: -0.2,
  },
  userEmail: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  newChatButton: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  sessionsList: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
    marginHorizontal: SPACING.lg,
    letterSpacing: -0.1,
    textTransform: 'uppercase',
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  sessionItemActive: {
    backgroundColor: COLORS.surface,
  },
  sessionIcon: {
    marginRight: SPACING.md,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  sessionTitleActive: {
    fontWeight: '600',
    color: COLORS.primary,
  },
  sessionDate: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  deleteButton: {
    padding: SPACING.sm,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  footerButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
    marginLeft: SPACING.md,
    letterSpacing: -0.2,
  },
});
