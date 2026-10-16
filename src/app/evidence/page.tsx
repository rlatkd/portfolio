import Link from 'next/link';
import report from '../../../public/reports/upquant-correlation.json';
export const metadata = { title: '성능 수치의 근거와 확인 범위', alternates: { canonical: '/evidence' } };
export default function Evidence() {
  return <main className='mx-auto w-full max-w-3xl px-6 py-12 leading-loose'>
    <Link href='/#projects' className='text-accent underline'>← 프로젝트</Link>
    <h1 className='mt-8 text-3xl font-bold'>성능 수치의 근거와 확인 범위</h1>
    <section className='mt-8'><h2 className='text-xl font-bold'>상관 분석 약 1.8초 → 5ms</h2>
      <p>up-quant의 공개 README에 기재된 개발 중 관측값입니다. 종목별 일봉 200개를 공용 캐시에 저장하고 상관 분석에서 재사용하는 변경입니다. 운영 배포 구성은 EC2 t3.small의 단일 프로세스입니다. 해당 구성이 수치를 측정한 환경과 같다고 확인된 것은 아닙니다.</p>
      <p>캐시 상태, 동시 사용자 수, 반복 횟수와 백분위 응답 시간은 공개 자료에서 확인되지 않습니다. 외부 조회와 캐시 재사용의 차이를 보여주는 참고값이며 모든 요청에 대한 성능 보장이 아닙니다.</p>
      <a className='text-accent underline' href='https://github.com/rlatkd/up-quant/blob/main/README.md'>구현·캐시 정책·실행 방법</a>
    </section>
    <section className='mt-8'><h2 className='text-xl font-bold'>실제 상관 분석 함수의 별도 오프라인 실험</h2>
      <p>2026-10-16에 고정 데이터 260종목 × 200일봉으로 실제 get_correlation 함수를 실행했습니다. 동시 실행 1개, 외부 네트워크 미사용, 조회 구간 60일이며 입력 생성식·소스 커밋·파일 해시·개별 측정값을 기록했습니다.</p>
      <table className='my-4 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_td]:px-3 [&_td]:py-2 [&_td]:border-t [&_td]:border-line'><caption className='sr-only'>고정 데이터로 측정한 상관 분석 함수의 캐시 상태별 실행 시간</caption><thead><tr><th className='pr-6'>상태</th><th className='pr-6'>횟수</th><th className='pr-6'>p50</th><th>p95</th></tr></thead><tbody>
        <tr><td>매번 캐시 초기화</td><td>{report.cold.samples}</td><td>{report.cold.p50Ms}ms</td><td>{report.cold.p95Ms}ms</td></tr>
        <tr><td>일봉 캐시 재사용</td><td>{report.warm.samples}</td><td>{report.warm.p50Ms}ms</td><td>{report.warm.p95Ms}ms</td></tr>
      </tbody></table>
      <p>환경: {report.environment.os} {report.environment.osRelease} · {report.environment.architecture} · Python {report.environment.python}. 캐시 재사용 100회 동안 데이터 제공 함수 호출은 0회였고 반환 결과는 같았습니다. HTTP 서버·실제 거래소 지연을 포함하지 않으므로 과거 1.8초 수치의 재현이나 운영 응답 시간으로 해석하지 않습니다.</p>
      <p>측정 소스는 실행 전에 지정 커밋과 원격 main의 일치 및 백엔드 변경 여부를 확인했습니다. 조회 시점의 커밋이며 이후의 업데이트까지 보장하지 않습니다.</p>
      <a className='text-accent underline' href='/reports/upquant-correlation.json'>조건·원시 측정값 JSON</a>{' · '}
      <a className='text-accent underline' href={`https://github.com/rlatkd/up-quant/tree/${report.sourceCommit}`}>측정 대상 소스 커밋</a>
    </section>
    <section className='mt-8'><h2 className='text-xl font-bold'>Kafka 5만 건 · 12초 → 7초</h2>
      <p>교육 팀 프로젝트에서 batch.size·linger.ms 조합을 조정하며 관측한 처리 시간입니다. 공개 저장소에는 튜닝 그래프와 Kafka 구조도가 있습니다. 메시지 크기·부하 발생기·장비 사양·반복 횟수와 원시 로그는 이 포트폴리오에서 재현 검증하지 못했습니다. 운영 트래픽 처리량이나 처리 보장 수치로 해석하지 않습니다.</p>
      <a className='text-accent underline' href='https://github.com/rlatkd/cms-plus/blob/dev/assets/kafka-batch-tuning-graph.png'>튜닝 그래프</a>{' · '}
      <a className='text-accent underline' href='https://github.com/rlatkd/cms-plus/blob/dev/README.md'>구조·구현 문서</a>
    </section>
    <section className='mt-8'><h2 className='text-xl font-bold'>엑셀 15만 건 · 약 8분</h2>
      <p>실무에서 확인한 처리 결과이며 공개 벤치마크가 아닙니다. 사내 데이터·운영 로그는 공개하지 않습니다. 데이터 크기·네트워크·실행 환경과 원시 측정 자료가 공개되어 있지 않아 외부에서 같은 수치를 재현할 수 없습니다. 메모리 원인은 현상과 개선 결과에 기반한 추론이며 힙 덤프·GC 로그로 확정하지 않았습니다.</p>
    </section>
  </main>;
}
