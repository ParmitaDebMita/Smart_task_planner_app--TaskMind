import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Icon from '../../components/common/Icon';

export const DeepStudyModeScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const toggleRunning = () => {
    setIsRunning(!isRunning);
    showToast(isRunning ? 'Deep study paused' : 'Deep study resumed', 'info');
  };

  const handleStop = () => {
    showToast('Exited Deep Study Mode', 'info');
    navigateTo('StudyDashboard');
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.closeBtn} onPress={handleStop} activeOpacity={0.8}>
          <Icon name="arrow_back" size={22} color="#A7F3D0" />
        </TouchableOpacity>
        <Text style={styles.modeTitle}>Deep Study Mode • Mathematics</Text>
        <TouchableOpacity
          style={styles.dndBtn}
          onPress={() => navigateTo('PhoneDoNotDisturb')}
          activeOpacity={0.8}
        >
          <Icon name="do_not_disturb_on" size={20} color="#34D399" fill />
        </TouchableOpacity>
      </View>

      {/* Center Immersive Countdown */}
      <View style={styles.timerCenter}>
        <Text style={styles.timerDigits}>{formatTime(secondsLeft)}</Text>
        <Text style={styles.sessionSub}>Session 1/4</Text>

        <View style={styles.stayFocusedRow}>
          <Icon name="eco" size={18} color="#34D399" />
          <Text style={styles.stayFocusedText}>Stay Focused</Text>
        </View>
      </View>

      {/* Bottom Controls Row */}
      <View style={styles.controlsRow}>
        {/* Pause Button (Blue Circle) */}
        <TouchableOpacity
          style={styles.blueBtn}
          onPress={toggleRunning}
          activeOpacity={0.85}
        >
          <Icon name={isRunning ? 'pause' : 'play_arrow'} size={28} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Stop Button (Red Circle) */}
        <TouchableOpacity
          style={styles.redBtn}
          onPress={handleStop}
          activeOpacity={0.85}
        >
          <Icon name="stop" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#082F24', // Calm deep forest green
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#A7F3D0',
    letterSpacing: 0.2,
  },
  dndBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerDigits: {
    fontSize: 68,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -2,
    lineHeight: 74,
  },
  sessionSub: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6EE7B7',
    marginTop: 8,
  },
  stayFocusedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: rounded.full,
  },
  stayFocusedText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6EE7B7',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    marginBottom: spacing.md,
  },
  blueBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  redBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
});

export default DeepStudyModeScreen;
