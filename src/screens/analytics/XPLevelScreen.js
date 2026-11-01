import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';
import TaskMindMascot from '../../components/common/TaskMindMascot';

const CURRENT_LEVEL = 4;
const CURRENT_XP = 400;
const NEXT_LEVEL_XP = 600;
const XP_PROGRESS = Math.round((CURRENT_XP / NEXT_LEVEL_XP) * 100);

const XP_SOURCES = [
  { icon: 'schedule', color: '#F59E0B', label: 'Study Session', xp: '+50 XP', detail: '45m deep focus interval' },
  { icon: 'task_alt', color: '#3B82F6', label: 'Task Completed', xp: '+30 XP', detail: 'Physics Chapter 4 exercises' },
  { icon: 'flag', color: '#FF5B37', label: 'Goal Progress', xp: '+100 XP', detail: 'Milestone target reached' },
  { icon: 'local_fire_department', color: '#06B6D4', label: 'Streak Bonus', xp: '+20 XP', detail: '7-day study streak bonus' },
];

const MILESTONES = [
  { xp: 200, level: 3, label: 'Dedicated Student', icon: 'school', achieved: true, color: '#10B981' },
  { xp: 400, level: 4, label: 'Focus Explorer', icon: 'star', achieved: true, color: '#FF5B37', isCurrent: true },
  { xp: 600, level: 5, label: 'Focus Champion', icon: 'psychology', achieved: false, color: '#4F46E5' },
  { xp: 1000, level: 6, label: 'Consistency King', icon: 'emoji_events', achieved: false, color: '#F59E0B' },
];

export const XPLevelScreen = () => {
  const { user, focusSession, navigateTo } = useTaskContext();

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('ProgressDashboard')} style={styles.backBtn}>
          <Icon name="arrow_back" size={22} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>XP / Level</Text>
        <TouchableOpacity onPress={() => navigateTo('Achievements')} style={styles.backBtn}>
          <Icon name="military_tech" size={22} color={colors.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Level Card matching Screen 6 */}
        <View style={styles.heroCard}>
          <View style={styles.heroCenterCol}>
            <TaskMindMascot size={130} variant="proud" showBackground={true} />
            <Text style={styles.heroXP}>{CURRENT_XP} XP</Text>
            <Text style={styles.heroXPSub}>Level {CURRENT_LEVEL} · {NEXT_LEVEL_XP - CURRENT_XP} XP to Level {CURRENT_LEVEL + 1}</Text>
          </View>

          {/* XP Progress Bar */}
          <View style={styles.xpBarSection}>
            <View style={styles.xpBarTrack}>
              <View style={[styles.xpBarFill, { width: `${XP_PROGRESS}%` }]} />
            </View>
          </View>
        </View>

        {/* Motivational Mascot Message */}
        <View style={styles.motivationCard}>
          <Icon name="auto_awesome" size={16} color={colors.primaryCoral} />
          <Text style={styles.motivationText}>
            You're only <Text style={styles.motivationBold}>{NEXT_LEVEL_XP - CURRENT_XP} XP</Text> away from leveling up! 
            One strong study session will get you there. Let's go! 🔥
          </Text>
        </View>

        {/* XP Earned Breakdown */}
        <Text style={styles.sectionLabel}>XP Earned This Week</Text>
        <View style={styles.xpSourcesCard}>
          {XP_SOURCES.map((src, i) => (
            <View key={i} style={[styles.xpSourceRow, i < XP_SOURCES.length - 1 && styles.xpSourceDivider]}>
              <View style={[styles.xpSourceIcon, { backgroundColor: `${src.color}18` }]}>
                <Icon name={src.icon} size={16} color={src.color} />
              </View>
              <View style={styles.xpSourceInfo}>
                <Text style={styles.xpSourceLabel}>{src.label}</Text>
                <Text style={styles.xpSourceDetail}>{src.detail}</Text>
              </View>
              <Text style={[styles.xpSourceAmount, { color: src.color }]}>{src.xp}</Text>
            </View>
          ))}
        </View>

        {/* Level Milestones Timeline */}
        <Text style={styles.sectionLabel}>Level Journey</Text>
        <View style={styles.milestonesCard}>
          {MILESTONES.map((m, i) => (
            <View key={i} style={styles.milestoneRow}>
              <View style={[
                styles.milestoneIcon,
                { backgroundColor: m.achieved ? `${m.color}18` : colors.surfaceDim },
                m.isCurrent && styles.milestoneIconCurrent,
              ]}>
                <Icon name={m.icon} size={16} color={m.achieved ? m.color : colors.textMuted} />
              </View>
              <View style={styles.milestoneInfo}>
                <Text style={[styles.milestoneName, !m.achieved && styles.milestoneLocked]}>{m.label}</Text>
                <Text style={styles.milestoneSub}>Level {m.level} · {m.xp.toLocaleString()} XP</Text>
              </View>
              {m.isCurrent && (
                <View style={styles.currentBadge}>
                  <Text style={styles.currentBadgeText}>YOU ARE HERE</Text>
                </View>
              )}
              {!m.achieved && !m.isCurrent && (
                <Icon name="lock" size={14} color={colors.textMuted} />
              )}
              {m.achieved && !m.isCurrent && (
                <Icon name="check_circle" size={16} color={m.color} />
              )}
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity style={styles.quickAction} onPress={() => navigateTo('Achievements')}>
            <Icon name="military_tech" size={20} color={colors.secondary} />
            <Text style={styles.quickActionText}>Achievements</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={() => navigateTo('Streak')}>
            <Icon name="local_fire_department" size={20} color={colors.primaryCoral} />
            <Text style={styles.quickActionText}>My Streak</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default XPLevelScreen;

const styles = StyleSheet.create({
  screenWrapper: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.xs,
    backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  backBtn: { padding: 6, width: 36 },
  headerTitle: { ...typography.h3, color: colors.onSurface, fontWeight: '700' },
  scrollContent: { padding: spacing.md, paddingBottom: 100 },
  heroCard: {
    backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.lg, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
    alignItems: 'center',
  },
  heroCenterCol: {
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: 4,
  },
  heroXP: { ...typography.h1, color: colors.onSurface, fontWeight: '900', letterSpacing: -0.5, marginTop: 8 },
  heroXPSub: { ...typography.bodySmall, color: colors.textSecondary },
  xpBarSection: { width: '100%', marginTop: 4 },
  xpBarRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  xpBarLabel: { ...typography.labelSm, color: colors.textSecondary },
  xpBarPct: { ...typography.labelSm, color: colors.primaryCoral, fontWeight: '700' },
  xpBarTrack: {
    height: 14, backgroundColor: colors.surfaceDim, borderRadius: 7,
    overflow: 'hidden', position: 'relative',
  },
  xpBarFill: {
    height: '100%', borderRadius: 7,
    backgroundColor: colors.primaryCoral,
  },
  xpBarGlow: {
    position: 'absolute', top: 3, height: 4, borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  xpBarRemaining: { ...typography.labelXs, color: colors.textMuted, textAlign: 'right', marginTop: 4 },
  motivationCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: colors.primaryLight, borderRadius: rounded.lg,
    padding: spacing.sm, marginBottom: spacing.md,
    borderLeftWidth: 3, borderLeftColor: colors.primaryCoral,
  },
  motivationText: { ...typography.bodySmall, color: colors.primaryDark, flex: 1, lineHeight: 18 },
  motivationBold: { fontWeight: '700' },
  sectionLabel: { ...typography.labelMd, color: colors.onSurface, fontWeight: '700', marginBottom: spacing.sm },
  xpSourcesCard: {
    backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  xpSourceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  xpSourceDivider: { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  xpSourceIcon: { width: 36, height: 36, borderRadius: rounded.lg, alignItems: 'center', justifyContent: 'center' },
  xpSourceInfo: { flex: 1 },
  xpSourceLabel: { ...typography.labelSm, color: colors.onSurface, fontWeight: '600' },
  xpSourceDetail: { ...typography.labelXs, color: colors.textMuted, fontSize: 10 },
  xpSourceAmount: { ...typography.labelSm, fontWeight: '800' },
  milestonesCard: {
    backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  milestoneRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  milestoneIcon: { width: 36, height: 36, borderRadius: rounded.full, alignItems: 'center', justifyContent: 'center' },
  milestoneIconCurrent: { borderWidth: 2, borderColor: colors.primaryCoral },
  milestoneInfo: { flex: 1 },
  milestoneName: { ...typography.labelSm, color: colors.onSurface, fontWeight: '700' },
  milestoneLocked: { color: colors.textMuted },
  milestoneSub: { ...typography.labelXs, color: colors.textMuted, fontSize: 10 },
  currentBadge: {
    backgroundColor: colors.primaryLight, borderRadius: rounded.full,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  currentBadgeText: { fontSize: 8, color: colors.primaryCoral, fontWeight: '800', letterSpacing: 0.5 },
  quickActionsRow: { flexDirection: 'row', gap: 12, marginBottom: spacing.md },
  quickAction: {
    flex: 1, backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  quickActionText: { ...typography.labelSm, color: colors.onSurface, fontWeight: '700' },
});
