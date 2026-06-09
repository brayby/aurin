import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui';
import { Colors, Fonts, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import {
  useSettings,
  type ExperienceLevel,
  type RitualTime,
} from '@/hooks/use-settings';

const EXPERIENCE_OPTIONS: { value: ExperienceLevel; label: string; hint: string }[] = [
  { value: 'new', label: 'New to tarot', hint: 'I’m just beginning to learn the cards.' },
  { value: 'some', label: 'Some experience', hint: 'I know the basics and want to go deeper.' },
  { value: 'seasoned', label: 'Seasoned reader', hint: 'I read often and know my deck well.' },
];

const RITUAL_OPTIONS: { value: RitualTime; label: string; hint: string }[] = [
  { value: 'morning', label: 'In the morning', hint: 'Set an intention for the day ahead.' },
  { value: 'evening', label: 'In the evening', hint: 'Reflect on the day behind you.' },
  { value: 'anytime', label: 'Whenever the moment calls', hint: 'No fixed time — I read when I need to.' },
];

const INTENTIONS = ['Clarity', 'Reflection', 'Decisions', 'Daily practice', 'Just curious'];

/** First-run onboarding: four skippable steps that personalise Aurín. */
export default function OnboardingScreen() {
  const { settings, setSetting } = useSettings();
  const [step, setStep] = useState(0);

  const finish = () => setSetting('onboardingComplete', true);
  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top bar: back + progress + skip */}
      <View style={styles.topBar}>
        {step > 0 ? (
          <Pressable onPress={back} hitSlop={12} accessibilityRole="button">
            <Text style={styles.topAction}>‹ Back</Text>
          </Pressable>
        ) : (
          <View style={styles.topSpacer} />
        )}

        <View style={styles.dots}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>

        <Pressable onPress={finish} hitSlop={12} accessibilityRole="button">
          <Text style={styles.topAction}>Skip</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.column}>
          {step === 0 && (
            <View style={styles.welcome}>
              <Text style={styles.wordmark}>Aurín</Text>
              <Text style={styles.tagline}>au-REEN · golden light</Text>
              <Text style={styles.welcomeBody}>
                A companion for your own tarot cards. Aurín offers meanings, spreads, and reflection —
                but never draws for you. The cards stay in your hands; the ritual stays yours.
              </Text>
            </View>
          )}

          {step === 1 && (
            <>
              <Text style={styles.heading}>How well do you know the cards?</Text>
              <Text style={styles.sub}>This helps Aurín pitch its guidance — you can change it later.</Text>
              <View style={styles.options}>
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <OptionRow
                    key={opt.value}
                    label={opt.label}
                    hint={opt.hint}
                    selected={settings.experienceLevel === opt.value}
                    onPress={() => setSetting('experienceLevel', opt.value)}
                  />
                ))}
              </View>
            </>
          )}

          {step === 2 && (
            <>
              <Text style={styles.heading}>When do you like to read?</Text>
              <Text style={styles.sub}>So a future Aurín can meet you at the right moment.</Text>
              <View style={styles.options}>
                {RITUAL_OPTIONS.map((opt) => (
                  <OptionRow
                    key={opt.value}
                    label={opt.label}
                    hint={opt.hint}
                    selected={settings.ritualTime === opt.value}
                    onPress={() => setSetting('ritualTime', opt.value)}
                  />
                ))}
              </View>
            </>
          )}

          {step === 3 && (
            <>
              <Text style={styles.heading}>What brings you here?</Text>
              <Text style={styles.sub}>Pick whatever feels closest.</Text>
              <View style={styles.intentions}>
                {INTENTIONS.map((label) => {
                  const selected = settings.intention === label;
                  return (
                    <Pressable
                      key={label}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      onPress={() => setSetting('intention', selected ? null : label)}
                      style={({ pressed }) => [
                        styles.intention,
                        selected && styles.intentionSelected,
                        pressed && styles.pressed,
                      ]}>
                      <Text
                        style={[styles.intentionText, selected && styles.intentionTextSelected]}>
                        {label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label={step < 3 ? 'Continue' : 'Begin'} onPress={step < 3 ? next : finish} />
      </View>
    </SafeAreaView>
  );
}

function OptionRow({
  label,
  hint,
  selected,
  onPress,
}: {
  label: string;
  hint: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        selected && styles.optionSelected,
        pressed && styles.pressed,
      ]}>
      <View style={styles.optionBody}>
        <Text style={styles.optionLabel}>{label}</Text>
        <Text style={styles.optionHint}>{hint}</Text>
      </View>
      {selected ? <Text style={styles.check}>✓</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    height: 44,
  },
  topAction: { fontFamily: Fonts.serifSemibold, fontSize: 16, color: Colors.light.textSecondary, minWidth: 52 },
  topSpacer: { minWidth: 52 },
  dots: { flexDirection: 'row', gap: Spacing.two },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.light.border },
  dotActive: { backgroundColor: Colors.light.accent, width: 20 },
  content: { flexGrow: 1, alignItems: 'center', paddingBottom: Spacing.five },
  column: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
  },
  welcome: { alignItems: 'center', paddingTop: Spacing.five },
  wordmark: { fontFamily: Fonts.displayBlack, fontSize: 48, color: Colors.light.accent },
  tagline: {
    fontFamily: Fonts.serifItalic,
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginTop: Spacing.one,
    marginBottom: Spacing.five,
  },
  welcomeBody: {
    fontFamily: Fonts.serif,
    fontSize: 19,
    lineHeight: 30,
    color: Colors.light.text,
    textAlign: 'center',
  },
  heading: { fontFamily: Fonts.display, fontSize: 26, color: Colors.light.accent },
  sub: {
    fontFamily: Fonts.serif,
    fontSize: 16,
    lineHeight: 23,
    color: Colors.light.textSecondary,
    marginTop: Spacing.two,
    marginBottom: Spacing.four,
  },
  options: { gap: Spacing.two },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: Colors.light.backgroundElement,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    padding: Spacing.three,
  },
  optionSelected: { borderColor: Colors.light.accent, backgroundColor: Colors.light.backgroundSelected },
  pressed: { opacity: 0.8 },
  optionBody: { flex: 1 },
  optionLabel: { fontFamily: Fonts.serifSemibold, fontSize: 18, color: Colors.light.text },
  optionHint: { fontFamily: Fonts.serif, fontSize: 14, color: Colors.light.textSecondary, marginTop: 1 },
  check: { fontFamily: Fonts.serifSemibold, fontSize: 18, color: Colors.light.accent },
  intentions: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  intention: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.backgroundElement,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  intentionSelected: { borderColor: Colors.light.accent, backgroundColor: Colors.light.accent },
  intentionText: { fontFamily: Fonts.serifSemibold, fontSize: 16, color: Colors.light.text },
  intentionTextSelected: { color: Colors.light.onAccent },
  footer: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
});
