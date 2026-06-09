import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  /** Override the selected fill (e.g. a suit accent). Defaults to terra-cotta. */
  accent?: string;
};

/** Selectable pill — used for the suit filter row. */
export function Chip({ label, selected = false, onPress, accent = Colors.light.accent }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.chip,
        selected ? { backgroundColor: accent, borderColor: accent } : styles.unselected,
        pressed && styles.pressed,
      ]}>
      <Text
        style={[styles.label, { color: selected ? Colors.light.onAccent : Colors.light.textSecondary }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  unselected: { backgroundColor: Colors.light.backgroundElement, borderColor: Colors.light.border },
  pressed: { opacity: 0.7 },
  label: { fontFamily: Fonts.serifSemibold, fontSize: 14 },
});
