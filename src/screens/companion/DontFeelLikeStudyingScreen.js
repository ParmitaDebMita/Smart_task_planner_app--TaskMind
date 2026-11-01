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
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

const REASONS = [
  { key: 'tired', label: 'Tired', screen: 'CareMode', hint: 'Let me set up an easy, lighter workload.' },
  { key: 'toomuch', label: 'Too much work', screen: 'SupportiveRecovery', hint: "We'll break this mountain into tiny steps." },
  { key: 'difficult', label: 'Difficult', screen: 'PushMeMode', hint: "Difficult doesn't mean impossible. Let's do 25 min." },
  { key: 'distracted', label: 'Distracted', screen: 'PushMeMode', hint: "Let's turn on Focus DND and start small." },
  { key: 'bored', label: 'Bored', screen: 'PushMeMode', hint: 'Just 5 minutes to get the dopamine flowing.' },
  { key: 'lost', label: "Don't know where to start", screen: 'SupportiveRecovery', hint: "I'll pick the easiest starting task for you." },
];

export const DontFeelLikeStudyingScreen = () => {
  const { navigateTo, showToast } = useTaskContext();
  const [selectedReason, setSelectedReason] = useState('difficult');

  const handleGetSupport = () => {
    const selected = REASONS.find((r) => r.key === selectedReason) || REASONS[2];
    showToast(selected.hint, 'info');
    navigateTo(selected.screen);
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
          <Text style={styles.headerTitle}>I Don't Feel Like Studying</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Title */}
        <Text style={styles.questionTitle}>What's stopping you?</Text>

        {/* Options List */}
        <View style={styles.optionsList}>
          {REASONS.map((item) => {
            const isSelected = selectedReason === item.key;
            return (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                ]}
                onPress={() => setSelectedReason(item.key)}
                activeOpacity={0.85}
              >
                <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* AI Insight Pill */}
        {selectedReason && (
          <View style={styles.insightBox}>
            <Icon name="psychology" size={18} color="#4F46E5" />
            <Text style={styles.insightText}>
              {REASONS.find((r) => r.key === selectedReason)?.hint}
            </Text>
          </View>
        )}

        {/* Action Button: Get Support */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleGetSupport}
            activeOpacity={0.88}
          >
            <Text style={styles.actionBtnText}>Get Support</Text>
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
  questionTitle: {
    ...typography.headlineLg,
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
  },
  optionsList: {
    gap: 12,
    marginBottom: spacing.md,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 14,
  },
  optionCardSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#F8FAFC',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: '#2563EB',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563EB',
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  optionTextSelected: {
    color: '#1E293B',
    fontWeight: '700',
  },
  insightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: rounded.xl,
    padding: 12,
    gap: 8,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  insightText: {
    flex: 1,
    fontSize: 13,
    color: '#3730A3',
    fontWeight: '500',
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

export default DontFeelLikeStudyingScreen;
