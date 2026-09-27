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
import AppLogo from '../../components/common/AppLogo';
import Header from '../../components/common/Header';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius, elevation } from '../../theme/spacing';

export default function GoogleOAuthScreen() {
  const { setGcalConnected, navigateTo, showToast } = useTaskContext();

  const [permRead, setPermRead] = useState(true);
  const [permWrite, setPermWrite] = useState(true);
  const [permNotify, setPermNotify] = useState(true);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleAuthorize = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setGcalConnected(true);
      setIsAuthorizing(false);
      showToast('Google Calendar successfully linked with TaskMind', 'success');
      navigateTo('calendarSettings');
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Google Account Authorization"
        subtitle="Secure Academic Calendar Integration"
        showBack={true}
        onBack={() => navigateTo('calendarSettings')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Google Security Badge */}
        <View style={styles.securityBadge}>
          <Icon name="verified_user" size={16} color="#22C55E" />
          <Text style={styles.securityBadgeText}>Google OAuth 2.0 Verified & Encrypted</Text>
        </View>

        {/* Sync Illustration Banner */}
        <View style={styles.syncGraphicCard}>
          <View style={styles.appIconCircle}>
            <AppLogo size={32} />
          </View>

          <View style={styles.syncArrows}>
            <Icon name="sync_alt" size={24} color="#4F46E5" />
            <Text style={styles.syncRateText}>Live Bidirectional</Text>
          </View>

          <View style={styles.gcalIconCircle}>
            <Icon name="calendar_month" size={32} color="#1A73E8" />
          </View>
        </View>

        {/* Selected Account Card */}
        <View style={styles.accountCard}>
          <View style={styles.accountAvatar}>
            <Text style={styles.accountAvatarText}>AR</Text>
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>Alex Rivera</Text>
            <Text style={styles.accountEmail}>alex.rivera@stanford.edu</Text>
          </View>
          <Icon name="check_circle" size={20} color="#22C55E" />
        </View>

        {/* Scope Permissions List */}
        <Text style={styles.sectionTitle}>TaskMind will request permission to:</Text>
        <View style={styles.permissionsCard}>
          <View style={styles.permissionItem}>
            <Icon name="visibility" size={20} color="#4F46E5" style={styles.permIcon} />
            <View style={styles.permissionTextCol}>
              <Text style={styles.permissionTitle}>Read Calendar Events</Text>
              <Text style={styles.permissionDesc}>
                View class schedules, lab sessions, and exams to identify free study gaps.
              </Text>
            </View>
            <Switch
              value={permRead}
              onValueChange={setPermRead}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={permRead ? '#4F46E5' : '#94A3B8'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.permissionItem}>
            <Icon name="edit_calendar" size={20} color="#4F46E5" style={styles.permIcon} />
            <View style={styles.permissionTextCol}>
              <Text style={styles.permissionTitle}>Insert & Modify Study Blocks</Text>
              <Text style={styles.permissionDesc}>
                Place optimized study sessions and assignment deadlines onto your Google Calendar.
              </Text>
            </View>
            <Switch
              value={permWrite}
              onValueChange={setPermWrite}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={permWrite ? '#4F46E5' : '#94A3B8'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.permissionItem}>
            <Icon name="notifications_active" size={20} color="#4F46E5" style={styles.permIcon} />
            <View style={styles.permissionTextCol}>
              <Text style={styles.permissionTitle}>Smart Conflict Alerts</Text>
              <Text style={styles.permissionDesc}>
                Receive instant notifications when Google Calendar meetings clash with study goals.
              </Text>
            </View>
            <Switch
              value={permNotify}
              onValueChange={setPermNotify}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={permNotify ? '#4F46E5' : '#94A3B8'}
            />
          </View>
        </View>

        {/* Diagnostic Simulator Info */}
        <View style={styles.diagnosticCard}>
          <View style={styles.diagnosticRow}>
            <Text style={styles.diagnosticLabel}>API Quota Allocation:</Text>
            <Text style={styles.diagnosticValue}>10,000 requests / day</Text>
          </View>
          <View style={styles.diagnosticRow}>
            <Text style={styles.diagnosticLabel}>Latency Benchmark:</Text>
            <Text style={styles.diagnosticValue}>42ms (OAuth 2.0 TLS 1.3)</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.authorizeBtn, isAuthorizing && styles.authorizeBtnDisabled]}
            onPress={handleAuthorize}
            disabled={isAuthorizing}
          >
            <Icon name="lock_open" size={18} color="#FFFFFF" />
            <Text style={styles.authorizeBtnText}>
              {isAuthorizing ? 'Securing Tokens...' : 'Authorize & Connect Account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigateTo('calendarSettings')}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingBottom: 40,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCFCE7',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: borderRadius.full,
    gap: 6,
    marginBottom: spacing.md,
  },
  securityBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  syncGraphicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
    ...elevation.sm,
  },
  appIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gcalIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncArrows: {
    alignItems: 'center',
    gap: 4,
  },
  syncRateText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4F46E5',
    letterSpacing: 0.5,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.lg,
  },
  accountAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accountAvatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  accountEmail: {
    fontSize: 12,
    color: '#64748B',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  permissionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
    ...elevation.xs,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  permIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  permissionTextCol: {
    flex: 1,
    marginRight: 8,
  },
  permissionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
  },
  permissionDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 8,
  },
  diagnosticCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: 6,
  },
  diagnosticRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  diagnosticLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  diagnosticValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  actionsContainer: {
    gap: spacing.sm,
  },
  authorizeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A73E8',
    paddingVertical: 14,
    borderRadius: borderRadius.md,
    gap: 8,
    ...elevation.sm,
  },
  authorizeBtnDisabled: {
    opacity: 0.6,
  },
  authorizeBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelBtnText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
});
