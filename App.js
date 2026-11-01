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
import ProfileSetupScreen from './src/screens/auth/ProfileSetupScreen';
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
import ProgressDashboardScreen from './src/screens/analytics/ProgressDashboardScreen';

// Batch 3 Focus & Study Screens
import StudyDashboardScreen from './src/screens/focus/StudyDashboardScreen';
import PomodoroTimerScreen from './src/screens/focus/PomodoroTimerScreen';
import CustomFocusTimerScreen from './src/screens/focus/CustomFocusTimerScreen';
import StopwatchScreen from './src/screens/focus/StopwatchScreen';
import DeepStudyModeScreen from './src/screens/focus/DeepStudyModeScreen';
import FocusModeActivatedScreen from './src/screens/focus/FocusModeActivatedScreen';
import DoNotDisturbFocusScreen from './src/screens/focus/DoNotDisturbFocusScreen';
import PhoneDoNotDisturbScreen from './src/screens/focus/PhoneDoNotDisturbScreen';
import LaptopFocusModeScreen from './src/screens/focus/LaptopFocusModeScreen';
import FocusChamberScreen from './src/screens/focus/FocusChamberScreen';

// Extended & AI Feature Screens
import AITaskAssistantScreen from './src/screens/ai/AITaskAssistantScreen';
import AIRoutineGeneratorScreen from './src/screens/ai/AIRoutineGeneratorScreen';
import SmartReschedulerScreen from './src/screens/ai/SmartReschedulerScreen';
import DeadlineRiskAlertScreen from './src/screens/ai/DeadlineRiskAlertScreen';
import CatchUpModeScreen from './src/screens/ai/CatchUpModeScreen';
import EmergencyExamModeScreen from './src/screens/ai/EmergencyExamModeScreen';
import WhyAmIStuckScreen from './src/screens/ai/WhyAmIStuckScreen';

import SharedGroupTasksScreen from './src/screens/group/SharedGroupTasksScreen';
import NotificationsScreen from './src/screens/notifications/NotificationsScreen';
import SearchFiltersScreen from './src/screens/search/SearchFiltersScreen';
import AISmartSchedulingScreen from './src/screens/calendar/AISmartSchedulingScreen';
import GoogleCalendarSettingsScreen from './src/screens/calendar/GoogleCalendarSettingsScreen';
import GoogleOAuthScreen from './src/screens/calendar/GoogleOAuthScreen';
import VoiceTaskEntryScreen from './src/screens/voice/VoiceTaskEntryScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import SettingsScreen from './src/screens/settings/SettingsScreen';
import ConnectPortalScreen from './src/screens/main/ConnectPortalScreen';

// Batch 4 AI Companion, Motivation & Emotional States Screens
import DailyCheckinScreen from './src/screens/companion/DailyCheckinScreen';
import CareModeScreen from './src/screens/companion/CareModeScreen';
import DontFeelLikeStudyingScreen from './src/screens/companion/DontFeelLikeStudyingScreen';
import PushMeModeScreen from './src/screens/companion/PushMeModeScreen';
import ProcrastinationAngryScreen from './src/screens/companion/ProcrastinationAngryScreen';
import SupportiveRecoveryScreen from './src/screens/companion/SupportiveRecoveryScreen';
import PersonalizedMotivationScreen from './src/screens/companion/PersonalizedMotivationScreen';
import AICompanionChatScreen from './src/screens/companion/AICompanionChatScreen';
import NightlyReflectionScreen from './src/screens/companion/NightlyReflectionScreen';
import CelebrationScreen from './src/screens/companion/CelebrationScreen';

// Batch 5 Analytics, Goals, Gamification & Settings Screens
import ProductivityAnalyticsScreen from './src/screens/analytics/ProductivityAnalyticsScreen';
import SubjectProgressScreen from './src/screens/analytics/SubjectProgressScreen';
import GoalsScreen from './src/screens/analytics/GoalsScreen';
import GoalTodayMapScreen from './src/screens/analytics/GoalTodayMapScreen';
import XPLevelScreen from './src/screens/analytics/XPLevelScreen';
import AchievementsScreen from './src/screens/analytics/AchievementsScreen';
import StreakScreen from './src/screens/analytics/StreakScreen';
import MascotSelectionScreen from './src/screens/profile/MascotSelectionScreen';
import PersonalizationScreen from './src/screens/profile/PersonalizationScreen';

// Normalize any screen name variant to a canonical key
const SCREEN_ALIASES = {
  // Splash
  splash: 'Splash', Splash: 'Splash',
  // Onboarding
  onboarding: 'Onboarding', Onboarding: 'Onboarding',
  profilesetup: 'ProfileSetup', ProfileSetup: 'ProfileSetup', profileSetup: 'ProfileSetup',
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
  // Focus & Study (Batch 3)
  focus: 'StudyDashboard', Focus: 'StudyDashboard', studydashboard: 'StudyDashboard', StudyDashboard: 'StudyDashboard', study: 'StudyDashboard', Study: 'StudyDashboard', focuschamber: 'StudyDashboard', FocusChamber: 'StudyDashboard',
  pomodoro: 'PomodoroTimer', PomodoroTimer: 'PomodoroTimer', pomodorotimer: 'PomodoroTimer',
  customfocus: 'CustomFocusTimer', CustomFocusTimer: 'CustomFocusTimer', customfocustimer: 'CustomFocusTimer',
  stopwatch: 'Stopwatch', Stopwatch: 'Stopwatch',
  deepstudy: 'DeepStudyMode', DeepStudyMode: 'DeepStudyMode', deepstudymode: 'DeepStudyMode',
  focusmodeactivated: 'FocusModeActivated', FocusModeActivated: 'FocusModeActivated',
  donotdisturb: 'DoNotDisturbFocus', DoNotDisturbFocus: 'DoNotDisturbFocus', dnd: 'DoNotDisturbFocus',
  phonefocus: 'PhoneDoNotDisturb', PhoneDoNotDisturb: 'PhoneDoNotDisturb', phonednd: 'PhoneDoNotDisturb',
  laptopfocus: 'LaptopFocusMode', LaptopFocusMode: 'LaptopFocusMode', laptopfocusmode: 'LaptopFocusMode', desktopfocus: 'LaptopFocusMode',
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
  // AI Feature Screens (Batch 2)
  aitaskassistant: 'AITaskAssistant', AITaskAssistant: 'AITaskAssistant', aiTaskAssistant: 'AITaskAssistant', aiassistant: 'AITaskAssistant',
  airoutine: 'AIRoutine', AIRoutine: 'AIRoutine', aiRoutine: 'AIRoutine', airoutinegenerator: 'AIRoutine', AIRoutineGenerator: 'AIRoutine',
  smartrescheduler: 'SmartRescheduler', SmartRescheduler: 'SmartRescheduler', smartRescheduler: 'SmartRescheduler',
  deadlineriskalert: 'DeadlineRiskAlert', DeadlineRiskAlert: 'DeadlineRiskAlert', deadlineRiskAlert: 'DeadlineRiskAlert', deadlinerisk: 'DeadlineRiskAlert',
  catchupmode: 'CatchUpMode', CatchUpMode: 'CatchUpMode', catchUpMode: 'CatchUpMode', catchup: 'CatchUpMode',
  emergencyexammode: 'EmergencyExamMode', EmergencyExamMode: 'EmergencyExamMode', emergencyExamMode: 'EmergencyExamMode', emergencyexam: 'EmergencyExamMode',
  whyamistuck: 'WhyAmIStuck', WhyAmIStuck: 'WhyAmIStuck', whyAmIStuck: 'WhyAmIStuck', procrastination: 'WhyAmIStuck', stuck: 'WhyAmIStuck',
  // Connect Portal / PULMS
  connectportal: 'ConnectPortal', ConnectPortal: 'ConnectPortal', connectPortal: 'ConnectPortal',
  // Exam Tracker
  examtracker: 'EmergencyExamMode', ExamTracker: 'EmergencyExamMode', examTracker: 'EmergencyExamMode',
  // Batch 4 AI Companion & Motivation
  dailycheckin: 'DailyCheckin', DailyCheckin: 'DailyCheckin', checkin: 'DailyCheckin',
  caremode: 'CareMode', CareMode: 'CareMode', care: 'CareMode',
  dontfeellikestudying: 'DontFeelLikeStudying', DontFeelLikeStudying: 'DontFeelLikeStudying', dontfeel: 'DontFeelLikeStudying',
  pushmemode: 'PushMeMode', PushMeMode: 'PushMeMode', pushme: 'PushMeMode', push: 'PushMeMode',
  procrastinationangry: 'ProcrastinationAngry', ProcrastinationAngry: 'ProcrastinationAngry', procrastination_angry: 'ProcrastinationAngry', angry: 'ProcrastinationAngry',
  supportiverecovery: 'SupportiveRecovery', SupportiveRecovery: 'SupportiveRecovery', recovery: 'SupportiveRecovery',
  personalizedmotivation: 'PersonalizedMotivation', PersonalizedMotivation: 'PersonalizedMotivation', motivation: 'PersonalizedMotivation',
  aicompanionchat: 'AICompanionChat', AICompanionChat: 'AICompanionChat', companionchat: 'AICompanionChat', companion: 'AICompanionChat', chat: 'AICompanionChat',
  nightlyreflection: 'NightlyReflection', NightlyReflection: 'NightlyReflection', reflection: 'NightlyReflection',
  celebration: 'Celebration', Celebration: 'Celebration', celebrate: 'Celebration',
  // Batch 5 Analytics, Goals, Gamification & Settings
  productivityanalytics: 'ProductivityAnalytics', ProductivityAnalytics: 'ProductivityAnalytics', analytics: 'ProductivityAnalytics',
  subjectprogress: 'SubjectProgress', SubjectProgress: 'SubjectProgress', subjects: 'SubjectProgress',
  goals: 'Goals', Goals: 'Goals', goal: 'Goals',
  goaltodaymap: 'GoalTodayMap', GoalTodayMap: 'GoalTodayMap', goalmap: 'GoalTodayMap',
  xplevel: 'XPLevel', XPLevel: 'XPLevel', xp: 'XPLevel', level: 'XPLevel',
  achievements: 'Achievements', Achievements: 'Achievements', badges: 'Achievements',
  streak: 'Streak', Streak: 'Streak', streaks: 'Streak',
  mascotselection: 'MascotSelection', MascotSelection: 'MascotSelection', mascot: 'MascotSelection', mascots: 'MascotSelection',
  personalization: 'Personalization', Personalization: 'Personalization', customize: 'Personalization',
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
        StudyDashboard: 'Study Dashboard - TaskMind',
        PomodoroTimer: 'Pomodoro Timer - TaskMind',
        CustomFocusTimer: 'Custom Focus Timer - TaskMind',
        Stopwatch: 'Stopwatch - TaskMind',
        DeepStudyMode: 'Deep Study Mode - TaskMind',
        FocusModeActivated: 'Focus Mode Activated - TaskMind',
        DoNotDisturbFocus: 'Do Not Disturb Focus - TaskMind',
        PhoneDoNotDisturb: 'Phone Do Not Disturb - TaskMind',
        LaptopFocusMode: 'Laptop Focus Mode - TaskMind',
        FocusChamber: 'Study Dashboard - TaskMind',
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
        AITaskAssistant: 'AI Task Assistant - TaskMind',
        AIRoutine: 'AI Routine Generator - TaskMind',
        SmartRescheduler: 'Smart Rescheduler - TaskMind',
        DeadlineRiskAlert: 'Deadline Risk Alert - TaskMind',
        CatchUpMode: 'Catch-Up Mode - TaskMind',
        EmergencyExamMode: 'Emergency Exam Mode - TaskMind',
        WhyAmIStuck: 'Why Am I Stuck? - TaskMind',
        ConnectPortal: 'Connect Learning Portal - TaskMind',
        DailyCheckin: 'Daily Check-in - TaskMind',
        CareMode: 'Care Mode - TaskMind',
        DontFeelLikeStudying: "I Don't Feel Like Studying - TaskMind",
        PushMeMode: 'Push Me Mode - TaskMind',
        ProcrastinationAngry: 'Procrastination / Angry - TaskMind',
        SupportiveRecovery: 'Supportive Recovery - TaskMind',
        PersonalizedMotivation: 'Personalized Motivation - TaskMind',
        AICompanionChat: 'AI Companion Chat - TaskMind',
        NightlyReflection: 'Nightly Reflection - TaskMind',
        Celebration: 'Full-Screen Celebration - TaskMind',
        // Batch 5 Titles
        ProductivityAnalytics: 'Productivity Analytics - TaskMind',
        SubjectProgress: 'Subject Progress - TaskMind',
        Goals: 'Academic Goals - TaskMind',
        GoalTodayMap: 'Goal → Today Map - TaskMind',
        XPLevel: 'XP & Level - TaskMind',
        Achievements: 'Badges & Achievements - TaskMind',
        Streak: 'Study Streak - TaskMind',
        MascotSelection: 'Choose Your Mascot - TaskMind',
        Personalization: 'Personalization - TaskMind',
      };
      document.title = titles[canonical] || 'TaskMind Student Productivity App';
    }
  }, [canonical]);

  const renderActiveScreen = () => {
    switch (canonical) {
      case 'Splash':            return <SplashScreen />;
      case 'Onboarding':        return <OnboardingScreen />;
      case 'ProfileSetup':      return <ProfileSetupScreen />;
      case 'Login':             return <LoginScreen />;
      case 'SignUp':            return <SignUpScreen />;
      case 'ForgotPassword':    return <ForgotPasswordScreen />;
      case 'HomeDashboard':     return <HomeDashboardScreen />;
      case 'AddTask':           return <AddTaskScreen />;
      case 'TaskDetails':       return <TaskDetailsScreen />;
      case 'TodayTasks':        return <TodayTasksScreen />;
      case 'UpcomingTasks':     return <UpcomingTasksScreen />;
      case 'AcademicCalendar':  return <AcademicCalendarScreen />;
      case 'StudyDashboard':    return <StudyDashboardScreen />;
      case 'PomodoroTimer':     return <PomodoroTimerScreen />;
      case 'CustomFocusTimer':  return <CustomFocusTimerScreen />;
      case 'Stopwatch':         return <StopwatchScreen />;
      case 'DeepStudyMode':     return <DeepStudyModeScreen />;
      case 'FocusModeActivated': return <FocusModeActivatedScreen />;
      case 'DoNotDisturbFocus': return <DoNotDisturbFocusScreen />;
      case 'PhoneDoNotDisturb': return <PhoneDoNotDisturbScreen />;
      case 'LaptopFocusMode':   return <LaptopFocusModeScreen />;
      case 'FocusChamber':      return <StudyDashboardScreen />;
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
      case 'AITaskAssistant':   return <AITaskAssistantScreen />;
      case 'AIRoutine':         return <AIRoutineGeneratorScreen />;
      case 'SmartRescheduler':  return <SmartReschedulerScreen />;
      case 'DeadlineRiskAlert': return <DeadlineRiskAlertScreen />;
      case 'CatchUpMode':       return <CatchUpModeScreen />;
      case 'EmergencyExamMode': return <EmergencyExamModeScreen />;
      case 'WhyAmIStuck':       return <WhyAmIStuckScreen />;
      case 'ConnectPortal':     return <ConnectPortalScreen />;
      // Batch 4 Screens
      case 'DailyCheckin':          return <DailyCheckinScreen />;
      case 'CareMode':              return <CareModeScreen />;
      case 'DontFeelLikeStudying':  return <DontFeelLikeStudyingScreen />;
      case 'PushMeMode':            return <PushMeModeScreen />;
      case 'ProcrastinationAngry':  return <ProcrastinationAngryScreen />;
      case 'SupportiveRecovery':    return <SupportiveRecoveryScreen />;
      case 'PersonalizedMotivation': return <PersonalizedMotivationScreen />;
      case 'AICompanionChat':       return <AICompanionChatScreen />;
      case 'NightlyReflection':     return <NightlyReflectionScreen />;
      case 'Celebration':           return <CelebrationScreen />;
      // Batch 5 Screens
      case 'ProductivityAnalytics': return <ProductivityAnalyticsScreen />;
      case 'SubjectProgress':       return <SubjectProgressScreen />;
      case 'Goals':                 return <GoalsScreen />;
      case 'GoalTodayMap':          return <GoalTodayMapScreen />;
      case 'XPLevel':               return <XPLevelScreen />;
      case 'Achievements':          return <AchievementsScreen />;
      case 'Streak':                return <StreakScreen />;
      case 'MascotSelection':       return <MascotSelectionScreen />;
      case 'Personalization':       return <PersonalizationScreen />;
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
    backgroundColor: '#FFFDF9',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: '#FFFDF9',
    overflow: 'hidden',
  },
});
