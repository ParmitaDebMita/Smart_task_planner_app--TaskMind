import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import CircularProgress from '../../components/common/CircularProgress';
import Icon from '../../components/common/Icon';

const soundscapes = [
  { id: 'lofi', label: 'Lo-Fi Beats', emoji: '🎧' },
  { id: 'rain', label: 'Soft Rain', emoji: '🌧️' },
  { id: 'cafe', label: 'Campus Cafe', emoji: '☕' },
  { id: 'library', label: 'Library Silence', emoji: '📚' },
];

export const FocusChamberScreen = () => {
  const {
    focusSession,
    toggleFocusTimer,
    setFocusPreset,
    setSoundscape,
    tasks,
    toggleTaskCompleted,
    goBack,
    showToast,
  } = useTaskContext();

  const activeTask = tasks.find(t => t.id === focusSession.activeTaskId) || tasks[0];

  const mins = Math.floor(focusSession.secondsLeft / 60);
  const secs = focusSession.secondsLeft % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const progressPercent = Math.round(
    ((focusSession.durationSeconds - focusSession.secondsLeft) / (focusSession.durationSeconds || 1)) * 100
  );

  return (
    <View style={styles.screenWrapper}>
      <Header title="TaskMind" subtitle="Focus Timer" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Session Header */}
        <View style={styles.topSessionHeader}>
          <View style={styles.sessionTitleLeft}>
            <TouchableOpacity style={styles.minimizeBtn} onPress={goBack}>
              <Icon name="close_fullscreen" size={18} color={colors.onSurface} />
            </TouchableOpacity>
            <View>
              <Text style={styles.chamberTitle}>Focus Chamber</Text>
              <View style={styles.liveIndicatorRow}>
                <View style={styles.livePulseDot} />
                <Text style={styles.liveIndicatorText}>
                  {focusSession.isRunning ? 'Focus Mode Live' : 'Focus Session Ready'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.pomodoroBadge}>
            <Icon name="local_fire_department" size={16} color={colors.primaryContainer} fill />
            <Text style={styles.pomodoroBadgeText}>
              {focusSession.lap} of {focusSession.totalLaps} pomodoros
            </Text>
          </View>
        </View>

        {/* Motivational Banner */}
        <View style={styles.motivationalBanner}>
          <View style={styles.motivationalLeft}>
            <View style={styles.sparkleBox}>
              <Icon name="auto_awesome" size={16} color={colors.primaryContainer} fill />
            </View>
            <Text style={styles.motivationalText}>You’re doing good! 👏 Stay in the flow, Alex.</Text>
          </View>
          <View style={styles.streakPill}>
            <Text style={styles.streakPillText}>Streak 4d</Text>
          </View>
        </View>

        {/* Current Active Task Card */}
        {activeTask && (
          <View style={styles.taskCard}>
            <View style={styles.taskCardHeader}>
              <View style={styles.taskTagRow}>
                <View style={styles.coursePill}>
                  <Text style={styles.coursePillText}>{activeTask.courseCode || 'CS301'}</Text>
                </View>
                <View style={styles.deadlineRow}>
                  <Icon name="event" size={13} color={colors.onSurfaceVariant} />
                  <Text style={styles.deadlineText}>{activeTask.dueDate}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.moreBtn}>
                <Icon name="more_horiz" size={18} color={colors.onSurfaceVariant} />
              </TouchableOpacity>
            </View>

            <View style={styles.taskCardBody}>
              <TouchableOpacity
                style={[
                  styles.taskCheckbox,
                  activeTask.isCompleted && styles.taskCheckboxChecked,
                ]}
                onPress={() => toggleTaskCompleted(activeTask.id)}
              >
                {activeTask.isCompleted && (
                  <Icon name="check" size={14} color={colors.onTertiary} />
                )}
              </TouchableOpacity>
              <View style={styles.taskTitles}>
                <Text style={styles.taskMainTitle}>{activeTask.title}</Text>
                <Text style={styles.taskSubtitle} numberOfLines={1}>
                  {activeTask.description}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Preset Selector Segmented Pills */}
        <View style={styles.presetsRow}>
          {[
            { id: '25/5', label: '25 / 5 Standard' },
            { id: '50/10', label: '50 / 10 Deep Focus' },
            { id: 'custom', label: 'Custom' },
          ].map(p => {
            const isSelected = focusSession.preset === p.id;
            return (
              <TouchableOpacity
                key={p.id}
                style={[styles.presetTab, isSelected && styles.presetTabActive]}
                onPress={() => setFocusPreset(p.id)}
              >
                <Text
                  style={[
                    styles.presetTabText,
                    isSelected && styles.presetTabTextActive,
                  ]}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Hero Circular Countdown Graphic */}
        <View style={styles.timerRingCard}>
          <View style={styles.glowTopRight} />
          <View style={styles.glowBottomLeft} />

          <CircularProgress
            size={220}
            strokeWidth={14}
            progress={progressPercent}
            color={colors.primaryContainer}
            trackColor={colors.surfaceContainerHighest}
          >
            <View style={styles.timerInner}>
              <View style={styles.sessionTypePill}>
                <Icon name="psychology" size={12} color={colors.primaryContainer} fill />
                <Text style={styles.sessionTypePillText}>Deep Work Session</Text>
              </View>
              <Text style={styles.countdownDigits}>{timeFormatted}</Text>
              <View style={styles.lapInfoRow}>
                <Icon name="check_circle" size={14} color={colors.tertiaryContainer} />
                <Text style={styles.lapInfoText}>
                  Lap {focusSession.lap} of {focusSession.totalLaps}
                </Text>
              </View>
            </View>
          </CircularProgress>

          {/* DND Notification subtext */}
          <View style={styles.dndBadge}>
            <Icon name="do_not_disturb_on" size={14} color={colors.onSurfaceVariant} />
            <Text style={styles.dndText}>Phone silenced • Gemini smart blocks active</Text>
          </View>
        </View>

        {/* Controls Section */}
        <View style={styles.controlsSection}>
          {/* Big Play / Pause Button */}
          <TouchableOpacity
            style={[
              styles.playPauseMainBtn,
              focusSession.isRunning && styles.pauseMainBtn,
            ]}
            onPress={toggleFocusTimer}
            activeOpacity={0.88}
          >
            <Icon
              name={focusSession.isRunning ? 'pause' : 'play_arrow'}
              size={22}
              color={colors.onPrimary}
              fill
            />
            <Text style={styles.playPauseText}>
              {focusSession.isRunning ? 'Pause Session' : 'Resume Focus'}
            </Text>
          </TouchableOpacity>

          {/* Secondary Action Grid */}
          <View style={styles.secondaryControlsRow}>
            <TouchableOpacity
              style={styles.controlSecondaryBtn}
              onPress={() => {
                showToast('Break started! 5 minutes rest interval', 'info');
              }}
            >
              <Icon name="skip_next" size={18} color={colors.onSurface} />
              <Text style={styles.controlSecondaryText}>Skip to Break</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlSecondaryBtn, styles.completeBtnHighlight]}
              onPress={() => {
                if (activeTask) toggleTaskCompleted(activeTask.id);
                showToast('Task marked as complete! 🎉', 'success');
              }}
            >
              <Text style={styles.completeBtnText}>Complete Task 🎉</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ambient Audio Soundscape Selector */}
        <View style={styles.audioCard}>
          <View style={styles.audioHeader}>
            <View style={styles.audioTitleRow}>
              <Icon name="equalizer" size={18} color={colors.primaryContainer} />
              <Text style={styles.audioTitle}>Ambient Focus Audio</Text>
            </View>
            <Text style={styles.volumeLabel}>Volume: {focusSession.volume}%</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.soundChipsScroll}>
            {soundscapes.map(s => {
              const isActive = focusSession.activeSoundscape === s.id;
              return (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.soundChip, isActive && styles.soundChipActive]}
                  onPress={() => setSoundscape(s.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.soundEmoji}>{s.emoji}</Text>
                  <Text style={[styles.soundLabel, isActive && styles.soundLabelActive]}>
                    {s.label}
                  </Text>
                  {isActive && <View style={styles.activeSoundPulse} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Study Buddy / Lounge Preview */}
        <View style={styles.buddyCard}>
          <View style={styles.buddyLeft}>
            <View style={styles.buddyIconCircle}>
              <Icon name="groups" size={20} color={colors.secondary} />
            </View>
            <View style={styles.buddyTextColumn}>
              <Text style={styles.buddyTitle}>Study Lounge Active</Text>
              <Text style={styles.buddySub}>4 classmates focusing quietly right now</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buddyExpandBtn}
            onPress={() => showToast('Opening virtual campus study lounge...', 'info')}
          >
            <Icon name="group" size={18} color={colors.onSurface} />
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
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.sm,
    paddingBottom: 96,
    gap: spacing.md,
  },
  topSessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sessionTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  minimizeBtn: {
    width: 38,
    height: 38,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chamberTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  liveIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: rounded.full,
    backgroundColor: colors.tertiaryContainer,
  },
  liveIndicatorText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  pomodoroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
  },
  pomodoroBadgeText: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  motivationalBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: rounded.lg,
    ...shadows.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
  },
  motivationalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  sparkleBox: {
    width: 28,
    height: 28,
    borderRadius: rounded.full,
    backgroundColor: 'rgba(79, 70, 229, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  motivationalText: {
    ...typography.bodySm,
    color: colors.onSurface,
    fontWeight: '600',
    flex: 1,
  },
  streakPill: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  streakPillText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  taskCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    ...shadows.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
    gap: spacing.sm,
  },
  taskCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  coursePill: {
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  coursePillText: {
    ...typography.labelSm,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  deadlineText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  moreBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskCardBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  taskCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  taskCheckboxChecked: {
    backgroundColor: colors.tertiaryContainer,
  },
  taskTitles: {
    flex: 1,
    gap: 2,
  },
  taskMainTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  taskSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  presetsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    padding: 3,
  },
  presetTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: rounded.md,
  },
  presetTabActive: {
    backgroundColor: colors.surfaceContainerLowest,
    ...shadows.xs,
  },
  presetTabText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  presetTabTextActive: {
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  timerRingCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
    position: 'relative',
    overflow: 'hidden',
  },
  glowTopRight: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: rounded.full,
    backgroundColor: 'rgba(226, 223, 255, 0.35)',
  },
  glowBottomLeft: {
    position: 'absolute',
    bottom: -40,
    left: -40,
    width: 140,
    height: 140,
    borderRadius: rounded.full,
    backgroundColor: 'rgba(233, 221, 255, 0.25)',
  },
  timerInner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  sessionTypePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
    marginBottom: 4,
  },
  sessionTypePillText: {
    ...typography.labelSm,
    color: colors.primaryContainer,
    fontWeight: '700',
    fontSize: 10,
  },
  countdownDigits: {
    ...typography.headlineXl,
    fontSize: 40,
    lineHeight: 46,
    color: colors.onSurface,
    fontWeight: '800',
  },
  lapInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  lapInfoText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  dndBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.full,
    marginTop: spacing.md,
  },
  dndText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  controlsSection: {
    gap: spacing.sm,
  },
  playPauseMainBtn: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    ...shadows.xs,
  },
  pauseMainBtn: {
    backgroundColor: colors.secondaryContainer,
  },
  playPauseText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  secondaryControlsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  controlSecondaryBtn: {
    flex: 1,
    height: 44,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.8)',
    ...shadows.xs,
  },
  controlSecondaryText: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  completeBtnHighlight: {
    backgroundColor: colors.surfaceContainerHigh,
    borderColor: 'transparent',
  },
  completeBtnText: {
    ...typography.labelMd,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  audioCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    ...shadows.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
    gap: spacing.sm,
  },
  audioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  audioTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  audioTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  volumeLabel: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  soundChipsScroll: {
    gap: spacing.xs,
    paddingVertical: 2,
  },
  soundChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: rounded.lg,
    backgroundColor: colors.surfaceContainerLow,
  },
  soundChipActive: {
    backgroundColor: colors.primary,
  },
  soundEmoji: {
    fontSize: 16,
  },
  soundLabel: {
    ...typography.labelMd,
    color: colors.onSurface,
  },
  soundLabelActive: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  activeSoundPulse: {
    width: 6,
    height: 6,
    borderRadius: rounded.full,
    backgroundColor: colors.onTertiaryContainer,
  },
  buddyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    padding: spacing.sm + 4,
  },
  buddyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  buddyIconCircle: {
    width: 36,
    height: 36,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buddyTextColumn: {
    flex: 1,
  },
  buddyTitle: {
    ...typography.labelLg,
    color: colors.onSurface,
    fontWeight: '700',
  },
  buddySub: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  buddyExpandBtn: {
    width: 32,
    height: 32,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.xs,
  },
});

export default FocusChamberScreen;
