/* 셸 사전 — 세 페이지(`/` · `/ae` · `/ae/docs`)가 같이 쓴다. 페이지 고유 문장은 여기 넣지 마라.
   🔴 법·연락처 줄은 **배관이 걸린 자리**다(proto4 정적 HTML 은 이 넷을 href 없는 텍스트로 잃어버렸다).
   지우면 결제 페이지가 약관 없이 나간다. */
import type { Dict } from './types';

const SHARED: Dict = {
  en: {
    's.plate': 'Plate',
    's.plate.cover': 'Cover',
    's.buy': 'Buy',
    's.buy.price': 'Buy — {price}',
    's.brand': 'You Name It',
    's.product': 'You Name It AE Plugin',
    's.toBrand': 'What we are',
    's.toProduct': 'AE Plugin',
    's.docs': 'Docs',
    's.ft.made': 'What we made',
    's.ft.support': 'Support',
    's.ft.brand': 'Brand',
    's.ft.legal': 'Legal',
    's.ft.docs': 'Docs — {scripts} tools · release log',
    's.ft.faq': 'Common questions',
    's.ft.specs': 'Specs · install',
    's.ft.notes': 'Release notes',
    's.ft.contact': 'support@younameit.works',
    's.ft.terms': 'Terms',
    's.ft.privacy': 'Privacy',
    's.ft.refund': 'Refunds',
    's.copyright': '© 2026 You Name It',
    's.legal.line': 'Sold by Polar as merchant of record. Prices exclude tax.',
  },
  ko: {
    's.plate': '판',
    's.plate.cover': '표지',
    's.buy': '구매',
    's.buy.price': '구매 — {price}',
    's.brand': 'You Name It',
    's.product': 'You Name It AE Plugin',
    's.toBrand': '우리는 무엇인가',
    's.toProduct': 'AE Plugin',
    's.docs': 'Docs',
    's.ft.made': '만든 것',
    's.ft.support': '지원',
    's.ft.brand': '브랜드',
    's.ft.legal': '법',
    's.ft.docs': 'Docs — 툴 {scripts}종 · 업데이트 로그',
    's.ft.faq': '자주 묻는 것',
    's.ft.specs': '사양 · 설치',
    's.ft.notes': '업데이트 노트',
    's.ft.contact': 'support@younameit.works',
    's.ft.terms': '이용약관',
    's.ft.privacy': '개인정보',
    's.ft.refund': '환불',
    's.copyright': '© 2026 You Name It',
    's.legal.line': '판매는 Polar 가 대행합니다(merchant of record). 표시 가격은 세금 별도입니다.',
  },
};

export default SHARED;
