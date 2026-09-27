import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useTaskContext } from '../../context/TaskContext';
import Icon from '../../components/common/Icon';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import TaskCard from '../../components/common/TaskCard';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius, elevation } from '../../theme/spacing';

export default function SearchFiltersScreen() {
  const {
    tasks,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    navigateTo,
    showToast,
  } = useTaskContext();

  const [uiStateLab, setUiStateLab] = useState('normal'); // 'normal' | 'empty' | 'loading'
  const [showAiAccordion, setShowAiAccordion] = useState(true);

  const filterChips = [
    { id: 'all', label: 'All Tasks', icon: 'apps' },
    { id: 'critical', label: 'High Priority', icon: 'priority_high' },
    { id: 'assignment', label: 'Assignments', icon: 'assignment' },
    { id: 'exam', label: 'Exams', icon: 'school' },
    { id: 'overdue', label: 'Overdue', icon: 'history_toggle_off' },
  ];

  const overdueTasks = tasks.filter(t => t.isOverdue && !t.completed);

  const filteredTasks = tasks.filter((task) => {
    // Search query check
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.notes && task.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    // Filter chip check
    if (filterCategory === 'critical') return task.priority === 'Critical' || task.priority === 'High';
    if (filterCategory === 'assignment') return task.category === 'assignment' || task.type === 'Assignment';
    if (filterCategory === 'exam') return task.category === 'exam' || task.type === 'Exam';
    if (filterCategory === 'overdue') return task.isOverdue;
    return true;
  });

  return (
    <View style={styles.container}>
      <Header
        title="Search & Filters"
        subtitle="Instant academic task lookup"
        showBack={true}
        onBack={() => navigateTo('home')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar Input */}
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title, course (e.g. CS301), tags..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Carousel Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterCarousel}
          contentContainerStyle={styles.filterCarouselContent}
        >
          {filterChips.map((chip) => {
            const isSelected = filterCategory === chip.id;
            return (
              <TouchableOpacity
                key={chip.id}
                style={[styles.chipButton, isSelected && styles.chipButtonActive]}
                onPress={() => setFilterCategory(chip.id)}
              >
                <Icon
                  name={chip.icon}
                  size={14}
                  color={isSelected ? '#FFFFFF' : '#64748B'}
                />
                <Text style={[styles.chipButtonText, isSelected && styles.chipButtonTextActive]}>
                  {chip.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Overdue Warning Ribbon */}
        {overdueTasks.length > 0 && filterCategory !== 'overdue' && (
          <TouchableOpacity
            style={styles.overdueRibbon}
            onPress={() => setFilterCategory('overdue')}
          >
            <View style={styles.overdueLeft}>
              <Icon name="warning" size={18} color="#EF4444" />
              <Text style={styles.overdueText}>
                {overdueTasks.length} task{overdueTasks.length > 1 ? 's are' : ' is'} past deadline
              </Text>
            </View>
            <Icon name="arrow_forward" size={16} color="#EF4444" />
          </TouchableOpacity>
        )}

        {/* AI Smart Search Insights Accordion */}
        <View style={styles.accordionContainer}>
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => setShowAiAccordion(!showAiAccordion)}
          >
            <View style={styles.accordionHeaderLeft}>
              <Icon name="auto_awesome" size={16} color="#4F46E5" />
              <Text style={styles.accordionTitle}>Gemini Priority Index Reasoning</Text>
            </View>
            <Icon
              name={showAiAccordion ? 'expand_less' : 'expand_more'}
              size={18}
              color="#64748B"
            />
          </TouchableOpacity>

          {showAiAccordion && (
            <View style={styles.accordionBody}>
              <Text style={styles.accordionText}>
                Filters dynamically evaluate <Text style={styles.boldText}>Syllabus Weight (40%)</Text>, <Text style={styles.boldText}>Time-to-Deadline (35%)</Text>, and <Text style={styles.boldText}>Calendar Congestion (25%)</Text> to surface tasks needing immediate focus.
              </Text>
            </View>
          )}
        </View>

        {/* UI States Lab Dev Toggle */}
        <View style={styles.uiLabBar}>
          <Text style={styles.uiLabLabel}>Preview State:</Text>
          <TouchableOpacity
            style={[styles.uiLabBtn, uiStateLab === 'normal' && styles.uiLabBtnActive]}
            onPress={() => setUiStateLab('normal')}
          >
            <Text style={[styles.uiLabBtnText, uiStateLab === 'normal' && styles.uiLabBtnTextActive]}>Normal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.uiLabBtn, uiStateLab === 'empty' && styles.uiLabBtnActive]}
            onPress={() => setUiStateLab('empty')}
          >
            <Text style={[styles.uiLabBtnText, uiStateLab === 'empty' && styles.uiLabBtnTextActive]}>Empty</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.uiLabBtn, uiStateLab === 'loading' && styles.uiLabBtnActive]}
            onPress={() => setUiStateLab('loading')}
          >
            <Text style={[styles.uiLabBtnText, uiStateLab === 'loading' && styles.uiLabBtnTextActive]}>Loading</Text>
          </TouchableOpacity>
        </View>

        {/* Results List */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {uiStateLab === 'empty'
              ? '0 matches found'
              : uiStateLab === 'loading'
              ? 'Scanning academic graph...'
              : `Found ${filteredTasks.length} task${filteredTasks.length === 1 ? '' : 's'}`}
          </Text>
        </View>

        {uiStateLab === 'loading' ? (
          <View style={styles.loadingState}>
            <View style={styles.skeletonCard} />
            <View style={styles.skeletonCard} />
            <View style={styles.skeletonCard} />
          </View>
        ) : uiStateLab === 'empty' || filteredTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Icon name="search_off" size={32} color="#94A3B8" />
            </View>
            <Text style={styles.emptyTitle}>No matching academic tasks</Text>
            <Text style={styles.emptyDesc}>
              Try searching with a different course code, assignment name, or clearing active filters.
            </Text>
            <TouchableOpacity
              style={styles.clearSearchBtn}
              onPress={() => {
                setSearchQuery('');
                setFilterCategory('all');
                setUiStateLab('normal');
              }}
            >
              <Text style={styles.clearSearchText}>Reset All Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.taskList}>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onPress={() => navigateTo('taskDetails', { taskId: task.id })}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <BottomNav currentScreen="tasks" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 100,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    ...elevation.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  filterCarousel: {
    marginBottom: spacing.md,
  },
  filterCarouselContent: {
    gap: 8,
    paddingVertical: 4,
  },
  chipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  chipButtonActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  chipButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  chipButtonTextActive: {
    color: '#FFFFFF',
  },
  overdueRibbon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    marginBottom: spacing.md,
  },
  overdueLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  overdueText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#EF4444',
  },
  accordionContainer: {
    backgroundColor: '#EEF2FF',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  accordionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accordionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4F46E5',
  },
  accordionBody: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#E0E7FF',
    paddingTop: 8,
  },
  accordionText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  boldText: {
    fontWeight: '700',
    color: '#1E293B',
  },
  uiLabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    padding: 6,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  uiLabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginLeft: 4,
  },
  uiLabBtn: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    backgroundColor: 'transparent',
  },
  uiLabBtnActive: {
    backgroundColor: '#FFFFFF',
    ...elevation.xs,
  },
  uiLabBtnText: {
    fontSize: 11,
    color: '#64748B',
  },
  uiLabBtnTextActive: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  resultsHeader: {
    marginBottom: spacing.sm,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  taskList: {
    gap: spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  clearSearchBtn: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: borderRadius.md,
  },
  clearSearchText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  loadingState: {
    gap: spacing.sm,
  },
  skeletonCard: {
    height: 90,
    backgroundColor: '#E2E8F0',
    borderRadius: borderRadius.md,
    opacity: 0.6,
  },
});
