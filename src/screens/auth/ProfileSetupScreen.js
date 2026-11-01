import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Icon from '../../components/common/Icon';

export const ProfileSetupScreen = () => {
  const { user, setUser, navigateTo, showToast } = useTaskContext();

  const [name, setName] = useState(user?.name || 'Alex');
  const [studentType, setStudentType] = useState('High School');
  const [showStudentTypeModal, setShowStudentTypeModal] = useState(false);
  const [mainGoal, setMainGoal] = useState('Better Grades');
  const [showGoalModal, setShowGoalModal] = useState(false);

  const availableSubjects = [
    { name: 'Math', color: '#3B82F6', bg: '#EFF6FF' },
    { name: 'Physics', color: '#8B5CF6', bg: '#F5F3FF' },
    { name: 'Chemistry', color: '#10B981', bg: '#ECFDF5' },
    { name: 'CS', color: '#F59E0B', bg: '#FEF3C7' },
    { name: 'English', color: '#EC4899', bg: '#FDF2F8' },
  ];

  const [selectedSubjects, setSelectedSubjects] = useState(['Math', 'Physics', 'Chemistry']);
  const [studyPreference, setStudyPreference] = useState('Pomodoro');

  const toggleSubject = (subName) => {
    if (selectedSubjects.includes(subName)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(prev => prev.filter(s => s !== subName));
      } else {
        showToast('Keep at least one subject', 'info');
      }
    } else {
      setSelectedSubjects(prev => [...prev, subName]);
    }
  };

  const handleContinue = () => {
    if (setUser) {
      setUser(prev => ({
        ...prev,
        name: name.trim() || 'Alex',
        studentType,
        mainGoal,
        subjects: selectedSubjects,
        studyPreference,
      }));
    }
    showToast('Profile configured successfully!', 'success');
    navigateTo('HomeDashboard');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Let's set up your profile</Text>
        </View>

        {/* 1. Your Name */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Your Name</Text>
          <View style={styles.inputContainer}>
            <Icon name="person" size={20} color="#64748B" style={styles.fieldIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#94A3B8"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        {/* 2. Student Type */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Student Type</Text>
          <TouchableOpacity
            style={styles.selectorContainer}
            onPress={() => {
              const types = ['High School', 'University / College', 'Graduate Student', 'Self-Learner'];
              const nextIdx = (types.indexOf(studentType) + 1) % types.length;
              setStudentType(types[nextIdx]);
            }}
            activeOpacity={0.8}
          >
            <View style={styles.selectorLeft}>
              <Icon name="school" size={20} color="#64748B" style={styles.fieldIcon} />
              <Text style={styles.selectorText}>{studentType}</Text>
            </View>
            <Icon name="expand_more" size={22} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* 3. Main Goal */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Main Goal</Text>
          <TouchableOpacity
            style={styles.selectorContainer}
            onPress={() => {
              const goals = ['Better Grades', 'Manage Deadlines', 'Deep Focus & Study', 'Exam Prep'];
              const nextIdx = (goals.indexOf(mainGoal) + 1) % goals.length;
              setMainGoal(goals[nextIdx]);
            }}
            activeOpacity={0.8}
          >
            <View style={styles.selectorLeft}>
              <Icon name="track_changes" size={20} color="#64748B" style={styles.fieldIcon} />
              <Text style={styles.selectorText}>{mainGoal}</Text>
            </View>
            <Icon name="expand_more" size={22} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* 4. Subjects (you study) */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Subjects (you study)</Text>
          <View style={styles.chipsRow}>
            {availableSubjects.map((subject) => {
              const isSelected = selectedSubjects.includes(subject.name);
              return (
                <TouchableOpacity
                  key={subject.name}
                  style={[
                    styles.subjectChip,
                    {
                      backgroundColor: isSelected ? subject.bg : '#F8FAFC',
                      borderColor: isSelected ? subject.color : '#E2E8F0',
                    },
                  ]}
                  onPress={() => toggleSubject(subject.name)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.subjectDot,
                      { backgroundColor: isSelected ? subject.color : '#CBD5E1' },
                    ]}
                  />
                  <Text
                    style={[
                      styles.subjectText,
                      {
                        color: isSelected ? subject.color : '#64748B',
                        fontWeight: isSelected ? '700' : '500',
                      },
                    ]}
                  >
                    {subject.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 5. Study Preference */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Study Preference</Text>
          <View style={styles.preferenceRow}>
            {['Pomodoro', 'Custom', 'Flexible'].map((pref) => {
              const isSelected = studyPreference === pref;
              return (
                <TouchableOpacity
                  key={pref}
                  style={[
                    styles.prefPill,
                    isSelected && styles.prefPillActive,
                  ]}
                  onPress={() => setStudyPreference(pref)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.prefText,
                      isSelected && styles.prefTextActive,
                    ]}
                  >
                    {pref}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={handleContinue}
            activeOpacity={0.88}
          >
            <Text style={styles.continueBtnText}>Continue →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF9',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  headerTitle: {
    ...typography.headlineMd,
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  fieldGroup: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.labelMd,
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E4DC',
    borderRadius: rounded.xl,
    paddingHorizontal: spacing.md,
    height: 52,
  },
  fieldIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '500',
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E4DC',
    borderRadius: rounded.xl,
    paddingHorizontal: spacing.md,
    height: 52,
  },
  selectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorText: {
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '500',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: rounded.full,
    borderWidth: 1.5,
  },
  subjectDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 6,
  },
  subjectText: {
    fontSize: 13,
  },
  preferenceRow: {
    flexDirection: 'row',
    gap: 10,
  },
  prefPill: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.full,
    borderWidth: 1.5,
    borderColor: '#E8E4DC',
  },
  prefPillActive: {
    backgroundColor: '#FFEFEB',
    borderColor: colors.primaryCoral,
  },
  prefText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  prefTextActive: {
    color: colors.primaryCoral,
    fontWeight: '700',
  },
  buttonWrapper: {
    marginTop: spacing.lg,
  },
  continueBtn: {
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
  continueBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProfileSetupScreen;
