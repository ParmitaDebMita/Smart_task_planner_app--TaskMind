import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import CircularProgress from '../../components/common/CircularProgress';
import Icon from '../../components/common/Icon';

export const ProgressDashboardScreen = () => {
  const { weeklyStudyStats, showToast, user, navigateTo } = useTaskContext();
  const [generating, setGenerating] = useState(false);
  const [planCreated, setPlanCreated] = useState(false);

  const handleGeneratePlan = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setPlanCreated(true);
      showToast('Optimized schedule created! Added 3 focused intervals.', 'success');
    }, 900);
  };

  return (
    <View style={styles.screenWrapper}>
      {/* Top Header matching Batch 5 visual */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigateTo('HomeDashboard')} style={styles.headerIconBtn}>
          <Icon name="arrow_back" size={22} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.topHeaderTitle}>Progress Dashboard</Text>
        <TouchableOpacity onPress={() => navigateTo('ProductivityAnalytics')} style={styles.headerIconBtn}>
          <Icon name="more_vert" size={22} color={colors.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Your Progress 3-Card Summary Strip */}
        <View style={styles.yourProgressSection}>
          <Text style={styles.sectionHeaderLabel}>Your Progress</Text>
          <View style={styles.threeCardsRow}>
            {/* Card 1: Study Hours */}
            <View style={styles.pillStatCard}>
              <View style={[styles.pillIconCircle, { backgroundColor: '#EDE9FE' }]}>
                <Icon name="schedule" size={16} color="#8B5CF6" />
              </View>
              <Text style={styles.pillStatValue}>48h</Text>
              <Text style={styles.pillStatLabel}>Study Hours</Text>
            </View>

            {/* Card 2: Completion Rate */}
            <View style={styles.pillStatCard}>
              <View style={[styles.pillIconCircle, { backgroundColor: '#ECFDF5' }]}>
                <Icon name="task_alt" size={16} color="#10B981" />
              </View>
              <Text style={styles.pillStatValue}>78%</Text>
              <Text style={styles.pillStatLabel}>Completion Rate</Text>
            </View>

            {/* Card 3: Current Streak */}
            <View style={styles.pillStatCard}>
              <View style={[styles.pillIconCircle, { backgroundColor: '#FFEFEB' }]}>
                <Icon name="local_fire_department" size={16} color="#FF5B37" fill />
              </View>
              <Text style={styles.pillStatValue}>7days</Text>
              <Text style={styles.pillStatLabel}>Current Streak</Text>
            </View>
          </View>
        </View>

        {/* Quick Sub-Navigation Pills for Batch 5 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subnavRow}>
          {[
            { label: '📊 Analytics', screen: 'ProductivityAnalytics' },
            { label: '📚 Subject Progress', screen: 'SubjectProgress' },
            { label: '🎯 Goals', screen: 'Goals' },
            { label: '🗺️ Goal Map', screen: 'GoalTodayMap' },
            { label: '⭐ XP & Level', screen: 'XPLevel' },
            { label: '🏆 Badges', screen: 'Achievements' },
            { label: '🔥 Streak', screen: 'Streak' },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.subnavChip}
              onPress={() => navigateTo(item.screen)}
              activeOpacity={0.7}
            >
              <Text style={styles.subnavChipText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Header & Week Picker */}
        <View style={styles.headerSection}>
          <View style={styles.headerTitleRow}>
            <Icon name="insights" size={24} color={colors.primaryContainer} />
            <Text style={styles.headerTitle}>Productivity & Insights</Text>
          </View>

          <View style={styles.weekPickerCard}>
            <TouchableOpacity style={styles.arrowBtn}>
              <Icon name="chevron_left" size={18} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
            <View style={styles.weekDisplay}>
              <Icon name="event" size={16} color={colors.primaryContainer} />
              <Text style={styles.weekDisplayText}>This Week (Oct 21 - 27)</Text>
              <Icon name="expand_more" size={16} color={colors.onSurfaceVariant} />
            </View>
            <TouchableOpacity style={styles.arrowBtn}>
              <Icon name="chevron_right" size={18} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Motivational Streak Banner */}
        <View style={styles.streakBanner}>
          <View style={styles.streakIconCircle}>
            <Icon name="local_fire_department" size={24} color="#FBBF24" fill />
          </View>
          <View style={styles.streakTextCol}>
            <View style={styles.streakTitleRow}>
              <Text style={styles.streakTitle}>{user.streakDays} Day Streak</Text>
              <View style={styles.activeTag}>
                <Text style={styles.activeTagText}>Active</Text>
              </View>
            </View>
            <Text style={styles.streakSubtext}>
              Keep it going! Study today to hit 6 days and unlock your Weekend Shield.
            </Text>
          </View>
        </View>

        {/* Summary Stats 4-Card Grid */}
        <View style={styles.statsGrid}>
          {/* Card 1: Completed */}
          <View style={styles.statCard}>
            <View style={styles.statHeaderRow}>
              <Text style={styles.statLabel}>Completed</Text>
              <View style={styles.statIconCircle}>
                <Icon name="task_alt" size={16} color={colors.tertiary} />
              </View>
            </View>
            <Text style={styles.statValue}>{weeklyStudyStats.completedCount}</Text>
            <View style={styles.statTrendRow}>
              <View style={styles.trendPill}>
                <Icon name="trending_up" size={11} color={colors.tertiary} />
                <Text style={styles.trendText}>+4</Text>
              </View>
              <Text style={styles.trendVs}>vs last wk</Text>
            </View>
          </View>

          {/* Card 2: Pending */}
          <View style={styles.statCard}>
            <View style={styles.statHeaderRow}>
              <Text style={styles.statLabel}>Pending</Text>
              <View style={styles.statIconCircle}>
                <Icon name="pending_actions" size={16} color={colors.primaryContainer} />
              </View>
            </View>
            <Text style={styles.statValue}>{weeklyStudyStats.pendingCount}</Text>
            <Text style={styles.statSublabel}>On schedule</Text>
          </View>

          {/* Card 3: Overdue */}
          <View style={[styles.statCard, styles.statCardError]}>
            <View style={styles.statHeaderRow}>
              <Text style={[styles.statLabel, { color: colors.onErrorContainer }]}>Overdue</Text>
              <View style={[styles.statIconCircle, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
                <Icon name="alarm_off" size={16} color={colors.errorCoral} />
              </View>
            </View>
            <Text style={[styles.statValue, { color: colors.errorCoral }]}>
              {weeklyStudyStats.overdueCount}
            </Text>
            <Text style={[styles.statSublabel, { color: colors.onErrorContainer }]}>
              Needs urgent review
            </Text>
          </View>

          {/* Card 4: Study Time */}
          <View style={styles.statCard}>
            <View style={styles.statHeaderRow}>
              <Text style={styles.statLabel}>Study Time</Text>
              <View style={styles.statIconCircle}>
                <Icon name="timelapse" size={16} color={colors.secondary} />
              </View>
            </View>
            <View style={styles.timeValueRow}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.timeUnit}>h </Text>
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.timeUnit}>m</Text>
            </View>
            <Text style={styles.statSublabel}>avg 3.5h / day</Text>
          </View>
        </View>

        {/* 88% Completion Card */}
        <View style={styles.completionCard}>
          <View style={styles.completionLeft}>
            <View style={styles.completionTitleRow}>
              <Text style={styles.completionTitle}>88% Completion</Text>
              <Icon name="stars" size={18} color={colors.primaryContainer} fill />
            </View>
            <Text style={styles.completionSub}>
              Outstanding performance! You are outpacing 92% of computer science peers.
            </Text>
            <View style={styles.targetMetRow}>
              <View style={styles.greenTargetDot} />
              <Text style={styles.targetMetText}>Target met: 85% goal</Text>
            </View>
          </View>

          <CircularProgress
            size={76}
            strokeWidth={7}
            progress={weeklyStudyStats.completionRate}
            color={colors.primaryContainer}
            trackColor={colors.surfaceContainer}
            label="88%"
          />
        </View>

        {/* Weekly Activity Bar Chart */}
        <View style={styles.barChartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Weekly Study Hours</Text>
              <Text style={styles.chartSub}>Focus sessions tracked</Text>
            </View>
            <View style={styles.peakPill}>
              <View style={styles.peakDot} />
              <Text style={styles.peakPillText}>Peak: {weeklyStudyStats.peakDay}</Text>
            </View>
          </View>

          {/* Bars Stack */}
          <View style={styles.barsContainer}>
            {weeklyStudyStats.days.map((item, index) => {
              const isPeak = item.isPeak;
              return (
                <View key={index} style={styles.barColumn}>
                  <Text
                    style={[
                      styles.barHourText,
                      isPeak && { color: colors.primaryContainer, fontWeight: '700' },
                    ]}
                  >
                    {item.hours}h
                  </Text>
                  <View style={styles.barSlot}>
                    <View
                      style={[
                        styles.barBar,
                        { height: `${item.percentage}%` },
                        isPeak && styles.barBarPeak,
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.barDayText,
                      isPeak && { color: colors.primaryContainer, fontWeight: '700' },
                    ]}
                  >
                    {item.day}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Subject Progress Section */}
        <View style={styles.subjectProgressCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.cardSectionTitle}>Subject Progress</Text>
            <TouchableOpacity onPress={() => navigateTo('SubjectProgress')}>
              <Text style={styles.viewAllLink}>View All →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.subjectRowItem}>
            <View style={styles.subjectNameRow}>
              <Text style={styles.subjectTitleText}>Mathematics</Text>
              <Text style={[styles.subjectPctText, { color: '#3B82F6' }]}>85%</Text>
            </View>
            <View style={styles.subjectTrack}>
              <View style={[styles.subjectFill, { width: '85%', backgroundColor: '#3B82F6' }]} />
            </View>
          </View>
          <View style={styles.subjectRowItem}>
            <View style={styles.subjectNameRow}>
              <Text style={styles.subjectTitleText}>Physics</Text>
              <Text style={[styles.subjectPctText, { color: '#FF5B37' }]}>72%</Text>
            </View>
            <View style={styles.subjectTrack}>
              <View style={[styles.subjectFill, { width: '72%', backgroundColor: '#FF5B37' }]} />
            </View>
          </View>
          <View style={styles.subjectRowItem}>
            <View style={styles.subjectNameRow}>
              <Text style={styles.subjectTitleText}>Chemistry</Text>
              <Text style={[styles.subjectPctText, { color: '#10B981' }]}>68%</Text>
            </View>
            <View style={styles.subjectTrack}>
              <View style={[styles.subjectFill, { width: '68%', backgroundColor: '#10B981' }]} />
            </View>
          </View>
        </View>

        {/* Goal Progress Section */}
        <View style={styles.goalProgressSectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.cardSectionTitle}>Goal Progress</Text>
            <TouchableOpacity onPress={() => navigateTo('Goals')}>
              <Text style={styles.viewAllLink}>View All →</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.goalPreviewRow}
            onPress={() => navigateTo('GoalTodayMap')}
          >
            <View style={[styles.goalIconBox, { backgroundColor: '#EDE9FE' }]}>
              <Icon name="emoji_events" size={18} color="#8B5CF6" />
            </View>
            <View style={styles.goalInfoCol}>
              <Text style={styles.goalTitlePreview}>Score 90% in Exams</Text>
              <Text style={styles.goalSubPreview}>Academic Goal · Target: Nov 2026</Text>
            </View>
            <View style={styles.goalProgressBadge}>
              <Text style={styles.goalBadgeText}>80%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Gemini AI Productivity Insights Section */}
        <View style={styles.insightsSection}>
          <View style={styles.insightsHeader}>
            <View style={styles.insightsTitleRow}>
              <Icon name="auto_awesome" size={20} color={colors.secondary} fill />
              <Text style={styles.insightsTitle}>Gemini AI Insights</Text>
            </View>
            <View style={styles.smartSyncBadge}>
              <Text style={styles.smartSyncBadgeText}>Smart Sync</Text>
            </View>
          </View>

          {/* Insight 1: Evening Peak */}
          <View style={styles.insightCard}>
            <View style={styles.insightIconCircle}>
              <Icon name="bedtime" size={18} color={colors.primaryContainer} />
            </View>
            <View style={styles.insightTextCol}>
              <Text style={styles.insightCardTitle}>Evening Peak Flow</Text>
              <Text style={styles.insightCardBody}>
                You complete <Text style={{ fontWeight: '700', color: colors.onSurface }}>68% of your tasks</Text> between 7 PM and 11 PM. Protect this window from casual meetings.
              </Text>
            </View>
          </View>

          {/* Insight 2: Deadline Nearing */}
          <View style={styles.insightCard}>
            <View style={styles.insightIconCircle}>
              <Icon name="visibility" size={18} color={colors.secondary} />
            </View>
            <View style={styles.insightTextCol}>
              <View style={styles.insightHeaderRow}>
                <Text style={styles.insightCardTitle}>DBMS Deadline Nearing</Text>
                <View style={styles.tomorrowBadge}>
                  <Text style={styles.tomorrowBadgeText}>Tomorrow</Text>
                </View>
              </View>
              <Text style={styles.insightCardBody}>
                Deadline is approaching (Tomorrow 11:59 PM). We recommend scheduling your final 45m review at 4 PM.
              </Text>
              <TouchableOpacity
                style={styles.insightActionBtn}
                onPress={() => showToast('Reserved 4:00 PM slot in timetable!', 'success')}
              >
                <Icon name="calendar_add_on" size={14} color={colors.primaryContainer} />
                <Text style={styles.insightActionBtnText}>Reserve 4:00 PM slot</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Insight 3: Heavy Load Alert */}
          <View style={styles.insightCard}>
            <View style={styles.insightIconCircle}>
              <Icon name="warning_amber" size={18} color={colors.warning} />
            </View>
            <View style={styles.insightTextCol}>
              <Text style={styles.insightCardTitle}>Heavy Load Tomorrow</Text>
              <Text style={styles.insightCardBody}>
                You have 4 tasks scheduled. Consider rescheduling C Programming practice to Friday for balanced cognitive stamina.
              </Text>
              <TouchableOpacity
                style={[styles.insightActionBtn, { backgroundColor: colors.surfaceContainer }]}
                onPress={() => showToast('C Programming practice deferred to Friday', 'info')}
              >
                <Icon name="low_priority" size={14} color={colors.onSurfaceVariant} />
                <Text style={[styles.insightActionBtnText, { color: colors.onSurfaceVariant }]}>
                  Defer to Friday
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Primary Action: Generate Optimized Plan CTA */}
        <TouchableOpacity
          style={[styles.generatePlanBtn, planCreated && styles.generatePlanBtnDone]}
          onPress={handleGeneratePlan}
          activeOpacity={0.88}
        >
          <Icon name={planCreated ? 'done_all' : 'bolt'} size={20} color={colors.onPrimary} fill />
          <Text style={styles.generatePlanBtnText}>
            {generating
              ? 'Calculating optimal focus blocks...'
              : planCreated
              ? 'Plan Generated for Tomorrow'
              : 'Generate Optimized Plan for Tomorrow ⚡'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.sm,
    paddingBottom: 96,
    gap: spacing.md,
  },
  headerSection: {
    gap: spacing.xs,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    ...typography.headlineLg,
    color: colors.onSurface,
    fontWeight: '700',
  },
  weekPickerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: rounded.lg,
    ...shadows.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
  },
  weekDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  weekDisplayText: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  arrowBtn: {
    width: 30,
    height: 30,
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakBanner: {
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.xl,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    ...shadows.sm,
  },
  streakIconCircle: {
    width: 40,
    height: 40,
    borderRadius: rounded.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakTextCol: {
    flex: 1,
  },
  streakTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakTitle: {
    ...typography.titleLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  activeTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  activeTagText: {
    ...typography.labelSm,
    color: colors.onPrimary,
    fontWeight: '600',
  },
  streakSubtext: {
    ...typography.bodySm,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
    lineHeight: 18,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    minWidth: '46%',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.lg,
    padding: spacing.md,
    ...shadows.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
    gap: 4,
  },
  statCardError: {
    backgroundColor: 'rgba(255, 218, 214, 0.4)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  statHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statLabel: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  statIconCircle: {
    width: 26,
    height: 26,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    ...typography.headlineXl,
    color: colors.onSurface,
    fontWeight: '800',
  },
  statTrendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  trendText: {
    ...typography.labelSm,
    color: colors.tertiary,
    fontWeight: '700',
  },
  trendVs: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  statSublabel: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  timeValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  timeUnit: {
    ...typography.titleMd,
    color: colors.onSurface,
  },
  completionCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
  },
  completionLeft: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  completionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  completionTitle: {
    ...typography.titleLg,
    color: colors.onSurface,
    fontWeight: '700',
  },
  completionSub: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 4,
    lineHeight: 18,
  },
  targetMetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  greenTargetDot: {
    width: 8,
    height: 8,
    borderRadius: rounded.full,
    backgroundColor: colors.tertiaryContainer,
  },
  targetMetText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  barChartCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    ...shadows.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
    gap: spacing.md,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  chartSub: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  peakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.md,
  },
  peakDot: {
    width: 6,
    height: 6,
    borderRadius: rounded.full,
    backgroundColor: colors.primaryContainer,
  },
  peakPillText: {
    ...typography.labelSm,
    color: colors.onSurface,
    fontWeight: '600',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
    paddingTop: 10,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  barHourText: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  barSlot: {
    width: 22,
    height: 90,
    backgroundColor: colors.surfaceContainer,
    borderRadius: rounded.sm,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barBar: {
    width: '100%',
    backgroundColor: colors.primaryFixedDim,
    borderRadius: rounded.sm,
  },
  barBarPeak: {
    backgroundColor: colors.primaryContainer,
  },
  barDayText: {
    ...typography.labelSm,
    color: colors.onSurface,
  },
  insightsSection: {
    gap: spacing.sm,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  insightsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  insightsTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  smartSyncBadge: {
    backgroundColor: colors.secondaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  smartSyncBadgeText: {
    ...typography.labelSm,
    color: colors.onSecondaryFixed,
    fontWeight: '600',
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.md,
    borderRadius: rounded.lg,
    ...shadows.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
  },
  insightIconCircle: {
    width: 36,
    height: 36,
    borderRadius: rounded.md,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  insightTextCol: {
    flex: 1,
    gap: 4,
  },
  insightHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  insightCardTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  tomorrowBadge: {
    backgroundColor: colors.errorContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  tomorrowBadgeText: {
    ...typography.labelSm,
    color: colors.onErrorContainer,
    fontWeight: '600',
  },
  insightCardBody: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    lineHeight: 19,
  },
  insightActionBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: rounded.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  insightActionBtnText: {
    ...typography.labelSm,
    color: colors.primaryContainer,
    fontWeight: '600',
  },
  generatePlanBtn: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    ...shadows.xs,
  },
  generatePlanBtnDone: {
    backgroundColor: colors.tertiaryContainer,
  },
  generatePlanBtnText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  // Batch 5 Visual Additions
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerIconBtn: {
    padding: 6,
    borderRadius: rounded.full,
  },
  topHeaderTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  yourProgressSection: {
    gap: 8,
  },
  sectionHeaderLabel: {
    ...typography.labelMd,
    color: colors.textSecondary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontSize: 11,
  },
  threeCardsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pillStatCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: rounded.xl,
    padding: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.xs,
  },
  pillIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  pillStatValue: {
    ...typography.headlineSm,
    fontWeight: '800',
    color: colors.onSurface,
  },
  pillStatLabel: {
    ...typography.labelXs,
    color: colors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
  },
  subnavRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  subnavChip: {
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  subnavChipText: {
    ...typography.labelSm,
    fontWeight: '600',
    color: colors.onSurface,
  },
  subjectProgressCard: {
    backgroundColor: colors.surface,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: 12,
    ...shadows.xs,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardSectionTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  viewAllLink: {
    ...typography.labelSm,
    color: colors.primaryCoral,
    fontWeight: '600',
  },
  subjectRowItem: {
    gap: 4,
  },
  subjectNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectTitleText: {
    ...typography.bodyMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  subjectPctText: {
    ...typography.labelMd,
    fontWeight: '700',
  },
  subjectTrack: {
    height: 8,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 4,
    overflow: 'hidden',
  },
  subjectFill: {
    height: '100%',
    borderRadius: 4,
  },
  goalProgressSectionCard: {
    backgroundColor: colors.surface,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: 10,
    ...shadows.xs,
  },
  goalPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    padding: 10,
    borderRadius: rounded.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: 10,
  },
  goalIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalInfoCol: {
    flex: 1,
  },
  goalTitlePreview: {
    ...typography.bodyMd,
    fontWeight: '700',
    color: colors.onSurface,
  },
  goalSubPreview: {
    ...typography.labelXs,
    color: colors.textSecondary,
    fontSize: 11,
  },
  goalProgressBadge: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
  },
  goalBadgeText: {
    ...typography.labelSm,
    color: '#8B5CF6',
    fontWeight: '700',
  },
});

export default ProgressDashboardScreen;
