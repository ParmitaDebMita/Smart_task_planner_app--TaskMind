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
import TaskMindMascot from '../../components/common/TaskMindMascot';
import Icon from '../../components/common/Icon';

export const CelebrationScreen = ({
  title = "You reached your goal!",
  subtitle = "That one was tough. You stayed focused and proved what you're capable of!",
  taskName = "Physics Chapter 4 Review",
}) => {
  const { navigateTo, showToast } = useTaskContext();

  const handleContinue = () => {
    showToast("Momentum is rolling! Keep shining! 🌟", 'success');
    navigateTo('HomeDashboard');
  };

  const handleNextSprint = () => {
    navigateTo('PomodoroTimer');
  };

  return (
    <View style={styles.screenWrapper}>
      {/* Decorative Confetti Background Dots */}
      <View style={[styles.confettiDot, { top: 60, left: 40, backgroundColor: '#F59E0B' }]} />
      <View style={[styles.confettiDot, { top: 120, right: 50, backgroundColor: '#EC4899' }]} />
      <View style={[styles.confettiDot, { top: 220, left: 24, backgroundColor: '#3B82F6' }]} />
      <View style={[styles.confettiDot, { top: 260, right: 30, backgroundColor: '#10B981' }]} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Close */}
        <View style={styles.headerRow}>
          <View style={{ width: 36 }} />
          <View style={styles.pillBadge}>
            <Icon name="celebration" size={16} color="#B45309" />
            <Text style={styles.pillBadgeText}>VICTORY UNLOCKED</Text>
          </View>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => navigateTo('HomeDashboard')}
            activeOpacity={0.8}
          >
            <Icon name="close" size={22} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Celebrating Mascot with sparkles */}
        <View style={styles.mascotContainer}>
          <TaskMindMascot size={180} showBackground={true} variant="celebrating" />
        </View>

        {/* Context-Aware Headline */}
        <View style={styles.titleWrap}>
          <Text style={styles.celebrationHeadline}>{title}</Text>
          <Text style={styles.taskCompletedName}>{taskName}</Text>
          <Text style={styles.celebrationSub}>{subtitle}</Text>
        </View>

        {/* Stat Highlights Card */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>+25</Text>
            <Text style={styles.statLabel}>Mins Studied</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>+50</Text>
            <Text style={styles.statLabel}>XP Gained</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5🔥</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* AI Companion Thought */}
        <View style={styles.aiQuoteCard}>
          <View style={styles.aiAvatarBox}>
            <Icon name="smart_toy" size={16} color="#FFFFFF" />
          </View>
          <Text style={styles.aiQuoteText}>
            "That was tough. You did it! Every focused minute brings your dream university closer."
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionCol}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleNextSprint}
            activeOpacity={0.88}
          >
            <Text style={styles.primaryBtnText}>Start Another Sprint ⚡</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryBtnText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#FFFDF5',
  },
  confettiDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    opacity: 0.7,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 40,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.xs,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.full,
    gap: 6,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  pillBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.5,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotContainer: {
    marginVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  celebrationHeadline: {
    ...typography.headlineLg,
    fontSize: 26,
    fontWeight: '900',
    color: '#1E293B',
    textAlign: 'center',
  },
  taskCompletedName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaryCoral,
    marginTop: 6,
    textAlign: 'center',
  },
  celebrationSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    marginBottom: spacing.md,
    ...Platform.select({
      web: { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.04)' },
      default: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
    }),
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E2E8F0',
  },
  aiQuoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FEF3C7',
    borderRadius: rounded.xl,
    padding: 14,
    gap: 12,
    marginBottom: spacing.xl,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
  },
  aiAvatarBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryCoral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiQuoteText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
    lineHeight: 17,
    fontStyle: 'italic',
  },
  actionCol: {
    width: '100%',
    gap: 10,
  },
  primaryBtn: {
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
  primaryBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryBtn: {
    width: '100%',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.full,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
});

export default CelebrationScreen;
