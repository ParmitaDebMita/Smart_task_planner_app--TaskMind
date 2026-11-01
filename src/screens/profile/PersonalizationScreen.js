import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';
import TaskMindMascot from '../../components/common/TaskMindMascot';

const THEMES = [
  { id: 'light', label: 'Light', color: '#FDFBF7', borderColor: '#FF5B37' },
  { id: 'cream', label: 'Cream', color: '#FFF8F0', borderColor: '#F59E0B' },
  { id: 'cool', label: 'Cool', color: '#F0F4FF', borderColor: '#3B82F6' },
];

const MOTIVATION_STYLES = [
  { id: 'supportive', label: 'Supportive', desc: 'Gentle encouragement', icon: 'favorite' },
  { id: 'firm', label: 'Firm', desc: 'Direct & no-nonsense', icon: 'gavel' },
  { id: 'balanced', label: 'Balanced', desc: 'Mix of both', icon: 'balance' },
];

const AI_PERSONALITIES = [
  { id: 'caring', label: 'Caring Friend', icon: 'volunteer_activism' },
  { id: 'coach', label: 'Study Coach', icon: 'sports' },
  { id: 'mentor', label: 'Wise Mentor', icon: 'psychology' },
];

export const PersonalizationScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const [selectedTheme, setSelectedTheme] = useState('light');
  const [greeting, setGreeting] = useState('Good Morning');
  const [textSize, setTextSize] = useState('medium');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [motivationStyle, setMotivationStyle] = useState('balanced');
  const [aiPersonality, setAiPersonality] = useState('caring');

  const handleSave = () => {
    showToast('Personalization saved!', 'success');
  };

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('Profile')} style={styles.backBtn}>
          <Icon name="arrow_back" size={22} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personalization</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Mascot Preference */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="pets" size={18} color={colors.primaryCoral} />
            <Text style={styles.cardTitle}>Mascot Companion</Text>
          </View>
          <View style={styles.mascotPreview}>
            <TaskMindMascot size={80} variant="happy" showBackground />
            <View style={styles.mascotInfo}>
              <Text style={styles.mascotName}>Classic Orbi</Text>
              <Text style={styles.mascotDesc}>Your current companion</Text>
              <TouchableOpacity style={styles.changeMascotBtn} onPress={() => navigateTo('MascotSelection')}>
                <Text style={styles.changeMascotText}>Change Mascot →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Theme */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="palette" size={18} color="#8B5CF6" />
            <Text style={styles.cardTitle}>Theme</Text>
          </View>
          <View style={styles.themeRow}>
            {THEMES.map(t => (
              <TouchableOpacity
                key={t.id}
                style={[
                  styles.themeOption,
                  { backgroundColor: t.color },
                  selectedTheme === t.id && { borderColor: t.borderColor, borderWidth: 2 },
                ]}
                onPress={() => setSelectedTheme(t.id)}
              >
                <Text style={styles.themeLabel}>{t.label}</Text>
                {selectedTheme === t.id && <Icon name="check_circle" size={14} color={t.borderColor} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Greeting */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="waving_hand" size={18} color="#F59E0B" />
            <Text style={styles.cardTitle}>Greeting Style</Text>
          </View>
          <View style={styles.chipRow}>
            {['Good Morning', 'Hey there', 'What\'s up', 'Hello'].map(g => (
              <TouchableOpacity
                key={g}
                style={[styles.chip, greeting === g && styles.chipActive]}
                onPress={() => setGreeting(g)}
              >
                <Text style={[styles.chipText, greeting === g && styles.chipTextActive]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Text Size */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="text_fields" size={18} color="#3B82F6" />
            <Text style={styles.cardTitle}>Text Size</Text>
          </View>
          <View style={styles.chipRow}>
            {[
              { id: 'small', label: 'Small', sample: 'Aa' },
              { id: 'medium', label: 'Medium', sample: 'Aa' },
              { id: 'large', label: 'Large', sample: 'Aa' },
            ].map(s => (
              <TouchableOpacity
                key={s.id}
                style={[styles.sizeChip, textSize === s.id && styles.sizeChipActive]}
                onPress={() => setTextSize(s.id)}
              >
                <Text style={[
                  styles.sizeSample,
                  { fontSize: s.id === 'small' ? 12 : s.id === 'medium' ? 15 : 18 },
                  textSize === s.id && styles.sizeSampleActive,
                ]}>{s.sample}</Text>
                <Text style={[styles.sizeLabel, textSize === s.id && styles.sizeLabelActive]}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Animations & Sound */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="tune" size={18} color="#10B981" />
            <Text style={styles.cardTitle}>Effects</Text>
          </View>
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Animations</Text>
              <Text style={styles.toggleDesc}>Micro-interactions & transitions</Text>
            </View>
            <Switch
              value={animationsEnabled}
              onValueChange={setAnimationsEnabled}
              trackColor={{ false: '#CBD5E1', true: '#FFD5CC' }}
              thumbColor={animationsEnabled ? colors.primaryCoral : '#94A3B8'}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Sound Effects</Text>
              <Text style={styles.toggleDesc}>Task completion & notification sounds</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#CBD5E1', true: '#FFD5CC' }}
              thumbColor={soundEnabled ? colors.primaryCoral : '#94A3B8'}
            />
          </View>
        </View>

        {/* Motivation Style */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="emoji_emotions" size={18} color="#FF5B37" />
            <Text style={styles.cardTitle}>Motivation Style</Text>
          </View>
          {MOTIVATION_STYLES.map(m => (
            <TouchableOpacity
              key={m.id}
              style={[styles.optionRow, motivationStyle === m.id && styles.optionRowActive]}
              onPress={() => setMotivationStyle(m.id)}
            >
              <Icon name={m.icon} size={18} color={motivationStyle === m.id ? colors.primaryCoral : colors.textMuted} />
              <View style={styles.optionInfo}>
                <Text style={[styles.optionLabel, motivationStyle === m.id && { color: colors.primaryCoral }]}>{m.label}</Text>
                <Text style={styles.optionDesc}>{m.desc}</Text>
              </View>
              {motivationStyle === m.id && <Icon name="check_circle" size={18} color={colors.primaryCoral} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* AI Personality */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="smart_toy" size={18} color="#8B5CF6" />
            <Text style={styles.cardTitle}>AI Personality</Text>
          </View>
          <View style={styles.chipRow}>
            {AI_PERSONALITIES.map(p => (
              <TouchableOpacity
                key={p.id}
                style={[styles.personalityChip, aiPersonality === p.id && styles.personalityChipActive]}
                onPress={() => setAiPersonality(p.id)}
              >
                <Icon name={p.icon} size={16} color={aiPersonality === p.id ? '#FFFFFF' : colors.textSecondary} />
                <Text style={[styles.personalityText, aiPersonality === p.id && styles.personalityTextActive]}>{p.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Language placeholder */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="language" size={18} color="#3B82F6" />
            <Text style={styles.cardTitle}>Language</Text>
          </View>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionLabel}>English (US)</Text>
            <Icon name="check_circle" size={18} color={colors.primaryCoral} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default PersonalizationScreen;

const styles = StyleSheet.create({
  screenWrapper: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.xs,
    backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  backBtn: { padding: 6, width: 36 },
  headerTitle: { ...typography.headlineMd, color: colors.onSurface, fontWeight: '700' },
  saveBtn: { paddingHorizontal: 12, paddingVertical: 4, backgroundColor: colors.primaryCoral, borderRadius: rounded.full },
  saveBtnText: { ...typography.labelSm, color: '#FFFFFF', fontWeight: '700' },
  scrollContent: { padding: spacing.md, paddingBottom: 100 },
  card: {
    backgroundColor: colors.surface, borderRadius: rounded.xl,
    padding: spacing.md, marginBottom: spacing.sm,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.sm },
  cardTitle: { ...typography.titleMd, color: colors.onSurface, fontWeight: '700' },
  mascotPreview: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  mascotInfo: { flex: 1 },
  mascotName: { ...typography.titleMd, color: colors.onSurface, fontWeight: '700' },
  mascotDesc: { ...typography.bodySm, color: colors.textSecondary, marginBottom: 6 },
  changeMascotBtn: { alignSelf: 'flex-start' },
  changeMascotText: { ...typography.labelSm, color: colors.primaryCoral, fontWeight: '700' },
  themeRow: { flexDirection: 'row', gap: 10 },
  themeOption: {
    flex: 1, borderRadius: rounded.lg, padding: spacing.sm,
    alignItems: 'center', gap: 4, borderWidth: 1, borderColor: colors.borderLight,
  },
  themeLabel: { ...typography.labelSm, color: colors.onSurface, fontWeight: '600' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: rounded.full,
    backgroundColor: colors.surfaceDim, borderWidth: 1, borderColor: colors.borderLight,
  },
  chipActive: { backgroundColor: colors.primaryCoral, borderColor: colors.primaryCoral },
  chipText: { ...typography.labelSm, color: colors.textSecondary, fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
  sizeChip: {
    flex: 1, paddingVertical: 10, borderRadius: rounded.lg,
    alignItems: 'center', backgroundColor: colors.surfaceDim,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  sizeChipActive: { backgroundColor: colors.primaryLight, borderColor: colors.primaryCoral },
  sizeSample: { fontWeight: '700', color: colors.textSecondary },
  sizeSampleActive: { color: colors.primaryCoral },
  sizeLabel: { ...typography.labelMd, color: colors.textMuted, fontSize: 10, marginTop: 2 },
  sizeLabelActive: { color: colors.primaryCoral },
  toggleRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  toggleInfo: { flex: 1 },
  toggleLabel: { ...typography.labelLg, color: colors.onSurface, fontWeight: '600' },
  toggleDesc: { ...typography.labelMd, color: colors.textMuted, fontSize: 10 },
  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: 4 },
  optionRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 10, borderRadius: rounded.lg, paddingHorizontal: 8,
  },
  optionRowActive: { backgroundColor: colors.primaryLight },
  optionInfo: { flex: 1 },
  optionLabel: { ...typography.labelLg, color: colors.onSurface, fontWeight: '600' },
  optionDesc: { ...typography.labelMd, color: colors.textMuted, fontSize: 10 },
  personalityChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: rounded.full,
    backgroundColor: colors.surfaceDim, borderWidth: 1, borderColor: colors.borderLight,
  },
  personalityChipActive: { backgroundColor: '#8B5CF6', borderColor: '#8B5CF6' },
  personalityText: { ...typography.labelSm, color: colors.textSecondary, fontWeight: '600' },
  personalityTextActive: { color: '#FFFFFF' },
});
