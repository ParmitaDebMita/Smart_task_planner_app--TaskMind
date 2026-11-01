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

export const AIRoutineGeneratorScreen = () => {
  const { saveRoutine, navigateTo, showToast } = useTaskContext();

  const [goal, setGoal] = useState('Score 85% in Sem');
  const [daysLeft, setDaysLeft] = useState('30 Days');
  const [availableHours, setAvailableHours] = useState('3.5 hrs / day');

  const [routineBlocks, setRoutineBlocks] = useState([
    { id: '1', time: '09:00 - 10:00', title: 'Math', category: 'study', color: '#10B981', bg: '#ECFDF5' },
    { id: '2', time: '10:15 - 11:00', title: 'Break', category: 'break', color: '#3B82F6', bg: '#EFF6FF' },
    { id: '3', time: '11:00 - 12:30', title: 'Physics', category: 'study', color: '#EF4444', bg: '#FEE2E2' },
    { id: '4', time: '12:30 - 01:45', title: 'Chemistry', category: 'study', color: '#3B82F6', bg: '#EFF6FF' },
  ]);

  const handleGenerate = () => {
    saveRoutine(routineBlocks);
    showToast('AI Routine Generated & Saved to Schedule!', 'success');
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
        <Text style={styles.topBarTitle}>AI Routine Generator</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Goal & Timeline Input Card */}
        <View style={styles.goalCard}>
          <View style={styles.goalRow}>
            <View style={styles.goalLeft}>
              <View style={[styles.goalIconCircle, { backgroundColor: '#CCFBF1' }]}>
                <Icon name="emoji_events" size={18} color="#0D9488" />
              </View>
              <Text style={styles.goalFieldLabel}>Your Goal</Text>
            </View>
            <View style={styles.goalValuePill}>
              <Text style={styles.goalValueText}>{goal}</Text>
            </View>
          </View>

          <View style={styles.goalDivider} />

          <View style={styles.goalRow}>
            <View style={styles.goalLeft}>
              <View style={[styles.goalIconCircle, { backgroundColor: '#FEF3C7' }]}>
                <Icon name="alarm" size={18} color="#D97706" />
              </View>
              <Text style={styles.goalFieldLabel}>Exam Date in Time</Text>
            </View>
            <View style={styles.goalValuePill}>
              <Text style={styles.goalValueText}>{daysLeft}</Text>
            </View>
          </View>
        </View>

        {/* Existing Tasks List */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionCardHeader}>
            <Text style={styles.sectionCardTitle}>Tasks</Text>
            <View style={styles.overdueTag}>
              <Text style={styles.overdueTagText}>Chosen Set</Text>
            </View>
          </View>

          <View style={styles.tasksList}>
            <View style={styles.taskItemRow}>
              <View style={[styles.dotCircle, { backgroundColor: '#3B82F6' }]} />
              <Text style={styles.taskItemText}>Physics Chapter 4</Text>
            </View>
            <View style={styles.taskItemRow}>
              <View style={[styles.dotCircle, { backgroundColor: '#10B981' }]} />
              <Text style={styles.taskItemText}>English Essay</Text>
            </View>
            <View style={styles.taskItemRow}>
              <View style={[styles.dotCircle, { backgroundColor: '#EC4899' }]} />
              <Text style={styles.taskItemText}>Math Assignment</Text>
            </View>
          </View>
        </View>

        {/* Generated Routine Schedule */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionCardHeader}>
            <Text style={styles.sectionCardTitle}>Generate Routine</Text>
            <Text style={styles.sectionCardSub}>3.5h Day</Text>
          </View>

          <View style={styles.routineList}>
            {routineBlocks.map((block) => (
              <View
                key={block.id}
                style={[styles.routineRow, { backgroundColor: block.bg }]}
              >
                <View style={styles.routineTimeCol}>
                  <View style={[styles.blockDot, { backgroundColor: block.color }]} />
                  <Text style={styles.routineTimeText}>{block.time}</Text>
                </View>
                <View
                  style={[styles.categoryBadge, { backgroundColor: '#FFFFFF' }]}
                >
                  <Text style={[styles.categoryBadgeText, { color: block.color }]}>
                    {block.title}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Primary Action Button */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.generateBtn}
            onPress={handleGenerate}
            activeOpacity={0.88}
          >
            <Text style={styles.generateBtnText}>Generate My Routine</Text>
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
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 14,
    marginBottom: spacing.md,
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
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goalIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalFieldLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  goalValuePill: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
  },
  goalValueText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  goalDivider: {
    height: 1,
    backgroundColor: '#F1EFEA',
    marginVertical: 10,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 14,
    marginBottom: spacing.md,
  },
  sectionCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  sectionCardSub: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  overdueTag: {
    backgroundColor: '#FFEFEB',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: rounded.full,
  },
  overdueTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryCoral,
  },
  tasksList: {
    gap: 8,
  },
  taskItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dotCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  taskItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  routineList: {
    gap: 8,
  },
  routineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: rounded.lg,
  },
  routineTimeCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  blockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  routineTimeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: rounded.full,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  actionWrapper: {
    marginTop: spacing.xs,
  },
  generateBtn: {
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
  generateBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AIRoutineGeneratorScreen;
