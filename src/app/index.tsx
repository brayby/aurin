import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { PressableCard } from '@/components/pressable-card';
import { Screen } from '@/components/screen';
import { SectionLabel } from '@/components/section-label';
import { Colors, Fonts, Spacing, SuitColors, Type } from '@/constants/theme';
import { ALL_CARDS } from '@/data';

/** Deterministic "card of the day" — stable for a given calendar date. */
function cardOfTheDay() {
  const now = new Date();
  const daySeed = Number(`${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`);
  return ALL_CARDS[daySeed % ALL_CARDS.length];
}

export default function TodayScreen() {
  const card = cardOfTheDay();
  const suit = SuitColors[card.suit];

  return (
    <Screen>
      <Text style={styles.wordmark}>Aurín</Text>
      <Text style={styles.tagline}>A moment of reflection, just for you.</Text>

      <SectionLabel style={styles.eyebrow}>Today’s card</SectionLabel>
      <PressableCard
        onPress={() => router.push(`/cards/${card.id}`)}
        style={{ backgroundColor: suit.bg }}>
        <Text style={styles.cardSymbol}>{card.symbol}</Text>
        <Text style={[styles.cardName, { color: suit.accent }]}>{card.name}</Text>
        <Text style={styles.cardMeaning}>{card.meaning}</Text>
      </PressableCard>

      <Text style={styles.ritualNote}>
        Sit with your physical deck when you’re ready. Aurín is here to listen, not to draw for you.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wordmark: {
    fontFamily: Fonts.display,
    fontSize: Type.display,
    color: Colors.light.accent,
    marginTop: Spacing.six,
  },
  tagline: {
    fontFamily: Fonts.serifItalic,
    fontSize: Type.body,
    color: Colors.light.textSecondary,
    marginTop: Spacing.one,
    marginBottom: Spacing.five,
  },
  eyebrow: {
    marginBottom: Spacing.two,
  },
  cardSymbol: {
    fontFamily: Fonts.display,
    fontSize: Type.hero,
    color: Colors.light.text,
  },
  cardName: {
    fontFamily: Fonts.display,
    fontSize: Type.title,
    marginTop: Spacing.two,
  },
  cardMeaning: {
    fontFamily: Fonts.serif,
    fontSize: Type.body,
    lineHeight: 26,
    color: Colors.light.text,
    marginTop: Spacing.two,
  },
  ritualNote: {
    fontFamily: Fonts.serifItalic,
    fontSize: Type.bodySm,
    lineHeight: 23,
    color: Colors.light.textSecondary,
    marginTop: Spacing.five,
  },
});
