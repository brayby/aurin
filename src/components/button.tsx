import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, Fonts, Radius, Spacing, Type } from '@/constants/theme';

/**
 * Local darker terra-cotta fill for the button only. The shared `accent`
 * token (#c4714a) passes WCAG AA solely as large/display text; the button
 * label is 17px body text on the fill, so it needs ≥4.5:1 against
 * `onAccent` (#fef8f2). #a85a38 measures 4.76:1 and the pressed shade
 * #964f31 measures 5.76:1 — same terracotta hue family, just deeper.
 */
const ACCENT_FILL = '#a85a38';
const ACCENT_PRESSED = '#964f31';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Primary accent-filled button. */
export function Button({ title, onPress, disabled, style }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled) }}
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: ACCENT_FILL,
    borderRadius: Radius.md,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
  },
  pressed: {
    backgroundColor: ACCENT_PRESSED,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontFamily: Fonts.serifSemibold,
    fontSize: Type.body,
    color: Colors.light.onAccent,
  },
});
