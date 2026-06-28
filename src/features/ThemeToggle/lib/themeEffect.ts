export const themeEffect = () => {
  // 저장된 선택이 있으면 그걸, 없으면 기본 라이트(PDF 크림 톤)
  const stored = localStorage.getItem('theme');
  const isDark = stored === 'dark';

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
