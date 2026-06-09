import {
  CinzelDecorative_400Regular,
  CinzelDecorative_700Bold,
  CinzelDecorative_900Black,
} from '@expo-google-fonts/cinzel-decorative';
import {
  CrimsonText_400Regular,
  CrimsonText_400Regular_Italic,
  CrimsonText_600SemiBold,
} from '@expo-google-fonts/crimson-text';
import { useFonts } from 'expo-font';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';

import { SettingsProvider, useSettings } from '@/hooks/use-settings';
import { Colors, Fonts } from '@/constants/theme';

/** Navigation theme tinted to Aurín's warm palette (light only for v1). */
const AurinNavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.accent,
    background: Colors.light.background,
    card: Colors.light.background,
    text: Colors.light.text,
    border: Colors.light.border,
  },
};

/** The navigator — reads settings so it can gate onboarding vs the main app. */
function RootNavigator() {
  const { settings, hydrating } = useSettings();

  // Hold on the (warm) blank screen until persisted settings load, so we don't
  // flash onboarding at a returning user before `onboardingComplete` hydrates.
  if (hydrating) return null;

  const onboarded = settings.onboardingComplete;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.light.background },
        headerTintColor: Colors.light.accent,
        headerTitleStyle: { fontFamily: Fonts.serifSemibold, color: Colors.light.text },
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        contentStyle: { backgroundColor: Colors.light.background },
      }}>
      <Stack.Protected guard={!onboarded}>
        <Stack.Screen name="onboarding" options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Protected>

      <Stack.Protected guard={onboarded}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="card/[id]" options={{ title: '' }} />
        <Stack.Screen name="reading/[spread]" options={{ title: 'Reading' }} />
        <Stack.Screen name="ritual" options={{ presentation: 'modal', headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    CinzelDecorative_400Regular,
    CinzelDecorative_700Bold,
    CinzelDecorative_900Black,
    CrimsonText_400Regular,
    CrimsonText_600SemiBold,
    CrimsonText_400Regular_Italic,
  });

  if (!loaded) return null;

  return (
    <SettingsProvider>
      <ThemeProvider value={AurinNavTheme}>
        <RootNavigator />
      </ThemeProvider>
    </SettingsProvider>
  );
}
