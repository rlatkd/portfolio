// 2026-11-04: 개발 서버를 켜고, Next.js가 준비됐다고(Ready) 알리면 그 주소를 기본 브라우저로 연다.
// pnpm dev:open · npm run dev:open 어디서 실행해도 같다. 뒤에 붙인 옵션은 next dev로 넘긴다(예: pnpm dev:open --port 4000).
// 이전 opener.js는 서버가 뜨기 전에 3000번 주소를 열어 첫 화면이 접속 실패로 보이거나, 3000번이 이미 쓰이고 있으면 다른 서버를 열 수 있었다.
import { exec, spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', '--webpack', ...process.argv.slice(2)], {
  stdio: ['inherit', 'pipe', 'inherit'],
  // 출력을 대신 전달하므로 터미널이면 색을 그대로 유지한다.
  env: { ...process.env, ...(process.stdout.isTTY ? { FORCE_COLOR: '1' } : {}) },
});

let url = null;
let ready = false;
let opened = false;
server.stdout.on('data', chunk => {
  process.stdout.write(chunk);
  if (opened) return;
  const text = chunk.toString().replace(/\u001b\[[0-9;]*m/g, '');
  url ??= text.match(/Local:\s+(https?:\/\/\S+)/)?.[1] ?? null;
  ready ||= /Ready in/.test(text);
  if (url && ready) {
    opened = true;
    const command = process.platform === 'win32' ? `start "" "${url}"` : process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
    exec(command, error => { if (error) console.log(`브라우저를 열지 못했습니다. 직접 여세요: ${url}`); });
  }
});

for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.kill(signal));
server.on('exit', (code, signal) => process.exit(code ?? (signal ? 1 : 0)));
