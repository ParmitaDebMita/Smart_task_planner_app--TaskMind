import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Platform,
} from 'react-native';
import { TaskProvider, useTaskContext } from './src/context/TaskContext';
import Toast from './src/components/common/Toast';
import ErrorBoundary from './src/components/common/ErrorBoundary';

// Auth Screens
import SplashScreen from './src/screens/auth/SplashScreen';
import OnboardingScreen from './src/screens/auth/OnboardingScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen';

// Core Screens
import HomeDashboardScreen from './src/screens/main/HomeDashboardScreen';
import AddTaskScreen from './src/screens/tasks/AddTaskScreen';
import TaskDetailsScreen from './src/screens/tasks/TaskDetailsScreen';
import TodayTasksScreen from './src/screens/tasks/TodayTasksScreen';
import UpcomingTasksScreen from './src/screens/tasks/UpcomingTasksScreen';
import AcademicCalendarScreen from './src/screens/calendar/AcademicCalendarScreen';
import FocusChamberScreen from './src/screens/focus/FocusChamberScreen';
import ProgressDashboardScreen from './src/screens/analytics/ProgressDashboardScreen';

// Extended & AI Feature Screens
import SharedGroupTasksScreen from './src/screens/group/SharedGroupTasksScreen';
import NotificationsScreen from './src/screens/notifications/NotificationsScreen';
import SearchFiltersScreen from './src/screens/search/SearchFiltersScreen';
import AISmartSchedulingScreen from './src/screens/calendar/AISmartSchedulingScreen';
import GoogleCalendarSettingsScreen from './src/screens/calendar/GoogleCalendarSettingsScreen';
import GoogleOAuthScreen from './src/screens/calendar/GoogleOAuthScreen';
import VoiceTaskEntryScreen from './src/screens/voice/VoiceTaskEntryScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import SettingsScreen from './src/screens/settings/SettingsScreen';

// New Feature Screens
import AIRoutineScreen from './src/screens/main/AIRoutineScreen';
import ConnectPortalScreen from './src/screens/main/ConnectPortalScreen';
import ExamTrackerScreen from './src/screens/tasks/ExamTrackerScreen';

// Normalize any screen name variant to a canonical key
const SCREEN_ALIASES = {
  // Splash
  splash: 'Splash', Splash: 'Splash',
  // Onboarding
  onboarding: 'Onboarding', Onboarding: 'Onboarding',
  // Auth
  login: 'Login', Login: 'Login',
  signup: 'SignUp', SignUp: 'SignUp', signUp: 'SignUp',
  forgotpassword: 'ForgotPassword', ForgotPassword: 'ForgotPassword', forgotPassword: 'ForgotPassword',
  // Home
  home: 'HomeDashboard', HomeDashboard: 'HomeDashboard', homedashboard: 'HomeDashboard',
  // Tasks
  addtask: 'AddTask', AddTask: 'AddTask', addTask: 'AddTask',
  taskdetails: 'TaskDetails', TaskDetails: 'TaskDetails', taskDetails: 'TaskDetails',
  today: 'TodayTasks', TodayTasks: 'TodayTasks', todaytasks: 'TodayTasks',
  upcoming: 'UpcomingTasks', UpcomingTasks: 'UpcomingTasks', upcomingTasks: 'UpcomingTasks',
  // Calendar
  calendar: 'AcademicCalendar', AcademicCalendar: 'AcademicCalendar', academiccalendar: 'AcademicCalendar',
  aismartscheduling: 'AISmartScheduling', AISmartScheduling: 'AISmartScheduling', aiSmartScheduling: 'AISmartScheduling',
  calendarsettings: 'GoogleCalendarSettings', GoogleCalendarSettings: 'GoogleCalendarSettings', calendarSettings: 'GoogleCalendarSettings',
  googleoauth: 'GoogleOAuth', GoogleOAuth: 'GoogleOAuth', googleOAuth: 'GoogleOAuth',
  // Focus
  focus: 'FocusChamber', FocusChamber: 'FocusChamber', focuschamber: 'FocusChamber',
  // Analytics
  progress: 'ProgressDashboard', ProgressDashboard: 'ProgressDashboard', progressdashboard: 'ProgressDashboard',
  // Group
  group: 'SharedGroupTasks', SharedGroupTasks: 'SharedGroupTasks', sharedgrouptasks: 'SharedGroupTasks',
  // Notifications
  notifications: 'Notifications', Notifications: 'Notifications',
  // Search
  search: 'SearchFilters', SearchFilters: 'SearchFilters', searchfilters: 'SearchFilters',
  // Voice
  voice: 'VoiceTaskEntry', VoiceTaskEntry: 'VoiceTaskEntry', voiceTaskEntry: 'VoiceTaskEntry',
  // Profile
  profile: 'Profile', Profile: 'Profile',
  // Settings
  settings: 'Settings', Settings: 'Settings',
  // AI Routine Generator
  airoutine: 'AIRoutine', AIRoutine: 'AIRoutine', aiRoutine: 'AIRoutine',
  // Connect Portal / PULMS
  connectportal: 'ConnectPortal', ConnectPortal: 'ConnectPortal', connectPortal: 'ConnectPortal',
  // Exam Tracker
  examtracker: 'ExamTracker', ExamTracker: 'ExamTracker', examTracker: 'ExamTracker',
};

function resolveScreen(name) {
  if (!name) return 'HomeDashboard';
  return SCREEN_ALIASES[name] || SCREEN_ALIASES[name.toLowerCase()] || 'HomeDashboard';
}

function AppNavigationContainer() {
  const { currentScreen, navigateTo } = useTaskContext();
  const canonical = resolveScreen(currentScreen);

  // Dynamic Google Fonts & Web Title
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      if (!document.getElementById('taskmind-fonts')) {
        const link = document.createElement('link');
        link.id = 'taskmind-fonts';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap';
        document.head.appendChild(link);
      }

      const titles = {
        Splash: 'TaskMind - Student Productivity Suite',
        Onboarding: 'Welcome to TaskMind',
        Login: 'Login - TaskMind',
        SignUp: 'Create Account - TaskMind',
        ForgotPassword: 'Reset Password - TaskMind',
        HomeDashboard: 'TaskMind - Academic Dashboard',
        AddTask: 'Add Academic Task - TaskMind',
        TaskDetails: 'Task Details - TaskMind',
        TodayTasks: "Today's Schedule - TaskMind",
        UpcomingTasks: 'Upcoming Deadlines - TaskMind',
        AcademicCalendar: 'Academic Calendar - TaskMind',
        FocusChamber: 'Focus Chamber & Pomodoro - TaskMind',
        ProgressDashboard: 'Productivity Insights - TaskMind',
        SharedGroupTasks: 'Shared Group Sprints - TaskMind',
        Notifications: 'Notifications & Reminders - TaskMind',
        SearchFilters: 'Search & Filters - TaskMind',
        AISmartScheduling: 'AI Smart Scheduling - TaskMind',
        GoogleCalendarSettings: 'Google Calendar Sync - TaskMind',
        GoogleOAuth: 'Google Authorization - TaskMind',
        VoiceTaskEntry: 'Voice Task Entry - TaskMind',
        Profile: 'Student Profile - TaskMind',
        Settings: 'Settings & Preferences - TaskMind',
        AIRoutine: 'AI Routine Generator - TaskMind',
        ConnectPortal: 'Connect Learning Portal - TaskMind',
        ExamTracker: 'Exam & Assignment Tracker - TaskMind',
      };
      document.title = titles[canonical] || 'TaskMind Student Productivity App';
    }
  }, [canonical]);

  const renderActiveScreen = () => {
    switch (canonical) {
      case 'Splash':            return <SplashScreen />;
      case 'Onboarding':        return <OnboardingScreen />;
      case 'Login':             return <LoginScreen />;
      case 'SignUp':            return <SignUpScreen />;
      case 'ForgotPassword':    return <ForgotPasswordScreen />;
      case 'HomeDashboard':     return <HomeDashboardScreen />;
      case 'AddTask':           return <AddTaskScreen />;
      case 'TaskDetails':       return <TaskDetailsScreen />;
      case 'TodayTasks':        return <TodayTasksScreen />;
      case 'UpcomingTasks':     return <UpcomingTasksScreen />;
      case 'AcademicCalendar':  return <AcademicCalendarScreen />;
      case 'FocusChamber':      return <FocusChamberScreen />;
      case 'ProgressDashboard': return <ProgressDashboardScreen />;
      case 'SharedGroupTasks':  return <SharedGroupTasksScreen />;
      case 'Notifications':     return <NotificationsScreen />;
      case 'SearchFilters':     return <SearchFiltersScreen />;
      case 'AISmartScheduling': return <AISmartSchedulingScreen />;
      case 'GoogleCalendarSettings': return <GoogleCalendarSettingsScreen />;
      case 'GoogleOAuth':       return <GoogleOAuthScreen />;
      case 'VoiceTaskEntry':    return <VoiceTaskEntryScreen />;
      case 'Profile':           return <ProfileScreen />;
      case 'Settings':          return <SettingsScreen />;
      case 'AIRoutine':         return <AIRoutineScreen />;
      case 'ConnectPortal':     return <ConnectPortalScreen />;
      case 'ExamTracker':       return <ExamTrackerScreen />;
      default:                  return <HomeDashboardScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.rootSafeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.appContainer}>
        <ErrorBoundary key={canonical} onReset={() => navigateTo('HomeDashboard')}>
          {renderActiveScreen()}
        </ErrorBoundary>
      </View>
      <Toast />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <AppNavigationContainer />
    </TaskProvider>
  );
}

const styles = StyleSheet.create({
  rootSafeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },
});
