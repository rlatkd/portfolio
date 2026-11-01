import { company, work } from '@/shared/data/career-data';
import { TaskTabs, type TaskItem } from './task-tabs';

// 2026-11-01: 회사에서 한 일을 프로젝트(신규 구축) · 회사(주요 과제) 두 탭으로 나눠 설명까지 모두 보여 준다.
const projectIds = ['branch-manager', 'e-contract'];
const toItem = (item: (typeof work)[number]): TaskItem => ({
  id: item.id,
  period: item.period.replaceAll(' — ', ' – '),
  platform: item.platform,
  title: item.main.title,
  how: item.main.how,
  kpi: item.main.kpi,
});

export default function Tasks() {
  return (
    <TaskTabs
      company={company.name}
      projects={work.filter(item => projectIds.includes(item.id)).map(toItem)}
      tasks={work.filter(item => !projectIds.includes(item.id)).map(toItem)}
    />
  );
}
