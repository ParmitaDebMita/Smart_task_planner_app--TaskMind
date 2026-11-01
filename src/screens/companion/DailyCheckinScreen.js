import React, { useState } from 'react';
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
import Icon from '../../components/common/Icon';

const MOODS = [
  {
    key: 'great',
    emoji: '😄',
    label: 'Great',
    textColor: '#D97706',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    circleBg: '#FEF3C7',
  },
  {
    key: 'good',
    emoji: '😊',
    label: 'Good',
    textColor: '#D97706',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    circleBg: '#FEF3C7',
  },
  {
    key: 'okay',
    emoji: '😐',
    label: 'Okay',
    textColor: '#D97706',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    circleBg: '#FEF3C7',
  },
  {
    key: 'low',
    emoji: '🙁',
    label: 'Low',
    textColor: '#D97706',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    circleBg: '#FEF3C7',
  },
  {
    key: 'overwhelmed',
    emoji: '😡',
    label: 'Overwhelmed',
    textColor: '#D97706',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    circleBg: '#FEF3C7',
  },
];

const MOOD_RESPONSES = {
  great: {
    message: "Good morning! Ready for a small win? Let's channel this energy!",
    target: 'StudyDashboard',
  },
  good: {
    message: "Nice! Let's make the first 25 minutes count.",
    target: 'PushMeMode',
  },
  okay: {
    message: "That's completely fine. Small steps still count. Let's start easy.",
    target: 'PushMeMode',
  },
  low: {
    message: "You don't have to finish everything right now. Let's take it gently.",
    target: 'CareMode',
  },
  overwhelmed: {
    message: "Take a breath. Let's switch to Care Mode and protect your peace.",
    target: 'CareMode',
  },
};

export const DailyCheckinScreen = () => {
  const { navigateTo, showToast } = useTaskContext();
  const [selectedMood, setSelectedMood] = useState(null);

  const handleSelect = (key) => {
    setSelectedMood(key);
  };

  const handleAction = () => {
    if (!selectedMood) {
      navigateTo('CareMode');
      return;
    }
    const res = MOOD_RESPONSES[selectedMood];
    if (res) {
      showToast(res.message, 'info');
      navigateTo(res.target);
    } else {
      navigateTo('HomeDashboard');
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
          <Text style={styles.headerTitle}>Daily Check-in</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Question Title */}
        <Text style={styles.questionTitle}>How are you feeling today?</Text>

        {/* Mood Rows Stack (Matching Reference Screen 1) */}
        <View style={styles.moodList}>
          {MOODS.map((m) => {
            const isSelected = selectedMood === m.key;
            return (
              <TouchableOpacity
                key={m.key}
                style={[
                  styles.moodRow,
                  { backgroundColor: isSelected ? '#FEF3C7' : '#FFFDF5', borderColor: isSelected ? '#F59E0B' : '#FDE68A' },
                  isSelected && styles.moodRowSelected,
                ]}
                onPress={() => handleSelect(m.key)}
                activeOpacity={0.85}
              >
                <View style={styles.moodLeft}>
                  <View style={styles.emojiCircle}>
                    <Text style={styles.emojiText}>{m.emoji}</Text>
                  </View>
                  <Text style={styles.moodText}>{m.label}</Text>
                </View>

                <View style={styles.arrowBox}>
                  <Text style={styles.arrowText}>→</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Dynamic Context Feedback */}
        {selectedMood && (
          <View style={styles.feedbackCard}>
            <Icon name="auto_awesome" size={18} color="#D97706" />
            <Text style={styles.feedbackText}>
              {MOOD_RESPONSES[selectedMood].message}
            </Text>
          </View>
        )}

        {/* Bottom Button */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleAction}
            activeOpacity={0.88}
          >
            <Text style={styles.actionBtnText}>
              {selectedMood === 'low' || selectedMood === 'overwhelmed' || !selectedMood
                ? 'Take a Break'
                : 'Continue'}
            </Text>
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
    paddingBottom: 96,
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
    marginBottom: spacing.md,
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
  questionTitle: {
    ...typography.headlineLg,
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
  },
  moodList: {
    gap: 14,
    marginBottom: spacing.lg,
  },
  moodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1.5,
    ...Platform.select({
      web: { boxShadow: '0px 2px 6px rgba(245, 158, 11, 0.08)' },
      default: { shadowColor: '#F59E0B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 1 },
    }),
  },
  moodRowSelected: {
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  moodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  emojiCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    fontSize: 24,
  },
  moodText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  arrowBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#D97706',
  },
  feedbackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: rounded.xl,
    padding: 14,
    gap: 10,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  feedbackText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    fontWeight: '600',
    lineHeight: 18,
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

export default DailyCheckinScreen;
