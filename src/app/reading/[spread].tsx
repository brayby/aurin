import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, CardPickerModal, CardTile, Eyebrow } from '@/components/ui';
import { BottomTabInset, Colors, Fonts, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { ALL_CARDS, SPREADS, type Card } from '@/data';

export default function ReadingScreen() {
  const { spread: spreadKey } = useLocalSearchParams<{ spread: string }>();
  const spread = SPREADS[spreadKey];

  // assignments[i] = the chosen card's id for position i, or null.
  const [assignments, setAssignments] = useState<(number | null)[]>(() =>
    Array(spread?.count ?? 0).fill(null),
  );
  const [pickerFor, setPickerFor] = useState<number | null>(null);

  const byId = useMemo(() => {
    const m = new Map<number, Card>();
    for (const c of ALL_CARDS) m.set(c.id, c);
    return m;
  }, []);

  if (!spread) {
    return (
      <SafeAreaView style={styles.safe}>
        <Stack.Screen options={{ title: 'Reading' }} />
        <Text style={styles.missing}>That spread couldn’t be found.</Text>
      </SafeAreaView>
    );
  }

  const assignedCount = assignments.filter((id) => id != null).length;

  function assign(card: Card) {
    if (pickerFor == null) return;
    setAssignments((prev) => {
      const next = [...prev];
      next[pickerFor] = card.id;
      return next;
    });
    setPickerFor(null);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right']}>
      <Stack.Screen options={{ title: spread.name }} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.column}>
          <Text style={styles.desc}>{spread.desc}</Text>
          <Text style={styles.hint}>
            Draw from your own deck, then note each card here to see its meaning in this position.
          </Text>

          {spread.positions.map((position, i) => {
            const cardId = assignments[i];
            const card = cardId != null ? byId.get(cardId) : undefined;
            return (
              <View key={`${position}-${i}`} style={styles.position}>
                <Eyebrow>{`Position ${i + 1} · ${position}`}</Eyebrow>
                <Text style={styles.positionDesc}>{spread.positionDesc[i]}</Text>

                {card ? (
                  <View style={styles.assigned}>
                    <CardTile card={card} showChevron={false} onPress={() => setPickerFor(i)} />
                    <Text style={styles.meaning}>{card.meaning}</Text>
                    <Pressable onPress={() => setPickerFor(i)} hitSlop={8}>
                      <Text style={styles.change}>Choose a different card</Text>
                    </Pressable>
                  </View>
                ) : (
                  <Button label="Choose a card" variant="outline" onPress={() => setPickerFor(i)} />
                )}
              </View>
            );
          })}

          {/* Premium teaser — AI synthesis lands in Phase 3, behind the subscription. */}
          <View style={styles.premium}>
            <Text style={styles.premiumEyebrow}>Premium</Text>
            <Text style={styles.premiumTitle}>Weave these together</Text>
            <Text style={styles.premiumBody}>
              {assignedCount === spread.count
                ? 'Aurín can read all your cards as one story — how they speak to each other across the spread. Coming with Premium.'
                : `Fill all ${spread.count} positions, then let Aurín read them as a single story. Coming with Premium.`}
            </Text>
            <Button label="Weave these together" disabled style={styles.premiumButton} />
          </View>
        </View>
      </ScrollView>

      <CardPickerModal
        visible={pickerFor != null}
        title={pickerFor != null ? spread.positions[pickerFor] : ''}
        onSelect={assign}
        onClose={() => setPickerFor(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background },
  content: { alignItems: 'center', paddingBottom: BottomTabInset + Spacing.five },
  column: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  missing: {
    fontFamily: Fonts.serifItalic,
    fontSize: 17,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.five,
  },
  desc: { fontFamily: Fonts.display, fontSize: 18, color: Colors.light.accent },
  hint: {
    fontFamily: Fonts.serifItalic,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.light.textSecondary,
    marginTop: Spacing.two,
    marginBottom: Spacing.four,
  },
  position: {
    marginBottom: Spacing.four,
    paddingTop: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  positionDesc: {
    fontFamily: Fonts.serif,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.three,
  },
  assigned: { gap: Spacing.three },
  meaning: {
    fontFamily: Fonts.serif,
    fontSize: 17,
    lineHeight: 26,
    color: Colors.light.text,
  },
  change: { fontFamily: Fonts.serifSemibold, fontSize: 15, color: Colors.light.accent },
  premium: {
    marginTop: Spacing.three,
    backgroundColor: Colors.light.backgroundElement,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.lg,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  premiumEyebrow: {
    fontFamily: Fonts.serifSemibold,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.light.accent,
  },
  premiumTitle: { fontFamily: Fonts.display, fontSize: 20, color: Colors.light.text },
  premiumBody: {
    fontFamily: Fonts.serif,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.textSecondary,
  },
  premiumButton: { marginTop: Spacing.two },
});
