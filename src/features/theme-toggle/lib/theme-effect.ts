export const themeEffect = () => {
  // 2026-11-01: 라이트가 기본 테마. 사용자가 다크를 선택해 저장한 경우에만 다크로 표시
  let dark = false;
  try {
    dark = localStorage.getItem('theme') === 'dark';
  } catch {
    // Storage may be disabled; retain the default light theme.
  }
  document.documentElement.classList.toggle('dark', dark);
};
