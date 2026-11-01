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
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

export const PhoneDoNotDisturbScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  // In-app focus & distraction shield state (ready for native bridge)
  const [isDndActive, setIsDndActive] = useState(true);

  const toggleDND = () => {
    setIsDndActive(!isDndActive);
    showToast(
      isDndActive
        ? 'Phone notifications unmuted'
        : 'Phone Do Not Disturb activated 🔕',
      'info'
    );
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
        <Text style={styles.topBarTitle}>Do Not Disturb (Phone)</Text>
        <TouchableOpacity
          style={styles.switchModeBtn}
          onPress={() => navigateTo('LaptopFocusMode')}
          activeOpacity={0.8}
        >
          <Icon name="laptop_mac" size={20} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Phone Device Mockup Graphic */}
        <View style={styles.phoneDeviceContainer}>
          <View style={styles.phoneFrame}>
            {/* Speaker & Camera Notch */}
            <View style={styles.phoneNotch}>
              <View style={styles.speakerPill} />
              <View style={styles.cameraDot} />
            </View>

            {/* Screen Content Inside Phone */}
            <View style={styles.phoneScreenContent}>
              <View style={[styles.dndIconCircle, { backgroundColor: isDndActive ? '#ECFDF5' : '#F1F5F9' }]}>
                <Icon
                  name={isDndActive ? 'do_not_disturb_on' : 'notifications'}
                  size={36}
                  color={isDndActive ? '#10B981' : '#94A3B8'}
                  fill
                />
              </View>

              <Text style={styles.phoneStatusTitle}>
                {isDndActive ? 'Do Not Disturb is ON' : 'Do Not Disturb is OFF'}
              </Text>
              <Text style={styles.phoneSubjectSub}>
                Mathematics • 15:00 min remaining
              </Text>

              <View style={styles.countdownBadge}>
                <Text style={styles.countdownText}>15:00</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Status Checklist Cards */}
        <View style={styles.statusCardsList}>
          {/* Status 1: Calls & Alerts Muted */}
          <View style={styles.statusCard}>
            <View style={[styles.statusIconBox, { backgroundColor: '#FFEFEB' }]}>
              <Icon name="phone_disabled" size={18} color={colors.primaryCoral} />
            </View>
            <View style={styles.statusTextCol}>
              <Text style={styles.statusCardTitle}>Calls & Messages Muted</Text>
              <Text style={styles.statusCardSub}>Incoming phone alerts silenced</Text>
            </View>
            <View style={[styles.statusCheckDot, { backgroundColor: isDndActive ? '#10B981' : '#CBD5E1' }]} />
          </View>

          {/* Status 2: App Notifications Silenced */}
          <View style={styles.statusCard}>
            <View style={[styles.statusIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Icon name="notifications_off" size={18} color="#3B82F6" />
            </View>
            <View style={styles.statusTextCol}>
              <Text style={styles.statusCardTitle}>App Notifications Silenced</Text>
              <Text style={styles.statusCardSub}>Social media & banner badges hidden</Text>
            </View>
            <View style={[styles.statusCheckDot, { backgroundColor: isDndActive ? '#10B981' : '#CBD5E1' }]} />
          </View>

          {/* Status 3: Active TaskMind Session */}
          <View style={styles.statusCard}>
            <View style={[styles.statusIconBox, { backgroundColor: '#ECFDF5' }]}>
              <Icon name="verified" size={18} color="#10B981" />
            </View>
            <View style={styles.statusTextCol}>
              <Text style={styles.statusCardTitle}>Active TaskMind Session</Text>
              <Text style={styles.statusCardSub}>Mathematics Study Sprint running</Text>
            </View>
            <View style={[styles.statusCheckDot, { backgroundColor: '#10B981' }]} />
          </View>
        </View>

        {/* Toggle Button */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={[styles.actionBtn, !isDndActive && styles.actionBtnInactive]}
            onPress={toggleDND}
            activeOpacity={0.88}
          >
            <Text style={styles.actionBtnText}>
              {isDndActive ? 'Turn Off Phone DND' : 'Turn On Phone DND'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav />
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
  switchModeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: 96,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  phoneDeviceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  phoneFrame: {
    width: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    borderWidth: 5,
    borderColor: '#1E293B',
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0px 8px 24px rgba(30, 41, 59, 0.1)',
      },
      default: {
        shadowColor: '#1E293B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
      },
    }),
  },
  phoneNotch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  speakerPill: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#475569',
  },
  cameraDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#475569',
  },
  phoneScreenContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  dndIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  phoneStatusTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
  },
  phoneSubjectSub: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center',
  },
  countdownBadge: {
    backgroundColor: '#FFEFEB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: rounded.full,
    marginTop: 10,
  },
  countdownText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primaryCoral,
  },
  statusCardsList: {
    gap: 8,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 12,
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
  statusCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  statusCardSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  statusCheckDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  actionWrapper: {
    marginTop: spacing.xs,
  },
  actionBtn: {
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
  actionBtnInactive: {
    backgroundColor: '#64748B',
  },
  actionBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PhoneDoNotDisturbScreen;
