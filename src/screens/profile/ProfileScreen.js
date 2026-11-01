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
import TaskMindMascot from '../../components/common/TaskMindMascot';
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
      {/* Top Header matching Screen 10 */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigateTo('HomeDashboard')} style={styles.backBtn}>
          <Icon name="arrow_back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.topHeaderTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigateTo('Settings')} style={styles.backBtn}>
          <Icon name="more_vert" size={22} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card Hero matching Screen 10 */}
        <View style={styles.profileHeroCard}>
          <View style={styles.avatarMascotCircle}>
            <TaskMindMascot size={52} variant="happy" showBackground={false} />
          </View>
          <View style={styles.profileHeroInfo}>
            <Text style={styles.profileHeroName}>Alex</Text>
            <Text style={styles.profileHeroSubtitle}>Student • Grade 11</Text>
          </View>
          <TouchableOpacity onPress={() => showToast('Edit Profile', 'info')} style={styles.editIconBtn}>
            <Icon name="edit" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Batch 5 Profile Preference Rows matching Screen 10 */}
        <View style={styles.preferencesListCard}>
          {/* 1. Goals */}
          <TouchableOpacity style={styles.prefRow} onPress={() => navigateTo('Goals')}>
            <View style={[styles.prefIconBox, { backgroundColor: '#EDE9FE' }]}>
              <Icon name="flag" size={18} color="#8B5CF6" />
            </View>
            <View style={styles.prefTextCol}>
              <Text style={styles.prefTitle}>Goals</Text>
              <Text style={styles.prefSubtitle}>Score 90% in Exams</Text>
            </View>
            <Icon name="chevron_right" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          {/* 2. Study Time */}
          <TouchableOpacity style={styles.prefRow} onPress={() => navigateTo('ProductivityAnalytics')}>
            <View style={[styles.prefIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Icon name="timer" size={18} color="#3B82F6" />
            </View>
            <View style={styles.prefTextCol}>
              <Text style={styles.prefTitle}>Study Time</Text>
              <Text style={styles.prefSubtitle}>14h/week</Text>
            </View>
            <Icon name="chevron_right" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          {/* 3. Language */}
          <TouchableOpacity style={styles.prefRow} onPress={() => showToast('Language: English (US)', 'info')}>
            <View style={[styles.prefIconBox, { backgroundColor: '#ECFDF5' }]}>
              <Icon name="language" size={18} color="#10B981" />
            </View>
            <View style={styles.prefTextCol}>
              <Text style={styles.prefTitle}>Language</Text>
              <Text style={styles.prefSubtitle}>English (US)</Text>
            </View>
            <Icon name="chevron_right" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          {/* 4. Text Size */}
          <TouchableOpacity style={styles.prefRow} onPress={() => navigateTo('Personalization')}>
            <View style={[styles.prefIconBox, { backgroundColor: '#FEF3C7' }]}>
              <Icon name="text_fields" size={18} color="#F59E0B" />
            </View>
            <View style={styles.prefTextCol}>
              <Text style={styles.prefTitle}>Text Size</Text>
              <Text style={styles.prefSubtitle}>Medium</Text>
            </View>
            <Icon name="chevron_right" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          {/* 5. Accessibility */}
          <TouchableOpacity style={styles.prefRow} onPress={() => navigateTo('Settings')}>
            <View style={[styles.prefIconBox, { backgroundColor: '#F1F5F9' }]}>
              <Icon name="accessibility" size={18} color="#64748B" />
            </View>
            <View style={styles.prefTextCol}>
              <Text style={styles.prefTitle}>Accessibility</Text>
              <Text style={styles.prefSubtitle}>High Contrast</Text>
            </View>
            <Icon name="chevron_right" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          {/* 6. Motivation */}
          <TouchableOpacity style={styles.prefRow} onPress={() => navigateTo('Personalization')}>
            <View style={[styles.prefIconBox, { backgroundColor: '#FFEFEB' }]}>
              <Icon name="volunteer_activism" size={18} color="#FF5B37" />
            </View>
            <View style={styles.prefTextCol}>
              <Text style={styles.prefTitle}>Motivation</Text>
              <Text style={styles.prefSubtitle}>Encouraging</Text>
            </View>
            <Icon name="chevron_right" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          {/* 7. AI Personality */}
          <TouchableOpacity style={styles.prefRow} onPress={() => navigateTo('Personalization')}>
            <View style={[styles.prefIconBox, { backgroundColor: '#EDE9FE' }]}>
              <Icon name="smart_toy" size={18} color="#8B5CF6" />
            </View>
            <View style={styles.prefTextCol}>
              <Text style={styles.prefTitle}>AI Personality</Text>
              <Text style={styles.prefSubtitle}>Caring</Text>
            </View>
            <Icon name="chevron_right" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          {/* 8. Data Permissions */}
          <TouchableOpacity style={[styles.prefRow, { borderBottomWidth: 0 }]} onPress={() => navigateTo('Settings')}>
            <View style={[styles.prefIconBox, { backgroundColor: '#FEE2E2' }]}>
              <Icon name="lock" size={18} color="#EF4444" />
            </View>
            <View style={styles.prefTextCol}>
              <Text style={styles.prefTitle}>Data Permissions</Text>
              <Text style={styles.prefSubtitle}>Manage your data</Text>
            </View>
            <Icon name="chevron_right" size={20} color="#CBD5E1" />
          </TouchableOpacity>
        </View>
        {/* Academic Degree & GPA Card */}
        <View style={styles.profileCard}>
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

        {/* Personalization Shortcut */}
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigateTo('Personalization')}
        >
          <Icon name="palette" size={20} color="#8B5CF6" />
          <Text style={styles.settingsBtnText}>Personalization</Text>
          <Icon name="chevron_right" size={20} color="#94A3B8" />
        </TouchableOpacity>

        {/* Mascot Selection Shortcut */}
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigateTo('MascotSelection')}
        >
          <Icon name="pets" size={20} color="#FF5B37" />
          <Text style={styles.settingsBtnText}>Choose Your Mascot</Text>
          <Icon name="chevron_right" size={20} color="#94A3B8" />
        </TouchableOpacity>

        {/* Account Settings Shortcut */}
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigateTo('Settings')}
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
    backgroundColor: '#FFFDF9',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    padding: 6,
    width: 36,
  },
  topHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 110,
    gap: 14,
  },
  profileHeroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarMascotCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF5F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  profileHeroInfo: {
    flex: 1,
  },
  profileHeroName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  profileHeroSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  editIconBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
  },
  preferencesListCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  prefIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  prefTextCol: {
    flex: 1,
  },
  prefTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  prefSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
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
