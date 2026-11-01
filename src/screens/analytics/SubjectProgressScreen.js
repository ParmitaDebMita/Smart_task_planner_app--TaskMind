import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

const SUBJECTS = [
  {
    code: 'MATH101', name: 'Mathematics', color: '#3B82F6', bg: '#EFF6FF',
    progress: 85, studyHours: '12h 20m', weakArea: 'None', topics: 'Trigonometry, Calculus',
    strength: 'strong', icon: 'functions',
  },
  {
    code: 'PHYS101', name: 'Physics', color: '#FF5B37', bg: '#FFEFEB',
    progress: 72, studyHours: '9h 45m', weakArea: 'Optics', topics: 'Thermodynamics, Waves',
    strength: 'medium', icon: 'science',
  },
  {
    code: 'CHEM101', name: 'Chemistry', color: '#10B981', bg: '#ECFDF5',
    progress: 65, studyHours: '8h 10m', weakArea: 'Organic Chemistry', topics: 'Hydrocarbons, Bonding',
    strength: 'weak', icon: 'biotech',
  },
];

const strengthConfig = {
  strong: { label: 'Strong', color: '#10B981', bg: '#ECFDF5' },
  medium: { label: 'Medium', color: '#F59E0B', bg: '#FEF3C7' },
  weak: { label: 'Needs Focus', color: '#EF4444', bg: '#FEE2E2' },
};

export const SubjectProgressScreen = () => {
  const { navigateTo } = useTaskContext();

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('ProgressDashboard')} style={styles.backBtn}>
          <Icon name="arrow_back" size={22} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subject Progress</Text>
        <TouchableOpacity onPress={() => navigateTo('ProductivityAnalytics')} style={styles.backBtn}>
          <Icon name="more_vert" size={22} color={colors.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Subject Cards */}
        {SUBJECTS.map((sub, idx) => (
          <View key={idx} style={[styles.subjectCard, { borderLeftColor: sub.color }]}>
            {/* Card Header */}
            <View style={styles.subjectCardHeader}>
              <View style={[styles.subjectIconBox, { backgroundColor: sub.bg }]}>
                <Icon name={sub.icon} size={20} color={sub.color} />
              </View>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectName}>{sub.name}</Text>
                <Text style={styles.subjectCode}>{sub.topics}</Text>
              </View>
              <Text style={[styles.progressPct, { color: sub.color }]}>{sub.progress}%</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressRow}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${sub.progress}%`, backgroundColor: sub.color }]} />
              </View>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statPill}>
                <Icon name="schedule" size={12} color={colors.textMuted} />
                <Text style={styles.statPillText}>Study Time: {sub.studyHours}</Text>
              </View>
              <View style={styles.statPill}>
                <Icon name="error_outline" size={12} color={sub.weakArea === 'None' ? '#10B981' : '#EF4444'} />
                <Text style={[styles.statPillText, { color: sub.weakArea === 'None' ? '#10B981' : '#EF4444' }]}>
                  Weak Area: {sub.weakArea}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* Accuracy & Retention Summary Cards matching Screen 3 */}
        <View style={styles.summaryTwoCol}>
          <View style={styles.summaryColCard}>
            <Text style={styles.summaryColLabel}>Accuracy</Text>
            <Text style={[styles.summaryColVal, { color: '#3B82F6' }]}>42%</Text>
          </View>
          <View style={styles.summaryColCard}>
            <Text style={styles.summaryColLabel}>Retention</Text>
            <Text style={[styles.summaryColVal, { color: '#10B981' }]}>58%</Text>
          </View>
        </View>

        {/* AI Insights Card matching Screen 3 */}
        <View style={[styles.aiCard, { backgroundColor: '#FDF4FF', borderColor: '#F0ABFC' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Icon name="auto_awesome" size={16} color="#C026D3" />
            <Text style={{ ...typography.labelMd, color: '#86198F', fontWeight: '700' }}>AI Insights</Text>
          </View>
          <Text style={{ ...typography.bodySm, color: '#701A75', lineHeight: 19 }}>
            You study best in the morning. Try to avoid distractions at night. Focus on Optics for Physics to boost retention!
          </Text>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default SubjectProgressScreen;

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
  overviewStrip: {
    flexDirection: 'row', backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, marginBottom: spacing.md, alignItems: 'center', justifyContent: 'space-around',
    borderWidth: 1, borderColor: colors.borderLight,
  },
  overviewStat: { alignItems: 'center', flex: 1 },
  overviewVal: { ...typography.h3, fontWeight: '800', color: colors.onSurface },
  overviewLabel: { ...typography.labelXs, color: colors.textSecondary, fontSize: 10 },
  overviewDivider: { width: 1, height: 30, backgroundColor: colors.borderLight },
  aiCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: colors.primaryLight, borderRadius: rounded.lg,
    padding: spacing.sm, marginBottom: spacing.md,
    borderLeftWidth: 3, borderLeftColor: colors.primaryCoral,
  },
  aiText: { ...typography.bodySmall, color: colors.primaryDark, flex: 1, lineHeight: 18 },
  aiBold: { fontWeight: '700' },
  subjectCard: {
    backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, marginBottom: spacing.sm,
    borderWidth: 1, borderColor: colors.borderLight,
    borderLeftWidth: 4,
  },
  subjectCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: spacing.sm },
  subjectIconBox: { width: 40, height: 40, borderRadius: rounded.lg, alignItems: 'center', justifyContent: 'center' },
  subjectInfo: { flex: 1 },
  subjectCode: { ...typography.labelXs, color: colors.textMuted, fontWeight: '600', fontSize: 10 },
  subjectName: { ...typography.labelMd, color: colors.onSurface, fontWeight: '700' },
  strengthBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: rounded.full },
  strengthText: { fontSize: 10, fontWeight: '700' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  progressTrack: { flex: 1, height: 8, backgroundColor: colors.surfaceDim, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  progressPct: { ...typography.labelSm, fontWeight: '800', width: 35, textAlign: 'right' },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  statPill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.surfaceDim, borderRadius: rounded.full,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  statPillText: { ...typography.labelXs, color: colors.textSecondary, fontSize: 10 },
  summaryTwoCol: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: spacing.md,
  },
  summaryColCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: rounded.xl,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  summaryColLabel: {
    ...typography.labelSm,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  summaryColVal: {
    ...typography.headlineMd,
    fontWeight: '800',
  },
  aiCard: {
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
});
