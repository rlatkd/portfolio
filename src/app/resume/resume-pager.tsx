'use client';

import { Children, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ScanLine } from 'lucide-react';
import { readResumeZoom, resumeFit, resumeScaleEffect } from './resume-scale';
import styles from './resume-viewer.module.css';

const WIDTH = 794;
const HEIGHT = 1123;
const ZOOM_STEP = .25;
// global.css의 낮은 데스크톱 구간과 같다. 이 구간에서는 기본 배율을 확대·축소 한 단계만큼 줄인다.
const SHORT_DESKTOP = '(min-width: 1024px) and (max-height: 760px)';
const SCALE_SCRIPT = `(${resumeScaleEffect.toString()})(${resumeFit.toString()}, ${readResumeZoom.toString()}, ${JSON.stringify(SHORT_DESKTOP)})`;

export function ResumePager({ children }: { children: ReactNode }) {
  const pages = Children.toArray(children);
  const [page, setPage] = useState(0);
  // 하이드레이션 전에는 null이고, 그동안 배율은 인라인 스크립트가 넣은 CSS 변수를 따른다.
  const [measuredFit, setFit] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number | null>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const anchor = useRef<{ x: number; y: number } | null>(null);
  const fit = measuredFit ?? 1;
  const scale = zoom === null ? fit : Math.max(fit, zoom);
  const last = pages.length - 1;

  // 화면을 그리기 전에 쪽 · 배율을 정해야 첫 화면이 바뀌지 않는다.
  useLayoutEffect(() => {
    const restore = (event?: HashChangeEvent) => {
      // A router history update can run before this queued hashchange handler.
      // Use the navigation's destination, then keep the router URL in sync too.
      const url = new URL(event?.newURL || location.href);
      const hash = new URLSearchParams(url.hash.slice(1));
      const requested = Number(hash.get('page') || 1);
      setPage(Number.isInteger(requested) ? Math.max(0, Math.min(last, requested - 1)) : 0);
      setZoom(readResumeZoom(url.hash));
      if (event) history.replaceState(null, '', url.href);
      viewport.current?.scrollTo({ left: 0, top: 0, behavior: 'instant' });
    };
    restore();
    window.addEventListener('hashchange', restore);
    return () => window.removeEventListener('hashchange', restore);
  }, [last]);

  const remember = (nextPage: number, nextZoom: number | null) => {
    const hash = new URLSearchParams({ page: String(nextPage + 1) });
    if (nextZoom !== null) hash.set('zoom', String(nextZoom));
    history.replaceState(null, '', `#${hash}`);
  };

  useLayoutEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const short = window.matchMedia(SHORT_DESKTOP);
    const update = () => setFit(resumeFit(element.clientWidth, short.matches));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    short.addEventListener('change', update);
    return () => { observer.disconnect(); short.removeEventListener('change', update); };
  }, []);

  useEffect(() => {
    const element = viewport.current;
    if (!element || !anchor.current) return;
    element.scrollLeft = anchor.current.x * scale - element.clientWidth / 2;
    element.scrollTop = anchor.current.y * scale - element.clientHeight / 2;
    anchor.current = null;
  }, [scale]);

  const changePage = (next: number) => {
    const nextPage = Math.max(0, Math.min(last, next));
    setPage(nextPage);
    remember(nextPage, zoom);
    viewport.current?.scrollTo({ left: 0, top: 0, behavior: 'instant' });
  };

  const changeZoom = (next: number) => {
    const element = viewport.current;
    if (element) anchor.current = {
      x: (element.scrollLeft + Math.min(element.clientWidth, WIDTH * scale) / 2) / scale,
      y: (element.scrollTop + Math.min(element.clientHeight, HEIGHT * scale) / 2) / scale,
    };
    const nextZoom = Math.max(fit, Math.min(2, Math.round(next * 100) / 100));
    setZoom(nextZoom);
    remember(page, nextZoom);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      // 확대 중에는 방향키를 문서 내부 스크롤에 사용한다.
      if (zoom !== null && zoom > fit) return;
      event.preventDefault();
      changePage(page + (event.key === 'ArrowLeft' ? -1 : 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [last, page, zoom, fit]);

  return (
    <div className={styles.viewer} style={measuredFit === null ? undefined : { '--resume-scale': scale } as CSSProperties}>
      <div ref={viewport} className={styles.viewport} role='region' aria-label='이력서 문서' tabIndex={0}>
        <div className={styles.canvas}>
          <div className={styles.scaled}>
            {pages.map((content, index) => (
              <section key={index} aria-label={`${index + 1}쪽`} aria-hidden={index !== page} data-active={index === page} className={`resume-paper resume-page ${styles.paper} ${styles.casePaper}`}>
                <div className={styles.pageContent}>{content}</div>
                <p className={styles.pageNumber}>{index + 1} / {pages.length}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: SCALE_SCRIPT }} />
      <div className={styles.controls} aria-label='이력서 보기 도구'>
        <div className={styles.controlGroup}>
          <button type='button' aria-label='이전 쪽' disabled={page === 0} onClick={() => changePage(page - 1)}><ChevronLeft size={18} /></button>
          <span className={styles.pageStatus} role='status' aria-live='polite'>{page + 1} / {pages.length}</span>
          <button type='button' aria-label='다음 쪽' disabled={page === last} onClick={() => changePage(page + 1)}><ChevronRight size={18} /></button>
        </div>
        <div className={styles.controlGroup}>
          <button type='button' aria-label='축소' disabled={scale <= fit + .005} onClick={() => changeZoom(scale - ZOOM_STEP)}><ZoomOut size={17} /></button>
          <span className={styles.zoomStatus} aria-label='현재 배율'>{measuredFit === null ? '' : `${Math.round(scale * 100)}%`}</span>
          <button type='button' aria-label='확대' disabled={scale >= 2} onClick={() => changeZoom(scale + ZOOM_STEP)}><ZoomIn size={17} /></button>
          <button type='button' className={styles.fitButton} aria-label='너비 맞춤' onClick={() => { anchor.current = null; setZoom(null); remember(page, null); viewport.current?.scrollTo({ left: 0, top: 0, behavior: 'instant' }); }}><ScanLine size={16} /><span>너비 맞춤</span></button>
        </div>
      </div>
    </div>
  );
}
