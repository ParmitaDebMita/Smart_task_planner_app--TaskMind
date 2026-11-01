import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import BottomNav from '../../components/common/BottomNav';
import TaskMindMascot from '../../components/common/TaskMindMascot';
import Icon from '../../components/common/Icon';

const INITIAL_MESSAGES = [
  {
    id: '1',
    sender: 'user',
    text: "I'm feeling stuck",
  },
  {
    id: '2',
    sender: 'ai',
    text: "It's okay! Let's take a small step. What would help you right now?",
  },
];

const QUICK_ACTIONS = [
  { id: 'study', label: 'Start Study', icon: 'play_arrow', screen: 'PomodoroTimer' },
  { id: 'schedule', label: 'Fix My Schedule', icon: 'shuffle', screen: 'SmartRescheduler' },
  { id: 'breakdown', label: 'Break This Down', icon: 'splitscreen', screen: 'TaskDetails' },
  { id: 'motivate', label: 'Motivate Me', icon: 'bolt', screen: 'PersonalizedMotivation' },
];

export const AICompanionChatScreen = () => {
  const { navigateTo, showToast } = useTaskContext();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [mascotVariant, setMascotVariant] = useState('encouraging');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg = { id: Date.now().toString(), sender: 'user', text: inputText.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');

    setTimeout(() => {
      let aiReply = "I hear you! Let's focus on the next 15 minutes. You don't have to finish everything right now.";
      let variant = 'happy';
      const lower = userMsg.text.toLowerCase();
      if (lower.includes('tired') || lower.includes('sleepy') || lower.includes('exhausted')) {
        aiReply = "Rest is productive too! Let's wrap up today gently and set up tomorrow.";
        variant = 'sleepy';
      } else if (lower.includes('exam') || lower.includes('stress') || lower.includes('panic')) {
        aiReply = "Take a deep breath. We have a plan. Let's do one topic at a time together.";
        variant = 'concerned';
      } else if (lower.includes('done') || lower.includes('finished') || lower.includes('passed')) {
        aiReply = "That is incredible! Super proud of you! You reached your goal!";
        variant = 'celebrating';
      }
      setMascotVariant(variant);
      setMessages([...newMessages, { id: (Date.now() + 1).toString(), sender: 'ai', text: aiReply }]);
    }, 600);
  };

  const handleQuickAction = (action) => {
    if (action.screen) {
      navigateTo(action.screen);
    }
  };

  const handleGoodNight = () => {
    navigateTo('NightlyReflection');
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
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>AI Companion Chat</Text>
            <View style={styles.onlineBadge}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Always here for you</Text>
            </View>
          </View>
          <View style={{ width: 36 }} />
        </View>

        {/* Mascot Header Avatar */}
        <View style={styles.mascotBanner}>
          <TaskMindMascot size={90} showBackground={false} variant={mascotVariant} />
        </View>

        {/* Chat History */}
        <View style={styles.chatContainer}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageRow,
                msg.sender === 'user' ? styles.userRow : styles.aiRow,
              ]}
            >
              {msg.sender === 'ai' && (
                <View style={styles.aiAvatarSmall}>
                  <Icon name="smart_toy" size={14} color="#FFFFFF" />
                </View>
              )}
              <View
                style={[
                  styles.bubble,
                  msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    msg.sender === 'user' ? styles.userBubbleText : styles.aiBubbleText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Action Chips (Reference Match) */}
        <View style={styles.quickActionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionBtn}
              onPress={() => handleQuickAction(action)}
              activeOpacity={0.85}
            >
              <Icon name={action.icon} size={16} color="#3B82F6" />
              <Text style={styles.quickActionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary Achievement Card (Reference Match) */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTopRow}>
            <Text style={styles.achievementTitle}>Small Achievement</Text>
            <Text style={styles.achievementEmoji}>💛</Text>
          </View>
          <Text style={styles.achievementText}>You kept your streak going!</Text>
          <View style={styles.summaryDivider} />
          <Text style={styles.tomorrowTitle}>Tomorrow</Text>
          <Text style={styles.tomorrowText}>Finish Physics Chapter 4</Text>
        </View>

        {/* Input Bar */}
        <View style={styles.inputBarRow}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Talk with TaskMind..."
            placeholderTextColor="#94A3B8"
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={handleSend}
            activeOpacity={0.85}
            disabled={!inputText.trim()}
          >
            <Icon name="send" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Action Button: Good Night (Reference Match) */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.goodNightBtn}
            onPress={handleGoodNight}
            activeOpacity={0.88}
          >
            <Text style={styles.goodNightText}>Good Night</Text>
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
  headerTitleWrap: {
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.headlineMd,
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  onlineText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  mascotBanner: {
    alignItems: 'center',
    marginVertical: 4,
  },
  chatContainer: {
    gap: 10,
    marginBottom: spacing.md,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  aiAvatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryCoral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    maxWidth: '82%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#E0F2FE',
    borderBottomRightRadius: 4,
  },
  userBubbleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0369A1',
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  aiBubbleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    lineHeight: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: spacing.md,
  },
  quickActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#DBEAFE',
    gap: 6,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1D4ED8',
  },
  summaryCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: rounded.xl,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    marginBottom: spacing.md,
  },
  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  achievementTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
  },
  achievementEmoji: {
    fontSize: 14,
  },
  achievementText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B45309',
    marginTop: 2,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#FDE68A',
    marginVertical: 8,
  },
  tomorrowTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#78716C',
  },
  tomorrowText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 2,
  },
  inputBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.md,
  },
  textInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#0F172A',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryCoral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: '#CBD5E1',
  },
  actionWrapper: {
    marginTop: spacing.xs,
  },
  goodNightBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#7C3AED',
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: '0px 4px 14px rgba(124, 58, 237, 0.3)' },
      default: {
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
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

export default AICompanionChatScreen;
