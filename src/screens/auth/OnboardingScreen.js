import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import AppLogo from '../../components/common/AppLogo';
import Icon from '../../components/common/Icon';

const onboardingSlides = [
  {
    icon: 'auto_awesome',
    iconColor: colors.secondaryContainer,
    title: 'Gemini AI Smart Prioritization',
    description: 'Never wonder what assignment to tackle first. TaskMind calculates urgency based on deadlines, course weights, and your energy.',
  },
  {
    icon: 'calendar_month',
    iconColor: colors.primaryContainer,
    title: 'Zero Conflict Timetable',
    description: 'Auto-syncs with Google Calendar and Canvas LMS so you never double-book labs, lectures, or deep study blocks.',
  },
  {
    icon: 'psychology',
    iconColor: colors.tertiary,
    title: 'Pomodoro Focus Chamber',
    description: 'Conquer academic tasks with guided timers, do-not-disturb protection, and immersive ambient lo-fi soundscapes.',
  },
];

export const OnboardingScreen = () => {
  const { navigateTo } = useTaskContext();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    if (activeSlide < onboardingSlides.length - 1) {
      setActiveSlide(prev => prev + 1);
    } else {
      navigateTo('Login');
    }
  };

  const slide = onboardingSlides[activeSlide];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <AppLogo size={32} />
        <TouchableOpacity onPress={() => navigateTo('HomeDashboard')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentCard}>
        <View style={[styles.iconCircle, { backgroundColor: `${slide.iconColor}15` }]}>
          <Icon name={slide.icon} size={48} color={slide.iconColor} fill />
        </View>

        <Text style={styles.slideTitle}>{slide.title}</Text>
        <Text style={styles.slideDesc}>{slide.description}</Text>

        <View style={styles.paginationDots}>
          {onboardingSlides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === activeSlide && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>
            {activeSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <Icon name="chevron_right" size={20} color={colors.onPrimary} />
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginHint}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigateTo('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
  },
  skipText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  contentCard: {
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  slideTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  slideDesc: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 290,
  },
  paginationDots: {
    flexDirection: 'row',
    gap: 8,
    marginTop: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerHighest,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primaryContainer,
  },
  actionRow: {
    gap: spacing.md,
    paddingBottom: spacing.sm,
  },
  primaryBtn: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  primaryBtnText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginHint: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  loginLink: {
    ...typography.labelMd,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
});

export default OnboardingScreen;
