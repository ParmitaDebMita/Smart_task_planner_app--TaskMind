import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path, Rect, G, Ellipse } from 'react-native-svg';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

// Mascot 1: Tasky with Headphones (Coral)
const TaskyHeadphones = ({ size = 90 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Circle cx="50" cy="52" r="32" fill="#FF5B37" />
    {/* Headphones band */}
    <Path d="M 20 48 C 20 22, 80 22, 80 48" stroke="#3B82F6" strokeWidth="6" fill="none" strokeLinecap="round" />
    {/* Ear pads */}
    <Rect x="14" y="44" width="10" height="20" rx="5" fill="#2563EB" />
    <Rect x="76" y="44" width="10" height="20" rx="5" fill="#2563EB" />
    {/* Eyes */}
    <Circle cx="40" cy="50" r="4" fill="#FFFFFF" />
    <Circle cx="41" cy="49" r="2" fill="#1E1B4B" />
    <Circle cx="60" cy="50" r="4" fill="#FFFFFF" />
    <Circle cx="61" cy="49" r="2" fill="#1E1B4B" />
    {/* Cheeks */}
    <Circle cx="34" cy="58" r="4" fill="#FF8A70" opacity="0.6" />
    <Circle cx="66" cy="58" r="4" fill="#FF8A70" opacity="0.6" />
    {/* Smile */}
    <Path d="M 44 60 Q 50 66 56 60" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </Svg>
);

// Mascot 2: Fox Companion (Orange with ears)
const FoxMascot = ({ size = 90 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* Ears */}
    <Path d="M 26 40 L 32 16 L 46 32 Z" fill="#EA580C" />
    <Path d="M 30 36 L 34 22 L 42 32 Z" fill="#FED7AA" />
    <Path d="M 74 40 L 68 16 L 54 32 Z" fill="#EA580C" />
    <Path d="M 70 36 L 66 22 L 58 32 Z" fill="#FED7AA" />
    {/* Head */}
    <Circle cx="50" cy="54" r="30" fill="#F97316" />
    {/* White muzzle cheeks */}
    <Path d="M 28 58 Q 50 78 72 58 Q 62 82 50 82 Q 38 82 28 58 Z" fill="#FFF7ED" />
    {/* Eyes */}
    <Circle cx="38" cy="48" r="3.5" fill="#1E1B4B" />
    <Circle cx="62" cy="48" r="3.5" fill="#1E1B4B" />
    {/* Nose */}
    <Ellipse cx="50" cy="62" rx="3.5" ry="2.5" fill="#1E1B4B" />
    {/* Smile */}
    <Path d="M 47 67 Q 50 70 53 67" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" fill="none" />
  </Svg>
);

// Mascot 3: Bear Companion (Warm Brown)
const BearMascot = ({ size = 90 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* Ears */}
    <Circle cx="28" cy="30" r="10" fill="#B45309" />
    <Circle cx="28" cy="30" r="5" fill="#FDE68A" />
    <Circle cx="72" cy="30" r="10" fill="#B45309" />
    <Circle cx="72" cy="30" r="5" fill="#FDE68A" />
    {/* Head */}
    <Circle cx="50" cy="54" r="32" fill="#D97706" />
    {/* Snout */}
    <Ellipse cx="50" cy="62" rx="14" ry="11" fill="#FEF3C7" />
    {/* Nose */}
    <Ellipse cx="50" cy="58" rx="4" ry="3" fill="#451A03" />
    {/* Eyes */}
    <Circle cx="38" cy="48" r="3.5" fill="#451A03" />
    <Circle cx="62" cy="48" r="3.5" fill="#451A03" />
    {/* Smile */}
    <Path d="M 46 66 Q 50 70 54 66" stroke="#451A03" strokeWidth="2" strokeLinecap="round" fill="none" />
  </Svg>
);

// Mascot 4: Bunny Companion (Lavender/Purple)
const BunnyMascot = ({ size = 90 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* Tall Ears */}
    <Ellipse cx="36" cy="24" rx="7" ry="20" fill="#C084FC" />
    <Ellipse cx="36" cy="24" rx="4" ry="14" fill="#F3E8FF" />
    <Ellipse cx="64" cy="24" rx="7" ry="20" fill="#C084FC" />
    <Ellipse cx="64" cy="24" rx="4" ry="14" fill="#F3E8FF" />
    {/* Head */}
    <Circle cx="50" cy="56" r="30" fill="#A855F7" />
    {/* Cheeks */}
    <Circle cx="32" cy="62" r="5" fill="#E9D5FF" opacity="0.7" />
    <Circle cx="68" cy="62" r="5" fill="#E9D5FF" opacity="0.7" />
    {/* Eyes */}
    <Circle cx="40" cy="52" r="3.5" fill="#FFFFFF" />
    <Circle cx="41" cy="52" r="2" fill="#3B0764" />
    <Circle cx="60" cy="52" r="3.5" fill="#FFFFFF" />
    <Circle cx="61" cy="52" r="2" fill="#3B0764" />
    {/* Nose */}
    <Path d="M 48 60 L 52 60 L 50 63 Z" fill="#F43F5E" />
    {/* Smile */}
    <Path d="M 46 66 Q 50 69 54 66" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
  </Svg>
);

// Mascot 5: Owl/Bird Companion (Sky Blue/Yellow)
const BirdMascot = ({ size = 90 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* Head feathers */}
    <Path d="M 50 16 L 46 26 L 54 26 Z" fill="#0284C7" />
    {/* Head */}
    <Circle cx="50" cy="52" r="32" fill="#38BDF8" />
    {/* Belly */}
    <Ellipse cx="50" cy="64" rx="18" ry="14" fill="#E0F2FE" />
    {/* Big Owl Eyes */}
    <Circle cx="38" cy="46" r="9" fill="#FFFFFF" />
    <Circle cx="38" cy="46" r="4.5" fill="#0369A1" />
    <Circle cx="40" cy="44" r="1.5" fill="#FFFFFF" />
    <Circle cx="62" cy="46" r="9" fill="#FFFFFF" />
    <Circle cx="62" cy="46" r="4.5" fill="#0369A1" />
    <Circle cx="64" cy="44" r="1.5" fill="#FFFFFF" />
    {/* Beak */}
    <Path d="M 46 54 L 54 54 L 50 62 Z" fill="#F59E0B" />
  </Svg>
);

// Mascot 6: Sprout/Creature (Mint Green)
const SproutMascot = ({ size = 90 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* Leaf on head */}
    <Path d="M 50 26 C 40 14, 60 12, 50 26" fill="#15803D" stroke="#166534" strokeWidth="1" />
    <Path d="M 50 26 C 60 16, 70 24, 50 26" fill="#22C55E" />
    <Path d="M 50 26 L 50 32" stroke="#166534" strokeWidth="2.5" />
    {/* Head */}
    <Circle cx="50" cy="54" r="30" fill="#4ADE80" />
    {/* Cheeks */}
    <Circle cx="34" cy="60" r="4.5" fill="#86EFAC" opacity="0.8" />
    <Circle cx="66" cy="60" r="4.5" fill="#86EFAC" opacity="0.8" />
    {/* Eyes */}
    <Circle cx="40" cy="50" r="3.5" fill="#14532D" />
    <Circle cx="60" cy="50" r="3.5" fill="#14532D" />
    {/* Smile */}
    <Path d="M 45 61 Q 50 67 55 61" stroke="#14532D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </Svg>
);

const MASCOTS = [
  { id: 'headphones', name: 'Tasky Coral', component: TaskyHeadphones },
  { id: 'fox', name: 'Spry Fox', component: FoxMascot },
  { id: 'bear', name: 'Gentle Bear', component: BearMascot },
  { id: 'bunny', name: 'Lavender Bunny', component: BunnyMascot },
  { id: 'bird', name: 'Sky Bird', component: BirdMascot },
  { id: 'sprout', name: 'Zen Sprout', component: SproutMascot },
];

export const MascotSelectionScreen = () => {
  const { navigateTo, showToast } = useTaskContext();
  const [selectedId, setSelectedId] = useState('headphones');

  const handleApply = () => {
    const chosen = MASCOTS.find(m => m.id === selectedId);
    showToast(`${chosen.name} applied as your companion!`, 'success');
    navigateTo('Personalization');
  };

  return (
    <View style={styles.screenWrapper}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('Personalization')} style={styles.backBtn}>
          <Icon name="arrow_back" size={22} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mascot Selection</Text>
        <TouchableOpacity onPress={() => showToast('Mascots are customizable!', 'info')} style={styles.backBtn}>
          <Icon name="more_vert" size={22} color={colors.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Section title */}
        <Text style={styles.subTitle}>Choose Your Mascot</Text>

        {/* 2x3 Grid */}
        <View style={styles.grid}>
          {MASCOTS.map((m) => {
            const isSelected = selectedId === m.id;
            const MascotComp = m.component;
            return (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.mascotCard,
                  isSelected && styles.mascotCardSelected,
                ]}
                onPress={() => setSelectedId(m.id)}
                activeOpacity={0.8}
              >
                <MascotComp size={96} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Apply Primary Action Button */}
        <TouchableOpacity style={styles.applyBtn} onPress={handleApply} activeOpacity={0.88}>
          <Text style={styles.applyBtnText}>Apply</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default MascotSelectionScreen;

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#FFFDF9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backBtn: {
    padding: 6,
    width: 36,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 110,
    alignItems: 'center',
  },
  subTitle: {
    ...typography.titleLg,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    rowGap: 16,
    marginBottom: 28,
  },
  mascotCard: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  mascotCardSelected: {
    borderColor: '#FF5B37',
    borderWidth: 2.5,
    backgroundColor: '#FFF8F6',
  },
  applyBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#FF5B37',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF5B37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  applyBtnText: {
    ...typography.titleMd,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
