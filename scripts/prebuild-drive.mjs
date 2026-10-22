// 빌드 직전에 자동 실행(package.json 의 prebuild): 드라이브 폴더를 읽어 src/data/drive.json 과 public/drive 를 새로 만든다.
// - GOOGLE_SERVICE_ACCOUNT_JSON 이 없으면(로컬 개발 등) 건너뛰고 저장소에 있는 데이터를 그대로 쓴다.
// - 키가 있는데 실패하면 빌드를 실패시켜 운영 사이트를 그대로 두고, 로그에 이유를 남긴다. (조용히 옛 데이터로 배포되지 않게)
import { spawnSync } from 'node:child_process';

if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
  console.log('[drive] GOOGLE_SERVICE_ACCOUNT_JSON 이 없어 드라이브 동기화를 건너뜁니다 (저장소의 데이터 사용).');
  process.exit(0);
}

const cacheDir = process.env.DRIVE_CACHE_DIR || '.drive-cache';
const run = (script, env = {}) => spawnSync(process.execPath, [script], { stdio: 'inherit', env: { ...process.env, ...env } });

console.log('[drive] 드라이브 폴더를 읽는 중...');
let r = run('scripts/fetch-drive.mjs', { DRIVE_CACHE_DIR: cacheDir });
if (r.status !== 0) {
  console.error('[drive] 드라이브를 읽지 못해 빌드를 중단합니다. (docs/AUTO-SYNC.md 의 "문제 해결" 참고)');
  process.exit(1);
}
r = run('scripts/sync-drive.mjs', { DRIVE_DIR: cacheDir });
if (r.status !== 0) {
  console.error('[drive] 사이트 데이터 생성에 실패해 빌드를 중단합니다.');
  process.exit(1);
}
console.log('[drive] 드라이브 반영 완료');
