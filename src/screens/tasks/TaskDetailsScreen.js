import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Header from '../../components/common/Header';
import Icon from '../../components/common/Icon';

export const TaskDetailsScreen = () => {
  const {
    selectedTaskId,
    tasks,
    toggleTaskCompleted,
    toggleSubtask,
    deleteTask,
    navigateTo,
    showToast,
  } = useTaskContext();

  const task = tasks.find(t => t.id === selectedTaskId) || tasks[0];

  if (!task) return null;

  const subtasks = task.subtasks || [];
  const completedSubtasksCount = subtasks.filter(s => s.isCompleted).length;

  return (
    <View style={styles.screenWrapper}>
      <Header title="Task Details" subtitle={task.courseCode || 'CS301'} showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Status & Action Bar */}
        <View style={styles.topStatusRow}>
          <View style={styles.statusPills}>
            <View style={styles.inProgressPill}>
              <View style={styles.inProgressDot} />
              <Text style={styles.inProgressText}>
                {task.isCompleted ? 'Completed' : 'In Progress'}
              </Text>
            </View>

            {task.isUrgent && (
              <View style={styles.urgentPill}>
                <Icon name="priority_high" size={13} color={colors.errorCoral} fill />
                <Text style={styles.urgentText}>Urgent</Text>
              </View>
            )}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.iconActionBtn}
              onPress={() => showToast('Editing task fields...', 'info')}
            >
              <Icon name="edit" size={18} color={colors.onSurfaceVariant} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconActionBtn}
              onPress={() => deleteTask(task.id)}
            >
              <Icon name="delete" size={18} color={colors.errorCoral} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Course & Title Header */}
        <View style={styles.titleSection}>
          <View style={styles.courseTagRow}>
            <Icon name="menu_book" size={16} color={colors.primaryContainer} />
            <Text style={styles.courseTagText}>{task.course || 'Database Management Systems (CS301)'}</Text>
          </View>
          <Text style={styles.mainTitle}>{task.title}</Text>
        </View>

        {/* 2x2 Key Specs Grid */}
        <View style={styles.specsGrid}>
          {/* Spec 1: Deadline */}
          <View style={styles.specCard}>
            <View style={styles.specHeaderRow}>
              <Icon name="event_upcoming" size={16} color={colors.errorCoral} />
              <Text style={styles.specHeaderLabel}>Deadline</Text>
            </View>
            <Text style={styles.specMainValue}>Tomorrow</Text>
            <Text style={[styles.specSubValue, { color: colors.errorCoral, fontWeight: '600' }]}>
              11:59 PM (18h left)
            </Text>
          </View>

          {/* Spec 2: Est. Effort */}
          <View style={styles.specCard}>
            <View style={styles.specHeaderRow}>
              <Icon name="timer" size={16} color={colors.primaryContainer} />
              <Text style={styles.specHeaderLabel}>Est. Effort</Text>
            </View>
            <Text style={styles.specMainValue}>2h 30m</Text>
            <Text style={styles.specSubValue}>45m logged so far</Text>
          </View>

          {/* Spec 3: Weightage */}
          <View style={styles.specCard}>
            <View style={styles.specHeaderRow}>
              <Icon name="grade" size={16} color={colors.secondary} />
              <Text style={styles.specHeaderLabel}>Weightage</Text>
            </View>
            <Text style={styles.specMainValue}>{task.weightage || '15%'}</Text>
            <Text style={styles.specSubValue}>Of Final Grade</Text>
          </View>

          {/* Spec 4: Course */}
          <View style={styles.specCard}>
            <View style={styles.specHeaderRow}>
              <Icon name="school" size={16} color={colors.tertiary} />
              <Text style={styles.specHeaderLabel}>Course</Text>
            </View>
            <Text style={styles.specMainValue}>{task.courseCode || 'CS301'}</Text>
            <Text style={styles.specSubValue}>{task.instructor || 'Prof. Vance'}</Text>
          </View>
        </View>

        {/* AI Urgency Breakdown Card */}
        <View style={styles.aiBreakdownCard}>
          <View style={styles.aiBreakdownHeader}>
            <View style={styles.aiBreakdownTitleRow}>
              <View style={styles.aiIconBadge}>
                <Icon name="auto_awesome" size={16} color={colors.primaryContainer} />
              </View>
              <Text style={styles.aiBreakdownTitle}>AI Urgency Breakdown</Text>
            </View>
            <View style={styles.aiScorePill}>
              <Text style={styles.aiScoreText}>Score: {task.urgencyScore || 96}/100</Text>
            </View>
          </View>

          {/* Metrics Bars */}
          <View style={styles.metricsList}>
            <View style={styles.metricItem}>
              <View style={styles.metricLabelRow}>
                <Text style={styles.metricName}>Deadline Proximity</Text>
                <Text style={[styles.metricPercent, { color: colors.errorCoral }]}>98%</Text>
              </View>
              <View style={styles.metricBarTrack}>
                <View style={[styles.metricBarFill, { width: '98%', backgroundColor: colors.errorCoral }]} />
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricLabelRow}>
                <Text style={styles.metricName}>Course Impact</Text>
                <Text style={[styles.metricPercent, { color: colors.secondary }]}>92%</Text>
              </View>
              <View style={styles.metricBarTrack}>
                <View style={[styles.metricBarFill, { width: '92%', backgroundColor: colors.secondaryContainer }]} />
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricLabelRow}>
                <Text style={styles.metricName}>Effort-to-Time Ratio</Text>
                <Text style={[styles.metricPercent, { color: colors.primaryContainer }]}>95%</Text>
              </View>
              <View style={styles.metricBarTrack}>
                <View style={[styles.metricBarFill, { width: '95%', backgroundColor: colors.primaryContainer }]} />
              </View>
            </View>
          </View>

          {/* Gemini Reasoning Tip */}
          <View style={styles.geminiTipBox}>
            <Icon name="psychology" size={18} color={colors.secondary} style={{ marginTop: 1 }} />
            <Text style={styles.geminiTipText}>
              <Text style={styles.geminiTipBold}>Gemini Tip: </Text>
              Break this into 2 pomodoro sessions: 1st for 3NF table decomposition, 2nd for drawing ER diagram in DrawSQL.
            </Text>
          </View>
        </View>

        {/* Milestones & Subtasks Section */}
        <View style={styles.subtasksSection}>
          <View style={styles.subtasksHeaderRow}>
            <Text style={styles.subtasksTitle}>Milestones & Subtasks</Text>
            <Text style={styles.subtasksProgressText}>
              {completedSubtasksCount} of {subtasks.length} completed
            </Text>
          </View>

          <View style={styles.subtasksList}>
            {subtasks.map(sub => (
              <TouchableOpacity
                key={sub.id}
                style={styles.subtaskItem}
                onPress={() => toggleSubtask(task.id, sub.id)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.subtaskCheckbox,
                    sub.isCompleted && styles.subtaskCheckboxChecked,
                  ]}
                >
                  {sub.isCompleted && (
                    <Icon name="check" size={14} color={colors.onTertiary} />
                  )}
                </View>
                <Text
                  style={[
                    styles.subtaskTitle,
                    sub.isCompleted && styles.subtaskTitleChecked,
                  ]}
                >
                  {sub.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Attached Materials */}
        <View style={styles.materialsSection}>
          <Text style={styles.subtasksTitle}>Attached Materials</Text>
          <View style={styles.materialCard}>
            <View style={styles.materialLeft}>
              <View style={styles.pdfIconBox}>
                <Icon name="picture_as_pdf" size={22} color={colors.errorCoral} />
              </View>
              <View style={styles.materialInfo}>
                <Text style={styles.materialName}>{task.attachment?.name || 'assignment_spec_v2.pdf'}</Text>
                <Text style={styles.materialSize}>{task.attachment?.size || '1.4 MB'} • Updated yesterday</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.downloadBtn}
              onPress={() => showToast('Downloading assignment specification PDF...', 'info')}
            >
              <Icon name="download" size={20} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom CTA Actions */}
        <View style={styles.bottomCtaSection}>
          <TouchableOpacity
            style={styles.startTimerBtn}
            onPress={() => navigateTo('FocusChamber', { taskId: task.id })}
            activeOpacity={0.88}
          >
            <Icon name="play_circle" size={20} color={colors.onPrimary} />
            <Text style={styles.startTimerBtnText}>Start Focus Timer (45m)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.markCompleteBtn,
              task.isCompleted && styles.markCompleteBtnDone,
            ]}
            onPress={() => toggleTaskCompleted(task.id)}
            activeOpacity={0.85}
          >
            <Icon
              name={task.isCompleted ? 'task_alt' : 'check_circle'}
              size={20}
              color={task.isCompleted ? colors.tertiary : colors.tertiaryContainer}
            />
            <Text style={[styles.markCompleteText, task.isCompleted && { color: colors.tertiary }]}>
              {task.isCompleted ? 'Completed!' : 'Mark Complete'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingBottom: 40,
    gap: spacing.md,
  },
  topStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  statusPills: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  inProgressPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(107, 56, 212, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
  },
  inProgressDot: {
    width: 6,
    height: 6,
    borderRadius: rounded.full,
    backgroundColor: colors.secondary,
  },
  inProgressText: {
    ...typography.labelSm,
    color: colors.secondary,
    fontWeight: '600',
  },
  urgentPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.errorContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.full,
  },
  urgentText: {
    ...typography.labelSm,
    color: colors.errorCoral,
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconActionBtn: {
    width: 36,
    height: 36,
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainerLowest,
  },
  titleSection: {
    gap: 6,
  },
  courseTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  courseTagText: {
    ...typography.labelMd,
    color: colors.primaryContainer,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  mainTitle: {
    ...typography.headlineLg,
    color: colors.onSurface,
    fontWeight: '700',
    lineHeight: 28,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  specCard: {
    flex: 1,
    minWidth: '46%',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.lg,
    padding: spacing.sm + 4,
    ...shadows.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
    gap: 2,
  },
  specHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  specHeaderLabel: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  specMainValue: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  specSubValue: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  aiBreakdownCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
    gap: spacing.md,
  },
  aiBreakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  aiBreakdownTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiIconBadge: {
    width: 28,
    height: 28,
    borderRadius: rounded.sm,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiBreakdownTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  aiScorePill: {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
  },
  aiScoreText: {
    ...typography.labelSm,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  metricsList: {
    gap: spacing.sm,
  },
  metricItem: {
    gap: 4,
  },
  metricLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricName: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  metricPercent: {
    ...typography.labelSm,
    fontWeight: '700',
  },
  metricBarTrack: {
    height: 8,
    backgroundColor: colors.surfaceContainer,
    borderRadius: rounded.full,
    overflow: 'hidden',
  },
  metricBarFill: {
    height: '100%',
    borderRadius: rounded.full,
  },
  geminiTipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: colors.surfaceContainerLow,
    padding: spacing.sm,
    borderRadius: rounded.md,
  },
  geminiTipText: {
    flex: 1,
    ...typography.bodySm,
    color: colors.onSurface,
    lineHeight: 18,
  },
  geminiTipBold: {
    fontWeight: '700',
    color: colors.secondary,
  },
  subtasksSection: {
    gap: spacing.sm,
  },
  subtasksHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtasksTitle: {
    ...typography.titleLg,
    color: colors.onSurface,
    fontWeight: '700',
  },
  subtasksProgressText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  subtasksList: {
    gap: spacing.xs,
  },
  subtaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.sm + 4,
    borderRadius: rounded.lg,
    ...shadows.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
  },
  subtaskCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtaskCheckboxChecked: {
    backgroundColor: colors.tertiaryContainer,
  },
  subtaskTitle: {
    flex: 1,
    ...typography.bodyMd,
    color: colors.onSurface,
  },
  subtaskTitleChecked: {
    textDecorationLine: 'line-through',
    color: colors.onSurfaceVariant,
  },
  materialsSection: {
    gap: spacing.sm,
  },
  materialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.sm + 4,
    borderRadius: rounded.lg,
    ...shadows.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
  },
  materialLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  pdfIconBox: {
    width: 40,
    height: 40,
    borderRadius: rounded.md,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  materialInfo: {
    flex: 1,
  },
  materialName: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '600',
  },
  materialSize: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  downloadBtn: {
    width: 36,
    height: 36,
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomCtaSection: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  startTimerBtn: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    ...shadows.xs,
  },
  startTimerBtnText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  markCompleteBtn: {
    height: 48,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.8)',
  },
  markCompleteBtnDone: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: colors.tertiary,
  },
  markCompleteText: {
    ...typography.labelLg,
    color: colors.onSurface,
    fontWeight: '700',
  },
});

export default TaskDetailsScreen;
