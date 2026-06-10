import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ListRow } from '@/components/list-row';
import { Screen } from '@/components/screen';
import { Colors, Fonts, Spacing, Type } from '@/constants/theme';
import { SPREADS, SPREAD_KEYS } from '@/data';

export default function ReadScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Read a spread</Text>
      <Text style={styles.subtitle}>
        Lay your cards out, pick the shape of the question, and Aurín will guide you through it.
      </Text>

      <View style={styles.list}>
        {SPREAD_KEYS.map((key) => {
          const spread = SPREADS[key];
          return (
            <ListRow
              key={key}
              title={spread.name}
              subtitle={spread.desc}
              trailing={<Text style={styles.count}>{spread.count} cards</Text>}
              onPress={() => router.push(`/read/${key}`)}
            />
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.display,
    fontSize: Type.display,
    color: Colors.light.accent,
  },
  subtitle: {
    fontFamily: Fonts.serif,
    fontSize: Type.body,
    lineHeight: 25,
    color: Colors.light.textSecondary,
    marginTop: Spacing.one,
    marginBottom: Spacing.four,
  },
  list: {
    gap: Spacing.two,
  },
  count: {
    fontFamily: Fonts.serif,
    fontSize: Type.caption,
    color: Colors.light.textSecondary,
  },
});
