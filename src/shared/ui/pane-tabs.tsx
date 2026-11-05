'use client';

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

type Tab = { key: string; label: string; count?: number; content: ReactNode };

/**
 * 2026-11-02: 머리의 파일 탭 줄을 분류 탭으로 쓰는 영역(tasks와 같은 모양).
 * 모든 탭 내용을 HTML에 두고 선택하지 않은 탭은 숨긴다(검색엔진이 숨은 탭 내용도 읽는다).
 * 2026-11-04: WAI-ARIA 탭 패턴의 키보드 조작. 선택된 탭만 Tab 정지점이고, ← → 로 이전 · 다음 탭(끝에서 반대쪽으로),
 * Home · End로 처음 · 마지막 탭을 바로 선택한다. 탭 내용(tabpanel)은 Tab으로 들어갈 수 있게 tabIndex 0.
 * 탭 줄과 영역이 넘침을 잘라 내므로 포커스 테두리는 안쪽(-2px)에 그린다.
 */
export function PaneTabs({ id, name, ariaLabel, tabs, panelClassName = 'px-6 pb-6 pt-4' }: { id: string; name: string; ariaLabel: string; tabs: Tab[]; panelClassName?: string }) {
  const [selected, setSelected] = useState(tabs[0].key);
  const current = tabs.find(tab => tab.key === selected) ?? tabs[0];
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex(tab => tab.key === current.key);
    const next = event.key === 'ArrowRight' ? index + 1 : event.key === 'ArrowLeft' ? index - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    const target = (next + tabs.length) % tabs.length;
    setSelected(tabs[target].key);
    buttons.current[target]?.focus();
  };

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className='overflow-hidden lg:scroll-mt-6 rounded-lg border border-line bg-surface'>
      <h2 id={`${id}-heading`} className='sr-only'>{name}</h2>
      <div role='tablist' aria-label={ariaLabel} onKeyDown={onKeyDown} className='flex overflow-x-auto overflow-y-hidden border-b border-line bg-surface-2 font-code text-[12px]'>
        {tabs.map((tab, index) => {
          const active = tab.key === current.key;
          return (
            <button
              key={tab.key}
              ref={element => { buttons.current[index] = element; }}
              type='button'
              role='tab'
              id={`${id}-tab-${tab.key}`}
              aria-selected={active}
              aria-controls={`${id}-panel-${tab.key}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setSelected(tab.key)}
              className={`-mb-px shrink-0 border-t-2 px-3 py-2 transition-colors hover:text-accent focus-visible:-outline-offset-2 ${active ? 'border-tab bg-surface text-fg-strong' : 'border-transparent text-fg'}`}
            >
              {tab.label}{tab.count !== undefined && <> <span className='text-muted'>{tab.count}</span></>}
            </button>
          );
        })}
      </div>
      <p className='px-6 pt-2.5 font-code text-[12px] text-muted'>{name} <span aria-hidden='true'>›</span> {current.label}</p>
      {tabs.map(tab => (
        <div key={tab.key} role='tabpanel' id={`${id}-panel-${tab.key}`} aria-labelledby={`${id}-tab-${tab.key}`} tabIndex={0} hidden={tab.key !== current.key} className={`${panelClassName} focus-visible:-outline-offset-2`}>
          {tab.content}
        </div>
      ))}
    </section>
  );
}
