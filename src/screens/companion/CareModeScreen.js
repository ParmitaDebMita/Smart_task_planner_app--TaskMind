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

const CARE_ITEMS = [
  { icon: 'check_circle', label: 'Essential tasks', sub: 'Only what truly matters today', color: '#10B981', bg: '#ECFDF5' },
  { icon: 'remove_circle', label: 'Reduced workload', sub: 'Lighter schedule, lower stress', color: '#3B82F6', bg: '#EFF6FF' },
  { icon: 'bedtime', label: 'Suggested breaks', sub: 'Built-in recovery between efforts', color: '#8B5CF6', bg: '#F5F3FF' },
  { icon: 'fact_check', label: 'Simple plan', sub: 'One small manageable step at a time', color: '#F59E0B', bg: '#FEF3C7' },
];

export const CareModeScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const handleTakeABreak = () => {
    showToast('Care mode active. Prioritizing your peace & rest today. 💛', 'success');
    navigateTo('HomeDashboard');
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
          <Text style={styles.headerTitle}>Care Mode</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Mascot */}
        <View style={styles.mascotContainer}>
          <TaskMindMascot size={150} showBackground={true} variant="happy" />
        </View>

        {/* Main Message */}
        <Text style={styles.mainMessage}>
          You don't have to do{'\n'}everything today.
        </Text>

        {/* Care Items List */}
        <View style={styles.careItemsList}>
          {CARE_ITEMS.map((item, idx) => (
            <View key={idx} style={styles.careItem}>
              <View style={[styles.careIconBox, { backgroundColor: item.bg }]}>
                <Icon name={item.icon} size={18} color={item.color} />
              </View>
              <View style={styles.careTextCol}>
                <Text style={styles.careItemLabel}>{item.label}</Text>
                <Text style={styles.careItemSub}>{item.sub}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Action Button: Take a Break */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleTakeABreak}
            activeOpacity={0.88}
          >
            <Text style={styles.actionBtnText}>Take a Break</Text>
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
    backgroundColor: '#FFFDF9',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: spacing.md,
    paddingBottom: 96,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
    ...Platform.select({
      web: { boxSizing: 'border-box' },
    }),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  mascotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  mainMessage: {
    ...typography.headlineLg,
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: spacing.lg,
  },
  careItemsList: {
    gap: 12,
    marginBottom: spacing.xl,
  },
  careItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    gap: 14,
  },
  careIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  careTextCol: {
    flex: 1,
  },
  careItemLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  careItemSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  actionWrapper: {
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

export default CareModeScreen;
