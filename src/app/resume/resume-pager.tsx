'use client';

import { Children, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ScanLine } from 'lucide-react';
import styles from './resume-viewer.module.css';

const WIDTH = 794;
const HEIGHT = 1123;

export function ResumePager({ children }: { children: ReactNode }) {
  const pages = Children.toArray(children);
  const [page, setPage] = useState(0);
  const [fit, setFit] = useState(1);
  const [zoom, setZoom] = useState<number | null>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const anchor = useRef<{ x: number; y: number } | null>(null);
  const scale = zoom === null ? fit : Math.max(fit, zoom);
  const last = pages.length - 1;

  useEffect(() => {
    const restore = (event?: HashChangeEvent) => {
      // A router history update can run before this queued hashchange handler.
      // Use the navigation's destination, then keep the router URL in sync too.
      const url = new URL(event?.newURL || location.href);
      const hash = new URLSearchParams(url.hash.slice(1));
      const requested = Number(hash.get('page') || 1);
      const requestedZoom = Number(hash.get('zoom'));
      setPage(Number.isInteger(requested) ? Math.max(0, Math.min(last, requested - 1)) : 0);
      setZoom(requestedZoom > 0 && requestedZoom <= 2 ? requestedZoom : null);
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

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setFit(Math.min(1, element.clientWidth / WIDTH)));
    observer.observe(element);
    return () => observer.disconnect();
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
    <div className={styles.viewer}>
      <div ref={viewport} className={styles.viewport} role='region' aria-label='이력서 문서' tabIndex={0}>
        <div className={styles.canvas} style={{ width: WIDTH * scale, height: HEIGHT * scale }}>
          <div className={styles.scaled} style={{ transform: `scale(${scale})` }}>
            {pages.map((content, index) => (
              <section key={index} aria-label={`${index + 1}쪽`} aria-hidden={index !== page} data-active={index === page} className={`resume-paper resume-page ${styles.paper}`}>
                <div className={styles.pageContent}>{content}</div>
                <p className={styles.pageNumber}>{index + 1} / {pages.length}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.controls} aria-label='이력서 보기 도구'>
        <div className={styles.controlGroup}>
          <button type='button' aria-label='이전 쪽' disabled={page === 0} onClick={() => changePage(page - 1)}><ChevronLeft size={18} /></button>
          <span className={styles.pageStatus} role='status' aria-live='polite'>{page + 1} / {pages.length}</span>
          <button type='button' aria-label='다음 쪽' disabled={page === last} onClick={() => changePage(page + 1)}><ChevronRight size={18} /></button>
        </div>
        <div className={styles.controlGroup}>
          <button type='button' aria-label='축소' disabled={scale <= fit + .005} onClick={() => changeZoom(scale - .25)}><ZoomOut size={17} /></button>
          <span className={styles.zoomStatus} aria-label='현재 배율'>{Math.round(scale * 100)}%</span>
          <button type='button' aria-label='확대' disabled={scale >= 2} onClick={() => changeZoom(scale + .25)}><ZoomIn size={17} /></button>
          <button type='button' className={styles.fitButton} aria-label='너비 맞춤' onClick={() => { anchor.current = null; setZoom(null); remember(page, null); viewport.current?.scrollTo({ left: 0, top: 0, behavior: 'instant' }); }}><ScanLine size={16} /><span>너비 맞춤</span></button>
        </div>
      </div>
    </div>
  );
}
