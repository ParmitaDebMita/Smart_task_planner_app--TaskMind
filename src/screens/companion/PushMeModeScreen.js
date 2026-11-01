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
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import TaskMindMascot from '../../components/common/TaskMindMascot';
import Icon from '../../components/common/Icon';

export const PushMeModeScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const handleKeepGoing = () => {
    showToast("Starting 25-minute Deep Study sprint! Let's go! 🚀", 'success');
    navigateTo('PomodoroTimer');
  };

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigateTo('HomeDashboard')}
            activeOpacity={0.8}
          >
            <Icon name="arrow_back" size={22} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Push Me Mode</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Top Message (Reference Match) */}
        <View style={styles.topMessageBox}>
          <Text style={styles.topMessageTitle}>Come on. Just 25 minutes.</Text>
          <Text style={styles.topMessageSub}>Start now.</Text>
        </View>

        {/* Mascot Center with Sprouts/Playful Base */}
        <View style={styles.mascotContainer}>
          <TaskMindMascot size={170} showBackground={true} variant="encouraging" />
        </View>

        {/* Big Inspiring Statement (Reference Match) */}
        <View style={styles.statementBox}>
          <Text style={styles.statementText}>
            Your real limit is not{'\n'}what you think!
          </Text>
          <Text style={styles.statementSub}>Deep Work 25 minutes</Text>
          
          <View style={styles.timerPill}>
            <Icon name="timer" size={16} color="#D97706" />
            <Text style={styles.timerPillText}>25:00 Focus Block</Text>
          </View>
        </View>

        {/* Action Button: Keep Going */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleKeepGoing}
            activeOpacity={0.88}
          >
            <Text style={styles.actionBtnText}>Keep Going</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: spacing.md,
    paddingBottom: 96,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: { boxSizing: 'border-box' },
    }),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.xs,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.headlineMd,
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  topMessageBox: {
    alignItems: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  topMessageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
  },
  topMessageSub: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  mascotContainer: {
    marginVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statementBox: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    width: '100%',
  },
  statementText: {
    ...typography.headlineLg,
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 30,
  },
  statementSub: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 8,
    fontWeight: '500',
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: rounded.full,
    marginTop: 10,
    gap: 6,
  },
  timerPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  actionWrapper: {
    width: '100%',
    marginTop: spacing.xs,
  },
  actionBtn: {
    width: '100%',
    height: 52,
    backgroundColor: colors.primaryCoral,
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: '0px 4px 14px rgba(255, 91, 55, 0.35)' },
      default: {
        shadowColor: colors.primaryCoral,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 4,
      },
    }),
  },
  actionBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PushMeModeScreen;
