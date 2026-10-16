# 콘텐츠와 운영 절차

## 콘텐츠 동기화

`pnpm content:check`는 Velog 공개 API를 페이지별로 읽고 새 글, 본문 해시·수정일 차이를 출력합니다. 차이가 있으면 종료 코드 1입니다. 읽기 전용이며 원격 글 삭제를 로컬 삭제로 반영하지 않습니다.

변경 보고를 확인한 뒤 `pnpm content:sync`로 반영하고 `git diff`로 검토합니다. 기존 frontmatter와 요약은 유지하며 기존 본문이 스냅샷과 다르면 덮어쓰지 않고 중단합니다. 신규 글은 원문·요약·태그 기반 기본 메타데이터를 가져옵니다. 신규 카테고리와 제목·SEO 설명은 검토 후 별도 관리합니다. 원문이 변경되면 본문 해시도 함께 갱신합니다.

`pnpm images:check`로 외부 이미지 응답을 검사합니다. `node scripts/check-images.mjs --write`는 확인한 이미지 크기를 별도 JSON에 기록합니다. 원문 파일은 수정하지 않습니다. 원문에서 비어 있는 alt는 가장 가까운 제목을 이용한 문맥 설명을 표시합니다. 필요한 상세 설명은 image-metadata.json의 해당 URL에 alt 필드로 추가할 수 있습니다. 대체 설명은 복잡한 표·도식의 핵심 관계를 설명하며 모든 픽셀·코드를 전사하지 않습니다. 현재 이미지 70개를 실제 확인해 구조·화면·표 내용을 설명하는 alt를 작성했습니다. 미제공 URL 1개는 확인 불가 상태를 기술했습니다. 신규 이미지도 같은 방식으로 검토해야 합니다. 주소가 비어 있는 원문 이미지 2곳은 표시하지 않습니다. 이미지 대신 HTML을 반환한 백준 URL 1곳은 unavailable 메타데이터에 따라 안내를 표시합니다. 서버가 이미지를 다시 제공하면 크기 갱신으로 해당 상태를 해제할 수 있습니다.

글은 배포 산출물에 포함됩니다. 하루 ISR은 원격 Velog 동기화가 아닙니다. 동기화 → diff 검토 → 검증 → 배포해야 반영됩니다.

## 분석과 개인정보

GA4, Vercel Analytics, Speed Insights는 `NODE_ENV=production` 및 `VERCEL_ENV=production`이고 브라우저 호스트가 `NEXT_PUBLIC_BASE_URL`의 호스트와 같을 때만 로드됩니다. Vercel 프리뷰·로컬 방문은 제외합니다. Vercel 밖으로 이전하면 배포 환경 판정도 재검토합니다. 브라우저 회귀 테스트는 분석 서버 요청을 차단합니다.

배포 후 운영 도메인에서 GA 실시간 보고서를 확인합니다. GA 모니터링 대상은 실제 운영 도메인으로 설정하고, 이전 Vercel 미리보기 주소의 알림은 관리 화면에서 제외합니다. 실제 별도 사이트 간 사용자 여정을 연결하지 않는다면 교차 도메인 측정을 추가할 필요가 없습니다.

`/privacy`는 실제 사용 도구를 설명합니다. 계정의 보관 기간·동의·광고 관련 설정은 코드로 확인할 수 없으므로 계정에서 별도 확인해야 합니다. 이 페이지가 법률 검토나 동의 관리 기능을 대신하지는 않습니다.

## 배포와 장애 대응

1. `pnpm install --frozen-lockfile`, `pnpm run check`, `pnpm run test:e2e` 통과를 확인합니다.
2. 배포 후 `pnpm monitor`로 홈·글 목록·sitemap·RSS·이력서·개인정보 안내의 상태와 기본 메타데이터를 검사합니다.
3. 실패 시 Vercel 배포 상태·빌드 로그·런타임 로그와 도메인 리디렉션을 확인합니다. 문제가 새 배포에서 발생했으면 Vercel에서 이전 정상 배포로 롤백합니다.
4. 대표 주소를 다시 검사하고 오류가 사라졌는지 확인합니다. GA 데이터는 수집 차단·반영 지연이 있으므로 가용성 판단 근거로 쓰지 않습니다.

GitHub Actions의 Production availability 워크플로는 6시간마다 운영 HTTP 응답을 검사하고, 운영 배포 성공 이벤트에서도 점검합니다. 운영 배포 실패·오류 이벤트는 실패한 Actions 실행으로 남깁니다. 홈·목록·sitemap·RSS·이력서·개인정보·성능 근거와 RSS 첫 글의 실제 본문을 확인합니다. 실시간 가용성 SLA를 제공하는 검사는 아니며 예약 실행이 지연될 수 있습니다. **저장소 기본 브랜치에 푸시된 후** 예약 실행이 활성화됩니다. 실패 통지는 사용자의 GitHub Actions 알림 설정을 따릅니다. Vercel 배포 실패 알림·외부 상시 모니터 알림은 계정 설정이 필요하며 이번 코드 변경으로 연결되었다고 간주하지 않습니다.

## 의존성

Dependabot은 npm 패키지와 GitHub Actions 업데이트 PR을 주 단위로 제안합니다. 자동 병합하지 않으며 CI 결과와 주요 버전 변경 내용을 검토합니다. `pnpm audit --prod`는 CI에서 실행합니다. `pnpm audit`로 개발 의존성도 점검합니다.

pnpm-workspace.yaml의 override는 하위 의존성의 보안 수정 버전을 고정합니다. 상위 패키지가 해당 버전을 기본 포함하게 되면 override를 제거하고 lockfile 갱신·전체 검증을 수행합니다. `braces`는 실제 배포된 수정 버전이 확인되기 전까지 존재하지 않는 버전으로 덮어쓰지 않습니다.

## 공개 이력서

`/resume`는 site-data.tsx에서 같은 공개 데이터를 사용하므로 경력 이중 관리를 줄입니다. 인쇄 버튼의 브라우저 인쇄 창에서 PDF 저장을 선택합니다. 원본 개인 이력서 파일을 공개하거나 자동으로 복사하지 않습니다. 경력 사실 수정 시 원본 자료 및 사용자 확인 내용과 대조합니다.


## 성능 실험 재현

공개 JSON은 `public/reports/upquant-correlation.json`, 실험 코드는 `scripts/benchmarks/upquant-correlation.py`입니다. up-quant 소스의 공개 커밋 `915fd9232efbea6ac97f90f2ff61c90bee41c1fd`을 별도 디렉터리에 체크아웃하고 해당 backend requirements를 Python 가상환경에 설치합니다. 측정 당시 Python·의존성 버전은 JSON에 있습니다. 최신 브랜치 검증 시에는 실행 전에 `git ls-remote https://github.com/rlatkd/up-quant.git refs/heads/main`으로 커밋을 확인하고, 별도의 깨끗한 체크아웃을 준비해 `--verify-remote` 옵션을 추가합니다. 이 옵션은 실행 직전에 원격 main을 다시 확인하며 달라졌으면 중단합니다. 과거 고정 커밋의 재현에는 이 옵션을 생략합니다.

```bash
PYTHONHASHSEED=0 /path/to/up-quant/backend/.venv/bin/python -B scripts/benchmarks/upquant-correlation.py --source /path/to/up-quant --expected-commit 915fd9232efbea6ac97f90f2ff61c90bee41c1fd --output /tmp/upquant-correlation.json
```

실제 상관 분석·일봉 변환·캐시 코드를 실행하고 제공자 데이터만 고정 fixture로 바꿉니다. 260종목·각 200개 일봉, 60일 수익률 구간, 단일 실행으로 캐시 초기화 10회와 재사용 100회를 측정합니다. 데이터 제공 함수 호출 수와 결과 일치도 검사합니다. 거래소 HTTP·TLS·스로틀과 실제 데이터는 포함하지 않으므로 운영 응답 시간이나 과거 1.8초의 재현 실험이 아닙니다. CPU 부하 등에 따라 시간은 달라지며 CI 성능 합격 기준으로 쓰지 않습니다.

후속 작업과 사용자 보류 사항은 [TODO.md](TODO.md)에 기록합니다.
