import { Stack } from 'expo-router';

/** Cards tab: card list with pushed card-detail screens. */
export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
