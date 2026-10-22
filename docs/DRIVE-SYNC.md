# 구글 드라이브 연동 가이드 (AI·사람 공용)

성일에너지 홈페이지(seongileng.kr)의 **이미지·PDF·배너·제품 이름**은 구글 드라이브 폴더 `[연결] 홈페이지`에서 가져옵니다.
사용자가 "연결 폴더 반영해줘", "배너 바꿔줘", "제품 추가해줘" 같이 요청하면 이 문서대로 확인하고 세팅하세요.
**이 문서가 유일한 원본입니다.** 드라이브 폴더의 `00_AI_작업가이드.md`는 내용 없이 이 문서의 위치만 알려주는 안내 파일입니다.
- 저장소: https://github.com/seongileai-lab/seongil-energy-homepage  → 이 파일은 `docs/DRIVE-SYNC.md`
- 다른 컴퓨터에서 작업하거나, 코드 실행 없이 커넥터(드라이브·Vercel·Supabase)만 연결된 환경(ChatGPT 등)이라면 **7번**을 보세요.

---

## 1. 작업 전에 반드시 확인

| 항목 | 값 |
|---|---|
| 드라이브 계정 | `seongil.e.ai@gmail.com` (성일에너지). **`gpfls9859@gmail.com`은 개인 계정이라 아님** |
| Vercel·GitHub 계정 | 같은 성일에너지 계정 (`seongileai-4534` / `seongileai-lab`), 저장소 `seongil-energy-homepage` |
| 로컬 경로 | `G:\내 드라이브\[연결] 홈페이지` (Google Drive for Desktop, 같은 계정) |
| 드라이브 폴더 ID | `1_0bK3nPQz33b-lw65QMTJHJO0xWgUw9M` |
| Vercel 프로젝트 | `prj_b9AaltsR6G1tKx23w3w1Iy12lnC5` / 팀 `team_EijuV7qGBnLNAsiyzR7v1DyK` |

- **자가점검(필수)**: 커넥터(드라이브·Vercel·Supabase)를 쓰는 작업은 시작 전에 계정을 직접 조회해 확인하고 결과를 사용자에게 보고합니다. 점검 항목과 통과 조건은 드라이브 `00_AI_작업가이드.md` 1단계와 같습니다 (드라이브: 폴더 ID로 조회 → 소유자 `seongil.e.ai@gmail.com`, Vercel: 이메일·팀 `seongileai-4534`·프로젝트 도메인 `seongileng.kr`, Supabase: 프로젝트 `znnjmxfrnjbdnwzahyce`). 하나라도 다르거나 확인할 수 없으면 중단합니다. 개인 계정(`gpfls9859@gmail.com`)에 연결돼 있으면 틀린 계정입니다. (다른 계정이라도 이 폴더가 **편집 권한으로 공유**돼 있으면 작업 가능 → 7번)
- 기존 `홈페이지`, `홈페이지 자료` 폴더는 **참고용 원본**이며 사이트와 연결되지 않습니다. 건드리지 마세요.

## 2. 폴더 규칙

폴더 이름 앞 숫자 = 홈페이지의 메뉴·화면 순서입니다.

```
[연결] 홈페이지
 ├ 0.배너                         홈 맨 위 큰 배너 (5초마다 자동 전환)
 │   └ 01_제목 / 02_제목 …         폴더 1개 = 배너 1개
 │        ├ 이미지 1장            배너 사진 (권장 2:1, 예 2400x1200)
 │        └ 링크.txt (선택)       눌렀을 때 이동할 곳
 ├ 1.회사소개                      홈 회사소개 영역 배경 사진
 ├ 2.핵심기술                      (현재 사이트에서 쓰지 않음)
 ├ 3.제품·솔루션
 │   └ 01_풍력발전기 / 02_기술개발   카테고리 폴더 (이름 = 화면에 표시되는 카테고리 이름)
 │        └ 제품 폴더              (이름 = 화면에 표시되는 제품 이름)
 │             ├ 썸네일            이미지 1장 = 홈·목록의 대표 이미지
 │             ├ 상세페이지        이미지를 "제품이름-1", "제품이름-2" … 순서대로
 │             └ 첨부파일          PDF → 상세페이지에 "소개서 PDF 받기" 버튼
 ├ 4.ESG·비전                      홈 ESG·비전 영역 배경 사진
 └ 5.뉴스·인사이트                 (현재 사이트에서 쓰지 않음. 글은 src/lib/posts.ts)
```

### 이름·순서
- 숫자 접두어: `01_`, `1.`, `2-` 모두 인식하고, 화면에는 접두어를 뺀 이름이 나옵니다. 번호가 없으면 기존 순서를 유지하고 새 항목은 뒤에 붙습니다.
- 상세페이지 이미지는 **파일 이름 끝의 숫자 순서**로 위에서부터 나열됩니다 (`…-1`, `…-2`, `…-10` 은 숫자 비교).
- 썸네일 폴더에 여러 장이면 이름순 첫 장만 씁니다. 상세페이지가 비어 있으면 썸네일을 상세 이미지로 씁니다.
- 지원 이미지: png, jpg, jpeg, webp, gif, avif. 첨부파일은 어떤 형식이든 받기 버튼으로 나옵니다 (PDF 권장).
- 구글 문서·시트·슬라이드(`.gdoc` 등), `desktop.ini`, `~`·`.`로 시작하는 파일은 무시됩니다.

### 배너 링크
1. `링크.txt`가 있으면 첫 줄을 사용합니다.
   - 제품 이름 그대로 → 그 제품 상세 (예: `에너지 고속도로 풍력 발전기`)
   - `/`로 시작 → 사이트 안 주소 (예: `/contact`), `https://…` → 외부 주소
2. 없으면 **배너 폴더 제목이 제품 이름과 같을 때 자동 연결**됩니다. (보통 링크.txt가 필요 없음)
3. 둘 다 아니면 눌러도 이동하지 않습니다.

### 텍스트 파일 주의
`링크.txt` 같은 텍스트는 반드시 **순수 .txt**여야 합니다. 드라이브에 새로 만들 때 구글 문서로 변환되면 읽을 수 없습니다 (커넥터 `create_file` 사용 시 `disableConversionToGoogleType: true`, `contentMimeType: text/plain`).

## 3-0. 즉시 반영 (빌드 때 드라이브 읽기 — 설정돼 있다면 이것만으로 끝)

Vercel 환경변수 `GOOGLE_SERVICE_ACCOUNT_JSON` 이 설정돼 있으면, **Vercel 이 빌드할 때마다 드라이브 폴더를 직접 읽어** 사이트를 만듭니다 (원리·설정: [AUTO-SYNC.md](AUTO-SYNC.md)).
따라서 드라이브를 고친 뒤 **Vercel 재배포를 요청하면 약 2~3분 안에 반영**됩니다. 코드 푸시도, 명령 실행도 필요 없습니다.

- 재배포 방법(커넥터): AUTO-SYNC.md 의 "재배포 요청 방법" (`list_deployments` → `create_deployment`(deploymentId + withLatestCommit) → `get_deployment` 로 READY 확인).
- 설정 여부 확인: 최근 Vercel 빌드 로그에 `[drive] 드라이브 반영 완료`가 있는지. `건너뜁니다`라면 아직 키가 없는 것이니 아래 3번 수동 절차를 쓰세요.
- 새 제품의 **설명 문구**(`product-texts.ts`)는 자동으로 만들어지지 않습니다. 이미지만 먼저 나오므로 문구는 코드 작업 환경에서 따로 추가합니다.
- 드라이브의 잘못된 파일도 다음 배포 때 그대로 반영됩니다. 수정 전에 사용자에게 무엇을 바꿀지 확인하세요.

## 3. 반영 절차 ("연결 폴더 반영해줘") — 수동

저장소 루트(`C:\homepage`)에서:

1. **계정 확인** (위 1번).
2. **동기화**: `npm run sync:drive`
   - 드라이브 위치가 다르면 `DRIVE_DIR="D:\...\[연결] 홈페이지"` 환경변수로 지정.
   - 결과: `src/data/drive.json`(데이터)과 `public/drive/`(이미지·PDF, 매번 새로 만들어짐) 갱신. 파일 주소 뒤 `?v=해시`로 교체된 파일은 캐시가 자동 갱신됩니다.
   - 콘솔의 `[배너]`/`[제품]` 경고(이미지 없음 등)를 사용자에게 알립니다. Windows 콘솔에서 한글이 깨져 보여도 파일은 정상입니다.
3. **새 제품이 생겼다면**: 이미지만 먼저 나옵니다. 설명 문구가 필요하면 `src/lib/product-texts.ts`에 **폴더 이름과 같은 `title`**로 항목을 추가합니다 (`slug`는 주소에 쓰는 영문, 한 번 정하면 바꾸지 않기). 문구가 없으면 slug는 `p-해시`로 자동 생성됩니다. 사실이 아닌 성능·수치를 지어내지 말고 사용자에게 받습니다.
4. **검증**: `npx tsc --noEmit`, `npx eslint src scripts`, `npm run build`. 로컬 확인은 `npm run dev` (http://localhost:3000).
5. **커밋·배포**는 **사용자가 명시적으로 요청했을 때만**:
   - `git add -A src public scripts package.json docs` (`mockup/`, `.claude/launch.json`은 제외)
   - 커밋 후 `git push origin main` → Vercel이 자동으로 운영 배포.
   - 배포 확인: Vercel 배포 상태가 `READY`인지, `https://seongileng.kr`에서 배너·메뉴·해당 제품 페이지가 열리는지.

## 4. 요청별 처리 요약

| 요청 | 처리 |
|---|---|
| 배너 사진 교체 | `0.배너/NN_제목/` 안 이미지 교체 → 동기화 |
| 배너 추가/삭제/순서 | 배너 폴더 추가·삭제·번호 변경 → 동기화 |
| 제품 사진·상세 이미지 교체 | 해당 제품 폴더의 썸네일/상세페이지 파일 교체 → 동기화 |
| PDF 추가/삭제 | 제품 `첨부파일` 폴더 → 동기화 (PDF가 없으면 버튼이 사라짐) |
| 제품·카테고리 이름 변경 | 폴더 이름 변경 → 동기화. 제품 이름을 바꾸면 `product-texts.ts`의 `title`도 같이 바꿔야 문구가 이어짐 |
| 새 제품/카테고리 | 폴더 생성 → 동기화 (문구는 3번) |
| 회사소개·ESG 배경 사진 | `1.회사소개`, `4.ESG·비전` 폴더의 사진(이름순 첫 장) |
| 문구 수정 | 드라이브가 아니라 코드: 제품 `src/lib/product-texts.ts`, 회사·홈 문구 `src/lib/site.ts`, 약관 `src/lib/policies.ts`, 뉴스 `src/lib/posts.ts` |

## 5. 코드 구조 (참고)

- `scripts/sync-drive.mjs` — 드라이브 폴더 → `src/data/drive.json` + `public/drive/`
- `scripts/prebuild-drive.mjs` + `scripts/fetch-drive.mjs` — 빌드 직전(`npm run build` 의 prebuild)에 Drive API(서비스 계정)로 폴더를 내려받아 위 스크립트로 데이터 생성 (키가 없으면 건너뜀)
- `src/lib/products.ts` — drive.json + `product-texts.ts`를 합쳐 제품·카테고리·배너를 만듦 (카테고리 `풍력발전기`→`wind`, `기술개발`→`rnd`, 그 외는 `c-해시`)
- `src/components/site/hero-slider.tsx` — 배너 슬라이드 · `product-carousel.tsx` — 카테고리 가로 목록
- 페이지: `/`, `/about`, `/technology`, `/solutions`, `/esg`, `/news`, `/category/[cat]`, `/product/[slug]`, `/contact`
- 문의 폼은 Supabase `contact_submissions` 테이블에 저장 (`src/app/(site)/contact/actions.ts`)

## 6. 지켜야 할 것

- 드라이브 파일을 **영구 삭제하지 않습니다**. 정리가 필요하면 휴지통으로 옮기고 사용자에게 알립니다.
- 사용자가 요청하지 않은 배포·푸시를 하지 않습니다. 운영 DB(Supabase)와 도메인 설정도 요청 없이 바꾸지 않습니다.
- 사진 속 글씨가 잘리지 않게, 배너는 중요한 글자를 가장자리에서 10% 안쪽에 두도록 안내합니다. 배너 권장은 2:1(2400x1200 이상), 파일은 webp 300~400KB 이하.
- 큰 PDF(수십 MB)는 저장소와 배포 용량을 늘리므로 20MB를 넘으면 사용자에게 알립니다.

## 7. 다른 컴퓨터·커넥터만 있는 환경에서 작업할 때

### A. 코드 실행이 되는 환경 (다른 컴퓨터의 Claude Code 등)
1. 위 GitHub 저장소를 클론하고 `npm install`. (GitHub 쓰기 권한이 있어야 푸시·배포 가능)
2. 저장소 루트에 `.env.local` 필요 (git에 올라가지 않음). 문의 폼이 쓰는 Supabase 값만 있으면 됩니다. 값이 없으면 사용자에게 요청하고, 키를 문서·커밋·채팅에 노출하지 마세요.
   ```
   NEXT_PUBLIC_SUPABASE_URL=...        # 성일에너지 Supabase 프로젝트 URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...   # 해당 프로젝트의 anon(public) key
   ```
3. 드라이브 폴더가 로컬 경로로 보여야 합니다 (Google Drive for Desktop). 경로가 다르면 `DRIVE_DIR`로 지정:
   - PowerShell: `$env:DRIVE_DIR="D:\...\[연결] 홈페이지"; npm run sync:drive`
   - bash: `DRIVE_DIR="/d/.../[연결] 홈페이지" npm run sync:drive`
   - 다른 구글 계정이면 성일에너지 계정이 그 계정에 이 폴더를 **편집 권한으로 공유**해야 하고, 공유받은 폴더는 "내 드라이브에 바로가기 추가" 후 경로를 확인하세요.
4. `main`에 푸시하면 Vercel이 자동 배포합니다.

### B. 커넥터만 있는 환경 (ChatGPT 등: 드라이브·Vercel·Supabase 커넥터)
이런 환경에서는 **명령 실행·저장소 푸시를 할 수 없어** `npm run sync:drive`와 배포를 직접 못 합니다. 대신 **즉시 반영(3-0)이 설정돼 있으면 드라이브를 정리한 뒤 Vercel 커넥터로 재배포를 요청해 2~3분 안에 사이트에 반영**할 수 있습니다. 할 수 있는 일:
- 계정 확인(드라이브 폴더 소유자, Vercel 팀·프로젝트, Supabase 프로젝트 ID는 드라이브 `00_AI_작업가이드.md` 표 참고)
- 드라이브 폴더 정리: 2번 규칙에 맞게 폴더·파일 만들기/이름 바꾸기/휴지통 이동, 텍스트는 순수 .txt
- Vercel 배포 상태·로그 확인 (소스 파일은 커넥터로 읽을 수 없음), Supabase 문의 접수 확인
- 드라이브 정리 후 **Vercel 재배포 요청**(AUTO-SYNC.md "재배포 요청 방법")까지 직접 수행하고 READY 를 확인한 뒤 사용자에게 알림. (즉시 반영이 설정돼 있지 않다면 "저장소 작업이 가능한 환경에서 '연결 폴더 반영해줘'를 요청하세요"라고 안내)
- 이 문서는 GitHub 저장소에 있으므로, **GitHub 접근(커넥터 또는 공개 열람)이 없으면 이 문서를 읽을 수 없습니다.** 그 경우 추측하지 말고 사용자에게 알립니다.
