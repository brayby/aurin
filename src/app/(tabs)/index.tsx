import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Screen } from '@/components/screen';
import { Colors, Fonts, Radius, Spacing, SuitColors } from '@/constants/theme';
import { ALL_CARDS } from '@/data';

/** Deterministic "card of the day" — stable for a given calendar date. */
function cardOfTheDay() {
  const now = new Date();
  const daySeed = Number(`${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`);
  return ALL_CARDS[daySeed % ALL_CARDS.length];
}

export default function TodayScreen() {
  const router = useRouter();
  const card = cardOfTheDay();
  const suit = SuitColors[card.suit];

  return (
    <Screen>
      <Text style={styles.wordmark}>Aurín</Text>
      <Text style={styles.tagline}>A moment of reflection, just for you.</Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Today’s card: ${card.name}`}
        onPress={() => router.push(`/card/${card.id}`)}
        style={({ pressed }) => [
          styles.card,
          { backgroundColor: suit.bg, borderColor: suit.accent },
          pressed && styles.cardPressed,
        ]}>
        <Text style={styles.cardEyebrow}>Today’s card</Text>
        <Text style={styles.cardSymbol}>{card.symbol}</Text>
        <Text style={[styles.cardName, { color: suit.accent }]}>{card.name}</Text>
        <Text style={styles.cardMeaning}>{card.meaning}</Text>
        <Text style={[styles.cardCta, { color: suit.accent }]}>Read more ›</Text>
      </Pressable>

      <Text style={styles.ritualNote}>
        Sit with your physical deck when you’re ready. Aurín is here to listen, not to draw for you.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wordmark: {
    fontFamily: Fonts.displayBlack,
    fontSize: 40,
    color: Colors.light.accent,
    textAlign: 'center',
    marginTop: Spacing.three,
  },
  tagline: {
    fontFamily: Fonts.serifItalic,
    fontSize: 18,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.one,
    marginBottom: Spacing.five,
  },
  card: {
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
  },
  cardPressed: { opacity: 0.85 },
  cardCta: {
    fontFamily: Fonts.serifSemibold,
    fontSize: 15,
    marginTop: Spacing.two,
  },
  cardEyebrow: {
    fontFamily: Fonts.serifSemibold,
    fontSize: 13,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.light.textSecondary,
  },
  cardSymbol: {
    fontSize: 44,
    color: Colors.light.text,
  },
  cardName: {
    fontFamily: Fonts.display,
    fontSize: 26,
    textAlign: 'center',
  },
  cardMeaning: {
    fontFamily: Fonts.serif,
    fontSize: 18,
    lineHeight: 27,
    color: Colors.light.text,
    textAlign: 'center',
  },
  ritualNote: {
    fontFamily: Fonts.serifItalic,
    fontSize: 15,
    lineHeight: 23,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.five,
  },
});
