import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { useTaskContext } from '../../context/TaskContext';
import Icon from '../../components/common/Icon';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius, elevation } from '../../theme/spacing';

export default function VoiceTaskEntryScreen() {
  const { addTask, navigateTo, showToast } = useTaskContext();

  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));

  // Voice parsed entities
  const [parsedTask, setParsedTask] = useState({
    title: 'Complete Distributed Systems Consensus Lab Report',
    course: 'CS402 Distributed Systems',
    dueDate: 'Tomorrow, 5:00 PM',
    priority: 'High',
    category: 'assignment',
    estimatedMinutes: 90,
  });

  const transcript = isRecording
    ? 'Listening... "Remind me to submit the CS402 Consensus Lab report tomorrow before 5 PM with high priority"'
    : hasRecorded
    ? '"Remind me to submit the CS402 Consensus Lab report tomorrow before 5 PM with high priority"'
    : 'Tap the microphone below and speak naturally. For example: "Finish DBMS Chapter 4 exercises by Friday 8 PM."';

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.25,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setHasRecorded(false);
      // Simulate 3 seconds recording then parse
      setTimeout(() => {
        setIsRecording(false);
        setHasRecorded(true);
        showToast('Voice parsed with Gemini 1.5 Pro NLP', 'success');
      }, 3000);
    } else {
      setIsRecording(false);
      setHasRecorded(true);
    }
  };

  const handleCreateTask = () => {
    addTask({
      title: parsedTask.title,
      course: parsedTask.course,
      priority: parsedTask.priority,
      category: parsedTask.category,
      dueDate: parsedTask.dueDate,
      estimatedMinutes: parsedTask.estimatedMinutes,
      status: 'pending',
    });
    showToast('Task created from voice input!', 'success');
    navigateTo('today');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Voice Task Entry"
        subtitle="Gemini Real-Time Speech-to-Task"
        showBack={true}
        onBack={() => navigateTo('home')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Transcript Box */}
        <View style={styles.transcriptCard}>
          <View style={styles.transcriptHeader}>
            <Icon
              name={isRecording ? 'graphic_eq' : 'chat_bubble'}
              size={18}
              color={isRecording ? '#EF4444' : '#4F46E5'}
            />
            <Text style={styles.transcriptStatus}>
              {isRecording ? 'TRANSCRIBING AUDIO LIVE...' : hasRecorded ? 'TRANSCRIPT DETECTED' : 'SPEECH PROMPT'}
            </Text>
          </View>
          <Text style={[styles.transcriptText, isRecording && styles.transcriptRecording]}>
            {transcript}
          </Text>
        </View>

        {/* Central Mic & Visualizer Area */}
        <View style={styles.micSection}>
          {/* Animated visualizer bars */}
          {isRecording && (
            <View style={styles.waveformContainer}>
              <View style={[styles.waveBar, { height: 24 }]} />
              <View style={[styles.waveBar, { height: 48 }]} />
              <View style={[styles.waveBar, { height: 32 }]} />
              <View style={[styles.waveBar, { height: 60 }]} />
              <View style={[styles.waveBar, { height: 40 }]} />
              <View style={[styles.waveBar, { height: 52 }]} />
              <View style={[styles.waveBar, { height: 28 }]} />
            </View>
          )}

          <Animated.View style={[styles.micOuterRing, { transform: [{ scale: pulseAnim }] }]}>
            <TouchableOpacity
              style={[styles.micButton, isRecording && styles.micButtonActive]}
              onPress={toggleRecording}
              activeOpacity={0.8}
            >
              <Icon
                name={isRecording ? 'stop' : 'mic'}
                size={38}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.micHint}>
            {isRecording ? 'Listening... Tap to stop' : hasRecorded ? 'Tap to record again' : 'Tap to Start Speaking'}
          </Text>
        </View>

        {/* NLP Parsed Entities Preview */}
        {hasRecorded && (
          <View style={styles.nlpCard}>
            <View style={styles.nlpHeader}>
              <View style={styles.nlpBadge}>
                <Icon name="auto_awesome" size={14} color="#4F46E5" />
                <Text style={styles.nlpBadgeText}>PARSED ENTITIES (GEMINI NLP)</Text>
              </View>
              <View style={styles.confidenceBadge}>
                <Text style={styles.confidenceText}>99.4% Match</Text>
              </View>
            </View>

            <View style={styles.entityRow}>
              <Text style={styles.entityLabel}>Task Title:</Text>
              <Text style={styles.entityValue}>{parsedTask.title}</Text>
            </View>

            <View style={styles.entityRow}>
              <Text style={styles.entityLabel}>Course / Subject:</Text>
              <View style={styles.coursePill}>
                <Text style={styles.coursePillText}>{parsedTask.course}</Text>
              </View>
            </View>

            <View style={styles.entityRow}>
              <Text style={styles.entityLabel}>Due Date:</Text>
              <View style={styles.duePill}>
                <Icon name="event" size={12} color="#EF4444" />
                <Text style={styles.duePillText}>{parsedTask.dueDate}</Text>
              </View>
            </View>

            <View style={styles.entityRow}>
              <Text style={styles.entityLabel}>Priority:</Text>
              <View style={styles.priorityPill}>
                <Text style={styles.priorityPillText}>{parsedTask.priority}</Text>
              </View>
            </View>

            <View style={styles.entityRow}>
              <Text style={styles.entityLabel}>Estimated Time:</Text>
              <Text style={styles.entityValue}>{parsedTask.estimatedMinutes} minutes</Text>
            </View>

            {/* Confirm Actions */}
            <View style={styles.nlpActions}>
              <TouchableOpacity
                style={styles.confirmTaskBtn}
                onPress={handleCreateTask}
              >
                <Icon name="add_task" size={18} color="#FFFFFF" />
                <Text style={styles.confirmTaskText}>Confirm & Add to Schedule</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.manualEditBtn}
                onPress={() => navigateTo('addTask')}
              >
                <Icon name="edit" size={16} color="#64748B" />
                <Text style={styles.manualEditText}>Edit Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <BottomNav currentScreen="tasks" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 100,
  },
  transcriptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.lg,
    ...elevation.xs,
  },
  transcriptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  transcriptStatus: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  transcriptText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  transcriptRecording: {
    color: '#0F172A',
    fontWeight: '600',
  },
  micSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.md,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 60,
    marginBottom: spacing.md,
  },
  waveBar: {
    width: 6,
    backgroundColor: '#4F46E5',
    borderRadius: 3,
  },
  micOuterRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  micButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    ...elevation.md,
  },
  micButtonActive: {
    backgroundColor: '#EF4444',
  },
  micHint: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  nlpCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    gap: 12,
    ...elevation.sm,
  },
  nlpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nlpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  nlpBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4F46E5',
  },
  confidenceBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  confidenceText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },
  entityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  entityLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  entityValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    flex: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
  coursePill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  coursePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4F46E5',
  },
  duePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  duePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#EF4444',
  },
  priorityPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  priorityPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  nlpActions: {
    gap: 8,
    marginTop: spacing.sm,
  },
  confirmTaskBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: borderRadius.md,
    gap: 8,
  },
  confirmTaskText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  manualEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  manualEditText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
});
