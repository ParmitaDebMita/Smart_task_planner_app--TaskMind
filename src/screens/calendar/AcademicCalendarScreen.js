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
import Icon from '../../components/common/Icon';

const weekDays = [
  { day: 'Mon', date: 22 },
  { day: 'Tue', date: 23, isSelected: true },
  { day: 'Wed', date: 24 },
  { day: 'Thu', date: 25 },
  { day: 'Fri', date: 26 },
  { day: 'Sat', date: 27 },
  { day: 'Sun', date: 28 },
];

const categoryChips = [
  { id: 'all', label: 'All', color: colors.primaryCoral, bg: '#FFEFEB' },
  { id: 'assignment', label: 'Assignment', color: '#8B5CF6', bg: '#F5F3FF' },
  { id: 'exam', label: 'Exam', color: '#EF4444', bg: '#FEE2E2' },
  { id: 'study', label: 'Study', color: '#10B981', bg: '#ECFDF5' },
];

const dayEvents = [
  {
    id: 'e-1',
    title: 'Math Class',
    time: '09:00 AM - 10:30 AM',
    category: 'class',
    icon: 'school',
    iconColor: '#3B82F6',
    iconBg: '#EFF6FF',
  },
  {
    id: 'e-2',
    title: 'Physics Assignment',
    time: '11:00 AM - 01:00 PM',
    category: 'assignment',
    icon: 'edit_note',
    iconColor: '#8B5CF6',
    iconBg: '#F5F3FF',
  },
  {
    id: 'e-3',
    title: 'Study Session',
    time: '02:00 PM - 03:30 PM',
    category: 'study',
    icon: 'timer',
    iconColor: '#10B981',
    iconBg: '#ECFDF5',
  },
  {
    id: 'e-4',
    title: 'Chemistry Lab Report',
    time: '04:00 PM - 05:30 PM',
    category: 'assignment',
    icon: 'science',
    iconColor: '#F59E0B',
    iconBg: '#FEF3C7',
  },
];

export const AcademicCalendarScreen = () => {
  const { navigateTo, showToast } = useTaskContext();
  const [selectedDayDate, setSelectedDayDate] = useState(23);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredEvents = dayEvents.filter(e => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'assignment') return e.category === 'assignment';
    if (activeCategory === 'exam') return e.category === 'exam';
    if (activeCategory === 'study') return e.category === 'study' || e.category === 'class';
    return true;
  });

  return (
    <View style={styles.screenWrapper}>
      {/* Header Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigateTo('HomeDashboard')}
          activeOpacity={0.8}
        >
          <Icon name="arrow_back" size={22} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Calendar</Text>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => navigateTo('SearchFilters')}
          activeOpacity={0.8}
        >
          <Icon name="search" size={20} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Month Selector Bar */}
        <View style={styles.monthHeaderRow}>
          <Text style={styles.monthTitle}>September 2025</Text>
          <View style={styles.monthArrows}>
            <TouchableOpacity
              style={styles.arrowBtn}
              onPress={() => showToast('Previous month', 'info')}
            >
              <Icon name="chevron_left" size={20} color="#64748B" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.arrowBtn}
              onPress={() => showToast('Next month', 'info')}
            >
              <Icon name="chevron_right" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 7-Day Week Strip */}
        <View style={styles.weekStripContainer}>
          <View style={styles.weekGrid}>
            {weekDays.map((item) => {
              const isSelected = selectedDayDate === item.date;
              return (
                <TouchableOpacity
                  key={item.day}
                  style={styles.dayCol}
                  onPress={() => setSelectedDayDate(item.date)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.dayLabel, isSelected && styles.dayLabelActive]}>
                    {item.day}
                  </Text>
                  <View
                    style={[
                      styles.dateCircle,
                      isSelected && styles.dateCircleActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dateNumber,
                        isSelected && styles.dateNumberActive,
                      ]}
                    >
                      {item.date}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Filter Chips Row */}
        <View style={styles.chipsRow}>
          {categoryChips.map((chip) => {
            const isActive = activeCategory === chip.id;
            return (
              <TouchableOpacity
                key={chip.id}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: isActive ? chip.bg : '#FFFFFF',
                    borderColor: isActive ? chip.color : '#E8E4DC',
                  },
                ]}
                onPress={() => setActiveCategory(chip.id)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.chipDot,
                    { backgroundColor: chip.color },
                  ]}
                />
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: isActive ? chip.color : '#64748B',
                      fontWeight: isActive ? '700' : '500',
                    },
                  ]}
                >
                  {chip.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected Day Section Title */}
        <View style={styles.daySectionHeader}>
          <Text style={styles.daySectionTitle}>
            Today • Tue, {selectedDayDate} Sep
          </Text>
        </View>

        {/* Event Cards List */}
        <View style={styles.eventsList}>
          {filteredEvents.map((evt) => (
            <TouchableOpacity
              key={evt.id}
              style={styles.eventCard}
              onPress={() => showToast(`Opening ${evt.title}`, 'info')}
              activeOpacity={0.85}
            >
              <View style={[styles.eventIconCircle, { backgroundColor: evt.iconBg }]}>
                <Icon name={evt.icon} size={20} color={evt.iconColor} />
              </View>

              <View style={styles.eventInfoCol}>
                <Text style={styles.eventTitle}>{evt.title}</Text>
                <Text style={styles.eventTime}>{evt.time}</Text>
              </View>

              <Icon name="chevron_right" size={20} color="#CBD5E1" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button: + Add Event */}
      <TouchableOpacity
        style={styles.fabBtn}
        onPress={() => navigateTo('AddTask')}
        activeOpacity={0.88}
      >
        <Icon name="add" size={24} color="#FFFFFF" />
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
  searchBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: 110,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  monthHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  monthArrows: {
    flexDirection: 'row',
    gap: 4,
  },
  arrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E4DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekStripContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginBottom: spacing.md,
  },
  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCol: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  dayLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  dayLabelActive: {
    color: colors.primaryCoral,
    fontWeight: '700',
  },
  dateCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCircleActive: {
    backgroundColor: colors.primaryCoral,
  },
  dateNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  dateNumberActive: {
    color: '#FFFFFF',
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: spacing.md,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: rounded.full,
    borderWidth: 1.5,
    gap: 5,
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  chipText: {
    fontSize: 12,
  },
  daySectionHeader: {
    marginBottom: spacing.sm,
  },
  daySectionTitle: {
    ...typography.titleMd,
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  eventsList: {
    gap: 8,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 12,
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
  eventIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  eventInfoCol: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  fabBtn: {
    position: 'absolute',
    bottom: 76,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primaryCoral,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryCoral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    zIndex: 40,
  },
});

export default AcademicCalendarScreen;
