import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/theme';

type SectionTitleProps = {
  title: string;
  /** Optional italic line below the title. */
  subtitle?: string;
};

/** A screen's main heading: Cinzel display title in terra-cotta with an optional serif-italic subtitle. */
export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

/** Small uppercase label used above a group of items. */
export function Eyebrow({ children }: { children: string }) {
  return <Text style={styles.eyebrow}>{children}</Text>;
}

const styles = StyleSheet.create({
  wrap: { marginBottom: Spacing.four },
  title: { fontFamily: Fonts.display, fontSize: 30, color: Colors.light.accent },
  subtitle: {
    fontFamily: Fonts.serifItalic,
    fontSize: 16,
    lineHeight: 23,
    color: Colors.light.textSecondary,
    marginTop: Spacing.half,
  },
  eyebrow: {
    fontFamily: Fonts.serifSemibold,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.light.textSecondary,
    marginBottom: Spacing.two,
  },
});
