import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useTaskContext } from '../../context/TaskContext';
import Icon from '../../components/common/Icon';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius, elevation } from '../../theme/spacing';

export default function NotificationsScreen() {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    snoozeNotification,
    navigateTo,
    showToast,
  } = useTaskContext();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'urgent' | 'group'
  const [snoozeModalVisible, setSnoozeModalVisible] = useState(false);
  const [selectedNotifId, setSelectedNotifId] = useState(null);

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'urgent') return notif.type === 'critical' || notif.type === 'smart';
    if (activeFilter === 'group') return notif.type === 'group';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const openSnoozeMenu = (notifId) => {
    setSelectedNotifId(notifId);
    setSnoozeModalVisible(true);
  };

  const handleSnoozeOption = (minutes, label) => {
    if (selectedNotifId) {
      snoozeNotification(selectedNotifId, minutes);
      setSnoozeModalVisible(false);
      setSelectedNotifId(null);
    }
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'critical':
        return { name: 'warning', color: '#EF4444', bg: '#FEE2E2' };
      case 'smart':
        return { name: 'auto_awesome', color: '#4F46E5', bg: '#EEF2FF' };
      case 'group':
        return { name: 'groups', color: '#8B5CF6', bg: '#F5F3FF' };
      default:
        return { name: 'notifications', color: '#22C55E', bg: '#DCFCE7' };
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Notifications"
        subtitle={`${unreadCount} unread reminders`}
        showBack={true}
        onBack={() => navigateTo('home')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Spotlight "Don't Let Me Forget" Pinned Card */}
        <View style={styles.spotlightCard}>
          <View style={styles.spotlightHeader}>
            <View style={styles.spotlightTag}>
              <Icon name="push_pin" size={14} color="#EF4444" />
              <Text style={styles.spotlightTagText}>DON'T LET ME FORGET</Text>
            </View>
            <View style={styles.pulsingDot} />
          </View>

          <Text style={styles.spotlightTitle}>CS301 DBMS Assignment Submission</Text>
          <Text style={styles.spotlightDesc}>
            Portal closes tonight at 11:59 PM. Ensure ER-Diagram SQL schema and normalization proofs are bundled in ZIP.
          </Text>

          <View style={styles.spotlightActions}>
            <TouchableOpacity
              style={styles.spotlightPrimaryBtn}
              onPress={() => navigateTo('taskDetails', { taskId: 'task-1' })}
            >
              <Icon name="visibility" size={16} color="#FFFFFF" />
              <Text style={styles.spotlightPrimaryText}>View Task</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.spotlightSnoozeBtn}
              onPress={() => openSnoozeMenu('notif-1')}
            >
              <Icon name="snooze" size={16} color="#4F46E5" />
              <Text style={styles.spotlightSnoozeText}>Snooze Alert</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Tabs & Mark Read Action */}
        <View style={styles.filterSection}>
          <View style={styles.filterTabs}>
            <TouchableOpacity
              style={[styles.filterChip, activeFilter === 'all' && styles.filterChipActive]}
              onPress={() => setActiveFilter('all')}
            >
              <Text style={[styles.filterChipText, activeFilter === 'all' && styles.filterChipTextActive]}>
                All ({notifications.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterChip, activeFilter === 'urgent' && styles.filterChipActive]}
              onPress={() => setActiveFilter('urgent')}
            >
              <Text style={[styles.filterChipText, activeFilter === 'urgent' && styles.filterChipTextActive]}>
                Urgent
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterChip, activeFilter === 'group' && styles.filterChipActive]}
              onPress={() => setActiveFilter('group')}
            >
              <Text style={[styles.filterChipText, activeFilter === 'group' && styles.filterChipTextActive]}>
                Group
              </Text>
            </TouchableOpacity>
          </View>

          {unreadCount > 0 && (
            <TouchableOpacity style={styles.markReadBtn} onPress={markAllNotificationsAsRead}>
              <Icon name="done_all" size={14} color="#4F46E5" />
              <Text style={styles.markReadText}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Notification List */}
        <View style={styles.notificationList}>
          {filteredNotifications.map((item) => {
            const iconConfig = getNotifIcon(item.type);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.notificationCard,
                  !item.read && styles.notificationCardUnread,
                ]}
                activeOpacity={0.8}
                onPress={() => markNotificationAsRead(item.id)}
              >
                <View style={[styles.iconWrapper, { backgroundColor: iconConfig.bg }]}>
                  <Icon name={iconConfig.name} size={18} color={iconConfig.color} />
                </View>

                <View style={styles.notifDetails}>
                  <View style={styles.notifHeaderRow}>
                    <Text style={[styles.notifTitle, !item.read && styles.notifTitleUnread]}>
                      {item.title}
                    </Text>
                    <Text style={styles.notifTime}>{item.time}</Text>
                  </View>

                  <Text style={styles.notifMessage}>{item.message}</Text>

                  {/* Actions row for notification */}
                  <View style={styles.notifActionsRow}>
                    {item.type === 'critical' && (
                      <TouchableOpacity
                        style={styles.actionPill}
                        onPress={() => openSnoozeMenu(item.id)}
                      >
                        <Icon name="snooze" size={12} color="#EF4444" />
                        <Text style={[styles.actionPillText, { color: '#EF4444' }]}>Snooze</Text>
                      </TouchableOpacity>
                    )}
                    {item.type === 'smart' && (
                      <TouchableOpacity
                        style={styles.actionPill}
                        onPress={() => navigateTo('aiSmartScheduling')}
                      >
                        <Icon name="auto_awesome" size={12} color="#4F46E5" />
                        <Text style={[styles.actionPillText, { color: '#4F46E5' }]}>Review Reschedule</Text>
                      </TouchableOpacity>
                    )}
                    {item.type === 'group' && (
                      <TouchableOpacity
                        style={styles.actionPill}
                        onPress={() => navigateTo('group')}
                      >
                        <Icon name="visibility" size={12} color="#8B5CF6" />
                        <Text style={[styles.actionPillText, { color: '#8B5CF6' }]}>Open Sprint</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                {!item.read && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Snooze Options Modal */}
      <Modal
        visible={snoozeModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSnoozeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Icon name="snooze" size={24} color="#4F46E5" />
              <Text style={styles.modalTitle}>Snooze Notification</Text>
              <Text style={styles.modalSub}>Select when TaskMind should remind you again</Text>
            </View>

            <View style={styles.snoozeOptionsList}>
              <TouchableOpacity
                style={styles.snoozeOption}
                onPress={() => handleSnoozeOption(10, '10 minutes')}
              >
                <Icon name="timer_10" size={18} color="#4F46E5" />
                <Text style={styles.snoozeOptionText}>In 10 minutes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.snoozeOption}
                onPress={() => handleSnoozeOption(30, '30 minutes')}
              >
                <Icon name="timer_30" size={18} color="#4F46E5" />
                <Text style={styles.snoozeOptionText}>In 30 minutes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.snoozeOption}
                onPress={() => handleSnoozeOption(60, '1 hour')}
              >
                <Icon name="hourglass_top" size={18} color="#4F46E5" />
                <Text style={styles.snoozeOptionText}>In 1 hour</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.snoozeOption}
                onPress={() => handleSnoozeOption(240, 'This Evening (7:00 PM)')}
              >
                <Icon name="bedtime" size={18} color="#4F46E5" />
                <Text style={styles.snoozeOptionText}>This Evening (7:00 PM)</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={() => setSnoozeModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNav currentScreen="notifications" />
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
  spotlightCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    marginBottom: spacing.md,
    ...elevation.sm,
  },
  spotlightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  spotlightTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  spotlightTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#EF4444',
    letterSpacing: 0.8,
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  spotlightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  spotlightDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  spotlightActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  spotlightPrimaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    gap: 6,
  },
  spotlightPrimaryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  spotlightSnoozeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    gap: 6,
  },
  spotlightSnoozeText: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: '700',
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  filterTabs: {
    flexDirection: 'row',
    gap: 6,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: '#E2E8F0',
  },
  filterChipActive: {
    backgroundColor: '#4F46E5',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  markReadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  markReadText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
  },
  notificationList: {
    gap: spacing.sm,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...elevation.xs,
  },
  notificationCardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: '#4F46E5',
    backgroundColor: '#FAFAFF',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notifDetails: {
    flex: 1,
  },
  notifHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  notifTitleUnread: {
    color: '#0F172A',
    fontWeight: '700',
  },
  notifTime: {
    fontSize: 11,
    color: '#94A3B8',
  },
  notifMessage: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 8,
  },
  notifActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  actionPillText: {
    fontSize: 11,
    fontWeight: '600',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4F46E5',
    marginLeft: 8,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 380,
    ...elevation.xl,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 8,
    marginBottom: 4,
  },
  modalSub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  snoozeOptionsList: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  snoozeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: spacing.md,
  },
  snoozeOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  modalCancelBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: borderRadius.md,
    backgroundColor: '#F1F5F9',
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
});
