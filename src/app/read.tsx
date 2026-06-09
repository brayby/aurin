import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { SPREADS, SPREAD_KEYS } from '@/data';

export default function ReadScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Read a spread</Text>
      <Text style={styles.subtitle}>
        Lay your cards out, choose the shape of the question, and Aurín will help you read it.
      </Text>

      <View style={styles.list}>
        {SPREAD_KEYS.map((key) => {
          const spread = SPREADS[key];
          return (
            <View key={key} style={styles.spread}>
              <View style={styles.spreadHead}>
                <Text style={styles.spreadName}>{spread.name}</Text>
                <Text style={styles.count}>{spread.count}</Text>
              </View>
              <Text style={styles.spreadDesc}>{spread.desc}</Text>
            </View>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontFamily: Fonts.display, fontSize: 30, color: Colors.light.accent },
  subtitle: {
    fontFamily: Fonts.serif,
    fontSize: 17,
    lineHeight: 25,
    color: Colors.light.textSecondary,
    marginTop: Spacing.one,
    marginBottom: Spacing.four,
  },
  list: { gap: Spacing.two },
  spread: {
    backgroundColor: Colors.light.backgroundElement,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.lg,
    padding: Spacing.three,
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
