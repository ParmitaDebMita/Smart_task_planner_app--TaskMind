import React, { useState, useEffect } from 'react';
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

export const StopwatchScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const [subject, setSubject] = useState('Physics');
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([
    { id: '1', time: '00:45.32', split: '3:00' },
    { id: '2', time: '01:30.17', split: '3:00' },
    { id: '3', time: '02:15.24', split: '3:00' },
  ]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedMs(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleStopwatch = () => {
    setIsRunning(!isRunning);
  };

  const handleLap = () => {
    if (elapsedMs === 0) return;
    const formatted = formatTime(elapsedMs);
    setLaps(prev => [
      { id: `${prev.length + 1}`, time: formatted, split: '3:00' },
      ...prev,
    ]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedMs(0);
    showToast('Stopwatch reset', 'info');
  };

  const handleSaveSession = () => {
    setIsRunning(false);
    showToast(`Saved ${formatTime(elapsedMs)} study session for ${subject}!`, 'success');
    navigateTo('StudyDashboard');
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const hundredths = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
  };

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
        <Text style={styles.topBarTitle}>Stopwatch</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Subject Selector Pill */}
        <View style={styles.subjectRow}>
          <Text style={styles.subjectLabel}>Select Subject</Text>
          <TouchableOpacity
            style={styles.subjectChip}
            onPress={() => {
              const subs = ['Physics', 'Mathematics', 'Chemistry', 'CS'];
              const nextIdx = (subs.indexOf(subject) + 1) % subs.length;
              setSubject(subs[nextIdx]);
            }}
            activeOpacity={0.8}
          >
            <View style={[styles.subjectIconBox, { backgroundColor: '#F5F3FF' }]}>
              <Icon name="science" size={16} color="#8B5CF6" />
            </View>
            <Text style={styles.subjectChipText}>{subject}</Text>
            <Icon name="expand_more" size={18} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Big Digital Display */}
        <View style={styles.displayCard}>
          <Text style={styles.stopwatchText}>{formatTime(elapsedMs)}</Text>
        </View>

        {/* Control Buttons */}
        <View style={styles.controlsRow}>
          {/* Lap Button */}
          <TouchableOpacity
            style={styles.controlCircleSmall}
            onPress={handleLap}
            activeOpacity={0.8}
          >
            <Icon name="flag" size={20} color="#64748B" />
          </TouchableOpacity>

          {/* Play / Pause Button (Green Circle) */}
          <TouchableOpacity
            style={styles.controlCircleLarge}
            onPress={toggleStopwatch}
            activeOpacity={0.85}
          >
            <Icon
              name={isRunning ? 'pause' : 'play_arrow'}
              size={32}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          {/* Reset Button */}
          <TouchableOpacity
            style={styles.controlCircleSmall}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Icon name="replay" size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Laps List */}
        <View style={styles.lapsCard}>
          <View style={styles.lapsHeaderRow}>
            <Text style={styles.lapsHeaderTitle}>Laps</Text>
            <Text style={styles.lapsHeaderSub}>Focus</Text>
          </View>

          <View style={styles.lapsList}>
            {laps.slice(0, 4).map((lap, i) => (
              <View key={lap.id} style={styles.lapRow}>
                <Text style={styles.lapNumber}>{lap.id}</Text>
                <Text style={styles.lapTime}>{lap.time}</Text>
                <Text style={styles.lapSplit}>{lap.split}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Save Session CTA */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSaveSession}
            activeOpacity={0.88}
          >
            <Text style={styles.saveBtnText}>Save Session</Text>
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
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: 96,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  subjectRow: {
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  subjectLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  subjectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    borderRadius: rounded.xl,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  subjectIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectChipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  displayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  stopwatchText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -1,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginBottom: spacing.md,
  },
  controlCircleSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E4DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlCircleLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  lapsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 14,
    marginBottom: spacing.md,
  },
  lapsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1EFEA',
  },
  lapsHeaderTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },
  lapsHeaderSub: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  lapsList: {
    gap: 8,
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lapNumber: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    width: 24,
  },
  lapTime: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  lapSplit: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  actionWrapper: {
    marginTop: spacing.xs,
  },
  saveBtn: {
    width: '100%',
    height: 52,
    backgroundColor: colors.primaryCoral,
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryCoral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  saveBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default StopwatchScreen;
