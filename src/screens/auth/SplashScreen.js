import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import TaskMindMascot from '../../components/common/TaskMindMascot';

export const SplashScreen = () => {
  const { navigateTo } = useTaskContext();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.95}
      onPress={() => navigateTo('Onboarding')}
    >
      {/* Soft Decorative Ambient Pastel Blobs */}
      <View style={styles.blobTopLeft} />
      <View style={styles.blobTopRight} />
      <View style={styles.blobBottomRight} />

      {/* Brand Header */}
      <View style={styles.brandWrapper}>
        <Text style={styles.brandTitle}>TaskMind</Text>
        <Text style={styles.brandSubtitle}>Plan • Focus • Grow</Text>
      </View>

      {/* Mascot Illustration Hero */}
      <View style={styles.mascotWrapper}>
        <TaskMindMascot size={210} showBackground={true} variant="studying" />
      </View>

      {/* Tap Hint */}
      <View style={styles.footerSection}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigateTo('Onboarding')}
          activeOpacity={0.88}
        >
          <Text style={styles.continueBtnText}>Get Started →</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF9',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    overflow: 'hidden',
  },
  blobTopLeft: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FED7AA',
    opacity: 0.6,
  },
  blobTopRight: {
    position: 'absolute',
    top: -20,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#A7F3D0',
    opacity: 0.5,
  },
  blobBottomRight: {
    position: 'absolute',
    bottom: -30,
    right: -20,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#BAE6FD',
    opacity: 0.5,
  },
  brandWrapper: {
    alignItems: 'center',
    marginTop: spacing.xl,
    zIndex: 2,
  },
  brandTitle: {
    ...typography.headlineXl,
    color: colors.primaryCoral,
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    ...typography.bodyMd,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  mascotWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  footerSection: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    zIndex: 2,
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

export default SplashScreen;
