import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme';

export const SettingsScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
    danger = false,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showArrow?: boolean;
    danger?: boolean;
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, danger && styles.dangerIcon]}>
          <Ionicons
            name={icon as any}
            size={20}
            color={danger ? COLORS.error : COLORS.primary}
          />
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, danger && styles.dangerText]}>
            {title}
          </Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <SettingItem
            icon="person-outline"
            title={user?.name || 'User'}
            subtitle={user?.email}
            showArrow={false}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <SettingItem
            icon="color-palette-outline"
            title="Theme"
            subtitle="Warm Earth Tones"
            onPress={() => Alert.alert('Theme', 'Theme settings coming soon')}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="notifications-outline"
            title="Notifications"
            subtitle="Manage notification preferences"
            onPress={() => Alert.alert('Notifications', 'Notification settings coming soon')}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="language-outline"
            title="Language"
            subtitle="English"
            onPress={() => Alert.alert('Language', 'Language settings coming soon')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Settings</Text>
        <View style={styles.card}>
          <SettingItem
            icon="chatbubbles-outline"
            title="AI Model"
            subtitle="DialoGPT-medium"
            onPress={() => Alert.alert('AI Model', 'Model selection coming soon')}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="key-outline"
            title="API Key"
            subtitle="Configure Hugging Face API"
            onPress={() => Alert.alert('API Key', 'API key configuration coming soon')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <SettingItem
            icon="information-circle-outline"
            title="Version"
            subtitle="1.0.0"
            showArrow={false}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="document-text-outline"
            title="Terms of Service"
            onPress={() => Alert.alert('Terms', 'Terms of service coming soon')}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            onPress={() => Alert.alert('Privacy', 'Privacy policy coming soon')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.card}>
          <SettingItem
            icon="log-out-outline"
            title="Logout"
            onPress={handleLogout}
            showArrow={false}
            danger
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>AI Chat v1.0.0</Text>
        <Text style={styles.footerSubtext}>Powered by Hugging Face</Text>
      </View>
    </ScrollView>
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  placeholder: {
    width: 40,
  },
  section: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
    letterSpacing: -0.1,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  dangerIcon: {
    backgroundColor: '#FFE5E5',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
    letterSpacing: -0.2,
  },
  dangerText: {
    color: COLORS.error,
  },
  settingSubtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 2,
    letterSpacing: -0.1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 52,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textLight,
    letterSpacing: -0.2,
  },
  footerSubtext: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
    letterSpacing: -0.1,
  },
});
