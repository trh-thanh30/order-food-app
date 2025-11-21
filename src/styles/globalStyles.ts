import { StyleSheet } from 'react-native';

import { theme } from './theme';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: theme.spacing.MD,
    backgroundColor: theme.colors.BACKGROUND_LIGHT,
  },
  heading: {
    fontSize: theme.typography.FONT_SIZE.XL,
    fontWeight: '600',
    color: theme.colors.TEXT_DARK,
  },
  text: {
    fontSize: theme.typography.FONT_SIZE.MD,
    color: theme.colors.TEXT_DARK,
  },
});

