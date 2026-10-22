# 드라이브 즉시 반영 설정 가이드 (빌드 때 드라이브 읽기)

드라이브 `[연결] 홈페이지` 폴더를 고친 뒤 **Vercel 재배포를 한 번 요청하면, 코드를 건드리지 않아도 약 2~3분 안에 사이트에 반영**되게 하는 방식입니다.
코드 실행이 안 되는 AI(ChatGPT 등 커넥터만 있는 환경)도 쓸 수 있습니다. (규칙·폴더 구조는 [DRIVE-SYNC.md](DRIVE-SYNC.md))

## 동작 방식

```
AI/사람이 드라이브 폴더 수정
   → Vercel 재배포 요청 (커넥터 create_deployment, 아래 "재배포 요청 방법")
   → Vercel 빌드 시작 직전에 scripts/prebuild-drive.mjs 가 드라이브를 읽어 이미지·데이터를 새로 만듦
   → 빌드·배포 (약 2~3분) → seongileng.kr 에 반영
```

- 드라이브를 읽는 것은 **빌드 때마다** 일어납니다. 그래서 코드 푸시(예: 문구 수정)로 배포될 때도 항상 드라이브의 최신 상태가 반영됩니다.
- 드라이브 내용은 git 에 커밋되지 않습니다 (저장소의 `src/data/drive.json`·`public/drive` 는 키가 없을 때 쓰는 예비본).
- **키가 설정돼 있는데 드라이브를 읽지 못하면 빌드가 실패**합니다. 실패한 빌드는 배포되지 않으므로 운영 사이트는 그대로이고, 빌드 로그에 이유가 나옵니다. (조용히 옛 데이터로 배포되지 않게 한 것)
- 키가 없는 환경(내 컴퓨터 `npm run dev`/`npm run build`)에서는 이 단계를 건너뛰고 저장소의 데이터를 씁니다.

## 처음 한 번만 하는 설정 (구글 계정 `seongil.e.ai@gmail.com` 으로)

**서비스 계정 키는 비밀번호와 같습니다.** 채팅·문서·커밋·메일에 붙여 넣지 말고, 아래 6번 Vercel 환경변수에만 넣으세요. (AI 에게도 보여주지 마세요.)

1. https://console.cloud.google.com 에 `seongil.e.ai@gmail.com` 으로 로그인 → 상단 프로젝트 선택 → **새 프로젝트** (이름 예: `seongil-homepage-sync`).
2. 왼쪽 메뉴 **API 및 서비스 → 라이브러리** → `Google Drive API` 검색 → **사용**.
3. **IAM 및 관리자 → 서비스 계정 → 서비스 계정 만들기** → 이름 `drive-sync` → 역할은 비워 두고 **완료**.
4. 만든 서비스 계정을 열어 **키** 탭 → **키 추가 → 새 키 만들기 → JSON** → 파일이 내려받아집니다.
   - "키 생성이 조직 정책으로 막혀 있다"고 나오면 알려주세요 (다른 방법으로 전환).
5. 서비스 계정 이메일(`drive-sync@프로젝트ID.iam.gserviceaccount.com`)을 복사해서, 드라이브의 **`[연결] 홈페이지` 폴더를 우클릭 → 공유 → 그 이메일을 `뷰어`로 추가** (알림 보내기는 끄기).
   - 이 폴더만 공유되므로 서비스 계정은 다른 드라이브 자료를 볼 수 없습니다.
6. Vercel → 프로젝트 `seongil-energy-homepage` → **Settings → Environment Variables → Add**
   - Key: `GOOGLE_SERVICE_ACCOUNT_JSON`
   - Value: 4번에서 받은 JSON 파일의 **내용 전체** (`{`로 시작해 `}`로 끝남)
   - Environments: **Production** (미리보기도 쓰려면 Preview 도 체크), **Sensitive** 체크 → 저장. 그 뒤 내려받은 JSON 파일은 삭제하세요.
7. 아래 "재배포 요청 방법"으로 한 번 배포해서 성공(READY)하는지 확인. 빌드 로그에 `[drive] 드라이브 반영 완료`가 보이면 성공입니다.

## 재배포 요청 방법 (드라이브를 고친 뒤 AI 가 하는 일)

Vercel 커넥터(MCP)가 있는 AI 는 아래 순서로 즉시 반영을 요청합니다. (코드 푸시 없이 가능)

1. **최근 운영 배포 찾기**: `list_deployments` — 프로젝트 `prj_b9AaltsR6G1tKx23w3w1Iy12lnC5`, 팀 `team_EijuV7qGBnLNAsiyzR7v1DyK` → `target: production` 이고 `state: READY` 인 가장 최근 배포의 `id` (`dpl_…`).
2. **재배포**: `create_deployment`
   - `requestBody`: `{ "name": "seongil-energy-homepage", "deploymentId": "<위에서 찾은 id>", "target": "production", "withLatestCommit": true }`
   - `forceNew`: `"1"` (이전과 비슷해도 새로 빌드)
3. **완료 확인**: `get_deployment` 로 상태가 `READY` 가 될 때까지(보통 2~3분) 확인. `ERROR` 면 빌드 로그(`list_deployment_events`)에서 `[drive]` 로 시작하는 줄을 읽고 사용자에게 원인을 알립니다.
4. 사용자에게 "반영 완료, https://seongileng.kr 에서 확인해 보세요"라고 알립니다.

코드 실행이 가능한 환경(Claude Code 등)에서는 위 방법을 그대로 써도 되고, 로컬에서 `npm run sync:drive`(내 컴퓨터 G: 드라이브 기준) → 푸시해도 됩니다.

## 확인·문제 해결 (Vercel 빌드 로그에서 `[drive]` 줄 확인)

| 증상 | 원인·조치 |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_JSON 이 없어 … 건너뜁니다` | 6번 환경변수가 없음(또는 해당 환경에 체크 안 됨) → 저장 후 재배포 |
| `올바른 JSON 이 아닙니다` | 값이 잘렸거나 따옴표 등이 바뀜 → JSON 파일 내용 전체를 다시 붙여 넣기 |
| `토큰 발급 실패` | 키가 삭제·교체됨 → 4번부터 다시 |
| `Drive API 오류 (403/404)` | 5번 공유 누락(뷰어로 추가), 또는 2번 Drive API 사용 설정 누락 |
| `폴더 안에 항목이 없습니다` | 폴더 ID(`DRIVE_ROOT_ID`, 기본값은 코드 안 상수)가 바뀜 → 환경변수 `DRIVE_ROOT_ID` 로 지정 |
| 재배포는 성공했는데 사이트가 그대로 | 브라우저 캐시(Ctrl+F5). 그래도 같으면 빌드 로그에서 `[drive] 드라이브 반영 완료`가 있었는지 확인 (없으면 키가 없어 건너뛴 것) |

## 비용·한도·주의
- 빌드마다 드라이브 폴더 전체(현재 약 40MB)를 내려받아 빌드가 10~20초 길어집니다. Vercel Hobby 한도(빌드 시간·배포 횟수)에는 거의 영향이 없습니다.
- 드라이브에 **잘못 올린 파일도 다음 배포 때 그대로 반영**됩니다. 수정 전에 무엇을 바꿀지 사용자에게 확인하세요. 되돌리려면 드라이브 파일을 원래대로 돌리고 다시 재배포합니다 (휴지통 복구 가능).
- 새 제품의 **설명 문구**(`src/lib/product-texts.ts`)는 자동으로 만들어지지 않습니다. 새 제품은 이미지만 먼저 나옵니다.
- 이미지·PDF 용량이 커지면(PDF 수십 MB) 빌드가 느려집니다.

## 키를 바꾸거나 중단하려면
- 중단: Vercel 환경변수 `GOOGLE_SERVICE_ACCOUNT_JSON` 삭제 → 이후 빌드는 저장소의 데이터를 씁니다.
- 키 교체: 구글 콘솔에서 새 JSON 키 발급 → Vercel 환경변수 값 교체 → 이전 키 삭제 → 재배포.
