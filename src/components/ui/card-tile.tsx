import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Radius, Spacing, SuitColors } from '@/constants/theme';
import type { Card } from '@/data';

type CardTileProps = {
  card: Card;
  onPress?: () => void;
  /** Show a chevron-style affordance on the right. Defaults to true. */
  showChevron?: boolean;
};

/** A single card in a list: suit-tinted number badge, name, and keywords. Tappable. */
export function CardTile({ card, onPress, showChevron = true }: CardTileProps) {
  const suit = SuitColors[card.suit];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={card.name}
      style={({ pressed }) => [
        styles.row,
        { borderLeftColor: suit.accent },
        pressed && styles.pressed,
      ]}>
      <View style={[styles.badge, { backgroundColor: suit.bg }]}>
        <Text style={[styles.badgeText, { color: suit.accent }]}>{card.number}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{card.name}</Text>
        <Text style={styles.keywords} numberOfLines={1}>
          {card.keywords.join(' · ')}
        </Text>
      </View>
      {showChevron ? <Text style={[styles.chevron, { color: suit.accent }]}>›</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: Colors.light.backgroundElement,
    borderLeftWidth: 3,
    borderRadius: Radius.md,
    padding: Spacing.three,
  },
  pressed: { backgroundColor: Colors.light.backgroundSelected },
  badge: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontFamily: Fonts.serifSemibold, fontSize: 14 },
  body: { flex: 1 },
  name: { fontFamily: Fonts.serifSemibold, fontSize: 18, color: Colors.light.text },
  keywords: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 1,
  },
  chevron: { fontSize: 26, fontFamily: Fonts.serif, marginLeft: Spacing.one },
});
