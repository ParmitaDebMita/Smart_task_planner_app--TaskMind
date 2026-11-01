import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import TaskMindMascot from '../../components/common/TaskMindMascot';
import BottomNav from '../../components/common/BottomNav';

export const OnboardingScreen = () => {
  const { navigateTo } = useTaskContext();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header Title Section */}
        <View style={styles.headerSection}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandText}>TaskMind</Text>
          <Text style={styles.subtitleText}>
            Your AI companion for better planning, deeper focus and brighter results.
          </Text>
        </View>

        {/* Mascot Hero Section */}
        <View style={styles.mascotSection}>
          <TaskMindMascot size={220} showBackground={true} variant="studying" />
        </View>

        {/* Action Button */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => navigateTo('ProfileSetup')}
            activeOpacity={0.88}
          >
            <Text style={styles.continueBtnText}>Continue →</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF9',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginTop: spacing.md,
    maxWidth: 320,
  },
  welcomeText: {
    ...typography.headlineMd,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
    color: '#1E293B',
  },
  brandText: {
    ...typography.headlineXl,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '800',
    color: colors.primaryCoral,
    marginTop: 2,
  },
  subtitleText: {
    ...typography.bodyMd,
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  mascotSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSection: {
    width: '100%',
    maxWidth: 340,
    marginBottom: spacing.md,
  },
  continueBtn: {
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
  continueBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default OnboardingScreen;
