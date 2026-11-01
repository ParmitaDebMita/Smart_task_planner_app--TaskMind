import React from 'react';
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
import TaskMindMascot from '../../components/common/TaskMindMascot';
import Icon from '../../components/common/Icon';

export const HomeDashboardScreen = () => {
  const {
    user,
    tasks,
    dailyGoals,
    focusSession,
    navigateTo,
    toggleTaskCompleted,
    showToast,
  } = useTaskContext();

  // Primary active/first tasks for today
  const todayTasksList = tasks.slice(0, 4);

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const totalCount = tasks.length || 3;
  const completedGoals = (dailyGoals || []).filter(g => g.isCompleted).length;
  const totalGoals = (dailyGoals || []).length || 3;

  const handleTaskPress = (task) => {
    navigateTo('TaskDetails', { taskId: task.id });
  };

  const handleStartStudy = () => {
    const firstPending = tasks.find(t => !t.isCompleted);
    navigateTo('FocusChamber', { taskId: firstPending ? firstPending.id : tasks[0]?.id });
  };

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header: Greeting & Date */}
        <View style={styles.headerContainer}>
          <View style={styles.greetingTitleRow}>
            <Text style={styles.greetingText}>
              Good Morning, {user?.name ? user.name.split(' ')[0] : 'Alex'}!
            </Text>
            <Text style={styles.sunEmoji}>☀️</Text>
          </View>
          <Text style={styles.dateSubtext}>Tue, 23 Sep 2025</Text>
        </View>

        {/* Hero Card: Mascot Study Companion */}
        <TouchableOpacity
          style={styles.mascotHeroCard}
          onPress={() => navigateTo('DailyCheckin')}
          activeOpacity={0.88}
        >
          <TaskMindMascot size={150} showBackground={true} variant="studying" />
        </TouchableOpacity>

        {/* 3 Quick Stat Cards Row */}
        <View style={styles.statsRow}>
          {/* Stat 1: Study Time */}
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigateTo('FocusChamber')}
            activeOpacity={0.8}
          >
            <View style={[styles.statIconBadge, { backgroundColor: '#EFF6FF' }]}>
              <Icon name="schedule" size={16} color="#3B82F6" />
            </View>
            <Text style={styles.statLabel}>Study Time</Text>
            <Text style={styles.statValue}>
              {focusSession?.todayStudyMinutes ? `${Math.floor(focusSession.todayStudyMinutes / 60)}h ${focusSession.todayStudyMinutes % 60}m` : '2h 30m'}
            </Text>
          </TouchableOpacity>

          {/* Stat 2: Streak */}
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => showToast(`Awesome! ${user?.streakDays || 5}-day study streak active 🔥`, 'success')}
            activeOpacity={0.8}
          >
            <View style={[styles.statIconBadge, { backgroundColor: '#FFF7ED' }]}>
              <Icon name="local_fire_department" size={16} color="#F97316" fill />
            </View>
            <Text style={styles.statLabel}>Streak</Text>
            <Text style={styles.statValue}>{user?.streakDays || 5} days</Text>
          </TouchableOpacity>

          {/* Stat 3: Daily Goal */}
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigateTo('TodayTasks')}
            activeOpacity={0.8}
          >
            <View style={[styles.statIconBadge, { backgroundColor: '#F5F3FF' }]}>
              <Icon name="track_changes" size={16} color="#8B5CF6" />
            </View>
            <Text style={styles.statLabel}>Daily Goal</Text>
            <Text style={styles.statValue}>
              {completedCount > 0 ? `${completedCount}/${totalCount}` : '2/3'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Today's Tasks Section */}
        <View style={styles.tasksSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <TouchableOpacity onPress={() => navigateTo('TodayTasks')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tasksList}>
            {todayTasksList.map((task) => {
              const isChecked = task.isCompleted;
              const durationText = task.estimatedMinutes
                ? `${task.estimatedMinutes}m`
                : '30m';

              return (
                <View
                  key={task.id}
                  style={[styles.taskItemCard, isChecked && styles.taskItemCardCompleted]}
                >
                  <TouchableOpacity
                    style={styles.taskCheckTouch}
                    onPress={() => toggleTaskCompleted(task.id)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.checkboxCircle,
                        isChecked && styles.checkboxCircleChecked,
                      ]}
                    >
                      {isChecked && <Icon name="check" size={13} color="#FFFFFF" />}
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.taskTitleTouch}
                    onPress={() => handleTaskPress(task)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.taskTitleText,
                        isChecked && styles.taskTitleTextCompleted,
                      ]}
                      numberOfLines={1}
                    >
                      {task.title}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.taskDurationBadge}>
                    <Text style={styles.taskDurationText}>{durationText}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Bottom Primary Action Button: "Continue ->" */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={handleStartStudy}
            activeOpacity={0.88}
          >
            <Text style={styles.continueBtnText}>Continue →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
    paddingBottom: 88,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  headerContainer: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  greetingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  greetingText: {
    ...typography.headlineMd,
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
  },
  sunEmoji: {
    fontSize: 20,
  },
  dateSubtext: {
    ...typography.bodySm,
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 2,
  },
  mascotHeroCard: {
    backgroundColor: '#FFF8EE',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#FEEAD1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 14px rgba(251, 146, 60, 0.08)',
      },
      default: {
        shadowColor: '#FB923C',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
      },
    }),
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
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
  statIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 2,
  },
  tasksSection: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.titleMd,
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  seeAllText: {
    fontSize: 12,
    color: colors.primaryCoral,
    fontWeight: '600',
  },
  tasksList: {
    gap: 8,
  },
  taskItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.md,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  taskItemCardCompleted: {
    backgroundColor: '#FAF9F6',
    borderColor: '#EFECE6',
    opacity: 0.75,
  },
  taskCheckTouch: {
    marginRight: 10,
  },
  checkboxCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxCircleChecked: {
    backgroundColor: colors.primaryCoral,
    borderColor: colors.primaryCoral,
  },
  taskTitleTouch: {
    flex: 1,
  },
  taskTitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  taskTitleTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  taskDurationBadge: {
    backgroundColor: '#F8FAFC',
    borderRadius: rounded.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  taskDurationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  actionSection: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  continueBtn: {
    width: '100%',
    height: 52,
    backgroundColor: colors.primaryCoral,
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryCoral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  continueBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default HomeDashboardScreen;
