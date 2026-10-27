# 운영 안내

## 콘텐츠 관리

| 수정할 내용 | 위치 |
| --- | --- |
| 경력·담당 업무 | `src/shared/data/career-data.ts` |
| 학력·교육·자격 | `src/shared/data/profile-data.ts` |
| 소개·프로젝트 | `src/shared/data/site-data.tsx` |
| 블로그 글 | `src/shared/content/posts/` |
| 이미지 설명·크기 | `src/shared/content/image-metadata.json` |

`pnpm content:check`로 콘텐츠 변경을 확인하고 `pnpm content:sync`로 반영합니다. 차이가 있으면 확인 명령은 종료 코드 1을 반환합니다. 반영 후 diff를 검토하고 검증·배포합니다.

외부 리소스는 `pnpm images:check`와 `pnpm links:check`로 점검합니다. 이미지 정보를 갱신하려면 `node scripts/check-images.mjs --write`를 실행합니다.

## 배포 확인

1. `pnpm run check`로 타입 검사·단위 테스트·빌드를 실행합니다.
2. `pnpm run test:e2e`로 브라우저 테스트를 실행합니다.
3. 배포 후 `pnpm monitor`로 운영 사이트를 점검합니다.
4. 홈·블로그·이력서를 확인합니다. 이력서는 검색 제외(`noindex`)와 사이트맵 제외를 유지합니다.

`NEXT_PUBLIC_BASE_URL`은 canonical·사이트맵·RSS의 기준 주소입니다. 도메인을 변경하면 함께 갱신합니다.

## 장애 대응

Vercel의 배포·런타임 로그를 확인합니다. 새 배포가 원인이면 이전 정상 배포로 롤백한 뒤 `pnpm monitor`로 다시 확인합니다.

GitHub Actions의 `Validate`는 push·PR의 보안 검사, 타입 검사, 테스트, 빌드를 실행합니다. 운영 사이트와 외부 리소스 점검은 필요할 때 위 명령으로 직접 실행합니다.

## 분석·의존성

방문 분석은 Vercel 운영 환경과 대표 도메인에서만 활성화합니다. 수집 여부와 보관 기간은 각 서비스 관리 화면에서 확인합니다.

의존성은 필요한 보안 수정·버그 해결·호환성 변경을 검토해 수동으로 업데이트합니다. 운영 의존성 보안 검사는 CI에서 실행하며, 개발 의존성까지 확인하려면 `pnpm audit`를 실행합니다.

## 프로젝트 실험 자료

up-quant 실험 결과는 [`public/reports/upquant-correlation.json`](../public/reports/upquant-correlation.json), 실행 코드는 [`scripts/benchmarks/upquant-correlation.py`](../scripts/benchmarks/upquant-correlation.py)에 있습니다. 측정 환경과 범위는 결과 파일에서 확인합니다.
