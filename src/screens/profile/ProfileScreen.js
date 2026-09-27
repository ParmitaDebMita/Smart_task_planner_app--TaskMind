import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTaskContext } from '../../context/TaskContext';
import Icon from '../../components/common/Icon';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius, elevation } from '../../theme/spacing';

export default function ProfileScreen() {
  const { streakCount, navigateTo, showToast } = useTaskContext();

  const enrolledCourses = [
    { code: 'CS301', name: 'Database Management Systems', credits: 4, progress: 74, grade: 'A' },
    { code: 'CS402', name: 'Distributed Systems & Cloud', credits: 4, progress: 58, grade: 'A-' },
    { code: 'MATH302', name: 'Numerical Analysis & Stats', credits: 3, progress: 85, grade: 'A' },
    { code: 'EE210', name: 'IoT Systems & Embedded Hardware', credits: 3, progress: 62, grade: 'B+' },
  ];

  const badges = [
    { id: '1', title: 'Deep Work Master', desc: '40+ hours uninterrupted focus', icon: 'psychology', color: '#4F46E5', unlocked: true },
    { id: '2', title: '14-Day Streak', desc: 'Maintained 2-week active planner', icon: 'local_fire_department', color: '#EA580C', unlocked: true },
    { id: '3', title: 'Zero Overdue', desc: '100% on-time sprint submissions', icon: 'verified', color: '#16A34A', unlocked: true },
    { id: '4', title: 'Early Bird', desc: 'Completed 10 tasks before 8 AM', icon: 'wb_sunny', color: '#D97706', unlocked: false },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="Student Profile"
        subtitle="Academic performance & degree audit"
        showBack={true}
        onBack={() => navigateTo('home')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card Hero */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarLargeText}>AR</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Alex Rivera</Text>
              <Text style={styles.profileMajor}>B.S. Computer Science • Junior Year</Text>
              <Text style={styles.profileUniversity}>Stanford University (School of Engineering)</Text>
            </View>
          </View>

          <View style={styles.gpaBadgeRow}>
            <View style={styles.gpaPill}>
              <Icon name="school" size={14} color="#4F46E5" />
              <Text style={styles.gpaPillText}>GPA 3.88 / 4.00</Text>
            </View>
            <View style={styles.deansPill}>
              <Icon name="workspace_premium" size={14} color="#D97706" />
              <Text style={styles.deansPillText}>Dean's Honor List</Text>
            </View>
          </View>
        </View>

        {/* Key Stats Bar */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Icon name="local_fire_department" size={24} color="#EA580C" />
            <Text style={styles.statValue}>{streakCount} Days</Text>
            <Text style={styles.statLabel}>Active Streak</Text>
          </View>

          <View style={styles.statBox}>
            <Icon name="timer" size={24} color="#4F46E5" />
            <Text style={styles.statValue}>48 hrs</Text>
            <Text style={styles.statLabel}>Focus Time</Text>
          </View>

          <View style={styles.statBox}>
            <Icon name="task_alt" size={24} color="#16A34A" />
            <Text style={styles.statValue}>94%</Text>
            <Text style={styles.statLabel}>Completion</Text>
          </View>
        </View>

        {/* Enrolled Courses */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Enrolled Courses (Fall 2026)</Text>
          <TouchableOpacity onPress={() => showToast('Course management opened', 'info')}>
            <Text style={styles.sectionLink}>Manage</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.coursesList}>
          {enrolledCourses.map((course) => (
            <View key={course.code} style={styles.courseCard}>
              <View style={styles.courseHeader}>
                <View>
                  <View style={styles.courseCodeRow}>
                    <Text style={styles.courseCode}>{course.code}</Text>
                    <Text style={styles.courseCredits}>{course.credits} Credits</Text>
                  </View>
                  <Text style={styles.courseName}>{course.name}</Text>
                </View>
                <View style={styles.gradeBadge}>
                  <Text style={styles.gradeText}>{course.grade}</Text>
                </View>
              </View>

              <View style={styles.progressRow}>
                <View style={styles.progressBarTrack}>
                  <View style={[styles.progressBarFill, { width: `${course.progress}%` }]} />
                </View>
                <Text style={styles.progressPercentText}>{course.progress}% Syllabus</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Badges & Milestones */}
        <Text style={styles.sectionTitle}>Academic Badges</Text>
        <View style={styles.badgesGrid}>
          {badges.map((badge) => (
            <View
              key={badge.id}
              style={[styles.badgeCard, !badge.unlocked && styles.badgeCardLocked]}
            >
              <View style={[styles.badgeIconBox, { backgroundColor: badge.unlocked ? badge.color : '#94A3B8' }]}>
                <Icon name={badge.unlocked ? badge.icon : 'lock'} size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.badgeTitle}>{badge.title}</Text>
              <Text style={styles.badgeDesc}>{badge.desc}</Text>
            </View>
          ))}
        </View>

        {/* Account Settings Shortcut */}
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigateTo('settings')}
        >
          <Icon name="settings" size={20} color="#4F46E5" />
          <Text style={styles.settingsBtnText}>Account & App Preferences</Text>
          <Icon name="chevron_right" size={20} color="#94A3B8" />
        </TouchableOpacity>
      </ScrollView>

      <BottomNav currentScreen="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 100,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
    ...elevation.sm,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarLargeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  profileMajor: {
    fontSize: 13,
    color: '#4F46E5',
    fontWeight: '600',
    marginTop: 2,
  },
  profileUniversity: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  gpaBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: spacing.sm,
  },
  gpaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  gpaPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F46E5',
  },
  deansPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  deansPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...elevation.xs,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  sectionLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
  },
  coursesList: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...elevation.xs,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  courseCodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  courseCode: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4F46E5',
  },
  courseCredits: {
    fontSize: 11,
    color: '#64748B',
  },
  courseName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 2,
  },
  gradeBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  gradeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: borderRadius.full,
  },
  progressPercentText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  badgeCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...elevation.xs,
  },
  badgeCardLocked: {
    opacity: 0.6,
    backgroundColor: '#F8FAFC',
  },
  badgeIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  badgeDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  settingsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.lg,
  },
  settingsBtnText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginLeft: 10,
  },
});
