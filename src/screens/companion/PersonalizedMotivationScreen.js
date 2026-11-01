import React from 'react';
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

const GOAL_ITEMS = [
  { icon: 'center_focus_strong', title: 'Focus On Each Goal', count: '4 pending', color: '#10B981', screen: 'TodayTasks' },
  { icon: 'schedule', title: 'Study Sessions', count: '2 done today', color: '#3B82F6', screen: 'StudyDashboard' },
  { icon: 'task_alt', title: 'Tasks Completed', count: '5 this week', color: '#8B5CF6', screen: 'ProgressDashboard' },
  { icon: 'offline_bolt', title: 'No Excuses', count: 'Streak active', color: '#F59E0B', screen: 'PomodoroTimer' },
];

export const PersonalizedMotivationScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const handleKeepGoing = () => {
    showToast("Momentum activated! Let's conquer the next session! ⚡", 'success');
    navigateTo('PomodoroTimer');
  };

  const handleItemPress = (screen) => {
    if (screen) {
      navigateTo(screen);
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
          <Text style={styles.headerTitle}>Personalized Motivation</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Top Encouragement Card (Reference Match) */}
        <View style={styles.topCard}>
          <View style={styles.badgeRow}>
            <View style={styles.sparkleIcon}>
              <Icon name="auto_awesome" size={16} color="#D97706" />
            </View>
            <Text style={styles.badgeText}>AI Pep Talk</Text>
          </View>
          <Text style={styles.topCardTitle}>
            You're closer than you think! Let's start.
          </Text>
          <Text style={styles.topCardSubtitle}>
            Break these tasks down and try the 1st 5 minutes section. Momentum will take over.
          </Text>
        </View>

        {/* Actionable Focus Goals (Reference Match) */}
        <View style={styles.goalsList}>
          {GOAL_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.goalRow}
              onPress={() => handleItemPress(item.screen)}
              activeOpacity={0.8}
            >
              <View style={[styles.goalIconBox, { backgroundColor: `${item.color}15` }]}>
                <Icon name={item.icon} size={18} color={item.color} />
              </View>
              <View style={styles.goalTextCol}>
                <Text style={styles.goalTitle}>{item.title}</Text>
                <Text style={styles.goalCount}>{item.count}</Text>
              </View>
              <Icon name="chevron_right" size={20} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Motivational Quote Card (Reference Match) */}
        <View style={styles.quoteCard}>
          <View style={styles.quoteIconBox}>
            <Icon name="format_quote" size={24} color="#6366F1" />
          </View>
          <Text style={styles.quoteText}>
            "It's not about being perfect, it's about not giving up."
          </Text>
          <Text style={styles.quoteAuthor}>— TaskMind Companion</Text>
        </View>

        {/* Action Button: Keep Going */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleKeepGoing}
            activeOpacity={0.88}
          >
            <Text style={styles.actionBtnText}>Keep Going</Text>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 96,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
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
  topCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: rounded.xl,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  sparkleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  topCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    lineHeight: 22,
  },
  topCardSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 6,
    lineHeight: 18,
  },
  goalsList: {
    gap: 10,
    marginBottom: spacing.md,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    gap: 14,
    ...Platform.select({
      web: { boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.02)' },
      default: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.02, shadowRadius: 4, elevation: 1 },
    }),
  },
  goalIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalTextCol: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  goalCount: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  quoteCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    padding: 16,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  quoteIconBox: {
    marginBottom: 6,
  },
  quoteText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3730A3',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  quoteAuthor: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6366F1',
    marginTop: 6,
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

export default PersonalizedMotivationScreen;
