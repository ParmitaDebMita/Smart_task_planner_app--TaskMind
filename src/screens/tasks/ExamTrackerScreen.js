import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

export const ExamTrackerScreen = () => {
  const { exams, tasks, addTask, showToast, navigateTo } = useTaskContext();

  const [activeTab, setActiveTab] = useState('exams'); // 'exams' | 'assignments' | 'ai_plans'
  const [examItems, setExamItems] = useState([
    {
      id: 'ex-1',
      title: 'CS305 Data Mining Viva & Practical',
      course: 'CS305',
      date: 'Sunday, Oct 27, 2:00 PM',
      daysLeft: 4,
      weight: '20% of Final Grade',
      topics: ['Apriori Algorithm', 'K-Means Clustering', 'Decision Tree Pruning'],
      prepPlanGenerated: true,
    },
    {
      id: 'ex-2',
      title: 'CS301 Database Systems Midterm Exam',
      course: 'CS301',
      date: 'Monday, Nov 4, 10:00 AM',
      daysLeft: 12,
      weight: '30% of Final Grade',
      topics: ['BCNF Normalization', 'Relational Algebra', 'Transactions & ACID'],
      prepPlanGenerated: false,
    },
    {
      id: 'ex-3',
      title: 'MATH51 Eigenvalues & Vector Spaces Quiz',
      course: 'MATH51',
      date: 'Thursday, Oct 31, 11:30 AM',
      daysLeft: 8,
      weight: '10% of Final Grade',
      topics: ['Diagonalization', 'Gram-Schmidt Process', 'SVD Decomposition'],
      prepPlanGenerated: false,
    },
  ]);

  const majorAssignments = tasks.filter(t => t.category === 'Assignment' || t.category === 'Project');

  const handleGeneratePlan = (examId) => {
    setExamItems(prev =>
      prev.map(e => (e.id === examId ? { ...e, prepPlanGenerated: true } : e))
    );
    showToast('AI 7-day spaced preparation plan generated!', 'success');
    setActiveTab('ai_plans');
  };

  const handleAddPlanToTasks = () => {
    addTask({
      title: 'CS305 Viva Prep Day 1: Apriori Formulas Review',
      course: 'CS305',
      category: 'Exam Prep',
      dueDate: 'Today, 8:00 PM',
      priority: 'high',
      estimatedMinutes: 60,
    });
    addTask({
      title: 'CS305 Viva Prep Day 2: K-Means Code Simulation',
      course: 'CS305',
      category: 'Exam Prep',
      dueDate: 'Tomorrow, 7:30 PM',
      priority: 'high',
      estimatedMinutes: 90,
    });
    showToast('Daily revision milestones added to your task schedule!', 'success');
    setTimeout(() => {
      navigateTo('TodayTasks');
    }, 1000);
  };

  return (
    <View style={styles.screenWrapper}>
      <Header title="Exam & Assignment Tracker" subtitle="Deadlines & AI Study Plans" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Navigation Tabs */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'exams' && styles.tabBtnActive]}
            onPress={() => setActiveTab('exams')}
          >
            <Icon
              name="school"
              size={18}
              color={activeTab === 'exams' ? colors.primaryContainer : colors.onSurfaceVariant}
            />
            <Text style={[styles.tabBtnText, activeTab === 'exams' && styles.tabBtnTextActive]}>
              Exams ({examItems.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'assignments' && styles.tabBtnActive]}
            onPress={() => setActiveTab('assignments')}
          >
            <Icon
              name="assignment"
              size={18}
              color={activeTab === 'assignments' ? colors.primaryContainer : colors.onSurfaceVariant}
            />
            <Text style={[styles.tabBtnText, activeTab === 'assignments' && styles.tabBtnTextActive]}>
              Projects ({majorAssignments.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'ai_plans' && styles.tabBtnActive]}
            onPress={() => setActiveTab('ai_plans')}
          >
            <Icon
              name="auto_awesome"
              size={18}
              color={activeTab === 'ai_plans' ? colors.primaryContainer : colors.onSurfaceVariant}
            />
            <Text style={[styles.tabBtnText, activeTab === 'ai_plans' && styles.tabBtnTextActive]}>
              AI Prep Plans
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'exams' ? (
          /* TAB 1: Upcoming Exams & Tests */
          <View style={styles.sectionContainer}>
            {examItems.map((exam) => (
              <View key={exam.id} style={styles.examCard}>
                <View style={styles.examCardHeader}>
                  <View style={styles.courseBadge}>
                    <Text style={styles.courseBadgeText}>{exam.course}</Text>
                  </View>
                  <View style={[styles.daysLeftPill, exam.daysLeft <= 4 && styles.urgentPill]}>
                    <Icon name="event" size={13} color={exam.daysLeft <= 4 ? colors.errorCoral : colors.primaryContainer} />
                    <Text style={[styles.daysLeftText, exam.daysLeft <= 4 && { color: colors.errorCoral, fontWeight: '700' }]}>
                      {exam.daysLeft} days left
                    </Text>
                  </View>
                </View>

                <Text style={styles.examTitle}>{exam.title}</Text>
                <Text style={styles.examDate}>📅 {exam.date}</Text>
                <Text style={styles.examWeight}>⚖️ Weightage: {exam.weight}</Text>

                <View style={styles.topicsRow}>
                  {exam.topics.map((t, idx) => (
                    <View key={idx} style={styles.topicChip}>
                      <Text style={styles.topicChipText}>{t}</Text>
                    </View>
                  ))}
                </View>

                {exam.prepPlanGenerated ? (
                  <View style={styles.planReadyBanner}>
                    <Icon name="verified" size={16} color="#22C55E" />
                    <Text style={styles.planReadyText}>AI Study Plan Ready</Text>
                    <TouchableOpacity onPress={() => setActiveTab('ai_plans')}>
                      <Text style={styles.viewPlanLink}>View Plan →</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.generatePlanBtn}
                    onPress={() => handleGeneratePlan(exam.id)}
                    activeOpacity={0.85}
                  >
                    <Icon name="auto_awesome" size={16} color={colors.onPrimary} />
                    <Text style={styles.generatePlanBtnText}>Generate AI Preparation Plan</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ) : activeTab === 'assignments' ? (
          /* TAB 2: Major Assignments */
          <View style={styles.sectionContainer}>
            {majorAssignments.map((task) => (
              <View key={task.id} style={styles.examCard}>
                <View style={styles.examCardHeader}>
                  <View style={styles.courseBadge}>
                    <Text style={styles.courseBadgeText}>{task.courseCode}</Text>
                  </View>
                  <Text style={styles.dueText}>{task.dueDate}</Text>
                </View>
                <Text style={styles.examTitle}>{task.title}</Text>
                <Text style={styles.examWeight}>Estimated workload: {task.estimatedMinutes} mins</Text>

                <TouchableOpacity
                  style={styles.viewTaskBtn}
                  onPress={() => navigateTo('TaskDetails', { taskId: task.id })}
                >
                  <Icon name="open_in_new" size={16} color={colors.primaryContainer} />
                  <Text style={styles.viewTaskBtnText}>Open Task Details & Milestones</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          /* TAB 3: AI Prep Plans */
          <View style={styles.sectionContainer}>
            <View style={styles.aiPlanHero}>
              <View style={styles.aiPlanHeader}>
                <Icon name="psychology" size={24} color={colors.primaryContainer} />
                <View>
                  <Text style={styles.aiPlanTitle}>CS305 Data Mining Viva Plan</Text>
                  <Text style={styles.aiPlanSub}>Spaced Repetition Schedule (4 Days to Viva)</Text>
                </View>
              </View>

              <View style={styles.planTimeline}>
                <View style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineDay}>Day 1 (Today): Conceptual Foundations</Text>
                    <Text style={styles.timelineTask}>Apriori algorithm steps & support/confidence formulas (60m)</Text>
                  </View>
                </View>

                <View style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineDay}>Day 2 (Tomorrow): Hands-on Simulation</Text>
                    <Text style={styles.timelineTask}>K-Means clustering distance matrices & manual walkthrough (90m)</Text>
                  </View>
                </View>

                <View style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineDay}>Day 3 (Saturday): Mock Viva Practice</Text>
                    <Text style={styles.timelineTask}>Decision tree entropy calculation & flashcards with study partner (45m)</Text>
                  </View>
                </View>

                <View style={styles.timelineItem}>
                  <View style={[styles.timelineDot, { backgroundColor: '#22C55E' }]} />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineDay}>Day 4 (Sunday morning): Rapid Recall</Text>
                    <Text style={styles.timelineTask}>High-yield formulas cheat-sheet review before 2 PM Viva (30m)</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.addPlanBtn}
                onPress={handleAddPlanToTasks}
                activeOpacity={0.88}
              >
                <Icon name="calendar_add_on" size={20} color={colors.onPrimary} />
                <Text style={styles.addPlanBtnText}>Add All 4 Days to My Schedule</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainer,
    borderRadius: rounded.xl,
    padding: 4,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: rounded.lg,
  },
  tabBtnActive: {
    backgroundColor: colors.surfaceContainerLowest,
    ...shadows.sm,
  },
  tabBtnText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    fontWeight: '600',
  },
  tabBtnTextActive: {
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  sectionContainer: {
    gap: spacing.sm,
  },
  examCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.12)',
    ...shadows.sm,
    gap: 8,
  },
  examCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  courseBadge: {
    backgroundColor: colors.primaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  courseBadgeText: {
    ...typography.labelSm,
    color: colors.onPrimaryFixed,
    fontWeight: '700',
  },
  daysLeftPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
  },
  urgentPill: {
    backgroundColor: colors.errorContainer,
  },
  daysLeftText: {
    ...typography.labelSm,
    color: colors.primaryContainer,
    fontWeight: '600',
  },
  dueText: {
    ...typography.labelSm,
    color: colors.errorCoral,
    fontWeight: '600',
  },
  examTitle: {
    ...typography.titleMedium,
    color: colors.onSurface,
    fontWeight: '700',
  },
  examDate: {
    ...typography.bodySm,
    color: colors.onSurface,
    fontWeight: '600',
  },
  examWeight: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  topicsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 4,
  },
  topicChip: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
  },
  topicChipText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    fontSize: 11,
  },
  generatePlanBtn: {
    height: 42,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  generatePlanBtnText: {
    ...typography.labelMd,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  planReadyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0FDF4',
    padding: 10,
    borderRadius: rounded.md,
    marginTop: 4,
  },
  planReadyText: {
    ...typography.labelSm,
    color: '#15803D',
    fontWeight: '700',
  },
  viewPlanLink: {
    ...typography.labelSm,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  viewTaskBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: rounded.md,
    backgroundColor: colors.surfaceContainerLow,
    marginTop: 4,
  },
  viewTaskBtnText: {
    ...typography.labelSm,
    color: colors.primaryContainer,
    fontWeight: '600',
  },
  aiPlanHero: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.15)',
    ...shadows.sm,
    gap: spacing.md,
  },
  aiPlanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aiPlanTitle: {
    ...typography.titleMedium,
    color: colors.onSurface,
    fontWeight: '700',
  },
  aiPlanSub: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  planTimeline: {
    gap: 14,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(79, 70, 229, 0.2)',
  },
  timelineItem: {
    position: 'relative',
    paddingLeft: 12,
  },
  timelineDot: {
    position: 'absolute',
    left: -19,
    top: 3,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primaryContainer,
  },
  timelineContent: {
    gap: 2,
  },
  timelineDay: {
    ...typography.labelMd,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  timelineTask: {
    ...typography.bodyRegular,
    color: colors.onSurface,
  },
  addPlanBtn: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  addPlanBtnText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
});

export default ExamTrackerScreen;
