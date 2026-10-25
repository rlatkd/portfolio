export const themeEffect = () => {
  // 다크가 기본 테마. 사용자가 라이트를 선택해 저장한 경우에만 라이트로 표시
  let dark = true;
  try {
    dark = localStorage.getItem('theme') !== 'light';
  } catch {
    // Storage may be disabled; retain the default dark theme.
  }
  document.documentElement.classList.toggle('dark', dark);
};
