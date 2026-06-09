import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Button } from '@/components/ui';
import { Colors, Fonts, Radius, Spacing, SuitColors } from '@/constants/theme';
import { ALL_CARDS } from '@/data';
import { useSettings } from '@/hooks/use-settings';
import { todayISO } from '@/lib/date';

/** Deterministic "card of the day" — stable for a given calendar date. */
function cardOfTheDay() {
  const now = new Date();
  const daySeed = Number(`${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`);
  return ALL_CARDS[daySeed % ALL_CARDS.length];
}

export default function TodayScreen() {
  const router = useRouter();
  const { settings } = useSettings();
  const card = cardOfTheDay();
  const suit = SuitColors[card.suit];
  const ritualDoneToday = settings.lastRitualDate === todayISO();

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

      <View style={styles.ritual}>
        {ritualDoneToday ? (
          <>
            <Text style={styles.ritualDone}>✓ You’ve sat with today’s card.</Text>
            <Button label="Begin again" variant="ghost" onPress={() => router.push('/ritual')} />
          </>
        ) : (
          <>
            <Button label="Begin today’s ritual" onPress={() => router.push('/ritual')} />
            <Text style={styles.ritualNote}>
              A few quiet moments with your own deck. Aurín is here to listen, not to draw for you.
            </Text>
          </>
        )}
      </View>
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
  ritual: {
    marginTop: Spacing.five,
    gap: Spacing.three,
  },
  ritualDone: {
    fontFamily: Fonts.serifSemibold,
    fontSize: 17,
    color: Colors.light.accent,
    textAlign: 'center',
  },
  ritualNote: {
    fontFamily: Fonts.serifItalic,
    fontSize: 15,
    lineHeight: 23,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
});
