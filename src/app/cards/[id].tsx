import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { SectionLabel } from '@/components/section-label';
import { Colors, Fonts, Radius, Spacing, SuitColors, Type } from '@/constants/theme';
import { ALL_CARDS } from '@/data';

export default function CardDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const card = ALL_CARDS.find((c) => String(c.id) === id);

  if (!card) {
    return (
      <Screen>
        <BackLink />
        <Text style={styles.notFound}>This card can’t be found.</Text>
      </Screen>
    );
  }

  const suit = SuitColors[card.suit];

  return (
    <Screen>
      <BackLink />

      <View style={[styles.badge, { backgroundColor: suit.bg }]}>
        <Text style={[styles.badgeSymbol, { color: suit.accent }]}>{card.symbol}</Text>
      </View>
      <Text style={styles.name}>{card.name}</Text>
      <SectionLabel style={styles.suit}>{card.suit}</SectionLabel>
      <Text style={styles.keywords}>{card.keywords.join(' · ')}</Text>

      <SectionLabel style={styles.sectionLabel}>Upright</SectionLabel>
      <Text style={styles.meaning}>{card.meaning}</Text>

      <SectionLabel style={styles.sectionLabel}>Reversed</SectionLabel>
      <Text style={styles.meaning}>{card.reversed}</Text>
    </Screen>
  );
}

/** Minimal back affordance — the nested stack header is hidden. */
function BackLink() {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.back()}
      hitSlop={Spacing.two}
      style={({ pressed }) => pressed && styles.backPressed}>
      <Text style={styles.back}>‹ Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  back: {
    fontFamily: Fonts.serifMedium,
    fontSize: Type.bodySm,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.three,
  },
  backPressed: {
    opacity: 0.6,
  },
  notFound: {
    fontFamily: Fonts.serif,
    fontSize: Type.body,
    color: Colors.light.textSecondary,
  },
  badge: {
    width: 64,
    height: 64,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  badgeSymbol: {
    fontFamily: Fonts.display,
    fontSize: Type.display,
  },
  name: {
    fontFamily: Fonts.display,
    fontSize: Type.title,
    color: Colors.light.text,
  },
  suit: {
    marginTop: Spacing.one,
  },
  keywords: {
    fontFamily: Fonts.serif,
    fontSize: Type.bodySm,
    color: Colors.light.textSecondary,
    marginTop: Spacing.two,
  },
  sectionLabel: {
    marginTop: Spacing.four,
    marginBottom: Spacing.two,
  },
  meaning: {
    fontFamily: Fonts.serif,
    fontSize: Type.body,
    lineHeight: 26,
    color: Colors.light.text,
  },
});
