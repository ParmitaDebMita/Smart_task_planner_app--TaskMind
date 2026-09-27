import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import AppLogo from '../../components/common/AppLogo';
import Icon from '../../components/common/Icon';

export const SignUpScreen = () => {
  const { navigateTo, showToast } = useTaskContext();
  const [name, setName] = useState('Alex Chen');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('Stanford University');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!name || !email || !password) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    showToast('Account created! Welcome to TaskMind 🎓', 'success');
    navigateTo('HomeDashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
      <View style={styles.container}>
        <View style={styles.brandHeader}>
          <AppLogo size={46} />
          <Text style={styles.title}>Join TaskMind</Text>
          <Text style={styles.subtitle}>Empower your academic journey with Gemini AI</Text>
        </View>

        <View style={styles.formCard}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Icon name="person" size={18} color={colors.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Alex Chen"
                placeholderTextColor={colors.outline}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>University / College Email</Text>
            <View style={styles.inputWrapper}>
              <Icon name="mail" size={18} color={colors.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="student@university.edu"
                placeholderTextColor={colors.outline}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>University Name</Text>
            <View style={styles.inputWrapper}>
              <Icon name="school" size={18} color={colors.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. Stanford University"
                placeholderTextColor={colors.outline}
                value={university}
                onChangeText={setUniversity}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Create Password</Text>
            <View style={styles.inputWrapper}>
              <Icon name="lock" size={18} color={colors.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="At least 8 characters"
                placeholderTextColor={colors.outline}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={handleSignUp}
            activeOpacity={0.85}
          >
            <Text style={styles.signUpBtnText}>Create Account</Text>
            <Icon name="arrow_forward" size={18} color={colors.onPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigateTo('Login')}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.headlineMd,
    color: colors.onSurface,
    marginTop: spacing.md,
    fontWeight: '700',
  },
  subtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.lg,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
    gap: spacing.md,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.md,
    paddingHorizontal: spacing.sm,
    height: 46,
  },
  inputIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    ...typography.bodyMd,
    color: colors.onSurface,
    height: '100%',
  },
  signUpBtn: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: 6,
    ...shadows.xs,
  },
  signUpBtnText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  signInLink: {
    ...typography.labelMd,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
});

export default SignUpScreen;
