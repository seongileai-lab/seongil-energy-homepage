# 새 회사 홈페이지 세팅 가이드

이 저장소는 템플릿입니다. 다른 회사용으로 새로 세팅할 때 아래 순서대로 진행하세요.

## 1. 저장소 복제

GitHub에서 이 저장소 페이지 → **Use this template** → **Create a new repository** 로 새 저장소를 만듭니다.
(템플릿으로 표시되어 있지 않다면 Settings → General → "Template repository" 체크박스를 켜세요.)

## 2. Supabase 프로젝트 생성

1. [supabase.com](https://supabase.com)에서 새 프로젝트 생성 (리전: `ap-northeast-2` 서울 추천)
2. SQL 편집기에서 이 저장소의 `supabase/setup.sql` 내용을 그대로 실행
   - `site_content` 테이블 (전체 홈페이지 콘텐츠를 담는 JSONB 1행)
   - `media` 스토리지 버킷 (로고/이미지/동영상/첨부파일)
   - `contact_submissions` 테이블 (문의 폼 접수 내역)
3. Project Settings → API 에서 **Project URL**과 **anon public key** 복사

## 3. 관리자 계정 생성

Supabase 대시보드 → Authentication → Users → **Add user → Create new user**
- 이메일/비밀번호 입력
- **"Auto Confirm User" 체크** (이메일 인증 절차 생략, 즉시 로그인 가능)

## 4. 로컬 환경변수 설정

새 저장소를 클론한 뒤 루트에 `.env.local` 생성:

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-public-key>
```

`npm install && npm run dev` 로 로컬에서 확인.

## 5. Vercel 배포

1. Vercel 계정 설정 → Login Connections에서 GitHub 연결이 안 되어 있다면 먼저 연결
2. GitHub 저장소에 [Vercel GitHub App](https://github.com/apps/vercel) 설치 (새 저장소에 접근 권한 부여)
3. Vercel에서 새 프로젝트로 이 저장소 Import
4. Project Settings → Environment Variables 에 2번 단계의 두 값을 Production/Preview/Development 전부 등록
   - 복사-붙여넣기 오류를 피하려면 "Import .env" 기능으로 `.env.local` 파일을 통째로 업로드하는 걸 추천
5. 배포 후 `/admin` 경로에서 3번에서 만든 계정으로 로그인해 콘텐츠 입력 시작

## 6. 도메인 연결

- 구매한 도메인을 Vercel 프로젝트의 Domains에 직접 추가 (Cloudflare 등 프록시 서비스를 앞에 두지 말 것 — SSL/라우팅 충돌 가능)
- 레지스트라에서 Vercel이 안내하는 A/CNAME 레코드를 등록하거나, Vercel 네임서버로 위임

## 7. (선택) 문의 폼 → 구글 스프레드시트 + 이메일 알림

1. 원하는 스프레드시트에 `Name / Email / Phone / Message` 헤더로 시트를 만들어 둠
2. 확장 프로그램 → Apps Script 에 아래 코드 붙여넣기 (`RECIPIENT_EMAIL`을 실제 수신 메일 주소로 변경):

```javascript
var RECIPIENT_EMAIL = 'your-email@example.com';

function doPost(e) {
  var data = JSON.parse(e.postData.contents);

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.appendRow([data.name, data.email, data.phone, data.message]);

  MailApp.sendEmail({
    to: RECIPIENT_EMAIL,
    subject: '[홈페이지 문의] ' + data.name + '님의 문의',
    body: '이름: ' + data.name + '\n' +
          '이메일: ' + data.email + '\n' +
          '연락처: ' + (data.phone || '(입력 안 함)') + '\n\n' +
          '문의 내용:\n' + data.message,
    replyTo: data.email,
  });

  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. 배포 → 새 배포 → 웹 앱 → 액세스 권한 "모든 사용자" → 배포
4. 나온 웹 앱 URL(`.../exec`)을 어드민 "기타" 탭의 "문의 알림 웹훅 URL"에 입력 후 저장
5. (선택) 이메일 없이 스프레드시트 기록만 원하면 `MailApp.sendEmail(...)` 부분을 지우면 됨

## 콘텐츠 구조 참고

- 모든 텍스트/이미지/파일은 `/admin`에서 로그인 후 편집 — 코드 수정 불필요
- 회사마다 다른 것: Supabase 프로젝트, Vercel 프로젝트, 도메인, `.env.local` 값, 어드민 계정
- 회사마다 같은 것: 이 저장소의 코드 전체 (콘텐츠는 DB에 있으므로 코드는 그대로 재사용)
