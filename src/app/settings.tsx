import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { DECKS } from '@/data';

export default function SettingsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.sectionLabel}>Deck tradition</Text>
      <View style={styles.list}>
        {DECKS.map((deck) => (
          <View key={deck.id} style={styles.deck}>
            <Text style={styles.deckSymbol}>{deck.symbol}</Text>
            <View style={styles.deckBody}>
              <Text style={styles.deckName}>{deck.name}</Text>
              <Text style={styles.deckMeta} numberOfLines={1}>
                {deck.tradition}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.footnote}>Defaults aren’t wired to storage yet — that lands in Phase 2.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontFamily: Fonts.display, fontSize: 30, color: Colors.light.accent, marginBottom: Spacing.three },
  sectionLabel: {
    fontFamily: Fonts.serifSemibold,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.light.textSecondary,
    marginBottom: Spacing.two,
  },
  list: { gap: Spacing.two },
  deck: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: Colors.light.backgroundElement,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    padding: Spacing.three,
  },
  deckSymbol: { fontSize: 22, color: Colors.light.accent, width: 28, textAlign: 'center' },
  deckBody: { flex: 1 },
  deckName: { fontFamily: Fonts.serifSemibold, fontSize: 17, color: Colors.light.text },
  deckMeta: { fontFamily: Fonts.serif, fontSize: 14, color: Colors.light.textSecondary },
  footnote: {
    fontFamily: Fonts.serifItalic,
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: Spacing.four,
    textAlign: 'center',
  },
});
