import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ListRow } from '@/components/list-row';
import { Screen } from '@/components/screen';
import { BottomTabInset, Colors, Fonts, Radius, Spacing, SuitColors, Type } from '@/constants/theme';
import { ALL_CARDS, type Card } from '@/data';

function CardRow({ card }: { card: Card }) {
  const suit = SuitColors[card.suit];
  return (
    <ListRow
      title={card.name}
      subtitle={card.suit}
      leading={
        <View style={[styles.badge, { backgroundColor: suit.bg }]}>
          <Text style={[styles.badgeText, { color: suit.accent }]}>{card.symbol}</Text>
        </View>
      }
      onPress={() => router.push(`/cards/${card.id}`)}
      style={styles.row}
    />
  );
}

export default function CardsScreen() {
  return (
    <Screen scroll={false} contentStyle={styles.content}>
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignSelf: 'center',
    paddingTop: 0,
  },
  listContent: {
    paddingBottom: BottomTabInset + Spacing.five,
  },
  header: {
    paddingTop: Spacing.four,
    paddingBottom: Spacing.three,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: Type.display,
    color: Colors.light.accent,
  },
  subtitle: {
    fontFamily: Fonts.serifItalic,
    fontSize: Type.bodySm,
    color: Colors.light.textSecondary,
    marginTop: Spacing.half,
  },
  row: {
    marginBottom: Spacing.two,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: Fonts.display,
    fontSize: Type.titleSm,
  },
});
