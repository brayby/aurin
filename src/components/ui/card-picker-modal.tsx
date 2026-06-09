import { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CardTile } from '@/components/ui/card-tile';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { ALL_CARDS, type Card } from '@/data';

type CardPickerModalProps = {
  visible: boolean;
  /** Heading shown at the top of the sheet, e.g. the position name. */
  title: string;
  onSelect: (card: Card) => void;
  onClose: () => void;
};

/** Full-screen searchable card list for assigning a card to a reading position. */
export function CardPickerModal({ visible, title, onSelect, onClose }: CardPickerModalProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_CARDS;
    return ALL_CARDS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.keywords.some((k) => k.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} presentationStyle="pageSheet">
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button">
              <Text style={styles.close}>Close</Text>
            </Pressable>
          </View>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by name or keyword…"
            placeholderTextColor={Colors.light.textSecondary}
            style={styles.search}
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
        </View>

        <FlatList
          data={results}
          keyExtractor={(c) => String(c.id)}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <CardTile
              card={item}
              showChevron={false}
              onPress={() => {
                onSelect(item);
                setQuery('');
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: Spacing.two }} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.empty}>No cards match “{query}”.</Text>}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background },
  header: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
    gap: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontFamily: Fonts.display, fontSize: 20, color: Colors.light.accent, flex: 1 },
  close: { fontFamily: Fonts.serifSemibold, fontSize: 16, color: Colors.light.textSecondary },
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
  listContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
  },
  empty: {
    fontFamily: Fonts.serifItalic,
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.five,
  },
});
