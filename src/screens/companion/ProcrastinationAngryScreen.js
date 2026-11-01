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
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import TaskMindMascot from '../../components/common/TaskMindMascot';
import Icon from '../../components/common/Icon';

const PROCRASTINATION_ITEMS = [
  { icon: 'bolt', title: 'Deep Work & Focus', subtitle: 'Start with just 15 minutes', color: '#EF4444', screen: 'PomodoroTimer' },
  { icon: 'science', title: 'Chemistry Chapters', subtitle: 'Chapter 4: Thermodynamics', color: '#3B82F6', screen: 'TaskDetails' },
  { icon: 'biotech', title: 'Biology Progress', subtitle: 'Cellular Respiration Review', color: '#10B981', screen: 'TodayTasks' },
  { icon: 'coffee', title: 'Earned Break', subtitle: '5 mins scheduled after first sprint', color: '#F59E0B', screen: 'PomodoroTimer' },
  { icon: 'calendar_month', title: 'Daily Plan Rescheduling', subtitle: 'Shift overdue items cleanly', color: '#8B5CF6', screen: 'SmartRescheduler' },
  { icon: 'checklist', title: 'Second Checklist', subtitle: '2 simple micro-tasks ready', color: '#EC4899', screen: 'TodayTasks' },
  { icon: 'school', title: 'Get into a top university', subtitle: 'Be fearless & take action now', color: '#06B6D4', screen: 'StudyDashboard' },
];

export const ProcrastinationAngryScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const handleKeepGoing = () => {
    showToast("We've delayed this enough. Let's start small! 🎯", 'info');
    navigateTo('PomodoroTimer');
  };

  const handleItemPress = (item) => {
    if (item.screen) {
      navigateTo(item.screen);
    }
  };

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigateTo('HomeDashboard')}
            activeOpacity={0.8}
          >
            <Icon name="arrow_back" size={22} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Procrastination / Angry</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Mascot - Playful Angry/Firm */}
        <View style={styles.mascotContainer}>
          <TaskMindMascot size={130} showBackground={true} variant="angry" />
        </View>

        {/* Top Warning Alert Card (Reference Match) */}
        <View style={styles.alertCard}>
          <View style={styles.alertIconBox}>
            <Icon name="local_fire_department" size={20} color="#EF4444" />
          </View>
          <View style={styles.alertTextCol}>
            <Text style={styles.alertTitle}>You've postponed this for too long.</Text>
            <Text style={styles.alertSubtitle}>Let's start now. No excuses!</Text>
          </View>
        </View>

        {/* Actionable Tasks & Sections List (Reference Match) */}
        <View style={styles.itemsList}>
          {PROCRASTINATION_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.itemRow}
              onPress={() => handleItemPress(item)}
              activeOpacity={0.8}
            >
              <View style={[styles.itemIconBox, { backgroundColor: `${item.color}15` }]}>
                <Icon name={item.icon} size={18} color={item.color} />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              </View>
              <Icon name="chevron_right" size={20} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Button: Keep Going */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleKeepGoing}
            activeOpacity={0.88}
          >
            <Text style={styles.actionBtnText}>Keep Going</Text>
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
    backgroundColor: '#FAF8F5',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: spacing.md,
    paddingBottom: 120,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
    ...Platform.select({
      web: { boxSizing: 'border-box' },
    }),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.headlineMd,
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  mascotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xs,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FECACA',
    borderRadius: rounded.xl,
    padding: 14,
    gap: 12,
    marginBottom: spacing.md,
  },
  alertIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTextCol: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#991B1B',
  },
  alertSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B91C1C',
    marginTop: 2,
  },
  itemsList: {
    gap: 10,
    marginBottom: spacing.lg,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    gap: 12,
    ...Platform.select({
      web: { boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.02)' },
      default: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.02, shadowRadius: 4, elevation: 1 },
    }),
  },
  itemIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTextCol: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  actionWrapper: {
    marginTop: spacing.xs,
  },
  actionBtn: {
    width: '100%',
    height: 52,
    backgroundColor: colors.primaryCoral,
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: '0px 4px 14px rgba(255, 91, 55, 0.35)' },
      default: {
        shadowColor: colors.primaryCoral,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 4,
      },
    }),
  },
  actionBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProcrastinationAngryScreen;
