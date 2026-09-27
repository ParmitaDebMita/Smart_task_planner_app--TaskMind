import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Header from '../../components/common/Header';
import Icon from '../../components/common/Icon';

const categories = ['Assignment', 'Exam Prep', 'Lab / Practical', 'Project', 'Revision', 'Reading'];
const priorities = [
  { id: 'low', label: 'Low' },
  { id: 'med', label: 'Medium' },
  { id: 'high', label: 'High' },
  { id: 'urgent', label: 'Urgent 🔥' },
];

export const AddTaskScreen = () => {
  const { addTask, goBack, showToast, navigateTo } = useTaskContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Assignment');
  const [priority, setPriority] = useState('high');
  const [effortMins, setEffortMins] = useState(150); // 2h 30m
  const [studyWindow, setStudyWindow] = useState('night');
  const [alarmOn, setAlarmOn] = useState(true);
  const [reminder, setReminder] = useState('2h');
  const [recurring, setRecurring] = useState('none');
  const [autoReserved, setAutoReserved] = useState(false);

  const formatEffort = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h 00m`;
    return `${m}m`;
  };

  const handleSave = () => {
    if (!title.trim()) {
      showToast('Please enter a task title', 'error');
      return;
    }

    addTask({
      title: title.trim(),
      description,
      category,
      priority,
      estimatedMinutes: effortMins,
      dueDate: 'Tomorrow, 11:59 PM',
      dueTimestamp: 'Tomorrow, Oct 24, 11:59 PM',
      studyWindow,
      reminder,
      recurring,
      course: 'CS301',
      courseCode: 'CS301',
    });

    goBack();
  };

  return (
    <View style={styles.screenWrapper}>
      <Header title="Quick Add Task" subtitle="New Academic Task" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Banner Row */}
        <View style={styles.topBanner}>
          <View style={styles.topBannerText}>
            <Text style={styles.semesterTag}>Semester 1 • Sprint</Text>
            <Text style={styles.topTitle}>New Academic Task</Text>
          </View>
          <View style={styles.topActions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={goBack}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveTopBtn} onPress={handleSave}>
              <Icon name="save" size={16} color={colors.onPrimary} />
              <Text style={styles.saveTopText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Gemini Smart Suggestion Banner */}
        <View style={styles.smartCardContainer}>
          <View style={styles.smartCard}>
            <View style={styles.smartCardHeader}>
              <View style={styles.smartHeaderLeft}>
                <Icon name="auto_awesome" size={18} color={colors.secondaryContainer} fill />
                <Text style={styles.smartHeaderTitle}>Gemini Smart Suggestion</Text>
              </View>
              <View style={styles.peakBadge}>
                <Icon name="bolt" size={12} color={colors.tertiary} />
                <Text style={styles.peakBadgeText}>94% Peak Match</Text>
              </View>
            </View>

            <Text style={styles.smartBodyText}>
              Based on your energy patterns: Schedule deep work block for{' '}
              <Text style={{ fontWeight: '700', color: colors.primaryContainer }}>
                Tomorrow, 3:30 PM – 5:30 PM
              </Text>{' '}
              (Your highest focus window).
            </Text>

            <View style={styles.smartActionRow}>
              <TouchableOpacity
                style={[styles.reserveBtn, autoReserved && styles.reservedBtnActive]}
                onPress={() => {
                  setAutoReserved(true);
                  showToast('Auto-reserved 3:30 PM slot in timetable!', 'success');
                }}
              >
                <Icon
                  name={autoReserved ? 'done_all' : 'check'}
                  size={14}
                  color={autoReserved ? colors.onTertiary : colors.primaryContainer}
                />
                <Text
                  style={[
                    styles.reserveBtnText,
                    autoReserved && { color: colors.onTertiary, fontWeight: '700' },
                  ]}
                >
                  {autoReserved ? 'Slot Reserved' : 'Auto-Reserve Slot'}
                </Text>
              </TouchableOpacity>
              {autoReserved && (
                <Text style={styles.reservedStatusText}>Reserved in calendar</Text>
              )}
            </View>
          </View>
        </View>

        {/* Main Task Info Card */}
        <View style={styles.sectionCard}>
          {/* Task Title */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.fieldLabel}>
                Task Title <Text style={{ color: colors.errorCoral }}>*</Text>
              </Text>
              <Text style={styles.fieldHint}>e.g., DBMS Assignment</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., DBMS Assignment, IoT Practical"
              placeholderTextColor={colors.outline}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Description */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.fieldLabel}>Description</Text>
              <Text style={styles.fieldHint}>Rubrics & links</Text>
            </View>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Notes, assignment instructions, rubrics, chapter numbers..."
              placeholderTextColor={colors.outline}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Category Chips */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Task Category</Text>
            <View style={styles.chipsWrap}>
              {categories.map(cat => {
                const isSelected = category === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.chipBtn, isSelected && styles.chipBtnActive]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text
                      style={[styles.chipText, isSelected && styles.chipTextActive]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Timing & Urgency Card */}
        <View style={styles.sectionCard}>
          <View style={styles.cardSectionTitleRow}>
            <Icon name="calendar_clock" size={20} color={colors.primaryContainer} />
            <Text style={styles.cardSectionTitle}>Timing & Urgency</Text>
          </View>

          {/* Due Date & Alarm */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Due Date & Deadline</Text>
            <View style={styles.dueRow}>
              <View style={styles.dueDateDisplay}>
                <Icon name="event" size={18} color={colors.secondary} />
                <Text style={styles.dueDateText}>Tomorrow, Oct 24, 11:59 PM</Text>
              </View>

              <TouchableOpacity
                style={[styles.alarmBtn, !alarmOn && styles.alarmBtnOff]}
                onPress={() => {
                  setAlarmOn(!alarmOn);
                  showToast(alarmOn ? 'Deadline alarm muted' : 'Deadline alarm active', 'info');
                }}
              >
                <Icon
                  name={alarmOn ? 'notifications_active' : 'notifications_off'}
                  size={18}
                  color={alarmOn ? colors.secondary : colors.outline}
                  fill={alarmOn}
                />
                <Text
                  style={[
                    styles.alarmText,
                    { color: alarmOn ? colors.secondary : colors.outline },
                  ]}
                >
                  {alarmOn ? 'On' : 'Off'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Priority 4-Segment Selector */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Priority Level</Text>
            <View style={styles.prioritySegmentTrack}>
              {priorities.map(p => {
                const isSelected = priority === p.id;
                return (
                  <TouchableOpacity
                    key={p.id}
                    style={[
                      styles.prioritySegment,
                      isSelected && styles.prioritySegmentActive,
                    ]}
                    onPress={() => setPriority(p.id)}
                  >
                    <Text
                      style={[
                        styles.prioritySegmentText,
                        isSelected && styles.prioritySegmentTextActive,
                        p.id === 'urgent' && isSelected && { color: colors.errorCoral, fontWeight: '700' },
                      ]}
                    >
                      {p.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Estimated Effort Stepper */}
          <View style={styles.fieldGroup}>
            <View style={styles.effortHeader}>
              <Text style={styles.fieldLabel}>Estimated Effort</Text>
              <View style={styles.effortDisplay}>
                <Icon name="timer" size={15} color={colors.secondary} />
                <Text style={styles.effortDisplayText}>{formatEffort(effortMins)}</Text>
              </View>
            </View>

            <View style={styles.stepperRow}>
              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={() => setEffortMins(prev => Math.max(15, prev - 15))}
              >
                <Icon name="remove" size={18} color={colors.onSurface} />
              </TouchableOpacity>

              <View style={styles.effortSliderMock}>
                <View
                  style={[
                    styles.effortFillTrack,
                    { width: `${Math.min(100, (effortMins / 360) * 100)}%` },
                  ]}
                />
              </View>

              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={() => setEffortMins(prev => Math.min(360, prev + 15))}
              >
                <Icon name="add" size={18} color={colors.onSurface} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Study Routine Preferences Card */}
        <View style={styles.sectionCard}>
          <View style={styles.cardSectionTitleRow}>
            <Icon name="psychology" size={20} color={colors.secondary} />
            <Text style={styles.cardSectionTitle}>Study Routine Preferences</Text>
          </View>

          {/* Preferred Study Window */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Preferred Study Window</Text>
            <View style={styles.windowGrid}>
              <TouchableOpacity
                style={[
                  styles.windowCard,
                  studyWindow === 'afternoon' && styles.windowCardActive,
                ]}
                onPress={() => setStudyWindow('afternoon')}
              >
                <View style={styles.windowHeader}>
                  <Icon name="wb_sunny" size={16} color={colors.secondary} />
                  <Text style={styles.windowTitle}>Afternoon</Text>
                </View>
                <Text style={styles.windowSub}>2 PM – 6 PM</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.windowCard,
                  studyWindow === 'night' && styles.windowCardActive,
                ]}
                onPress={() => setStudyWindow('night')}
              >
                <View style={styles.windowHeader}>
                  <Icon name="dark_mode" size={16} color={colors.primaryContainer} />
                  <Text
                    style={[
                      styles.windowTitle,
                      studyWindow === 'night' && { color: colors.primaryContainer },
                    ]}
                  >
                    Night Owl
                  </Text>
                </View>
                <Text style={styles.windowSub}>8 PM – 12 AM</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dropdowns */}
          <View style={styles.dropdownGroup}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Notification Alert</Text>
              <View style={styles.dropdownBox}>
                <Icon name="notifications" size={16} color={colors.secondary} />
                <Text style={styles.dropdownText}>2 hours before (Recommended)</Text>
                <Icon name="expand_more" size={18} color={colors.outline} />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Recurring Schedule</Text>
              <View style={styles.dropdownBox}>
                <Icon name="repeat" size={16} color={colors.secondary} />
                <Text style={styles.dropdownText}>Does not repeat</Text>
                <Icon name="expand_more" size={18} color={colors.outline} />
              </View>
            </View>
          </View>
        </View>

        {/* Attachment Zone */}
        <View style={styles.sectionCard}>
          <View style={styles.labelRow}>
            <Text style={styles.fieldLabel}>Rubric or Materials</Text>
            <Text style={styles.fieldHint}>Optional</Text>
          </View>
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={() => showToast('Rubric PDF attached successfully (1.4MB)', 'info')}
          >
            <View style={styles.uploadIconCircle}>
              <Icon name="upload_file" size={24} color={colors.primaryContainer} />
            </View>
            <Text style={styles.uploadTitle}>Upload assignment PDF or rubric</Text>
            <Text style={styles.uploadSub}>PDF, DOCX, or PNG (Max 15MB)</Text>
          </TouchableOpacity>
        </View>

        {/* Voice Mode Quick Link */}
        <TouchableOpacity
          style={styles.voiceEntryLink}
          onPress={() => navigateTo('VoiceTaskEntry')}
        >
          <Icon name="mic" size={18} color={colors.primaryContainer} fill />
          <Text style={styles.voiceEntryText}>Or create faster with Voice Task Entry</Text>
          <Icon name="chevron_right" size={16} color={colors.primaryContainer} />
        </TouchableOpacity>

        {/* Sticky Create Button */}
        <TouchableOpacity
          style={styles.createMainBtn}
          onPress={handleSave}
          activeOpacity={0.88}
        >
          <Icon name="bolt" size={20} color={colors.onPrimary} fill />
          <Text style={styles.createMainBtnText}>Create Task & Auto-Schedule</Text>
        </TouchableOpacity>
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
  topBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBannerText: {
    gap: 2,
  },
  semesterTag: {
    ...typography.labelSm,
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  topTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  cancelBtn: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainer,
  },
  cancelText: {
    ...typography.labelMd,
    color: colors.onSurface,
  },
  saveTopBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: rounded.full,
    backgroundColor: colors.primaryContainer,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  saveTopText: {
    ...typography.labelMd,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  smartCardContainer: {
    borderRadius: rounded.lg,
    padding: 1,
    backgroundColor: colors.primaryContainer,
  },
  smartCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  smartCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smartHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  smartHeaderTitle: {
    ...typography.labelMd,
    color: colors.secondary,
    fontWeight: '700',
  },
  peakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  peakBadgeText: {
    ...typography.labelSm,
    color: colors.tertiary,
    fontWeight: '700',
  },
  smartBodyText: {
    ...typography.bodySm,
    color: colors.onSurface,
    lineHeight: 18,
    marginTop: 2,
  },
  smartActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 4,
  },
  reserveBtn: {
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reservedBtnActive: {
    backgroundColor: colors.tertiaryContainer,
  },
  reserveBtnText: {
    ...typography.labelSm,
    color: colors.primaryContainer,
    fontWeight: '600',
  },
  reservedStatusText: {
    ...typography.labelSm,
    color: colors.outline,
  },
  sectionCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
    gap: spacing.md,
  },
  cardSectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardSectionTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  fieldGroup: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldLabel: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  fieldHint: {
    fontSize: 11,
    color: colors.outline,
  },
  textInput: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    ...typography.bodyMd,
    color: colors.onSurface,
  },
  textArea: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainer,
  },
  chipBtnActive: {
    backgroundColor: colors.primaryContainer,
    ...shadows.xs,
  },
  chipText: {
    ...typography.labelMd,
    color: colors.onSurface,
  },
  chipTextActive: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  dueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dueDateDisplay: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.md,
    paddingHorizontal: spacing.sm,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dueDateText: {
    ...typography.bodyMd,
    color: colors.onSurface,
  },
  alarmBtn: {
    height: 44,
    paddingHorizontal: 12,
    backgroundColor: colors.surfaceContainer,
    borderRadius: rounded.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  alarmBtnOff: {
    opacity: 0.6,
  },
  alarmText: {
    ...typography.labelSm,
    fontWeight: '700',
  },
  prioritySegmentTrack: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.md,
    padding: 3,
  },
  prioritySegment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: rounded.sm,
  },
  prioritySegmentActive: {
    backgroundColor: colors.surfaceContainerLowest,
    ...shadows.xs,
  },
  prioritySegmentText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  prioritySegmentTextActive: {
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  effortHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  effortDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.sm,
  },
  effortDisplayText: {
    ...typography.labelLg,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stepperBtn: {
    width: 38,
    height: 38,
    borderRadius: rounded.md,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  effortSliderMock: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surfaceContainer,
    borderRadius: rounded.full,
    overflow: 'hidden',
  },
  effortFillTrack: {
    height: '100%',
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.full,
  },
  windowGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  windowCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.md,
    padding: spacing.sm,
    gap: 2,
  },
  windowCardActive: {
    backgroundColor: colors.primaryFixed,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.2)',
  },
  windowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  windowTitle: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  windowSub: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  dropdownGroup: {
    gap: spacing.sm,
  },
  dropdownBox: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.md,
    paddingHorizontal: spacing.sm,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    ...typography.bodyMd,
    color: colors.onSurface,
    flex: 1,
    marginHorizontal: 8,
  },
  uploadBox: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.md,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  uploadIconCircle: {
    width: 44,
    height: 44,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  uploadTitle: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  uploadSub: {
    fontSize: 11,
    color: colors.outline,
    marginTop: 2,
  },
  voiceEntryLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: spacing.xs,
  },
  voiceEntryText: {
    ...typography.labelMd,
    color: colors.primaryContainer,
    fontWeight: '600',
  },
  createMainBtn: {
    height: 50,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    ...shadows.md,
  },
  createMainBtnText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
});

export default AddTaskScreen;
