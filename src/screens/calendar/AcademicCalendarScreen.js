import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

const daysOfWeek = [
  { day: 'M', date: 21, dotColor: colors.surfaceContainerHighest },
  { day: 'T', date: 22, dotColor: colors.secondary },
  { day: 'W', date: 23, dotColor: colors.onTertiaryContainer, isToday: true },
  { day: 'T', date: 24, dotColor: colors.errorCoral },
  { day: 'F', date: 25, dotColor: colors.tertiary },
  { day: 'S', date: 26, dotColor: 'transparent' },
  { day: 'S', date: 27, dotColor: 'transparent' },
];

const filterCategories = ['All Tasks', 'Assignments', 'Exams', 'Labs', 'Classes'];

export const AcademicCalendarScreen = () => {
  const {
    calendarEvents,
    calendarViewMode,
    setCalendarViewMode,
    selectedDateIndex,
    setSelectedDateIndex,
    triggerGCalSync,
    gcalState,
    navigateTo,
  } = useTaskContext();

  const [activeFilter, setActiveFilter] = useState('All Tasks');

  return (
    <View style={styles.screenWrapper}>
      <Header title="TaskMind" subtitle="Calendar" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* View Switcher Tabs (Day / Week / Month) */}
        <View style={styles.viewTabsRow}>
          {['day', 'week', 'month'].map(mode => {
            const isSelected = calendarViewMode === mode;
            return (
              <TouchableOpacity
                key={mode}
                style={[styles.viewTab, isSelected && styles.viewTabActive]}
                onPress={() => setCalendarViewMode(mode)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.viewTabText,
                    isSelected && styles.viewTabTextActive,
                  ]}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Weekly Date Strip */}
        <View style={styles.dateStripCard}>
          <View style={styles.dateStripHeader}>
            <View style={styles.monthTagRow}>
              <Text style={styles.monthTitle}>October 2024</Text>
              <View style={styles.weekPill}>
                <Text style={styles.weekPillText}>Week 8</Text>
              </View>
            </View>
            <View style={styles.navArrowsRow}>
              <TouchableOpacity style={styles.arrowBtn}>
                <Icon name="chevron_left" size={18} color={colors.onSurfaceVariant} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.arrowBtn}>
                <Icon name="chevron_right" size={18} color={colors.onSurfaceVariant} />
              </TouchableOpacity>
            </View>
          </View>

          {/* 7-Day Grid */}
          <View style={styles.daysGrid}>
            {daysOfWeek.map((d, index) => {
              const isSelected = selectedDateIndex === index;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayCol,
                    isSelected && styles.dayColSelected,
                  ]}
                  onPress={() => setSelectedDateIndex(index)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.dayLetter,
                      isSelected && styles.dayLetterSelected,
                    ]}
                  >
                    {d.day}
                  </Text>
                  <Text
                    style={[
                      styles.dayDate,
                      isSelected && styles.dayDateSelected,
                    ]}
                  >
                    {d.date}
                  </Text>
                  <View
                    style={[
                      styles.dayDot,
                      { backgroundColor: isSelected ? colors.onTertiaryContainer : d.dotColor },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          {filterCategories.map(cat => {
            const isSelected = activeFilter === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.filterChip, isSelected && styles.filterChipActive]}
                onPress={() => setActiveFilter(cat)}
              >
                <Text style={[styles.filterChipText, isSelected && styles.filterChipTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Urgent Milestones Ticker */}
        <View style={styles.urgentTicker}>
          <View style={styles.tickerHeader}>
            <View style={styles.tickerTitleRow}>
              <Icon name="timer" size={18} color={colors.errorCoral} fill />
              <Text style={styles.tickerTitle}>Urgent Course Milestones</Text>
            </View>
            <Text style={styles.tickerPending}>2 pending</Text>
          </View>

          <View style={styles.tickerList}>
            <View style={styles.tickerItem}>
              <View style={styles.tickerLeft}>
                <View style={[styles.smallDot, { backgroundColor: colors.errorCoral }]} />
                <Text style={styles.tickerText}>Tomorrow: DBMS Assignment</Text>
              </View>
              <Text style={[styles.tickerTime, { color: colors.errorCoral }]}>11:59 PM</Text>
            </View>

            <View style={styles.tickerItem}>
              <View style={styles.tickerLeft}>
                <View style={[styles.smallDot, { backgroundColor: colors.secondaryContainer }]} />
                <Text style={styles.tickerText}>Friday: IoT Practical Submission</Text>
              </View>
              <Text style={styles.tickerTime}>5:00 PM</Text>
            </View>
          </View>
        </View>

        {/* Timeline Header */}
        <View style={styles.timelineHeader}>
          <View style={styles.timelineHeaderLeft}>
            <Text style={styles.timelineTitle}>Wednesday, Oct 23</Text>
            <View style={styles.eventsCountPill}>
              <Text style={styles.eventsCountText}>5 Events</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.gcalConflictLink}
            onPress={() => navigateTo('AISmartScheduling')}
          >
            <Icon name="auto_awesome" size={14} color={colors.primaryContainer} />
            <Text style={styles.gcalConflictText}>AI Conflicts</Text>
          </TouchableOpacity>
        </View>

        {/* Visual Timeline Stack */}
        <View style={styles.timelineContainer}>
          {calendarEvents.map((evt, idx) => {
            if (evt.isBreak) {
              return (
                <View key={evt.id} style={styles.breakRow}>
                  <View style={styles.breakLine} />
                  <Icon name="restaurant" size={14} color={colors.onSurfaceVariant} />
                  <Text style={styles.breakText}>{evt.title} ({evt.duration})</Text>
                </View>
              );
            }

            const isAIBooked = evt.isAIBooked;
            return (
              <View key={evt.id} style={styles.timelineRow}>
                {/* Left Time Column */}
                <View style={styles.timeCol}>
                  <Text style={[styles.timeDigit, isAIBooked && { color: colors.primaryContainer, fontWeight: '700' }]}>
                    {evt.time.split(' ')[0]}
                  </Text>
                  <Text style={styles.timeAmpm}>{evt.time.split(' ')[1]}</Text>
                </View>

                {/* Event Card */}
                <View
                  style={[
                    styles.eventCard,
                    isAIBooked ? styles.eventCardAIBooked : styles.eventCardRegular,
                  ]}
                >
                  <View style={styles.eventCardHeader}>
                    <View style={styles.eventHeaderTags}>
                      <View
                        style={[
                          styles.eventTypePill,
                          isAIBooked && { backgroundColor: colors.primaryContainer },
                        ]}
                      >
                        {isAIBooked && (
                          <Icon name="auto_awesome" size={12} color={colors.onPrimary} fill style={{ marginRight: 2 }} />
                        )}
                        <Text
                          style={[
                            styles.eventTypeText,
                            isAIBooked && { color: colors.onPrimary, fontWeight: '700' },
                          ]}
                        >
                          {evt.type}
                        </Text>
                      </View>
                      {evt.location && (
                        <Text style={styles.eventLocation}>{evt.location}</Text>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.eventDuration,
                        isAIBooked && { color: colors.primaryContainer, fontWeight: '700' },
                      ]}
                    >
                      {evt.duration}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.eventTitle,
                      isAIBooked && { color: colors.onPrimaryFixed, fontWeight: '700' },
                    ]}
                  >
                    {evt.title}
                  </Text>
                  <Text style={styles.eventDesc}>{evt.description}</Text>

                  {isAIBooked && (
                    <TouchableOpacity
                      style={styles.startFocusEventBtn}
                      onPress={() => navigateTo('FocusChamber', { taskId: 'task-1' })}
                    >
                      <Text style={styles.startFocusEventBtnText}>Start Focus Block</Text>
                      <Icon name="play_arrow" size={16} color={colors.onPrimary} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Google Calendar & Canvas Sync Card */}
        <View style={styles.gcalSyncCard}>
          <View style={styles.gcalLeft}>
            <View style={styles.gcalIconBox}>
              <Icon name="sync" size={22} color={colors.primaryContainer} />
            </View>
            <View style={styles.gcalInfo}>
              <Text style={styles.gcalTitle}>Calendar Integration</Text>
              <Text style={styles.gcalSub}>Synced with Google Calendar & Canvas LMS</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.syncNowBtn}
            onPress={triggerGCalSync}
            activeOpacity={0.85}
          >
            <Icon
              name={gcalState.syncHealth === 'syncing' ? 'sync' : 'cloud_sync'}
              size={18}
              color={colors.primaryContainer}
            />
            <Text style={styles.syncNowText}>
              {gcalState.syncHealth === 'syncing' ? 'Syncing...' : 'Sync Now'}
            </Text>
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
  viewTabsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    padding: 3,
  },
  viewTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: rounded.md,
  },
  viewTabActive: {
    backgroundColor: colors.surfaceContainerLowest,
    ...shadows.xs,
  },
  viewTabText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  viewTabTextActive: {
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  dateStripCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.sm + 4,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
  },
  dateStripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  monthTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  monthTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  weekPill: {
    backgroundColor: colors.primaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  weekPillText: {
    ...typography.labelSm,
    color: colors.onPrimaryFixed,
    fontWeight: '600',
  },
  navArrowsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  arrowBtn: {
    width: 28,
    height: 28,
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  dayCol: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: rounded.lg,
  },
  dayColSelected: {
    backgroundColor: colors.primaryContainer,
    ...shadows.xs,
  },
  dayLetter: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  dayLetterSelected: {
    color: colors.onPrimaryContainer,
  },
  dayDate: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '700',
    marginTop: 2,
  },
  dayDateSelected: {
    color: colors.onPrimary,
  },
  dayDot: {
    width: 5,
    height: 5,
    borderRadius: rounded.full,
    marginTop: 4,
  },
  filtersScroll: {
    gap: spacing.xs,
    paddingVertical: 2,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLowest,
    ...shadows.xs,
  },
  filterChipActive: {
    backgroundColor: colors.primaryContainer,
  },
  filterChipText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  filterChipTextActive: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  urgentTicker: {
    backgroundColor: 'rgba(217, 226, 252, 0.6)',
    borderRadius: rounded.xl,
    padding: spacing.md,
    gap: spacing.sm,
  },
  tickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tickerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tickerTitle: {
    ...typography.labelLg,
    color: colors.onSurface,
    fontWeight: '700',
  },
  tickerPending: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  tickerList: {
    gap: 6,
  },
  tickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: rounded.md,
    ...shadows.xs,
  },
  tickerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  smallDot: {
    width: 6,
    height: 6,
    borderRadius: rounded.full,
  },
  tickerText: {
    ...typography.labelMd,
    color: colors.onSurface,
    flex: 1,
  },
  tickerTime: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    fontWeight: '700',
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  timelineHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  timelineTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  eventsCountPill: {
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  eventsCountText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  gcalConflictLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gcalConflictText: {
    ...typography.labelSm,
    color: colors.primaryContainer,
    fontWeight: '600',
  },
  timelineContainer: {
    gap: spacing.sm,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  timeCol: {
    width: 44,
    alignItems: 'flex-end',
    paddingTop: 4,
  },
  timeDigit: {
    ...typography.labelSm,
    color: colors.onSurface,
    fontWeight: '600',
  },
  timeAmpm: {
    fontSize: 9,
    color: colors.onSurfaceVariant,
  },
  eventCard: {
    flex: 1,
    borderRadius: rounded.lg,
    padding: spacing.sm + 4,
    ...shadows.xs,
    gap: 4,
  },
  eventCardRegular: {
    backgroundColor: colors.surfaceContainer,
  },
  eventCardAIBooked: {
    backgroundColor: colors.primaryFixed,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.2)',
  },
  eventCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventHeaderTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventTypePill: {
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventTypeText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  eventLocation: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  eventDuration: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  eventTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  eventDesc: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  startFocusEventBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  startFocusEventBtnText: {
    ...typography.labelSm,
    color: colors.onPrimary,
    fontWeight: '600',
  },
  breakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 52,
    opacity: 0.7,
  },
  breakLine: {
    width: 16,
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
  breakText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  gcalSyncCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    ...shadows.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
  },
  gcalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  gcalIconBox: {
    width: 40,
    height: 40,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gcalInfo: {
    flex: 1,
  },
  gcalTitle: {
    ...typography.labelLg,
    color: colors.onSurface,
    fontWeight: '700',
  },
  gcalSub: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    fontSize: 11,
  },
  syncNowBtn: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: rounded.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  syncNowText: {
    ...typography.labelMd,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
});

export default AcademicCalendarScreen;
