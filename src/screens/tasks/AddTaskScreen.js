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
import Icon from '../../components/common/Icon';

const subjectsList = [
  { name: 'Physics', color: '#8B5CF6', bg: '#F5F3FF' },
  { name: 'Mathematics', color: '#3B82F6', bg: '#EFF6FF' },
  { name: 'Chemistry', color: '#10B981', bg: '#ECFDF5' },
  { name: 'Computer Science', color: '#F59E0B', bg: '#FEF3C7' },
  { name: 'English Literature', color: '#EC4899', bg: '#FDF2F8' },
];

export const AddTaskScreen = () => {
  const { addTask, goBack, showToast } = useTaskContext();

  const [title, setTitle] = useState('Physics Assignment');
  const [subject, setSubject] = useState('Physics');
  const [deadlineDate, setDeadlineDate] = useState('23 Sep 2025');
  const [deadlineTime, setDeadlineTime] = useState('10:00 AM');
  const [priority, setPriority] = useState('high'); // 'low' | 'med' | 'high'
  const [estimatedDuration, setEstimatedDuration] = useState('1h 30m');
  const [recurring, setRecurring] = useState('Does not repeat');
  const [notes, setNotes] = useState('');
  const [isAiBreakingDown, setIsAiBreakingDown] = useState(false);
  const [subtasks, setSubtasks] = useState([]);

  const handleAiBreakdown = () => {
    setIsAiBreakingDown(true);
    setTimeout(() => {
      setSubtasks([
        { id: '1', title: 'Review Chapter 4 textbook notes (25m)', isCompleted: false },
        { id: '2', title: 'Solve kinematic problem set 1-5 (45m)', isCompleted: false },
        { id: '3', title: 'Format solutions & lab equations (20m)', isCompleted: false },
      ]);
      setIsAiBreakingDown(false);
      showToast('AI broke task into 3 manageable steps!', 'success');
    }, 600);
  };

  const handleSave = () => {
    if (!title.trim()) {
      showToast('Please enter a task name', 'error');
      return;
    }

    addTask({
      title: title.trim(),
      course: subject,
      courseCode: subject.slice(0, 4).toUpperCase(),
      dueDate: `${deadlineDate}, ${deadlineTime}`,
      priority: priority === 'high' ? 'high' : priority === 'med' ? 'med' : 'low',
      estimatedMinutes: estimatedDuration.includes('1h') ? 90 : 45,
      recurring,
      notes,
      subtasks,
    });

    showToast('Task added successfully!', 'success');
    goBack();
  };

  return (
    <View style={styles.screenWrapper}>
      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack} activeOpacity={0.8}>
          <Icon name="arrow_back" size={22} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Add Task</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Task Name */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Task Name</Text>
          <View style={styles.inputBox}>
            <Icon name="edit_note" size={20} color="#64748B" style={styles.fieldIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Physics Assignment"
              placeholderTextColor="#94A3B8"
              value={title}
              onChangeText={setTitle}
            />
          </View>
        </View>

        {/* 2. Subject Dropdown */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Subject</Text>
          <TouchableOpacity
            style={styles.selectorBox}
            onPress={() => {
              const names = subjectsList.map(s => s.name);
              const nextIdx = (names.indexOf(subject) + 1) % names.length;
              setSubject(names[nextIdx]);
            }}
            activeOpacity={0.8}
          >
            <View style={styles.subjectPillLeft}>
              <View
                style={[
                  styles.subjectChip,
                  {
                    backgroundColor:
                      subjectsList.find(s => s.name === subject)?.bg || '#F5F3FF',
                  },
                ]}
              >
                <View
                  style={[
                    styles.subjectDot,
                    {
                      backgroundColor:
                        subjectsList.find(s => s.name === subject)?.color || '#8B5CF6',
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.subjectChipText,
                    {
                      color:
                        subjectsList.find(s => s.name === subject)?.color || '#8B5CF6',
                    },
                  ]}
                >
                  {subject}
                </Text>
              </View>
            </View>
            <Icon name="expand_more" size={22} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* 3. Deadline (Date & Time) */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Deadline</Text>
          <View style={styles.deadlineRow}>
            {/* Date Pill */}
            <TouchableOpacity
              style={styles.deadlinePill}
              onPress={() => showToast('Date selected: 23 Sep 2025', 'info')}
              activeOpacity={0.8}
            >
              <Icon name="calendar_today" size={16} color="#64748B" />
              <Text style={styles.deadlineText}>{deadlineDate}</Text>
            </TouchableOpacity>

            {/* Time Pill */}
            <TouchableOpacity
              style={styles.deadlinePill}
              onPress={() => showToast('Time selected: 10:00 AM', 'info')}
              activeOpacity={0.8}
            >
              <Icon name="schedule" size={16} color="#64748B" />
              <Text style={styles.deadlineText}>{deadlineTime}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. Priority */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Priority</Text>
          <View style={styles.priorityRow}>
            {/* Low */}
            <TouchableOpacity
              style={[
                styles.priorityOption,
                priority === 'low' && styles.priorityOptionLowActive,
              ]}
              onPress={() => setPriority('low')}
              activeOpacity={0.8}
            >
              <View style={[styles.priorityDot, { backgroundColor: '#10B981' }]} />
              <Text
                style={[
                  styles.priorityOptionText,
                  priority === 'low' && { color: '#10B981', fontWeight: '700' },
                ]}
              >
                Low
              </Text>
            </TouchableOpacity>

            {/* Medium */}
            <TouchableOpacity
              style={[
                styles.priorityOption,
                priority === 'med' && styles.priorityOptionMedActive,
              ]}
              onPress={() => setPriority('med')}
              activeOpacity={0.8}
            >
              <View style={[styles.priorityDot, { backgroundColor: '#F59E0B' }]} />
              <Text
                style={[
                  styles.priorityOptionText,
                  priority === 'med' && { color: '#D97706', fontWeight: '700' },
                ]}
              >
                Medium
              </Text>
            </TouchableOpacity>

            {/* High */}
            <TouchableOpacity
              style={[
                styles.priorityOption,
                priority === 'high' && styles.priorityOptionHighActive,
              ]}
              onPress={() => setPriority('high')}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.priorityDot,
                  { backgroundColor: priority === 'high' ? '#FFFFFF' : '#EF4444' },
                ]}
              />
              <Text
                style={[
                  styles.priorityOptionText,
                  priority === 'high' && { color: '#FFFFFF', fontWeight: '700' },
                ]}
              >
                High
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Estimated Duration */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Estimated Duration</Text>
          <TouchableOpacity
            style={styles.inputBox}
            onPress={() => {
              const durs = ['30m', '45m', '1h 00m', '1h 30m', '2h 00m'];
              const nextIdx = (durs.indexOf(estimatedDuration) + 1) % durs.length;
              setEstimatedDuration(durs[nextIdx]);
            }}
            activeOpacity={0.8}
          >
            <Icon name="timer" size={18} color="#64748B" style={styles.fieldIcon} />
            <Text style={styles.selectorValueText}>{estimatedDuration}</Text>
          </TouchableOpacity>
        </View>

        {/* 6. Recurring */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Recurring</Text>
          <TouchableOpacity
            style={styles.selectorBox}
            onPress={() => {
              const recs = ['Does not repeat', 'Daily', 'Weekly on Tuesdays', 'Bi-weekly'];
              const nextIdx = (recs.indexOf(recurring) + 1) % recs.length;
              setRecurring(recs[nextIdx]);
            }}
            activeOpacity={0.8}
          >
            <View style={styles.subjectPillLeft}>
              <Icon name="repeat" size={18} color="#64748B" style={styles.fieldIcon} />
              <Text style={styles.selectorValueText}>{recurring}</Text>
            </View>
            <Icon name="expand_more" size={22} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* 7. Notes */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Notes</Text>
          <View style={styles.textAreaBox}>
            <TextInput
              style={styles.textAreaInput}
              placeholder="Write notes here..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={3}
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </View>

        {/* 8. AI Breakdown Card */}
        <TouchableOpacity
          style={styles.aiBreakdownCard}
          onPress={handleAiBreakdown}
          activeOpacity={0.85}
        >
          <View style={styles.aiBreakdownHeader}>
            <Icon name="auto_awesome" size={20} color="#8B5CF6" fill />
            <Text style={styles.aiBreakdownTitle}>
              {isAiBreakingDown ? 'AI is breaking down steps...' : 'AI can break this task down into smaller steps'}
            </Text>
          </View>

          {subtasks.length > 0 && (
            <View style={styles.subtasksList}>
              {subtasks.map((st, i) => (
                <View key={st.id} style={styles.subtaskItem}>
                  <View style={styles.subtaskNumBadge}>
                    <Text style={styles.subtaskNumText}>{i + 1}</Text>
                  </View>
                  <Text style={styles.subtaskTitle}>{st.title}</Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>

        {/* Bottom Save Task Button */}
        <View style={styles.saveBtnWrapper}>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            activeOpacity={0.88}
          >
            <Text style={styles.saveBtnText}>Save Task</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingBottom: spacing.sm,
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
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  fieldGroup: {
    marginBottom: spacing.md,
  },
  fieldLabel: {
    ...typography.labelMd,
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E4DC',
    borderRadius: rounded.xl,
    paddingHorizontal: 12,
    height: 48,
  },
  fieldIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
  selectorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E4DC',
    borderRadius: rounded.xl,
    paddingHorizontal: 12,
    height: 48,
  },
  subjectPillLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: rounded.full,
  },
  subjectDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  subjectChipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  selectorValueText: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
  deadlineRow: {
    flexDirection: 'row',
    gap: 10,
  },
  deadlinePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E4DC',
    borderRadius: rounded.xl,
    height: 48,
    gap: 8,
  },
  deadlineText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E4DC',
    borderRadius: rounded.full,
    height: 44,
    gap: 6,
  },
  priorityOptionLowActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  priorityOptionMedActive: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  priorityOptionHighActive: {
    backgroundColor: colors.primaryCoral,
    borderColor: colors.primaryCoral,
  },
  priorityDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  priorityOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  textAreaBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E4DC',
    borderRadius: rounded.xl,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 80,
  },
  textAreaInput: {
    fontSize: 14,
    color: '#1E293B',
    textAlignVertical: 'top',
  },
  aiBreakdownCard: {
    backgroundColor: '#F5F3FF',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    borderRadius: rounded.xl,
    padding: 14,
    marginBottom: spacing.md,
  },
  aiBreakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiBreakdownTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6D28D9',
    flex: 1,
  },
  subtasksList: {
    marginTop: 10,
    gap: 6,
  },
  subtaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subtaskNumBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtaskNumText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  subtaskTitle: {
    fontSize: 12,
    color: '#4C1D95',
    fontWeight: '500',
  },
  saveBtnWrapper: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  saveBtn: {
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
  saveBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AddTaskScreen;
