export function dateFormatter(date: string, includeRelative = false, now = new Date()) {
  const target = new Date(date.includes('T') ? date : `${date}T00:00:00+09:00`);
  if (Number.isNaN(target.getTime())) return '';
  const fullDate = target.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Asia/Seoul',
  });
  if (!includeRelative) return fullDate;
  const days = Math.max(0, Math.floor((now.getTime() - target.getTime()) / 86400000));
  const relative = days >= 365 ? `${Math.floor(days / 365)}y ago`
    : days >= 30 ? `${Math.floor(days / 30)}mo ago` : days > 0 ? `${days}d ago` : 'Today';
  return `${fullDate} (${relative})`;
}
