import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useTaskContext } from '../../context/TaskContext';
import Icon from '../../components/common/Icon';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius, elevation } from '../../theme/spacing';

export default function SharedGroupTasksScreen() {
  const {
    groupTasks,
    groupDeliverables,
    toggleGroupDeliverable,
    pulseFeed,
    addPulseMessage,
    navigateTo,
    showToast,
  } = useTaskContext();

  const [activeTab, setActiveTab] = useState('deliverables'); // 'deliverables' | 'pulse' | 'team'
  const [pulseText, setPulseText] = useState('');

  const completedCount = groupDeliverables.filter(d => d.completed).length;
  const totalCount = groupDeliverables.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const teamMembers = [
    { id: '1', name: 'Alex Rivera (You)', role: 'Lead Architect', initials: 'AR', color: '#4F46E5', isYou: true },
    { id: '2', name: 'Priya Sharma', role: 'Frontend & UI', initials: 'PS', color: '#8B5CF6', isYou: false },
    { id: '3', name: 'Marcus Chen', role: 'Backend / DB', initials: 'MC', color: '#22C55E', isYou: false },
    { id: '4', name: 'Sarah Jenkins', role: 'Documentation & QA', initials: 'SJ', color: '#EF4444', isYou: false },
  ];

  const handlePostPulse = () => {
    if (!pulseText.trim()) return;
    addPulseMessage(pulseText.trim());
    setPulseText('');
    showToast('Update shared with the team', 'success');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Shared Group Tasks"
        subtitle="CS402 Distributed Systems Project"
        showBack={true}
        onBack={() => navigateTo('home')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Project Hero / Bento Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.badgeRow}>
              <View style={styles.groupBadge}>
                <Icon name="groups" size={14} color="#4F46E5" />
                <Text style={styles.groupBadgeText}>Team Alpha</Text>
              </View>
              <View style={styles.duePill}>
                <Icon name="event" size={13} color="#EF4444" />
                <Text style={styles.duePillText}>Due in 6 days</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.shareBtn} onPress={() => showToast('Invite link copied to clipboard', 'info')}>
              <Icon name="person_add" size={16} color="#4F46E5" />
              <Text style={styles.shareBtnText}>Invite</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.projectTitle}>Raft Consensus Algorithm Implementation</Text>
          <Text style={styles.projectSubtitle}>Distributed state machine with failover clustering and benchmark suite.</Text>

          {/* Progress Bar & Stats */}
          <View style={styles.progressContainer}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>Sprint Milestone Progress</Text>
              <Text style={styles.progressValue}>{progressPercent}% ({completedCount}/{totalCount})</Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>
          </View>

          {/* Team Avatars Ribbon */}
          <View style={styles.teamRibbon}>
            <View style={styles.avatarGroup}>
              {teamMembers.map((m, idx) => (
                <View
                  key={m.id}
                  style={[
                    styles.avatarBubble,
                    { backgroundColor: m.color, marginLeft: idx > 0 ? -10 : 0 }
                  ]}
                >
                  <Text style={styles.avatarText}>{m.initials}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.teamCountText}>4 active contributors</Text>
          </View>
        </View>

        {/* Tab Toggle Navigation */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'deliverables' && styles.tabBtnActive]}
            onPress={() => setActiveTab('deliverables')}
          >
            <Icon
              name="task_alt"
              size={16}
              color={activeTab === 'deliverables' ? '#4F46E5' : '#64748B'}
            />
            <Text style={[styles.tabBtnText, activeTab === 'deliverables' && styles.tabBtnTextActive]}>
              Deliverables ({groupDeliverables.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'pulse' && styles.tabBtnActive]}
            onPress={() => setActiveTab('pulse')}
          >
            <Icon
              name="dynamic_feed"
              size={16}
              color={activeTab === 'pulse' ? '#4F46E5' : '#64748B'}
            />
            <Text style={[styles.tabBtnText, activeTab === 'pulse' && styles.tabBtnTextActive]}>
              Live Pulse
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'team' && styles.tabBtnActive]}
            onPress={() => setActiveTab('team')}
          >
            <Icon
              name="group"
              size={16}
              color={activeTab === 'team' ? '#4F46E5' : '#64748B'}
            />
            <Text style={[styles.tabBtnText, activeTab === 'team' && styles.tabBtnTextActive]}>
              Team
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content: Deliverables */}
        {activeTab === 'deliverables' && (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Shared Deliverables</Text>
              <TouchableOpacity
                style={styles.addDeliverableBtn}
                onPress={() => showToast('New deliverable dialog opened', 'info')}
              >
                <Icon name="add" size={16} color="#4F46E5" />
                <Text style={styles.addDeliverableText}>Add Item</Text>
              </TouchableOpacity>
            </View>

            {groupDeliverables.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.deliverableCard, item.completed && styles.deliverableCardDone]}
                activeOpacity={0.8}
                onPress={() => toggleGroupDeliverable(item.id)}
              >
                <TouchableOpacity
                  style={[styles.checkbox, item.completed && styles.checkboxDone]}
                  onPress={() => toggleGroupDeliverable(item.id)}
                >
                  {item.completed && <Icon name="check" size={14} color="#FFFFFF" />}
                </TouchableOpacity>

                <View style={styles.deliverableInfo}>
                  <Text style={[styles.deliverableTitle, item.completed && styles.deliverableTitleDone]}>
                    {item.title}
                  </Text>
                  <View style={styles.deliverableMeta}>
                    <View style={styles.assigneeTag}>
                      <Icon name="person" size={12} color="#64748B" />
                      <Text style={styles.assigneeText}>{item.assignee}</Text>
                    </View>
                    <View style={styles.dueDateTag}>
                      <Icon name="schedule" size={12} color="#64748B" />
                      <Text style={styles.dueDateText}>{item.due}</Text>
                    </View>
                  </View>
                </View>

                <View style={[
                  styles.statusBadge,
                  item.completed ? styles.statusBadgeDone : styles.statusBadgePending
                ]}>
                  <Text style={[
                    styles.statusBadgeText,
                    item.completed ? styles.statusBadgeTextDone : styles.statusBadgeTextPending
                  ]}>
                    {item.completed ? 'Done' : 'In Progress'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Tab Content: Live Pulse */}
        {activeTab === 'pulse' && (
          <View style={styles.tabContent}>
            {/* Quick post composer */}
            <View style={styles.pulseComposer}>
              <TextInput
                style={styles.pulseInput}
                placeholder="Share a progress update or blocker with the team..."
                placeholderTextColor="#94A3B8"
                value={pulseText}
                onChangeText={setPulseText}
                multiline
              />
              <View style={styles.pulseComposerFooter}>
                <Text style={styles.pulseTip}>Updates sync with teammates in real-time</Text>
                <TouchableOpacity
                  style={[styles.pulseSendBtn, !pulseText.trim() && styles.pulseSendBtnDisabled]}
                  onPress={handlePostPulse}
                  disabled={!pulseText.trim()}
                >
                  <Icon name="send" size={14} color="#FFFFFF" />
                  <Text style={styles.pulseSendText}>Post</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Activity Feed</Text>
            {pulseFeed.map((post) => (
              <View key={post.id} style={styles.pulseCard}>
                <View style={styles.pulseHeader}>
                  <View style={[styles.pulseAvatar, { backgroundColor: post.isYou ? '#4F46E5' : '#8B5CF6' }]}>
                    <Text style={styles.pulseAvatarText}>{post.user.substring(0, 2).toUpperCase()}</Text>
                  </View>
                  <View style={styles.pulseAuthorCol}>
                    <Text style={styles.pulseAuthor}>{post.user}</Text>
                    <Text style={styles.pulseTime}>{post.time}</Text>
                  </View>
                  <View style={styles.pulseTypeBadge}>
                    <Icon name="chat_bubble_outline" size={12} color="#64748B" />
                  </View>
                </View>
                <Text style={styles.pulseMessage}>{post.message}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Tab Content: Team */}
        {activeTab === 'team' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Sprint Collaborators</Text>
            {teamMembers.map((member) => (
              <View key={member.id} style={styles.memberCard}>
                <View style={[styles.memberAvatar, { backgroundColor: member.color }]}>
                  <Text style={styles.memberAvatarText}>{member.initials}</Text>
                </View>
                <View style={styles.memberInfo}>
                  <View style={styles.memberNameRow}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    {member.isYou && <View style={styles.youBadge}><Text style={styles.youBadgeText}>YOU</Text></View>}
                  </View>
                  <Text style={styles.memberRole}>{member.role}</Text>
                </View>
                <TouchableOpacity
                  style={styles.memberActionBtn}
                  onPress={() => showToast(`Message thread with ${member.name} initiated`, 'info')}
                >
                  <Icon name="chat" size={16} color="#4F46E5" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomNav currentScreen="group" />
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
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
    ...elevation.sm,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  groupBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  groupBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
  },
  duePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  duePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#EF4444',
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  shareBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  projectSubtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: borderRadius.full,
  },
  teamRibbon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  teamCountText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: borderRadius.md,
    padding: 3,
    marginBottom: spacing.md,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: borderRadius.sm,
    gap: 6,
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF',
    ...elevation.xs,
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  tabBtnTextActive: {
    color: '#4F46E5',
  },
  tabContent: {
    gap: spacing.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  addDeliverableBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addDeliverableText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
  },
  deliverableCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: spacing.sm,
    ...elevation.xs,
  },
  deliverableCardDone: {
    opacity: 0.65,
    backgroundColor: '#F8FAFC',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.xs,
    borderWidth: 2,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxDone: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  deliverableInfo: {
    flex: 1,
  },
  deliverableTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  deliverableTitleDone: {
    textDecorationLine: 'line-through',
    color: '#64748B',
  },
  deliverableMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  assigneeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  assigneeText: {
    fontSize: 11,
    color: '#64748B',
  },
  dueDateTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dueDateText: {
    fontSize: 11,
    color: '#64748B',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  statusBadgePending: {
    backgroundColor: '#EEF2FF',
  },
  statusBadgeDone: {
    backgroundColor: '#DCFCE7',
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusBadgeTextPending: {
    color: '#4F46E5',
  },
  statusBadgeTextDone: {
    color: '#16A34A',
  },
  pulseComposer: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.sm,
    ...elevation.xs,
  },
  pulseInput: {
    fontSize: 13,
    color: '#0F172A',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  pulseComposerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
  },
  pulseTip: {
    fontSize: 11,
    color: '#94A3B8',
  },
  pulseSendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#4F46E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  pulseSendBtnDisabled: {
    backgroundColor: '#94A3B8',
    opacity: 0.5,
  },
  pulseSendText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pulseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.xs,
  },
  pulseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  pulseAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  pulseAvatarText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  pulseAuthorCol: {
    flex: 1,
  },
  pulseAuthor: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  pulseTime: {
    fontSize: 11,
    color: '#94A3B8',
  },
  pulseTypeBadge: {
    padding: 4,
  },
  pulseMessage: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.xs,
  },
  memberAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memberAvatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  memberInfo: {
    flex: 1,
  },
  memberNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  youBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  youBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#4F46E5',
  },
  memberRole: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  memberActionBtn: {
    padding: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: borderRadius.full,
  },
});
