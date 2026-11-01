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

export const SmartReschedulerScreen = () => {
  const { rescheduleProposal, acceptReschedulePlan, navigateTo, showToast } = useTaskContext();

  const [missedTask] = useState({
    title: 'Physics Chapter 3 - Kinematics',
    originalTime: 'Missed Yesterday, 11:59 PM',
    course: 'Physics',
    estimatedMinutes: 60,
  });

  const [newProposedSlot] = useState({
    day: 'Today (Tuesday)',
    time: '03:00 PM – 04:00 PM',
    reason: 'Detected open 2-hour buffer before your evening group review.',
  });

  const handleConfirm = () => {
    if (acceptReschedulePlan) acceptReschedulePlan();
    showToast('Schedule successfully rearranged & saved to Calendar!', 'success');
    navigateTo('AcademicCalendar');
  };

  return (
    <View style={styles.screenWrapper}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigateTo('HomeDashboard')}
          activeOpacity={0.8}
        >
          <Icon name="arrow_back" size={22} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Smart Rescheduler</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Caring Mascot / Rescheduler Banner */}
        <View style={styles.reassureCard}>
          <View style={styles.mascotAvatar}>
            <Icon name="auto_awesome" size={20} color="#8B5CF6" fill />
          </View>
          <View style={styles.reassureTextCol}>
            <Text style={styles.reassureTitle}>
              No worries. I've rearranged your schedule.
            </Text>
            <Text style={styles.reassureSubtitle}>
              Your missed study block was moved to an open afternoon buffer.
            </Text>
          </View>
        </View>

        {/* Missed Task / Original Schedule */}
        <View style={styles.scheduleCard}>
          <Text style={styles.cardHeaderTitle}>Original Schedule (Missed)</Text>
          <View style={styles.taskSlotRow}>
            <View style={[styles.taskSlotDot, { backgroundColor: '#EF4444' }]} />
            <View style={styles.taskSlotInfo}>
              <Text style={styles.taskSlotTitle}>{missedTask.title}</Text>
              <Text style={styles.taskSlotTime}>{missedTask.originalTime}</Text>
            </View>
          </View>
        </View>

        {/* Proposed New Schedule */}
        <View style={styles.scheduleCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardHeaderTitle}>Proposed New Schedule</Text>
            <View style={styles.optimalBadge}>
              <Text style={styles.optimalBadgeText}>Optimal Match</Text>
            </View>
          </View>
          <View style={styles.taskSlotRow}>
            <View style={[styles.taskSlotDot, { backgroundColor: '#10B981' }]} />
            <View style={styles.taskSlotInfo}>
              <Text style={styles.taskSlotTitle}>{missedTask.title}</Text>
              <Text style={[styles.taskSlotTime, { color: '#047857', fontWeight: '700' }]}>
                {newProposedSlot.day} • {newProposedSlot.time}
              </Text>
            </View>
          </View>
          <View style={styles.reasonPill}>
            <Icon name="info" size={14} color="#64748B" />
            <Text style={styles.reasonText}>{newProposedSlot.reason}</Text>
          </View>
        </View>

        {/* Protected Deadlines & Balanced Workload Checklist */}
        <View style={styles.protectedCard}>
          <View style={styles.checkRow}>
            <Icon name="check_circle" size={18} color="#10B981" fill />
            <Text style={styles.checkText}>Protected upcoming deadlines</Text>
          </View>
          <View style={styles.checkRow}>
            <Icon name="check_circle" size={18} color="#10B981" fill />
            <Text style={styles.checkText}>Balanced workload without burnout</Text>
          </View>
          <View style={styles.checkRow}>
            <Icon name="check_circle" size={18} color="#10B981" fill />
            <Text style={styles.checkText}>No changes to lecture & class hours</Text>
          </View>
        </View>

        {/* Primary Action Button: "Confirm New Plan" */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={handleConfirm}
            activeOpacity={0.88}
          >
            <Text style={styles.confirmBtnText}>Confirm New Plan</Text>
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
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: 96,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  reassureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    borderRadius: rounded.xl,
    padding: 14,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    gap: 12,
  },
  mascotAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reassureTextCol: {
    flex: 1,
  },
  reassureTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6D28D9',
    lineHeight: 18,
  },
  reassureSubtitle: {
    fontSize: 12,
    color: '#7C3AED',
    marginTop: 2,
    lineHeight: 16,
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 14,
    marginBottom: 10,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 8px rgba(30, 41, 59, 0.03)',
      },
      default: {
        shadowColor: '#1E293B',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
      },
    }),
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 8,
  },
  optimalBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  optimalBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
  },
  taskSlotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  taskSlotDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  taskSlotInfo: {
    flex: 1,
  },
  taskSlotTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  taskSlotTime: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  reasonPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: rounded.md,
    padding: 8,
    marginTop: 10,
    gap: 6,
  },
  reasonText: {
    fontSize: 11,
    color: '#64748B',
    flex: 1,
  },
  protectedCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    marginTop: 4,
    marginBottom: spacing.lg,
    gap: 8,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkText: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '600',
  },
  actionWrapper: {
    marginTop: spacing.xs,
  },
  confirmBtn: {
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
  confirmBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SmartReschedulerScreen;
