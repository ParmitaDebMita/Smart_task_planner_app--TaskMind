import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';
import TaskMindMascot from '../../components/common/TaskMindMascot';

const ACHIEVEMENTS = [
  { id: 'a1', icon: 'local_fire_department', title: '7 Day Streak', desc: 'Keep it up!', color: '#FF5B37', bg: '#FFEFEB', earned: true, date: 'Thu 14:10' },
  { id: 'a2', icon: 'shield', title: 'Difficult Task Completed', desc: 'You did it!', color: '#3B82F6', bg: '#EFF6FF', earned: true, date: 'Thu 16:45' },
  { id: 'a3', icon: 'restart_alt', title: 'Comeback', desc: 'Back on them!', color: '#F59E0B', bg: '#FEF3C7', earned: true, date: 'Oct 5' },
  { id: 'a4', icon: 'stars', title: 'Goal Achieved', desc: 'Big step!', color: '#EC4899', bg: '#FCE7F3', earned: true, date: 'Oct 8' },
  { id: 'a5', icon: 'timer', title: 'Deep Focus', desc: '3h session', color: '#06B6D4', bg: '#ECFEFF', earned: true, date: 'Oct 18' },
  { id: 'a6', icon: 'school', title: 'Exam Preparation', desc: 'On fire!', color: '#10B981', bg: '#ECFDF5', earned: true, date: 'Oct 20' },
  { id: 'a7', icon: 'workspace_premium', title: "Dean's Focus", desc: 'Study 50 hours in a single month', color: '#4F46E5', bg: '#EDE9FE', earned: false, progress: 72 },
  { id: 'a8', icon: 'bolt', title: 'Speed Scholar', desc: 'Complete 5 tasks before their due dates', color: '#FF5B37', bg: '#FFEFEB', earned: false, progress: 60 },
  { id: 'a9', icon: 'verified', title: 'Zero Overdue', desc: 'Go a full month with no overdue tasks', color: '#10B981', bg: '#ECFDF5', earned: false, progress: 25 },
];

export const AchievementsScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const earned = ACHIEVEMENTS.filter(a => a.earned);
  const locked = ACHIEVEMENTS.filter(a => !a.earned);

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('ProgressDashboard')} style={styles.backBtn}>
          <Icon name="arrow_back" size={22} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Achievements</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Mascot */}
        <View style={styles.heroSection}>
          <TaskMindMascot size={100} variant="celebrating" showBackground />
          <View style={styles.heroStats}>
            <Text style={styles.heroCount}>{earned.length}</Text>
            <Text style={styles.heroLabel}>Earned</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStats}>
            <Text style={[styles.heroCount, { color: colors.textMuted }]}>{locked.length}</Text>
            <Text style={styles.heroLabel}>Locked</Text>
          </View>
        </View>

        {/* Earned Section */}
        <Text style={styles.sectionTitle}>🏆 Earned</Text>
        <View style={styles.badgeGrid}>
          {earned.map(a => (
            <TouchableOpacity key={a.id} style={styles.badgeCard} activeOpacity={0.8}
              onPress={() => showToast(`${a.title} — earned ${a.date}!`, 'success')}>
              <View style={[styles.badgeIconBox, { backgroundColor: a.bg }]}>
                <Icon name={a.icon} size={24} color={a.color} />
              </View>
              <Text style={styles.badgeTitle} numberOfLines={1}>{a.title}</Text>
              <Text style={styles.badgeDesc} numberOfLines={2}>{a.desc}</Text>
              <Text style={[styles.badgeDate, { color: a.color }]}>{a.date}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Locked Section */}
        <Text style={styles.sectionTitle}>🔒 In Progress</Text>
        <View style={styles.lockedList}>
          {locked.map(a => (
            <View key={a.id} style={styles.lockedCard}>
              <View style={[styles.lockedIconBox, { backgroundColor: colors.surfaceDim }]}>
                <Icon name={a.icon} size={20} color={colors.textMuted} />
              </View>
              <View style={styles.lockedInfo}>
                <Text style={styles.lockedTitle}>{a.title}</Text>
                <Text style={styles.lockedDesc}>{a.desc}</Text>
                <View style={styles.lockedProgressRow}>
                  <View style={styles.lockedProgressTrack}>
                    <View style={[styles.lockedProgressFill, { width: `${a.progress}%`, backgroundColor: a.color }]} />
                  </View>
                  <Text style={[styles.lockedPct, { color: a.color }]}>{a.progress}%</Text>
                </View>
              </View>
              <Icon name="lock" size={14} color={colors.textMuted} />
            </View>
          ))}
        </View>

        {/* Motivational Footer */}
        <View style={styles.motivationCard}>
          <Icon name="auto_awesome" size={16} color={colors.primaryCoral} />
          <Text style={styles.motivationText}>
            Try to unlock <Text style={{ fontWeight: '700' }}>Perfect Week</Text> — you're at 85%! Keep all tasks on time this week.
          </Text>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default AchievementsScreen;

const styles = StyleSheet.create({
  screenWrapper: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.xs,
    backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  backBtn: { padding: 6, width: 36 },
  headerTitle: { ...typography.headlineMd, color: colors.onSurface, fontWeight: '700' },
  scrollContent: { padding: spacing.md, paddingBottom: 100 },
  heroSection: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, marginBottom: spacing.md, gap: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  heroStats: { alignItems: 'center' },
  heroCount: { ...typography.headlineLg, fontWeight: '900', color: colors.primaryCoral },
  heroLabel: { ...typography.labelSm, color: colors.textSecondary },
  heroStatDivider: { width: 1, height: 36, backgroundColor: colors.borderLight },
  sectionTitle: { ...typography.titleMd, color: colors.onSurface, fontWeight: '700', marginBottom: spacing.sm },
  badgeGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: spacing.lg,
  },
  badgeCard: {
    width: '47%', backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, alignItems: 'center',
    borderWidth: 1, borderColor: colors.borderLight, minHeight: 120,
  },
  badgeIconBox: {
    width: 48, height: 48, borderRadius: rounded.full,
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  badgeTitle: { ...typography.labelSm, color: colors.onSurface, fontWeight: '700', textAlign: 'center', marginBottom: 2 },
  badgeDesc: { ...typography.labelMd, color: colors.textMuted, textAlign: 'center', fontSize: 10, lineHeight: 13, marginBottom: 4 },
  badgeDate: { fontSize: 9, fontWeight: '700' },
  lockedList: { gap: spacing.sm, marginBottom: spacing.md },
  lockedCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, borderWidth: 1, borderColor: colors.borderLight,
    opacity: 0.75,
  },
  lockedIconBox: { width: 40, height: 40, borderRadius: rounded.lg, alignItems: 'center', justifyContent: 'center' },
  lockedInfo: { flex: 1 },
  lockedTitle: { ...typography.labelLg, color: colors.onSurface, fontWeight: '700' },
  lockedDesc: { ...typography.labelMd, color: colors.textMuted, fontSize: 10, marginBottom: 4 },
  lockedProgressRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  lockedProgressTrack: { flex: 1, height: 6, backgroundColor: colors.surfaceDim, borderRadius: 3, overflow: 'hidden' },
  lockedProgressFill: { height: '100%', borderRadius: 3 },
  lockedPct: { ...typography.labelSm, fontWeight: '800', width: 30, textAlign: 'right' },
  motivationCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: colors.primaryLight, borderRadius: rounded.lg,
    padding: spacing.sm, borderLeftWidth: 3, borderLeftColor: colors.primaryCoral,
  },
  motivationText: { ...typography.bodySm, color: colors.primaryDark, flex: 1, lineHeight: 18 },
});
