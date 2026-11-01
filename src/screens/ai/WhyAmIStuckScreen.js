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
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Icon from '../../components/common/Icon';

const obstacleOptions = [
  { id: 'diff', label: 'Too difficult', color: '#3B82F6', icon: 'psychology', suggestion: 'TaskMind will break this into 3 smaller bite-sized steps so you build momentum.' },
  { id: 'long', label: 'Too long', color: '#EF4444', icon: 'hourglass_top', suggestion: 'Let’s start with a mini 20-minute focus sprint instead of doing the whole thing.' },
  { id: 'under', label: 'I don’t understand it', color: '#F59E0B', icon: 'help_outline', suggestion: 'Let’s review the summary sheet & core definitions first before writing.' },
  { id: 'tired', label: 'Tired', color: '#0D9488', icon: 'bedtime', suggestion: 'Take a 15-minute cognitive rest or switch to a light revision task.' },
  { id: 'dist', label: 'Distracted', color: '#8B5CF6', icon: 'notifications_off', suggestion: 'Turn on Focus Chamber with Lo-Fi soundscapes and zero notifications.' },
  { id: 'start', label: 'Don’t know where to start', color: '#EC4899', icon: 'flag', suggestion: 'Step 1: Open your notes and read the first 2 paragraphs. That’s all for now!' },
];

export const WhyAmIStuckScreen = () => {
  const { navigateTo, showToast } = useTaskContext();
  const [selectedObstacle, setSelectedObstacle] = useState('diff');

  const currentOption = obstacleOptions.find(o => o.id === selectedObstacle) || obstacleOptions[0];

  const handleGetStarted = () => {
    showToast('Focus session started — You’ve got this!', 'success');
    navigateTo('FocusChamber');
  };

  return (
    <View style={styles.screenWrapper}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigateTo('HomeDashboard')}
          activeOpacity={0.8}
        >
          <Icon name="arrow_back" size={22} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Why Am I Stuck?</Text>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => showToast('Help guide', 'info')}
          activeOpacity={0.8}
        >
          <Icon name="help_outline" size={20} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Soft Lavender Mascot Coach Banner */}
        <View style={styles.coachCard}>
          <View style={styles.coachIconCircle}>
            <Icon name="smart_toy" size={20} color="#8B5CF6" />
          </View>
          <Text style={styles.coachText}>
            You've postponed this task 3 times.
          </Text>
        </View>

        {/* Question Header */}
        <Text style={styles.sectionQuestion}>What's stopping you?</Text>

        {/* 6 Obstacle Choices */}
        <View style={styles.optionsList}>
          {obstacleOptions.map((opt) => {
            const isSelected = selectedObstacle === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                ]}
                onPress={() => setSelectedObstacle(opt.id)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.radioCircle,
                    { borderColor: opt.color },
                    isSelected && { backgroundColor: opt.color },
                  ]}
                >
                  {isSelected && <View style={styles.innerDot} />}
                </View>
                <Text
                  style={[
                    styles.optionLabel,
                    isSelected && { fontWeight: '700', color: '#1E293B' },
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Contextual AI Suggestion Box */}
        <View style={styles.aiSuggestionCard}>
          <View style={styles.aiSugHeader}>
            <Icon name="auto_awesome" size={16} color="#8B5CF6" fill />
            <Text style={styles.aiSugTitle}>AI Suggestion</Text>
          </View>
          <Text style={styles.aiSugBody}>{currentOption.suggestion}</Text>
        </View>

        {/* Primary Action Button */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.startBtn}
            onPress={handleGetStarted}
            activeOpacity={0.88}
          >
            <Text style={styles.startBtnText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  searchBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  coachCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    borderRadius: rounded.xl,
    padding: 14,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    gap: 10,
  },
  coachIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coachText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6D28D9',
  },
  sectionQuestion: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 10,
  },
  optionsList: {
    gap: 8,
    marginBottom: spacing.md,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  optionCardSelected: {
    borderColor: colors.primaryCoral,
    backgroundColor: '#FFF8F6',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  optionLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  aiSuggestionCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#DBEAFE',
    padding: 14,
    marginBottom: spacing.lg,
  },
  aiSugHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  aiSugTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1D4ED8',
  },
  aiSugBody: {
    fontSize: 13,
    color: '#1E40AF',
    fontWeight: '500',
    lineHeight: 18,
  },
  actionWrapper: {
    marginTop: spacing.xs,
  },
  startBtn: {
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
  startBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default WhyAmIStuckScreen;
