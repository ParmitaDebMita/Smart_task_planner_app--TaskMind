import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import Icon from '../../components/common/Icon';

export const ConnectPortalScreen = () => {
  const {
    learningPortal,
    connectLearningPortal,
    disconnectLearningPortal,
    syncLearningPortal,
    addTask,
    showToast,
    navigateTo,
  } = useTaskContext();

  const [activeTab, setActiveTab] = useState('portal'); // 'portal' | 'upload_assignment' | 'paste_assignment'
  const [portalUrl, setPortalUrl] = useState(learningPortal.portalUrl);
  const [studentId, setStudentId] = useState(learningPortal.studentId || 'BCSF20M042');
  const [portalPassword, setPortalPassword] = useState('••••••••••••');
  const [isConnecting, setIsConnecting] = useState(false);

  // Assignment Extraction State (Features 8 & 9)
  const [assignmentDoc, setAssignmentDoc] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedAssignment, setExtractedAssignment] = useState(null);
  const [pastedText, setPastedText] = useState('');

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      connectLearningPortal({ portalUrl, studentId });
    }, 1200);
  };

  const handleSelectSampleAssignment = (fileName) => {
    setAssignmentDoc(fileName);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setExtractedAssignment({
        title: 'Distributed Systems — Raft Consensus Lab 3',
        course: 'CS402',
        dueDate: 'Due in 3 days, 11:59 PM',
        dueTimestamp: 'Sunday, Oct 27, 11:59 PM',
        workload: '4.5 hours estimated',
        priority: 'high',
        instructions: 'Implement leader election and heartbeat ping loop in Python or Go. Handle partitioned cluster re-elections.',
        steps: [
          { id: 'step-1', title: 'Read Raft paper section 5 & instructor rubric', duration: '30 min' },
          { id: 'step-2', title: 'Implement RPC heartbeat & term election timer', duration: '1.5 hours' },
          { id: 'step-3', title: 'Build log replication and state machine commit loop', duration: '2 hours' },
          { id: 'step-4', title: 'Run partition test suite & export log graph', duration: '30 min' },
          { id: 'step-5', title: 'Format submission ZIP with README and push to portal', duration: '15 min' },
        ],
      });
      showToast('Assignment analyzed & broken down into 5 steps!', 'success');
    }, 1300);
  };

  const handleImportBrokenDownAssignment = () => {
    if (!extractedAssignment) return;
    const task = addTask({
      title: extractedAssignment.title,
      course: extractedAssignment.course,
      category: 'Assignment',
      priority: extractedAssignment.priority,
      dueDate: extractedAssignment.dueDate,
      dueTimestamp: extractedAssignment.dueTimestamp,
      estimatedMinutes: 270,
      description: extractedAssignment.instructions,
      subtasks: extractedAssignment.steps.map((s, idx) => ({
        id: `sub-ai-${Date.now()}-${idx}`,
        title: `${s.title} (${s.duration})`,
        isCompleted: false,
      })),
    });
    showToast(`Added "${task.title}" with 5 steps to your tasks!`, 'success');
    setTimeout(() => {
      navigateTo('TodayTasks');
    }, 1000);
  };

  const handleParsePastedText = () => {
    if (!pastedText.trim()) {
      showToast('Please paste assignment text first', 'error');
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setExtractedAssignment({
        title: 'Software Engineering — Sprint Retrospective & UML',
        course: 'CS306',
        dueDate: 'Due Friday, 5:00 PM',
        dueTimestamp: 'Friday, Oct 25, 5:00 PM',
        workload: '2.5 hours estimated',
        priority: 'med',
        instructions: 'Compile sprint velocity chart and draw updated class diagrams for the checkout workflow.',
        steps: [
          { id: 'p-1', title: 'Review sprint burn-down chart and feedback', duration: '30 min' },
          { id: 'p-2', title: 'Draw updated UML Class diagram in Lucidchart', duration: '1 hour' },
          { id: 'p-3', title: 'Draft team retrospective summary report', duration: '45 min' },
          { id: 'p-4', title: 'Export PDF and upload to portal', duration: '15 min' },
        ],
      });
      showToast('Assignment parsed from pasted text!', 'success');
    }, 1000);
  };

  return (
    <View style={styles.screenWrapper}>
      <Header title="Learning Portal" subtitle="Sync University LMS" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Navigation Tabs */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'portal' && styles.tabBtnActive]}
            onPress={() => setActiveTab('portal')}
          >
            <Icon
              name="school"
              size={18}
              color={activeTab === 'portal' ? colors.primaryContainer : colors.onSurfaceVariant}
            />
            <Text style={[styles.tabBtnText, activeTab === 'portal' && styles.tabBtnTextActive]}>
              Connect Portal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'upload_assignment' && styles.tabBtnActive]}
            onPress={() => setActiveTab('upload_assignment')}
          >
            <Icon
              name="description"
              size={18}
              color={activeTab === 'upload_assignment' ? colors.primaryContainer : colors.onSurfaceVariant}
            />
            <Text style={[styles.tabBtnText, activeTab === 'upload_assignment' && styles.tabBtnTextActive]}>
              Detect Assignment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'paste_assignment' && styles.tabBtnActive]}
            onPress={() => setActiveTab('paste_assignment')}
          >
            <Icon
              name="content_paste"
              size={18}
              color={activeTab === 'paste_assignment' ? colors.primaryContainer : colors.onSurfaceVariant}
            />
            <Text style={[styles.tabBtnText, activeTab === 'paste_assignment' && styles.tabBtnTextActive]}>
              Paste Rubric
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'portal' ? (
          /* TAB 1: Connect Portal (Feature 7) */
          <>
            {learningPortal.isConnected ? (
              /* Connected State */
              <View style={styles.card}>
                <View style={styles.connectedBanner}>
                  <View style={styles.connectedBadge}>
                    <Icon name="verified" size={20} color="#22C55E" />
                    <Text style={styles.connectedBadgeText}>PULMS PORTAL CONNECTED</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.syncNowBtn}
                    onPress={syncLearningPortal}
                  >
                    <Icon name="sync" size={16} color={colors.primaryContainer} />
                    <Text style={styles.syncNowText}>Sync Now</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.portalDetails}>
                  <Text style={styles.portalName}>{learningPortal.portalName}</Text>
                  <Text style={styles.portalUrlText}>{learningPortal.portalUrl}</Text>
                  <Text style={styles.lastSyncText}>Last synced: {learningPortal.lastSync || 'Just now'}</Text>
                </View>

                {/* Synced Courses */}
                <Text style={styles.subSectionTitle}>Enrolled Courses ({learningPortal.syncedCourses.length})</Text>
                <View style={styles.coursesList}>
                  {learningPortal.syncedCourses.map(course => (
                    <View key={course.code} style={styles.courseItem}>
                      <View style={styles.courseLeft}>
                        <View style={styles.courseBadge}>
                          <Text style={styles.courseBadgeText}>{course.code}</Text>
                        </View>
                        <View>
                          <Text style={styles.courseName}>{course.name}</Text>
                          <Text style={styles.courseInstructor}>{course.instructor}</Text>
                        </View>
                      </View>
                      {course.pendingCount > 0 && (
                        <View style={styles.pendingBadge}>
                          <Text style={styles.pendingBadgeText}>{course.pendingCount} Due</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.disconnectBtn}
                  onPress={disconnectLearningPortal}
                >
                  <Icon name="link_off" size={18} color={colors.errorCoral} />
                  <Text style={styles.disconnectBtnText}>Disconnect Portal</Text>
                </TouchableOpacity>
              </View>
            ) : (
              /* Connect Form */
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.portalIconBox}>
                    <Icon name="hub" size={22} color={colors.primaryContainer} />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>Connect University Learning Portal</Text>
                    <Text style={styles.cardSubtitle}>
                      Sync courses, assignments, and deadlines automatically.
                    </Text>
                  </View>
                </View>

                <View style={styles.securityNote}>
                  <Icon name="lock" size={16} color={colors.secondary} />
                  <Text style={styles.securityText}>
                    TaskMind uses verified student token authorization. No personal passwords are stored on external servers.
                  </Text>
                </View>

                {/* Portal Domain */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>University / Portal Address</Text>
                  <View style={styles.inputBox}>
                    <Icon name="language" size={18} color={colors.outline} />
                    <TextInput
                      style={styles.textInput}
                      value={portalUrl}
                      onChangeText={setPortalUrl}
                      placeholder="e.g. https://pulms.pu.edu.pk or canvas.edu"
                    />
                  </View>
                </View>

                {/* Student Roll / ID */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Student Roll / ID Number</Text>
                  <View style={styles.inputBox}>
                    <Icon name="badge" size={18} color={colors.outline} />
                    <TextInput
                      style={styles.textInput}
                      value={studentId}
                      onChangeText={setStudentId}
                      placeholder="e.g. BCSF20M042"
                    />
                  </View>
                </View>

                {/* Password / Token */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Portal Password or SSO Token</Text>
                  <View style={styles.inputBox}>
                    <Icon name="key" size={18} color={colors.outline} />
                    <TextInput
                      style={styles.textInput}
                      secureTextEntry
                      value={portalPassword}
                      onChangeText={setPortalPassword}
                      placeholder="••••••••••••"
                    />
                  </View>
                </View>

                {/* Connect Action */}
                <TouchableOpacity
                  style={[styles.connectBtn, isConnecting && styles.btnDisabled]}
                  onPress={handleConnect}
                  disabled={isConnecting}
                  activeOpacity={0.88}
                >
                  <Icon name="link" size={20} color={colors.onPrimary} />
                  <Text style={styles.connectBtnText}>
                    {isConnecting ? 'Verifying Student Credentials...' : 'Connect & Securely Sync'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : activeTab === 'upload_assignment' ? (
          /* TAB 2: Upload Assignment Document (Feature 8 & 9) */
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.portalIconBox}>
                <Icon name="auto_awesome" size={22} color={colors.primaryContainer} />
              </View>
              <View>
                <Text style={styles.cardTitle}>Automatic Assignment Detection</Text>
                <Text style={styles.cardSubtitle}>
                  Upload an assignment PDF or rubric. AI extracts deadlines and creates a step-by-step breakdown.
                </Text>
              </View>
            </View>

            {/* Dropzone */}
            <View style={styles.dropZone}>
              <Icon name="upload_file" size={32} color={colors.primaryContainer} />
              <Text style={styles.dropTitle}>Upload Assignment PDF or Screenshot</Text>
              <Text style={styles.dropSub}>PDF, PNG, JPG (Max 15MB)</Text>

              {/* Sample Files for Testing */}
              <View style={styles.sampleRow}>
                <Text style={styles.samplePrompt}>Tap a sample rubric to test:</Text>
                <TouchableOpacity
                  style={[styles.samplePill, assignmentDoc === 'Raft_Consensus_Lab3.pdf' && styles.samplePillActive]}
                  onPress={() => handleSelectSampleAssignment('Raft_Consensus_Lab3.pdf')}
                >
                  <Icon name="picture_as_pdf" size={16} color={colors.errorCoral} />
                  <Text style={styles.samplePillText}>Raft_Consensus_Lab3.pdf</Text>
                </TouchableOpacity>
              </View>
            </View>

            {isAnalyzing && (
              <View style={styles.analyzingBox}>
                <Icon name="sync" size={20} color={colors.primaryContainer} />
                <Text style={styles.analyzingText}>AI detecting assignment milestones & workload...</Text>
              </View>
            )}

            {extractedAssignment && (
              <View style={styles.breakdownCard}>
                <View style={styles.breakdownHeader}>
                  <View style={styles.breakdownBadge}>
                    <Text style={styles.breakdownBadgeText}>{extractedAssignment.course}</Text>
                  </View>
                  <Text style={styles.breakdownDue}>{extractedAssignment.dueDate}</Text>
                </View>

                <Text style={styles.breakdownTitle}>{extractedAssignment.title}</Text>
                <Text style={styles.breakdownDesc}>{extractedAssignment.instructions}</Text>

                {/* AI Task Breakdown (Feature 9) */}
                <Text style={styles.stepsTitle}>AI Task Breakdown ({extractedAssignment.steps.length} steps):</Text>
                <View style={styles.stepsList}>
                  {extractedAssignment.steps.map((step, idx) => (
                    <View key={step.id} style={styles.stepItem}>
                      <View style={styles.stepNumBox}>
                        <Text style={styles.stepNumText}>{idx + 1}</Text>
                      </View>
                      <View style={styles.stepTextCol}>
                        <Text style={styles.stepItemTitle}>{step.title}</Text>
                        <Text style={styles.stepItemDuration}>⏱ {step.duration}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.importTasksBtn}
                  onPress={handleImportBrokenDownAssignment}
                  activeOpacity={0.88}
                >
                  <Icon name="add_task" size={20} color={colors.onPrimary} />
                  <Text style={styles.importTasksBtnText}>Add Broken-Down Tasks to TaskMind</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          /* TAB 3: Paste Assignment Text */
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.portalIconBox}>
                <Icon name="content_paste" size={22} color={colors.primaryContainer} />
              </View>
              <View>
                <Text style={styles.cardTitle}>Paste Assignment Details</Text>
                <Text style={styles.cardSubtitle}>
                  Paste text from WhatsApp, email, or your LMS portal noticeboard.
                </Text>
              </View>
            </View>

            <TextInput
              style={styles.pasteTextArea}
              multiline
              numberOfLines={6}
              placeholder="Paste announcement or assignment details here... (e.g. 'Software Engineering assignment due Friday 5 PM. Draw UML diagrams and sprint retrospective.')"
              placeholderTextColor={colors.outline}
              value={pastedText}
              onChangeText={setPastedText}
            />

            <TouchableOpacity
              style={styles.parseBtn}
              onPress={handleParsePastedText}
              disabled={isAnalyzing}
            >
              <Icon name="auto_awesome" size={18} color={colors.onPrimary} />
              <Text style={styles.parseBtnText}>
                {isAnalyzing ? 'Extracting Tasks...' : 'Extract & Break Down Assignment'}
              </Text>
            </TouchableOpacity>

            {extractedAssignment && (
              <View style={styles.breakdownCard}>
                <Text style={styles.breakdownTitle}>{extractedAssignment.title}</Text>
                <Text style={styles.breakdownDue}>{extractedAssignment.dueDate}</Text>
                <TouchableOpacity
                  style={[styles.importTasksBtn, { marginTop: 12 }]}
                  onPress={handleImportBrokenDownAssignment}
                >
                  <Icon name="check" size={18} color={colors.onPrimary} />
                  <Text style={styles.importTasksBtnText}>Add to My Tasks</Text>
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
    ...typography.labelSm,
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
    gap: 12,
  },
  portalIconBox: {
    width: 44,
    height: 44,
    borderRadius: rounded.lg,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    ...typography.titleMedium,
    color: colors.onSurface,
    fontWeight: '700',
  },
  cardSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    maxWidth: 240,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceContainerLow,
    padding: 10,
    borderRadius: rounded.md,
    marginVertical: 4,
  },
  securityText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    flex: 1,
    fontSize: 11,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontWeight: '600',
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
  connectBtn: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  connectBtnText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  connectedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  connectedBadgeText: {
    ...typography.labelSm,
    color: '#15803D',
    fontWeight: '700',
  },
  syncNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    backgroundColor: colors.primaryFixed,
  },
  syncNowText: {
    ...typography.labelSm,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  portalDetails: {
    gap: 2,
    paddingVertical: 4,
  },
  portalName: {
    ...typography.titleMedium,
    color: colors.onSurface,
    fontWeight: '700',
  },
  portalUrlText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  lastSyncText: {
    ...typography.labelSm,
    color: colors.outline,
    marginTop: 2,
  },
  subSectionTitle: {
    ...typography.labelLg,
    color: colors.onSurface,
    fontWeight: '700',
    marginTop: 6,
  },
  coursesList: {
    gap: 8,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLow,
    padding: 10,
    borderRadius: rounded.md,
  },
  courseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  courseBadge: {
    backgroundColor: colors.primaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  courseBadgeText: {
    ...typography.labelSm,
    color: colors.onPrimaryFixed,
    fontWeight: '700',
  },
  courseName: {
    ...typography.bodyRegular,
    color: colors.onSurface,
    fontWeight: '600',
  },
  courseInstructor: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  pendingBadge: {
    backgroundColor: colors.errorContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.full,
  },
  pendingBadgeText: {
    ...typography.labelSm,
    color: colors.onErrorContainer,
    fontWeight: '700',
  },
  disconnectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: rounded.lg,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
    marginTop: 8,
  },
  disconnectBtnText: {
    ...typography.labelMd,
    color: colors.errorCoral,
    fontWeight: '600',
  },
  dropZone: {
    borderWidth: 2,
    borderColor: 'rgba(79, 70, 229, 0.25)',
    borderStyle: 'dashed',
    borderRadius: rounded.xl,
    padding: spacing.md,
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(238, 242, 255, 0.5)',
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
  sampleRow: {
    marginTop: 8,
    alignItems: 'center',
    gap: 4,
  },
  samplePrompt: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  samplePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  samplePillActive: {
    borderColor: colors.primaryContainer,
    backgroundColor: colors.primaryFixed,
  },
  samplePillText: {
    ...typography.labelSm,
    color: colors.onSurface,
    fontWeight: '600',
  },
  analyzingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: colors.primaryFixed,
    borderRadius: rounded.lg,
  },
  analyzingText: {
    ...typography.bodyRegular,
    color: colors.onPrimaryFixed,
    fontWeight: '600',
  },
  breakdownCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    padding: spacing.md,
    gap: 8,
    marginTop: 6,
  },
  breakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  breakdownBadge: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  breakdownBadgeText: {
    ...typography.labelSm,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  breakdownDue: {
    ...typography.labelSm,
    color: colors.errorCoral,
    fontWeight: '700',
  },
  breakdownTitle: {
    ...typography.titleMedium,
    color: colors.onSurface,
    fontWeight: '700',
  },
  breakdownDesc: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  stepsTitle: {
    ...typography.labelLg,
    color: colors.onSurface,
    fontWeight: '700',
    marginTop: 6,
  },
  stepsList: {
    gap: 6,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceContainerLowest,
    padding: 8,
    borderRadius: rounded.md,
  },
  stepNumBox: {
    width: 22,
    height: 22,
    borderRadius: rounded.full,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    ...typography.labelSm,
    color: colors.onPrimaryFixed,
    fontWeight: '700',
    fontSize: 10,
  },
  stepTextCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepItemTitle: {
    ...typography.bodyRegular,
    color: colors.onSurface,
    fontWeight: '600',
    flex: 1,
  },
  stepItemDuration: {
    ...typography.labelSm,
    color: colors.primaryContainer,
    fontWeight: '600',
    marginLeft: 6,
  },
  importTasksBtn: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  importTasksBtnText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  pasteTextArea: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    padding: 12,
    ...typography.bodyRegular,
    color: colors.onSurface,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  parseBtn: {
    height: 44,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  parseBtnText: {
    ...typography.labelMd,
    color: colors.onPrimary,
    fontWeight: '700',
  },
});

export default ConnectPortalScreen;
