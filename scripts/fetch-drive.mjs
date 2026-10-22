// 구글 드라이브 "[연결] 홈페이지" 폴더를 Drive API(서비스 계정)로 읽어 .drive-cache 에 내려받는다.
// 보통 직접 실행하지 않고 scripts/prebuild-drive.mjs (빌드 직전 자동 실행)가 부른다.
//
// 필요한 환경변수
//   GOOGLE_SERVICE_ACCOUNT_JSON  서비스 계정 키(JSON 전체 내용)
//   DRIVE_ROOT_ID                [연결] 홈페이지 폴더 ID (기본값: 아래 상수)
// 테스트용(선택): DRIVE_API_BASE, GOOGLE_TOKEN_URL, DRIVE_CACHE_DIR
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT_ID = process.env.DRIVE_ROOT_ID || '1_0bK3nPQz33b-lw65QMTJHJO0xWgUw9M';
const API = process.env.DRIVE_API_BASE || 'https://www.googleapis.com/drive/v3';
const OUT_DIR = path.resolve(process.env.DRIVE_CACHE_DIR || '.drive-cache');
const FOLDER = 'application/vnd.google-apps.folder';

const b64url = (buf) => Buffer.from(buf).toString('base64url');

async function getToken() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON 환경변수가 없습니다.');
  let sa;
  try {
    sa = JSON.parse(raw);
  } catch {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON 이 올바른 JSON 이 아닙니다. 키 파일의 내용 전체를 붙여 넣었는지 확인하세요.');
  }
  const tokenUrl = process.env.GOOGLE_TOKEN_URL || sa.token_uri || 'https://oauth2.googleapis.com/token';
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(
    JSON.stringify({ iss: sa.client_email, scope: 'https://www.googleapis.com/auth/drive.readonly', aud: tokenUrl, iat: now, exp: now + 3600 }),
  );
  const signature = crypto.sign('RSA-SHA256', Buffer.from(`${header}.${claim}`), sa.private_key);
  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${header}.${claim}.${b64url(signature)}` }),
  });
  if (!res.ok) throw new Error(`토큰 발급 실패 (${res.status}): ${await res.text()}`);
  return (await res.json()).access_token;
}

async function api(token, url) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Drive API 오류 (${res.status}) ${url.split('?')[0]}: ${await res.text()}`);
  return res;
}

async function listChildren(token, folderId) {
  const out = [];
  let pageToken = '';
  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType)',
      pageSize: '1000',
      supportsAllDrives: 'true',
      includeItemsFromAllDrives: 'true',
    });
    if (pageToken) params.set('pageToken', pageToken);
    const data = await (await api(token, `${API}/files?${params}`)).json();
    out.push(...(data.files || []));
    pageToken = data.nextPageToken || '';
  } while (pageToken);
  return out;
}

const safeName = (n) => n.normalize('NFC').replaceAll('/', '_').replaceAll('\\', '_');

// 폴더 전체를 훑어 { rel, id, folder } 목록을 만든다 (구글 문서·시트 등 변환 파일은 제외)
async function walk(token) {
  const items = [];
  async function visit(id, rel) {
    for (const f of await listChildren(token, id)) {
      const childRel = rel ? `${rel}/${safeName(f.name)}` : safeName(f.name);
      if (f.mimeType === FOLDER) {
        items.push({ rel: childRel, id: f.id, folder: true });
        await visit(f.id, childRel);
      } else if (!f.mimeType.startsWith('application/vnd.google-apps.')) {
        items.push({ rel: childRel, id: f.id, folder: false });
      }
    }
  }
  await visit(ROOT_ID, '');
  return items;
}

const token = await getToken();
const items = await walk(token);
if (!items.some((i) => i.folder)) {
  throw new Error('폴더 안에 항목이 없습니다. 폴더 ID(DRIVE_ROOT_ID)와, 서비스 계정에 폴더가 공유됐는지 확인하세요.');
}

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });
let n = 0;
for (const it of items) {
  const dest = path.join(OUT_DIR, it.rel);
  if (it.folder) {
    fs.mkdirSync(dest, { recursive: true });
    continue;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const res = await api(token, `${API}/files/${it.id}?alt=media&supportsAllDrives=true`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  n += 1;
}
console.log(`드라이브에서 파일 ${n}개를 ${OUT_DIR} 에 내려받았습니다.`);
