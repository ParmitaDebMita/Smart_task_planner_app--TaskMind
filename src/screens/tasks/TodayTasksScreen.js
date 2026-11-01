import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import TaskCard from '../../components/common/TaskCard';
import Icon from '../../components/common/Icon';

export const TodayTasksScreen = () => {
  const { tasks, navigateTo } = useTaskContext();
  const [activeTab, setActiveTab] = useState('Today'); // 'Today' | 'Upcoming' | 'Overdue'

  const filteredTasks = tasks.filter(t => {
    if (activeTab === 'Overdue') return t.isOverdue;
    if (activeTab === 'Upcoming') return !t.isCompleted && !t.isOverdue;
    return true; // 'Today'
  });

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Title & Filter Icon */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Tasks</Text>
          <TouchableOpacity
            style={styles.filterIconBtn}
            onPress={() => navigateTo('SearchFilters')}
            activeOpacity={0.8}
          >
            <Icon name="tune" size={20} color="#1E293B" />
          </TouchableOpacity>
        </View>

        {/* 3 Segmented Tabs: Today | Upcoming | Overdue */}
        <View style={styles.tabsRow}>
          {['Today', 'Upcoming', 'Overdue'].map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabPill,
                  isSelected && styles.tabPillActive,
                ]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabText,
                    isSelected && styles.tabTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tasks Cards List */}
        <View style={styles.tasksList}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="task_alt" size={40} color="#CBD5E1" />
              <Text style={styles.emptyStateTitle}>No {activeTab.toLowerCase()} tasks</Text>
              <Text style={styles.emptyStateSub}>All caught up for this section!</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button: + Add Task */}
      <TouchableOpacity
        style={styles.fabBtn}
        onPress={() => navigateTo('AddTask')}
        activeOpacity={0.88}
      >
        <Icon name="add" size={20} color="#FFFFFF" />
        <Text style={styles.fabBtnText}>Add Task</Text>
      </TouchableOpacity>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#FFFDF9',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: 110,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingTop: spacing.xs,
  },
  headerTitle: {
    ...typography.headlineMd,
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  filterIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.md,
  },
  tabPill: {
    flex: 1,
    height: 40,
    borderRadius: rounded.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPillActive: {
    backgroundColor: colors.primaryCoral,
    borderColor: colors.primaryCoral,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  tasksList: {
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    gap: 6,
  },
  emptyStateTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#64748B',
  },
  emptyStateSub: {
    fontSize: 13,
    color: '#94A3B8',
  },
  fabBtn: {
    position: 'absolute',
    bottom: 76,
    right: 20,
    backgroundColor: colors.primaryCoral,
    borderRadius: rounded.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    gap: 6,
    shadowColor: colors.primaryCoral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    zIndex: 40,
  },
  fabBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default TodayTasksScreen;
