import { PaneTabs } from '@/shared/ui/pane-tabs';
import { company, work } from '@/shared/data/career-data';

// 회사에서 한 일을 프로젝트(신규 구축) · 회사(주요 과제) 두 탭으로 나눠 설명까지 모두 보여 준다.
// experience와 같은 PaneTabs를 쓴다. 선택하지 않은 탭의 과제도 HTML에 들어가 검색엔진이 읽는다.
const projectIds = ['branch-manager', 'e-contract'];
type Item = (typeof work)[number];

// 프로젝트 탭은 회사 · 기간, 회사 탭은 플랫폼 · 기간
function TaskList({ items, meta }: { items: Item[]; meta: (item: Item) => string }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} className='border-b border-line py-4 last:border-0'>
          <div className='flex flex-wrap items-baseline justify-between gap-x-3'>
            <h3 className='font-semibold leading-snug text-fg-strong'>{item.main.title}</h3>
            <span className='font-code text-[12px] text-muted'>{meta(item)} · {item.period.replaceAll(' — ', ' – ')}</span>
          </div>
          <ul className='mt-1.5 space-y-0.5 text-[14px] leading-7'>{item.main.how.map(line => <li key={line}>· {line}</li>)}</ul>
          <p className='mt-2 inline-block rounded bg-ok-bg px-2 py-0.5 text-[14px] font-medium text-ok'>✓ {item.main.kpi}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Tasks() {
  const projects = work.filter(item => projectIds.includes(item.id));
  const tasks = work.filter(item => !projectIds.includes(item.id));
  return (
    <PaneTabs
      id='tasks'
      name='tasks'
      ariaLabel='과제 분류'
      panelClassName='px-6 py-2'
      tabs={[
        { key: 'projects', label: '프로젝트', count: projects.length, content: <TaskList items={projects} meta={() => company.name} /> },
        { key: 'company', label: company.name, count: tasks.length, content: <TaskList items={tasks} meta={item => item.platform} /> },
      ]}
    />
  );
}
