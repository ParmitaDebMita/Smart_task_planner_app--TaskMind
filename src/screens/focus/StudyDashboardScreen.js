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
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

export const StudyDashboardScreen = () => {
  const { user, focusSession, navigateTo, showToast } = useTaskContext();

  const recentSessions = [
    { id: '1', subject: 'Math', duration: '45m', color: '#3B82F6' },
    { id: '2', subject: 'Physics', duration: '20m', color: '#F97316' },
    { id: '3', subject: 'Chemistry', duration: '25m', color: '#EF4444' },
  ];

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header: Greeting & Flame Streak Badge */}
        <View style={styles.headerRow}>
          <View style={styles.greetingCol}>
            <Text style={styles.greetingTitle}>
              Good Morning, {user?.name ? user.name.split(' ')[0] : 'Alex'}!
            </Text>
            <Text style={styles.sunEmoji}>☀️</Text>
          </View>
          <View style={styles.flameBadge}>
            <Icon name="local_fire_department" size={18} color="#F97316" fill />
            <Text style={styles.flameText}>{user?.streakDays || 5}</Text>
          </View>
        </View>

        {/* Card 1: Total Study Time */}
        <View style={styles.heroTimeCard}>
          <View style={styles.heroTimeLeft}>
            <View style={styles.heroTimeIconCircle}>
              <Icon name="timer" size={20} color="#8B5CF6" />
            </View>
            <View style={styles.heroTimeTextCol}>
              <Text style={styles.heroTimeLabel}>Total Study Time</Text>
              <Text style={styles.heroTimeValue}>3h 45m</Text>
            </View>
          </View>
        </View>

        {/* Card 2: Recent Subject */}
        <TouchableOpacity
          style={styles.subjectCard}
          onPress={() => navigateTo('CustomFocusTimer')}
          activeOpacity={0.85}
        >
          <View style={styles.subjectCardLeft}>
            <View style={[styles.subjectIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Icon name="menu_book" size={18} color="#3B82F6" />
            </View>
            <View>
              <Text style={styles.cardSubLabel}>Recent Subject</Text>
              <Text style={styles.cardMainTitle}>Mathematics</Text>
            </View>
          </View>
          <Icon name="chevron_right" size={20} color="#CBD5E1" />
        </TouchableOpacity>

        {/* Card 3: Next Session */}
        <View style={styles.nextSessionCard}>
          <View style={[styles.nextSessionIconBox, { backgroundColor: '#ECFDF5' }]}>
            <Icon name="calendar_today" size={18} color="#10B981" />
          </View>
          <View>
            <Text style={styles.cardSubLabel}>Next Session</Text>
            <Text style={styles.cardMainTitle}>10:00 AM – 11:00 AM</Text>
          </View>
        </View>

        {/* Card 4: Recent Sessions List */}
        <View style={styles.recentSessionsCard}>
          <Text style={styles.recentSessionsHeader}>Recent Sessions</Text>
          <View style={styles.recentList}>
            {recentSessions.map((s) => (
              <View key={s.id} style={styles.recentRow}>
                <View style={styles.recentSubjectCol}>
                  <View style={[styles.recentDot, { backgroundColor: s.color }]} />
                  <Text style={styles.recentSubjectText}>{s.subject}</Text>
                </View>
                <Text style={styles.recentDurationText}>{s.duration}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Start Section */}
        <View style={styles.quickStartSection}>
          <Text style={styles.quickStartHeader}>Quick Start</Text>
          <View style={styles.quickStartRow}>
            {/* Pomodoro */}
            <TouchableOpacity
              style={[styles.quickStartBtn, { backgroundColor: '#FFEFEB', borderColor: '#FFD5CC' }]}
              onPress={() => navigateTo('PomodoroTimer')}
              activeOpacity={0.85}
            >
              <View style={[styles.quickStartIconCircle, { backgroundColor: '#FFD5CC' }]}>
                <Icon name="timer" size={18} color={colors.primaryCoral} />
              </View>
              <Text style={[styles.quickStartBtnLabel, { color: colors.primaryCoral }]}>Pomodoro</Text>
            </TouchableOpacity>

            {/* Stopwatch */}
            <TouchableOpacity
              style={[styles.quickStartBtn, { backgroundColor: '#F5F3FF', borderColor: '#DDD6FE' }]}
              onPress={() => navigateTo('Stopwatch')}
              activeOpacity={0.85}
            >
              <View style={[styles.quickStartIconCircle, { backgroundColor: '#DDD6FE' }]}>
                <Icon name="hourglass_top" size={18} color="#8B5CF6" />
              </View>
              <Text style={[styles.quickStartBtnLabel, { color: '#8B5CF6' }]}>Stopwatch</Text>
            </TouchableOpacity>

            {/* Deep Study */}
            <TouchableOpacity
              style={[styles.quickStartBtn, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}
              onPress={() => navigateTo('DeepStudyMode')}
              activeOpacity={0.85}
            >
              <View style={[styles.quickStartIconCircle, { backgroundColor: '#A7F3D0' }]}>
                <Icon name="spa" size={18} color="#059669" />
              </View>
              <Text style={[styles.quickStartBtnLabel, { color: '#059669' }]}>Deep Study</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#FFFDF9',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: 96,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  greetingCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  greetingTitle: {
    ...typography.headlineMd,
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
  },
  sunEmoji: {
    fontSize: 20,
  },
  flameBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#FFEDD5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    gap: 4,
  },
  flameText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#F97316',
  },
  heroTimeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 16,
    marginBottom: 10,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 8px rgba(30, 41, 59, 0.03)',
      },
      default: {
        shadowColor: '#1E293B',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
      },
    }),
  },
  heroTimeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heroTimeIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTimeTextCol: {
    flex: 1,
  },
  heroTimeLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  heroTimeValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 2,
  },
  subjectCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 14,
    marginBottom: 10,
  },
  subjectCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  subjectIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSubLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  cardMainTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 1,
  },
  nextSessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  nextSessionIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentSessionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 14,
    marginBottom: spacing.md,
  },
  recentSessionsHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 10,
  },
  recentList: {
    gap: 8,
  },
  recentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentSubjectCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  recentSubjectText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  recentDurationText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  quickStartSection: {
    marginTop: 2,
  },
  quickStartHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 8,
  },
  quickStartRow: {
    flexDirection: 'row',
    gap: 8,
  },
  quickStartBtn: {
    flex: 1,
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  quickStartIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickStartBtnLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default StudyDashboardScreen;
