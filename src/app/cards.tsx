import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, Colors, Fonts, MaxContentWidth, Radius, Spacing, SuitColors } from '@/constants/theme';
import { ALL_CARDS, type Card } from '@/data';

function CardRow({ card }: { card: Card }) {
  const suit = SuitColors[card.suit];
  return (
    <View style={[styles.row, { borderLeftColor: suit.accent }]}>
      <View style={[styles.badge, { backgroundColor: suit.bg }]}>
        <Text style={[styles.badgeText, { color: suit.accent }]}>{card.number}</Text>
      </View>
      <View style={styles.rowBody}>
        <Text style={styles.cardName}>{card.name}</Text>
        <Text style={styles.keywords} numberOfLines={1}>
          {card.keywords.join(' · ')}
        </Text>
      </View>
    </View>
  );
}

export default function CardsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <FlatList
        data={ALL_CARDS}
        keyExtractor={(c) => String(c.id)}
        renderItem={({ item }) => <CardRow card={item} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>The Cards</Text>
            <Text style={styles.subtitle}>All 78 · upright &amp; reversed meanings</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background },
  listContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.five,
  },
  header: { paddingVertical: Spacing.four },
  title: { fontFamily: Fonts.display, fontSize: 30, color: Colors.light.accent },
  subtitle: {
    fontFamily: Fonts.serifItalic,
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginTop: Spacing.half,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: Colors.light.backgroundElement,
    borderLeftWidth: 3,
    borderRadius: Radius.md,
    padding: Spacing.three,
    marginBottom: Spacing.two,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontFamily: Fonts.serifSemibold, fontSize: 14 },
  rowBody: { flex: 1 },
  cardName: { fontFamily: Fonts.serifSemibold, fontSize: 18, color: Colors.light.text },
  keywords: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 1,
  },
});
