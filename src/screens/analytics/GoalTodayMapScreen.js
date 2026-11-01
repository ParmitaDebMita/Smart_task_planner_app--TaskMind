import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

const MAP_STEPS = [
  {
    level: 'Goal', icon: 'emoji_events', color: '#4F46E5', bg: '#EDE9FE',
    title: 'Score 90% in Exams', subtitle: 'Academic Target • Board 2026',
    detail: 'Targeting top tier score in Science & Mathematics',
  },
  {
    level: 'Exam', icon: 'assignment', color: '#F59E0B', bg: '#FEF3C7',
    title: 'Board Exam 2026', subtitle: 'Final Examination Cycle',
    detail: 'Full curriculum assessment across 5 core subjects',
  },
  {
    level: 'Syllabus', icon: 'menu_book', color: '#8B5CF6', bg: '#F3E8FF',
    title: '8 chapters', subtitle: 'Current term coverage',
    detail: 'Optics, Thermodynamics, Calculus, Organic Chemistry',
  },
  {
    level: 'Topics', icon: 'topic', color: '#3B82F6', bg: '#EFF6FF',
    title: '24 topics', subtitle: '18 completed • 6 in progress',
    detail: 'Ray optics, Wave optics, Differential equations, Hydrocarbons',
  },
  {
    level: 'Weekly Targets', icon: 'calendar_today', color: '#10B981', bg: '#ECFDF5',
    title: '5 topics/week', subtitle: 'Target: 2.5h daily study',
    detail: 'Mon-Wed: Optics theory & derivations\nThu-Sat: Numerical problem solving',
  },
  {
    level: "Today's Tasks", icon: 'today', color: '#FF5B37', bg: '#FFEFEB',
    title: '3 tasks', subtitle: 'Scheduled for today',
    detail: '1. Physics Chapter 4: Wave Optics notes (45m)\n2. Math Calculus drill (30m)\n3. 15m flashcards',
  },
];

const Connector = ({ color }) => (
  <View style={[styles.connector, { borderLeftColor: color }]} />
);

export const GoalTodayMapScreen = () => {
  const { navigateTo } = useTaskContext();

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('Goals')} style={styles.backBtn}>
          <Icon name="arrow_back" size={22} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Goal → Today Map</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero explanation */}
        <View style={styles.heroBanner}>
          <Icon name="map" size={20} color={colors.primaryCoral} />
          <View style={styles.heroTextCol}>
            <Text style={styles.heroTitle}>Goal Journey</Text>
            <Text style={styles.heroSub}>Score 90% in Exams • From Vision to Daily Actions</Text>
          </View>
        </View>

        {/* Map Steps */}
        {MAP_STEPS.map((step, idx) => (
          <View key={idx} style={styles.stepWrapper}>
            {/* Level badge */}
            <View style={[styles.levelBadge, { backgroundColor: step.bg }]}>
              <Text style={[styles.levelText, { color: step.color }]}>{step.level}</Text>
            </View>

            {/* Step Card */}
            <View style={[styles.stepCard, { borderLeftColor: step.color }]}>
              <View style={styles.stepCardInner}>
                <View style={[styles.stepIconBox, { backgroundColor: step.bg }]}>
                  <Icon name={step.icon} size={20} color={step.color} />
                </View>
                <View style={styles.stepTextCol}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
                  <Text style={styles.stepDetail}>{step.detail}</Text>
                </View>
              </View>
            </View>

            {/* Connector to next step */}
            {idx < MAP_STEPS.length - 1 && (
              <Connector color={MAP_STEPS[idx + 1].color} />
            )}
          </View>
        ))}

        {/* Call to Action */}
        <View style={styles.ctaCard}>
          <Icon name="bolt" size={20} color={colors.primaryCoral} />
          <Text style={styles.ctaTitle}>Ready to start today's tasks?</Text>
          <Text style={styles.ctaSub}>Your first task is waiting — just 2 hours to stay on track for your goal!</Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={() => navigateTo('TodayTasks')}>
            <Text style={styles.ctaBtnText}>View Today's Tasks</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default GoalTodayMapScreen;

const styles = StyleSheet.create({
  screenWrapper: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.xs,
    backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  backBtn: { padding: 6, width: 36 },
  headerTitle: { ...typography.h3, color: colors.onSurface, fontWeight: '700' },
  scrollContent: { padding: spacing.md, paddingBottom: 100 },
  heroBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.primaryLight, borderRadius: rounded.xl,
    padding: spacing.md, marginBottom: spacing.lg,
    borderWidth: 1, borderColor: '#FFDDD6',
  },
  heroTextCol: { flex: 1 },
  heroTitle: { ...typography.labelMd, color: colors.primaryDark, fontWeight: '700' },
  heroSub: { ...typography.bodySmall, color: colors.primaryDark, opacity: 0.7, marginTop: 2 },
  stepWrapper: { marginBottom: 0 },
  levelBadge: {
    alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3,
    borderRadius: rounded.full, marginBottom: 4, marginLeft: 20,
  },
  levelText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  stepCard: {
    backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, borderWidth: 1, borderColor: colors.borderLight,
    borderLeftWidth: 4, marginLeft: 0,
  },
  stepCardInner: { flexDirection: 'row', gap: 12 },
  stepIconBox: { width: 42, height: 42, borderRadius: rounded.lg, alignItems: 'center', justifyContent: 'center' },
  stepTextCol: { flex: 1 },
  stepTitle: { ...typography.labelMd, color: colors.onSurface, fontWeight: '700', marginBottom: 2 },
  stepSubtitle: { ...typography.labelXs, color: colors.textMuted, fontWeight: '600', fontSize: 11, marginBottom: 4 },
  stepDetail: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 17 },
  connector: {
    height: 20, width: 2, marginLeft: 30,
    borderLeftWidth: 2, borderStyle: 'dashed',
    borderColor: colors.borderLight,
  },
  ctaCard: {
    backgroundColor: colors.primaryLight, borderRadius: rounded.xl,
    padding: spacing.lg, alignItems: 'center', gap: 8,
    borderWidth: 1, borderColor: '#FFDDD6', marginTop: spacing.md,
  },
  ctaTitle: { ...typography.labelLg, color: colors.primaryDark, fontWeight: '800', textAlign: 'center' },
  ctaSub: { ...typography.bodySmall, color: colors.primaryDark, textAlign: 'center', opacity: 0.8, lineHeight: 18 },
  ctaBtn: {
    backgroundColor: colors.primaryCoral, borderRadius: rounded.xl,
    paddingHorizontal: spacing.xl, paddingVertical: spacing.sm, marginTop: 4,
  },
  ctaBtnText: { ...typography.labelMd, color: '#FFFFFF', fontWeight: '700' },
});
