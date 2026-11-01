'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics, sendGAEvent } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export function ProductionAnalytics({ enabled, hostname }: { enabled: boolean; hostname: string }) {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    setAllowed(enabled && location.hostname === hostname);
  }, [enabled, hostname]);
  useEffect(() => {
    if (!allowed) return;
    const track = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target.closest('a') : null;
      if (!element) return;
      const href = element.getAttribute('href') || '';
      const action = href === '/resume' ? 'resume_open' : href.startsWith('https://github.com/rlatkd/') ? 'project_repository_open' : href.startsWith('mailto:') ? 'contact_email_open' : undefined;
      // Send only the action name, never the email address, link text or search query.
      if (action) sendGAEvent('event', action);
    };
    document.addEventListener('click', track);
    return () => document.removeEventListener('click', track);
  }, [allowed]);
  if (!allowed) return null;
  return <><GoogleAnalytics gaId='G-8ZK16NWL6K' /><Analytics /><SpeedInsights /></>;
}
