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
import { DefaultTheme, ThemeProvider } from 'expo-router';

import AppTabs from '@/components/app-tabs';
import { Colors } from '@/constants/theme';

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
    <ThemeProvider value={AurinNavTheme}>
      <AppTabs />
    </ThemeProvider>
  );
}
