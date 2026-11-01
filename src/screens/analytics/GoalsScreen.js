import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

const initialGoals = [
  {
    id: 'g1', type: 'academic', icon: 'school', color: '#10B981', bg: '#ECFDF5',
    category: 'Academic Goals', title: 'Score 90% in Exams', target: 'Midterms & Finals', deadline: 'Dec 2026',
    progress: 85, status: 'on_track',
  },
  {
    id: 'g2', type: 'exam', icon: 'assignment', color: '#F97316', bg: '#FFF7ED',
    category: 'Exam Goals', title: 'Board Exam 2026', target: '5 Subjects', deadline: 'March 2026',
    progress: 60, status: 'on_track',
  },
  {
    id: 'g3', type: 'study_hours', icon: 'timer', color: '#8B5CF6', bg: '#F3E8FF',
    category: 'Study-Hour Goals', title: 'Study 4h daily', target: '28h / week', deadline: 'Ongoing',
    progress: 75, status: 'on_track',
  },
  {
    id: 'g4', type: 'long_term', icon: 'emoji_events', color: '#F59E0B', bg: '#FEF3C7',
    category: 'Long Term Goals', title: 'Get into a top university', target: 'Admission 2027', deadline: '2027',
    progress: 70, status: 'strong',
  },
];

const statusConfig = {
  on_track: { label: 'On Track', color: '#10B981', icon: 'check_circle' },
  at_risk: { label: 'At Risk', color: '#EF4444', icon: 'warning' },
  strong: { label: 'Strong', color: '#8B5CF6', icon: 'star' },
  completed: { label: 'Done!', color: '#059669', icon: 'celebration' },
};

const GoalCard = ({ goal, onNavigate }) => {
  const sc = statusConfig[goal.status] || statusConfig.on_track;
  return (
    <View style={[styles.goalCard, { borderLeftColor: goal.color }]}>
      <View style={styles.goalCardHeader}>
        <View style={[styles.goalIconBox, { backgroundColor: goal.bg }]}>
          <Icon name={goal.icon} size={20} color={goal.color} />
        </View>
        <View style={styles.goalInfo}>
          <Text style={styles.goalTitle} numberOfLines={1}>{goal.title}</Text>
          <View style={styles.goalMetaRow}>
            <Icon name="flag" size={10} color={colors.textMuted} />
            <Text style={styles.goalMeta}>{goal.target}</Text>
            <Text style={styles.goalMetaDot}>·</Text>
            <Icon name="event" size={10} color={colors.textMuted} />
            <Text style={styles.goalMeta}>{goal.deadline}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${sc.color}18` }]}>
          <Icon name={sc.icon} size={10} color={sc.color} />
          <Text style={[styles.statusText, { color: sc.color }]}>{sc.label}</Text>
        </View>
      </View>

      <View style={styles.goalProgressRow}>
        <View style={styles.goalProgressTrack}>
          <View style={[styles.goalProgressFill, { width: `${goal.progress}%`, backgroundColor: goal.color }]} />
        </View>
        <Text style={[styles.goalProgressPct, { color: goal.color }]}>{goal.progress}%</Text>
      </View>

      <TouchableOpacity
        style={styles.todayMapLink}
        onPress={() => onNavigate('GoalTodayMap')}
      >
        <Icon name="map" size={12} color={colors.primaryCoral} />
        <Text style={styles.todayMapLinkText}>View Today's Map →</Text>
      </TouchableOpacity>
    </View>
  );
};

export const GoalsScreen = () => {
  const { navigateTo, showToast } = useTaskContext();
  const [goals, setGoals] = useState(initialGoals);

  const handleAddGoal = () => {
    showToast('Goal form coming soon! Stay tuned.', 'info');
  };

  const completedCount = goals.filter(g => g.status === 'completed').length;
  const onTrackCount = goals.filter(g => g.status === 'on_track' || g.status === 'strong').length;

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('ProgressDashboard')} style={styles.backBtn}>
          <Icon name="arrow_back" size={22} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Goals</Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddGoal}>
          <Icon name="add" size={22} color={colors.primaryCoral} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Current Goal Hero Card matching Screen 4 */}
        <TouchableOpacity
          style={styles.currentGoalHeroCard}
          onPress={() => navigateTo('GoalTodayMap')}
          activeOpacity={0.85}
        >
          <View style={styles.currentGoalHeader}>
            <View style={[styles.currentGoalIconBox, { backgroundColor: '#EDE9FE' }]}>
              <Icon name="flag" size={20} color="#8B5CF6" />
            </View>
            <View style={styles.currentGoalInfo}>
              <Text style={styles.currentGoalLabel}>Current Goal</Text>
              <Text style={styles.currentGoalTitle}>Finish Physics Chapter 4</Text>
            </View>
            <Icon name="chevron_right" size={22} color="#8B5CF6" />
          </View>
          <View style={styles.currentGoalProgressRow}>
            <View style={styles.currentGoalTrack}>
              <View style={[styles.currentGoalFill, { width: '80%' }]} />
            </View>
            <Text style={styles.currentGoalPctText}>80%</Text>
          </View>
        </TouchableOpacity>

        {/* Summary Bar */}
        <View style={styles.summaryBar}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryVal}>{goals.length}</Text>
            <Text style={styles.summaryLabel}>Total Goals</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryVal, { color: '#10B981' }]}>{onTrackCount}</Text>
            <Text style={styles.summaryLabel}>On Track</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryVal, { color: '#EF4444' }]}>{goals.filter(g => g.status === 'at_risk').length}</Text>
            <Text style={styles.summaryLabel}>At Risk</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryVal, { color: '#059669' }]}>{completedCount}</Text>
            <Text style={styles.summaryLabel}>Done</Text>
          </View>
        </View>

        {/* AI Nudge */}
        <View style={styles.aiNudge}>
          <Icon name="auto_awesome" size={16} color={colors.primaryCoral} />
          <Text style={styles.aiNudgeText}>
            2 goals are at risk. TaskMind suggests adding study blocks to your Thursday and Friday evenings.
          </Text>
        </View>

        {/* Goal Type Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {[
            { label: 'All Goals', icon: 'list' },
            { label: 'Academic', icon: 'school' },
            { label: 'Exam', icon: 'assignment' },
            { label: 'Study Hours', icon: 'timer' },
            { label: 'Long-term', icon: 'emoji_events' },
          ].map((f, i) => (
            <TouchableOpacity key={i} style={[styles.filterChip, i === 0 && styles.filterChipActive]}>
              <Icon name={f.icon} size={12} color={i === 0 ? '#FFFFFF' : colors.textSecondary} />
              <Text style={[styles.filterChipText, i === 0 && styles.filterChipTextActive]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Goal Cards */}
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} onNavigate={navigateTo} />
        ))}

        {/* Add New Goal CTA */}
        <TouchableOpacity style={styles.addGoalBtn} onPress={handleAddGoal}>
          <Icon name="add_circle" size={20} color={colors.primaryCoral} />
          <Text style={styles.addGoalBtnText}>Add New Goal</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default GoalsScreen;

const styles = StyleSheet.create({
  screenWrapper: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.xs,
    backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  backBtn: { padding: 6, width: 36 },
  addBtn: { padding: 6, width: 36, alignItems: 'flex-end' },
  headerTitle: { ...typography.h3, color: colors.onSurface, fontWeight: '700' },
  scrollContent: { padding: spacing.md, paddingBottom: 100 },
  currentGoalHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: '#EDE9FE',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  currentGoalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: spacing.sm,
  },
  currentGoalIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentGoalInfo: {
    flex: 1,
  },
  currentGoalLabel: {
    fontSize: 11,
    color: '#8B5CF6',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  currentGoalTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '800',
    marginTop: 2,
  },
  currentGoalProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  currentGoalTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  currentGoalFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  currentGoalPctText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8B5CF6',
  },
  summaryBar: {
    flexDirection: 'row', backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, marginBottom: spacing.md, alignItems: 'center', justifyContent: 'space-around',
    borderWidth: 1, borderColor: colors.borderLight,
  },
  summaryItem: { alignItems: 'center', flex: 1 },
  summaryVal: { ...typography.h3, fontWeight: '800', color: colors.onSurface },
  summaryLabel: { ...typography.labelXs, color: colors.textSecondary, fontSize: 10 },
  summaryDivider: { width: 1, height: 28, backgroundColor: colors.borderLight },
  aiNudge: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: colors.primaryLight, borderRadius: rounded.lg,
    padding: spacing.sm, marginBottom: spacing.sm,
    borderLeftWidth: 3, borderLeftColor: colors.primaryCoral,
  },
  aiNudgeText: { ...typography.bodySmall, color: colors.primaryDark, flex: 1, lineHeight: 18 },
  filterScroll: { marginBottom: spacing.md },
  filterChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.surfaceDim, borderRadius: rounded.full,
    paddingHorizontal: 12, paddingVertical: 6, marginRight: 6,
  },
  filterChipActive: { backgroundColor: colors.primaryCoral },
  filterChipText: { ...typography.labelXs, color: colors.textSecondary, fontWeight: '600' },
  filterChipTextActive: { color: '#FFFFFF' },
  goalCard: {
    backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, marginBottom: spacing.sm,
    borderWidth: 1, borderColor: colors.borderLight, borderLeftWidth: 4,
  },
  goalCardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: spacing.sm },
  goalIconBox: { width: 40, height: 40, borderRadius: rounded.lg, alignItems: 'center', justifyContent: 'center' },
  goalInfo: { flex: 1 },
  goalTitle: { ...typography.labelMd, color: colors.onSurface, fontWeight: '700', marginBottom: 3 },
  goalMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  goalMeta: { ...typography.labelXs, color: colors.textMuted, fontSize: 10 },
  goalMetaDot: { color: colors.textMuted, fontSize: 10 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    paddingHorizontal: 6, paddingVertical: 3, borderRadius: rounded.full,
  },
  statusText: { fontSize: 9, fontWeight: '700' },
  goalProgressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  goalProgressTrack: { flex: 1, height: 8, backgroundColor: colors.surfaceDim, borderRadius: 4, overflow: 'hidden' },
  goalProgressFill: { height: '100%', borderRadius: 4 },
  goalProgressPct: { ...typography.labelSm, fontWeight: '800', width: 35, textAlign: 'right' },
  todayMapLink: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  todayMapLinkText: { ...typography.labelXs, color: colors.primaryCoral, fontWeight: '700', fontSize: 11 },
  addGoalBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.primaryCoral,
    borderRadius: rounded.xl, padding: spacing.md,
    marginTop: spacing.xs,
  },
  addGoalBtnText: { ...typography.labelMd, color: colors.primaryCoral, fontWeight: '700' },
});
