import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
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
import Icon from '../../components/common/Icon';

export const AITaskAssistantScreen = () => {
  const { addTask, navigateTo, showToast } = useTaskContext();

  const [inputPrompt, setInputPrompt] = useState('I have a Physics assignment due Friday.');
  const [taskName, setTaskName] = useState('Physics Assignment');
  const [subject, setSubject] = useState('Physics');
  const [deadline, setDeadline] = useState('Fri, 26 Sep 2025');
  const [estimatedDuration, setEstimatedDuration] = useState('1h 30m');
  const [priority, setPriority] = useState('High');

  const [subtasks, setSubtasks] = useState([
    { id: 'st-1', title: 'Research topic', isDone: false },
    { id: 'st-2', title: 'Write draft', isDone: false },
    { id: 'st-3', title: 'Final submission', isDone: false },
  ]);

  const handlePromptSubmit = () => {
    if (!inputPrompt.trim()) return;
    showToast('AI parsed your task!', 'success');
    if (inputPrompt.toLowerCase().includes('math')) {
      setTaskName('Math Problem Set 4');
      setSubject('Mathematics');
      setDeadline('Thu, 25 Sep 2025');
    } else if (inputPrompt.toLowerCase().includes('chem')) {
      setTaskName('Chemistry Lab Report');
      setSubject('Chemistry');
      setDeadline('Mon, 29 Sep 2025');
    } else {
      setTaskName('Physics Assignment');
      setSubject('Physics');
      setDeadline('Fri, 26 Sep 2025');
    }
  };

  const toggleSubtask = (id) => {
    setSubtasks(prev =>
      prev.map(s => (s.id === id ? { ...s, isDone: !s.isDone } : s))
    );
  };

  const handleAddToTasks = () => {
    addTask({
      title: taskName,
      course: subject,
      dueDate: deadline,
      priority: priority.toLowerCase(),
      estimatedMinutes: 90,
      subtasks: subtasks.map(s => ({ id: s.id, title: s.title, isCompleted: s.isDone })),
    });
    showToast('Task added to schedule!', 'success');
    navigateTo('TodayTasks');
  };

  return (
    <View style={styles.screenWrapper}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigateTo('HomeDashboard')}
          activeOpacity={0.8}
        >
          <Icon name="arrow_back" size={22} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>AI Task Assistant</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Natural Language Prompt Bubble */}
        <View style={styles.promptBubbleRow}>
          <View style={styles.aiAvatarIcon}>
            <Icon name="lightbulb" size={20} color={colors.primaryCoral} fill />
          </View>
          <View style={styles.speechBubble}>
            <TextInput
              style={styles.speechInput}
              value={inputPrompt}
              onChangeText={setInputPrompt}
              placeholder="e.g. I have a Physics assignment due Friday"
              placeholderTextColor="#94A3B8"
              onSubmitEditing={handlePromptSubmit}
            />
            <TouchableOpacity onPress={handlePromptSubmit} style={styles.sendIconTouch}>
              <Icon name="arrow_upward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Task Detected Card */}
        <View style={styles.detectedCard}>
          <View style={styles.detectedHeader}>
            <View style={styles.detectedIconCircle}>
              <Icon name="task_alt" size={20} color="#3B82F6" />
            </View>
            <View style={styles.detectedTitleCol}>
              <Text style={styles.detectedLabel}>Task Detected:</Text>
              <Text style={styles.detectedTitle}>{taskName}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Metadata Rows */}
          <View style={styles.metaGrid}>
            <View style={styles.metaRow}>
              <Text style={styles.metaFieldLabel}>Suggested Deadline</Text>
              <Text style={styles.metaFieldValue}>{deadline}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaFieldLabel}>Estimated Time</Text>
              <View style={styles.durationBadge}>
                <Text style={styles.durationBadgeText}>{estimatedDuration}</Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaFieldLabel}>Priority</Text>
              <View style={styles.priorityPill}>
                <Text style={styles.priorityPillText}>{priority}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Suggested Subtasks Section */}
          <View style={styles.subtasksSection}>
            <Text style={styles.subtasksHeader}>Suggested Subtasks</Text>
            <View style={styles.subtasksList}>
              {subtasks.map((st) => (
                <TouchableOpacity
                  key={st.id}
                  style={styles.subtaskRow}
                  onPress={() => toggleSubtask(st.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.subtaskCheckCircle, st.isDone && styles.subtaskCheckCircleActive]}>
                    <Icon name={st.isDone ? 'check' : 'radio_button_unchecked'} size={16} color={st.isDone ? '#FFFFFF' : '#10B981'} />
                  </View>
                  <Text style={[styles.subtaskText, st.isDone && styles.subtaskTextDone]}>
                    {st.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* AI Explanation Pill */}
          <View style={styles.aiExplanationBox}>
            <Icon name="auto_awesome" size={16} color="#8B5CF6" fill />
            <Text style={styles.aiExplanationText}>
              TaskMind scheduled 3 sprint sessions before your Friday 11:59 PM deadline.
            </Text>
          </View>
        </View>

        {/* Primary Action Button */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleAddToTasks}
            activeOpacity={0.88}
          >
            <Text style={styles.addBtnText}>Add to Tasks</Text>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
    backgroundColor: '#FFFDF9',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    ...typography.headlineMd,
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: 96,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  promptBubbleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    gap: 10,
  },
  aiAvatarIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFEFEB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFD5CC',
  },
  speechBubble: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: '#DBEAFE',
    borderRadius: rounded.xl,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  speechInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
  },
  sendIconTouch: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primaryCoral,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  detectedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 16,
    marginBottom: spacing.md,
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
  detectedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detectedIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detectedTitleCol: {
    flex: 1,
  },
  detectedLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  detectedTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1EFEA',
    marginVertical: 12,
  },
  metaGrid: {
    gap: 10,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaFieldLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  metaFieldValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  durationBadge: {
    backgroundColor: '#F1EFEA',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: rounded.full,
  },
  durationBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  priorityPill: {
    backgroundColor: '#FFEFEB',
    borderColor: '#FFD5CC',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: rounded.full,
  },
  priorityPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },
  subtasksSection: {
    marginTop: 2,
  },
  subtasksHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtasksList: {
    gap: 8,
  },
  subtaskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subtaskCheckCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtaskCheckCircleActive: {
    backgroundColor: '#10B981',
  },
  subtaskText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  subtaskTextDone: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  aiExplanationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderWidth: 1,
    borderColor: '#DDD6FE',
    borderRadius: rounded.md,
    padding: 10,
    marginTop: 14,
    gap: 8,
  },
  aiExplanationText: {
    fontSize: 12,
    color: '#6D28D9',
    fontWeight: '500',
    flex: 1,
  },
  actionWrapper: {
    marginTop: spacing.xs,
  },
  addBtn: {
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
  addBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AITaskAssistantScreen;
