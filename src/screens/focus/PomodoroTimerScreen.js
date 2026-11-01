import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

export const PomodoroTimerScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [session, setSession] = useState(1);
  const totalSessions = 4;

  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      showToast('Pomodoro session complete! Take a 5 min break 🎉', 'success');
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    showToast(isRunning ? 'Timer paused' : 'Focus session running ⏱️', 'info');
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(25 * 60);
    showToast('Timer reset to 25:00', 'info');
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100);

  // SVG Circular Ring calculations
  const size = 220;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - ((100 - progressPercent) / 100) * circumference;

  return (
    <View style={styles.screenWrapper}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigateTo('StudyDashboard')}
          activeOpacity={0.8}
        >
          <Icon name="arrow_back" size={22} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Pomodoro Timer</Text>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigateTo('CustomFocusTimer')}
          activeOpacity={0.8}
        >
          <Icon name="tune" size={20} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Big Circular Timer Ring */}
        <View style={styles.circleContainer}>
          <Svg width={size} height={size}>
            {/* Background Track */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#FFF0EB"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Active Coral Progress Stroke */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={colors.primaryCoral}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>

          {/* Time & Session Inside Ring */}
          <View style={styles.insideRing}>
            <Text style={styles.timerDisplay}>{formatTime(secondsLeft)}</Text>
            <Text style={styles.sessionLabel}>
              Session {session}/{totalSessions}
            </Text>
          </View>
        </View>

        {/* Big Control Buttons Row */}
        <View style={styles.controlsRow}>
          {/* Pause / Play Button */}
          <TouchableOpacity
            style={styles.pauseBtn}
            onPress={toggleTimer}
            activeOpacity={0.85}
          >
            <Icon
              name={isRunning ? 'pause' : 'play_arrow'}
              size={32}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          {/* Stop / Reset Button */}
          <TouchableOpacity
            style={styles.stopBtn}
            onPress={resetTimer}
            activeOpacity={0.85}
          >
            <Icon name="stop" size={32} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Progress Bar & Label at Bottom */}
        <View style={styles.progressSection}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressPercentText}>{progressPercent}%</Text>
            <Text style={styles.focusingTag}>Deep Focus</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${Math.max(5, progressPercent)}%` },
              ]}
            />
          </View>
        </View>
      </View>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#FFFDF9',
    justifyContent: 'space-between',
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
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  circleContainer: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  insideRing: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerDisplay: {
    fontSize: 42,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -1,
  },
  sessionLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 4,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    marginTop: spacing.md,
  },
  pauseBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  stopBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  progressSection: {
    width: '100%',
    maxWidth: 320,
    marginTop: spacing.md,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressPercentText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F97316',
  },
  focusingTag: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: '#FFF0EB',
    borderRadius: rounded.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 10,
    backgroundColor: colors.primaryCoral,
    borderRadius: rounded.full,
  },
});

export default PomodoroTimerScreen;
