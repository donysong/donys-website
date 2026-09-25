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
    's.ft.docs': 'Docs — all {scripts} tools',
    's.ft.faq': 'Common questions',
    's.ft.specs': 'Install · specs',
    's.ft.notes': 'Release notes',
    's.ft.contact': 'support@younameit.works',
    's.ft.terms': 'Terms',
    's.ft.privacy': 'Privacy',
    's.ft.refund': 'Refunds',
    /* 법 3장이 영문 전용인 이유를 국문 독자에게만 알린다 — 영문 독자에게 "영문이다" 는 정보 0 이라 비워 둔다
       (빈 값 = 푸터가 줄을 안 그린다). 오너 판정 2026-09-19 *"국문은 필요 없을듯"* 의 이유가 유저에게 보이게. */
    's.ft.legal.lang': '',
    's.copyright': '© 2026 You Name It',
    /* 🔴 "세금 별도" 라고 단정하지 마라 — Polar 가 나라마다 다르게 붙인다(한국은 포함 표시, 미국·캐나다·인도는 별도). */
    's.legal.line': 'Sold by Polar as merchant of record. Tax is calculated at checkout.',
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
    's.ft.docs': 'Docs — 툴 {scripts}종 전부',
    's.ft.faq': '자주 묻는 것',
    's.ft.specs': '설치 · 사양',
    's.ft.notes': '업데이트 노트',
    's.ft.contact': 'support@younameit.works',
    's.ft.terms': '이용약관',
    's.ft.privacy': '개인정보',
    's.ft.refund': '환불',
    's.ft.legal.lang': '약관은 영문만 제공합니다.',
    's.copyright': '© 2026 You Name It',
    's.legal.line': '판매는 Polar 가 대행합니다(merchant of record). 세금은 결제 화면에서 계산됩니다.',
  },
};

export default SHARED;
