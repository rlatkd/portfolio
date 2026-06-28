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
        // 브랜드 팔레트 (포트폴리오 색상)
        navy: '#0a1628',
        'navy-mid': '#132040',
        gold: '#c49a3c',
        'gold-light': '#e8c97a',
        cream: '#f7f4ef',
        'cream-dark': '#ede9e1',
        // 시맨틱 토큰 (라이트/다크 전환)
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        fg: 'var(--fg)',
        'fg-strong': 'var(--fg-strong)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
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
