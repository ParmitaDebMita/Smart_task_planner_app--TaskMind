import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import { useTaskContext } from '../../context/TaskContext';
import Icon from '../../components/common/Icon';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius, elevation } from '../../theme/spacing';

export default function GoogleCalendarSettingsScreen() {
  const {
    gcalConnected,
    setGcalConnected,
    autoSyncEnabled,
    setAutoSyncEnabled,
    navigateTo,
    showToast,
  } = useTaskContext();

  const [syncDirection, setSyncDirection] = useState('bidirectional'); // 'bidirectional' | 'pull' | 'push'
  const [syncLectures, setSyncLectures] = useState(true);
  const [syncLabs, setSyncLabs] = useState(true);
  const [syncExams, setSyncExams] = useState(true);
  const [commuteBuffer, setCommuteBuffer] = useState(true);
  const [nightProtection, setNightProtection] = useState(true);
  const [disconnectModalVisible, setDisconnectModalVisible] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleTestSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Google Calendar sync completed (18 events updated)', 'success');
    }, 1200);
  };

  const handleDisconnect = () => {
    setGcalConnected(false);
    setDisconnectModalVisible(false);
    showToast('Google Calendar disconnected', 'info');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Google Calendar Integration"
        subtitle="Manage sync rules & academic events"
        showBack={true}
        onBack={() => navigateTo('calendar')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Connection Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.accountCol}>
              <View style={styles.gcalCircle}>
                <Icon name="calendar_month" size={24} color="#1A73E8" />
              </View>
              <View>
                <Text style={styles.statusTitle}>
                  {gcalConnected ? 'Google Calendar Connected' : 'Google Calendar Not Connected'}
                </Text>
                <Text style={styles.statusSubtitle}>
                  {gcalConnected ? 'alex.rivera@stanford.edu' : 'Link account to enable AI auto-scheduling'}
                </Text>
              </View>
            </View>

            <View style={[styles.statusBadge, gcalConnected ? styles.badgeActive : styles.badgeInactive]}>
              <Text style={[styles.badgeText, gcalConnected ? styles.badgeTextActive : styles.badgeTextInactive]}>
                {gcalConnected ? 'ACTIVE' : 'OFFLINE'}
              </Text>
            </View>
          </View>

          {gcalConnected ? (
            <View style={styles.statusActions}>
              <TouchableOpacity
                style={[styles.syncNowBtn, isSyncing && styles.syncNowBtnDisabled]}
                onPress={handleTestSync}
                disabled={isSyncing}
              >
                <Icon name="sync" size={16} color="#FFFFFF" />
                <Text style={styles.syncNowText}>{isSyncing ? 'Syncing...' : 'Sync Now'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.disconnectBtn}
                onPress={() => setDisconnectModalVisible(true)}
              >
                <Text style={styles.disconnectText}>Disconnect</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.connectPrimaryBtn}
              onPress={() => navigateTo('googleOAuth')}
            >
              <Icon name="link" size={18} color="#FFFFFF" />
              <Text style={styles.connectPrimaryText}>Connect Google Account</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Master Auto-Sync Switch */}
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View style={styles.switchTextCol}>
              <Text style={styles.switchTitle}>Real-Time Master Sync</Text>
              <Text style={styles.switchDesc}>Continuously sync calendar modifications within 60 seconds.</Text>
            </View>
            <Switch
              value={autoSyncEnabled}
              onValueChange={setAutoSyncEnabled}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={autoSyncEnabled ? '#4F46E5' : '#94A3B8'}
              disabled={!gcalConnected}
            />
          </View>
        </View>

        {/* Sync Direction Options */}
        <Text style={styles.sectionHeader}>Sync Mode</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={[styles.directionOption, syncDirection === 'bidirectional' && styles.directionOptionSelected]}
            onPress={() => setSyncDirection('bidirectional')}
          >
            <View style={styles.radioCircle}>
              {syncDirection === 'bidirectional' && <View style={styles.radioInner} />}
            </View>
            <View style={styles.directionTextCol}>
              <Text style={styles.directionTitle}>Bidirectional Sync (Recommended)</Text>
              <Text style={styles.directionDesc}>Changes in either Google Calendar or TaskMind update both systems.</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={[styles.directionOption, syncDirection === 'pull' && styles.directionOptionSelected]}
            onPress={() => setSyncDirection('pull')}
          >
            <View style={styles.radioCircle}>
              {syncDirection === 'pull' && <View style={styles.radioInner} />}
            </View>
            <View style={styles.directionTextCol}>
              <Text style={styles.directionTitle}>Import Only (Google Calendar → TaskMind)</Text>
              <Text style={styles.directionDesc}>TaskMind detects conflicts but never writes events to Google.</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Active Channels */}
        <Text style={styles.sectionHeader}>Calendar Channels</Text>
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <Text style={styles.channelLabel}>University Lectures & Classes</Text>
            <Switch
              value={syncLectures}
              onValueChange={setSyncLectures}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={syncLectures ? '#4F46E5' : '#94A3B8'}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.switchRow}>
            <Text style={styles.channelLabel}>Hardware Labs & Workshops</Text>
            <Switch
              value={syncLabs}
              onValueChange={setSyncLabs}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={syncLabs ? '#4F46E5' : '#94A3B8'}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.switchRow}>
            <Text style={styles.channelLabel}>Midterms & Final Exams</Text>
            <Switch
              value={syncExams}
              onValueChange={setSyncExams}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={syncExams ? '#4F46E5' : '#94A3B8'}
            />
          </View>
        </View>

        {/* Student Smart Rules */}
        <Text style={styles.sectionHeader}>Smart Academic Rules</Text>
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View style={styles.switchTextCol}>
              <Text style={styles.switchTitle}>30-Minute Commute Buffers</Text>
              <Text style={styles.switchDesc}>Prevent study blocks right before in-person campus labs.</Text>
            </View>
            <Switch
              value={commuteBuffer}
              onValueChange={setCommuteBuffer}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={commuteBuffer ? '#4F46E5' : '#94A3B8'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.switchRow}>
            <View style={styles.switchTextCol}>
              <Text style={styles.switchTitle}>Quiet Hours Protection (11 PM – 7 AM)</Text>
              <Text style={styles.switchDesc}>Never auto-place high-load study sessions late at night.</Text>
            </View>
            <Switch
              value={nightProtection}
              onValueChange={setNightProtection}
              trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
              thumbColor={nightProtection ? '#4F46E5' : '#94A3B8'}
            />
          </View>
        </View>

        {/* Sync Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statCol}>
            <Text style={styles.statNumber}>18</Text>
            <Text style={styles.statLabel}>Events Synced</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCol}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Sync Errors</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCol}>
            <Text style={styles.statNumber}>2 min ago</Text>
            <Text style={styles.statLabel}>Last Sync</Text>
          </View>
        </View>
      </ScrollView>

      {/* Disconnect Modal */}
      <Modal
        visible={disconnectModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDisconnectModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Icon name="warning" size={32} color="#EF4444" />
            <Text style={styles.modalTitle}>Disconnect Google Calendar?</Text>
            <Text style={styles.modalSub}>
              TaskMind will stop conflict checking and AI study slot optimization with your academic calendar.
            </Text>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setDisconnectModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={handleDisconnect}
              >
                <Text style={styles.modalConfirmText}>Disconnect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomNav currentScreen="calendar" />
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
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
    ...elevation.xs,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  accountCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  gcalCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  statusSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  badgeActive: {
    backgroundColor: '#DCFCE7',
  },
  badgeInactive: {
    backgroundColor: '#F1F5F9',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  badgeTextActive: {
    color: '#15803D',
  },
  badgeTextInactive: {
    color: '#64748B',
  },
  statusActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  syncNowBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A73E8',
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    gap: 6,
  },
  syncNowBtnDisabled: {
    opacity: 0.6,
  },
  syncNowText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  disconnectBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disconnectText: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '600',
  },
  connectPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A73E8',
    paddingVertical: 12,
    borderRadius: borderRadius.md,
    gap: 8,
  },
  connectPrimaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
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
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    marginLeft: 4,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  switchTextCol: {
    flex: 1,
    marginRight: spacing.md,
  },
  switchTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
  },
  switchDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  channelLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  directionOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  directionOptionSelected: {
    backgroundColor: '#FAFAFF',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4F46E5',
  },
  directionTextCol: {
    flex: 1,
  },
  directionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
  },
  directionDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E2E8F0',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    ...elevation.xl,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: spacing.md,
    marginBottom: 6,
    textAlign: 'center',
  },
  modalSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: borderRadius.md,
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  modalConfirmBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#EF4444',
    borderRadius: borderRadius.md,
  },
  modalConfirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
