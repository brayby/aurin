import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Eyebrow, SectionTitle } from '@/components/ui';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { DECKS, SPREADS, SPREAD_KEYS } from '@/data';
import { useSettings } from '@/hooks/use-settings';

export default function SettingsScreen() {
  const { settings, setSetting } = useSettings();

  return (
    <Screen>
      <SectionTitle title="Settings" />

      <Eyebrow>Deck tradition</Eyebrow>
      <Text style={styles.note}>Your preferred deck — used to tailor reading notes later.</Text>
      <View style={styles.list}>
        {DECKS.map((deck) => {
          const selected = settings.defaultDeckId === deck.id;
          return (
            <Pressable
              key={deck.id}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setSetting('defaultDeckId', selected ? null : deck.id)}
              style={({ pressed }) => [
                styles.option,
                selected && styles.optionSelected,
                pressed && styles.pressed,
              ]}>
              <Text style={[styles.optionSymbol, selected && styles.symbolSelected]}>{deck.symbol}</Text>
              <View style={styles.optionBody}>
                <Text style={styles.optionName}>{deck.name}</Text>
                <Text style={styles.optionMeta} numberOfLines={1}>
                  {deck.tradition}
                </Text>
              </View>
              {selected ? <Text style={styles.check}>✓</Text> : null}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.spacer} />

      <Eyebrow>Default spread</Eyebrow>
      <Text style={styles.note}>The spread the Read tab will suggest first.</Text>
      <View style={styles.list}>
        {SPREAD_KEYS.map((key) => {
          const spread = SPREADS[key];
          const selected = settings.defaultSpreadKey === key;
          return (
            <Pressable
              key={key}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setSetting('defaultSpreadKey', selected ? null : key)}
              style={({ pressed }) => [
                styles.option,
                selected && styles.optionSelected,
                pressed && styles.pressed,
              ]}>
              <View style={styles.optionBody}>
                <Text style={styles.optionName}>{spread.name}</Text>
                <Text style={styles.optionMeta} numberOfLines={1}>
                  {spread.desc}
                </Text>
              </View>
              {selected ? <Text style={styles.check}>✓</Text> : null}
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.footnote}>Your choices are saved on this device.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  note: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.three,
    marginTop: -Spacing.one,
  },
  list: { gap: Spacing.two },
  spacer: { height: Spacing.five },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: Colors.light.backgroundElement,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    padding: Spacing.three,
  },
  optionSelected: { borderColor: Colors.light.accent, backgroundColor: Colors.light.backgroundSelected },
  pressed: { opacity: 0.8 },
  optionSymbol: { fontSize: 22, color: Colors.light.textSecondary, width: 28, textAlign: 'center' },
  symbolSelected: { color: Colors.light.accent },
  optionBody: { flex: 1 },
  optionName: { fontFamily: Fonts.serifSemibold, fontSize: 17, color: Colors.light.text },
  optionMeta: { fontFamily: Fonts.serif, fontSize: 14, color: Colors.light.textSecondary },
  check: { fontFamily: Fonts.serifSemibold, fontSize: 18, color: Colors.light.accent },
  footnote: {
    fontFamily: Fonts.serifItalic,
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: Spacing.four,
    textAlign: 'center',
  },
});
