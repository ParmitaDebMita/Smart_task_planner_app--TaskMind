import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import AppLogo from './AppLogo';
import Icon from './Icon';

export const Header = ({ title = 'TaskMind', subtitle = 'Home', showBack = false }) => {
  const { user, unreadNotifsCount, navigateTo, goBack, currentScreen } = useTaskContext();

  const isHome = currentScreen === 'HomeDashboard';

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={goBack}
            activeOpacity={0.7}
            accessibilityLabel="Go back"
          >
            <Icon name="arrow_back" size={24} color={colors.onSurface} />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={styles.brandRow}
          onPress={() => navigateTo('HomeDashboard')}
          activeOpacity={0.8}
        >
          <AppLogo size={showBack ? 26 : 30} />
          <View style={styles.titleColumn}>
            <Text style={styles.titleText}>{title}</Text>
            {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.notifButton}
          onPress={() => navigateTo('Notifications')}
          activeOpacity={0.7}
          accessibilityLabel="Notifications"
        >
          <Icon name="notifications" size={24} color={colors.onSurfaceVariant} />
          {unreadNotifsCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{unreadNotifsCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatarButton}
          onPress={() => navigateTo('Profile')}
          activeOpacity={0.7}
          accessibilityLabel="Profile"
        >
          <Image
            source={{ uri: user.avatarUrl }}
            style={styles.avatarImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: 'rgba(249, 249, 255, 0.92)',
    backdropFilter: 'blur(16px)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(229, 231, 235, 0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.margin,
    zIndex: 50,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  titleColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleText: {
    ...typography.titleLg,
    color: colors.onSurface,
    lineHeight: 20,
    fontWeight: '700',
  },
  subtitleText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  notifButton: {
    width: 40,
    height: 40,
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: 6,
    right: 6,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: rounded.full,
    backgroundColor: colors.errorCoral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.onError,
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
  },
  avatarButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: rounded.full,
    borderWidth: 2,
    borderColor: 'rgba(79, 70, 229, 0.25)',
  },
});

export default Header;
