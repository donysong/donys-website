/* Google(GA4) 국외 이전 고지 문구 — **한 곳**. 동의 배너(`components/Analytics.tsx`)와 방침 제7조 표(`components/legal/PrivacyKo.tsx`)가 같은 글자를 쓴다.
   「개인정보 보호법」 §28의8 ①1호 별도 동의: 받는 자·연락처 · 국가 · 시기와 방법 · 항목 · 목적·보유 · 거부 방법과 효과를 **동의받는 그 자리에서** 알린다 — 배너가 그 자리이고
   방침이 같은 말을 해야 하므로(둘이 갈라지면 동의 화면과 방침이 서로 다른 항목을 말한다) 문구를 갈라 쓰지 않는다.
   값 출처 = Google 의 한국 거주자 안내(policies.google.com/privacy/additional, 2026-10-20 확인) · 보유 14개월 = GA4 속성 설정(ANALYTICS_PLAN §17).
   🔴 이 파일을 고치면 방침 시행일(`ANALYTICS_EFFECTIVE`) 전 고지가 달라진 것이다 — 항목이 늘면 새 고지 기간을 다시 센다.
   🔴 다른 광고·측정 회사를 켜는 날(`META_PIXEL_ON`) 이 표에 그 회사의 이전 행을 더해야 한다 — 빠지면 `analytics.test` 가 빨개진다. */

/** 이전 항목 — GA4 가 실제로 받는 것(설계서 §12 ④). 이름·이메일·입력값은 안 보낸다는 문장은 따로 붙는다. */
export const GA_ITEMS = {
  en: 'Pages you visit and the page you came from, buttons you press (buy, download, email, form submit), sections you read, that a purchase was completed (amount and checkout number), time of visit, approximate location (country, city), device and browser details, IP address, a cookie identifier (_ga)',
  ko: '방문한 페이지와 유입 경로, 누른 버튼(구매·다운로드·메일·양식 제출), 읽은 섹션, 구매 완료 사실(금액·결제 번호), 접속 시각, 대략적인 위치(국가·도시), 기기·브라우저 정보, IP 주소, 쿠키 식별자(_ga)',
} as const;

export const ROWS = {
  en: [
    ['Recipient', 'Google LLC · 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA · support.google.com/policies?p=privpol_privts'],
    ['Country', 'United States (and the countries where Google’s data centers are)'],
    ['Data', `${GA_ITEMS.en}. Your name, email address and anything you type are not sent.`],
    ['When and how', 'While you browse after you say yes, over an encrypted connection, as the data is collected'],
    ['Purpose', 'Visit statistics to improve the site'],
    ['How long', 'Google keeps event data for 14 months; the cookie lasts up to 2 years'],
    ['If you refuse', 'Press Reject, or change it any time from “Cookie settings” at the bottom of every page. Nothing is transferred and the site works the same.'],
  ],
  ko: [
    ['이전받는 자', 'Google LLC · 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA · googlekrsupport@google.com'],
    ['이전 국가', '미국(및 Google 데이터 센터가 있는 나라)'],
    ['이전 항목', `${GA_ITEMS.ko}. 이름·이메일 주소·입력하신 내용은 보내지 않습니다.`],
    ['이전 시기와 방법', '동의하신 뒤 방문하시는 동안, 수집과 동시에 암호화된 통신으로 전송'],
    ['이용 목적', '사이트 개선을 위한 방문 통계 분석'],
    ['보유·이용 기간', 'Google 이벤트 데이터 14개월 · 쿠키 최대 2년'],
    ['거부 방법과 효과', '‘거부’를 누르시거나 모든 페이지 하단의 ‘쿠키 설정’에서 언제든 바꾸실 수 있습니다. 거부하시면 아무것도 이전되지 않고 서비스 이용에는 영향이 없습니다.'],
  ],
} as const;
