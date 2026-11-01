import React from 'react';
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
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

export const DeadlineRiskAlertScreen = () => {
  const { navigateTo, showToast } = useTaskContext();

  const handleFixSchedule = () => {
    showToast('AI rescheduled your study blocks to avoid deadline risk!', 'success');
    navigateTo('SmartRescheduler');
  };

  return (
    <View style={styles.screenWrapper}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigateTo('HomeDashboard')}
          activeOpacity={0.8}
        >
          <Icon name="arrow_back" size={22} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Deadline Risk Alert</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Proactive Risk Prediction Alert Banner */}
        <View style={styles.alertBanner}>
          <View style={styles.alertIconCircle}>
            <Icon name="warning" size={20} color="#EF4444" />
          </View>
          <View style={styles.alertTextCol}>
            <Text style={styles.alertTitle}>
              Your Biology assignment may become difficult to finish before Friday.
            </Text>
          </View>
        </View>

        {/* Risk Breakdown Cards */}
        <View style={styles.infoCardsList}>
          {/* Card 1: Task & Deadline */}
          <View style={styles.infoCard}>
            <View style={[styles.infoIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Icon name="event" size={18} color="#3B82F6" />
            </View>
            <View style={styles.infoTextCol}>
              <Text style={styles.infoLabel}>Task & Deadline</Text>
              <Text style={styles.infoValue}>Biology Lab Report • Fri, 26 Sep</Text>
            </View>
          </View>

          {/* Card 2: Remaining Time */}
          <View style={styles.infoCard}>
            <View style={[styles.infoIconBox, { backgroundColor: '#FFF7ED' }]}>
              <Icon name="hourglass_bottom" size={18} color="#F97316" />
            </View>
            <View style={styles.infoTextCol}>
              <Text style={styles.infoLabel}>Remaining Time</Text>
              <Text style={styles.infoValue}>2 days left (only 2.5 free study hrs)</Text>
            </View>
          </View>

          {/* Card 3: Estimated Work & Current Workload */}
          <View style={styles.infoCard}>
            <View style={[styles.infoIconBox, { backgroundColor: '#F5F3FF' }]}>
              <Icon name="timer" size={18} color="#8B5CF6" />
            </View>
            <View style={styles.infoTextCol}>
              <Text style={styles.infoLabel}>Estimated Work vs Workload</Text>
              <Text style={styles.infoValue}>3h 30m work / 6h total queue</Text>
            </View>
          </View>
        </View>

        {/* Risk Level Gauge Card */}
        <View style={styles.riskCard}>
          <View style={styles.riskHeader}>
            <Text style={styles.riskLabel}>Predicted Risk Level</Text>
            <View style={styles.riskBadge}>
              <Text style={styles.riskBadgeText}>High Risk</Text>
            </View>
          </View>
          <View style={styles.riskTrack}>
            <View style={styles.riskFill} />
            <View style={styles.riskThumb} />
          </View>
          <Text style={styles.riskReasonText}>
            Reason: Competing CS project and limited evening buffer before Friday 11:59 PM.
          </Text>
        </View>

        {/* AI Recommendation Card */}
        <View style={styles.recCard}>
          <View style={styles.recHeader}>
            <Icon name="auto_awesome" size={18} color="#8B5CF6" fill />
            <Text style={styles.recTitle}>AI Recommendation</Text>
          </View>
          <Text style={styles.recBody}>
            Break Biology into two 45-min sprint blocks today & shift optional reading to the weekend to protect this deadline.
          </Text>
        </View>

        {/* Primary Action Button: "Fix My Schedule" */}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.fixBtn}
            onPress={handleFixSchedule}
            activeOpacity={0.88}
          >
            <Text style={styles.fixBtnText}>Fix My Schedule</Text>
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
    paddingBottom: 96,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEFEB',
    borderWidth: 1.5,
    borderColor: '#FFD5CC',
    borderRadius: rounded.xl,
    padding: 14,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    gap: 12,
  },
  alertIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTextCol: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#991B1B',
    lineHeight: 18,
  },
  infoCardsList: {
    gap: 8,
    marginBottom: spacing.md,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 12,
    gap: 12,
  },
  infoIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTextCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 1,
  },
  riskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    padding: 14,
    marginBottom: spacing.md,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  riskLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  riskBadge: {
    backgroundColor: '#FFEFEB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  riskBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#EF4444',
  },
  riskTrack: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: rounded.full,
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 8,
  },
  riskFill: {
    width: '78%',
    height: 8,
    borderRadius: rounded.full,
    backgroundColor: '#EF4444',
  },
  riskThumb: {
    position: 'absolute',
    left: '76%',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  riskReasonText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    lineHeight: 16,
  },
  recCard: {
    backgroundColor: '#F5F3FF',
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    padding: 14,
    marginBottom: spacing.lg,
  },
  recHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  recTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6D28D9',
  },
  recBody: {
    fontSize: 13,
    color: '#4C1D95',
    fontWeight: '500',
    lineHeight: 18,
  },
  actionWrapper: {
    marginTop: spacing.xs,
  },
  fixBtn: {
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
  fixBtnText: {
    ...typography.labelLg,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default DeadlineRiskAlertScreen;
