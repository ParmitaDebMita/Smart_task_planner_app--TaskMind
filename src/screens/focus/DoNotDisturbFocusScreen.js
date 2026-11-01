import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Icon from '../../components/common/Icon';

export const DoNotDisturbFocusScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const [dndActive, setDndActive] = useState(true);
  const [deviceMode, setDeviceMode] = useState('laptop'); // 'laptop' | 'phone'

  const toggleDND = () => {
    setDndActive(!dndActive);
    showToast(dndActive ? 'Do Not Disturb deactivated' : 'Do Not Disturb activated', 'info');
  };

  return (
    <View style={styles.screenWrapper}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigateTo('StudyDashboard')}
          activeOpacity={0.8}
        >
          <Icon name="arrow_back" size={22} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>
          {deviceMode === 'laptop' ? 'Laptop Focus Mode' : 'Phone Do Not Disturb'}
        </Text>
        <TouchableOpacity
          style={styles.deviceToggleBtn}
          onPress={() => setDeviceMode(deviceMode === 'laptop' ? 'phone' : 'laptop')}
          activeOpacity={0.8}
        >
          <Icon name={deviceMode === 'laptop' ? 'smartphone' : 'laptop_mac'} size={20} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Device Graphic Box */}
        <View style={styles.deviceGraphicCard}>
          <View style={styles.screenMockup}>
            <View style={styles.mockupHeader}>
              <View style={styles.mockupDot} />
              <View style={styles.mockupDot} />
              <View style={styles.mockupDot} />
            </View>
            <View style={styles.mockupBody}>
              <Icon name="do_not_disturb_on" size={32} color={dndActive ? '#10B981' : '#94A3B8'} fill />
              <Text style={styles.mockupTitle}>
                {dndActive ? 'Distraction Shield Active' : 'Distractions Allowed'}
              </Text>
              <Text style={styles.mockupSub}>Mathematics • 15:00 remaining</Text>
            </View>
          </View>
        </View>

        {/* Status Indicators List */}
        <View style={styles.statusList}>
          <View style={styles.statusCard}>
            <View style={[styles.statusIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Icon name="notifications_off" size={18} color="#3B82F6" />
            </View>
            <View style={styles.statusTextCol}>
              <Text style={styles.statusTitle}>Notifications Silenced</Text>
              <Text style={styles.statusDesc}>Social, messaging & email alerts muted</Text>
            </View>
            <View style={[styles.indicatorDot, { backgroundColor: dndActive ? '#10B981' : '#CBD5E1' }]} />
          </View>

          <View style={styles.statusCard}>
            <View style={[styles.statusIconBox, { backgroundColor: '#ECFDF5' }]}>
              <Icon name="verified_user" size={18} color="#10B981" />
            </View>
            <View style={styles.statusTextCol}>
              <Text style={styles.statusTitle}>Do Not Disturb Active</Text>
              <Text style={styles.statusDesc}>Operating system focus mode synced</Text>
            </View>
            <View style={[styles.indicatorDot, { backgroundColor: dndActive ? '#10B981' : '#CBD5E1' }]} />
          </View>

          <View style={styles.statusCard}>
            <View style={[styles.statusIconBox, { backgroundColor: '#FFEFEB' }]}>
              <Icon name="timer" size={18} color={colors.primaryCoral} />
            </View>
            <View style={styles.statusTextCol}>
              <Text style={styles.statusTitle}>Active Session</Text>
              <Text style={styles.statusDesc}>Mathematics Sprint • 15:00 min</Text>
            </View>
          </View>
        </View>

        {/* Toggle & Action Buttons */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={[styles.toggleBtn, !dndActive && styles.toggleBtnInactive]}
            onPress={toggleDND}
            activeOpacity={0.88}
          >
            <Text style={styles.toggleBtnText}>
              {dndActive ? 'Deactivate Distraction Shield' : 'Activate Distraction Shield'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#FFFDF9',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
    backgroundColor: '#FFFDF9',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    ...typography.headlineMd,
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
  },
  deviceToggleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  deviceGraphicCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 16,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  screenMockup: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  mockupHeader: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#F1F5F9',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  mockupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
  },
  mockupBody: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  mockupTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 4,
  },
  mockupSub: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  statusList: {
    gap: 10,
    marginBottom: spacing.md,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 14,
    gap: 12,
  },
  statusIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTextCol: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  statusDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  actionWrapper: {
    marginTop: spacing.xs,
  },
  toggleBtn: {
    width: '100%',
    height: 52,
    backgroundColor: colors.primaryCoral,
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryCoral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  toggleBtnInactive: {
    backgroundColor: '#64748B',
  },
  toggleBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default DoNotDisturbFocusScreen;
