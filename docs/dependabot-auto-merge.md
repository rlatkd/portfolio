# Dependabot 자동 머지

## 정책

- 대상: 같은 저장소에서 Dependabot이 만든 `main` 대상 PR.
- 루트 npm 패키지의 **patch 업데이트만** 허용한다. 묶음 PR도 모든 업데이트가 patch여야 한다.
- GitHub API로 PR 작성자와 모든 PR 커밋의 Dependabot 작성자·서명을 확인하고, 실제 package.json 변경을 비교한다. PR 제목이나 라벨만으로 판단하지 않는다. 신규·기존 PR 모두 이벤트의 pull_request 필드에 의존하지 않는다.
- patch 여부는 서명된 head 커밋의 구조화된 업데이트 선언으로 판단한다. 예를 들어 실제 설치 버전이 `8.5.23 → 8.5.31`인 patch라면, 오래된 package.json 범위가 `^8.4.35 → ^8.5.31`로 갱신되어도 허용한다. 선언이 없거나 형식이 불명확하면 수동 검토한다.
- 변경 파일은 `package.json`과 `pnpm-lock.yaml`만 허용한다. 패키지 추가/삭제, 버전 범위 연산자 변경, minor/major, prerelease, 스크립트 변경은 수동 검토한다.
- GitHub Actions 업데이트와 lockfile만 변경하는 업데이트도 수동 검토한다.
- 자동 승인이나 보호 규칙 우회, 브랜치 갱신, 강제 머지는 하지 않는다.
- 자동 머지 활성화 후에도 GitHub가 필수 CI, 최신 main 반영 및 리뷰 조건을 강제한다. 조건을 이미 충족했다면 즉시 머지될 수 있다.

## 최초 설정 (저장소 관리자)

관리자인 소유자는 기존처럼 main에 직접 푸시한다. 필수 CI 규칙은 관리자 우회 권한이 없는 GitHub Actions의 `GITHUB_TOKEN`으로 처리하는 Dependabot 자동 머지에 적용한다. 워크플로에 관리자 PAT나 보호 규칙 우회 권한을 부여하지 않는다.

로컬 파일만으로 GitHub 설정은 바뀌지 않는다. 먼저 변경 사항을 검토하고 main에 반영한 뒤 `Validate / check`가 실제 GitHub에서 통과하는지 확인한다.

1. **Settings → General → Pull Requests**에서 `Allow squash merging`과 `Allow auto-merge`를 모두 켠다. 브랜치 보호 규칙이나 저장소 변수와는 별개의 설정이다. 로그에 `autoMergeAllowed: false`가 나오면 이 화면의 `Allow auto-merge`가 꺼진 상태다.
2. **Settings → Branches → Add classic branch protection rule**에서 정확히 `main`을 지정한다.
   - `Require a pull request before merging`: 끈다.
   - `Require status checks to pass before merging`: 켠다. GitHub Actions의 `check`를 필수 검사로 지정한다. 화면에는 `Validate / check`로 표시될 수 있다.
     검색란에 입력만 하지 말고 검색 결과의 `check`를 선택해 필수 검사 목록에 추가한 뒤 저장한다. 체크박스만 켜고 검사 목록을 비워 두면 자동 머지는 중단된다.
   - `Require branches to be up to date before merging`: 켠다.
   - `Require conversation resolution before merging`: 켠다.
   - `Do not allow bypassing the above settings`: 끈다. 관리자인 소유자가 main에 직접 푸시할 수 있게 한다.
   - PR 우회 허용 목록을 비워 두고, force push와 브랜치 삭제는 허용하지 않는다.
3. **Actions → Dependabot auto-merge → Run workflow**에서 main과 `dry_run: true`로 실행해 기존 PR 평가 결과를 확인한다.
4. **Settings → Secrets and variables → Actions → Variables**에 `DEPENDABOT_AUTO_MERGE_ENABLED`를 값 `true`로 추가한다.
5. 같은 워크플로를 `dry_run: false`로 실행하면 기존 PR 중 적격 PR의 auto-merge가 활성화된다.

보호 규칙의 API 입력은 `.github/main-protection.json`에 준비돼 있다. 기존 규칙이 있다면 먼저 비교하고 더 강한 규칙을 약화시키지 않는다. 워크플로는 일반 GITHUB_TOKEN이 조회할 수 있는 refUpdateRule로 해당 토큰에 적용되는 필수 검사 목록을 확인한다. 관리자용 branchProtectionRule이나 우회 허용 목록은 조회하지 않는다. classic branch protection을 기준으로 구성하며 ruleset만 설정한 경우에는 중단할 수 있다. 최신 main 반영 및 검사 출처 등의 상세 설정은 위 절차대로 저장하고 GitHub가 머지 시 강제한다.

인증된 관리자가 CLI로 적용할 경우 (선택 사항):

```bash
gh api --method PATCH repos/rlatkd/portfolio -F allow_auto_merge=true -F allow_squash_merge=true
gh api --method PUT repos/rlatkd/portfolio/branches/main/protection --input .github/main-protection.json
gh variable set DEPENDABOT_AUTO_MERGE_ENABLED --body true --repo rlatkd/portfolio
```

관리자 계정은 main에 직접 푸시할 수 있다. 다른 ruleset이나 조직 정책에서 별도로 직접 푸시를 제한하고 있다면 해당 규칙도 확인한다. 위 CLI 명령은 저장소 설정을 변경하므로 관리자 본인이 검토 후 실행한다.

## 신규·기존 PR 처리

- 신규 PR 생성/수정 시 해당 PR을 평가한다.
- main이 갱신될 때는 열린 Dependabot PR 전체를 다시 평가한다.
- 기존 PR은 삭제하거나 다시 만들 필요 없다. 수동 실행으로도 전체를 평가할 수 있다.
- `dry_run`은 PR과 설정을 변경하지 않는다. 저장소 변수가 없거나 `true`가 아니어도 변경하지 않는다.
- 적격 patch PR의 dry-run은 보호 규칙도 읽어 설정 누락을 안내한다. 실제 변경 모드에서는 설정 누락 시 머지하지 않고 실패한다.
- 기존 PR이 오래된 main 기반이면 보호 규칙에 의해 대기한다. PR에서 `@dependabot rebase`로 갱신을 요청하고 CI가 다시 통과하는지 확인한다.
- 기존에 auto-merge를 켠 PR이 이후 정책을 벗어나면, 활성 상태의 자동화가 재평가할 때 auto-merge를 해제한다.
- 실패한 CI를 건너뛰거나 테스트를 재시도해서 통과시키는 로직은 없다.

## 중지 및 배포 확인

새 auto-merge 활성화를 중지하려면 `DEPENDABOT_AUTO_MERGE_ENABLED`를 `false`로 변경한다. 이미 활성화된 PR은 별도로 `Disable auto-merge`를 눌러 해제해야 한다.

Vercel 배포와 `Production availability`는 머지 후에도 확인한다. 운영 점검 실패가 자동 롤백을 실행하지는 않는다.

공식 문서: https://docs.github.com/en/code-security/tutorials/secure-your-dependencies/automate-dependabot-with-actions
