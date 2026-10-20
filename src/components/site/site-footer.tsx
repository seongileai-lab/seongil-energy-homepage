import Link from 'next/link';
import { company } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <strong>{company.name}</strong>
        <div>{company.address} · {company.phone}</div>
        <div>대표이사 {company.ceo} · 사업자등록번호 {company.bizNo}</div>
        <div>
          <Link href="/privacy">개인정보처리방침</Link> · <Link href="/terms">이용약관</Link>
        </div>
        <div className="foot-note">일부 제품 이미지는 홍보용 콘셉트이며 기술·출력 성능과 설치 조건은 검증 및 인허가에 따라 달라집니다.</div>
      </div>
    </footer>
  );
}
