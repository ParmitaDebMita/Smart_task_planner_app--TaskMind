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
import TaskMindMascot from '../../components/common/TaskMindMascot';
import Icon from '../../components/common/Icon';

const RECOVERY_STEPS = [
  {
    step: '1',
    title: 'Drop the Guilt',
    description: 'Bad days happen to every student. What matters is right now.',
    icon: 'favorite',
    color: '#EC4899',
    bg: '#FDF2F8',
  },
  {
    step: '2',
    title: 'One 15-Minute Win',
    description: 'Just 15 minutes of light review. No heavy pressure.',
    icon: 'hourglass_top',
    color: '#3B82F6',
    bg: '#EFF6FF',
  },
  {
    step: '3',
    title: 'Auto-Shift the Heavy Work',
    description: 'TaskMind automatically balances tomorrow so you can rest peacefully.',
    icon: 'auto_fix_high',
    color: '#8B5CF6',
    bg: '#F5F3FF',
  },
];

export const SupportiveRecoveryScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const handleStartReset = () => {
    showToast("Starting a gentle 15-minute recovery session. You've got this! 💙", 'success');
    navigateTo('CustomFocusTimer');
  };

  const handleCareMode = () => {
    navigateTo('CareMode');
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
          <Text style={styles.headerTitle}>Supportive Recovery</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Mascot */}
        <View style={styles.mascotContainer}>
          <TaskMindMascot size={140} showBackground={true} variant="concerned" />
        </View>

        {/* Supportive Title */}
        <View style={styles.messageBox}>
          <Text style={styles.mainTitle}>
            Take a deep breath.{'\n'}We're resetting together.
          </Text>
          <Text style={styles.subTitle}>
            You don't have to finish everything right now. A small 15-minute win breaks any slump.
          </Text>
        </View>

        {/* Recovery Steps List */}
        <View style={styles.stepsList}>
          {RECOVERY_STEPS.map((item, idx) => (
            <View key={idx} style={styles.stepCard}>
              <View style={[styles.stepIconBox, { backgroundColor: item.bg }]}>
                <Icon name={item.icon} size={20} color={item.color} />
              </View>
              <View style={styles.stepTextCol}>
                <Text style={styles.stepTitle}>{item.title}</Text>
                <Text style={styles.stepDesc}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionCol}>
          <TouchableOpacity
            style={styles.primaryActionBtn}
            onPress={handleStartReset}
            activeOpacity={0.88}
          >
            <Text style={styles.primaryActionText}>Start 15-Min Gentle Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryActionBtn}
            onPress={handleCareMode}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryActionText}>Switch to Care Mode</Text>
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
  mascotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xs,
  },
  messageBox: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  mainTitle: {
    ...typography.headlineLg,
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 28,
  },
  subTitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 19,
    paddingHorizontal: spacing.sm,
  },
  stepsList: {
    gap: 12,
    marginBottom: spacing.xl,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    gap: 12,
  },
  stepIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTextCol: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  stepDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 3,
    lineHeight: 17,
  },
  actionCol: {
    gap: 10,
    marginTop: spacing.xs,
  },
  primaryActionBtn: {
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
  primaryActionText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryActionBtn: {
    width: '100%',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.full,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
});

export default SupportiveRecoveryScreen;
