'use client';

import { useRef, useState } from 'react';
import { Check, Copy, ExternalLink, Printer, X } from 'lucide-react';

// 네이버 앱 · 카카오톡 같은 앱 안의 브라우저(Android WebView, iOS 앱 내장 브라우저)는 window.print()를 지원하지 않아
// 인쇄 버튼을 눌러도 아무 일도 일어나지 않는다(Android 공식 문서: WebView 안의 JavaScript로는 인쇄를 시작할 수 없다).
// 일반 브라우저는 바로 인쇄한다. 앱 안의 브라우저에서는 인쇄를 시도한 뒤 인쇄가 시작되지 않으면(beforeprint 없음)
// 외부 브라우저로 여는 안내를 띄운다.
type Browser = { android: boolean; kakao: boolean };

function inAppBrowser(userAgent: string): Browser | null {
  const android = /Android/i.test(userAgent);
  const ios = /iPhone|iPad|iPod/i.test(userAgent);
  const named = /NAVER\(inapp|KAKAOTALK|Instagram|FBAN|FBAV|DaumApps|everytimeApp/i.test(userAgent);
  // 이름을 모르는 앱도 Android WebView 표시(; wv)나, Safari 표시가 없는 iOS 브라우저로 알아본다.
  if (!named && !(android && /; wv\)/.test(userAgent)) && !(ios && !/Safari\//.test(userAgent))) return null;
  return { android, kakao: /KAKAOTALK/i.test(userAgent) };
}

// 외부 브라우저로 여는 주소. 카카오톡은 자체 주소, Android는 Chrome intent. iOS는 앱 밖으로 여는 공통 방법이 없어 안내만 한다.
// Chrome이 없거나 꺼 둔 Android 기기를 위해 기본 브라우저(또는 브라우저 선택 창)로 여는 intent도 함께 둔다.
// (intent의 대체 주소 S.browser_fallback_url은 웹 주소만 받아 같은 페이지를 앱 안에서 다시 열 뿐이라 쓰지 않는다)
function externalLinks(url: string, browser: Browser): { label: string; href: string }[] {
  if (browser.kakao) return [{ label: '외부 브라우저로 열기', href: `kakaotalk://web/openExternal?url=${encodeURIComponent(url)}` }];
  if (browser.android) {
    const { host, pathname, search } = new URL(url);
    const target = `intent://${host}${pathname}${search}#Intent;scheme=https;`;
    return [
      { label: 'Chrome으로 열기', href: `${target}package=com.android.chrome;end` },
      { label: '다른 브라우저로 열기', href: `${target}action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end` },
    ];
  }
  return [];
}

export function PrintButton() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [help, setHelp] = useState<{ url: string; links: { label: string; href: string }[] } | null>(null);
  const [copied, setCopied] = useState<'idle' | 'copied' | 'failed'>('idle');

  const print = () => {
    const browser = inAppBrowser(navigator.userAgent);
    if (!browser) {
      window.print();
      return;
    }
    let started = false;
    const markStarted = () => { started = true; };
    window.addEventListener('beforeprint', markStarted);
    window.print();
    window.setTimeout(() => {
      window.removeEventListener('beforeprint', markStarted);
      if (started) return;
      const url = `${location.origin}${location.pathname}`;
      setHelp({ url, links: externalLinks(url, browser) });
      setCopied('idle');
      dialog.current?.showModal();
    }, 600);
  };

  const copy = async () => {
    if (!help) return;
    try {
      await navigator.clipboard.writeText(help.url);
      setCopied('copied');
    } catch {
      // 앱 안의 브라우저는 클립보드 API를 막는 경우가 있어 선택 후 복사로 한 번 더 시도한다(대화상자 밖 요소는 비활성이라 안에서 만든다).
      const area = document.createElement('textarea');
      area.value = help.url;
      area.readOnly = true;
      area.className = 'fixed opacity-0';
      dialog.current?.append(area);
      area.select();
      const done = document.execCommand('copy');
      area.remove();
      setCopied(done ? 'copied' : 'failed');
    }
  };

  return (
    <>
      <button
        type='button'
        onClick={print}
        className='inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3.5 py-2 font-code text-[13px] text-fg-strong transition-colors hover:border-accent hover:text-accent'
      >
        <Printer size={15} aria-hidden='true' />
        <span>인쇄 | PDF 저장</span>
      </button>
      <dialog
        ref={dialog}
        aria-labelledby='print-help-title'
        onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
        className='w-[min(480px,calc(100vw-2rem))] overflow-hidden rounded-lg border border-line bg-surface p-0 text-left text-fg backdrop:bg-black/60'
      >
        <div className='flex items-center border-b border-line bg-surface-2 font-code text-[12px]'>
          <span className='-mb-px border-t-2 border-tab bg-surface px-3 py-2 text-fg-strong'>print.md</span>
          <button type='button' aria-label='닫기' onClick={() => dialog.current?.close()} className='ml-auto flex h-9 w-9 items-center justify-center text-muted hover:text-accent'>
            <X size={16} aria-hidden='true' />
          </button>
        </div>
        <div className='px-6 py-6 font-sans text-[14px] leading-[1.75]'>
          <h2 id='print-help-title' className='mb-2 text-lg font-bold text-fg-strong'>이 화면에서는 인쇄할 수 없습니다</h2>
          <p>앱 안에서 열린 브라우저는 인쇄와 PDF 저장을 지원하지 않습니다. Chrome이나 Safari 같은 브라우저에서 열면 인쇄하거나 PDF로 저장할 수 있습니다.</p>
          {help?.links.length
            ? <div className='mt-5 flex flex-wrap gap-2'>
                {help.links.map((link, index) => (
                  <a key={link.href} href={link.href} className={`inline-flex items-center gap-2 rounded-md px-4 py-2 font-code text-[13px] ${index === 0 ? 'bg-button text-on-button' : 'border border-button-2-border bg-button-2 text-on-button-2 hover:border-accent hover:text-accent'}`}>
                    <ExternalLink size={15} aria-hidden='true' />{link.label}
                  </a>
                ))}
              </div>
            : <p className='mt-3'>화면의 ··· 메뉴나 공유 메뉴에서 &lsquo;Safari로 열기&rsquo; 또는 &lsquo;다른 브라우저로 열기&rsquo;를 누르세요.</p>}
          <div className='mt-4 flex items-center gap-3'>
            <button type='button' onClick={copy} className='inline-flex items-center gap-2 rounded-md border border-button-2-border bg-button-2 px-4 py-2 font-code text-[13px] text-on-button-2 transition-colors hover:border-accent hover:text-accent'>
              {copied === 'copied' ? <Check size={15} className='text-accent' aria-hidden='true' /> : copied === 'failed' ? <X size={15} className='text-error' aria-hidden='true' /> : <Copy size={15} aria-hidden='true' />}
              주소 복사
            </button>
            <p role='status' className='text-[13px] text-muted'>{copied === 'copied' ? '주소를 복사했습니다.' : copied === 'failed' ? '복사하지 못했습니다. 주소창의 주소를 직접 복사해 주세요.' : ''}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
