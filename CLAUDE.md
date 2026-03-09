# GlobalGroup Korea - 개발일지

## 프로젝트 개요
- **프로젝트명**: GlobalGroup Korea 홈페이지
- **기술스택**: Next.js 14, React 18, TypeScript, next-intl (i18n), CSS Modules
- **지원언어**: 한국어(ko), 영어(en)
- **사업영역**: 원유(Crude Oil), 구리(Copper), 석영(Quartz), 금(Gold) 거래

## 프로젝트 구조
```
GlobalGroup/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── about/
│   │   │   │   ├── page.tsx
│   │   │   │   └── page.module.css
│   │   │   ├── business/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── page.module.css
│   │   │   │   └── [slug]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── page.module.css
│   │   │   ├── contact/
│   │   │       ├── page.tsx
│   │   │       └── page.module.css
│   │   │   ├── market/
│   │   │       ├── page.tsx
│   │   │       └── page.module.css
│   │   │   ├── news/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── NewsContent.tsx
│   │   │   │   └── page.module.css
│   │   │   └── partners/
│   │   │       ├── page.tsx
│   │   │       └── page.module.css
│   │   └── globals.css
│   └── components/
│       ├── Header.tsx + Header.module.css
│       ├── Hero.tsx + Hero.module.css
│       ├── GlobalNetwork.tsx + GlobalNetwork.module.css
│       ├── Business.tsx + Business.module.css
│       ├── Leadership.tsx + Leadership.module.css
│       ├── Stats.tsx + Stats.module.css
│       ├── InvestmentApproach.tsx + InvestmentApproach.module.css
│       ├── News.tsx + News.module.css (NEW - 뉴스 미리보기 컴포넌트)
│       ├── TradingViewWidget.tsx (NEW - TradingView 위젯 컴포넌트)
│       ├── CTA.tsx + CTA.module.css
│       └── Footer.tsx + Footer.module.css
├── messages/
│   ├── ko.json (한국어 번역)
│   └── en.json (영어 번역)
├── public/
│   └── images/
│       └── logo.png (회사 로고)
├── docs/
│   └── Quartz/ (참고자료 - 명함, 법인등록증 등)
├── i18n.ts
├── middleware.ts
└── next.config.js
```

## 구현 현황

### 완료된 컴포넌트 (9/9)
| 컴포넌트 | 상태 | 설명 |
|---------|------|------|
| Header | ✅ 완료 | 로고, 네비게이션, 언어 전환(KO/EN), 모바일 햄버거 메뉴 |
| Hero | ✅ 완료 | 메인 비주얼, 37년 역사 배지, 네트워크 애니메이션, CTA 버튼 |
| GlobalNetwork | ✅ 완료 | **NEW** SVG 세계지도, 7개 거점 마커, 연결선 애니메이션, 거점 상세 카드 |
| Business | ✅ 완료 | 4개 사업영역 카드 (원유, 구리, 석영, 금), 그라데이션 아이콘 |
| Leadership | ✅ 완료 | **NEW** 9명 경영진 (경영진/고문/지역대표), 이니셜 플레이스홀더 |
| Stats | ✅ 완료 | 통계 섹션 (진출국가 25+, 파트너 150+, 업력 37년, 연간거래량 $2B+) |
| InvestmentApproach | ✅ 완료 | **NEW** 3개 접근방식 카드 (리서치, 파트너십, 리스크관리) |
| CTA | ✅ 완료 | 문의 유도 섹션, 데코레이션 효과 |
| Footer | ✅ 완료 | 회사정보, 사업영역 링크, 퀵링크, 연락처, 소셜링크(LinkedIn/X) |

### 다국어 지원
- ✅ ko.json: 한국어 번역 완료
- ✅ en.json: 영어 번역 완료
- ✅ ja.json: 일본어 번역 완료
- ✅ zh.json: 중국어 번역 완료
- ✅ sw.json: 스와힐리어 번역 완료
- ✅ ar.json: 아랍어 번역 완료
- ✅ hi.json: 힌디어 번역 완료
- ✅ bn.json: 벵골어 번역 완료
- ✅ fr.json: 프랑스어 번역 완료

### 글로벌 네트워크 (7개 거점)
| 도시 | 국가 | 역할 |
|-----|------|------|
| 서울 | 한국 | 본사 - 재무, 총무, 국제사업개발 |
| 케이프타운 | 남아공 | 아프리카 지역 사무소 |
| 아크라 | 가나 | 서아프리카 사무소 - 광업, 농업, 인프라 |
| 모로고로 | 탄자니아 | **석영 생산 허브** - VISH KVARTZ INTANZ 전략적 파트너십 |
| 두바이 | UAE | 중동 사무소 - 무역금융, 물류, 에너지 |
| 다카 | 방글라데시 | 남아시아 사무소 |
| 몬트리올 | 캐나다 | 북미 사무소 |

### 페이지 라우팅 구조
- `/[locale]` - 메인 페이지 ✅
- `/[locale]/about` - 회사소개 ✅ (Hero, CEO인사말, 비전&미션, 핵심가치, 연혁)
- `/[locale]/business` - 사업영역 ✅ (4개 사업 카드, Why GGK 섹션)
- `/[locale]/business/[slug]` - 개별 사업 상세 ✅ (동적 라우팅)
- `/[locale]/contact` - 문의하기 ✅ (연락처 정보, 문의 양식)
- `/[locale]/market` - 시장정보 ✅ (시장개요, 원자재시세, 시장동향, CTA)
- `/[locale]/news` - 뉴스 ✅ (Hero, 4개 기사, CTA)
- `/[locale]/partners` - 파트너십 ✅ (파트너유형, 지역네트워크, VISH 파트너십, 혜택)

## 개발일지

### 2026-01-16
- 프로젝트 초기 셋업 완료
- Next.js 14 + TypeScript + CSS Modules 기반 구조
- next-intl을 이용한 다국어(ko/en) 지원 설정
- 메인 페이지 6개 컴포넌트 구현 완료
  - Header: 언어 전환 드롭다운, 모바일 반응형 메뉴
  - Hero: 배경 애니메이션, 자원 아이콘 표시
  - Business: 4개 사업영역 카드
  - Stats: 숫자 통계 섹션
  - CTA: 문의 유도 섹션
  - Footer: 4컬럼 레이아웃
- 개발일지 루틴 시작
- **빌드 에러 수정 완료**
  - i18n.ts: deprecated `locale` → `requestLocale` 파라미터 수정
  - layout.tsx: `setRequestLocale` 추가, params Promise 타입 수정
  - page.tsx: `setRequestLocale` 추가로 정적 렌더링 지원
  - 빌드 성공 (ko/en 페이지 정적 생성 확인)

### 2026-01-16 (Session 2)
- **새 컴포넌트 3개 추가**
  - GlobalNetwork: SVG 세계지도, 7개 거점 마커(서울 중심 연결선), 거점 카드
  - Leadership: 9명 경영진 (3그룹: 경영진/고문/지역대표), 이니셜 플레이스홀더
  - InvestmentApproach: 3개 접근방식 카드 (리서치/파트너십/리스크관리)
- **탄자니아 모로고로 거점 추가** - 석영 생산 허브, 공장 설립 예정
- **메인 페이지 구성 업데이트**
  - Hero → GlobalNetwork → Business → Leadership → Stats → InvestmentApproach → CTA
- **messages 파일 업데이트**
  - ko.json, en.json에 새 컴포넌트 번역 추가
  - footer 섹션 누락된 키(tel, fax, faxNum) 추가
- **빌드 성공** (5개 페이지 정적 생성)

### 2026-01-16 (Session 3)
- **서브 페이지 구현 확인**
  - About 페이지: Hero, CEO 인사말, 비전&미션, 핵심가치(4개), 연혁 타임라인
  - Business 페이지: 4개 사업 카드, Why GGK 섹션
  - Business/[slug]: 동적 라우팅 - 개별 사업 상세 페이지
  - Contact 페이지: 연락처 정보, 문의 양식
- **빌드 성공** (11개 페이지 정적 생성)
  - /ko, /en (메인)
  - /ko/about, /en/about
  - /ko/business, /en/business
  - /ko/contact, /en/contact

### 2026-01-16 (Session 4)
- **Market 페이지 구현**
  - Hero 섹션
  - 시장 개요 섹션
  - 주요 원자재 시세 섹션 (금, 구리, 원유, 석영 - placeholder 가격)
  - 시장 동향 섹션 (글로벌 경제, 에너지 시장, 광물 시장)
  - CTA 섹션
- **기본 언어 영어로 변경**
  - i18n.ts: defaultLocale 'ko' → 'en'
  - middleware.ts: matcher 순서 변경
- **messages 파일 업데이트**
  - ko.json, en.json에 marketPage 섹션 추가
- **빌드 성공** (13개 페이지 정적 생성)
  - /en/market, /ko/market 추가

### 2026-01-16 (Session 5)
- **Partners 페이지 구현**
  - Hero 섹션
  - 소개 섹션 (함께 성장하는 파트너)
  - 파트너십 유형 섹션 (거래/물류/금융/기술 파트너)
  - 전략적 파트너십 섹션 (VISH KVARTZ INTANZ 독점 파트너)
  - 지역별 파트너 네트워크 (아프리카/중동/아시아/아메리카)
  - 파트너십 혜택 섹션
  - CTA 섹션
- **messages 파일 업데이트**
  - ko.json, en.json에 partnersPage 섹션 추가
- **빌드 성공** (15개 페이지 정적 생성)
  - /en/partners, /ko/partners 추가

### 2026-01-17 (Session 6)
- **TradingView 실시간 시세 위젯 연동**
  - TradingViewWidget.tsx 컴포넌트 생성
    - TradingViewTicker: 실시간 티커 테이프 (금, 구리, 원유, 은, 백금)
    - TradingViewMiniChart: 미니 심볼 차트
    - TradingViewSymbolOverview: 다중 심볼 개요
    - TradingViewMarketOverview: 시장 개요 위젯
    - TradingViewSingleTicker: 단일 티커
  - Market 페이지 전면 개편
    - Hero 섹션 아래 실시간 티커 테이프 추가
    - 정적 가격 카드 → TradingView 미니 차트로 교체 (금, 구리, 원유)
    - 석영(Quartz)은 비상장이므로 별도 카드로 견적 문의 유도
    - Market Overview 섹션 추가 (원자재 종합 차트)
  - CSS 스타일 업데이트
    - 티커 섹션, 차트 그리드, 로딩 애니메이션 추가
    - 석영 카드 특별 디자인
    - 반응형 대응
  - messages 파일 업데이트 (ko.json, en.json)
    - marketOverview 섹션 추가
    - prices.quartz.note, prices.quartz.contact 추가
- **빌드 성공**

### 2026-01-17 (Session 7)
- **Firebase 전체 연동**
  - Firebase SDK 추가 (firebase ^10.7.0)
  - `src/lib/firebase.ts` - Firebase 설정 및 초기화
    - Analytics, Firestore 설정
  - `src/components/FirebaseAnalytics.tsx` - Analytics 초기화 컴포넌트
  - layout.tsx에 FirebaseAnalytics 추가
  - Contact 페이지 Firestore 연동
    - 문의 폼 데이터를 `inquiries` 컬렉션에 저장
    - 로딩/성공/에러 상태 UI 추가
  - Firebase Hosting 설정
    - firebase.json, .firebaserc 생성
    - firestore.rules, firestore.indexes.json 생성
    - next.config.js에 static export 설정 추가
  - messages 파일 업데이트 (submitting, error 번역 추가)
- **Firebase 프로젝트 정보**
  - 프로젝트 ID: global-group-777
  - 앱 ID: 1:273594875580:web:5285cc48d657db348f5ab9
  - measurementId: G-68KH7EJ9WQ

### 2026-01-18 (Session 8)
- **Hero 섹션 세계지도 배경 작업**
  - 기존 globe/blob 애니메이션 요소 제거 (빌드 캐시 문제 해결)
    - Hero.tsx에서 bgImage, overlay, particles, WorldMapHero 비활성화
    - .next, out 폴더 삭제 후 클린 빌드로 해결
  - WorldMapHero 컴포넌트 단순화
    - Wikipedia SVG 세계지도 사용 (외부 URL)
    - `https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg`
  - 단색 세계지도 배경 구현
    - 투명도 8%로 설정 (흐린 배경)
    - 중앙 정렬, 최대 너비 1200px
  - 영문 폰트 변경: Playfair Display → Inter (더 깔끔한 산세리프)
- **배포**: Firebase Hosting (https://global-group-777.web.app)
- **미완료 작업**
  - 투명도 8% 변경 배포 필요
  - 7개 거점 마커 추가 예정

### 2026-03-02 (Session 9)
- **7개국 다국어 번역 작업 시작**
  - 글로벌 거점 기반 7개 언어 추가
    | 언어 | 코드 | 해당 거점 |
    |------|------|----------|
    | 일본어 (Japanese) | ja | 일본 비즈니스 |
    | 중국어 (Chinese) | zh | 중국 비즈니스 |
    | 스와힐리어 (Swahili) | sw | 탄자니아 (모로고로) |
    | 아랍어 (Arabic) | ar | UAE (두바이) |
    | 힌디어 (Hindi) | hi | 인도 (해외이사) |
    | 벵골어 (Bengali) | bn | 방글라데시 (다카) |
    | 프랑스어 (French) | fr | 캐나다 (몬트리올) |
  - messages/ 폴더에 7개 번역 파일 생성 ✅
  - i18n.ts: locales 배열에 9개 언어 등록 ✅
  - middleware.ts: matcher에 9개 언어 패턴 추가 ✅
  - 총 9개 언어 지원: en, ko, ja, zh, sw, ar, hi, bn, fr
  - Header 언어 전환기 9개 언어 드롭다운 추가 ✅
  - Header.module.css: 드롭다운 max-height, overflow-y 스크롤 대응
  - **모바일 경영진 사진 잘림 수정**
    - Leadership.module.css: 600px 이하 aspect-ratio `4/3` → `3/4` (세로형)
    - 모바일 카드 max-width: 400px 중앙 정렬
  - **빌드 성공** (65개 페이지 정적 생성)
    - 기존 15개 → 65개 (9개 언어 × 7페이지 + business/[slug] 8개 + _not-found)

### 2026-03-10 (Session 10)
- **Google Search Console 색인 문제 수정**
  - 문제: 404(2건), 발견됨-미색인(7건), 크롤링됨-미색인(4건), 중복canonical(3건)
  - **sitemap.xml 전면 확장** (10 URL → 62 URL)
    - 기존: `/en/` 버전 10개만 등록
    - 수정: 9개 언어 전체 페이지 등록 (홈/about/business/market/partners/contact × 9언어)
    - business/[slug] en/ko 2개씩 추가
    - 모든 URL에 `x-default` hreflang 포함
  - **서브페이지 x-default 누락 수정** (5개 파일)
    - about, business, market, partners, contact page.tsx
    - `languages['x-default']` 추가
  - **business/[slug] alternates 추가**
    - 기존: canonical만 있고 languages 없음
    - 수정: 9개 언어 alternates + x-default 추가
  - **robots.txt 정리**
    - 중복 Sitemap 항목 제거 (non-www 삭제)
  - **빌드 성공** (102개 페이지 정적 생성)
  - 배포 완료, Search Console 사이트맵 재제출 필요

### 2026-03-10 (Session 11)
- **뉴스/공지사항 섹션 구현**
  - `src/components/News.tsx` + `News.module.css` - 메인페이지 뉴스 미리보기 컴포넌트
    - 최신 뉴스 3개 카드, 카테고리 태그(회사/시장), 날짜, 요약
    - "전체 보기" 버튼으로 /news 페이지 연결
  - `src/app/[locale]/news/` 전용 페이지 생성
    - `page.tsx` - SEO 메타데이터, 9개 언어 hreflang alternates
    - `NewsContent.tsx` - 클라이언트 컴포넌트, 4개 기사 전체 보기
    - `page.module.css` - Hero, 기사 카드(이미지+컨텐츠 그리드), CTA
  - 뉴스 기사 4개 (혼합 구성)
    1. 회사: 탄자니아 모로고로 석영 생산 허브 파트너십 체결
    2. 시장: 2026 글로벌 원자재 시장 전망
    3. 회사: 다카 사무소 확장으로 남아시아 사업 강화
    4. 시장: 아프리카 광물 시장 성장과 기회
  - 메인페이지에 News 컴포넌트 추가 (InvestmentApproach ↔ CTA 사이)
  - Header 네비게이션에 "News" 메뉴 추가
  - Footer quickLinks에 news 추가
  - 9개 언어 번역 완료 (en, ko, ja, zh, sw, ar, hi, bn, fr)
    - seo.news, nav.news, newsSection, newsPage 키 추가
  - sitemap.xml에 9개 언어 × /news/ URL 추가 (9개)
- **반응형 디자인 점검 및 수정**
  - Hero: yearsBadge 768px에서 `display:none` → 축소 표시로 변경
  - Market: marketOverviewLoading 480px에서 300px 높이 + 패딩 최적화
  - About: CEO이미지 sticky 768px에서 이미 static 처리 확인 (이슈 없음)
  - Partners: contractGrid 768px에서 이미 1fr 처리 확인 (이슈 없음)
- **빌드 성공** (111개 페이지 정적 생성)
  - 기존 102개 → 111개 (news 9개 추가)

## 다음 작업
- [x] 빌드 테스트 및 에러 수정
- [x] 세계지도 + 7개 거점 GlobalNetwork 컴포넌트
- [x] 경영진 9명 Leadership 컴포넌트
- [x] InvestmentApproach 컴포넌트
- [x] 탄자니아 모로고로 거점 추가
- [x] About 페이지 구현
- [x] Business 페이지 구현
- [x] Contact 페이지 구현
- [x] Market 페이지 구현 (시장정보)
- [x] 기본 언어 영어로 변경
- [x] Partners 페이지 구현 (파트너십)
- [x] 실시간 시세 위젯 (TradingView 연동) ✅
- [x] Hero 섹션 세계지도 배경 추가 ✅
- [x] 7개국 다국어 번역 (ja, zh, sw, ar, hi, bn, fr) ✅
- [x] Google Search Console 색인 문제 수정 ✅
- [ ] Hero 세계지도에 7개 거점 마커 추가
- [ ] 경영진 실제 사진 추가 (현재 이니셜 플레이스홀더)
- [x] 뉴스/공지사항 섹션 ✅
- [x] 반응형 디자인 점검 ✅

## 메모
- docs/Quartz 폴더에 참고자료 있음 (Dr. Kassey Paul 명함, Vish 법인등록증 등)
- 석영: 탄자니아 VISH KVARTZ INTANZ사와 전략적 파트너십 (전세계 독점 영업권)

## 기획안 요약

### 사이트 구조
```
홈 (Home)
├── 회사소개 (About Us) - CEO 인사말, 비전&미션, 연혁, 글로벌 네트워크
├── 사업영역 (Business) - 원유/구리/석영/금 거래
├── 시장정보 (Market Insight) - 실시간 시세, 시장 동향
├── 파트너십 (Partnership) - 글로벌 파트너사
└── 문의하기 (Contact) - 거래 문의, 오시는 길
```

### 메인 페이지 구성
1. 히어로 섹션 - 풀스크린, 4대 사업영역 순환, CTA ✅
2. 사업영역 하이라이트 - 4개 카드형 레이아웃 ✅
3. 실시간 시세 위젯 - 금/구리/원유 시세 ✅ (TradingView 연동 완료)
4. 회사 강점 섹션 - 숫자로 보는 글로벌그룹 ✅
5. 뉴스/공지사항 (미구현)

### 로드맵
- 1단계: 메인 페이지 + 회사소개 + 사업영역 ← 현재 진행 중
- 2단계: 문의 시스템 + 시세 위젯
- 3단계: 다국어 지원 + 파트너십
- 4단계: 시장정보/리포트
