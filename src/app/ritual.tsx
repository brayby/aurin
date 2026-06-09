import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, CardPickerModal, CardTile } from '@/components/ui';
import { Colors, Fonts, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { ALL_CARDS, type Card } from '@/data';
import { useSettings } from '@/hooks/use-settings';
import { todayISO } from '@/lib/date';

type Step = 'settle' | 'draw' | 'note' | 'reflect';
const ORDER: Step[] = ['settle', 'draw', 'note', 'reflect'];

/** The daily ritual — an offline, physical-first sequence. Aurín guides; your deck draws. */
export default function RitualScreen() {
  const router = useRouter();
  const { setSetting } = useSettings();
  const [stepIndex, setStepIndex] = useState(0);
  const [drawnId, setDrawnId] = useState<number | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  const step = ORDER[stepIndex];
  const drawn = drawnId != null ? ALL_CARDS.find((c) => c.id === drawnId) : undefined;
  const isLast = stepIndex === ORDER.length - 1;

  const next = () => setStepIndex((i) => Math.min(i + 1, ORDER.length - 1));
  const dismiss = () => router.back();

  function complete() {
    setSetting('lastRitualDate', todayISO());
    dismiss();
  }

  function recordCard(card: Card) {
    setDrawnId(card.id);
    setPickerOpen(false);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.topBar}>
        <Text style={styles.eyebrow}>Today’s ritual</Text>
        <Pressable onPress={dismiss} hitSlop={12} accessibilityRole="button" accessibilityLabel="Close">
          <Text style={styles.close}>Close</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.column}>
          {step === 'settle' && (
            <Stage
              symbol="☽"
              title="Settle in"
              body="Take three slow breaths. Let the day’s noise quieten. There’s no rush here — the cards will wait for you."
            />
          )}

          {step === 'draw' && (
            <Stage
              symbol="✦"
              title="Shuffle & draw"
              body="Pick up your own deck. Shuffle while you hold your question lightly in mind, then draw a single card and turn it over. Aurín doesn’t draw for you — this moment is yours."
            />
          )}

          {step === 'note' && (
            <View style={styles.stage}>
              <Text style={styles.symbol}>✧</Text>
              <Text style={styles.title}>Which card did you draw?</Text>
              <Text style={styles.body}>
                Note it here to see its meaning. Optional — you can simply sit with the card if you prefer.
              </Text>
              {drawn ? (
                <View style={styles.drawn}>
                  <CardTile card={drawn} showChevron={false} onPress={() => setPickerOpen(true)} />
                  <Text style={styles.meaning}>{drawn.meaning}</Text>
                  <Pressable onPress={() => setPickerOpen(true)} hitSlop={8}>
                    <Text style={styles.change}>Choose a different card</Text>
                  </Pressable>
                </View>
              ) : (
                <Button label="Note my card" variant="outline" onPress={() => setPickerOpen(true)} />
              )}
            </View>
          )}

          {step === 'reflect' && (
            <View style={styles.stage}>
              <Text style={styles.symbol}>❧</Text>
              <Text style={styles.title}>Sit with it</Text>
              {drawn ? (
                <Text style={styles.body}>
                  You drew <Text style={styles.drawnName}>{drawn.name}</Text>. Let its meaning settle
                  rather than solving it. What in your day does it speak to?
                </Text>
              ) : (
                <Text style={styles.body}>
                  Hold the card you drew in mind. Let its meaning settle rather than solving it. What in
                  your day does it speak to?
                </Text>
              )}
              <Text style={styles.premiumNote}>
                Premium will let Aurín reflect your card back to you in its own words — coming soon.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {isLast ? (
          <Button label="Done" onPress={complete} />
        ) : (
          <Button label="Continue" onPress={next} />
        )}
      </View>

      <CardPickerModal
        visible={pickerOpen}
        title="The card you drew"
        onSelect={recordCard}
        onClose={() => setPickerOpen(false)}
      />
    </SafeAreaView>
  );
}

function Stage({ symbol, title, body }: { symbol: string; title: string; body: string }) {
  return (
    <View style={styles.stage}>
      <Text style={styles.symbol}>{symbol}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  eyebrow: {
    fontFamily: Fonts.serifSemibold,
    fontSize: 13,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.light.textSecondary,
  },
  close: { fontFamily: Fonts.serifSemibold, fontSize: 16, color: Colors.light.textSecondary },
  content: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.five },
  column: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
  },
  stage: { alignItems: 'center', gap: Spacing.three },
  symbol: { fontSize: 52, color: Colors.light.accent },
  title: { fontFamily: Fonts.display, fontSize: 28, color: Colors.light.text, textAlign: 'center' },
  body: {
    fontFamily: Fonts.serif,
    fontSize: 19,
    lineHeight: 30,
    color: Colors.light.text,
    textAlign: 'center',
  },
  drawn: { alignSelf: 'stretch', gap: Spacing.three, marginTop: Spacing.two },
  meaning: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 26, color: Colors.light.text },
  change: {
    fontFamily: Fonts.serifSemibold,
    fontSize: 15,
    color: Colors.light.accent,
    textAlign: 'center',
  },
  drawnName: { fontFamily: Fonts.serifSemibold, color: Colors.light.accent },
  premiumNote: {
    fontFamily: Fonts.serifItalic,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.three,
  },
  footer: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
});
