// 아래 함수들은 첫 화면 전에 실행되는 인라인 스크립트에도 toString()으로 들어가므로 바깥 값을 참조하지 않는다.

// 문서 너비(794px)에 맞춘 배율. 낮은 데스크톱 구간에서는 확대·축소 한 단계(0.25)만큼 작게 시작한다.
export function resumeFit(width: number, shortDesktop: boolean) {
  return Math.min(shortDesktop ? .75 : 1, width / 794);
}

export function readResumeZoom(hash: string) {
  const zoom = Number(new URLSearchParams(hash.slice(1)).get('zoom'));
  return zoom > 0 && zoom <= 2 ? zoom : null;
}

// 서버 HTML은 화면 크기를 모르므로, 문서 영역 바로 뒤에서 실제 너비를 재 첫 배율을 CSS 변수로 넣는다.
export function resumeScaleEffect(fit: typeof resumeFit, readZoom: typeof readResumeZoom, query: string) {
  const viewport = document.currentScript?.previousElementSibling;
  if (!viewport) return;
  const base = fit(viewport.clientWidth, window.matchMedia(query).matches);
  const zoom = readZoom(location.hash);
  document.documentElement.style.setProperty('--resume-scale', String(zoom === null ? base : Math.max(base, zoom)));
}
