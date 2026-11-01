import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
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

  const getPriorityBadge = () => {
    const p = (task.priority || '').toLowerCase();
    if (p === 'urgent' || p === 'high' || task.isUrgent) {
      return {
        bg: '#FFEFEB',
        border: '#FFD5CC',
        text: '#EF4444',
        label: 'High',
      };
    }
    if (p === 'low') {
      return {
        bg: '#ECFDF5',
        border: '#A7F3D0',
        text: '#10B981',
        label: 'Low',
      };
    }
    return {
      bg: '#FEF3C7',
      border: '#FDE68A',
      text: '#D97706',
      label: 'Medium',
    };
  };

  const getSubjectIconInfo = () => {
    const c = (task.course || task.courseCode || task.category || '').toLowerCase();
    if (c.includes('math')) return { icon: 'functions', bg: '#EFF6FF', color: '#3B82F6' };
    if (c.includes('phys')) return { icon: 'science', bg: '#F5F3FF', color: '#8B5CF6' };
    if (c.includes('chem')) return { icon: 'biotech', bg: '#ECFDF5', color: '#10B981' };
    if (c.includes('eng') || c.includes('essay')) return { icon: 'edit_note', bg: '#FDF2F8', color: '#EC4899' };
    return { icon: 'menu_book', bg: '#EFF6FF', color: '#3B82F6' };
  };

  const priorityMeta = getPriorityBadge();
  const iconInfo = getSubjectIconInfo();

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        task.isCompleted && styles.completedCard,
      ]}
      onPress={handlePress}
      activeOpacity={0.88}
    >
      <View style={styles.cardInner}>
        {/* Left: Subject Icon Circle */}
        <View style={[styles.iconCircle, { backgroundColor: iconInfo.bg }]}>
          <Icon name={iconInfo.icon} size={20} color={iconInfo.color} />
        </View>

        {/* Center: Title, Category & Deadline info */}
        <View style={styles.detailsCol}>
          <View style={styles.titleRow}>
            <Text
              style={[
                styles.taskTitle,
                task.isCompleted && styles.completedTitle,
              ]}
              numberOfLines={1}
            >
              {task.title}
            </Text>
          </View>

          <Text style={styles.courseSubtitle} numberOfLines={1}>
            {task.category || task.course || 'Course Task'}
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.metaPill}>
              <Icon name="event" size={12} color="#94A3B8" />
              <Text style={styles.metaText}>{task.dueDate || 'Tomorrow'}</Text>
            </View>
            <View style={styles.metaPill}>
              <Icon name="schedule" size={12} color="#94A3B8" />
              <Text style={styles.metaText}>
                {task.estimatedMinutes ? `${Math.floor(task.estimatedMinutes / 60) > 0 ? `${Math.floor(task.estimatedMinutes / 60)}h ` : ''}${task.estimatedMinutes % 60}m` : '45m'}
              </Text>
            </View>
          </View>
        </View>

        {/* Right: Priority Pill & Check Toggle */}
        <View style={styles.rightCol}>
          <View
            style={[
              styles.priorityPill,
              { backgroundColor: priorityMeta.bg, borderColor: priorityMeta.border },
            ]}
          >
            <Text style={[styles.priorityText, { color: priorityMeta.text }]}>
              {priorityMeta.label}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.checkCircle,
              task.isCompleted && styles.checkCircleActive,
            ]}
            onPress={() => toggleTaskCompleted(task.id)}
            activeOpacity={0.7}
          >
            {task.isCompleted && <Icon name="check" size={12} color="#FFFFFF" />}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 12,
    marginBottom: 10,
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
  completedCard: {
    backgroundColor: '#FAF9F6',
    borderColor: '#EFECE6',
    opacity: 0.75,
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  detailsCol: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  courseSubtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  rightCol: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 48,
    marginLeft: 8,
  },
  priorityPill: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: rounded.full,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '700',
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 6,
  },
  checkCircleActive: {
    backgroundColor: colors.primaryCoral,
    borderColor: colors.primaryCoral,
  },
});

export default TaskCard;
