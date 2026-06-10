import { SymbolView } from 'expo-symbols';
import { ReactNode } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { PressableCard } from '@/components/pressable-card';
import { Colors, Fonts, Spacing, Type } from '@/constants/theme';

type ListRowProps = {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

/** Horizontal card row: optional leading, title/subtitle, optional trailing. */
export function ListRow({ title, subtitle, leading, trailing, onPress, style }: ListRowProps) {
  const showChevron = Boolean(onPress) && trailing === undefined;

  return (
    <PressableCard onPress={onPress} style={style}>
      <View style={styles.row}>
        {leading}
        <View style={styles.body}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {trailing}
        {showChevron && (
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={14}
            weight="medium"
            tintColor={Colors.light.textSecondary}
          />
        )}
      </View>
    </PressableCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 44,
  },
  body: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.serifMedium,
    fontSize: Type.body,
    color: Colors.light.text,
  },
  subtitle: {
    fontFamily: Fonts.serif,
    fontSize: Type.bodySm,
    color: Colors.light.textSecondary,
    marginTop: Spacing.half,
  },
});
