import { StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';

import { Colors, Fonts, Type } from '@/constants/theme';

type SectionLabelProps = {
  children: string;
  style?: StyleProp<TextStyle>;
};

/** Small-caps section heading — letterspaced, muted. */
export function SectionLabel({ children, style }: SectionLabelProps) {
  return <Text style={[styles.label, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.serifMedium,
    fontSize: Type.caption,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.light.textSecondary,
  },
});
