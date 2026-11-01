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

const NIGHT_REASONS = [
  { key: 'toolong', label: 'Too long' },
  { key: 'boring', label: 'Boring' },
  { key: 'difficult', label: "I don't understand it" },
  { key: 'tired', label: 'Tired' },
  { key: 'distracted', label: 'Distracted' },
  { key: 'nostart', label: "Don't know where to start" },
];

export const NightlyReflectionScreen = () => {
  const { navigateTo, showToast } = useTaskContext();
  const [selectedReason, setSelectedReason] = useState('tired');

  const handleSaveAndRest = () => {
    showToast('Reflection logged. Rest well! TaskMind has prepared tomorrow for you. 🌙', 'success');
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
          <Text style={styles.headerTitle}>Nightly Reflection</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Goal Context Banner (Reference Match) */}
        <View style={styles.goalBanner}>
          <View style={styles.moonIconBox}>
            <Icon name="bedtime" size={18} color="#8B5CF6" />
          </View>
          <View style={styles.goalTextCol}>
            <Text style={styles.goalBannerSub}>You're close to your goal!</Text>
            <Text style={styles.goalBannerTitle}>Physics Chapter 4</Text>
          </View>
        </View>

        {/* Question Title */}
        <Text style={styles.questionTitle}>What's stopping you?</Text>

        {/* Options List */}
        <View style={styles.optionsList}>
          {NIGHT_REASONS.map((reason) => {
            const isSelected = selectedReason === reason.key;
            return (
              <TouchableOpacity
                key={reason.key}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                ]}
                onPress={() => setSelectedReason(reason.key)}
                activeOpacity={0.85}
              >
                <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                  {reason.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Reflection Card (Reference Match) */}
        <View style={styles.reflectionCard}>
          <View style={styles.reflectionHeaderRow}>
            <Icon name="lightbulb" size={18} color="#0284C7" />
            <Text style={styles.reflectionTitle}>Reflection</Text>
          </View>
          <View style={styles.reflectionBullets}>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>Study for daily consistency, not marathon exhaustion</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>Tackle the easiest sub-task first tomorrow morning</Text>
            </View>
          </View>
        </View>

        {/* Action Button: Good Night */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.goodNightBtn}
            onPress={handleSaveAndRest}
            activeOpacity={0.88}
          >
            <Text style={styles.goodNightText}>Good Night & Save</Text>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 96,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
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
  goalBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: rounded.xl,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    gap: 12,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  moonIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalTextCol: {
    flex: 1,
  },
  goalBannerSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7C3AED',
  },
  goalBannerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E1B4B',
    marginTop: 2,
  },
  questionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: spacing.sm,
  },
  optionsList: {
    gap: 10,
    marginBottom: spacing.md,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  optionCardSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: '#FAF5FF',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: '#8B5CF6',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B5CF6',
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  optionLabelSelected: {
    color: '#1E293B',
    fontWeight: '700',
  },
  reflectionCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: rounded.xl,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#BAE6FD',
    marginBottom: spacing.lg,
  },
  reflectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  reflectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0369A1',
  },
  reflectionBullets: {
    gap: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  bulletDot: {
    fontSize: 14,
    color: '#0284C7',
    fontWeight: '700',
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    color: '#0369A1',
    lineHeight: 17,
  },
  actionWrapper: {
    marginTop: spacing.xs,
  },
  goodNightBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#6D28D9',
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: '0px 4px 14px rgba(109, 40, 217, 0.35)' },
      default: {
        shadowColor: '#6D28D9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 4,
      },
    }),
  },
  goodNightText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default NightlyReflectionScreen;
