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

export const CatchUpModeScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const [triageCategories] = useState([
    {
      category: 'Must Do',
      color: '#EF4444',
      bg: '#FFEFEB',
      tasks: ['Database Schema & Foreign Keys Lab (Due Today)', 'Calculus Problem Set 3'],
    },
    {
      category: 'Should Do',
      color: '#F59E0B',
      bg: '#FEF3C7',
      tasks: ['Physics Chapter 4 Practice Problems'],
    },
    {
      category: 'Can Postpone',
      color: '#3B82F6',
      bg: '#EFF6FF',
      tasks: ['Optional CS Blog & Article Reading (+3 days)'],
    },
    {
      category: 'Can Combine',
      color: '#10B981',
      bg: '#ECFDF5',
      tasks: ['Combine Literature & History reading into 1 session'],
    },
  ]);

  const handleStartCatchUp = () => {
    showToast('Catch-up sequence activated! 4.5h sprint planned.', 'success');
    navigateTo('TodayTasks');
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
        <Text style={styles.topBarTitle}>Catch-Up Mode</Text>
        <View style={styles.fireBadge}>
          <Icon name="local_fire_department" size={18} color="#F97316" fill />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Caring Recovery Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroIconBox}>
            <Icon name="healing" size={20} color="#059669" />
          </View>
          <View style={styles.heroTextCol}>
            <Text style={styles.heroTitle}>
              You've fallen behind. Let's recover your schedule.
            </Text>
            <Text style={styles.heroSubtitle}>
              TaskMind triaged your overdue queue to remove cognitive overload.
            </Text>
          </View>
        </View>

        {/* Available Study Time Card */}
        <View style={styles.bufferCard}>
          <View style={styles.bufferLeft}>
            <Icon name="bolt" size={20} color={colors.primaryCoral} />
            <Text style={styles.bufferLabel}>Available Recovery Time</Text>
          </View>
          <View style={styles.bufferBadge}>
            <Text style={styles.bufferBadgeText}>4.5 hrs Open Buffer</Text>
          </View>
        </View>

        {/* Triaged Overdue Tasks List */}
        <View style={styles.triageSection}>
          <Text style={styles.sectionHeaderTitle}>Triaged Overdue Queue</Text>
          <View style={styles.triageList}>
            {triageCategories.map((cat) => (
              <View key={cat.category} style={styles.triageGroupCard}>
                <View style={[styles.triageGroupHeader, { backgroundColor: cat.bg }]}>
                  <Text style={[styles.triageGroupTitle, { color: cat.color }]}>
                    {cat.category}
                  </Text>
                  <Text style={styles.triageGroupCount}>{cat.tasks.length} tasks</Text>
                </View>

                <View style={styles.tasksInsideGroup}>
                  {cat.tasks.map((taskTitle, idx) => (
                    <View key={idx} style={styles.taskRowItem}>
                      <View style={[styles.taskBullet, { backgroundColor: cat.color }]} />
                      <Text style={styles.taskRowTitle}>{taskTitle}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* AI Recovery Plan Preview */}
        <View style={styles.recoveryPlanCard}>
          <View style={styles.recoveryPlanHeader}>
            <Icon name="auto_awesome" size={16} color="#8B5CF6" fill />
            <Text style={styles.recoveryPlanTitle}>Prioritized Catch-Up Sequence</Text>
          </View>
          <Text style={styles.recoveryPlanDesc}>
            Step 1: Tackle Database Schema (45m) → 10m Break → Step 2: Calculus Problem Set (1h). Non-essential reading postponed to Sunday.
          </Text>
        </View>

        {/* Primary Action Button */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.startPlanBtn}
            onPress={handleStartCatchUp}
            activeOpacity={0.88}
          >
            <Text style={styles.startPlanBtnText}>Start Catch-Up Plan</Text>
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
  fireBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF7ED',
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
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    borderRadius: rounded.xl,
    padding: 14,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    gap: 12,
  },
  heroIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTextCol: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#065F46',
    lineHeight: 18,
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#047857',
    marginTop: 2,
    lineHeight: 16,
  },
  bufferCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    borderRadius: rounded.xl,
    padding: 12,
    marginBottom: spacing.md,
  },
  bufferLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bufferLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  bufferBadge: {
    backgroundColor: '#FFEFEB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
  },
  bufferBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primaryCoral,
  },
  triageSection: {
    marginBottom: spacing.md,
  },
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 10,
  },
  triageList: {
    gap: 10,
  },
  triageGroupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    overflow: 'hidden',
  },
  triageGroupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  triageGroupTitle: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  triageGroupCount: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  tasksInsideGroup: {
    padding: 12,
    gap: 8,
  },
  taskRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  taskRowTitle: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '600',
    flex: 1,
  },
  recoveryPlanCard: {
    backgroundColor: '#F5F3FF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    padding: 14,
    marginBottom: spacing.lg,
  },
  recoveryPlanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  recoveryPlanTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6D28D9',
  },
  recoveryPlanDesc: {
    fontSize: 13,
    color: '#4C1D95',
    fontWeight: '500',
    lineHeight: 18,
  },
  actionWrapper: {
    marginTop: spacing.xs,
  },
  startPlanBtn: {
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
  startPlanBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CatchUpModeScreen;
