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

export const EmergencyExamModeScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const [examName, setExamName] = useState('Physics Final Exam');
  const [daysLeft, setDaysLeft] = useState(7);
  const [syllabusProgress, setSyllabusProgress] = useState(45);

  const prioritiesList = [
    { title: 'Must Study', desc: 'Newtonian Dynamics & Energy (40% weight)', color: '#EF4444', bg: '#FFEFEB' },
    { title: 'Important', desc: 'Thermodynamics & Heat Transfer', color: '#F59E0B', bg: '#FEF3C7' },
    { title: 'If Time', desc: 'Historical optics & optional bonus theory', color: '#10B981', bg: '#ECFDF5' },
  ];

  const handleGenerate = () => {
    showToast('Emergency Exam Sprint generated & added to Calendar!', 'success');
    navigateTo('AcademicCalendar');
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
        <Text style={styles.topBarTitle}>Emergency Exam Mode</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Countdown Hero Banner */}
        <View style={styles.countdownHero}>
          <View style={styles.countdownLeft}>
            <Text style={styles.countdownTag}>CRITICAL SPRINT</Text>
            <Text style={styles.examTitleText}>{examName}</Text>
            <Text style={styles.examSubtitle}>Targeting 85%+ score</Text>
          </View>
          <View style={styles.countdownCircle}>
            <Text style={styles.countdownNum}>{daysLeft}</Text>
            <Text style={styles.countdownUnit}>DAYS</Text>
          </View>
        </View>

        {/* Syllabus Status Card */}
        <View style={styles.syllabusCard}>
          <View style={styles.syllabusHeader}>
            <Text style={styles.syllabusTitle}>Syllabus Status</Text>
            <Text style={styles.syllabusPercent}>{syllabusProgress}% Prepared</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${syllabusProgress}%` }]} />
          </View>
          <View style={styles.syllabusStatsRow}>
            <Text style={styles.statSubText}>3 Topics Mastered</Text>
            <Text style={styles.statSubText}>2 Weak Topics to Fix</Text>
          </View>
        </View>

        {/* High-Yield Prioritization */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>High-Yield Prioritization</Text>
          <View style={styles.prioritiesList}>
            {prioritiesList.map((item) => (
              <View key={item.title} style={[styles.priorityRow, { backgroundColor: item.bg }]}>
                <View style={[styles.priorityBadge, { backgroundColor: '#FFFFFF' }]}>
                  <Text style={[styles.priorityBadgeText, { color: item.color }]}>
                    {item.title}
                  </Text>
                </View>
                <Text style={styles.priorityDescText}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Generated Emergency Plan Preview */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Daily Emergency Plan</Text>
          <View style={styles.planItems}>
            <View style={styles.planRow}>
              <Text style={styles.dayTag}>Day 1–3</Text>
              <Text style={styles.planDesc}>Deep focus on core high-weightage formulas</Text>
            </View>
            <View style={styles.planRow}>
              <Text style={styles.dayTag}>Day 4–5</Text>
              <Text style={styles.planDesc}>Past papers & mock exam timed sessions</Text>
            </View>
            <View style={styles.planRow}>
              <Text style={styles.dayTag}>Day 6–7</Text>
              <Text style={styles.planDesc}>Active recall flashcards & cognitive rest</Text>
            </View>
          </View>
        </View>

        {/* Primary Action Button */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.generateBtn}
            onPress={handleGenerate}
            activeOpacity={0.88}
          >
            <Text style={styles.generateBtnText}>Generate Emergency Plan</Text>
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
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  countdownHero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFEFEB',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#FFD5CC',
    padding: 16,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  countdownLeft: {
    flex: 1,
  },
  countdownTag: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primaryCoral,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  examTitleText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
  },
  examSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  countdownCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primaryCoral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownNum: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 22,
  },
  countdownUnit: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFEFEB',
  },
  syllabusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 14,
    marginBottom: spacing.md,
  },
  syllabusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  syllabusTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  syllabusPercent: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryCoral,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: rounded.full,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: colors.primaryCoral,
    borderRadius: rounded.full,
  },
  syllabusStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statSubText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 14,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 10,
  },
  prioritiesList: {
    gap: 8,
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: rounded.lg,
    gap: 10,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
  },
  priorityBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  priorityDescText: {
    fontSize: 12,
    color: '#1E293B',
    fontWeight: '600',
    flex: 1,
  },
  planItems: {
    gap: 8,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dayTag: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.md,
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  planDesc: {
    fontSize: 12,
    color: '#1E293B',
    fontWeight: '500',
    flex: 1,
  },
  actionWrapper: {
    marginTop: spacing.xs,
  },
  generateBtn: {
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
  generateBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default EmergencyExamModeScreen;
