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

export default function AISmartSchedulingScreen() {
  const { navigateTo, showToast } = useTaskContext();
  const [autoRescheduleEnabled, setAutoRescheduleEnabled] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = () => {
    setIsApplied(true);
    showToast('AI Smart Schedule applied to Google Calendar & TaskMind', 'success');
    setTimeout(() => {
      navigateTo('calendar');
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <Header
        title="AI Smart Scheduling"
        subtitle="Gemini Schedule Optimizer"
        showBack={true}
        onBack={() => navigateTo('calendar')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Conflict Alert Banner */}
        <View style={styles.conflictCard}>
          <View style={styles.conflictHeader}>
            <View style={styles.conflictIconBadge}>
              <Icon name="event_busy" size={20} color="#EF4444" />
            </View>
            <View style={styles.conflictHeaderText}>
              <Text style={styles.conflictTitle}>Google Calendar Conflict Detected</Text>
              <Text style={styles.conflictTime}>Today at 5:00 PM - 6:30 PM</Text>
            </View>
          </View>
          <Text style={styles.conflictDesc}>
            Your scheduled study block for <Text style={styles.boldText}>CS402 Distributed Systems</Text> directly overlaps with an unannounced <Text style={styles.boldText}>IoT Systems Hardware Lab</Text> synced from Google Calendar.
          </Text>
        </View>

        {/* Gemini Optimal Slot Solution Card */}
        <View style={styles.solutionCard}>
          <View style={styles.solutionHeader}>
            <View style={styles.solutionBadge}>
              <Icon name="auto_awesome" size={14} color="#4F46E5" />
              <Text style={styles.solutionBadgeText}>GEMINI 1.5 PRO OPTIMIZATION</Text>
            </View>
            <View style={styles.matchBadge}>
              <Text style={styles.matchBadgeText}>98% Flow Match</Text>
            </View>
          </View>

          <Text style={styles.slotTitle}>Recommended Free Deep-Work Slot</Text>
          <View style={styles.slotTimeRow}>
            <Icon name="schedule" size={20} color="#4F46E5" />
            <Text style={styles.slotTime}>7:30 PM – 9:30 PM (2 hrs)</Text>
          </View>

          <View style={styles.reasoningBox}>
            <Text style={styles.reasoningHeading}>Why this slot was picked:</Text>
            <View style={styles.reasoningItem}>
              <Icon name="check_circle" size={14} color="#22C55E" />
              <Text style={styles.reasoningText}>Zero calendar overlaps & 45m post-dinner recovery buffer.</Text>
            </View>
            <View style={styles.reasoningItem}>
              <Icon name="check_circle" size={14} color="#22C55E" />
              <Text style={styles.reasoningText}>Matches your historical peak focus window (8:00 PM - 10:00 PM).</Text>
            </View>
            <View style={styles.reasoningItem}>
              <Icon name="check_circle" size={14} color="#22C55E" />
              <Text style={styles.reasoningText}>Protects 100% of tomorrow morning's DBMS revision quota.</Text>
            </View>
          </View>
        </View>

        {/* Timeline Comparison View */}
        <Text style={styles.sectionHeading}>Schedule Comparison</Text>
        <View style={styles.comparisonGrid}>
          {/* Before */}
          <View style={styles.timelineCol}>
            <Text style={styles.timelineColTitle}>Original (Conflicted)</Text>
            <View style={[styles.timelineBlock, styles.blockConflict]}>
              <Text style={styles.blockTime}>5:00 PM</Text>
              <Text style={styles.blockTitle}>CS402 Study Block</Text>
              <Text style={styles.blockWarning}>⚠️ Clash with IoT Lab</Text>
            </View>
            <View style={[styles.timelineBlock, styles.blockBusy]}>
              <Text style={styles.blockTime}>5:00 PM - 6:30 PM</Text>
              <Text style={styles.blockTitle}>IoT Systems Lab</Text>
            </View>
          </View>

          {/* After */}
          <View style={styles.timelineCol}>
            <Text style={styles.timelineColTitle}>AI Rescheduled</Text>
            <View style={[styles.timelineBlock, styles.blockBusy]}>
              <Text style={styles.blockTime}>5:00 PM - 6:30 PM</Text>
              <Text style={styles.blockTitle}>IoT Systems Lab</Text>
            </View>
            <View style={[styles.timelineBlock, styles.blockOptimized]}>
              <Text style={styles.blockTime}>7:30 PM - 9:30 PM</Text>
              <Text style={styles.blockTitle}>CS402 Study Block</Text>
              <Text style={styles.blockSuccess}>✨ Deep Work Protected</Text>
            </View>
          </View>
        </View>

        {/* Auto Reschedule Switch */}
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={styles.switchTitle}>Autonomous Conflict Protection</Text>
            <Text style={styles.switchDesc}>Automatically adjust study blocks when Google Calendar classes shift.</Text>
          </View>
          <Switch
            value={autoRescheduleEnabled}
            onValueChange={setAutoRescheduleEnabled}
            trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
            thumbColor={autoRescheduleEnabled ? '#4F46E5' : '#94A3B8'}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.applyBtn, isApplied && styles.applyBtnSuccess]}
            onPress={handleApply}
            disabled={isApplied}
          >
            <Icon name={isApplied ? 'done' : 'auto_awesome'} size={18} color="#FFFFFF" />
            <Text style={styles.applyBtnText}>
              {isApplied ? 'Schedule Updated & Synced' : 'Apply AI Reschedule (7:30 PM)'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dismissBtn}
            onPress={() => navigateTo('calendar')}
          >
            <Text style={styles.dismissBtnText}>Keep Current Schedule</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
  conflictCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    marginBottom: spacing.md,
    ...elevation.sm,
  },
  conflictHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  conflictIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  conflictHeaderText: {
    flex: 1,
  },
  conflictTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#991B1B',
  },
  conflictTime: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '600',
  },
  conflictDesc: {
    fontSize: 13,
    color: '#7F1D1D',
    lineHeight: 18,
  },
  boldText: {
    fontWeight: '700',
  },
  solutionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    marginBottom: spacing.lg,
    ...elevation.md,
  },
  solutionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  solutionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  solutionBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4F46E5',
    letterSpacing: 0.5,
  },
  matchBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  matchBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },
  slotTitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 4,
  },
  slotTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.md,
  },
  slotTime: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  reasoningBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  reasoningHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 2,
  },
  reasoningItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  reasoningText: {
    fontSize: 12,
    color: '#475569',
    flex: 1,
    lineHeight: 16,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  comparisonGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  timelineCol: {
    flex: 1,
    gap: spacing.xs,
  },
  timelineColTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  timelineBlock: {
    borderRadius: borderRadius.md,
    padding: 10,
    borderWidth: 1,
  },
  blockConflict: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
  },
  blockBusy: {
    backgroundColor: '#F1F5F9',
    borderColor: '#CBD5E1',
  },
  blockOptimized: {
    backgroundColor: '#EEF2FF',
    borderColor: '#818CF8',
  },
  blockTime: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },
  blockTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  blockWarning: {
    fontSize: 10,
    color: '#EF4444',
    fontWeight: '700',
    marginTop: 4,
  },
  blockSuccess: {
    fontSize: 10,
    color: '#4F46E5',
    fontWeight: '700',
    marginTop: 4,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.lg,
    ...elevation.xs,
  },
  switchInfo: {
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
  actionsContainer: {
    gap: spacing.sm,
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: borderRadius.md,
    gap: 8,
    ...elevation.sm,
  },
  applyBtnSuccess: {
    backgroundColor: '#22C55E',
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  dismissBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dismissBtnText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
});
