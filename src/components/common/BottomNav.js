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
    if (tabName === 'Home' && (currentScreen === 'HomeDashboard' || currentScreen === 'TodayTasks' || currentScreen === 'UpcomingTasks')) return true;
    if (tabName === 'Calendar' && (currentScreen === 'AcademicCalendar' || currentScreen === 'GoogleCalendarSettings' || currentScreen === 'AISmartScheduling')) return true;
    if (tabName === 'Focus' && currentScreen === 'FocusChamber') return true;
    if (tabName === 'Progress' && currentScreen === 'ProgressDashboard') return true;
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
          <Icon
            name="home"
            size={22}
            color={isTabActive('Home') ? colors.primaryContainer : colors.onSurfaceVariant}
            fill={isTabActive('Home')}
          />
          <Text
            style={[
              styles.tabLabel,
              {
                color: isTabActive('Home') ? colors.primaryContainer : colors.onSurfaceVariant,
                fontWeight: isTabActive('Home') ? '700' : '500',
              },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* Tab 2: Calendar */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigateTo('AcademicCalendar')}
          activeOpacity={0.7}
        >
          <Icon
            name="calendar_today"
            size={22}
            color={isTabActive('Calendar') ? colors.primaryContainer : colors.onSurfaceVariant}
            fill={isTabActive('Calendar')}
          />
          <Text
            style={[
              styles.tabLabel,
              {
                color: isTabActive('Calendar') ? colors.primaryContainer : colors.onSurfaceVariant,
                fontWeight: isTabActive('Calendar') ? '700' : '500',
              },
            ]}
          >
            Calendar
          </Text>
        </TouchableOpacity>

        {/* Central Elevated FAB */}
        <TouchableOpacity
          style={styles.fabContainer}
          onPress={() => navigateTo('AddTask')}
          activeOpacity={0.85}
          accessibilityLabel="Quick Add Task"
        >
          <View style={styles.fabButton}>
            <Icon name="add" size={26} color={colors.onPrimary} />
          </View>
        </TouchableOpacity>

        {/* Tab 4: Focus Timer */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigateTo('FocusChamber')}
          activeOpacity={0.7}
        >
          <Icon
            name="schedule"
            size={22}
            color={isTabActive('Focus') ? colors.primaryContainer : colors.onSurfaceVariant}
            fill={isTabActive('Focus')}
          />
          <Text
            style={[
              styles.tabLabel,
              {
                color: isTabActive('Focus') ? colors.primaryContainer : colors.onSurfaceVariant,
                fontWeight: isTabActive('Focus') ? '700' : '500',
              },
            ]}
          >
            Focus
          </Text>
        </TouchableOpacity>

        {/* Tab 5: Progress Analytics */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigateTo('ProgressDashboard')}
          activeOpacity={0.7}
        >
          <Icon
            name="bar_chart"
            size={22}
            color={isTabActive('Progress') ? colors.primaryContainer : colors.onSurfaceVariant}
            fill={isTabActive('Progress')}
          />
          <Text
            style={[
              styles.tabLabel,
              {
                color: isTabActive('Progress') ? colors.primaryContainer : colors.onSurfaceVariant,
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
    height: 68,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    backdropFilter: 'blur(16px)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(23, 32, 51, 0.06)',
    ...Platform.select({
      web: {
        boxShadow: '0px -2px 12px rgba(23, 32, 51, 0.05)',
      },
      default: {
        shadowColor: '#172033',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 8,
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
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabLabel: {
    ...typography.labelSm,
    fontSize: 10,
    marginTop: 1,
  },
  fabContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -16,
  },
  fabButton: {
    width: 48,
    height: 48,
    borderRadius: rounded.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.fab,
  },
});

export default BottomNav;
