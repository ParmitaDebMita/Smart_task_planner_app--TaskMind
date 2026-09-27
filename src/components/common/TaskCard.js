import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Icon from './Icon';

export const TaskCard = ({ task, onPress }) => {
  const { toggleTaskCompleted, navigateTo } = useTaskContext();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigateTo('TaskDetails', { taskId: task.id });
    }
  };

  const getPriorityStyle = () => {
    if (task.priority === 'urgent' || task.priority === 'high' || task.isUrgent) {
      return {
        bg: colors.errorContainer,
        text: colors.onErrorContainer,
        label: task.priority === 'urgent' ? 'Urgent 🔥' : 'High',
      };
    }
    if (task.priority === 'low') {
      return {
        bg: colors.surfaceContainerHigh,
        text: colors.onSurfaceVariant,
        label: 'Low',
      };
    }
    return {
      bg: colors.surfaceContainer,
      text: colors.onSurface,
      label: 'Medium',
    };
  };

  const priorityMeta = getPriorityStyle();

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        task.isCompleted && styles.completedCard,
        task.isOverdue && styles.overdueCard,
      ]}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      {task.isOverdue && (
        <View style={styles.overdueRibbon}>
          <Icon name="warning" size={14} color={colors.onErrorContainer} />
          <Text style={styles.overdueRibbonText}>OVERDUE • {task.dueDate}</Text>
        </View>
      )}

      <View style={styles.contentRow}>
        {/* Custom Animated Checkbox */}
        <TouchableOpacity
          style={[
            styles.checkbox,
            task.isCompleted && styles.checkboxChecked,
          ]}
          onPress={() => toggleTaskCompleted(task.id)}
          activeOpacity={0.8}
          accessibilityLabel={`Mark ${task.title} as done`}
        >
          {task.isCompleted && (
            <Icon name="check" size={14} color={colors.onTertiary} />
          )}
        </TouchableOpacity>

        {/* Title & Metadata */}
        <View style={styles.textColumn}>
          <Text
            style={[
              styles.taskTitle,
              task.isCompleted && styles.completedText,
            ]}
            numberOfLines={2}
          >
            {task.title}
          </Text>

          <View style={styles.metadataStrip}>
            {task.dueDate ? (
              <View style={styles.metaItem}>
                <Icon
                  name="event"
                  size={13}
                  color={task.isUrgent ? colors.errorCoral : colors.primaryContainer}
                />
                <Text
                  style={[
                    styles.metaText,
                    {
                      color: task.isUrgent ? colors.errorCoral : colors.primaryContainer,
                      fontWeight: '600',
                    },
                  ]}
                >
                  {task.dueDate}
                </Text>
              </View>
            ) : null}

            {task.estimatedMinutes ? (
              <>
                <Text style={styles.bullet}>•</Text>
                <View style={styles.metaItem}>
                  <Icon name="schedule" size={13} color={colors.onSurfaceVariant} />
                  <Text style={styles.metaText}>
                    {Math.floor(task.estimatedMinutes / 60) > 0
                      ? `${Math.floor(task.estimatedMinutes / 60)}h ${task.estimatedMinutes % 60 > 0 ? `${task.estimatedMinutes % 60}m` : ''}`
                      : `${task.estimatedMinutes}m`}
                  </Text>
                </View>
              </>
            ) : null}
          </View>
        </View>

        {/* Priority Badge */}
        <View
          style={[
            styles.priorityBadge,
            { backgroundColor: priorityMeta.bg },
          ]}
        >
          <Text
            style={[
              styles.priorityBadgeText,
              { color: priorityMeta.text },
            ]}
          >
            {priorityMeta.label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.lg,
    padding: spacing.md,
    ...shadows.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  overdueCard: {
    borderColor: colors.errorContainer,
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  overdueRibbon: {
    backgroundColor: colors.errorContainer,
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  overdueRibbonText: {
    ...typography.labelSm,
    fontSize: 10,
    color: colors.onErrorContainer,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  completedCard: {
    opacity: 0.75,
    backgroundColor: 'rgba(241, 243, 255, 0.6)',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingHorizontal: 0,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.tertiaryContainer,
    borderColor: colors.tertiaryContainer,
  },
  textColumn: {
    flex: 1,
    minWidth: 0,
    paddingRight: spacing.xs,
  },
  taskTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    lineHeight: 20,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.onSurfaceVariant,
  },
  metadataStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    ...typography.labelSm,
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  bullet: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
    alignSelf: 'flex-start',
  },
  priorityBadgeText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: '600',
  },
});

export default TaskCard;
