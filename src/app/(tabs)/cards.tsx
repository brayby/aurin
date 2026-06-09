import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CardTile, Chip, SectionTitle } from '@/components/ui';
import { BottomTabInset, Colors, Fonts, MaxContentWidth, Radius, Spacing, SuitColors } from '@/constants/theme';
import { ALL_CARDS, type Suit } from '@/data';

const SUIT_FILTERS: (Suit | 'All')[] = ['All', 'Major Arcana', 'Wands', 'Cups', 'Swords', 'Pentacles'];
const SUIT_LABELS: Record<Suit | 'All', string> = {
  All: 'All',
  'Major Arcana': 'Major',
  Wands: 'Wands',
  Cups: 'Cups',
  Swords: 'Swords',
  Pentacles: 'Pentacles',
};

export default function CardsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suit, setSuit] = useState<Suit | 'All'>('All');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_CARDS.filter((c) => {
      if (suit !== 'All' && c.suit !== suit) return false;
      if (!q) return true;
      return c.name.toLowerCase().includes(q) || c.keywords.some((k) => k.toLowerCase().includes(q));
    });
  }, [query, suit]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <FlatList
        data={results}
        keyExtractor={(c) => String(c.id)}
        renderItem={({ item }) => (
          <CardTile card={item} onPress={() => router.push(`/card/${item.id}`)} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.two }} />}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <SectionTitle title="The Cards" subtitle="All 78 · upright & reversed meanings" />

            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by name or keyword…"
              placeholderTextColor={Colors.light.textSecondary}
              style={styles.search}
              autoCorrect={false}
              clearButtonMode="while-editing"
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterRow}
              keyboardShouldPersistTaps="handled">
              {SUIT_FILTERS.map((s) => (
                <Chip
                  key={s}
                  label={SUIT_LABELS[s]}
                  selected={suit === s}
                  accent={s === 'All' ? Colors.light.accent : SuitColors[s].accent}
                  onPress={() => setSuit(s)}
                />
              ))}
            </ScrollView>

            <Text style={styles.count}>
              {results.length} {results.length === 1 ? 'card' : 'cards'}
            </Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>No cards match your search.</Text>}
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
  header: { paddingTop: Spacing.four, gap: Spacing.three, marginBottom: Spacing.three },
  search: {
    backgroundColor: Colors.light.backgroundElement,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    fontFamily: Fonts.serif,
    fontSize: 16,
    color: Colors.light.text,
  },
  filterRow: { gap: Spacing.two, paddingVertical: Spacing.half },
  count: {
    fontFamily: Fonts.serifItalic,
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  empty: {
    fontFamily: Fonts.serifItalic,
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.five,
  },
});
