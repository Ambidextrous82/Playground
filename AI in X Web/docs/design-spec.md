# AI in X Study — UI/UX 디자인 스펙 (Design Specification)

> **문서 목적**: `AI in X` 스터디 공식 홈페이지 MVP의 시각 디자인 시스템, 정보 구조, 컴포넌트 규격 및 인터랙션을 정의합니다. 개발자와 QA 검수자가 모호함 없이 바로 구현·검증할 수 있도록 구체적인 CSS 토큰, 수치, 상태, 접근성 기준을 명시합니다.
>
> **호스팅 전제**: GitHub Pages (`github.io`) 정적 배포 환경 (빌드 도구 불필요, 루트 `index.html`, `.nojekyll`, 상대 경로 기반).

---

## 1. 브랜드 무드 & 비주얼 방향 (Editorial Consulting Direction)

### 1.1 핵심 디자인 콘셉트: *"Structured Clarity, Quiet Authority"*
McKinsey Insights 및 BCG Henderson Institute와 같은 글로벌 전략 컨설팅 펌의 에디토리얼 웹 디자인 언어를 현대적으로 재해석합니다. 화려한 장식이나 유행성 효과로 시선을 끌기보다, **지적 신뢰감, 구조화된 정보 위계, 정밀한 여백**으로 콘텐츠 자체의 권위를 드러냅니다.

### 1.2 컨설팅 스타일 구현을 위한 5대 원칙
1. **타이포그래피 중심 위계 (Editorial Typography First)**
   - 영문 브랜드 마크(`AI in X`), 대형 숫자·지표, 섹션 인덱스에는 절제된 에디토리얼 세리프(`Newsreader`)를, 국문 헤드라인과 본문에는 현대적 산세리프(`Pretendard`)를, 일정 코드(`W1`, `2026.07.25`)와 메타데이터에는 고정폭 폰트(`JetBrains Mono`)를 조합합니다.
   - 한국어 본문에 `word-break: keep-all`을 전역 적용하여 전략 리포트처럼 정갈한 줄바꿈을 유지합니다.
2. **Paper & Ink 컬러 구조**
   - 순백(`#FFFFFF`)과 미세한 웜 오프화이트(`#F7F7F5`, 인쇄 리포트 용지 톤)를 섹션별로 교차 배치하고, 극도로 깊은 미드나잇 네이비(`#051C2C`)를 잉크 컬러 및 다크 앵커 섹션(Hero 다이어그램 패널, Open Track 배너, Footer)에 사용해 시각적 무게 중심을 잡습니다.
   - 전략적 포인트 컬러로 **Cobalt Blue (`#1746D6`, McKinsey 계열)**를 주 인터랙션에, **Deep Emerald (`#0B6E4F`, BCG 계열)**를 확장 트랙·성공 상태·보조 액센트에 절제되게 배분합니다.
3. **1px 헤어라인 & 샤프 지오메트리 (Hairline Grid & Sharp Corners)**
   - 과도한 `box-shadow`와 둥근 카드(`border-radius: 16px+`)를 배제하고, `1px solid #DCE1E7` 헤어라인 구분선, `2px~3px` 상단 에디토리얼 룰 라인, `0px~2px`의 날카로운 모서리(architectural sharp geometry)로 구조적 긴장감을 형성합니다.
4. **넉넉한 여백과 리듬 (Generous Whitespace)**
   - 데스크톱 기준 섹션 상하 패딩 `112px`, 명확한 12컬럼 그리드로 정보 밀도가 높은 멤버·주제 데이터도 답답하지 않게 호흡하도록 설계합니다.
5. **Anti-Patterns (엄격히 배제할 요소)**
   - ❌ 네온 글로우, 다색 그라데이션 텍스트/배경, 떠다니는 3D 블롭(blob)
   - ❌ 과도한 글래스모피즘 카드(단, Sticky Navigation 배경의 미세한 반투명 화이트만 예외 허용)
   - ❌ 스프링 바운스(`bounce`) 애니메이션, 호버 시 카드가 과도하게 떠오르는(`translateY(-8px)`) 효과

---

## 2. 디자인 토큰 (CSS Custom Properties 규격)

개발자는 아래 `:root` 토큰을 `css/styles.css` 최상단에 그대로 선언하여 모든 스타일의 단일 기준(Single Source of Truth)으로 사용합니다.

### 2.1 컬러 팔레트 & WCAG AA 대비 검증

| Token | Value | 용도 | 대비 검증 (WCAG 2.1) |
| :--- | :--- | :--- | :--- |
| `--color-ink-primary` | `#051C2C` | 주 텍스트, 헤드라인, Primary CTA 배경 | on `#FFFFFF`: **17.4:1** (AAA) |
| `--color-ink-secondary` | `#334155` | 본문 텍스트, 카드 상세 설명 | on `#FFFFFF`: **10.4:1** (AAA) |
| `--color-ink-muted` | `#526071` | 캡션, 메타데이터, 보조 레이블 | on `#FFFFFF`: **6.4:1** (AA+) |
| `--color-surface-white` | `#FFFFFF` | 기본 캔버스, 카드 표면 | — |
| `--color-surface-paper` | `#F7F7F5` | 교차 섹션 배경, 타임라인·요약 박스 | ink-muted 대비 **5.9:1** (AA+) |
| `--color-surface-subtle` | `#EEF1F4` | AI 툴 칩, 비활성 태그, 미세 호버 배경 | ink-primary 대비 **15.1:1** |
| `--color-surface-navy` | `#051C2C` | 다크 앵커(Hero 패널, Open Track, Footer) | `#FFFFFF` 대비 **17.4:1** (AAA) |
| `--color-surface-navy-elevated` | `#0D2B42` | 다크 서피스 내부 카드/노드 배경 | `#FFFFFF` 대비 **14.3:1** (AAA) |
| `--color-accent-blue` | `#1746D6` | 주 액센트(링크, 활성 탭, CTA 호버, 키커) | on `#FFFFFF`: **7.1:1** (AAA) |
| `--color-accent-blue-hover` | `#0E32A8` | 블루 버튼·링크 호버 상태 | on `#FFFFFF`: **10.1:1** (AAA) |
| `--color-accent-blue-tint` | `#EDF2FF` | 강조 블록 배경(발표 주제 하이라이트 등) | ink-primary 대비 **15.4:1** |
| `--color-accent-emerald` | `#0B6E4F` | 보조 액센트(게스트/오픈트랙/성공 상태) | on `#FFFFFF`: **6.1:1** (AA+) |
| `--color-accent-emerald-tint` | `#E8F5F0` | 성공 피드백 배너 배경 | emerald 대비 **5.4:1** (AA+) |
| `--color-border-hairline` | `#DCE1E7` | 1px 기본 섹션·카드·리스트 구분선 | — |
| `--color-border-input` | `#C5CDD8` | 폼 입력 필드 기본 보더 | UI 비텍스트 대비 충족 |
| `--color-border-strong` | `#051C2C` | 2px~3px 에디토리얼 룰 라인, 강조 보더 | — |
| `--color-border-dark` | `rgba(255, 255, 255, 0.16)` | 다크 서피스 내부 1px 헤어라인 | — |
| `--color-text-on-dark` | `#FFFFFF` | 다크 서피스 주 텍스트 | on `#051C2C`: **17.4:1** (AAA) |
| `--color-text-on-dark-muted` | `#B8C7D6` | 다크 서피스 보조 텍스트 | on `#051C2C`: **10.1:1** (AAA) |
| `--color-accent-on-dark` | `#7BA4FF` | 다크 서피스 내 블루 강조(`X`, 링크) | on `#051C2C`: **6.8:1** (AA+) |
| `--color-emerald-on-dark` | `#4ADEB5` | 다크 서피스 내 오픈 트랙(`+X`) 강조 | on `#051C2C`: **10.5:1** (AAA) |
| `--color-semantic-error` | `#B91C1C` | 폼 유효성 오류 텍스트·보더 | on `#FFFFFF`: **6.5:1** (AA+) |
| `--color-semantic-error-bg` | `#FEF2F2` | 오류 배너 배경 | error 대비 **5.8:1** (AA+) |

### 2.2 웹폰트 CDN 링크 (`<head>` 삽입 규격)

```html
<!-- Pretendard Variable (Korean & UI Sans-serif) -->
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />

<!-- Newsreader (Editorial Serif) & JetBrains Mono (Indices / Dates / Codes) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap" rel="stylesheet" />
```

### 2.3 CSS Custom Properties 전체 코드 스니펫

```css
:root {
  /* Colors — Ink & Surfaces */
  --color-ink-primary: #051C2C;
  --color-ink-secondary: #334155;
  --color-ink-muted: #526071;
  --color-surface-white: #FFFFFF;
  --color-surface-paper: #F7F7F5;
  --color-surface-subtle: #EEF1F4;
  --color-surface-navy: #051C2C;
  --color-surface-navy-elevated: #0D2B42;

  /* Colors — Accents & Semantics */
  --color-accent-blue: #1746D6;
  --color-accent-blue-hover: #0E32A8;
  --color-accent-blue-tint: #EDF2FF;
  --color-accent-emerald: #0B6E4F;
  --color-accent-emerald-tint: #E8F5F0;
  --color-semantic-error: #B91C1C;
  --color-semantic-error-bg: #FEF2F2;
  --color-semantic-success: #0B6E4F;
  --color-semantic-success-bg: #E8F5F0;

  /* Colors — Borders & Dark Mode Helpers */
  --color-border-hairline: #DCE1E7;
  --color-border-input: #C5CDD8;
  --color-border-strong: #051C2C;
  --color-border-dark: rgba(255, 255, 255, 0.16);
  --color-text-on-dark: #FFFFFF;
  --color-text-on-dark-muted: #B8C7D6;
  --color-accent-on-dark: #7BA4FF;
  --color-emerald-on-dark: #4ADEB5;

  /* Typography Families */
  --font-serif: "Newsreader", Georgia, "Times New Roman", serif;
  --font-sans: "Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Typography Scale (Responsive clamp) */
  --text-display: clamp(2.25rem, 3.8vw + 1.05rem, 3.75rem);  /* 36px -> 60px */
  --text-h2: clamp(1.75rem, 2.2vw + 0.9rem, 2.625rem);        /* 28px -> 42px */
  --text-h3: clamp(1.25rem, 0.9vw + 0.95rem, 1.5rem);         /* 20px -> 24px */
  --text-lead: clamp(1.0625rem, 0.45vw + 0.92rem, 1.25rem);   /* 17px -> 20px */
  --text-body: 1rem;                                          /* 16px */
  --text-small: 0.875rem;                                     /* 14px */
  --text-xs: 0.75rem;                                         /* 12px */

  /* Line Heights & Letter Spacing */
  --leading-tight: 1.15;
  --leading-snug: 1.3;
  --leading-normal: 1.6;
  --leading-relaxed: 1.75;
  --tracking-tight: -0.025em;
  --tracking-normal: -0.01em;
  --tracking-kicker: 0.12em;

  /* Spacing Scale (8px base rhythm) */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-28: 7rem;     /* 112px */

  /* Layout & Grid */
  --container-max: 1280px;
  --container-pad: clamp(1.25rem, 4vw, 3rem); /* 20px -> 48px */
  --nav-height-desktop: 72px;
  --nav-height-mobile: 64px;
  --section-py: clamp(4rem, 7vw, 7rem);       /* 64px -> 112px */
  --radius-sharp: 2px;

  /* Elevation (Minimal) */
  --shadow-drawer: -16px 0 48px rgba(5, 28, 44, 0.18);
  --shadow-focus: 0 0 0 3px rgba(23, 70, 214, 0.18);

  /* Motion */
  --ease-editorial: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 160ms;
  --duration-base: 260ms;
  --duration-slow: 420ms;

  /* Z-Index Layers */
  --z-header: 100;
  --z-mobile-nav: 200;
  --z-drawer-backdrop: 300;
  --z-drawer: 310;
  --z-toast: 400;
}
```

### 2.4 타이포그래피 사용 규칙

| 역할 | 폰트 패밀리 | 크기 | 굵기 | 행간 | 자간 | 비고 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 브랜드 워드마크 (`AI in X`) | `--font-serif` | `24px` (Nav) | `600` | `1` | `-0.02em` | `X`는 `italic` + `--color-accent-blue` |
| Hero Display H1 | `--font-sans` (영문 포인트 `--font-serif`) | `--text-display` | `700` | `1.15` | `-0.03em` | `AI in X` 세리프 + 국문 슬로건 산세리프 |
| Section Heading H2 | `--font-sans` | `--text-h2` | `700` | `1.22` | `-0.025em` | `keep-all` 필수 |
| Card / Framework Title H3 | `--font-sans` | `--text-h3` | `700` | `1.3` | `-0.015em` | Why/What/How 영문 키워드는 `--font-serif` `28px` |
| Section Kicker (`01 / PURPOSE`) | `--font-mono` | `12px` | `500` | `1.2` | `0.12em` | Uppercase, `--color-accent-blue` |
| Lead Paragraph | `--font-sans` | `--text-lead` | `400` | `1.65` | `-0.01em` | `--color-ink-secondary`, 최대 폭 `62ch` |
| Body Copy | `--font-sans` | `16px` (`15px` in dense cards) | `400` | `1.7` | `-0.01em` | `word-break: keep-all; overflow-wrap: break-word;` |
| Metric Numbers (`05`, `~10`, `2026.07.25`) | `--font-serif` | `clamp(1.75rem, 2.5vw, 2.375rem)` | `500` | `1.1` | `-0.02em` | `font-variant-numeric: tabular-nums` |
| Timeline & Codes (`W1 · 08.08`) | `--font-mono` | `12px ~ 13px` | `500` | `1.3` | `0.02em` | `font-variant-numeric: tabular-nums` |

### 2.5 브레이크포인트 & 12컬럼 그리드 기준

| 브레이크포인트 | 대상 뷰포트 | 컨테이너 좌우 여백 | 그리드 컬럼 | 그리드 갭 | 섹션 상하 패딩 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Desktop Wide** (`>= 1280px`) | 1440px, 1280px | `48px` (`max-width: 1280px`) | 12 Columns | `32px` | `112px` |
| **Small Desktop** (`1024px – 1279px`) | 1024px | `36px` | 12 Columns | `24px` | `96px` |
| **Tablet** (`768px – 1023px`) | 768px | `32px` | 8 Columns (카드는 2열) | `20px` | `80px` |
| **Mobile** (`<= 767px`) | 375px ~ 767px | `20px` | 4 Columns (기본 1열 스택) | `16px` | `64px` |

> **가로 스크롤 방지 규칙**: 모든 섹션과 `body`는 `overflow-x: clip`을 적용하고(sticky 호환을 위해 `hidden` 대신 `clip` 권장), 375px 모바일 뷰포트에서 모든 텍스트·SVG·필터 탭·폼 요소가 뷰포트 폭을 초과하지 않도록 검증합니다.

---

## 3. 페이지 리듬 & 섹션 서피스 교차 구조

시각적 단조로움을 피하면서도 컨설팅 리포트 같은 질서를 유지하기 위해 섹션 배경을 다음과 같이 교차합니다.

| 순서 | 섹션 | ID | 배경 서피스 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| 0 | Sticky Navigation | `header` | `rgba(255, 255, 255, 0.94)` | 하단 1px 헤어라인 |
| 1 | Hero + Key Metrics Bar | `#hero` | `#FFFFFF` (우측 패널 `#051C2C`, 지표 바 `#F7F7F5`) | 비대칭 7:5 그리드 |
| 2 | Section 1: 스터디 목적 & 타임라인 | `#purpose` | `#FFFFFF` (타임라인 블록 `#F7F7F5`) | Why/What/How + W1~W9 |
| 3 | Section 2: 멤버 소개 | `#members` | `#F7F7F5` (카드 `#FFFFFF`) | 5+1 대칭 그리드 + Drawer |
| 4 | Section 3: 분야별 스터디 주제 | `#topics` | `#FFFFFF` (Open Track 배너 `#051C2C`) | 필터 탭 + 6대 트랙 카드 |
| 5 | Section 4: Join Us | `#join-us` | `#F7F7F5` (폼 카드 `#FFFFFF`) | 5:7 분할 + 정적 폼 요약 |
| 6 | Footer | `footer` | `#051C2C` | 다크 네이비 마무리 |

---

## 4. 섹션별 상세 레이아웃 & 컴포넌트 스펙

### 4.1 Global Sticky Navigation & Mobile Menu Drawer

#### 언어 레이블 결정 (컨설팅 국/영문 밸런스)
- **데스크톱 상단 네비게이션**: 한국 방문자의 즉각적 가독성과 글로벌 컨설팅 브랜드 감성의 균형을 위해 **브랜드(`AI in X`)와 CTA(`Join Us`)는 영문**, **3개 본문 섹션 링크는 국문(`스터디 목적`, `멤버 소개`, `스터디 주제`)**으로 확정합니다.
- **모바일 메뉴 드로어**: 각 항목에 영문 인덱스 키커를 병기하여(`01 PURPOSE` / `스터디 목적`) 에디토리얼 목차(Table of Contents) 느낌을 강화합니다.

#### Desktop Header (`>= 768px`)
- **구조**: `position: sticky; top: 0; height: 72px; z-index: 100;`
- **배경**: `background: rgba(255, 255, 255, 0.94); backdrop-filter: blur(8px); border-bottom: 1px solid var(--color-border-hairline);`
- **좌측 브랜드 영역** (`<a href="#hero">` — 페이지 최상단 이동):
  - `AI in ` (`Newsreader` 600, `24px`, `#051C2C`) + `X` (`Newsreader` 500 Italic, `26px`, `#1746D6`)
  - 구분선: `1px × 16px` (`#DCE1E7`), 좌우 `12px` 마진 (1024px 이상 노출)
  - 서브 레이블: `STUDY GROUP` (`JetBrains Mono`, `11px`, `letter-spacing: 0.14em`, `#526071`)
- **우측 메뉴 영역**:
  - 텍스트 링크 3개 (`gap: 32px`): `스터디 목적` (`#purpose`), `멤버 소개` (`#members`), `스터디 주제` (`#topics`)
  - 링크 스타일: `14px`, `500`, `#334155` → Hover `#051C2C`. Scroll-spy 활성 섹션(`aria-current="location"`)에는 `#051C2C` `600` + 하단 `2px solid #1746D6` 인디케이터(`bottom: -26px` 헤더 하단선 정렬).
  - Primary CTA 버튼: `Join Us` (`#join-us`) — `height: 40px; padding: 0 20px; background: #051C2C; color: #FFFFFF; font-size: 13.5px; font-weight: 600; border-radius: 2px;` → Hover `background: #1746D6`.

#### Mobile Header & Slide-over Menu (`<= 767px`)
- **높이**: `64px`, 우측에 햄버거 토글 버튼(`44×44px` 터치 영역, `2px` 수평선 2~3개, `aria-expanded`, `aria-controls="mobile-nav"`).
- **Mobile Drawer**:
  - 우측 슬라이드-인(`width: min(85vw, 340px); height: 100dvh; background: #FFFFFF; padding: 24px;`), 배경 스크림 `rgba(5, 28, 44, 0.48)`.
  - 메뉴 리스트(1px 헤어라인 구분):
    - `01 · PURPOSE` / **스터디 목적**
    - `02 · MEMBERS` / **멤버 소개**
    - `03 · TOPICS` / **스터디 주제**
    - `04 · JOIN US` / **참여 안내 & 지원**
  - 하단 메타: `Kick-off 2026.07.25 · Bi-weekly Study`
  - 동작: 링크 클릭, `ESC` 키, 닫기 버튼, 배경 클릭 시 즉시 닫히고 본문 스크롤 잠금 해제.

---

### 4.2 Hero Section (`#hero`)

#### 레이아웃 (Desktop `>= 1024px`)
- 상단 패딩 `72px`, 하단 패딩 `64px` (내부 콘텐츠) + 하단 Key Metrics Bar 풀-폭 배치.
- **12컬럼 비대칭 그리드**:
  - **좌측 (`grid-column: span 7`)**: 에디토리얼 헤드라인, 설명, CTA 버튼.
  - **우측 (`grid-column: span 5`)**: 다크 네이비(`#051C2C`) Domain Convergence Matrix 패널 (순수 인라인 SVG 다이어그램 + 5+X 도메인 인덱스).
- **Tablet (`768px–1023px`) / Mobile (`<= 767px`)**: 1컬럼 수직 스택(좌측 카피 상단 → 우측 다이어그램 하단).

#### 좌측 에디토리얼 카피 스펙
1. **Eyebrow Kicker**: 좌측 `24px × 2px` `#1746D6` 바 + `BI-WEEKLY CROSS-DOMAIN AI STUDY · 2026` (`JetBrains Mono`, `12px`, `letter-spacing: 0.12em`, `#1746D6`).
2. **H1 헤드라인**:
   - 영문 리드: `AI in X` (`Newsreader` 500, `X`는 italic `#1746D6`) — 인라인 또는 첫 줄 강조
   - 국문 슬로건: `5개 도메인의 결합으로` `<br>` `만드는 AI 시너지` (`--text-display`, `700`, `#051C2C`, `line-height: 1.15`).
3. **리드 카피** (`margin-top: 24px`, `max-width: 56ch`):
   - "컨설팅, 연구, 개발, 투자, 1인 기업 — 서로 다른 5개 영역(X)의 실무자와 연구자가 모여 AI 실전 활용 사례를 공유하고 주제별 딥다이브를 진행하는 정기 스터디입니다." (`--text-lead`, `#334155`).
4. **CTA 버튼 그룹** (`margin-top: 36px`, `display: flex; flex-wrap: wrap; gap: 12px;`):
   - **Primary CTA** (`<a href="#join-us">`): `Join Us — 스터디 참여하기` + `→`
     - `height: 50px; padding: 0 28px; background: #051C2C; color: #FFFFFF; font-weight: 600; font-size: 15px; border-radius: 2px;`
     - Hover: `background: #1746D6`, 화살표 `transform: translateX(4px)`.
   - **Secondary CTA** (`<a href="#topics">`): `분야별 주제 보기` + `↓`
     - `height: 50px; padding: 0 24px; background: transparent; color: #051C2C; border: 1px solid #051C2C; font-weight: 600; font-size: 15px; border-radius: 2px;`
     - Hover: `background: #F7F7F5; border-color: #1746D6; color: #1746D6;`.

#### 우측 순수 SVG 기하학 다이어그램 패널 (`Domain Convergence Matrix`)
- **컨테이너**: `background: #051C2C; border-top: 3px solid #1746D6; padding: 28px 32px; color: #FFFFFF; border-radius: 2px;`
- **패널 헤더** (`border-bottom: 1px solid rgba(255,255,255,0.16); padding-bottom: 16px;`):
  - 좌측: `DOMAIN CONVERGENCE` (`JetBrains Mono`, `11px`, `#B8C7D6`, `tracking: 0.14em`)
  - 우측: `5 + X MODEL` (`JetBrains Mono`, `11px`, `#4ADEB5`)
- **순수 인라인 SVG 규격 (`viewBox="0 0 360 280"`, `role="img"`, `aria-label="AI 코어를 중심으로 5개 도메인과 확장 도메인 X가 연결된 시너지 다이어그램"`)**:
  - 배경 미세 그리드/동심원: 중심 `(180, 140)`에 반지름 `44`, `96`의 `1px` 원 (`stroke="rgba(255,255,255,0.12)"`, 외곽 원은 `stroke-dasharray="3 4"`).
  - 중심 코어 노드: 반지름 `32` 원 (`fill="#0D2B42"`, `stroke="#7BA4FF"`, `stroke-width="1.5"`), 중앙 텍스트 `AI` (`Newsreader`, `22px`, `#FFFFFF`).
  - 6개 외곽 노드 배치 (반지름 `96` 위 60도 간격 정육각형 대칭 — 5개 기존 도메인 + 1개 열린 `+X` 도메인):
    1. `01 Consulting` (`-90°`, 상단) — 솔리드 노드 (`#7BA4FF`)
    2. `02 Research` (`-30°`, 우상단) — 솔리드 노드 (`#7BA4FF`)
    3. `03 Development` (`+30°`, 우하단) — 솔리드 노드 (`#7BA4FF`)
    4. `04 Investment` (`+90°`, 하단) — 솔리드 노드 (`#7BA4FF`)
    5. `05 Solopreneur` (`+150°`, 좌하단) — 솔리드 노드 (`#7BA4FF`)
    6. `+ X Open` (`-150°`, 좌상단) — 점선 노드 (`stroke="#4ADEB5"`, `stroke-dasharray="3 3"`, 텍스트 `#4ADEB5`)
  - 연결선: 중심과 각 노드를 잇는 `1px` 헤어라인 (`rgba(123, 164, 255, 0.35)`, `+X`는 `rgba(74, 222, 181, 0.55)` 점선).
  - **경량 인터랙션**: 각 SVG 노드 또는 하단 인덱스 항목에 hover/focus 시 해당 연결선과 노드가 밝아지고(`opacity: 1; stroke-width: 2`), 패널 하단 1줄 상태바에 해당 도메인의 핵심 키워드(예: `01 Consulting · 조하영 — AI 슬라이드 제작`)를 표시합니다. 클릭 시 해당 멤버 프로필 또는 섹션으로 연결됩니다.
- **패널 하단 요약 바** (`border-top: 1px solid rgba(255,255,255,0.16); padding-top: 14px;`):
  - 기본 문구: `각 도메인 노드를 선택해 참여 분야를 확인하세요.` (`12.5px`, `#B8C7D6`).

#### 하단 4대 핵심 지표 바 (Key Metrics Strip)
- **컨테이너**: `background: #F7F7F5; border-top: 1px solid #DCE1E7; border-bottom: 1px solid #DCE1E7;`
- **내부 그리드**: Desktop `4 Columns` (각 셀 좌측 `1px solid #DCE1E7`, 첫 셀 제외), Tablet/Mobile `2×2 Grid` (수평·수직 `1px` 헤어라인).
- **셀 패딩**: Desktop `28px 24px`, Mobile `20px 16px`.
- **4개 지표 데이터**:

| 지표 값 (`Newsreader`, `32px~38px`, `#051C2C`) | 레이블 (`Pretendard`, `13px`, Bold) | 보조 메타 (`12.5px`, `#526071`) |
| :--- | :--- | :--- |
| `05` | `Domains` | `컨설팅 · 연구 · 개발 · 투자 · 1인 기업` |
| `~10` | `Bi-weekly Sessions` | `순번 발표 및 심층 토의 기반` |
| `Jul – Dec` | `2026 Curriculum` | `2026년 하반기 집중 딥다이브` |
| `2026.07.25` | `Kick-off Date` | `정기세션 W1 · 8/8 시작` |

---

### 4.3 Section 1 — 스터디 목적 & 타임라인 (`#purpose`)

#### 섹션 헤더 (Editorial Split Header — 모든 섹션 공통 패턴)
- Desktop 12컬럼 기준:
  - 좌측 (`span 4`): Kicker `01 / PURPOSE` (`JetBrains Mono`, `12px`, `#1746D6`) + 영문 서브 `Study Overview` (`14px`, `#526071`).
  - 우측 (`span 8`): H2 `"왜, 무엇을, 어떻게 공부할 것인가?"` + 1줄 브리지 카피 `"트렌드 팔로업을 넘어, 각자의 도메인에서 실질적 성과를 만드는 깊이 있는 AI 학습 구조를 설계했습니다."`
- 헤더와 본문 사이 간격: `56px` (Mobile `36px`).

#### Part A: Why / What / How 3-Column Consulting Framework
- **컨테이너**: 상단 `2px solid #051C2C`, 하단 `1px solid #DCE1E7`.
- **그리드**: Desktop `repeat(3, 1fr)` (컬럼 간 `1px solid #DCE1E7` 수직 디바이더), Mobile `1fr` (수평 디바이더).
- **컬럼 내부 패딩**: Desktop `36px 32px` (첫 컬럼 좌측 `0`, 마지막 컬럼 우측 `0`), Mobile `28px 0`.
- **각 컬럼 콘텐츠 규격**:

| 구분 | 영문 키 (`Newsreader` 30px) | 핵심 명제 (`Pretendard` 19px Bold) | 상세 설명 (`15px`, `#334155`, line-height `1.7`) | 하단 메타 태그 (`12px` Mono, `#526071`) |
| :--- | :--- | :--- | :--- | :--- |
| `01` | **Why** | AI 주제의 포괄적·심층적 이해 | 단편적인 툴 소개에 그치지 않고, 서로 다른 5개 분야의 시각을 결합해 AI의 구조적 원리와 실무적 한계까지 입체적으로 이해합니다. | `Breadth & Depth` |
| `02` | **What** | 활용 사례 공유 및 주제별 딥다이브 | 컨설팅 장표, 연구·코딩 에이전트, 개발 하네스, 투자 자동화, 브랜딩까지 실제 업무 활용 사례를 공유하고 핵심 아젠다를 깊게 파고듭니다. | `Real Cases & Deep-Dive` |
| `03` | **How** | 2026년 12월까지 격주 정기 세션 (약 10회) | 7월 25일 킥오프를 시작으로 격주 정기 세션을 운영하며, 구성원 순번 발표와 실전 중심의 심층 토의를 통해 각자의 방식으로 체화합니다. | `Bi-weekly · Rotation` |

#### Part B: 2026년 7~12월 정기세션 타임라인 (Tentative Roadmap)
- **배치**: Why/What/How 블록 하단 `margin-top: 48px`.
- **컨테이너**: `background: #F7F7F5; border: 1px solid #DCE1E7; padding: 32px 36px;` (Mobile `24px 20px`).
- **헤더 바**:
  - 좌측: `2026 SESSION TIMELINE` (`JetBrains Mono`, `12px`, `#051C2C`, Bold) + 배지 `TENTATIVE` (`background: #EEF1F4; color: #526071; font-size: 11px; padding: 2px 8px;`)
  - 우측: `* 향후 5개 세션 우선 배정 · 발표자에 따라 주제 변동 가능` (`12.5px`, `#526071`)
- **타임라인 트랙 구조**:
  - **Desktop (`>= 1024px`)**: `7-Column` 수평 마일스톤 스트립. 상단 `1px` 연결선(Kick-off → W9 실선 `#94A3B8`, W9 → ~12월 점선 `#0B6E4F`) 위에 각 노드가 정렬.
  - **Tablet / Mobile (`<= 1023px`)**: 좌측 세로 타임라인 라인(`1px solid #C5CDD8`) + 우측 2컬럼(코드/날짜 + 라벨) 리스트로 자연스럽게 전환 (가로 스크롤 없음!).
- **7개 마일스톤 데이터 (원본 일치 필수)**:
  1. **Kick-off** · `2026.07.25` — 오리엔테이션 & 1차 일정 확정 *(노드: `12px` solid `#051C2C` 채움 원, 강조 텍스트)*
  2. **W1** · `08.08` — 1차 정기세션 *(노드: `12px` white fill + `2.5px solid #1746D6` 링)*
  3. **W3** · `08.22` — 2차 정기세션
  4. **W5** · `09.05` — 3차 정기세션
  5. **W7** · `09.19` — 4차 정기세션
  6. **W9** · `10.03` — 5차 정기세션
  7. **W11 – Dec** · `~12월` — 격주 지속 진행 (총 약 10회) *(노드: `12px` `#E8F5F0` fill + `2px dashed #0B6E4F`)*

---

### 4.4 Section 2 — 멤버 소개 (`#members`)

#### 섹션 헤더
- 좌측: `02 / MEMBERS` · `People`
- 우측: H2 `"5개 도메인의 결합으로 만드는 AI 시너지"` + 서브 카피 `"다양한 분야에 전문성을 가진 AI in X 스터디 구성원들을 소개합니다. 각 프로필을 클릭하면 AI 활용 스택과 발표 주제를 포함한 전체 인터뷰를 확인할 수 있습니다."`

#### 5인 비대칭 해결 전략: **5 + 1 대칭 에디토리얼 그리드**
- 5명의 멤버를 3열 그리드에 배치할 때 발생하는 2행 우측 공백 문제를 해결하고 브랜드 정체성(`AI in X`)을 강화하기 위해 **6번째 슬롯에 `Next Domain Invitation Card ("AI in [ X ]")`**를 배치합니다.
  - **Desktop (`>= 1024px`)**: `3 × 2` 완벽 대칭 그리드 (`grid-template-columns: repeat(3, 1fr); gap: 24px;`)
  - **Tablet (`768px – 1023px`)**: `2 × 3` 완벽 대칭 그리드 (`grid-template-columns: repeat(2, 1fr); gap: 20px;`)
  - **Mobile (`<= 767px`)**: `1 × 6` 수직 스택 (`gap: 16px;`)

#### 멤버 프로필 카드 규격 (기본 뷰)
- **컨테이너**: `background: #FFFFFF; border: 1px solid #DCE1E7; border-top: 2px solid #051C2C; padding: 28px; display: flex; flex-direction: column; cursor: pointer;`
- **호버 상태**: `border-top-color: #1746D6; border-color: #B8C4D4;` + 하단 화살표 `translateX(4px)`. (카드 전체 클릭 가능하되, 접근성을 위해 카드 내부에 시맨틱 `<button type="button" class="member-card__trigger">`를 두고 카드 클릭 이벤트를 위임하거나, 카드 전체를 버튼/아티클+버튼 패턴으로 구성 — **권장: `<article>` 내부의 주요 `<button>` + 카드 클릭 시 해당 버튼 활성화, 키보드 Tab으로 버튼에 명확히 포커스 진입**).
- **내부 구성 (위→아래)**:
  1. **Top Row** (`display: flex; justify-content: space-between; align-items: flex-start;`):
     - 도메인 라벨: `AI in Consulting` (`JetBrains Mono` 또는 `Pretendard` 600, `12px`, `#1746D6`, `letter-spacing: 0.02em`) + 국문 도메인 괄호 또는 서브 (`컨설팅`, `12px`, `#526071`)
     - 모노그램 아바타: `40×40px`, `background: #051C2C; color: #FFFFFF; font-family: var(--font-serif); font-size: 16px; font-weight: 500; border-radius: 2px;`
       - 조하영 `HY` / 최재현 `JH` / 박노아 `NA` / 김영후 `YH` / 조한솔 `HS`
  2. **이름** (`margin-top: 14px`): `22px`, Bold `700`, `#051C2C`.
  3. **핵심 약력 (자기소개)** (`margin-top: 8px`): `14px`, `#334155`, `line-height: 1.6`. (PRD 원본 약력 전체를 깔끔하게 2~3줄로 표시).
  4. **대표 AI Tool 태그** (`margin-top: 16px`, `display: flex; flex-wrap: wrap; gap: 6px;`):
     - 칩 스타일: `background: #EEF1F4; color: #051C2C; font-size: 12px; font-weight: 500; padding: 3px 8px; border-radius: 2px;`
     - 카드 뷰 대표 태그:
       - 조하영: `ChatGPT`, `Gemini`, `NotebookLM`, `Cursor`, `Codex`
       - 최재현: `Claude Code`, `Codex`, `ChatGPT`
       - 박노아: `Codex`, `Claude`
       - 김영후: `ChatGPT`, `Claude`
       - 조한솔: `Claude`, `ChatGPT`
  5. **구분선** (`margin-top: auto; padding-top: 18px; border-top: 1px solid #DCE1E7;` — 모든 카드의 하단 영역이 수평 정렬되도록 `margin-top: auto` 적용).
  6. **발표 희망 주제 미리보기**:
     - 라벨: `PROPOSED TOPIC` (`JetBrains Mono`, `10.5px`, `#526071`, `tracking: 0.08em`)
     - 내용: PRD 원본 발표 희망 주제 (`14px`, `600`, `#051C2C`, `line-height: 1.5`, 최대 2줄).
  7. **Footer Action** (`margin-top: 16px`, `display: flex; align-items: center; justify-content: space-between;`):
     - 텍스트: `상세 프로필 보기 (6개 항목)` (`13px`, `600`, `#1746D6`)
     - 아이콘: `→` (`transition: transform var(--duration-fast) var(--ease-editorial)`)

#### 6번째 슬롯: `Next Domain Invitation Card`
- **스타일**: `background: transparent; border: 1px dashed #94A3B8; padding: 28px; display: flex; flex-direction: column; justify-content: space-between;`
- **호버 상태**: `background: #FFFFFF; border-style: solid; border-color: #0B6E4F;`
- **콘텐츠**:
  - 상단 배지: `AI in [ X ]` (`JetBrains Mono`, `12px`, `#0B6E4F`, Bold) + 점선 모노그램 박스 `X` (`40×40px`, `border: 1px dashed #0B6E4F; color: #0B6E4F; font-family: var(--font-serif); font-style: italic;`)
  - 제목: `다음 도메인의 주인공을 기다립니다` (`20px`, Bold, `#051C2C`)
  - 설명: `법률, 의료, 디자인, 마케팅, 제조 등 기존 5개 영역 외 새로운 'X'로 시너지를 확장할 실무자·연구자를 환영합니다.` (`14px`, `#526071`)
  - CTA 링크 (`<a href="#join-us">`): `Join Us로 이동하기 →` (`13.5px`, `600`, `#0B6E4F`)

#### 멤버 상세 Slide-over Editorial Drawer 규격
- **채택 이유**: 6개 상세 항목(자기소개, AI Tool, 활용방식, 어려운 점, 발표 주제, 기대점)을 빠짐없이 쾌적하게 읽으려면 세로 가독성과 문맥 유지력이 뛰어난 **우측 Slide-over Drawer**가 모달보다 적합합니다.
- **크기 및 위치**:
  - Desktop/Tablet: `position: fixed; top: 0; right: 0; width: min(580px, 100vw); height: 100dvh; background: #FFFFFF; z-index: 310; box-shadow: var(--shadow-drawer);`
  - Mobile (`<= 767px`): `width: 100vw; height: 100dvh;` (풀스크린 시트)
  - Backdrop: `position: fixed; inset: 0; background: rgba(5, 28, 44, 0.52); z-index: 300;`
- **진입/퇴장 모션**:
  - 열림: `transform: translateX(100%)` → `translateX(0)` (`420ms var(--ease-editorial)`), 배경 opacity `0 → 1`.
  - 닫힘: 반대 방향 (`260ms`).
- **3단 내부 구조 (Sticky Header + Scrollable Body + Sticky Footer)**:
  1. **Sticky Header** (`padding: 24px 32px 20px; border-bottom: 1px solid #DCE1E7; background: #FFFFFF;`):
     - Top Meta: `MEMBER PROFILE · 01 / 05` (`JetBrains Mono`, `11px`, `#526071`) + 우측 닫기 버튼(`40×40px`, `border: 1px solid #DCE1E7`, hover 시 `#051C2C` 보더, `aria-label="상세 프로필 닫기"`).
     - Identity Block (`margin-top: 16px`): `48×48px` 네이비 모노그램 + 이름(`26px` Bold `#051C2C`) + 도메인 배지(`AI in Consulting · 컨설팅`, `#1746D6`).
  2. **Scrollable Body** (`padding: 28px 32px; overflow-y: auto; flex: 1;`):
     - **6개 필수 항목 전체 표시 (PRD 원본 텍스트 100% 반영, 누락·축약 금지)**:
       - `01` **자기소개**: 기본 본문 블록 (`15px`, `#051C2C`, line-height `1.7`).
       - `02` **자주 사용하는 AI Tool**: 원본 문자열 전체 표시(예: `메인 · ChatGPT, Gemini / 장표 · NotebookLM / 코딩 · Cursor, Codex`) + 하단 툴 칩 병기.
       - `03` **현재 AI 활용방식**: 슬래시(`/`)로 구분된 항목을 가독성 높은 에디토리얼 불릿 리스트 또는 구조화된 문단으로 원본 문구 손실 없이 표시.
       - `04` **AI 활용 시 어려운 부분**: `background: #F7F7F5; border-left: 3px solid #526071; padding: 16px 20px;` (고민·병목 지점을 시각적으로 구분).
       - `05` **발표해보고 싶은 주제**: `background: #EDF2FF; border-left: 3px solid #1746D6; padding: 16px 20px;` + 하단에 `관련 스터디 트랙 보기 ↓` 링크(클릭 시 드로어를 닫고 `#topics`의 해당 도메인 탭을 자동 활성화!).
       - `06` **스터디를 통해 기대하는 점**: 기본 본문 블록 (`15px`, `#334155`).
  3. **Sticky Footer (이전/다음 멤버 빠른 전환)** (`padding: 16px 32px; border-top: 1px solid #DCE1E7; background: #F7F7F5; display: flex; justify-content: space-between; align-items: center;`):
     - 좌측 버튼: `← 이전` + 이전 멤버 이름 (예: `← 조한솔`) — 순환 이동(1번에서 이전 클릭 시 5번으로 이동).
     - 중앙 표시: `1 / 5` (`JetBrains Mono`, `12px`, `#526071`).
     - 우측 버튼: 다음 멤버 이름 + `다음 →` (예: `최재현 →`).
- **키보드 & 접근성 스펙 (필수)**:
  - 속성: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="drawer-member-name"`.
  - 열릴 때: `body` 스크롤 잠금, 드로어 닫기 버튼 또는 드로어 컨테이너로 초기 포커스 이동.
  - 포커스 트랩: 드로어가 열려 있는 동안 `Tab` / `Shift + Tab` 포커스가 드로어 내부에서만 순환.
  - 단축키: `Escape` 닫기, `ArrowLeft` 이전 멤버, `ArrowRight` 다음 멤버.
  - 닫힐 때: 드로어를 열었던 원래 트리거 버튼으로 포커스 정확히 복귀 (`lastFocusedElement.focus()`).

---

### 4.5 Section 3 — 분야별 스터디 주제 (`#topics`)

#### 섹션 헤더
- 좌측: `03 / RESEARCH TRACKS` · `Study Topics`
- 우측: H2 `"분야별 스터디 주제"` + 서브 카피 `"각 도메인의 실전 과제에서 도출된 6대 중점 세션 트랙입니다. 도메인 필터로 관심 주제를 탐색하고, 연관 멤버의 상세 프로필을 바로 확인할 수 있습니다."`

#### 도메인 필터 탭 Bar (`role="tablist"`)
- **스타일**: 에디토리얼 언더라인 탭 바 (`border-bottom: 1px solid #DCE1E7; display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none;`).
- **탭 목록 (7개)**:
  - `전체` (`all`, 기본 활성) · `Consulting` · `Research` · `Development` · `Investment` · `Solopreneur` · `Cross-Domain`
  - 각 탭 옆에 건수 표시 선택 가능(예: `전체 (6)`).
- **상태 규격**:
  - Default: `padding: 12px 16px; font-size: 14px; font-weight: 500; color: #526071; border-bottom: 2px solid transparent; white-space: nowrap;`
  - Hover: `color: #051C2C;`
  - Active (`aria-selected="true"`): `color: #051C2C; font-weight: 700; border-bottom-color: #1746D6;`
- **스크린리더 피드백**: 필터 변경 시 숨김 또는 소형 상태 텍스트(`aria-live="polite"`)로 `"N개의 스터디 주제가 표시됩니다."` 안내.

#### 6대 핵심 주제 인덱스 카드 그리드
- **그리드**: Desktop `3 Columns` (전체 보기 시 3×2 대칭), Tablet `2 Columns`, Mobile `1 Column`, `gap: 24px`.
- **카드 스펙**:
  - `background: #FFFFFF; border: 1px solid #DCE1E7; padding: 28px; display: flex; flex-direction: column; transition: border-color var(--duration-fast) var(--ease-editorial);`
  - Hover: `border-color: #051C2C;` + 상단 인덱스 숫자 `#1746D6` 전환.
  - **내부 구조**:
    1. **Header Row**: 좌측 트랙 번호 `01` ~ `06` (`Newsreader`, `26px`, `#94A3B8`) + 우측 도메인 태그 (`11.5px`, `JetBrains Mono`, `padding: 4px 10px; border-radius: 2px; background: #EEF1F4; color: #051C2C;` — `Cross-Domain`만 `background: #EDF2FF; color: #1746D6;`).
    2. **주제 타이틀** (`margin-top: 16px`): `20px`, `700`, `#051C2C`, `line-height: 1.3`.
    3. **설명** (`margin-top: 10px`): `14.5px`, `#334155`, `line-height: 1.65`.
    4. **핵심 키워드** (`margin-top: 16px`): 2~3개 텍스트 메타 (`12px`, `#526071`, 예: `NotebookLM · 리서치→장표 워크플로`).
    5. **연관 멤버 연계 Footer** (`margin-top: auto; padding-top: 18px; border-top: 1px solid #DCE1E7;`):
       - 라벨: `RELATED MEMBER` (`10.5px`, `JetBrains Mono`, `#526071`)
       - 연관 멤버 배지 버튼 (`button[data-member-id]`): `display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: #F7F7F5; border: 1px solid #DCE1E7; font-size: 12.5px; font-weight: 600; color: #051C2C; border-radius: 2px;`
       - Hover: `border-color: #1746D6; color: #1746D6; background: #EDF2FF;`
       - **클릭 동작**: 클릭 시 즉시 해당 멤버의 Slide-over 상세 프로필 드로어 오픈!

#### 6대 주제 ↔ 도메인 ↔ 연관 멤버 매핑 테이블 (데이터 정확성 기준)

| # | 주제명 | 도메인 필터 | 핵심 설명 요약 (PRD 기준) | 연관 멤버 배지 (클릭 연계) |
| :--- | :--- | :--- | :--- | :--- |
| `01` | **AI 슬라이드 제작** | `Consulting` | AI를 활용해 원하는 장표 아웃풋을 빠르게 만드는 실전 방법 (NotebookLM, LLM 기반 리서치→장표 워크플로) | `조하영` |
| `02` | **연구용 에이전트** | `Research` | Research를 위한 AI Agent 환경·워크플로 설정, 코드/글쓰기 에이전트 활용 및 환각 검증·신뢰성 확보 | `최재현` |
| `03` | **AI 에이전트 시스템 구축** | `Cross-Domain` | 단일 프롬프트를 넘어 여러 도구와 에이전트를 연결하는 자동화 시스템 설계 | `최재현` · `박노아` · `김영후` |
| `04` | **유지보수 가능 MVP (Harness)** | `Development` | 탄탄한 개발 하네스(Harness) 구축과 AI 기반 유지보수 가능한 프로덕트 개발 방법론 | `박노아` |
| `05` | **업무 생산성 향상 위한 자동화** | `Investment` | 투자메모 리서치 단축, 재무추정 로직 검증 등 실무 파이프라인 자동화 및 생산성 극대화 | `김영후` |
| `06` | **AI 기반 퍼스널브랜딩** | `Solopreneur` | 인스타그램 브랜딩 전략, 팔로워가 소장하고 싶은 콘텐츠·자료 기획, 관점의 수익화 | `조한솔` |

#### 하단 `"What else...?"` 오픈 트랙 배너
- **배치**: 6대 주제 카드 그리드 하단 `margin-top: 32px`.
- **스타일**: `background: #051C2C; color: #FFFFFF; border-left: 4px solid #4ADEB5; padding: 36px 40px; border-radius: 2px;` (Mobile `28px 24px`).
- **레이아웃**: Desktop `12컬럼` 좌측 8컬럼 + 우측 4컬럼 수직 중앙 정렬 (Mobile 1열 스택).
- **콘텐츠**:
  - Kicker: `OPEN TRACK · 07+` (`JetBrains Mono`, `11.5px`, `#4ADEB5`, `tracking: 0.14em`)
  - Headline: `What else...?` (`Newsreader` Italic, `clamp(1.75rem, 2.2vw, 2.25rem)`, `#FFFFFF`)
  - Description: `스터디 진행과 새로운 도메인(X)의 합류에 따라 아젠다는 지속적으로 확장됩니다. 법률, 의료, 디자인, 마케팅 등 당신의 분야에서 탐구하고 싶은 AI 주제를 제안해 주세요.` (`15px`, `#B8C7D6`, `max-width: 58ch`)
  - 우측 CTA 버튼 (`<a href="#join-us">`): `새 주제 제안 & 참여하기 →` (`background: #FFFFFF; color: #051C2C; height: 48px; padding: 0 24px; font-weight: 600; border-radius: 2px;` → Hover `background: #4ADEB5;`).

---

### 4.6 Section 4 — Join Us (`#join-us`)

#### 레이아웃
- **Desktop (`>= 1024px`)**: `12컬럼` 2분할 — 좌측 `span 5` (참여 안내 & 참여 유형 카드), 우측 `span 7` (인터랙티브 지원 폼 카드). `gap: 48px`.
- **Tablet / Mobile (`<= 1023px`)**: 1열 스택 (안내 상단 → 폼 하단, `gap: 36px`).

#### 좌측: 참여 안내 & 참여 유형
1. **섹션 헤더**: `04 / JOIN US` + H2 `"새로운 'X'로 함께할 분을 찾습니다"` + 리드 문장 `"기존 5개 도메인 외 법률, 의료, 디자인, 마케팅, 제조 등 다양한 현업의 실무자·연구자와 함께 AI 활용의 지평을 넓혀갑니다."`
2. **참여 유형 카드 2종** (`margin-top: 28px`, `display: flex; flex-direction: column; gap: 16px;`):
   - **Regular Member (정기 멤버)**: `background: #FFFFFF; border: 1px solid #DCE1E7; border-left: 3px solid #1746D6; padding: 20px 24px;`
     - 설명: 격주 정기 세션(약 10회)에 참여해 자신의 도메인 AI 사례를 발표하고, 심층 토의로 서로의 강점을 체화합니다.
   - **Guest Speaker & Networking (게스트 연사 · 교류)**: `background: #FFFFFF; border: 1px solid #DCE1E7; border-left: 3px solid #0B6E4F; padding: 20px 24px;`
     - 설명: 특정 분야의 실전 AI 워크플로를 게스트 세션으로 공유하거나, 스터디 구성원과의 교류·협업을 제안합니다.
3. **운영 문화 요약** (`margin-top: 28px`, `border-top: 1px solid #DCE1E7; padding-top: 20px;`):
   - 3개 간결 항목(`14px`, `#334155`, 좌측 `—` 대시):
     - `2026년 7월 25일 킥오프 · 12월까지 격주 정기 세션`
     - `실무 적용과 검증에 초점을 둔 솔직한 경험 공유`
     - `기존 5개 도메인 외 새로운 전문 영역(X) 적극 환영`

#### 우측: Static-Site Friendly 지원/문의 폼 카드
- **컨테이너**: `background: #FFFFFF; border: 1px solid #DCE1E7; border-top: 3px solid #051C2C; padding: 40px;` (Mobile `28px 20px`).
- **폼 헤더**: `스터디 참여 · 문의 신청서` (`20px` Bold `#051C2C`) + 안내 문구 `작성하신 내용은 즉시 신청 요약본으로 생성되어 이메일 발송 또는 클립보드 복사가 가능합니다.` (`13.5px`, `#526071`).

##### 입력 필드 규격 (`novalidate` 적용 후 커스텀 클라이언트 검증)

| 필드명 | 타입 | 레이아웃 | 필수 | Placeholder / 옵션 | 검증 규칙 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **이름** | `text` | Desktop 좌측 50% | 필수 | `홍길동` | 공백 제외 2자 이상 |
| **이메일** | `email` | Desktop 우측 50% | 필수 | `name@example.com` | 표준 이메일 정규식 검사 |
| **전문 도메인** | `text` (Prefix 그룹) | 100% | 필수 | 앞부분 고정 어돈 `[ AI in ]` + 입력 `예: Healthcare, Legal, Design` | 공백 제외 2자 이상 |
| **참여 유형** | `radio` (3개 세그먼트 카드) | Desktop 3열 / Mobile 1열 | 필수 | `정기 멤버` / `게스트 세션` / `네트워킹·문의` (기본값 `정기 멤버`) | 선택 필수 |
| **현재 AI 활용 및 나누고 싶은 주제** | `textarea` (4행) | 100% | 필수 | `현재 업무·연구에서 AI를 활용하는 방식과 스터디에서 나누고 싶은 주제를 간단히 적어주세요.` | 최소 10자 이상, 최대 500자 (우측 하단 실시간 글자수 카운터 `0 / 500`) |

##### 인풋 및 버튼 상태 스타일
- **Input / Textarea Default**: `height: 46px` (textarea `min-height: 112px`), `padding: 10px 14px; border: 1px solid #C5CDD8; border-radius: 2px; font-size: 15px; color: #051C2C; background: #FFFFFF;`
- **Domain Prefix Group (`AI in [   ]`)**: 좌측 고정 어돈 `padding: 0 14px; background: #F7F7F5; border: 1px solid #C5CDD8; border-right: 0; font-family: var(--font-serif); font-weight: 600; color: #051C2C;` + 우측 인풋. 포커스 시 래퍼 전체에 블루 보더 강조(`:focus-within`).
- **Radio Segment Card**: 기본 `border: 1px solid #DCE1E7; padding: 12px 14px; cursor: pointer;`, 선택됨(`:checked`): `border-color: #1746D6; background: #EDF2FF; color: #051C2C; font-weight: 600;`.
- **Focus**: `border-color: #1746D6; box-shadow: var(--shadow-focus); outline: none;`
- **Error State**: `border-color: #B91C1C; background: #FEF2F2;`, 필드 하단에 에러 텍스트(`12.5px`, `#B91C1C`, `role="alert"`), `aria-invalid="true"` + `aria-describedby` 연결.
- **Submit Button**: `width: 100%; height: 50px; background: #051C2C; color: #FFFFFF; font-size: 15px; font-weight: 600; border-radius: 2px;` → Hover `background: #1746D6;`.

##### 제출 후 상태 (Submission Summary & Static Action View)
유효성 검사를 통과하면 폼 입력 영역이 부드럽게 **제출 요약 패널**로 전환됩니다(`aria-live="polite"`로 상태 안내, 패널 상단으로 포커스 이동).
1. **성공 상태 배너**: `background: #E8F5F0; border: 1px solid rgba(11, 110, 79, 0.25); padding: 14px 16px; color: #0B6E4F; font-size: 14px; font-weight: 600;`
   - 문구: `✓ 신청 내용 요약이 준비되었습니다. 아래 버튼으로 메일을 발송하거나 내용을 복사해 전달해 주세요.`
2. **신청 요약 카드** (`background: #F7F7F5; border: 1px solid #DCE1E7; padding: 20px 24px; margin-top: 20px;`):
   - `<dl>` 키-값 그리드(1px 헤어라인 행 구분): `이름`, `이메일`, `전문 도메인 (AI in ...)`, `참여 유형`, `AI 활용 및 희망 주제`.
3. **Action 버튼 그룹** (`margin-top: 24px`, Desktop 2열 균등 / Mobile 1열 스택, `gap: 12px`):
   - **이메일로 보내기 (`mailto:`)**: Primary Blue (`#1746D6`, `#FFFFFF` 텍스트, height `48px`). 제목 `[AI in X 참여 문의] AI in {도메인} - {이름}` 및 포맷팅된 본문 자동 인코딩.
   - **신청 내용 복사하기**: Secondary Outline (`1px solid #051C2C`, `#051C2C` 텍스트, height `48px`). 클릭 시 `navigator.clipboard.writeText()` (폴백 `execCommand` 지원) 실행 후 버튼 라벨이 2.5초간 `✓ 클립보드에 복사됨` (`#0B6E4F` 보더·텍스트)으로 변경.
4. **보조 액션** (`margin-top: 16px`, 중앙 정렬):
   - `← 입력 내용 수정하기` (텍스트 링크 버튼 — 클릭 시 입력값이 유지된 상태로 폼 편집 화면 복귀).
5. **추후 외부 폼 연동 확장성 (`js/data.js` 설정 규격)**:
   - `SITE_CONFIG.contactEmail`: 기본 수신 이메일(예: `ai-in-x-study@example.com`, 추후 운영진 실제 메일로 교체)
   - `SITE_CONFIG.externalFormUrl`: 추후 Formspree 엔드포인트 또는 Google Forms URL 입력 시 즉시 연동 가능한 구조로 분리.

---

### 4.7 Footer

- **배경**: `background: #051C2C; color: #FFFFFF; padding-block: 56px 36px;`
- **상단 행** (`display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 32px; padding-bottom: 36px; border-bottom: 1px solid rgba(255, 255, 255, 0.16);`):
  - **좌측 브랜드 블록**:
    - 워드마크: `AI in X Study` (`Newsreader`, `26px`, `#FFFFFF`, `X`는 `#7BA4FF` italic)
    - 메타 문구: `Kick-off 2026.07.25 · Bi-weekly Study Group` (`JetBrains Mono`, `12.5px`, `#B8C7D6`, `margin-top: 8px`)
  - **우측 퀵 링크 & Top 버튼**:
    - 섹션 링크 (`gap: 24px`, `14px`, `#B8C7D6` → hover `#FFFFFF`): `스터디 목적`, `멤버 소개`, `스터디 주제`, `Join Us`
    - 맨 위로 버튼: `Top ↑` (`12.5px` Mono, `border: 1px solid rgba(255,255,255,0.24); padding: 6px 12px; color: #FFFFFF;` → hover `border-color: #7BA4FF; color: #7BA4FF;`)
- **하단 행** (`padding-top: 24px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-size: 12.5px; color: #B8C7D6;`):
  - 좌측: `© 2026 AI in X Study. All rights reserved.`
  - 우측: `Consulting · Research · Development · Investment · Solopreneur`

---

## 5. 인터랙션, 마이크로 모션 & 접근성 가이드

### 5.1 모션 철학 및 타이밍
- **Easing**: `--ease-editorial: cubic-bezier(0.22, 1, 0.36, 1)` (단호하고 매끄러운 감속, 바운스 금지).
- **Duration**:
  - 미세 상태 전환(색상, 보더, 화살표 이동): `160ms`
  - 탭 전환, 필터 전환, 폼 상태 전환: `260ms`
  - Slide-over Drawer 개폐, 스크롤 리빌: `420ms`

### 5.2 스크롤 리빌 (Progressive Enhancement)
- `IntersectionObserver` (`threshold: 0.12`, `rootMargin: "0px 0px -40px 0px"`)를 사용해 섹션 블록 및 카드가 뷰포트 진입 시 1회만 부드럽게 등장합니다(`opacity: 0; transform: translateY(16px)` → `opacity: 1; transform: translateY(0)`).
- **안전장치**: `<html>`에 JS 로드 직후 `.js-motion` 클래스를 부여한 경우에만 초기 `opacity: 0`을 적용하여, JS 오류나 차단 환경에서도 모든 콘텐츠가 즉시 보이도록 보장합니다.
- 카드 그리드 스태거(Stagger): 카드 간 `50ms` 이내 미세 지연(`0ms, 50ms, 100ms`)만 허용(과도한 지연 금지).

### 5.3 컨설팅 스타일 호버(Hover) 패턴
- **텍스트 링크**: 호버 시 컬러가 `#1746D6`로 전환되며 하단 `1px` 밑줄이 표시됩니다.
- **CTA 버튼**: 배경색 전환(`#051C2C` → `#1746D6`)과 함께 우측 화살표 아이콘만 `transform: translateX(4px)` 이동합니다.
- **프로필·주제 카드**: 과도한 떠오름(`translateY`) 없이 **상단 2px 보더가 `#1746D6`로 점등 + 외곽선 명도 강화 + 내부 액션 화살표 `4px` 이동**으로 정제된 반응을 제공합니다.

### 5.4 포커스 링 & 키보드 내비게이션
- 모든 인터랙티브 요소(`a`, `button`, `input`, `textarea`, `[tabindex="0"]`):
  ```css
  :focus-visible {
    outline: 2px solid var(--color-accent-blue);
    outline-offset: 3px;
  }
  .surface-navy :focus-visible,
  footer :focus-visible {
    outline-color: var(--color-accent-on-dark);
  }
  ```
- **Skip to Content 링크**: `<body>` 최상단에 `<a href="#main-content" class="skip-link">본문 바로가기</a>` 배치 (평소 `sr-only`, 포커스 시 좌상단 고정 표시).
- **시맨틱 랜드마크**: `<header>`, `<nav aria-label="주요 메뉴">`, `<main id="main-content">`, `<section aria-labelledby="...">`, `<article>`, `<aside>` / `<div role="dialog">`, `<footer>`.

### 5.5 `prefers-reduced-motion` 대응 (필수)

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto !important;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## 6. 에셋 전략 & 정적 호스팅 구현 체크리스트

### 6.1 비주얼 에셋 정책 (Zero External Bitmap MVP)
- MVP 단계에서는 **외부 이미지 파일 없이** 에디토리얼 타이포그래피, 순수 인라인 SVG 기하학 다이어그램(`Domain Convergence Matrix`), 네이비 모노그램 아바타(`HY`, `JH`, `NA`, `YH`, `HS`), 인라인 SVG 미니멀 아이콘(`1.5px` stroke)만으로 100% 선명한 레티나 품질과 초고속 로딩을 구현합니다.
- *(추후 확장 가이드)* 실제 멤버 프로필 사진이 확보될 경우: `1:1` 정방형, 상반신 여백이 넉넉한 고대비 모노크롬(흑백 또는 미세 쿨톤) 필터(`filter: grayscale(100%) contrast(1.06)`)를 적용해 모노그램 영역을 교체하면 McKinsey/BCG 파트너 디렉토리 톤을 그대로 유지할 수 있습니다.

### 6.2 권장 파일 구조 (GitHub Pages 호환)

```text
AI in X Web/
├── .nojekyll
├── index.html          # 시맨틱 HTML5 진입점 (상대 경로 참조)
├── css/
│   └── styles.css      # 디자인 토큰 + 전체 반응형 스타일
├── js/
│   ├── data.js         # 멤버 5인, 6대 주제, 타임라인, 연락처 설정 분리
│   └── main.js         # Scroll-spy, Drawer, 필터, SVG 연계, 폼 로직
└── docs/
    ├── prd.md
    └── design-spec.md  # 본 문서
```

### 6.3 개발 완료 전 디자인 검수(QA) 기준
1. **데이터 무결성**: 5명 멤버의 6개 항목 전체, 6대 주제, Why/What/How, 타임라인(Kick-off 7/25, W1~W9)에 오탈자·누락이 없는가?
2. **시각 완성도**: 네온/글래스모피즘/과도한 그림자 없이 1px 헤어라인, 넉넉한 여백, 세리프+산세리프 타이포그래피 위계가 선명한가?
3. **5+1 대칭 그리드**: Desktop 3×2, Tablet 2×3, Mobile 1×6에서 빈 슬롯 없이 균형 있게 렌더링되는가?
4. **크로스-섹션 연계**: 주제 카드의 연관 멤버 배지 클릭 시 멤버 드로어가 열리고, 멤버 드로어의 관련 주제 링크 클릭 시 주제 섹션의 해당 도메인 탭이 활성화되는가?
5. **접근성 & 반응형**: 1440px, 1280px, 768px, 375px에서 가로 스크롤 `0px`, 드로어 키보드(`ESC`, `Tab` 트랩, `←/→`, 포커스 복귀) 및 폼 유효성 검증·복사·`mailto` 동작이 오류 없이 작동하는가?
