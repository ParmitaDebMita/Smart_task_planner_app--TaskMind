import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

// Calendar data — Sept 2025
const DAYS_OF_WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const CALENDAR_ROWS = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, null, null, null, null, null],
];

// Study consistency map: day -> status ('full' | 'partial' | 'missed' | 'rest' | null)
const STUDY_MAP = {
  1: 'full', 2: 'full', 3: 'full', 4: 'partial', 5: 'full', 6: 'rest', 7: 'rest',
  8: 'full', 9: 'full', 10: 'missed', 11: 'full', 12: 'full', 13: 'rest', 14: 'rest',
  15: 'full', 16: 'full', 17: 'full', 18: 'full', 19: 'full', 20: 'partial', 21: 'rest',
  22: 'full', 23: 'full', 24: 'full', 25: 'full', 26: 'full', 27: 'full', 28: 'full',
  29: 'full', 30: 'full',
};

const statusColor = {
  full: '#10B981',
  partial: '#F59E0B',
  missed: '#EF4444',
  rest: colors.surfaceDim,
};

const statusBg = {
  full: '#ECFDF5',
  partial: '#FEF3C7',
  missed: '#FEE2E2',
  rest: colors.surfaceDim,
};

export const StreakScreen = () => {
  const { user, navigateTo } = useTaskContext();

  const currentStreak = user.streakDays || 7;
  const bestStreak = 21;

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('ProgressDashboard')} style={styles.backBtn}>
          <Icon name="arrow_back" size={22} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Study Streak</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Streak Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroStreakCircle}>
            <Icon name="local_fire_department" size={36} color="#FF5B37" />
            <Text style={styles.heroStreakNum}>{currentStreak}</Text>
            <Text style={styles.heroStreakLabel}>days</Text>
          </View>
          <Text style={styles.heroTitle}>Study Streak</Text>
          <Text style={styles.heroSub}>You've been studying every day for {currentStreak} days!</Text>
        </View>

        {/* Streak Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderLeftColor: '#FF5B37' }]}>
            <Icon name="local_fire_department" size={20} color="#FF5B37" />
            <Text style={styles.statValue}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Current</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: '#8B5CF6' }]}>
            <Icon name="emoji_events" size={20} color="#8B5CF6" />
            <Text style={styles.statValue}>{bestStreak}</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
        </View>

        {/* Weekly Consistency matching Screen 8 */}
        <Text style={styles.sectionTitle}>Weekly Consistency</Text>
        <View style={styles.weeklyConsistencyCard}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
            <View key={idx} style={styles.consistencyDayCol}>
              <View style={styles.checkCircleGreen}>
                <Icon name="check" size={14} color="#FFFFFF" />
              </View>
              <Text style={styles.consistencyDayLabel}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Consistency */}
        <View style={styles.calendarCard}>
          <Text style={styles.calendarMonth}>September 2025</Text>
          {/* Day headers */}
          <View style={styles.calendarRow}>
            {DAYS_OF_WEEK.map((d, i) => (
              <View key={i} style={styles.calendarCell}>
                <Text style={styles.calendarDayHeader}>{d}</Text>
              </View>
            ))}
          </View>
          {/* Calendar grid */}
          {CALENDAR_ROWS.map((row, ri) => (
            <View key={ri} style={styles.calendarRow}>
              {row.map((day, di) => {
                const status = day ? (STUDY_MAP[day] || null) : null;
                const bg = status ? statusBg[status] : 'transparent';
                const fg = status ? statusColor[status] : 'transparent';
                return (
                  <View key={di} style={styles.calendarCell}>
                    {day ? (
                      <View style={[styles.calendarDot, { backgroundColor: bg, borderColor: fg, borderWidth: status === 'full' ? 2 : 1 }]}>
                        <Text style={[styles.calendarDayText, { color: status === 'full' ? '#10B981' : status === 'missed' ? '#EF4444' : colors.textSecondary }]}>
                          {day}
                        </Text>
                      </View>
                    ) : <View style={styles.calendarDotEmpty} />}
                  </View>
                );
              })}
            </View>
          ))}
          {/* Legend */}
          <View style={styles.legendRow}>
            {[
              { label: 'Full', color: '#10B981' },
              { label: 'Partial', color: '#F59E0B' },
              { label: 'Missed', color: '#EF4444' },
              { label: 'Rest Day', color: colors.textMuted },
            ].map((item, i) => (
              <View key={i} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Consistency */}
        <Text style={styles.sectionTitle}>Recent Study Days</Text>
        <View style={styles.recentCard}>
          {[
            { day: 'Today', status: 'full', detail: '2h 15m studied', icon: 'check_circle' },
            { day: 'Yesterday', status: 'full', detail: '1h 45m studied', icon: 'check_circle' },
            { day: '2 days ago', status: 'full', detail: '3h studied', icon: 'check_circle' },
            { day: '3 days ago', status: 'partial', detail: '30m studied', icon: 'remove_circle' },
            { day: '4 days ago', status: 'full', detail: '2h studied', icon: 'check_circle' },
          ].map((item, i) => (
            <View key={i} style={[styles.recentRow, i < 4 && styles.recentRowBorder]}>
              <Icon name={item.icon} size={18} color={statusColor[item.status]} />
              <View style={styles.recentInfo}>
                <Text style={styles.recentDay}>{item.day}</Text>
                <Text style={styles.recentDetail}>{item.detail}</Text>
              </View>
              <View style={[styles.recentBadge, { backgroundColor: statusBg[item.status] }]}>
                <Text style={[styles.recentBadgeText, { color: statusColor[item.status] }]}>
                  {item.status === 'full' ? '✓ Done' : item.status === 'partial' ? 'Partial' : 'Missed'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Recovery / Comeback */}
        <View style={styles.comebackCard}>
          <Icon name="replay" size={18} color="#8B5CF6" />
          <View style={styles.comebackInfo}>
            <Text style={styles.comebackTitle}>Comeback Activated!</Text>
            <Text style={styles.comebackDesc}>
              You recovered from a missed day on Oct 10. Your streak came back stronger — that's what matters!
            </Text>
          </View>
        </View>

        {/* Motivational Message */}
        <View style={styles.motivationCard}>
          <Icon name="auto_awesome" size={16} color={colors.primaryCoral} />
          <Text style={styles.motivationText}>
            Your daily streak is on fire! 🔥 Keep going — just 3 more days and you'll unlock the <Text style={{ fontWeight: '700' }}>Weekend Shield</Text> badge.
          </Text>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default StreakScreen;

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
  heroCard: {
    backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.lg, alignItems: 'center', marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  heroStreakCircle: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#FFEFEB', borderWidth: 3, borderColor: '#FF5B37',
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm,
  },
  heroStreakNum: { ...typography.headlineXl, fontWeight: '900', color: '#FF5B37', marginTop: -4 },
  heroStreakLabel: { ...typography.labelSm, color: '#FF5B37', fontWeight: '600', marginTop: -4 },
  heroTitle: { ...typography.titleLg, color: colors.onSurface, fontWeight: '800', marginBottom: 4 },
  heroSub: { ...typography.bodySm, color: colors.textSecondary, textAlign: 'center' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: spacing.md },
  statCard: {
    flex: 1, backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, alignItems: 'center', gap: 4,
    borderWidth: 1, borderColor: colors.borderLight, borderLeftWidth: 4,
  },
  statValue: { ...typography.headlineLg, fontWeight: '900', color: colors.onSurface },
  statLabel: { ...typography.labelSm, color: colors.textSecondary },
  sectionTitle: { ...typography.titleMd, color: colors.onSurface, fontWeight: '700', marginBottom: spacing.sm },
  weeklyConsistencyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: rounded.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  consistencyDayCol: {
    alignItems: 'center',
    gap: 6,
  },
  checkCircleGreen: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  consistencyDayLabel: {
    ...typography.labelXs,
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 11,
  },
  calendarCard: {
    backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  calendarMonth: { ...typography.labelLg, color: colors.onSurface, fontWeight: '700', textAlign: 'center', marginBottom: spacing.sm },
  calendarRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 4 },
  calendarCell: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  calendarDayHeader: { ...typography.labelSm, color: colors.textMuted, fontWeight: '700' },
  calendarDot: {
    width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center',
  },
  calendarDotEmpty: { width: 30, height: 30 },
  calendarDayText: { fontSize: 11, fontWeight: '600' },
  legendRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: spacing.sm },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { ...typography.labelMd, color: colors.textMuted, fontSize: 10 },
  recentCard: {
    backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  recentRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  recentRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  recentInfo: { flex: 1 },
  recentDay: { ...typography.labelLg, color: colors.onSurface, fontWeight: '600' },
  recentDetail: { ...typography.labelMd, color: colors.textMuted, fontSize: 10 },
  recentBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: rounded.full },
  recentBadgeText: { fontSize: 10, fontWeight: '700' },
  comebackCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: '#F3E8FF', borderRadius: rounded.xl,
    padding: spacing.md, marginBottom: spacing.md,
    borderLeftWidth: 3, borderLeftColor: '#8B5CF6',
  },
  comebackInfo: { flex: 1 },
  comebackTitle: { ...typography.labelLg, color: '#5B21B6', fontWeight: '700', marginBottom: 2 },
  comebackDesc: { ...typography.bodySm, color: '#7C3AED', lineHeight: 18 },
  motivationCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: colors.primaryLight, borderRadius: rounded.lg,
    padding: spacing.sm, borderLeftWidth: 3, borderLeftColor: colors.primaryCoral,
  },
  motivationText: { ...typography.bodySm, color: colors.primaryDark, flex: 1, lineHeight: 18 },
});
