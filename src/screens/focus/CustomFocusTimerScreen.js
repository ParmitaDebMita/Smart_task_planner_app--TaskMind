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

const durationOptions = [
  { id: '15', label: '15 min', minutes: 15 },
  { id: '25', label: '25 min', minutes: 25 },
  { id: '45', label: '45 min', minutes: 45 },
  { id: '60', label: '60 min', minutes: 60 },
  { id: 'custom', label: 'Custom', minutes: 90 },
];

const subjectsList = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Literature'];

export const CustomFocusTimerScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const [selectedDuration, setSelectedDuration] = useState('25');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  const handleStartFocus = () => {
    showToast(`Focus session configured for ${selectedSubject}!`, 'success');
    navigateTo('FocusModeActivated');
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
        <Text style={styles.topBarTitle}>Custom Focus Timer</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Select Duration Section */}
        <View style={styles.sectionGroup}>
          <Text style={styles.sectionHeaderTitle}>Select Duration</Text>
          <View style={styles.optionsList}>
            {durationOptions.map((opt) => {
              const isSelected = selectedDuration === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[
                    styles.durationCard,
                    isSelected && styles.durationCardSelected,
                  ]}
                  onPress={() => setSelectedDuration(opt.id)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      isSelected && styles.radioCircleSelected,
                    ]}
                  >
                    {isSelected && <Icon name="check" size={14} color="#FFFFFF" />}
                  </View>
                  <Text
                    style={[
                      styles.durationLabel,
                      isSelected && styles.durationLabelSelected,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Select Subject Section */}
        <View style={styles.sectionGroup}>
          <Text style={styles.sectionHeaderTitle}>Select Subject</Text>
          <TouchableOpacity
            style={styles.subjectSelector}
            onPress={() => {
              const nextIdx = (subjectsList.indexOf(selectedSubject) + 1) % subjectsList.length;
              setSelectedSubject(subjectsList[nextIdx]);
            }}
            activeOpacity={0.8}
          >
            <View style={styles.subjectSelectorLeft}>
              <View style={[styles.subjectIconCircle, { backgroundColor: '#EFF6FF' }]}>
                <Icon name="school" size={18} color="#3B82F6" />
              </View>
              <Text style={styles.subjectSelectorText}>{selectedSubject}</Text>
            </View>
            <Icon name="expand_more" size={22} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Primary Action Button */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.startBtn}
            onPress={handleStartFocus}
            activeOpacity={0.88}
          >
            <Text style={styles.startBtnText}>Start Focus</Text>
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
  sectionGroup: {
    marginBottom: spacing.md,
  },
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 10,
  },
  optionsList: {
    gap: 8,
  },
  durationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  durationCardSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#93C5FD',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  radioCircleSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  durationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  durationLabelSelected: {
    color: '#1E293B',
    fontWeight: '800',
  },
  subjectSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  subjectSelectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  subjectIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectSelectorText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  actionWrapper: {
    marginTop: spacing.md,
  },
  startBtn: {
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
  startBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CustomFocusTimerScreen;
