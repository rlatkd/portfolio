/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 시맨틱 토큰 (라이트/다크 전환)
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        fg: 'var(--fg)',
        'fg-strong': 'var(--fg-strong)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        'on-accent': 'var(--on-accent)',
        tab: 'var(--tab)',
        button: 'var(--button)',
        'on-button': 'var(--on-button)',
        'button-2': 'var(--button-2)',
        'on-button-2': 'var(--on-button-2)',
        'button-2-border': 'var(--button-2-border)',
        ok: 'var(--ok)',
        'ok-bg': 'var(--ok-bg)',
        chip: 'var(--chip)',
        'nav-active': 'var(--nav-active)',
        error: 'var(--error)',
      },
      fontFamily: {
        // restyart 동일: 전부 산세리프(Pretendard). serif/mono 클래스도 산세리프로 alias.
        sans: ['var(--font-sans)'],
        serif: ['var(--font-sans)'],
        mono: ['var(--font-sans)'],
        code: ['var(--font-code)'],
      },
      maxWidth: {
        content: '960px',
      },
    },
  },
  plugins: [],
}
