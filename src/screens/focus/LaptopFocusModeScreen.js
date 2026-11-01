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

export const LaptopFocusModeScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const [isLaptopDndActive, setIsLaptopDndActive] = useState(true);

  const toggleLaptopDND = () => {
    setIsLaptopDndActive(!isLaptopDndActive);
    showToast(
      isLaptopDndActive
        ? 'Laptop Focus Mode deactivated'
        : 'Laptop Focus Mode activated 🖥️',
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
        <Text style={styles.topBarTitle}>Laptop Focus Mode</Text>
        <TouchableOpacity
          style={styles.switchModeBtn}
          onPress={() => navigateTo('PhoneDoNotDisturb')}
          activeOpacity={0.8}
        >
          <Icon name="smartphone" size={20} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Laptop Device Mockup Graphic */}
        <View style={styles.laptopContainer}>
          <View style={styles.laptopScreenFrame}>
            {/* Browser / App Header Bar */}
            <View style={styles.windowHeader}>
              <View style={styles.windowDots}>
                <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
                <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />
                <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
              </View>
              <Text style={styles.windowTitle}>TaskMind — Deep Study Workspace</Text>
            </View>

            {/* Laptop Screen Content */}
            <View style={styles.laptopDisplayContent}>
              <View style={[styles.dndBadge, { backgroundColor: isLaptopDndActive ? '#ECFDF5' : '#F1F5F9' }]}>
                <Icon
                  name={isLaptopDndActive ? 'do_not_disturb_on' : 'notifications'}
                  size={28}
                  color={isLaptopDndActive ? '#10B981' : '#94A3B8'}
                  fill
                />
              </View>
              <Text style={styles.workspaceTitle}>Deep Study Mode</Text>
              <Text style={styles.workspaceSubject}>Subject: Mathematics</Text>

              <View style={styles.timerDisplayRow}>
                <Text style={styles.timerLargeText}>15:00</Text>
                <Text style={styles.sessionPillText}>Session 1/4</Text>
              </View>
            </View>
          </View>

          {/* Laptop Base Stand */}
          <View style={styles.laptopBase} />
          <View style={styles.laptopNotchBase} />
        </View>

        {/* Status Points List */}
        <View style={styles.statusCardsList}>
          {/* Status 1: Laptop Notifications Silenced */}
          <View style={styles.statusCard}>
            <View style={[styles.statusIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Icon name="laptop" size={18} color="#3B82F6" />
            </View>
            <View style={styles.statusTextCol}>
              <Text style={styles.statusCardTitle}>Laptop Notifications Silenced</Text>
              <Text style={styles.statusCardSub}>Browser alerts & desktop banners muted</Text>
            </View>
            <View style={[styles.statusCheckDot, { backgroundColor: isLaptopDndActive ? '#10B981' : '#CBD5E1' }]} />
          </View>

          {/* Status 2: Do Not Disturb Active */}
          <View style={styles.statusCard}>
            <View style={[styles.statusIconBox, { backgroundColor: '#ECFDF5' }]}>
              <Icon name="shield" size={18} color="#10B981" />
            </View>
            <View style={styles.statusTextCol}>
              <Text style={styles.statusCardTitle}>Do Not Disturb Active</Text>
              <Text style={styles.statusCardSub}>Desktop focus profile connected</Text>
            </View>
            <View style={[styles.statusCheckDot, { backgroundColor: isLaptopDndActive ? '#10B981' : '#CBD5E1' }]} />
          </View>

          {/* Status 3: Session Active */}
          <View style={styles.statusCard}>
            <View style={[styles.statusIconBox, { backgroundColor: '#FFEFEB' }]}>
              <Icon name="timer" size={18} color={colors.primaryCoral} />
            </View>
            <View style={styles.statusTextCol}>
              <Text style={styles.statusCardTitle}>Mathematics Study Sprint</Text>
              <Text style={styles.statusCardSub}>15:00 remaining in current block</Text>
            </View>
            <View style={[styles.statusCheckDot, { backgroundColor: '#10B981' }]} />
          </View>
        </View>

        {/* Toggle Action */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={[styles.actionBtn, !isLaptopDndActive && styles.actionBtnInactive]}
            onPress={toggleLaptopDND}
            activeOpacity={0.88}
          >
            <Text style={styles.actionBtnText}>
              {isLaptopDndActive ? 'Deactivate Laptop Focus' : 'Activate Laptop Focus'}
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
  laptopContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  laptopScreenFrame: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#1E293B',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0px 8px 24px rgba(30, 41, 59, 0.08)',
      },
      default: {
        shadowColor: '#1E293B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
      },
    }),
  },
  windowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  windowDots: {
    flexDirection: 'row',
    gap: 4,
    marginRight: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  windowTitle: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  laptopDisplayContent: {
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dndBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  workspaceTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  workspaceSubject: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
  timerDisplayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  timerLargeText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primaryCoral,
  },
  sessionPillText: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  laptopBase: {
    width: '100%',
    maxWidth: 350,
    height: 8,
    backgroundColor: '#CBD5E1',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  laptopNotchBase: {
    width: 60,
    height: 3,
    backgroundColor: '#94A3B8',
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
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

export default LaptopFocusModeScreen;
