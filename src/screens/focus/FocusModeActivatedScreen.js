import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import TaskMindMascot from '../../components/common/TaskMindMascot';
import Icon from '../../components/common/Icon';

export const FocusModeActivatedScreen = () => {
  const { navigateTo } = useTaskContext();

  const handleLetsGo = () => {
    navigateTo('PomodoroTimer');
  };

  return (
    <View style={styles.screenWrapper}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigateTo('StudyDashboard')}
          activeOpacity={0.8}
        >
          <Icon name="arrow_back" size={22} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Focus Mode Activated</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.content}>
        {/* Mascot Center Illustration */}
        <View style={styles.mascotContainer}>
          <TaskMindMascot size={180} showBackground={true} variant="studying" />
        </View>

        {/* Title Header */}
        <Text style={styles.activatedTitle}>Focus Mode Activated</Text>

        {/* 3 Status Points Checklist */}
        <View style={styles.checklistCard}>
          <View style={styles.checkItem}>
            <View style={styles.greenCheckCircle}>
              <Icon name="check" size={14} color="#FFFFFF" />
            </View>
            <Text style={styles.checkItemText}>Phone notifications silenced</Text>
          </View>

          <View style={styles.checkItem}>
            <View style={styles.greenCheckCircle}>
              <Icon name="check" size={14} color="#FFFFFF" />
            </View>
            <Text style={styles.checkItemText}>Distractions reduced</Text>
          </View>

          <View style={styles.checkItem}>
            <View style={styles.greenCheckCircle}>
              <Icon name="check" size={14} color="#FFFFFF" />
            </View>
            <Text style={styles.checkItemText}>Study session started</Text>
          </View>
        </View>

        {/* Primary Action Button: "Let's Go" */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.letsGoBtn}
            onPress={handleLetsGo}
            activeOpacity={0.88}
          >
            <Text style={styles.letsGoBtnText}>Let's Go</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#FFFDF9',
    justifyContent: 'space-between',
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  mascotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  activatedTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  checklistCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 16,
    gap: 12,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  greenCheckCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  actionSection: {
    width: '100%',
    maxWidth: 340,
    marginTop: spacing.md,
  },
  letsGoBtn: {
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
  letsGoBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FocusModeActivatedScreen;
