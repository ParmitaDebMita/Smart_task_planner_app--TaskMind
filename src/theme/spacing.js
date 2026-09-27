import { Platform } from 'react-native';

// Stitch TaskMind Spacing, Border Radius & Elevation Tokens
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  margin: 16,
  gutter: 16,
};

export const rounded = {
  xs: 4,
  sm: 4,
  default: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const borderRadius = rounded;

export const shadows = {
  none: Platform.select({
    web: {
      boxShadow: 'none',
    },
    default: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
  }),
  xs: Platform.select({
    web: {
      boxShadow: '0px 1px 4px rgba(23, 32, 51, 0.03)',
    },
    default: {
      shadowColor: '#172033',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 4,
      elevation: 1,
    },
  }),
  sm: Platform.select({
    web: {
      boxShadow: '0px 2px 8px rgba(23, 32, 51, 0.04)',
    },
    default: {
      shadowColor: '#172033',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 2,
    },
  }),
  md: Platform.select({
    web: {
      boxShadow: '0px 4px 12px rgba(23, 32, 51, 0.08)',
    },
    default: {
      shadowColor: '#172033',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
  }),
  lg: Platform.select({
    web: {
      boxShadow: '0px 6px 16px rgba(23, 32, 51, 0.12)',
    },
    default: {
      shadowColor: '#172033',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 6,
    },
  }),
  xl: Platform.select({
    web: {
      boxShadow: '0px 10px 24px rgba(23, 32, 51, 0.16)',
    },
    default: {
      shadowColor: '#172033',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.16,
      shadowRadius: 24,
      elevation: 10,
    },
  }),
  fab: Platform.select({
    web: {
      boxShadow: '0px 6px 16px rgba(23, 32, 51, 0.18)',
    },
    default: {
      shadowColor: '#172033',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.18,
      shadowRadius: 16,
      elevation: 8,
    },
  }),
};

export const elevation = shadows;

export default {
  ...spacing,
  spacing,
  rounded,
  borderRadius,
  shadows,
  elevation,
};

