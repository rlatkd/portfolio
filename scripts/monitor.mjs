import { inspectSite } from './lib/monitor.mjs';
const origin = new URL(process.env.MONITOR_URL || 'https://www.sanghunkim.com').origin;
const canonicalOrigin = new URL(process.env.NEXT_PUBLIC_BASE_URL || origin).origin;
const attempts = Math.min(3, Math.max(1, Number(process.env.MONITOR_ATTEMPTS) || 1));
for (let attempt = 1; attempt <= attempts; attempt++) {
  try {
    for (const endpoint of await inspectSite({ origin, canonicalOrigin })) console.log(`${endpoint}: OK`);
    break;
  } catch (error) {
    if (attempt === attempts) throw error;
    console.warn(`Attempt ${attempt} failed: ${error.message}; retrying`);
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}
