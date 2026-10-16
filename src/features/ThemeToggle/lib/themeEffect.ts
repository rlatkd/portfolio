export const themeEffect = () => {
  try {
    document.documentElement.classList.toggle('dark', localStorage.getItem('theme') === 'dark');
  } catch {
    // Storage may be disabled; retain the default light theme.
  }
};
