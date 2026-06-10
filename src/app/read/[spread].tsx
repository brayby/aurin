import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Colors, Fonts, Radius, Spacing, Type } from '@/constants/theme';
import { SPREADS } from '@/data';

export default function SpreadScreen() {
  const { spread: spreadKey } = useLocalSearchParams<{ spread: string }>();
  const spread = spreadKey ? SPREADS[spreadKey] : undefined;

  if (!spread) {
    return (
      <Screen>
        <BackLink />
        <Text style={styles.notFound}>This spread can’t be found.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <BackLink />
      <Text style={styles.title}>{spread.name}</Text>
      <Text style={styles.desc}>{spread.desc}</Text>

      <View style={styles.list}>
        {spread.positions.map((position, i) => (
          <View key={position}>
            <Text style={styles.positionName}>{position}</Text>
            <Text style={styles.positionDesc}>{spread.positionDesc[i]}</Text>
            <NoteInput />
          </View>
        ))}
      </View>
    </Screen>
  );
}

/** Note input with a visible focus cue — the border picks up the accent. */
function NoteInput() {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      style={[styles.note, focused && styles.noteFocused]}
      placeholder="Add a note…"
      placeholderTextColor={Colors.light.textSecondary}
      multiline
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

/** Minimal back affordance — the nested stack header is hidden. */
function BackLink() {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.back()}
      hitSlop={Spacing.two}
      style={({ pressed }) => pressed && styles.backPressed}>
      <Text style={styles.back}>‹ Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  back: {
    fontFamily: Fonts.serifMedium,
    fontSize: Type.bodySm,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.three,
  },
  backPressed: {
    opacity: 0.6,
  },
  notFound: {
    fontFamily: Fonts.serif,
    fontSize: Type.body,
    color: Colors.light.textSecondary,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: Type.title,
    color: Colors.light.accent,
  },
  desc: {
    fontFamily: Fonts.serif,
    fontSize: Type.bodySm,
    color: Colors.light.textSecondary,
    marginTop: Spacing.one,
    marginBottom: Spacing.four,
  },
  list: {
    gap: Spacing.four,
  },
  positionName: {
    fontFamily: Fonts.serifMedium,
    fontSize: Type.body,
    color: Colors.light.text,
  },
  positionDesc: {
    fontFamily: Fonts.serif,
    fontSize: Type.bodySm,
    lineHeight: 22,
    color: Colors.light.textSecondary,
    marginTop: Spacing.half,
  },
  note: {
    fontFamily: Fonts.serif,
    fontSize: Type.bodySm,
    color: Colors.light.text,
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    marginTop: Spacing.two,
    minHeight: 44,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  noteFocused: {
    borderColor: Colors.light.accent,
  },
});
