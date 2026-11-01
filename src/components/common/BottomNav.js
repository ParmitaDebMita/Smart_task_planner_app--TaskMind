import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Icon from './Icon';

export const BottomNav = () => {
  const { currentScreen, navigateTo } = useTaskContext();

  const isTabActive = (tabName) => {
    if (tabName === 'Home' && currentScreen === 'HomeDashboard') return true;
    if (tabName === 'Tasks' && (currentScreen === 'TodayTasks' || currentScreen === 'UpcomingTasks' || currentScreen === 'AddTask' || currentScreen === 'TaskDetails')) return true;
    if (tabName === 'Calendar' && (currentScreen === 'AcademicCalendar' || currentScreen === 'GoogleCalendarSettings' || currentScreen === 'AISmartScheduling')) return true;
    if (tabName === 'Study' && (currentScreen === 'StudyDashboard' || currentScreen === 'FocusChamber' || currentScreen === 'PomodoroTimer' || currentScreen === 'CustomFocusTimer' || currentScreen === 'Stopwatch' || currentScreen === 'DeepStudyMode' || currentScreen === 'FocusModeActivated' || currentScreen === 'DoNotDisturbFocus' || currentScreen === 'PhoneDoNotDisturb' || currentScreen === 'LaptopFocusMode')) return true;
    if (tabName === 'Progress' && ['ProgressDashboard', 'ProductivityAnalytics', 'SubjectProgress', 'Goals', 'GoalTodayMap', 'XPLevel', 'Achievements', 'Streak'].includes(currentScreen)) return true;
    return false;
  };

  return (
    <View style={styles.container}>
      <View style={styles.navRow}>
        {/* Tab 1: Home */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigateTo('HomeDashboard')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrapper, isTabActive('Home') && styles.iconWrapperActive]}>
            <Icon
              name="home"
              size={22}
              color={isTabActive('Home') ? colors.primaryCoral : colors.onSurfaceVariant}
              fill={isTabActive('Home')}
            />
          </View>
          <Text
            style={[
              styles.tabLabel,
              {
                color: isTabActive('Home') ? colors.primaryCoral : colors.onSurfaceVariant,
                fontWeight: isTabActive('Home') ? '700' : '500',
              },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* Tab 2: Tasks */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigateTo('TodayTasks')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrapper, isTabActive('Tasks') && styles.iconWrapperActive]}>
            <Icon
              name="check_box"
              size={22}
              color={isTabActive('Tasks') ? colors.primaryCoral : colors.onSurfaceVariant}
              fill={isTabActive('Tasks')}
            />
          </View>
          <Text
            style={[
              styles.tabLabel,
              {
                color: isTabActive('Tasks') ? colors.primaryCoral : colors.onSurfaceVariant,
                fontWeight: isTabActive('Tasks') ? '700' : '500',
              },
            ]}
          >
            Tasks
          </Text>
        </TouchableOpacity>

        {/* Tab 3: Calendar */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigateTo('AcademicCalendar')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrapper, isTabActive('Calendar') && styles.iconWrapperActive]}>
            <Icon
              name="calendar_today"
              size={22}
              color={isTabActive('Calendar') ? colors.primaryCoral : colors.onSurfaceVariant}
              fill={isTabActive('Calendar')}
            />
          </View>
          <Text
            style={[
              styles.tabLabel,
              {
                color: isTabActive('Calendar') ? colors.primaryCoral : colors.onSurfaceVariant,
                fontWeight: isTabActive('Calendar') ? '700' : '500',
              },
            ]}
          >
            Calendar
          </Text>
        </TouchableOpacity>

        {/* Tab 4: Study */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigateTo('StudyDashboard')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrapper, isTabActive('Study') && styles.iconWrapperActive]}>
            <Icon
              name="timer"
              size={22}
              color={isTabActive('Study') ? colors.primaryCoral : colors.onSurfaceVariant}
              fill={isTabActive('Study')}
            />
          </View>
          <Text
            style={[
              styles.tabLabel,
              {
                color: isTabActive('Study') ? colors.primaryCoral : colors.onSurfaceVariant,
                fontWeight: isTabActive('Study') ? '700' : '500',
              },
            ]}
          >
            Study
          </Text>
        </TouchableOpacity>

        {/* Tab 5: Progress */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigateTo('ProgressDashboard')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrapper, isTabActive('Progress') && styles.iconWrapperActive]}>
            <Icon
              name="bar_chart"
              size={22}
              color={isTabActive('Progress') ? colors.primaryCoral : colors.onSurfaceVariant}
              fill={isTabActive('Progress')}
            />
          </View>
          <Text
            style={[
              styles.tabLabel,
              {
                color: isTabActive('Progress') ? colors.primaryCoral : colors.onSurfaceVariant,
                fontWeight: isTabActive('Progress') ? '700' : '500',
              },
            ]}
          >
            Progress
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1EFEA',
    ...Platform.select({
      web: {
        boxShadow: '0px -4px 16px rgba(30, 41, 59, 0.04)',
      },
      default: {
        shadowColor: '#1E293B',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 4,
      },
    }),
    zIndex: 50,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    paddingHorizontal: spacing.sm,
  },
  tabItem: {
    flex: 1,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  iconWrapper: {
    padding: 2,
  },
  iconWrapperActive: {
    transform: [{ scale: 1.05 }],
  },
  tabLabel: {
    ...typography.labelSm,
    fontSize: 10,
    marginTop: 1,
  },
});

export default BottomNav;
