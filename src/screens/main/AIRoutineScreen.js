import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

export const AIRoutineScreen = () => {
  const { routineSchedule, saveRoutine, addRoutineBlock, deleteRoutineBlock, goBack, showToast, navigateTo } = useTaskContext();

  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'upload'
  const [studyHours, setStudyHours] = useState('3.5');
  const [preferredWindow, setPreferredWindow] = useState('night');
  const [sleepHours, setSleepHours] = useState('11:30 PM – 07:30 AM');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBlocks, setGeneratedBlocks] = useState(routineSchedule.blocks);
  const [isSaved, setIsSaved] = useState(false);

  // Upload routine state
  const [selectedFile, setSelectedFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newPlan = [
        { id: `rb-${Date.now()}-1`, day: 'Weekdays', time: '09:00 AM – 12:30 PM', title: 'University Classes & Lectures', category: 'lecture', icon: 'school', color: '#4F46E5' },
        { id: `rb-${Date.now()}-2`, day: 'Weekdays', time: '01:00 PM – 02:00 PM', title: 'Lunch & Cognitive Rest', category: 'break', icon: 'restaurant', color: '#10B981' },
        { id: `rb-${Date.now()}-3`, day: 'Weekdays', time: '03:00 PM – 04:30 PM', title: 'Lab Practical & Hands-on Session', category: 'lab', icon: 'science', color: '#F59E0B' },
        { id: `rb-${Date.now()}-4`, day: 'Weekdays', time: '07:30 PM – 09:30 PM', title: `✨ Deep Focus Sprint (${studyHours}h quota)`, category: 'study', icon: 'bolt', color: '#4F46E5' },
        { id: `rb-${Date.now()}-5`, day: 'Weekdays', time: '09:45 PM – 10:30 PM', title: 'Daily Review & Next Day Prep', category: 'revision', icon: 'auto_stories', color: '#8B5CF6' },
      ];
      setGeneratedBlocks(newPlan);
      showToast('AI generated a realistic balanced routine!', 'success');
    }, 1200);
  };

  const handleSaveRoutine = () => {
    saveRoutine(generatedBlocks);
    setIsSaved(true);
    showToast('Routine saved to your schedule & calendar!', 'success');
    setTimeout(() => {
      navigateTo('AcademicCalendar');
    }, 1200);
  };

  const handleSelectSampleDoc = (name) => {
    setSelectedFile(name);
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setExtractedData([
        { day: 'Mon & Wed', time: '09:00 AM – 10:30 AM', title: 'CS301: Database Management Systems', room: 'Hall B-204' },
        { day: 'Mon & Wed', time: '11:00 AM – 12:30 PM', title: 'CS304: Internet of Things Lecture', room: 'Lab Wing C' },
        { day: 'Tue & Thu', time: '10:00 AM – 11:30 AM', title: 'CS305: Data Mining Algorithms', room: 'Hall A-102' },
        { day: 'Tue & Thu', time: '02:00 PM – 04:00 PM', title: 'CS302: Web Development Practical', room: 'Software Lab 3' },
        { day: 'Friday', time: '09:00 AM – 11:00 AM', title: 'MATH51: Linear Algebra Seminar', room: 'Math Block 12' },
      ]);
      showToast('OCR complete! Extracted 5 class schedule blocks.', 'success');
    }, 1400);
  };

  const handleImportExtracted = () => {
    if (!extractedData) return;
    const blocks = extractedData.map((item, idx) => ({
      id: `rb-ext-${Date.now()}-${idx}`,
      day: item.day,
      time: item.time,
      title: item.title,
      category: 'lecture',
      icon: 'school',
      color: '#4F46E5',
    }));
    saveRoutine(blocks);
    showToast('Uploaded routine imported to your timetable!', 'success');
    setTimeout(() => {
      navigateTo('AcademicCalendar');
    }, 1000);
  };

  return (
    <View style={styles.screenWrapper}>
      <Header title="AI Routine Engine" subtitle="Daily & Weekly Planner" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Navigation Tabs */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'generator' && styles.tabBtnActive]}
            onPress={() => setActiveTab('generator')}
          >
            <Icon
              name="smart_toy"
              size={18}
              color={activeTab === 'generator' ? colors.primaryContainer : colors.onSurfaceVariant}
            />
            <Text style={[styles.tabBtnText, activeTab === 'generator' && styles.tabBtnTextActive]}>
              Create My Routine
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'upload' && styles.tabBtnActive]}
            onPress={() => setActiveTab('upload')}
          >
            <Icon
              name="upload_file"
              size={18}
              color={activeTab === 'upload' ? colors.primaryContainer : colors.onSurfaceVariant}
            />
            <Text style={[styles.tabBtnText, activeTab === 'upload' && styles.tabBtnTextActive]}>
              Upload Routine
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'generator' ? (
          <>
            {/* Step 1: Input Preferences Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>STEP 1</Text>
                </View>
                <Text style={styles.cardTitle}>Tell TaskMind About Your Day</Text>
              </View>
              <Text style={styles.cardSubtitle}>
                AI creates a realistic plan around your lectures, study hours, and sleep.
              </Text>

              {/* Study Hours Target */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Daily Study Hours Target</Text>
                <View style={styles.hoursRow}>
                  {['2.5', '3.5', '4.5', '5.0'].map(hrs => (
                    <TouchableOpacity
                      key={hrs}
                      style={[styles.choicePill, studyHours === hrs && styles.choicePillActive]}
                      onPress={() => setStudyHours(hrs)}
                    >
                      <Text style={[styles.choiceText, studyHours === hrs && styles.choiceTextActive]}>
                        {hrs} hrs
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Focus Window */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>When do you focus best?</Text>
                <View style={styles.windowGrid}>
                  <TouchableOpacity
                    style={[styles.windowOption, preferredWindow === 'morning' && styles.windowOptionActive]}
                    onPress={() => setPreferredWindow('morning')}
                  >
                    <Icon name="wb_sunny" size={20} color={preferredWindow === 'morning' ? colors.primaryContainer : colors.onSurfaceVariant} />
                    <Text style={styles.windowTitle}>Morning</Text>
                    <Text style={styles.windowSubtitle}>7 AM – 11 AM</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.windowOption, preferredWindow === 'afternoon' && styles.windowOptionActive]}
                    onPress={() => setPreferredWindow('afternoon')}
                  >
                    <Icon name="wb_twilight" size={20} color={preferredWindow === 'afternoon' ? colors.primaryContainer : colors.onSurfaceVariant} />
                    <Text style={styles.windowTitle}>Afternoon</Text>
                    <Text style={styles.windowSubtitle}>2 PM – 6 PM</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.windowOption, preferredWindow === 'night' && styles.windowOptionActive]}
                    onPress={() => setPreferredWindow('night')}
                  >
                    <Icon name="dark_mode" size={20} color={preferredWindow === 'night' ? colors.primaryContainer : colors.onSurfaceVariant} />
                    <Text style={styles.windowTitle}>Night Owl</Text>
                    <Text style={styles.windowSubtitle}>8 PM – 12 AM</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Sleep Schedule */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Sleep & Rest Time (Protected)</Text>
                <View style={styles.inputBox}>
                  <Icon name="bedtime" size={18} color={colors.secondary} />
                  <TextInput
                    style={styles.textInput}
                    value={sleepHours}
                    onChangeText={setSleepHours}
                    placeholder="e.g. 11:30 PM – 7:30 AM"
                  />
                </View>
              </View>

              {/* Generate Button */}
              <TouchableOpacity
                style={[styles.generateBtn, isGenerating && styles.btnDisabled]}
                onPress={handleGenerate}
                disabled={isGenerating}
                activeOpacity={0.85}
              >
                <Icon name="auto_awesome" size={20} color={colors.onPrimary} />
                <Text style={styles.generateBtnText}>
                  {isGenerating ? 'AI Analyzing Schedule...' : 'Generate My Routine'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Step 2: Review & Edit Generated Routine */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.stepBadge, { backgroundColor: '#E0E7FF' }]}>
                  <Text style={[styles.stepBadgeText, { color: colors.primaryContainer }]}>STEP 2</Text>
                </View>
                <Text style={styles.cardTitle}>Review & Edit Your Routine</Text>
              </View>
              <Text style={styles.cardSubtitle}>
                Tap any block to customize, or tap the remove icon to adjust your day.
              </Text>

              <View style={styles.blocksList}>
                {generatedBlocks.map((block) => (
                  <View key={block.id} style={styles.routineBlockCard}>
                    <View style={[styles.blockColorStrip, { backgroundColor: block.color || colors.primaryContainer }]} />
                    <View style={styles.blockIconBox}>
                      <Icon name={block.icon || 'schedule'} size={20} color={colors.primaryContainer} />
                    </View>
                    <View style={styles.blockInfoCol}>
                      <Text style={styles.blockTime}>{block.time}</Text>
                      <Text style={styles.blockTitle}>{block.title}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteBlockBtn}
                      onPress={() => setGeneratedBlocks(prev => prev.filter(b => b.id !== block.id))}
                    >
                      <Icon name="delete_outline" size={18} color={colors.errorCoral} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              {/* Add Custom Slot */}
              <TouchableOpacity
                style={styles.addBlockBtn}
                onPress={() => {
                  const newSlot = {
                    id: `rb-${Date.now()}`,
                    day: 'Weekdays',
                    time: '05:30 PM – 06:30 PM',
                    title: 'Exercise / Outdoor Break',
                    category: 'break',
                    icon: 'fitness_center',
                    color: '#10B981',
                  };
                  setGeneratedBlocks(prev => [...prev, newSlot]);
                  showToast('Added custom slot!', 'info');
                }}
              >
                <Icon name="add" size={18} color={colors.primaryContainer} />
                <Text style={styles.addBlockText}>+ Add Custom Slot</Text>
              </TouchableOpacity>

              {/* Save Routine Action */}
              <TouchableOpacity
                style={[styles.saveRoutineBtn, isSaved && styles.saveBtnSuccess]}
                onPress={handleSaveRoutine}
                activeOpacity={0.88}
              >
                <Icon name={isSaved ? 'done' : 'bookmark'} size={20} color={colors.onPrimary} />
                <Text style={styles.saveRoutineBtnText}>
                  {isSaved ? 'Routine Saved & Active' : 'Save Routine to Schedule'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          /* Tab 2: Upload Routine (Feature 6) */
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>UPLOAD</Text>
              </View>
              <Text style={styles.cardTitle}>Upload Your Timetable</Text>
            </View>
            <Text style={styles.cardSubtitle}>
              Upload a photo or PDF of your university timetable. TaskMind uses AI OCR to extract your classes automatically.
            </Text>

            {/* Upload Zone */}
            <View style={styles.dropZone}>
              <View style={styles.dropIconBox}>
                <Icon name="document_scanner" size={32} color={colors.primaryContainer} />
              </View>
              <Text style={styles.dropTitle}>Select Timetable Document</Text>
              <Text style={styles.dropSub}>Supports PNG, JPG, or PDF (Max 10MB)</Text>

              {/* Quick Sample Document Picker for instant testing */}
              <View style={styles.sampleDocsRow}>
                <Text style={styles.sampleLabel}>Or test with sample timetable:</Text>
                <TouchableOpacity
                  style={[styles.sampleDocBtn, selectedFile === 'Semester_Timetable.pdf' && styles.sampleDocBtnActive]}
                  onPress={() => handleSelectSampleDoc('Semester_Timetable.pdf')}
                >
                  <Icon name="picture_as_pdf" size={16} color={colors.errorCoral} />
                  <Text style={styles.sampleDocText}>Semester_Timetable.pdf</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.sampleDocBtn, selectedFile === 'PULMS_Schedule.png' && styles.sampleDocBtnActive]}
                  onPress={() => handleSelectSampleDoc('PULMS_Schedule.png')}
                >
                  <Icon name="image" size={16} color={colors.primaryContainer} />
                  <Text style={styles.sampleDocText}>PULMS_Schedule.png</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Extraction Progress */}
            {isExtracting && (
              <View style={styles.extractingBox}>
                <Icon name="sync" size={24} color={colors.primaryContainer} />
                <Text style={styles.extractingText}>AI scanning courses and time slots...</Text>
              </View>
            )}

            {/* Extracted Timetable Results */}
            {extractedData && (
              <View style={styles.extractedSection}>
                <View style={styles.extractedHeader}>
                  <Icon name="check_circle" size={18} color="#22C55E" />
                  <Text style={styles.extractedTitle}>Extracted Schedule ({extractedData.length} classes)</Text>
                </View>

                <View style={styles.extractedList}>
                  {extractedData.map((item, index) => (
                    <View key={index} style={styles.extractedItemCard}>
                      <View style={styles.extractedItemTop}>
                        <Text style={styles.extractedDayPill}>{item.day}</Text>
                        <Text style={styles.extractedTime}>{item.time}</Text>
                      </View>
                      <Text style={styles.extractedItemTitle}>{item.title}</Text>
                      <Text style={styles.extractedItemRoom}>📍 {item.room}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.importExtractedBtn}
                  onPress={handleImportExtracted}
                  activeOpacity={0.88}
                >
                  <Icon name="download_done" size={20} color={colors.onPrimary} />
                  <Text style={styles.importExtractedText}>Import into TaskMind Timetable</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.sm,
    paddingBottom: 96,
    gap: spacing.md,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainer,
    borderRadius: rounded.xl,
    padding: 4,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: rounded.lg,
  },
  tabBtnActive: {
    backgroundColor: colors.surfaceContainerLowest,
    ...shadows.sm,
  },
  tabBtnText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
    fontWeight: '600',
  },
  tabBtnTextActive: {
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.12)',
    ...shadows.sm,
    gap: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepBadge: {
    backgroundColor: colors.primaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
  },
  stepBadgeText: {
    ...typography.labelSm,
    color: colors.onPrimaryFixed,
    fontWeight: '700',
    fontSize: 10,
  },
  cardTitle: {
    ...typography.titleMedium,
    color: colors.onSurface,
    fontWeight: '700',
  },
  cardSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  fieldGroup: {
    gap: 6,
    marginTop: 6,
  },
  fieldLabel: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  hoursRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  choicePill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: rounded.md,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  choicePillActive: {
    backgroundColor: colors.primaryFixed,
    borderColor: colors.primaryContainer,
  },
  choiceText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
    fontWeight: '600',
  },
  choiceTextActive: {
    color: colors.onPrimaryFixed,
    fontWeight: '700',
  },
  windowGrid: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  windowOption: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: rounded.lg,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 4,
  },
  windowOptionActive: {
    backgroundColor: colors.primaryFixed,
    borderColor: colors.primaryContainer,
  },
  windowTitle: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontWeight: '700',
  },
  windowSubtitle: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    fontSize: 10,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 12,
    borderRadius: rounded.md,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    ...typography.bodyRegular,
    color: colors.onSurface,
  },
  generateBtn: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    ...shadows.sm,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  generateBtnText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  blocksList: {
    gap: 8,
    marginTop: 4,
  },
  routineBlockCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    padding: 10,
    gap: 10,
    overflow: 'hidden',
  },
  blockColorStrip: {
    width: 4,
    height: '100%',
    borderRadius: 2,
  },
  blockIconBox: {
    width: 36,
    height: 36,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockInfoCol: {
    flex: 1,
    gap: 2,
  },
  blockTime: {
    ...typography.labelSm,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  blockTitle: {
    ...typography.bodyRegular,
    color: colors.onSurface,
    fontWeight: '600',
  },
  deleteBlockBtn: {
    padding: 6,
  },
  addBlockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: rounded.lg,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.3)',
    borderStyle: 'dashed',
    marginTop: 4,
  },
  addBlockText: {
    ...typography.labelMd,
    color: colors.primaryContainer,
    fontWeight: '600',
  },
  saveRoutineBtn: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  saveBtnSuccess: {
    backgroundColor: '#22C55E',
  },
  saveRoutineBtnText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  dropZone: {
    borderWidth: 2,
    borderColor: 'rgba(79, 70, 229, 0.25)',
    borderStyle: 'dashed',
    borderRadius: rounded.xl,
    padding: spacing.lg,
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(238, 242, 255, 0.5)',
  },
  dropIconBox: {
    width: 60,
    height: 60,
    borderRadius: rounded.full,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropTitle: {
    ...typography.titleMedium,
    color: colors.onSurface,
    fontWeight: '700',
  },
  dropSub: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  sampleDocsRow: {
    width: '100%',
    marginTop: 12,
    gap: 6,
    alignItems: 'center',
  },
  sampleLabel: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  sampleDocBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: rounded.md,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  sampleDocBtnActive: {
    borderColor: colors.primaryContainer,
    backgroundColor: colors.primaryFixed,
  },
  sampleDocText: {
    ...typography.labelSm,
    color: colors.onSurface,
    fontWeight: '600',
  },
  extractingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 14,
    backgroundColor: colors.primaryFixed,
    borderRadius: rounded.lg,
  },
  extractingText: {
    ...typography.bodyRegular,
    color: colors.onPrimaryFixed,
    fontWeight: '600',
  },
  extractedSection: {
    gap: spacing.sm,
    marginTop: 6,
  },
  extractedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  extractedTitle: {
    ...typography.titleMedium,
    color: colors.onSurface,
    fontWeight: '700',
  },
  extractedList: {
    gap: 8,
  },
  extractedItemCard: {
    backgroundColor: colors.surfaceContainerLow,
    padding: 12,
    borderRadius: rounded.md,
    gap: 4,
    borderLeftWidth: 3,
    borderLeftColor: colors.primaryContainer,
  },
  extractedItemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  extractedDayPill: {
    ...typography.labelSm,
    backgroundColor: colors.primaryFixed,
    color: colors.onPrimaryFixed,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: '700',
  },
  extractedTime: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  extractedItemTitle: {
    ...typography.bodyRegular,
    color: colors.onSurface,
    fontWeight: '700',
  },
  extractedItemRoom: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  importExtractedBtn: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
  },
  importExtractedText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
});

export default AIRoutineScreen;
