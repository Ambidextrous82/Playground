/**
 * AI in X Study — Single Source of Truth (Static Data)
 *
 * [수정 가이드]
 * 1. Google Form 지원서 URL 교체:
 *    - 아래 SITE_CONFIG.googleFormUrl 값을 실제 Google Form 공유 URL로 교체하면
 *      Join Us 섹션의 '구글폼으로 지원하기' CTA 버튼에 즉시 반영됩니다.
 * 2. 멤버 정보 / 스터디 주제 수정:
 *    - MEMBERS, TOPICS 배열을 수정하면 Hero SVG 다이어그램, 멤버 5+1 그리드,
 *      멤버 상세 Slide-over Drawer, 주제 도메인 필터 카드가 자동으로 동기화됩니다.
 */

(function () {
  "use strict";

  const SITE_CONFIG = {
    brandName: "AI in X",
    studyFullName: "AI in X Study",
    studyTagline: "Cross-Domain AI Study Group",
    // [TODO: 배포 전 실제 Google Form URL로 교체하세요]
    // 예: "https://forms.gle/your-actual-form-id"
    googleFormUrl: "https://forms.gle/ai-in-x-study-apply-placeholder",
    googleFormTitle: "AI in X 스터디 지원서 열기",
    copyright: "© 2026 AI in X Study. All rights reserved.",
    domainsSummary:
      "Consulting · Research · Development · Investment · Solopreneur"
  };

  const PURPOSE_PILLARS = [
    {
      index: "01",
      key: "Why",
      headline: "AI 주제의 포괄적·심층적 이해",
      description:
        "단편적인 툴 소개에 그치지 않고, 서로 다른 5개 분야의 시각을 결합해 AI의 구조적 원리와 실무적 한계까지 입체적으로 이해합니다.",
      metaTag: "Breadth & Depth"
    },
    {
      index: "02",
      key: "What",
      headline: "활용 사례 공유 및 주제별 딥다이브",
      description:
        "컨설팅 장표, 연구·코딩 에이전트, 개발 하네스, 투자 자동화, 브랜딩까지 실제 업무 활용 사례를 공유하고 핵심 아젠다를 깊게 파고듭니다.",
      metaTag: "Real Cases & Deep-Dive"
    },
    {
      index: "03",
      key: "How",
      headline: "정기 세션 및 특별 세션 운영",
      description:
        "정기적인 세션에서 구성원 순번 발표와 심층 토의를 진행하며, 주요 이슈나 게스트 초청 등 경우에 따라 특별 세션을 함께 운영합니다.",
      metaTag: "Regular & Special Sessions"
    }
  ];

  const MEMBERS = [
    {
      id: "hy",
      order: "01",
      name: "조하영",
      monogram: "HY",
      domainKey: "Consulting",
      domainLabel: "AI in Consulting",
      domainKo: "컨설팅",
      summaryTrack: "AI 슬라이드 제작",
      toolTags: ["ChatGPT", "Gemini", "NotebookLM", "Cursor", "Codex"],
      intro:
        "Kearney 4년차 컨설턴트로, VC 애널리스트와 스타트업 CSO 경험을 갖추고 있으며 현재는 육아휴직 중 육아와 공부를 병행하고 있습니다.",
      aiTools:
        "메인 · ChatGPT, Gemini / 장표 · NotebookLM / 코딩 · Cursor, Codex",
      currentUsage:
        "AI와 자주 대화하며 익숙해지는 중 / 최신 트렌드를 꾸준히 팔로업 / 최근에는 개발도 공부 중",
      challenges:
        "새로운 도구와 기능은 빠르게 늘지만 실제 업무 방식으로 체화하지 못한다는 느낌이 있음",
      presentationTopic:
        "AI를 활용해 원하는 장표 아웃풋을 빠르게 만드는 실전 방법",
      expectations:
        "긍정적인 자극을 주고받고 서로의 강점을 흡수해 각자의 방식으로 만들기"
    },
    {
      id: "na",
      order: "02",
      name: "박노아",
      monogram: "NA",
      domainKey: "Development",
      domainLabel: "AI in Development",
      domainKo: "개발",
      summaryTrack: "유지보수 가능 MVP (Harness)",
      toolTags: ["Codex", "Claude"],
      intro:
        "연세대학교 경영학과를 졸업해 4.5년간 VC 투자 경력을 쌓았으며, 현재 버클리 MBA 과정을 밟고 있습니다.",
      aiTools: "Codex, Claude",
      currentUsage:
        "사업용 앱·게임과 리소스 제작 / 자체 하네스를 활용한 개발 / 유지보수 가능한 앱 개발을 지향",
      challenges:
        "단순 하네스에서 AI Agent 기반 완전 자동화로 전환하고 싶지만 체계적인 학습이 어려움",
      presentationTopic:
        "유지보수 가능한 MVP 개발법 / 탄탄한 개발 하네스 구축법",
      expectations: "AI를 어떻게 가치 있게 활용할 수 있는지 탐색"
    },
    {
      id: "yh",
      order: "03",
      name: "김영후",
      monogram: "YH",
      domainKey: "Investment",
      domainLabel: "AI in Investment",
      domainKo: "투자",
      summaryTrack: "업무 생산성 향상 위한 자동화",
      toolTags: ["ChatGPT", "Claude"],
      intro:
        "University of Texas at Austin에서 경제학을 전공하고, 현재 KDB Silicon Valley LLC에서 VC 투자 1년차로 일하고 있습니다.",
      aiTools: "ChatGPT, Claude",
      currentUsage:
        "ChatGPT로 투자메모 리서치 단축 / Claude로 재무추정 로직 검증과 작성 가이드 확보",
      challenges:
        "원하는 결과를 얻는 프롬프트 작성 / 여러 도구를 연결한 자동화 방법",
      presentationTopic:
        "AI Agent를 활용한 업무 자동화 / 생산성을 높이는 AI 활용법",
      expectations:
        "다양한 직무의 AI 활용 사례를 배우고 투자 업무에 직접 적용"
    },
    {
      id: "hs",
      order: "04",
      name: "조한솔",
      monogram: "HS",
      domainKey: "Solopreneur",
      domainLabel: "AI in Solopreneur",
      domainKo: "1인 기업",
      summaryTrack: "AI 기반 퍼스널브랜딩",
      toolTags: ["Claude", "ChatGPT"],
      intro:
        "연세대학교에서 신학과 경영학을 전공했으며, 5년차 1인 기업 경영 컨설팅과 함께 생각과 관점의 수익화를 연구하고 있습니다.",
      aiTools: "Claude · 코딩 / ChatGPT · 글쓰기와 아이디어 기획",
      currentUsage:
        "AI 차별화 기획 강의 운영 / 바이브 코딩으로 명상 앱 출시 / AI 유형검사 제작",
      challenges:
        "매일 등장하는 새로운 기능을 지속적으로 따라가기 어려움",
      presentationTopic:
        "인스타그램 브랜딩 전략 / 팔로워가 소장하고 싶은 자료 기획",
      expectations:
        "서로 다른 분야의 참여자들이 AI를 활용하는 맥락 이해"
    }
  ];

  const TOPIC_FILTERS = [
    { key: "all", label: "전체" },
    { key: "Consulting", label: "Consulting" },
    { key: "Research", label: "Research" },
    { key: "Development", label: "Development" },
    { key: "Investment", label: "Investment" },
    { key: "Solopreneur", label: "Solopreneur" },
    { key: "Cross-Domain", label: "Cross-Domain" }
  ];

  const TOPICS = [
    {
      id: "topic-01",
      number: "01",
      title: "AI 슬라이드 제작",
      domain: "Consulting",
      description:
        "AI를 활용해 원하는 장표 아웃풋을 빠르게 만드는 실전 방법 (NotebookLM, LLM 기반 리서치→장표 워크플로)",
      keywords: ["NotebookLM", "리서치→장표 워크플로", "실전 장표 아웃풋"],
      memberIds: ["hy"]
    },
    {
      id: "topic-02",
      number: "02",
      title: "연구용 에이전트",
      domain: "Research",
      description:
        "Research를 위한 AI Agent 환경·워크플로 설정, 코드/글쓰기 에이전트 활용 및 환각 검증·신뢰성 확보",
      keywords: ["Claude Code · Codex", "연구 워크플로", "환각 검증·신뢰성"],
      memberIds: ["na"]
    },
    {
      id: "topic-03",
      number: "03",
      title: "AI 에이전트 시스템 구축",
      domain: "Cross-Domain",
      description:
        "단일 프롬프트를 넘어 여러 도구와 에이전트를 연결하는 자동화 시스템 설계",
      keywords: ["멀티 툴 연계", "에이전트 오케스트레이션", "실무 자동화"],
      memberIds: ["hy", "na", "yh"]
    },
    {
      id: "topic-04",
      number: "04",
      title: "유지보수 가능 MVP (Harness)",
      domain: "Development",
      description:
        "탄탄한 개발 하네스(Harness) 구축과 AI 기반 유지보수 가능한 프로덕트 개발 방법론",
      keywords: ["개발 하네스(Harness)", "유지보수 가능 MVP", "프로덕트 엔지니어링"],
      memberIds: ["na"]
    },
    {
      id: "topic-05",
      number: "05",
      title: "업무 생산성 향상 위한 자동화",
      domain: "Investment",
      description:
        "투자메모 리서치 단축, 재무추정 로직 검증 등 실무 파이프라인 자동화 및 생산성 극대화",
      keywords: ["투자메모 리서치", "재무추정 로직 검증", "파이프라인 자동화"],
      memberIds: ["yh"]
    },
    {
      id: "topic-06",
      number: "06",
      title: "AI 기반 퍼스널브랜딩",
      domain: "Solopreneur",
      description:
        "인스타그램 브랜딩 전략, 팔로워가 소장하고 싶은 콘텐츠·자료 기획, 관점의 수익화",
      keywords: ["인스타그램 브랜딩", "소장형 자료 기획", "관점의 수익화"],
      memberIds: ["hs"]
    }
  ];

  const OPEN_TRACK = {
    kicker: "OPEN TRACK · 07+",
    title: "What else...?",
    description:
      "스터디 진행과 새로운 도메인(X)의 합류에 따라 아젠다는 지속적으로 확장됩니다.\n법률, 의료, 디자인, 마케팅 등 당신의 분야에서 탐구하고 싶은 AI 주제를 제안해 주세요.",
    ctaLabel: "새 주제 제안 & 참여하기"
  };

  const JOIN_OPTIONS = [
    {
      id: "regular",
      accent: "blue",
      badge: "TRACK 01 · REGULAR MEMBER",
      title: "Regular Member (정기 멤버)",
      description:
        "정기 세션에 참여해 자신의 도메인 AI 활용 사례를 발표하고, 심층 토의를 통해 서로의 강점을 각자의 업무 방식으로 체화합니다."
    },
    {
      id: "guest",
      accent: "emerald",
      badge: "TRACK 02 · GUEST & NETWORKING",
      title: "Guest Speaker & Networking (게스트 연사 · 교류)",
      description:
        "특정 분야의 실전 AI 워크플로를 게스트 세션으로 공유하거나, 스터디 구성원과의 도메인 교류 및 협업을 제안할 수 있습니다."
    }
  ];

  window.AI_IN_X_DATA = {
    SITE_CONFIG,
    PURPOSE_PILLARS,
    MEMBERS,
    TOPIC_FILTERS,
    TOPICS,
    OPEN_TRACK,
    JOIN_OPTIONS
  };
})();
