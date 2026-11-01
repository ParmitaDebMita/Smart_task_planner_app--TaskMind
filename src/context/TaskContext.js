import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialUser,
  initialTasks,
  initialExams,
  initialCalendarEvents,
  initialGroupProject,
  initialNotifications,
  weeklyStudyStats,
} from '../data/mockData';

const TaskContext = createContext();

const getInitialScreen = () => {
  if (typeof window !== 'undefined' && window.location) {
    if (window.location.hash) {
      const h = window.location.hash.replace('#', '').trim();
      if (h) return h;
    }
    try {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('screen');
      if (s) return s;
    } catch (e) {}
  }
  return 'Splash';
};

export const TaskProvider = ({ children }) => {
  // Navigation & View State — screen keys use PascalCase matching App.js switch cases
  const [currentScreen, setCurrentScreen] = useState(getInitialScreen);
  const [navigationHistory, setNavigationHistory] = useState([getInitialScreen()]);
  const [selectedTaskId, setSelectedTaskId] = useState('task-1');

  // User State
  const [user, setUser] = useState(initialUser);

  // Tasks State
  const [tasks, setTasks] = useState(initialTasks);
  const [exams, setExams] = useState(initialExams);

  // Calendar & Timetable State
  const [calendarEvents, setCalendarEvents] = useState(initialCalendarEvents);
  const [calendarViewMode, setCalendarViewMode] = useState('week'); // 'day' | 'week' | 'month'
  const [selectedDateIndex, setSelectedDateIndex] = useState(2); // Wednesday (Today)

  // Google Calendar Integration State
  const [gcalState, setGcalState] = useState({
    isConnected: true,
    account: 'alex.chen.cs@university.edu',
    twoWaySync: true,
    syncHealth: 'synced', // 'ready' | 'syncing' | 'synced' | 'failed'
    lastSyncedText: '2 mins ago',
    activeChannels: {
      lectures: true,
      personal: true,
      exams: true,
      clubs: false,
    },
    smartRules: {
      exportStudySessions: true,
      importLecturesAsBusy: true,
      pushDeadlinesAsAllDay: true,
    },
    stats: {
      incomingLectures: 14,
      outgoingBlocks: 3,
    },
  });

  // Daily Goals State (Feature 15)
  const [dailyGoals, setDailyGoals] = useState([
    { id: 'goal-1', title: 'Study 2 hours today', current: 1.75, target: 2.0, unit: 'hours', isCompleted: false },
    { id: 'goal-2', title: 'Complete 3 tasks', current: 2, target: 3, unit: 'tasks', isCompleted: false },
    { id: 'goal-3', title: 'Finish DBMS Normalization schema', current: 1, target: 1, unit: 'task', isCompleted: false },
  ]);

  // AI Routine State (Feature 5 & 6)
  const [routineSchedule, setRoutineSchedule] = useState({
    preferences: {
      targetStudyHours: 3.5,
      preferredWindow: 'night',
      sleepTime: '11:30 PM – 07:30 AM',
      freeWindow: '3:00 PM – 5:00 PM',
    },
    blocks: [
      { id: 'rb-1', day: 'Weekdays', time: '09:00 AM – 12:30 PM', title: 'University Classes & Lectures', category: 'lecture', icon: 'school', color: '#4F46E5' },
      { id: 'rb-2', day: 'Weekdays', time: '01:00 PM – 02:00 PM', title: 'Lunch & Cognitive Rest', category: 'break', icon: 'restaurant', color: '#10B981' },
      { id: 'rb-3', day: 'Weekdays', time: '03:00 PM – 05:00 PM', title: 'IoT Lab Practical & Hardware Review', category: 'lab', icon: 'science', color: '#F59E0B' },
      { id: 'rb-4', day: 'Weekdays', time: '07:30 PM – 09:30 PM', title: '✨ Deep Focus & Assignment Sprint', category: 'study', icon: 'bolt', color: '#4F46E5' },
      { id: 'rb-5', day: 'Weekdays', time: '09:45 PM – 10:30 PM', title: 'Daily Review & Next Day Prep', category: 'revision', icon: 'auto_stories', color: '#8B5CF6' },
    ],
  });

  // Learning Portal (PULMS / Canvas / Moodle) State (Feature 7 & 8)
  const [learningPortal, setLearningPortal] = useState({
    isConnected: false,
    portalName: 'PULMS (Punjab University)',
    portalUrl: 'https://pulms.pu.edu.pk',
    studentId: '',
    lastSync: null,
    syncSettings: {
      courses: true,
      assignments: true,
      quizzes: true,
      announcements: true,
    },
    syncedCourses: [
      { code: 'CS301', name: 'Database Management Systems', instructor: 'Prof. Vance', pendingCount: 2 },
      { code: 'CS304', name: 'Internet of Things', instructor: 'Dr. Emily Watson', pendingCount: 1 },
      { code: 'CS305', name: 'Data Mining', instructor: 'Prof. Tariq Mahmood', pendingCount: 1 },
      { code: 'CS302', name: 'Web Development', instructor: 'Engr. Sarah Khan', pendingCount: 2 },
      { code: 'MATH51', name: 'Linear Algebra & Calculus', instructor: 'Dr. Rebecca Stone', pendingCount: 0 },
    ],
    portalAssignments: [
      { id: 'pa-1', title: 'CS301 Lab 4: Relational Query Algebra', deadline: 'Oct 28, 11:59 PM', course: 'CS301', weight: '10%' },
      { id: 'pa-2', title: 'CS302 Sprint Deliverable 2: JWT API', deadline: 'Oct 30, 5:00 PM', course: 'CS302', weight: '15%' },
    ],
  });

  // AI Smart Rescheduler State (Features 11 & 12)
  const [rescheduleProposal, setRescheduleProposal] = useState({
    active: true,
    missedTask: {
      id: 'task-6',
      title: 'Database Schema & Foreign Keys Lab Prep',
      dueDate: 'Missed yesterday, 5:00 PM',
      estimatedMinutes: 60,
      course: 'CS301',
    },
    proposedSlot: {
      day: 'Today (Wednesday)',
      time: '3:00 PM – 4:00 PM',
      reason: 'Detected 2-hour open buffer before your 5 PM coding review.',
    },
    riskAlert: {
      hasRisk: true,
      message: 'You have 6 hours of work left but only 2 free hours before tomorrow’s deadline.',
      suggestion: 'Create a catch-up plan to redistribute load before tomorrow night.',
    },
  });

  // Focus Chamber / Pomodoro / Stopwatch State (Features 13 & 14)
  const [studyTimerMode, setStudyTimerMode] = useState('timer'); // 'timer' | 'stopwatch'
  const [isFocusMode, setIsFocusMode] = useState(false); // Distraction-free mode
  const [focusSession, setFocusSession] = useState({
    preset: '25/5', // '25/5' | '50/10' | '60' | 'custom'
    durationSeconds: 25 * 60,
    secondsLeft: 21 * 60 + 42,
    elapsedSeconds: 0,
    isRunning: false,
    lap: 2,
    totalLaps: 4,
    activeSoundscape: 'lofi', // 'lofi' | 'rain' | 'cafe' | 'library' | 'none'
    volume: 65,
    activeTaskId: 'task-1',
    todayStudyMinutes: 105,
    weeklyStudyHours: 24.25,
    totalStudyHours: 86.5,
  });

  // Group Collaboration State
  const [groupProject, setGroupProject] = useState(initialGroupProject);

  // Notifications State
  const [notifications, setNotifications] = useState(initialNotifications);
  const [snoozedTasks, setSnoozedTasks] = useState({});

  // Global Toast State
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  // Navigation Functions
  const navigateTo = (screenName, params = {}) => {
    if (params.taskId) {
      setSelectedTaskId(params.taskId);
    }
    setNavigationHistory(prev => [...prev, screenName]);
    setCurrentScreen(screenName);
    if (typeof window !== 'undefined' && window.location) {
      window.location.hash = screenName;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.navigateTo = navigateTo;
      const handleHashChange = () => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
          setCurrentScreen(hash);
        }
      };
      if (window.location.hash) {
        handleHashChange();
      }
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('HomeDashboard');
    }
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  const showToast = (message, type = 'success', duration = 3000) => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, duration);
  };

  // Task Actions
  const toggleTaskCompleted = (taskId) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const nextCompleted = !t.isCompleted;
          if (nextCompleted) {
            // Feature 4: When a task is completed, automatically stop future reminders for that task!
            setNotifications(nList =>
              nList.map(n =>
                n.taskId === taskId || n.title.includes(t.title)
                  ? { ...n, isRead: true, isResolved: true }
                  : n
              )
            );
            showToast('Nice work! Task completed 🎉 Future reminders stopped.', 'success');
          } else {
            showToast('Task marked as pending.', 'info');
          }
          return {
            ...t,
            isCompleted: nextCompleted,
            status: nextCompleted ? 'completed' : 'pending',
          };
        }
        return t;
      })
    );
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId && t.subtasks) {
          return {
            ...t,
            subtasks: t.subtasks.map(s =>
              s.id === subtaskId ? { ...s, isCompleted: !s.isCompleted } : s
            ),
          };
        }
        return t;
      })
    );
  };

  const addSubtask = (taskId, title, estimatedMinutes = 30) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const newSub = {
            id: `sub-${Date.now()}`,
            title,
            estimatedMinutes,
            isCompleted: false,
          };
          return {
            ...t,
            subtasks: [...(t.subtasks || []), newSub],
          };
        }
        return t;
      })
    );
    showToast('Subtask added!', 'success');
  };

  const breakDownTaskWithAI = (taskId) => {
    const steps = [
      { id: `sub-${Date.now()}-1`, title: 'Review lecture notes & requirements (30 min)', isCompleted: false },
      { id: `sub-${Date.now()}-2`, title: 'Draft core solution & code structure (1.5 hrs)', isCompleted: false },
      { id: `sub-${Date.now()}-3`, title: 'Test edge cases & verify outputs (45 min)', isCompleted: false },
      { id: `sub-${Date.now()}-4`, title: 'Final proofread & submit on portal (15 min)', isCompleted: false },
    ];
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, subtasks: steps } : t))
    );
    showToast('AI broke task into 4 manageable steps!', 'success');
  };

  const addTask = (newTaskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskData.title || 'Untitled Task',
      description: newTaskData.description || '',
      course: newTaskData.course || 'CS301',
      courseCode: newTaskData.courseCode || newTaskData.course || 'CS301',
      category: newTaskData.category || 'Assignment',
      priority: newTaskData.priority || 'med',
      dueDate: newTaskData.dueDate || 'Tomorrow, 11:59 PM',
      dueTimestamp: newTaskData.dueTimestamp || 'Tomorrow, Oct 24, 11:59 PM',
      estimatedMinutes: newTaskData.estimatedMinutes || 60,
      loggedMinutes: 0,
      isCompleted: false,
      status: 'pending',
      subtasks: newTaskData.subtasks || [],
      isUrgent: newTaskData.priority === 'urgent' || newTaskData.priority === 'high',
      urgencyScore: newTaskData.priority === 'urgent' ? 98 : newTaskData.priority === 'high' ? 85 : 50,
      reminder: newTaskData.reminder || '2h',
      recurring: newTaskData.recurring || 'none',
      studyWindow: newTaskData.studyWindow || 'night',
      notes: newTaskData.notes || '',
    };
    setTasks(prev => [newTask, ...prev]);
    showToast('Task added to schedule!', 'success');
    return newTask;
  };

  const editTask = (taskId, updatedData) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, ...updatedData } : t))
    );
    showToast('Task updated successfully!', 'success');
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    showToast('Task removed from schedule', 'info');
    if (selectedTaskId === taskId) {
      goBack();
    }
  };

  // Daily Goals Actions (Feature 15)
  const toggleGoal = (goalId) => {
    setDailyGoals(prev =>
      prev.map(g => (g.id === goalId ? { ...g, isCompleted: !g.isCompleted } : g))
    );
    showToast('Daily goal status updated!', 'success');
  };

  const addDailyGoal = (title, target = 1, unit = 'task') => {
    const newGoal = {
      id: `goal-${Date.now()}`,
      title,
      current: 0,
      target,
      unit,
      isCompleted: false,
    };
    setDailyGoals(prev => [...prev, newGoal]);
    showToast('Goal added for today!', 'success');
  };

  // Routine Actions (Feature 5 & 6)
  const saveRoutine = (newBlocks) => {
    setRoutineSchedule(prev => ({
      ...prev,
      blocks: newBlocks,
    }));
    showToast('Routine saved to your schedule!', 'success');
  };

  const addRoutineBlock = (block) => {
    const newBlock = {
      id: `rb-${Date.now()}`,
      day: block.day || 'Weekdays',
      time: block.time || '04:00 PM – 05:00 PM',
      title: block.title || 'Study Session',
      category: block.category || 'study',
      icon: block.icon || 'bolt',
      color: '#4F46E5',
    };
    setRoutineSchedule(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock],
    }));
    showToast('Schedule block added!', 'success');
  };

  const deleteRoutineBlock = (blockId) => {
    setRoutineSchedule(prev => ({
      ...prev,
      blocks: prev.blocks.filter(b => b.id !== blockId),
    }));
    showToast('Block removed from routine', 'info');
  };

  // Learning Portal Actions (Feature 7 & 8)
  const connectLearningPortal = (credentials) => {
    setLearningPortal(prev => ({
      ...prev,
      isConnected: true,
      studentId: credentials.studentId || 'BCSF20M042',
      portalUrl: credentials.portalUrl || prev.portalUrl,
      lastSync: 'Just now',
    }));
    showToast('Connected to PULMS! 5 courses & assignments synced.', 'success');
  };

  const disconnectLearningPortal = () => {
    setLearningPortal(prev => ({
      ...prev,
      isConnected: false,
      lastSync: null,
    }));
    showToast('Learning Portal disconnected', 'info');
  };

  const syncLearningPortal = () => {
    showToast('Checking PULMS for new assignments...', 'info');
    setTimeout(() => {
      setLearningPortal(prev => ({
        ...prev,
        lastSync: 'Just now',
      }));
      showToast('All assignments & courses are up to date!', 'success');
    }, 1000);
  };

  const importAssignmentAsTask = (assignment) => {
    addTask({
      title: assignment.title,
      course: assignment.course,
      dueDate: assignment.deadline,
      priority: 'high',
      category: 'Assignment',
      estimatedMinutes: 120,
    });
    showToast(`Imported "${assignment.title}" into tasks!`, 'success');
  };

  // AI Rescheduler Actions (Features 11 & 12)
  const acceptReschedulePlan = () => {
    setRescheduleProposal(prev => ({
      ...prev,
      active: false,
      riskAlert: { hasRisk: false },
    }));
    showToast('New plan accepted! Schedule updated with realistic slots.', 'success');
  };

  const dismissReschedulePlan = () => {
    setRescheduleProposal(prev => ({
      ...prev,
      active: false,
    }));
    showToast('Schedule kept as is.', 'info');
  };

  // Focus Timer / Stopwatch Clock Logic
  useEffect(() => {
    let interval = null;
    if (focusSession.isRunning) {
      interval = setInterval(() => {
        if (studyTimerMode === 'timer') {
          if (focusSession.secondsLeft > 0) {
            setFocusSession(prev => ({
              ...prev,
              secondsLeft: prev.secondsLeft - 1,
              elapsedSeconds: prev.elapsedSeconds + 1,
            }));
          } else {
            setFocusSession(prev => ({
              ...prev,
              isRunning: false,
              lap: Math.min(prev.totalLaps, prev.lap + 1),
            }));
            showToast('Study session complete! Take a well-earned break 🎉', 'success');
          }
        } else {
          // Stopwatch mode: count up
          setFocusSession(prev => ({
            ...prev,
            elapsedSeconds: prev.elapsedSeconds + 1,
          }));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [focusSession.isRunning, focusSession.secondsLeft, studyTimerMode]);

  const toggleFocusTimer = () => {
    setFocusSession(prev => ({
      ...prev,
      isRunning: !prev.isRunning,
    }));
  };

  const resetFocusTimer = () => {
    setFocusSession(prev => ({
      ...prev,
      isRunning: false,
      secondsLeft: prev.durationSeconds,
      elapsedSeconds: 0,
    }));
    showToast('Timer reset to start', 'info');
  };

  const setFocusPreset = (preset) => {
    let seconds = 25 * 60;
    if (preset === '45') seconds = 45 * 60;
    if (preset === '50/10') seconds = 50 * 60;
    if (preset === '60') seconds = 60 * 60;
    if (preset === 'custom') seconds = 30 * 60;
    setFocusSession(prev => ({
      ...prev,
      preset,
      durationSeconds: seconds,
      secondsLeft: seconds,
      elapsedSeconds: 0,
      isRunning: false,
    }));
  };

  const setSoundscape = (soundscapeId) => {
    setFocusSession(prev => ({
      ...prev,
      activeSoundscape: soundscapeId,
    }));
    showToast(`Ambient Sound: ${soundscapeId === 'none' ? 'Muted' : soundscapeId.toUpperCase()}`, 'info');
  };

  // GCal Actions
  const triggerGCalSync = () => {
    setGcalState(prev => ({ ...prev, syncHealth: 'syncing' }));
    setTimeout(() => {
      setGcalState(prev => ({
        ...prev,
        syncHealth: 'synced',
        lastSyncedText: 'Just now',
      }));
      showToast('Calendar updated & synchronized!', 'success');
    }, 1000);
  };

  // Notifications Actions
  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All reminders marked as read', 'info');
  };

  const snoozeNotification = (taskId, durationText) => {
    setSnoozedTasks(prev => ({ ...prev, [taskId]: durationText }));
    showToast(`Reminding you in ${durationText}`, 'success');
  };

  // Deliverables toggle
  const toggleDeliverable = (delivId) => {
    setGroupProject(prev => {
      const updated = prev.deliverables.map(d => {
        if (d.id === delivId) {
          const nextDone = !d.isDone;
          return {
            ...d,
            isDone: nextDone,
            status: nextDone ? 'Done' : 'In Progress',
          };
        }
        return d;
      });
      const doneCount = updated.filter(d => d.isDone).length;
      return {
        ...prev,
        deliverables: updated,
        tasksDone: doneCount + 10,
        sprintProgress: Math.round(((doneCount + 10) / prev.tasksTotal) * 100),
      };
    });
  };

  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;

  return (
    <TaskContext.Provider
      value={{
        currentScreen,
        navigationHistory,
        navigateTo,
        goBack,
        selectedTaskId,
        setSelectedTaskId,
        user,
        setUser,
        tasks,
        exams,
        setExams,
        calendarEvents,
        calendarViewMode,
        setCalendarViewMode,
        selectedDateIndex,
        setSelectedDateIndex,
        gcalState,
        setGcalState,
        triggerGCalSync,
        focusSession,
        toggleFocusTimer,
        resetFocusTimer,
        setFocusPreset,
        setSoundscape,
        studyTimerMode,
        setStudyTimerMode,
        isFocusMode,
        setIsFocusMode,
        dailyGoals,
        toggleGoal,
        addDailyGoal,
        routineSchedule,
        saveRoutine,
        addRoutineBlock,
        deleteRoutineBlock,
        learningPortal,
        connectLearningPortal,
        disconnectLearningPortal,
        syncLearningPortal,
        importAssignmentAsTask,
        rescheduleProposal,
        acceptReschedulePlan,
        dismissReschedulePlan,
        groupProject,
        toggleDeliverable,
        notifications,
        unreadNotifsCount,
        markAllNotificationsRead,
        snoozeNotification,
        snoozedTasks,
        weeklyStudyStats,
        toast,
        showToast,
        hideToast,
        addTask,
        editTask,
        deleteTask,
        toggleTaskCompleted,
        toggleSubtask,
        addSubtask,
        breakDownTaskWithAI,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;
