import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useTaskContext } from '../../context/TaskContext';
import Icon from '../../components/common/Icon';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius, elevation } from '../../theme/spacing';

export default function SettingsScreen() {
  const { navigateTo, showToast, isDarkMode, setIsDarkMode } = useTaskContext();

  const [notifMorning, setNotifMorning] = useState(true);
  const [notifEvening, setNotifEvening] = useState(true);
  const [notifCritical, setNotifCritical] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [aiAutonomous, setAiAutonomous] = useState(true);

  const handleLogout = () => {
    showToast('Logged out successfully', 'info');
    navigateTo('login');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Settings"
        subtitle="Preferences & academic configurations"
        showBack={true}
        onBack={() => navigateTo('profile')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Account Info Bar */}
        <View style={styles.accountCard}>
          <View style={styles.accountAvatar}>
            <Text style={styles.accountAvatarText}>AR</Text>
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>Alex Rivera</Text>
            <Text style={styles.accountEmail}>alex.rivera@stanford.edu</Text>
          </View>
          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={() => navigateTo('profile')}
          >
            <Text style={styles.editProfileText}>Profile</Text>
          </TouchableOpacity>
        </View>

        {/* AI & Automation Settings */}
        <Text style={styles.sectionTitle}>Gemini AI Optimization</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Autonomous Conflict Resolution</Text>
              <Text style={styles.settingDesc}>
                Allow Gemini to suggest optimal rescheduled study slots during calendar clashes.
              </Text>
            </View>
            <Switch
              value={aiAutonomous}
              onValueChange={setAiAutonomous}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={aiAutonomous ? '#4F46E5' : '#94A3B8'}
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigateTo('aiSmartScheduling')}
          >
            <Icon name="auto_awesome" size={20} color="#4F46E5" />
            <Text style={styles.navRowText}>Review Active Reschedule Suggestions</Text>
            <Icon name="chevron_right" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Calendar Integration Shortcut */}
        <Text style={styles.sectionTitle}>External Integrations</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigateTo('calendarSettings')}
          >
            <Icon name="calendar_month" size={20} color="#1A73E8" />
            <View style={styles.navRowCol}>
              <Text style={styles.navRowTitle}>Google Calendar Sync</Text>
              <Text style={styles.navRowSubtitle}>Manage 2-way sync & academic channels</Text>
            </View>
            <Icon name="chevron_right" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Notification Preferences */}
        <Text style={styles.sectionTitle}>Notifications & Alerts</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Don't Let Me Forget (Critical)</Text>
              <Text style={styles.settingDesc}>High-priority alerts for submissions due in &lt; 6 hrs.</Text>
            </View>
            <Switch
              value={notifCritical}
              onValueChange={setNotifCritical}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={notifCritical ? '#4F46E5' : '#94A3B8'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Morning Briefing (8:00 AM)</Text>
              <Text style={styles.settingDesc}>Summary of today's classes and top priority tasks.</Text>
            </View>
            <Switch
              value={notifMorning}
              onValueChange={setNotifMorning}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={notifMorning ? '#4F46E5' : '#94A3B8'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Evening Retrospective (9:00 PM)</Text>
              <Text style={styles.settingDesc}>Review completed study blocks and tomorrow's prep.</Text>
            </View>
            <Switch
              value={notifEvening}
              onValueChange={setNotifEvening}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={notifEvening ? '#4F46E5' : '#94A3B8'}
            />
          </View>
        </View>

        {/* Focus Chamber & App Experience */}
        <Text style={styles.sectionTitle}>Focus & Experience</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Ambient Soundscapes</Text>
              <Text style={styles.settingDesc}>Enable binaural white noise & rain audio during timers.</Text>
            </View>
            <Switch
              value={soundEffects}
              onValueChange={setSoundEffects}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={soundEffects ? '#4F46E5' : '#94A3B8'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Haptic Feedback</Text>
              <Text style={styles.settingDesc}>Vibration pulses when completing tasks and milestones.</Text>
            </View>
            <Switch
              value={hapticFeedback}
              onValueChange={setHapticFeedback}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={hapticFeedback ? '#4F46E5' : '#94A3B8'}
            />
          </View>
        </View>

        {/* Account Actions */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.navRow}
            onPress={() => {
              showToast('Cache cleared (14.2 MB freed)', 'success');
            }}
          >
            <Icon name="cleaning_services" size={20} color="#64748B" />
            <Text style={styles.navRowText}>Clear Local Cache & Skeletons</Text>
            <Icon name="chevron_right" size={20} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigateTo('forgotPassword')}
          >
            <Icon name="lock_reset" size={20} color="#64748B" />
            <Text style={styles.navRowText}>Reset Password</Text>
            <Icon name="chevron_right" size={20} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.navRow}
            onPress={handleLogout}
          >
            <Icon name="logout" size={20} color="#EF4444" />
            <Text style={[styles.navRowText, { color: '#EF4444', fontWeight: '700' }]}>
              Log Out of TaskMind
            </Text>
            <Icon name="chevron_right" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>TaskMind Student Suite v2.4.0 • Build 8690940151860537302</Text>
      </ScrollView>

      <BottomNav currentScreen="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 100,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
    ...elevation.xs,
  },
  accountAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accountAvatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  accountEmail: {
    fontSize: 12,
    color: '#64748B',
  },
  editProfileBtn: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  editProfileText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F46E5',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
    ...elevation.xs,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  settingInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    gap: 10,
  },
  navRowCol: {
    flex: 1,
  },
  navRowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  navRowSubtitle: {
    fontSize: 11,
    color: '#64748B',
  },
  navRowText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#94A3B8',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
});
