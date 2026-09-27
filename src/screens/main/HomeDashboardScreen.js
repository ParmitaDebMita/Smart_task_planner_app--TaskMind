import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import TaskCard from '../../components/common/TaskCard';
import CircularProgress from '../../components/common/CircularProgress';
import Icon from '../../components/common/Icon';

export const HomeDashboardScreen = () => {
  const { user, tasks, exams, navigateTo, toggleTaskCompleted, showToast } = useTaskContext();

  const primaryAITask = tasks.find(t => t.id === 'task-1') || tasks[0];
  const upcomingTasks = tasks.filter(t => !t.isCompleted && t.id !== primaryAITask?.id).slice(0, 4);

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const totalCount = tasks.length;
  const progressPercent = Math.round((completedCount / (totalCount || 1)) * 100);

  return (
    <View style={styles.screenWrapper}>
      <Header title="TaskMind" subtitle="Home" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Greeting Header & Streak Pill */}
        <View style={styles.greetingRow}>
          <View style={styles.greetingTextColumn}>
            <View style={styles.greetingTitleRow}>
              <Text style={styles.greetingName}>Hey, {user.name.split(' ')[0]}</Text>
              <Text style={styles.waveEmoji}>👋</Text>
            </View>
            <Text style={styles.greetingSubtitle}>Ready to conquer your academic goals today?</Text>
          </View>

          <View style={styles.streakBadge}>
            <Icon name="local_fire_department" size={18} color={colors.primaryContainer} fill />
            <Text style={styles.streakText}>{user.streakDays} Day Streak</Text>
          </View>
        </View>

        {/* Primary AI Hero Card: "What should I do first?" */}
        {primaryAITask && (
          <View style={styles.aiHeroCard}>
            {/* Ambient Indigo Glow */}
            <View style={styles.ambientGlow} />

            <View style={styles.aiHeroHeader}>
              <View style={styles.aiHeaderLeft}>
                <Icon name="auto_awesome" size={20} color={colors.secondary} fill />
                <Text style={styles.aiHeaderTitle}>What should I do first?</Text>
              </View>
              <View style={styles.geminiBadge}>
                <Icon name="magic_button" size={13} color={colors.onSecondaryFixed} fill />
                <Text style={styles.geminiBadgeText}>Gemini AI</Text>
              </View>
            </View>

            {/* AI Task Container */}
            <TouchableOpacity
              style={styles.aiTaskBody}
              onPress={() => navigateTo('TaskDetails', { taskId: primaryAITask.id })}
              activeOpacity={0.88}
            >
              <View style={styles.aiTaskTitleRow}>
                <Text style={styles.aiTaskTitle} numberOfLines={2}>
                  {primaryAITask.title}
                </Text>
                <View style={styles.duePill}>
                  <Text style={styles.duePillText}>{primaryAITask.dueDate}</Text>
                </View>
              </View>

              {/* Metadata strip */}
              <View style={styles.aiMetaStrip}>
                <View style={styles.metaBadge}>
                  <Icon name="timelapse" size={14} color={colors.outline} />
                  <Text style={styles.metaBadgeText}>Est. 2h 30m</Text>
                </View>
                <View style={styles.metaBadge}>
                  <Icon name="priority_high" size={14} color={colors.errorCoral} />
                  <Text style={[styles.metaBadgeText, { color: colors.errorCoral, fontWeight: '600' }]}>
                    High Priority
                  </Text>
                </View>
                <View style={styles.urgencyScorePill}>
                  <Text style={styles.urgencyScoreText}>Urgency Score: {primaryAITask.urgencyScore}/100</Text>
                </View>
              </View>

              {/* AI Rationale Pill */}
              <View style={styles.aiRationaleBox}>
                <Icon name="bolt" size={16} color={colors.primaryContainer} style={{ marginTop: 1 }} />
                <Text style={styles.aiRationaleText}>
                  <Text style={styles.aiRationaleBold}>AI Pick: </Text>
                  {primaryAITask.aiReason}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Quick Actions */}
            <View style={styles.aiActionRow}>
              <TouchableOpacity
                style={styles.startFocusBtn}
                onPress={() => navigateTo('FocusChamber', { taskId: primaryAITask.id })}
                activeOpacity={0.85}
              >
                <Icon name="play_circle" size={18} color={colors.onPrimary} />
                <Text style={styles.startFocusBtnText}>Start Focus Session (45m)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.markDoneBtn,
                  primaryAITask.isCompleted && styles.markDoneBtnActive,
                ]}
                onPress={() => toggleTaskCompleted(primaryAITask.id)}
                activeOpacity={0.85}
                accessibilityLabel="Mark task as done"
              >
                <Icon
                  name="check"
                  size={22}
                  color={primaryAITask.isCompleted ? colors.tertiary : colors.onSurfaceVariant}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Today's Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View style={styles.progressHeaderLeft}>
              <Icon name="donut_large" size={20} color={colors.primaryContainer} />
              <Text style={styles.progressHeaderTitle}>Today's Progress</Text>
            </View>
            <Text style={styles.progressPercentText}>{progressPercent}% Complete</Text>
          </View>

          <View style={styles.progressBody}>
            <CircularProgress
              size={64}
              strokeWidth={6}
              progress={progressPercent}
              color={colors.primaryContainer}
              trackColor={colors.surfaceContainerHighest}
              label={`${completedCount}/${totalCount}`}
            />

            <View style={styles.progressDetails}>
              <Text style={styles.progressSubhead}>
                {completedCount} of {totalCount} tasks completed
              </Text>
              <View style={styles.focusGoalRow}>
                <Icon name="timelapse" size={16} color={colors.secondary} />
                <Text style={styles.focusGoalText}>
                  <Text style={{ fontWeight: '700', color: colors.onSurface }}>1h 45m</Text> focused / 3h daily goal
                </Text>
              </View>
              {/* Horizontal Bar */}
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: '58%' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Exam Countdown Banner */}
        <TouchableOpacity
          style={styles.examBanner}
          onPress={() => navigateTo('ExamTracker')}
          activeOpacity={0.88}
        >
          <View style={styles.examLeft}>
            <View style={styles.examIconBox}>
              <Icon name="school" size={24} color={colors.primaryContainer} />
            </View>
            <View style={styles.examTextColumn}>
              <Text style={styles.examTitle}>{exams[0]?.title || 'Mid-Term Exams in 12 Days'}</Text>
              <View style={styles.examSubRow}>
                <View style={styles.redDot} />
                <Text style={styles.examSubtitle}>{exams[0]?.highlight || 'Data Mining Viva in 4 days'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.examForwardBtn}>
            <Icon name="arrow_forward" size={18} color={colors.onPrimaryFixed} />
          </View>
        </TouchableOpacity>

        {/* Upcoming Tasks Section */}
        <View style={styles.upcomingSection}>
          <View style={styles.upcomingHeaderRow}>
            <View style={styles.upcomingTitleRow}>
              <Text style={styles.upcomingTitle}>Upcoming Tasks</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>{upcomingTasks.length}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.seeAllBtn}
              onPress={() => navigateTo('UpcomingTasks')}
            >
              <Text style={styles.seeAllText}>See all</Text>
              <Icon name="chevron_right" size={16} color={colors.primaryContainer} />
            </TouchableOpacity>
          </View>

          <View style={styles.tasksList}>
            {upcomingTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </View>
        </View>

        {/* Quick Access Feature Grid */}
        <View style={styles.quickAccessSection}>
          <Text style={styles.quickAccessTitle}>Quick Access</Text>
          <View style={styles.quickAccessGrid}>
            <TouchableOpacity
              style={styles.quickAccessCard}
              onPress={() => navigateTo('AIRoutine')}
              activeOpacity={0.85}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: 'rgba(79,70,229,0.10)' }]}>
                <Icon name="auto_awesome" size={22} color={colors.primaryContainer} fill />
              </View>
              <Text style={styles.quickAccessLabel}>AI Routine</Text>
              <Text style={styles.quickAccessSub}>Generate & manage</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAccessCard}
              onPress={() => navigateTo('ConnectPortal')}
              activeOpacity={0.85}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: 'rgba(16,185,129,0.10)' }]}>
                <Icon name="hub" size={22} color={colors.tertiary} fill />
              </View>
              <Text style={styles.quickAccessLabel}>Portal</Text>
              <Text style={styles.quickAccessSub}>PULMS sync</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAccessCard}
              onPress={() => navigateTo('ExamTracker')}
              activeOpacity={0.85}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: 'rgba(245,158,11,0.10)' }]}>
                <Icon name="event_note" size={22} color="#F59E0B" fill />
              </View>
              <Text style={styles.quickAccessLabel}>Exam Tracker</Text>
              <Text style={styles.quickAccessSub}>Deadlines & prep</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAccessCard}
              onPress={() => navigateTo('AISmartScheduling')}
              activeOpacity={0.85}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: 'rgba(139,92,246,0.10)' }]}>
                <Icon name="psychology" size={22} color="#8B5CF6" fill />
              </View>
              <Text style={styles.quickAccessLabel}>AI Schedule</Text>
              <Text style={styles.quickAccessSub}>Smart planner</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Smart Suggestion Pill at Bottom */}
        <View style={styles.smartTipPill}>
          <View style={styles.tipIconCircle}>
            <Icon name="lightbulb" size={18} color={colors.secondary} />
          </View>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Tip: </Text>
            You have a free 2-hour window between <Text style={styles.tipTime}>3:00 PM and 5:00 PM</Text>. Perfect for finishing <Text style={{ color: colors.primaryContainer, fontWeight: '600' }}>IoT Practical</Text>.
          </Text>
        </View>
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
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xs,
  },
  greetingTextColumn: {
    flex: 1,
  },
  greetingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  greetingName: {
    ...typography.headlineLg,
    color: colors.onSurface,
    fontWeight: '700',
  },
  waveEmoji: {
    fontSize: 22,
  },
  greetingSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.8)',
  },
  streakText: {
    ...typography.labelMd,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  aiHeroCard: {
    position: 'relative',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    ...shadows.md,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.12)',
    overflow: 'hidden',
  },
  ambientGlow: {
    position: 'absolute',
    top: -48,
    right: -48,
    width: 140,
    height: 140,
    borderRadius: rounded.full,
    backgroundColor: 'rgba(226, 223, 255, 0.45)',
  },
  aiHeroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  aiHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aiHeaderTitle: {
    ...typography.labelLg,
    color: colors.onSurface,
    fontWeight: '700',
  },
  geminiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.secondaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
  },
  geminiBadgeText: {
    ...typography.labelSm,
    color: colors.onSecondaryFixed,
    fontWeight: '700',
  },
  aiTaskBody: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  aiTaskTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: 6,
  },
  aiTaskTitle: {
    flex: 1,
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '600',
    lineHeight: 20,
  },
  duePill: {
    backgroundColor: colors.errorContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
  },
  duePillText: {
    ...typography.labelSm,
    color: colors.onErrorContainer,
    fontWeight: '600',
  },
  aiMetaStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaBadgeText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  urgencyScorePill: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: rounded.sm,
  },
  urgencyScoreText: {
    ...typography.labelSm,
    color: colors.onSurface,
    fontWeight: '700',
  },
  aiRationaleBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 8,
    borderRadius: rounded.sm,
  },
  aiRationaleText: {
    flex: 1,
    ...typography.bodySm,
    color: colors.onSurface,
    lineHeight: 18,
  },
  aiRationaleBold: {
    fontWeight: '700',
    color: colors.primaryContainer,
  },
  aiActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  startFocusBtn: {
    flex: 1,
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    ...shadows.xs,
  },
  startFocusBtnText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  markDoneBtn: {
    width: 48,
    height: 48,
    borderRadius: rounded.md,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markDoneBtnActive: {
    backgroundColor: colors.tertiaryFixed,
  },
  progressCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    ...shadows.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  progressHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  progressHeaderTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  progressPercentText: {
    ...typography.labelMd,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  progressBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  progressDetails: {
    flex: 1,
  },
  progressSubhead: {
    ...typography.bodyMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  focusGoalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  focusGoalText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  barTrack: {
    height: 8,
    backgroundColor: colors.surfaceContainer,
    borderRadius: rounded.full,
    marginTop: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.secondaryContainer,
    borderRadius: rounded.full,
  },
  examBanner: {
    backgroundColor: 'rgba(226, 223, 255, 0.65)',
    borderRadius: rounded.xl,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.15)',
  },
  examLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  examIconBox: {
    width: 44,
    height: 44,
    borderRadius: rounded.md,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  examTextColumn: {
    flex: 1,
  },
  examTitle: {
    ...typography.titleMd,
    color: colors.onPrimaryFixed,
    fontWeight: '700',
  },
  examSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: rounded.full,
    backgroundColor: colors.errorCoral,
  },
  examSubtitle: {
    ...typography.labelMd,
    color: colors.onSecondaryFixed,
    fontWeight: '600',
  },
  examForwardBtn: {
    width: 32,
    height: 32,
    borderRadius: rounded.full,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingSection: {
    gap: spacing.sm,
  },
  upcomingHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upcomingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  upcomingTitle: {
    ...typography.titleLg,
    color: colors.onSurface,
    fontWeight: '700',
  },
  countBadge: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  countBadgeText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    fontWeight: '700',
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    ...typography.labelMd,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  tasksList: {
    gap: spacing.xs,
  },
  smartTipPill: {
    backgroundColor: 'rgba(225, 232, 255, 0.7)',
    borderRadius: rounded.xl,
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  tipIconCircle: {
    width: 32,
    height: 32,
    borderRadius: rounded.full,
    backgroundColor: colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    ...typography.bodySm,
    color: colors.onSurface,
    lineHeight: 18,
  },
  tipBold: {
    fontWeight: '700',
    color: colors.secondary,
  },
  tipTime: {
    fontWeight: '700',
    color: colors.onSurface,
  },
  // Quick Access Grid
  quickAccessSection: {
    gap: spacing.sm,
  },
  quickAccessTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  quickAccessCard: {
    flex: 1,
    minWidth: '44%',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.lg,
    padding: spacing.sm,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(23,32,51,0.07)',
    ...shadows.xs,
  },
  quickAccessIcon: {
    width: 44,
    height: 44,
    borderRadius: rounded.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAccessLabel: {
    ...typography.labelLg,
    color: colors.onSurface,
    fontWeight: '700',
    textAlign: 'center',
  },
  quickAccessSub: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
});

export default HomeDashboardScreen;
