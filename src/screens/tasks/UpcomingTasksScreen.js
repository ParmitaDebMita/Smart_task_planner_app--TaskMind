import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import TaskCard from '../../components/common/TaskCard';
import Icon from '../../components/common/Icon';

export const UpcomingTasksScreen = () => {
  const { tasks, navigateTo } = useTaskContext();
  const [activeCourse, setActiveCourse] = useState('All');

  const courseList = ['All', 'CS301', 'CS304', 'CS305', 'CS302', 'CS201'];

  const filteredTasks = tasks.filter(t => {
    if (activeCourse !== 'All' && t.courseCode !== activeCourse) return false;
    return !t.isCompleted;
  });

  return (
    <View style={styles.screenWrapper}>
      <Header title="Upcoming Tasks" subtitle="Sprint Milestones" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Course Filter Horizontal Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.courseScroll}>
          {courseList.map(c => {
            const isSelected = activeCourse === c;
            return (
              <TouchableOpacity
                key={c}
                style={[styles.coursePill, isSelected && styles.coursePillActive]}
                onPress={() => setActiveCourse(c)}
              >
                <Text style={[styles.courseText, isSelected && styles.courseTextActive]}>
                  {c === 'All' ? 'All Courses' : c}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Sprint Overview Card */}
        <View style={styles.sprintCard}>
          <View style={styles.sprintLeft}>
            <Icon name="bolt" size={20} color={colors.primaryContainer} />
            <View style={styles.sprintTextCol}>
              <Text style={styles.sprintTitle}>Sprint Deadlines Tracker</Text>
              <Text style={styles.sprintSubtitle}>{filteredTasks.length} pending academic assignments</Text>
            </View>
          </View>
        </View>

        {/* Tasks List */}
        <View style={styles.tasksList}>
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
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
  courseScroll: {
    gap: spacing.xs,
    paddingVertical: 2,
  },
  coursePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainer,
  },
  coursePillActive: {
    backgroundColor: colors.primaryContainer,
  },
  courseText: {
    ...typography.labelMd,
    color: colors.onSurface,
  },
  courseTextActive: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  sprintCard: {
    backgroundColor: 'rgba(226, 223, 255, 0.5)',
    borderRadius: rounded.lg,
    padding: spacing.sm + 4,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.15)',
  },
  sprintLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sprintTextCol: {
    gap: 2,
  },
  sprintTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  sprintSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  tasksList: {
    gap: spacing.xs,
  },
});

export default UpcomingTasksScreen;
