import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, Fonts, Radius, Spacing, Type } from '@/constants/theme';

/** Darkened terra-cotta for the pressed state of the accent fill. */
const ACCENT_PRESSED = '#a85a38';

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
    backgroundColor: Colors.light.accent,
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
