// 구글 드라이브의 "[연결] 홈페이지" 폴더를 읽어 사이트 데이터(src/data/drive.json)와 이미지(public/drive)를 만듭니다.
// 사용: npm run sync:drive   (다른 위치를 쓰려면 DRIVE_DIR 환경변수로 지정)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.env.DRIVE_DIR || 'G:/내 드라이브/[연결] 홈페이지';
const OUT_PUBLIC = path.resolve('public/drive');
const OUT_JSON = path.resolve('src/data/drive.json');
const IMG = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);

if (!fs.existsSync(ROOT)) {
  console.error(`드라이브 폴더를 찾을 수 없습니다: ${ROOT}`);
  process.exit(1);
}

const IGNORE = (n) => n.startsWith('.') || n.startsWith('~') || n.toLowerCase() === 'desktop.ini' || /\.(gdoc|gsheet|gslides|gform|tmp)$/i.test(n);
const list = (dir) => fs.readdirSync(dir, { withFileTypes: true }).filter((e) => !IGNORE(e.name));
const dirs = (dir) => list(dir).filter((e) => e.isDirectory()).map((e) => e.name);
const files = (dir) => (fs.existsSync(dir) ? list(dir).filter((e) => e.isFile()).map((e) => e.name) : []);

// "01_제목", "3.제목" → { order: 1, title: '제목' } / 숫자가 없으면 order=null
function parseName(name) {
  const m = /^(\d+)\s*[._-]\s*(.+)$/.exec(name);
  return m ? { order: Number(m[1]), title: m[2].trim() } : { order: null, title: name.trim() };
}
const byOrder = (a, b) => (a.order ?? 1e6) - (b.order ?? 1e6) || a.title.localeCompare(b.title, 'ko');
const isImg = (f) => IMG.has(path.extname(f).toLowerCase());
const trailingNumber = (f) => {
  const m = /(\d+)\.[^.]+$/.exec(f);
  return m ? Number(m[1]) : 1e6;
};
const sortDetail = (arr) => [...arr].sort((a, b) => trailingNumber(a) - trailingNumber(b) || a.localeCompare(b, 'ko'));

fs.rmSync(OUT_PUBLIC, { recursive: true, force: true });
fs.mkdirSync(OUT_PUBLIC, { recursive: true });

// 파일을 public/drive 로 복사하고 웹 주소(?v=내용해시)를 돌려준다. 같은 파일이 바뀌면 주소도 바뀌어 캐시가 갱신된다.
function publish(srcFile, rel) {
  const dest = path.join(OUT_PUBLIC, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(srcFile, dest);
  const hash = crypto.createHash('md5').update(fs.readFileSync(srcFile)).digest('hex').slice(0, 8);
  return `/drive/${rel.replaceAll('\\', '/')}?v=${hash}`;
}

const top = {};
for (const d of dirs(ROOT)) {
  const { order, title } = parseName(d);
  if (order !== null) top[order] = { dir: path.join(ROOT, d), title };
}

// 0. 배너 ------------------------------------------------------------
const banners = [];
if (top[0]) {
  const items = dirs(top[0].dir).map((d) => ({ dir: d, ...parseName(d) })).sort(byOrder);
  items.forEach((it, i) => {
    const folder = path.join(top[0].dir, it.dir);
    const image = files(folder).filter(isImg).sort((a, b) => a.localeCompare(b, 'ko'))[0];
    if (!image) {
      console.warn(`[배너] 이미지가 없어 건너뜁니다: ${it.dir}`);
      return;
    }
    const linkFile = files(folder).find((f) => /^링크\.txt$/i.test(f));
    const link = linkFile ? fs.readFileSync(path.join(folder, linkFile), 'utf8').replace(/^\uFEFF/, '').trim().split(/\r?\n/)[0].trim() : '';
    banners.push({ title: it.title, src: publish(path.join(folder, image), `banner/${i + 1}${path.extname(image).toLowerCase()}`), link });
  });
}

// 1,2,4,5. 화면별 사진 ---------------------------------------------------
function pageImages(order, key) {
  if (!top[order]) return [];
  return files(top[order].dir)
    .filter(isImg)
    .sort((a, b) => a.localeCompare(b, 'ko'))
    .map((f, i) => publish(path.join(top[order].dir, f), `${key}/${i + 1}${path.extname(f).toLowerCase()}`));
}
const pages = { about: pageImages(1, 'about'), tech: pageImages(2, 'tech'), esg: pageImages(4, 'esg'), news: pageImages(5, 'news') };

// 3. 제품·솔루션 -----------------------------------------------------------
const categories = [];
if (top[3]) {
  const cats = dirs(top[3].dir).map((d) => ({ dir: d, ...parseName(d) })).sort(byOrder);
  cats.forEach((cat, ci) => {
    const catDir = path.join(top[3].dir, cat.dir);
    const prods = dirs(catDir).map((d) => ({ dir: d, ...parseName(d) })).sort(byOrder);
    const products = prods.map((p, pi) => {
      const pdir = path.join(catDir, p.dir);
      const id = `c${ci + 1}p${pi + 1}`;
      const thumbFile = files(path.join(pdir, '썸네일')).filter(isImg).sort((a, b) => a.localeCompare(b, 'ko'))[0];
      const thumb = thumbFile ? publish(path.join(pdir, '썸네일', thumbFile), `products/${id}/thumb${path.extname(thumbFile).toLowerCase()}`) : null;
      const gallery = sortDetail(files(path.join(pdir, '상세페이지')).filter(isImg)).map((f, i) =>
        publish(path.join(pdir, '상세페이지', f), `products/${id}/detail-${i + 1}${path.extname(f).toLowerCase()}`),
      );
      const pdfs = files(path.join(pdir, '첨부파일'))
        .sort((a, b) => a.localeCompare(b, 'ko'))
        .map((f, i) => ({ name: f, src: publish(path.join(pdir, '첨부파일', f), `products/${id}/file-${i + 1}${path.extname(f).toLowerCase()}`) }));
      if (!thumb && gallery.length === 0) console.warn(`[제품] 썸네일/상세 이미지가 없습니다: ${cat.title} / ${p.title}`);
      return { name: p.title, order: p.order, thumb, gallery, pdfs };
    });
    categories.push({ name: cat.title, order: cat.order, products });
  });
}

fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify({ banners, pages, categories }, null, 2) + '\n', 'utf8');

const nProducts = categories.reduce((n, c) => n + c.products.length, 0);
console.log(`동기화 완료: 배너 ${banners.length}개, 카테고리 ${categories.length}개, 제품 ${nProducts}개`);
