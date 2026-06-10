import { router, useLocalSearchParams } from 'expo-router';
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
            <TextInput
              style={styles.note}
              placeholder="Add a note…"
              placeholderTextColor={Colors.light.textSecondary}
              multiline
            />
          </View>
        ))}
      </View>
    </Screen>
  );
}

/** Minimal back affordance — the nested stack header is hidden. */
function BackLink() {
  return (
    <Pressable accessibilityRole="button" onPress={() => router.back()} hitSlop={Spacing.two}>
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
  },
});
