import * as React from 'react';
import type { SharedValue } from 'react-native-reanimated';

// Shares the page ScrollView's live scroll offset (see
// screens/PublicPageLayout.tsx) down to any section that wants to know when
// it has scrolled into view — see lib/use-scroll-reveal.ts.
export const ScrollYContext = React.createContext<SharedValue<number> | null>(null);
