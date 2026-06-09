import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, Colors, Fonts, MaxContentWidth, Radius, Spacing, SuitColors } from '@/constants/theme';
import { ALL_CARDS } from '@/data';

export default function CardDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const card = ALL_CARDS.find((c) => String(c.id) === id);

  if (!card) {
    return (
      <SafeAreaView style={styles.safe}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <Text style={styles.missing}>That card couldn’t be found.</Text>
      </SafeAreaView>
    );
  }

  const suit = SuitColors[card.suit];

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right']}>
      <Stack.Screen options={{ title: card.name }} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.column}>
          {/* Suit-tinted hero */}
          <View style={[styles.hero, { backgroundColor: suit.bg, borderColor: suit.accent }]}>
            <Text style={styles.symbol}>{card.symbol}</Text>
            <Text style={[styles.name, { color: suit.accent }]}>{card.name}</Text>
            <Text style={styles.meta}>
              {card.suit} · {card.number} · {card.element}
            </Text>
          </View>

          {/* Keywords */}
          <View style={styles.keywordRow}>
            {card.keywords.map((kw) => (
              <View key={kw} style={[styles.keyword, { borderColor: suit.accent }]}>
                <Text style={[styles.keywordText, { color: suit.accent }]}>{kw}</Text>
              </View>
            ))}
          </View>

          {/* Upright */}
          <Text style={styles.sectionLabel}>Upright</Text>
          <Text style={styles.bodyText}>{card.meaning}</Text>

          {/* Reversed */}
          <Text style={styles.sectionLabel}>Reversed</Text>
          <Text style={styles.bodyText}>{card.reversed}</Text>
        </View>
      </ScrollView>
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
  hero: {
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
  },
  symbol: { fontSize: 48, color: Colors.light.text },
  name: { fontFamily: Fonts.display, fontSize: 28, textAlign: 'center' },
  meta: {
    fontFamily: Fonts.serifSemibold,
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.light.textSecondary,
  },
  keywordRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
  keyword: {
    borderWidth: 1,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
  },
  keywordText: { fontFamily: Fonts.serifSemibold, fontSize: 14 },
  sectionLabel: {
    fontFamily: Fonts.serifSemibold,
    fontSize: 13,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.light.textSecondary,
    marginTop: Spacing.five,
    marginBottom: Spacing.two,
  },
  bodyText: {
    fontFamily: Fonts.serif,
    fontSize: 18,
    lineHeight: 28,
    color: Colors.light.text,
  },
});
