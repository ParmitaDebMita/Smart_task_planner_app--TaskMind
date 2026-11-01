import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

const PERIODS = ['Week', 'Month'];

// Simple bar chart using View
const BarChart = ({ data, color, maxVal }) => (
  <View style={styles.barChartRow}>
    {data.map((item, i) => {
      const pct = Math.round((item.value / maxVal) * 100);
      return (
        <View key={i} style={styles.barCol}>
          <Text style={styles.barValue}>{item.value}{item.unit || ''}</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { height: `${pct}%`, backgroundColor: color }]} />
          </View>
          <Text style={styles.barLabel}>{item.label}</Text>
        </View>
      );
    })}
  </View>
);

export const ProductivityAnalyticsScreen = () => {
  const { user, tasks, navigateTo } = useTaskContext();
  const [period, setPeriod] = useState('Week');

  const weekData = [
    { label: 'Mon', value: 2.5, unit: 'h' },
    { label: 'Tue', value: 3.0, unit: 'h' },
    { label: 'Wed', value: 1.5, unit: 'h' },
    { label: 'Thu', value: 4.0, unit: 'h' },
    { label: 'Fri', value: 2.0, unit: 'h' },
    { label: 'Sat', value: 3.5, unit: 'h' },
    { label: 'Sun', value: 1.0, unit: 'h' },
  ];

  const monthData = [
    { label: 'W1', value: 18, unit: 'h' },
    { label: 'W2', value: 22, unit: 'h' },
    { label: 'W3', value: 15, unit: 'h' },
    { label: 'W4', value: 24, unit: 'h' },
  ];

  const chartData = period === 'Week' ? weekData : monthData;
  const chartMax = period === 'Week' ? 4 : 25;

  const completionData = [
    { label: 'Mon', value: 80, unit: '%' },
    { label: 'Tue', value: 100, unit: '%' },
    { label: 'Wed', value: 60, unit: '%' },
    { label: 'Thu', value: 90, unit: '%' },
    { label: 'Fri', value: 75, unit: '%' },
    { label: 'Sat', value: 85, unit: '%' },
    { label: 'Sun', value: 40, unit: '%' },
  ];

  const procrastinationTimes = [
    { subject: 'Linear Algebra', delay: 2.5, color: '#F59E0B' },
    { subject: 'Data Mining', delay: 1.8, color: '#8B5CF6' },
    { subject: 'Web Dev', delay: 0.5, color: '#10B981' },
    { subject: 'IoT Lab', delay: 3.2, color: '#EF4444' },
  ];

  const completedTasks = tasks.filter(t => t.isCompleted).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 76;

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('ProgressDashboard')} style={styles.backBtn}>
          <Icon name="arrow_back" size={22} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Productivity Analytics</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Period Toggle */}
        <View style={styles.periodRow}>
          {PERIODS.map(p => (
            <TouchableOpacity
              key={p}
              style={[styles.periodBtn, period === p && styles.periodBtnActive]}
              onPress={() => setPeriod(p)}
            >
              <Text style={[styles.periodBtnText, period === p && styles.periodBtnTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* AI Insight Banner */}
        <View style={styles.insightBanner}>
          <Icon name="auto_awesome" size={18} color={colors.primaryCoral} />
          <Text style={styles.insightText}>
            Your best focus hours are <Text style={styles.insightBold}>7–10 PM</Text>. Thursday is your most productive day this week!
          </Text>
        </View>

        {/* Most Productive Hours */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="schedule" size={18} color={colors.accentBlue} />
            <Text style={styles.cardTitle}>Most Productive Hours</Text>
          </View>
          <BarChart data={[
            { label: '10am', value: 2.0, unit: 'h' },
            { label: '12pm', value: 3.5, unit: 'h' },
            { label: '2pm', value: 1.5, unit: 'h' },
            { label: '4pm', value: 4.0, unit: 'h' },
            { label: '6pm', value: 3.0, unit: 'h' },
            { label: '8pm', value: 2.5, unit: 'h' },
          ]} color={colors.accentBlue} maxVal={4} />
        </View>

        {/* Study Trends */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="trending_up" size={18} color="#8B5CF6" />
            <Text style={styles.cardTitle}>Study Trends</Text>
          </View>
          <BarChart data={chartData} color="#8B5CF6" maxVal={chartMax} />
        </View>

        {/* Completion Trends */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="task_alt" size={18} color={colors.accentGreen} />
            <Text style={styles.cardTitle}>Completion Trends</Text>
          </View>
          <BarChart data={completionData} color={colors.accentGreen} maxVal={100} />
        </View>

        {/* Procrastination Patterns matching Screen 2 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="psychology" size={18} color="#FF5B37" />
            <Text style={styles.cardTitle}>Procrastination Patterns</Text>
          </View>
          <View style={styles.procrastinationRow}>
            <Text style={styles.procrastinationSubject}>Evening</Text>
            <View style={styles.procrastinationBarTrack}>
              <View style={[styles.procrastinationBarFill, { width: '45%', backgroundColor: '#FF5B37' }]} />
            </View>
            <Text style={[styles.procrastinationDelay, { color: '#FF5B37' }]}>45%</Text>
          </View>
          <View style={styles.procrastinationRow}>
            <Text style={styles.procrastinationSubject}>Weekend</Text>
            <View style={styles.procrastinationBarTrack}>
              <View style={[styles.procrastinationBarFill, { width: '30%', backgroundColor: '#F59E0B' }]} />
            </View>
            <Text style={[styles.procrastinationDelay, { color: '#F59E0B' }]}>30%</Text>
          </View>
        </View>

        {/* AI Insights Card matching Screen 2 */}
        <View style={[styles.card, { backgroundColor: '#FDF4FF', borderColor: '#F0ABFC' }]}>
          <View style={styles.cardHeader}>
            <Icon name="auto_awesome" size={18} color="#C026D3" />
            <Text style={[styles.cardTitle, { color: '#86198F' }]}>AI Insights</Text>
          </View>
          <Text style={{ ...typography.bodySm, color: '#701A75', lineHeight: 20 }}>
            You study best in the morning. Try to avoid distractions at night. Protect your 10 AM to 2 PM window for highest cognitive retention!
          </Text>
        </View>

        {/* Weekly Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>📊 Weekly Summary</Text>
          <View style={styles.summaryGrid}>
            {[
              { label: 'Study Sessions', value: '14', icon: 'timer', color: colors.accentBlue },
              { label: 'Tasks Done', value: `${completedTasks}/${totalTasks}`, icon: 'check_circle', color: colors.accentGreen },
              { label: 'Focus Score', value: '87', icon: 'bolt', color: '#F59E0B' },
              { label: 'Streak', value: `${user.streakDays}d`, icon: 'local_fire_department', color: '#FF5B37' },
            ].map((stat, i) => (
              <View key={i} style={styles.summaryStatBox}>
                <Icon name={stat.icon} size={18} color={stat.color} />
                <Text style={[styles.summaryStatValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.summaryStatLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default ProductivityAnalyticsScreen;

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
  periodRow: {
    flexDirection: 'row', backgroundColor: colors.surfaceDim,
    borderRadius: rounded.full, padding: 3, marginBottom: spacing.md,
    alignSelf: 'center',
  },
  periodBtn: { paddingHorizontal: spacing.lg, paddingVertical: 6, borderRadius: rounded.full },
  periodBtnActive: { backgroundColor: colors.primaryCoral },
  periodBtnText: { ...typography.labelSm, color: colors.textSecondary, fontWeight: '600' },
  periodBtnTextActive: { color: '#FFFFFF' },
  insightBanner: {
    flexDirection: 'row', alignItems: 'flex-start', gap: spacing.xs,
    backgroundColor: colors.primaryLight, borderRadius: rounded.lg,
    padding: spacing.sm, marginBottom: spacing.md,
    borderLeftWidth: 3, borderLeftColor: colors.primaryCoral,
  },
  insightText: { ...typography.bodySmall, color: colors.primaryDark, flex: 1, lineHeight: 18 },
  insightBold: { fontWeight: '700' },
  card: {
    backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: spacing.sm },
  cardTitle: { ...typography.labelMd, color: colors.onSurface, fontWeight: '700' },
  barChartRow: { flexDirection: 'row', alignItems: 'flex-end', height: 100, gap: 4, marginBottom: 6 },
  barCol: { flex: 1, alignItems: 'center', height: '100%' },
  barValue: { ...typography.labelXs, color: colors.textSecondary, fontSize: 9, marginBottom: 2 },
  barTrack: {
    flex: 1, width: '80%', backgroundColor: colors.surfaceDim,
    borderRadius: 4, overflow: 'hidden', justifyContent: 'flex-end',
  },
  barFill: { width: '100%', borderRadius: 4, minHeight: 4 },
  barLabel: { ...typography.labelXs, color: colors.textMuted, fontSize: 9, marginTop: 3 },
  chartCaption: { ...typography.bodySmall, color: colors.textSecondary, textAlign: 'center' },
  chartCaptionBold: { fontWeight: '700', color: colors.onSurface },
  twoColRow: { flexDirection: 'row', marginBottom: spacing.md },
  metricCard: {
    backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.borderLight,
  },
  metricValue: { ...typography.h2, color: colors.onSurface, fontWeight: '800', marginVertical: 2 },
  metricLabel: { ...typography.labelXs, color: colors.textSecondary, textAlign: 'center', marginBottom: 6 },
  metricBar: {
    height: 4, backgroundColor: colors.surfaceDim, borderRadius: 2,
    width: '100%', overflow: 'hidden',
  },
  metricBarFill: { height: '100%', borderRadius: 2 },
  procrastinationCaption: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: spacing.sm },
  procrastinationRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  procrastinationSubject: { ...typography.labelSm, color: colors.onSurface, width: 90, fontSize: 11 },
  procrastinationBarTrack: {
    flex: 1, height: 8, backgroundColor: colors.surfaceDim,
    borderRadius: 4, overflow: 'hidden',
  },
  procrastinationBarFill: { height: '100%', borderRadius: 4 },
  procrastinationDelay: { ...typography.labelSm, fontWeight: '700', width: 28, textAlign: 'right' },
  summaryCard: {
    backgroundColor: colors.surfaceDim, borderRadius: rounded.xl,
    padding: spacing.md, marginBottom: spacing.md,
  },
  summaryTitle: { ...typography.labelMd, color: colors.onSurface, fontWeight: '700', marginBottom: spacing.sm },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  summaryStatBox: {
    flex: 1, minWidth: '44%', backgroundColor: colors.surface,
    borderRadius: rounded.lg, padding: spacing.sm, alignItems: 'center', gap: 2,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  summaryStatValue: { ...typography.h3, fontWeight: '800' },
  summaryStatLabel: { ...typography.labelXs, color: colors.textSecondary, textAlign: 'center', fontSize: 10 },
});
