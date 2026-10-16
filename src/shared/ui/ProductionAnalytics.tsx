'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export function ProductionAnalytics({ enabled, hostname }: { enabled: boolean; hostname: string }) {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    setAllowed(enabled && location.hostname === hostname);
  }, [enabled, hostname]);
  if (!allowed) return null;
  return <><GoogleAnalytics gaId='G-8ZK16NWL6K' /><Analytics /><SpeedInsights /></>;
}
