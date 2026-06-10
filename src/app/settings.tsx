import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ListRow } from '@/components/list-row';
import { Screen } from '@/components/screen';
import { SectionLabel } from '@/components/section-label';
import { Colors, Fonts, Spacing, Type } from '@/constants/theme';
import { DECKS } from '@/data';

export default function SettingsScreen() {
  // Data has no persisted default — start on the first deck (Rider-Waite-Smith).
  const [selectedId, setSelectedId] = useState(DECKS[0].id);

  return (
    <Screen>
      <Text style={styles.title}>Settings</Text>

      <SectionLabel style={styles.sectionLabel}>Deck tradition</SectionLabel>
      <View style={styles.list}>
        {DECKS.map((deck) => {
          const selected = deck.id === selectedId;
          return (
            <ListRow
              key={deck.id}
              title={deck.name}
              subtitle={deck.tradition}
              leading={<Text style={styles.deckSymbol}>{deck.symbol}</Text>}
              trailing={
                selected ? (
                  <SymbolView
                    name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                    size={16}
                    weight="semibold"
                    tintColor={Colors.light.accent}
                  />
                ) : null
              }
              onPress={() => setSelectedId(deck.id)}
              accessibilityState={{ selected }}
              style={selected ? styles.selectedRow : undefined}
            />
          );
        })}
      </View>

      <Text style={styles.footnote}>Defaults aren’t wired to storage yet — that lands in Phase 2.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.display,
    fontSize: Type.display,
    color: Colors.light.accent,
    marginBottom: Spacing.three,
  },
  sectionLabel: {
    marginBottom: Spacing.two,
  },
  list: {
    gap: Spacing.two,
  },
  deckSymbol: {
    fontFamily: Fonts.display,
    fontSize: Type.titleSm,
    color: Colors.light.accent,
    width: 28,
    textAlign: 'center',
  },
  selectedRow: {
    backgroundColor: Colors.light.backgroundSelected,
  },
  footnote: {
    fontFamily: Fonts.serifItalic,
    fontSize: Type.bodySm,
    color: Colors.light.textSecondary,
    marginTop: Spacing.four,
    textAlign: 'center',
  },
});
