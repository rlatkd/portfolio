'use client';

import { useState } from 'react';

export type TaskItem = { id: string; period: string; platform: string; title: string; how: string[]; kpi: string };

// 영역 머리의 파일 탭 줄 자체를 분류 탭으로 쓰고, 탭 아래에 VS Code 브레드크럼처럼 현재 위치를 보여 준다.
export function TaskTabs({ company, projects, tasks }: { company: string; projects: TaskItem[]; tasks: TaskItem[] }) {
  const groups = [
    { key: 'projects', label: '프로젝트', items: projects, showCompany: true },
    { key: 'company', label: company, items: tasks, showCompany: false },
  ];
  const [tab, setTab] = useState(groups[0].key);
  const current = groups.find(group => group.key === tab) ?? groups[0];

  return (
    <section id='tasks' aria-labelledby='tasks-heading' className='scroll-mt-6 overflow-hidden rounded-lg border border-line bg-surface'>
      <h2 id='tasks-heading' className='sr-only'>tasks/</h2>
      <div role='tablist' aria-label='과제 분류' className='flex overflow-x-auto overflow-y-hidden border-b border-line bg-surface-2 font-code text-[12px]'>
        {groups.map(group => {
          const active = group.key === tab;
          return (
            <button
              key={group.key}
              type='button'
              role='tab'
              id={`tasks-tab-${group.key}`}
              aria-selected={active}
              aria-controls='tasks-panel'
              onClick={() => setTab(group.key)}
              className={`-mb-px shrink-0 border-t-2 px-3 py-2 transition-colors hover:text-accent ${active ? 'border-tab bg-surface text-fg-strong' : 'border-transparent text-fg'}`}
            >
              {group.label} <span className='text-muted'>{group.items.length}</span>
            </button>
          );
        })}
      </div>
      <p className='px-6 pt-2.5 font-code text-[12px] text-muted'>tasks <span aria-hidden='true'>›</span> {current.label}</p>
      <ul role='tabpanel' id='tasks-panel' aria-labelledby={`tasks-tab-${current.key}`} className='px-6 py-2'>
        {current.items.map(item => (
          <li key={item.id} className='border-b border-line py-4 last:border-0'>
            <div className='flex flex-wrap items-baseline justify-between gap-x-3'>
              <h3 className='font-semibold leading-snug text-fg-strong'>{item.title}</h3>
              <span className='font-code text-[12px] text-muted'>
                {/* 프로젝트 탭은 회사 · 기간, 회사 탭은 플랫폼 · 기간 */}
                {current.showCompany ? company : item.platform} · {item.period}
              </span>
            </div>
            <ul className='mt-1.5 space-y-0.5 text-[14px] leading-7'>{item.how.map(line => <li key={line}>· {line}</li>)}</ul>
            <p className='mt-2 inline-block rounded bg-ok-bg px-2 py-0.5 text-[14px] font-medium text-ok'>✓ {item.kpi}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
