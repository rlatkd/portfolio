'use client';
export function PrintResume() {
  return <button className='print-hidden rounded border border-line px-4 py-2 text-accent' onClick={() => window.print()}>인쇄 · PDF로 저장</button>;
}
