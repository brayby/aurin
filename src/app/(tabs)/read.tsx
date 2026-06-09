import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { SectionTitle } from '@/components/ui';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { SPREADS, SPREAD_KEYS } from '@/data';
import { useSettings } from '@/hooks/use-settings';

export default function ReadScreen() {
  const router = useRouter();
  const { settings } = useSettings();

  // Float the user's default spread to the top of the list.
  const orderedKeys = useMemo(() => {
    const def = settings.defaultSpreadKey;
    if (!def || !SPREADS[def]) return SPREAD_KEYS;
    return [def, ...SPREAD_KEYS.filter((k) => k !== def)];
  }, [settings.defaultSpreadKey]);

  return (
    <Screen>
      <SectionTitle
        title="Read a spread"
        subtitle="Lay your cards out, choose the shape of the question, and Aurín will help you read it."
      />

      <View style={styles.list}>
        {orderedKeys.map((key) => {
          const spread = SPREADS[key];
          const isDefault = settings.defaultSpreadKey === key;
          return (
            <Pressable
              key={key}
              accessibilityRole="button"
              onPress={() => router.push(`/reading/${key}`)}
              style={({ pressed }) => [
                styles.spread,
                isDefault && styles.spreadDefault,
                pressed && styles.pressed,
              ]}>
              <View style={styles.spreadHead}>
                <Text style={styles.spreadName}>{spread.name}</Text>
                <Text style={styles.count}>{spread.count}</Text>
              </View>
              <Text style={styles.spreadDesc}>{spread.desc}</Text>
              {isDefault ? <Text style={styles.defaultBadge}>Your default</Text> : null}
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { gap: Spacing.two },
  spread: {
    backgroundColor: Colors.light.backgroundElement,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.lg,
    padding: Spacing.three,
  },
  spreadDefault: { borderColor: Colors.light.accent },
  pressed: { backgroundColor: Colors.light.backgroundSelected },
  defaultBadge: {
    fontFamily: Fonts.serifSemibold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.light.accent,
    marginTop: Spacing.two,
  },
  spreadHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spreadName: { fontFamily: Fonts.serifSemibold, fontSize: 19, color: Colors.light.text, flex: 1 },
  count: {
    fontFamily: Fonts.serifSemibold,
    fontSize: 14,
    color: Colors.light.onAccent,
    backgroundColor: Colors.light.accent,
    minWidth: 26,
    textAlign: 'center',
    borderRadius: Radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  spreadDesc: {
    fontFamily: Fonts.serif,
    fontSize: 15,
    color: Colors.light.textSecondary,
    marginTop: Spacing.half,
  },
});
