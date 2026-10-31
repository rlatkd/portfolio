import type { ReactNode } from 'react';
import styles from './task-architecture.module.css';

function Box({ x, y, width, height = 60, title, lines = [], dashed = false, emphasized = false }: {
  x: number; y: number; width: number; height?: number; title: string | string[]; lines?: string[]; dashed?: boolean; emphasized?: boolean;
}) {
  const titles = Array.isArray(title) ? title : [title];
  const first = y + (height - (lines.length + titles.length) * 18) / 2 + 13;
  return <g>
    <rect x={x} y={y} width={width} height={height} fill='white' stroke='#555' strokeWidth={emphasized ? 2 : 1} strokeDasharray={dashed ? '5 4' : undefined} />
    {titles.map((line, i) => <text key={line} x={x + width / 2} y={first + 18 * i} textAnchor='middle' className={styles.bold}>{line}</text>)}
    {lines.map((line, i) => <text key={line} x={x + width / 2} y={first + 18 * (i + titles.length)} textAnchor='middle' className={styles.small}>{line}</text>)}
  </g>;
}

function Job({ x, y, width, height, title, children, emphasized = false }: {
  x: number; y: number; width: number; height: number; title: string; children: ReactNode; emphasized?: boolean;
}) {
  return <g>
    <rect x={x} y={y} width={width} height={height} fill='#f8f8f8' stroke={emphasized ? '#555' : '#aaa'} strokeWidth={emphasized ? 2 : 1} />
    <text x={x + 15} y={y + 24} className={styles.bold}>{title}</text>
    {children}
  </g>;
}

function Arrow({ d, marker }: { d: string; marker: string }) {
  return <path d={d} fill='none' stroke='#555' strokeWidth={1.2} markerEnd={`url(#${marker})`} />;
}

function PanelTitle({ y, children }: { y: number; children: ReactNode }) {
  return <g><text x={2} y={y} className={styles.panelTitle}>{children}</text><line x1={0} x2={640} y1={y + 14} y2={y + 14} stroke='#ccc' /></g>;
}

function RecoveryArchitecture() {
  const marker = 'task01-architecture-arrow';
  return <svg className={styles.diagram} viewBox='0 0 640 784' role='img' aria-labelledby='task01-architecture-title task01-architecture-description'>
    <title id='task01-architecture-title'>Task 01 청구 보정 배치의 변경 전후 구조</title>
    <desc id='task01-architecture-description'>변경 전에는 CMS 결제 요청 배치 안에서 예외 청구를 인메모리에 모아 보정 Step이 처리했습니다. 변경 후에는 예외 청구를 CMS+ DB의 이벤트 테이블에 저장하고 별도 청구 보정 배치의 Tasklet이 읽어 청구 데이터를 보정합니다.</desc>
    <defs><marker id={marker} markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient='auto'><path d='M0 0 L7 3.5 L0 7' fill='none' stroke='#555' /></marker></defs>

    <PanelTitle y={22}>AS-IS · 결제 요청과 청구 보정이 하나의 배치에 포함</PanelTitle>
    <Job x={0} y={50} width={340} height={228} title='CMS+ Batch · CMS 결제 요청 배치'>
      <Box x={20} y={84} width={300} height={44} title='결제 요청 Step' />
      <Box x={20} y={150} width={300} height={44} title='인메모리' dashed />
      <Box x={20} y={216} width={300} height={44} title='보정 Step' />
      <Arrow d='M170 128 V148' marker={marker} />
      <text x={178} y={143} className={styles.small}>예외 청구</text>
      <Arrow d='M170 194 V214' marker={marker} />
      <text x={178} y={209} className={styles.small}>청구 보정 대상 조회</text>
    </Job>
    <Box x={470} y={84} width={170} height={44} title='계정계' />
    <Arrow d='M322 98 H468' marker={marker} />
    <text x={405} y={92} textAnchor='middle' className={styles.small}>결제 요청</text>
    <Arrow d='M468 114 H322' marker={marker} />
    <text x={405} y={128} textAnchor='middle' className={styles.small}>예외</text>
    <text x={352} y={176}>서버가 중단되면 유실</text>
    <Box x={470} y={216} width={170} height={44} title='고객 관리 시스템' />
    <Arrow d='M322 230 H468' marker={marker} />
    <Arrow d='M468 246 H322' marker={marker} />
    <text x={405} y={224} textAnchor='middle' className={styles.small}>고객 서비스 상태 조회</text>
    <Arrow d='M170 260 V300' marker={marker} />
    <text x={178} y={293} className={styles.small}>청구 데이터 보정</text>
    <Box x={20} y={302} width={300} height={44} title='CMS+ DB · 청구 테이블' />
    <text x={352} y={329}>재보정 시 CMS 결제 요청 배치 전체를 재실행</text>

    <PanelTitle y={392}>TO-BE · 청구 보정 대상 영속화 및 배치 분리</PanelTitle>
    <Job x={0} y={420} width={340} height={94} title='CMS+ Batch · CMS 결제 요청 배치'>
      <Box x={20} y={454} width={300} height={44} title='결제 요청 Step' />
    </Job>
    <Box x={470} y={454} width={170} height={44} title='계정계' />
    <Arrow d='M322 468 H468' marker={marker} />
    <text x={405} y={462} textAnchor='middle' className={styles.small}>결제 요청</text>
    <Arrow d='M468 484 H322' marker={marker} />
    <text x={405} y={498} textAnchor='middle' className={styles.small}>예외</text>
    <Arrow d='M170 498 V538' marker={marker} />
    <text x={178} y={531} className={styles.small}>예외 청구</text>
    <Box x={20} y={540} width={300} height={44} title='CMS+ DB · 이벤트 테이블' emphasized />
    <text x={352} y={567}>서버가 중단돼도 보정 대상 유지</text>
    <Job x={0} y={614} width={340} height={94} title='CMS+ Batch · 청구 보정 배치' emphasized>
      <Box x={20} y={648} width={300} height={44} title='Tasklet' />
    </Job>
    <Arrow d='M210 646 V586' marker={marker} />
    <Arrow d='M250 586 V646' marker={marker} />
    <text x={258} y={606} className={styles.small}>청구 보정 대상 조회</text>
    <Box x={470} y={648} width={170} height={44} title='고객 관리 시스템' />
    <Arrow d='M322 662 H468' marker={marker} />
    <Arrow d='M468 678 H322' marker={marker} />
    <text x={405} y={656} textAnchor='middle' className={styles.small}>고객 서비스 상태 조회</text>
    <Arrow d='M170 692 V732' marker={marker} />
    <text x={178} y={725} className={styles.small}>청구 데이터 보정</text>
    <Box x={20} y={734} width={300} height={44} title='CMS+ DB · 청구 테이블' />
    <text x={352} y={761}>재보정 시 청구 보정 배치만 재실행</text>
  </svg>;
}

function EaiArchitecture() {
  const marker = 'task02-architecture-arrow';
  return <svg className={styles.diagram} viewBox='0 0 640 720' role='img' aria-labelledby='task02-architecture-title task02-architecture-description'>
    <title id='task02-architecture-title'>Task 02 계좌이동과 민원해지 연계의 변경 전후 구조</title>
    <desc id='task02-architecture-description'>외부 기관에서 발생한 계좌이동과 민원해지는 대외계를 거쳐 계정계에 반영됩니다. 변경 전에는 CMS+ Batch가 약 2만 고객을 API로 조회해 반영 대상을 확인했습니다. 변경 후에는 계정계가 반영 대상만 EAI로 보내고 CMS+가 수신해 계좌이동 및 민원해지를 처리합니다.</desc>
    <defs><marker id={marker} markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient='auto'><path d='M0 0 L7 3.5 L0 7' fill='none' stroke='#555' /></marker></defs>

    <PanelTitle y={22}>AS-IS · 전체 고객을 조회해 계좌이동 및 민원해지 반영 대상을 확인</PanelTitle>
    <Box x={460} y={49} width={180} height={32} title='외부 기관' />
    <Arrow d='M550 81 V105' marker={marker} />
    <Box x={460} y={107} width={180} height={32} title='대외계' />
    <Arrow d='M550 139 V163' marker={marker} />
    <Box x={0} y={165} width={230} height={44} title='CMS+ Batch' />
    <Box x={460} y={165} width={180} height={44} title='계정계' />
    <text x={340} y={91} textAnchor='middle'>변경 콜백이 없어 반영 대상을 먼저 알 수 없음</text>
    <text x={340} y={115} textAnchor='middle' className={styles.small}>API 조회</text>
    <text x={340} y={131} textAnchor='middle' className={styles.small}>당일 계좌이동 신청 건</text>
    <text x={340} y={147} textAnchor='middle' className={styles.small}>당일 계좌이동 완료 건</text>
    <text x={340} y={163} textAnchor='middle' className={styles.small}>당일 민원해지 완료 건</text>
    <Arrow d='M232 179 H458' marker={marker} />
    <Arrow d='M458 195 H232' marker={marker} />
    <text x={252} y={233}>반영 대상을 찾기 위해 약 2만 건의 고객 데이터를 매번 조회</text>
    <Arrow d='M115 209 V280' marker={marker} />
    <text x={123} y={248} className={styles.small}>계좌이동 및 민원해지 반영</text>
    <Box x={0} y={282} width={230} height={60} title={['CMS+ DB · 결제수단 테이블', 'CMS+ DB · 납부자 테이블']} />

    <PanelTitle y={380}>TO-BE · 계좌이동 및 민원해지 반영 대상만을 EAI로 수신</PanelTitle>
    <Box x={460} y={414} width={180} height={32} title='외부 기관' />
    <Arrow d='M550 446 V470' marker={marker} />
    <Box x={460} y={472} width={180} height={32} title='대외계' />
    <Arrow d='M550 504 V528' marker={marker} />
    <Box x={0} y={540} width={225} height={44} title='CMS+ Batch' />
    <Box x={290} y={540} width={100} height={44} title='EAI' emphasized />
    <Box x={460} y={530} width={180} height={64} title='계정계' lines={['계좌이동·민원해지 대상 선정']} emphasized />
    <text x={340} y={456} textAnchor='middle'>반영 대상을 선정해 EAI로 송신인터페이스로 전달</text>
    <text x={340} y={480} textAnchor='middle' className={styles.small}>EAI 송·수신</text>
    <text x={340} y={496} textAnchor='middle' className={styles.small}>당일 계좌이동 신청 건</text>
    <text x={340} y={512} textAnchor='middle' className={styles.small}>당일 계좌이동 완료 건</text>
    <text x={340} y={528} textAnchor='middle' className={styles.small}>당일 민원해지 완료 건</text>
    <Arrow d='M458 562 H392' marker={marker} />
    <Arrow d='M288 562 H227' marker={marker} />
    <text x={252} y={608}>전체 고객 조회 없이 반영 대상만 조회</text>
    <Arrow d='M112 584 V652' marker={marker} />
    <text x={122} y={623} className={styles.small}>계좌이동 및 민원해지 반영</text>
    <Box x={0} y={654} width={225} height={60} title={['CMS+ DB · 결제수단 테이블', 'CMS+ DB · 납부자 테이블']} />
  </svg>;
}

const figureNotes: Record<1 | 2, string[]> = {
  1: ['대상 보존: 저장된 보정 대상을 서버 중단 후에도 조회 가능', '독립 실행: 결제 요청 배치를 다시 실행하지 않고 보정만 수행'],
  2: ['연계 전환: 전체 고객 API 조회에서 필요한 변경 데이터의 EAI 수신으로 전환', '처리 부담 감소: 전체 고객을 반복 조회하던 API 호출·DB 처리 부담 축소'],
};

export function TaskArchitecture({ task }: { task: 1 | 2 }) {
  return <figure className={styles.figure} data-resume-architecture={task}>
    {task === 1 ? <RecoveryArchitecture /> : <EaiArchitecture />}
    <figcaption className={styles.notes}><ul>{figureNotes[task].map(note => <li key={note}>{note}</li>)}</ul></figcaption>
  </figure>;
}
