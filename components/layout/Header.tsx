import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Logo } from './Logo';
import { NavDrawer } from './NavDrawer';

export function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="border-border bg-background z-10 flex-row items-center justify-between border-b px-5 pb-3">
      <Logo />
      <NavDrawer />
    </View>
  );
}
