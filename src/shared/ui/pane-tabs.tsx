'use client';

import { useState, type ReactNode } from 'react';

type Tab = { key: string; label: string; count?: number; content: ReactNode };

/**
 * 2026-11-02: 머리의 파일 탭 줄을 분류 탭으로 쓰는 영역(tasks와 같은 모양).
 * 모든 탭 내용을 HTML에 두고 선택하지 않은 탭은 숨긴다(검색엔진이 숨은 탭 내용도 읽는다).
 */
export function PaneTabs({ id, name, ariaLabel, tabs, panelClassName = 'px-6 pb-6 pt-4' }: { id: string; name: string; ariaLabel: string; tabs: Tab[]; panelClassName?: string }) {
  const [selected, setSelected] = useState(tabs[0].key);
  const current = tabs.find(tab => tab.key === selected) ?? tabs[0];

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className='scroll-mt-6 overflow-hidden rounded-lg border border-line bg-surface'>
      <h2 id={`${id}-heading`} className='sr-only'>{name}</h2>
      <div role='tablist' aria-label={ariaLabel} className='flex overflow-x-auto overflow-y-hidden border-b border-line bg-surface-2 font-code text-[12px]'>
        {tabs.map(tab => {
          const active = tab.key === current.key;
          return (
            <button
              key={tab.key}
              type='button'
              role='tab'
              id={`${id}-tab-${tab.key}`}
              aria-selected={active}
              aria-controls={`${id}-panel-${tab.key}`}
              onClick={() => setSelected(tab.key)}
              className={`-mb-px shrink-0 border-t-2 px-3 py-2 transition-colors hover:text-accent ${active ? 'border-tab bg-surface text-fg-strong' : 'border-transparent text-fg'}`}
            >
              {tab.label}{tab.count !== undefined && <> <span className='text-muted'>{tab.count}</span></>}
            </button>
          );
        })}
      </div>
      <p className='px-6 pt-2.5 font-code text-[12px] text-muted'>{name} <span aria-hidden='true'>›</span> {current.label}</p>
      {tabs.map(tab => (
        <div key={tab.key} role='tabpanel' id={`${id}-panel-${tab.key}`} aria-labelledby={`${id}-tab-${tab.key}`} hidden={tab.key !== current.key} className={panelClassName}>
          {tab.content}
        </div>
      ))}
    </section>
  );
}
