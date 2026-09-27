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

export const TodayTasksScreen = () => {
  const { tasks, navigateTo } = useTaskContext();
  const [filter, setFilter] = useState('all');

  const todayTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.isCompleted;
    if (filter === 'completed') return t.isCompleted;
    return true;
  });

  return (
    <View style={styles.screenWrapper}>
      <Header title="Today's Schedule" subtitle="Wednesday, Oct 23" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Filter Pills */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterPill, filter === 'all' && styles.filterPillActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              All Tasks ({tasks.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, filter === 'pending' && styles.filterPillActive]}
            onPress={() => setFilter('pending')}
          >
            <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>
              Pending ({tasks.filter(t => !t.isCompleted).length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, filter === 'completed' && styles.filterPillActive]}
            onPress={() => setFilter('completed')}
          >
            <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>
              Completed ({tasks.filter(t => t.isCompleted).length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tasks List */}
        <View style={styles.tasksList}>
          {todayTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>

        {/* Floating Quick Action */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigateTo('AddTask')}
          activeOpacity={0.88}
        >
          <Icon name="add_task" size={20} color={colors.onPrimary} />
          <Text style={styles.addBtnText}>+ Add Task for Today</Text>
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
  filterRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainer,
  },
  filterPillActive: {
    backgroundColor: colors.primaryContainer,
  },
  filterText: {
    ...typography.labelMd,
    color: colors.onSurface,
  },
  filterTextActive: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  tasksList: {
    gap: spacing.xs,
  },
  addBtn: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  addBtnText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
});

export default TodayTasksScreen;
