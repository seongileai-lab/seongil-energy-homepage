# 성일에너지 홈페이지 (seongileng.kr)

Next.js + Vercel. 이미지·PDF·배너·제품 이름은 구글 드라이브 `[연결] 홈페이지` 폴더에서 가져옵니다.

- **드라이브 연동·폴더 규칙·반영 절차:** [docs/DRIVE-SYNC.md](docs/DRIVE-SYNC.md) (AI·사람 공용)
- 로컬 실행: `npm run dev` → http://localhost:3000
- 드라이브 반영: 빌드할 때 Vercel 이 드라이브를 직접 읽음 (재배포만 요청하면 됨, 설정: [docs/AUTO-SYNC.md](docs/AUTO-SYNC.md)). 내 컴퓨터에서는 `npm run sync:drive`
- 배포: `main`에 푸시하면 Vercel이 자동 배포 (사용자가 요청했을 때만)
- 문구 수정 위치: 제품 `src/lib/product-texts.ts`, 회사·홈 `src/lib/site.ts`, 약관 `src/lib/policies.ts`, 뉴스 `src/lib/posts.ts`
