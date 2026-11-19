# AI in X Study — 공식 홈페이지 MVP

서로 다른 5개 도메인(**컨설팅, 연구, 개발, 투자, 1인 기업**)의 실무자와 연구자가 모여 AI 실전 활용 사례를 공유하고 주제별 딥다이브를 진행하는 **`AI in X` 스터디**의 공식 소개 웹페이지 MVP입니다.

별도의 빌드 도구 없이 순수 HTML / CSS / Vanilla JS로 구현되어 **GitHub Pages (`github.io`)** 에 즉시 정적 배포할 수 있습니다.

---

## 주요 구성 섹션

1. **Global Sticky Navigation & Mobile Drawer** — 스크롤 스파이(Scroll-spy), 모바일 슬라이드 드로어, 키보드(`ESC` / 포커스 트랩) 대응
2. **Hero + Domain Convergence Matrix** — 에디토리얼 헤드라인/CTA 및 순수 인라인 SVG 인터랙티브 다이어그램(5+X 도메인 노드 hover/focus/click 연계)
3. **01 / Purpose** — Why / What / How 3-컬럼 에디토리얼 프레임워크 (정기 세션 및 필요 시 특별 세션 운영 방식)
4. **02 / Members** — 5인 + Next Domain Invitation Card (`5+1` 대칭 그리드) 및 6개 상세 항목 전체를 열람할 수 있는 Slide-over Editorial Drawer(이전/다음 순환, `ESC`/`←`/`→`, 포커스 트랩 & 복귀)
5. **03 / Research Tracks (Topics)** — 도메인 필터 탭(`전체`, `Consulting`, `Research`, `Development`, `Investment`, `Solopreneur`, `Cross-Domain`), 6대 핵심 트랙 카드(연관 멤버 드로어 양방향 연계), `"What else...?"` Open Track 배너
6. **04 / Join Us** — 참여 유형(Regular Member / Guest Speaker & Networking) 안내 및 Google Form 지원 카드(공유 항목, 3단계 합류 절차, Google Form 외부 링크 CTA 버튼)

---

## 프로젝트 파일 구조

```text
AI in X Web/
├── .nojekyll               # GitHub Pages Jekyll 비활성화
├── index.html              # 시맨틱 HTML5 진입점 (상대 경로 참조)
├── css/
│   └── styles.css          # 디자인 토큰(:root) + 반응형 에디토리얼 스타일
├── js/
│   ├── data.js             # 단일 데이터 소스 (Google Form URL, 운영 프레임워크, 멤버, 주제)
│   └── app.js              # 렌더링 및 인터랙션 로직
├── assets/
│   └── favicon.svg         # AI/X 모노그램 파비콘
├── docs/
│   ├── prd.md
│   └── design-spec.md
└── README.md
```

---

## 콘텐츠 및 Google Form URL 수정 방법 (`js/data.js`)

모든 주요 텍스트와 링크는 [`js/data.js`](./js/data.js)에 분리되어 있어 HTML을 직접 수정하지 않고도 간편하게 업데이트할 수 있습니다.

### 1. Google Form 지원서 URL 교체
현재 디자인 확인용 더미 URL(`https://forms.gle/ai-in-x-study-apply-placeholder`)이 연결되어 있습니다.
실제 배포 전 `js/data.js` 상단의 `SITE_CONFIG.googleFormUrl`을 실제 Google Form 링크로 교체하세요.

```js
const SITE_CONFIG = {
  // ...
  googleFormUrl: "https://forms.gle/실제-구글폼-링크",
  googleFormTitle: "Google Form 지원서 열기"
};
```

### 2. 멤버 정보 수정 및 추가
`js/data.js`의 `MEMBERS` 배열에서 각 구성원의 6개 상세 항목(`intro`, `aiTools`, `currentUsage`, `challenges`, `presentationTopic`, `expectations`)과 `toolTags`를 수정하면 멤버 카드, 상세 Slide-over Drawer, Hero SVG 상태바가 자동으로 동기화됩니다.

### 3. 스터디 주제 수정
`js/data.js`의 `TOPICS` 배열에서 제목, 도메인, 설명, 키워드, 연관 멤버(`memberIds`)를 편집하면 필터 탭 건수와 카드 목록이 자동 반영됩니다.

---

## 로컬 실행 및 확인

정적 파일 기반이므로 아무 정적 서버로나 즉시 확인할 수 있습니다.

```bash
# Node.js 사용 시
npx serve .

# 또는 Python 3 사용 시
python -m http.server 8000
```

브라우저에서 `http://localhost:8000` (또는 안내된 포트)로 접속해 확인합니다.

---

## GitHub Pages 배포 가이드

1. 이 프로젝트 루트 파일(`index.html`, `.nojekyll`, `css/`, `js/`, `assets/`)을 GitHub 리포지토리의 `main` 브랜치에 푸시합니다.
2. GitHub 리포지토리 **Settings → Pages**로 이동합니다.
3. **Build and deployment → Source**에서 `Deploy from a branch`를 선택하고 Branch를 `main` / `/(root)`로 저장합니다.
4. 모든 내부 리소스가 상대 경로(`./css/...`, `./js/...`, `./assets/...`)로 참조되어 있으므로 사용자 도메인(`https://<username>.github.io/`)과 프로젝트 서브패스(`https://<username>.github.io/<repo-name>/`) 모두에서 추가 설정 없이 정상 동작합니다.
