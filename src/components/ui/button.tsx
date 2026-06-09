import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  /** "solid" = terra-cotta fill (primary), "outline" = bordered, "ghost" = text-only. */
  variant?: 'solid' | 'outline' | 'ghost';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** The one button. Terra-cotta is the only strong accent, so solid is the primary call to action. */
export function Button({ label, onPress, variant = 'solid', disabled = false, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        variant === 'solid' && styles.solid,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      <Text
        style={[
          styles.label,
          variant === 'solid' ? styles.labelOnAccent : styles.labelAccent,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 50,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: { backgroundColor: Colors.light.accent },
  outline: { borderWidth: 1, borderColor: Colors.light.accent, backgroundColor: 'transparent' },
  ghost: { backgroundColor: 'transparent' },
  pressed: { opacity: 0.75 },
  disabled: { opacity: 0.4 },
  label: { fontFamily: Fonts.serifSemibold, fontSize: 17 },
  labelOnAccent: { color: Colors.light.onAccent },
  labelAccent: { color: Colors.light.accent },
});
