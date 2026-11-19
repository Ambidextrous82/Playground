/**
 * AI in X Study — Main Interactive Application
 * - Data-driven rendering from window.AI_IN_X_DATA
 * - Scroll-spy Navigation & Mobile Menu Drawer (ESC / Focus Trap / Scroll Lock)
 * - Hero SVG Domain Convergence Matrix Interaction
 * - Member Slide-over Editorial Drawer (6 PRD fields, Prev/Next cycle, Keyboard & Focus Trap)
 * - Topics Domain Filter Tabs (Cross-section Member <-> Topic sync)
 * - Progressive Enhancement Scroll Reveal (IntersectionObserver)
 */

(function () {
  "use strict";

  const DATA = window.AI_IN_X_DATA;
  if (!DATA) {
    return;
  }

  const {
    SITE_CONFIG,
    PURPOSE_PILLARS,
    MEMBERS,
    TOPIC_FILTERS,
    TOPICS,
    OPEN_TRACK,
    JOIN_OPTIONS
  } = DATA;

  const memberMap = new Map(MEMBERS.map((member) => [member.id, member]));
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // State
  let activeTopicFilter = "all";
  let activeMemberIndex = -1;
  let isMemberDrawerOpen = false;
  let isMobileNavOpen = false;
  let memberDrawerLastFocus = null;
  let mobileNavLastFocus = null;
  let memberDrawerCloseTimer = null;
  let mobileNavCloseTimer = null;
  let revealObserver = null;

  // Helpers
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getFocusableElements(container) {
    if (!container) return [];
    const selector = [
      'a[href]:not([tabindex="-1"])',
      'button:not([disabled]):not([tabindex="-1"])',
      'input:not([disabled]):not([tabindex="-1"])',
      'textarea:not([disabled]):not([tabindex="-1"])',
      'select:not([disabled]):not([tabindex="-1"])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(", ");

    return Array.from(container.querySelectorAll(selector)).filter(
      (el) => !el.hasAttribute("hidden") && el.offsetParent !== null
    );
  }

  function trapFocus(event, container) {
    if (event.key !== "Tab") return;
    const focusables = getFocusableElements(container);
    if (focusables.length === 0) {
      event.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey) {
      if (
        document.activeElement === first ||
        !container.contains(document.activeElement)
      ) {
        event.preventDefault();
        last.focus();
      }
    } else if (
      document.activeElement === last ||
      !container.contains(document.activeElement)
    ) {
      event.preventDefault();
      first.focus();
    }
  }

  function syncBodyScrollLock() {
    const shouldLock = isMemberDrawerOpen || isMobileNavOpen;
    document.body.classList.toggle("is-scroll-locked", shouldLock);
  }

  function getCloseDelay() {
    return prefersReducedMotion.matches ? 0 : 280;
  }

  /* ========================================================================
     1. Data-Driven Rendering
     ======================================================================== */

  function renderPurpose() {
    const container = document.getElementById("purpose-grid");
    if (!container) return;

    container.innerHTML = PURPOSE_PILLARS.map(
      (pillar) => `
        <article class="purpose-pillar">
          <div class="purpose-pillar__top">
            <span class="purpose-pillar__key">${escapeHtml(pillar.key)}</span>
            <span class="purpose-pillar__index">${escapeHtml(pillar.index)}</span>
          </div>
          <h3 class="purpose-pillar__headline">${escapeHtml(pillar.headline)}</h3>
          <p class="purpose-pillar__desc">${escapeHtml(pillar.description)}</p>
          <p class="purpose-pillar__meta">${escapeHtml(pillar.metaTag)}</p>
        </article>
      `
    ).join("");
  }

  function renderMembers() {
    const container = document.getElementById("members-grid");
    if (!container) return;

    const memberCardsHtml = MEMBERS.map((member, index) => {
      const delay = (index % 3) * 50;
      const delayAttr = delay > 0 ? ` data-reveal-delay="${delay}"` : "";
      const toolsHtml = member.toolTags
        .map((tool) => `<span class="tool-chip">${escapeHtml(tool)}</span>`)
        .join("");

      return `
        <article
          class="member-card reveal"
          data-member-card="${escapeHtml(member.id)}"${delayAttr}
        >
          <div class="member-card__top">
            <div class="member-card__domain-wrap">
              <span class="member-card__domain">${escapeHtml(member.domainLabel)}</span>
              <span class="member-card__domain-ko">${escapeHtml(member.domainKo)}</span>
            </div>
            <div class="monogram" aria-hidden="true">${escapeHtml(member.monogram)}</div>
          </div>

          <h3 class="member-card__name">${escapeHtml(member.name)}</h3>
          <p class="member-card__intro">${escapeHtml(member.intro)}</p>

          <div class="member-card__tools" aria-label="주요 AI 도구">
            ${toolsHtml}
          </div>

          <div class="member-card__bottom">
            <div class="member-card__topic-box">
              <p class="member-card__topic-label">PROPOSED TOPIC</p>
              <p class="member-card__topic">${escapeHtml(member.presentationTopic)}</p>
            </div>

            <button
              type="button"
              class="member-card__trigger"
              data-open-member="${escapeHtml(member.id)}"
              aria-label="${escapeHtml(member.name)} 상세 프로필 보기 (6개 항목)"
            >
              <span>상세 프로필 보기 (6개 항목)</span>
              <span class="member-card__arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      `;
    }).join("");

    const inviteCardHtml = `
      <article class="member-card member-card--invite reveal" data-reveal-delay="100">
        <div>
          <div class="member-card__top">
            <div class="member-card__domain-wrap">
              <span class="member-card__domain">AI in [ X ]</span>
              <span class="member-card__domain-ko">Next Domain</span>
            </div>
            <div class="monogram monogram--open" aria-hidden="true">X</div>
          </div>

          <h3 class="member-card--invite__title">다음 도메인의 주인공을 기다립니다</h3>
          <p class="member-card--invite__desc">
            법률, 의료, 디자인, 마케팅, 제조 등 기존 5개 영역 외 새로운 'X'로 시너지를 확장할 실무자·연구자를 환영합니다.
          </p>
        </div>

        <a href="#join-us" class="member-card--invite__cta">
          <span>Join Us로 이동하기</span>
          <span class="member-card__arrow" aria-hidden="true">→</span>
        </a>
      </article>
    `;

    container.innerHTML = memberCardsHtml + inviteCardHtml;
  }

  function renderTopicTabs() {
    const tabsContainer = document.getElementById("topic-tabs");
    if (!tabsContainer) return;

    tabsContainer.innerHTML = TOPIC_FILTERS.map((filter) => {
      const count =
        filter.key === "all"
          ? TOPICS.length
          : TOPICS.filter((t) => t.domain === filter.key).length;
      const isSelected = filter.key === activeTopicFilter;

      return `
        <button
          type="button"
          class="filter-tab"
          role="tab"
          id="tab-${escapeHtml(filter.key)}"
          aria-controls="topics-grid"
          data-filter-key="${escapeHtml(filter.key)}"
          aria-selected="${isSelected ? "true" : "false"}"
          tabindex="${isSelected ? "0" : "-1"}"
        >
          <span>${escapeHtml(filter.label)}</span>
          <span class="filter-tab__count">(${count})</span>
        </button>
      `;
    }).join("");
  }

  function renderTopics(announce) {
    const grid = document.getElementById("topics-grid");
    const liveStatus = document.getElementById("topics-live-status");
    if (!grid) return;

    grid.setAttribute("aria-labelledby", `tab-${activeTopicFilter}`);

    const filteredTopics =
      activeTopicFilter === "all"
        ? TOPICS
        : TOPICS.filter((topic) => topic.domain === activeTopicFilter);

    grid.innerHTML = filteredTopics
      .map((topic) => {
        const isCross = topic.domain === "Cross-Domain";
        const badgeClass = isCross
          ? "topic-card__badge topic-card__badge--cross"
          : "topic-card__badge";

        const membersHtml = topic.memberIds
          .map((id) => memberMap.get(id))
          .filter(Boolean)
          .map(
            (member) => `
              <button
                type="button"
                class="member-pill-btn"
                data-member-id="${escapeHtml(member.id)}"
                aria-label="${escapeHtml(member.name)} (${escapeHtml(member.domainKo)}) 상세 프로필 열기"
              >
                <span class="member-pill-btn__mono" aria-hidden="true">${escapeHtml(member.monogram)}</span>
                <span>${escapeHtml(member.name)}</span>
              </button>
            `
          )
          .join("");

        const footerContentHtml = membersHtml
          ? `
              <div class="topic-card__members-wrap">
                <span class="topic-card__member-label">RELATED MEMBER</span>
                <div class="topic-card__member-list">
                  ${membersHtml}
                </div>
              </div>
            `
          : `
              <div class="topic-card__members-wrap">
                <span class="topic-card__member-label">FOCUS TRACK</span>
                <div class="topic-card__member-list">
                  <span class="tool-chip">${escapeHtml(topic.domain)}</span>
                </div>
              </div>
            `;

        return `
          <article class="topic-card" data-topic-domain="${escapeHtml(topic.domain)}">
            <div class="topic-card__header">
              <span class="topic-card__number">${escapeHtml(topic.number)}</span>
              <span class="${badgeClass}">${escapeHtml(topic.domain)}</span>
            </div>

            <h3 class="topic-card__title">${escapeHtml(topic.title)}</h3>
            <p class="topic-card__desc">${escapeHtml(topic.description)}</p>
            <p class="topic-card__keywords">${escapeHtml(topic.keywords.join(" · "))}</p>

            <div class="topic-card__footer">
              ${footerContentHtml}
            </div>
          </article>
        `;
      })
      .join("");

    if (announce && liveStatus) {
      const activeTab = TOPIC_FILTERS.find((f) => f.key === activeTopicFilter);
      const label = activeTab ? activeTab.label : activeTopicFilter;
      liveStatus.textContent = `${label} 필터 적용: ${filteredTopics.length}개의 스터디 주제가 표시됩니다.`;
    }
  }

  function renderOpenTrackAndJoin() {
    // Open Track
    const openKicker = document.getElementById("open-track-kicker");
    const openHeading = document.getElementById("open-track-heading");
    const openDesc = document.getElementById("open-track-desc");
    const openCta = document.getElementById("open-track-cta-label");
    if (openKicker) openKicker.textContent = OPEN_TRACK.kicker;
    if (openHeading) openHeading.textContent = OPEN_TRACK.title;
    if (openDesc) openDesc.textContent = OPEN_TRACK.description;
    if (openCta) openCta.textContent = OPEN_TRACK.ctaLabel;

    // Join Participation Options
    const joinOptionsEl = document.getElementById("join-options");
    if (joinOptionsEl) {
      joinOptionsEl.innerHTML = JOIN_OPTIONS.map((opt) => {
        const modifier =
          opt.accent === "emerald" ? " join-option-card--emerald" : "";
        return `
          <article class="join-option-card${modifier}">
            <p class="join-option-card__badge">${escapeHtml(opt.badge)}</p>
            <h3 class="join-option-card__title">${escapeHtml(opt.title)}</h3>
            <p class="join-option-card__desc">${escapeHtml(opt.description)}</p>
          </article>
        `;
      }).join("");
    }

    // Application CTA Links & Footer Sync
    const formCtas = [
      document.getElementById("google-form-cta"),
      document.getElementById("open-track-cta")
    ];
    formCtas.forEach((cta) => {
      if (!cta) return;
      cta.setAttribute("href", SITE_CONFIG.googleFormUrl);
      cta.setAttribute("title", SITE_CONFIG.googleFormTitle);
    });

    const footerTagline = document.getElementById("footer-tagline");
    const footerCopyright = document.getElementById("footer-copyright");
    const footerDomains = document.getElementById("footer-domains");
    if (footerTagline) footerTagline.textContent = SITE_CONFIG.studyTagline;
    if (footerCopyright) footerCopyright.textContent = SITE_CONFIG.copyright;
    if (footerDomains) footerDomains.textContent = SITE_CONFIG.domainsSummary;
  }

  /* ========================================================================
     2. Hero SVG Domain Convergence Matrix Interaction
     ======================================================================== */

  function initHeroMatrix() {
    const svg = document.getElementById("domain-matrix-svg");
    const statusEl = document.getElementById("matrix-status");
    if (!svg || !statusEl) return;

    const defaultStatusHtml =
      "각 도메인 노드를 선택해 참여 분야와 멤버 프로필을 확인하세요.";
    const nodes = Array.from(svg.querySelectorAll(".matrix-node"));
    const links = Array.from(svg.querySelectorAll(".matrix-link"));

    function setActiveNode(nodeId) {
      nodes.forEach((node) => {
        node.classList.toggle("is-active", node.dataset.nodeId === nodeId);
      });
      links.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.nodeLink === nodeId);
      });

      if (!nodeId) {
        statusEl.innerHTML = defaultStatusHtml;
        return;
      }

      if (nodeId === "open") {
        statusEl.innerHTML =
          '<span class="status-emerald">+X Open</span> · <strong>Next Domain</strong> — 새로운 영역의 실무자·연구자 합류 환영 (클릭 시 Join Us 이동)';
        return;
      }

      if (nodeId === "research") {
        statusEl.innerHTML =
          '<span class="status-accent">Research</span> · <strong>연구용 에이전트</strong> — 클릭 시 관련 스터디 주제 보기';
        return;
      }

      const member = memberMap.get(nodeId);
      if (member) {
        statusEl.innerHTML = `<span class="status-accent">${escapeHtml(member.domainKey)}</span> · <strong>${escapeHtml(member.name)}</strong> — ${escapeHtml(member.summaryTrack)}`;
      }
    }

    function activateNodeAction(nodeEl) {
      const nodeId = nodeEl.dataset.nodeId;
      if (nodeId === "open") {
        const joinSection = document.getElementById("join-us");
        if (joinSection) {
          joinSection.scrollIntoView({
            behavior: prefersReducedMotion.matches ? "auto" : "smooth"
          });
        }
        return;
      }
      if (nodeId === "research") {
        setTopicFilter("Research", { announce: true });
        const topicsSection = document.getElementById("topics");
        if (topicsSection) {
          topicsSection.scrollIntoView({
            behavior: prefersReducedMotion.matches ? "auto" : "smooth"
          });
        }
        return;
      }
      openMemberDrawer(nodeId, nodeEl);
    }

    nodes.forEach((node) => {
      node.addEventListener("mouseenter", () => {
        setActiveNode(node.dataset.nodeId);
      });
      node.addEventListener("focus", () => {
        setActiveNode(node.dataset.nodeId);
      });
      node.addEventListener("click", () => {
        activateNodeAction(node);
      });
      node.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateNodeAction(node);
        }
      });
    });

    svg.addEventListener("mouseleave", () => {
      const focusedNode = nodes.find((n) => n === document.activeElement);
      setActiveNode(focusedNode ? focusedNode.dataset.nodeId : null);
    });

    svg.addEventListener("focusout", (event) => {
      if (!svg.contains(event.relatedTarget)) {
        setActiveNode(null);
      }
    });
  }

  /* ========================================================================
     3. Member Detail Slide-over Editorial Drawer
     ======================================================================== */

  function renderMemberDrawerContent(index) {
    const member = MEMBERS[index];
    if (!member) return;

    const total = MEMBERS.length;
    const prevIndex = (index - 1 + total) % total;
    const nextIndex = (index + 1) % total;
    const prevMember = MEMBERS[prevIndex];
    const nextMember = MEMBERS[nextIndex];

    const metaEl = document.getElementById("drawer-member-meta");
    const monoEl = document.getElementById("drawer-member-monogram");
    const nameEl = document.getElementById("drawer-member-name");
    const domainEl = document.getElementById("drawer-member-domain");
    const bodyEl = document.getElementById("drawer-member-body");
    const footerIndexEl = document.getElementById("drawer-footer-index");
    const prevNameEl = document.getElementById("drawer-prev-name");
    const nextNameEl = document.getElementById("drawer-next-name");

    if (metaEl) {
      metaEl.textContent = `MEMBER PROFILE · ${member.order} / ${String(total).padStart(2, "0")}`;
    }
    if (monoEl) monoEl.textContent = member.monogram;
    if (nameEl) nameEl.textContent = member.name;
    if (domainEl) {
      domainEl.textContent = `${member.domainLabel} · ${member.domainKo}`;
    }
    if (footerIndexEl) {
      footerIndexEl.textContent = `${index + 1} / ${total}`;
    }
    if (prevNameEl) prevNameEl.textContent = prevMember.name;
    if (nextNameEl) nextNameEl.textContent = nextMember.name;

    if (bodyEl) {
      const usagePoints = member.currentUsage
        .split(" / ")
        .map((item) => item.trim())
        .filter(Boolean);

      const usageHtml =
        usagePoints.length > 1
          ? `<ul class="drawer-bullet-list">${usagePoints
              .map((point) => `<li>${escapeHtml(point)}</li>`)
              .join("")}</ul>`
          : `<p class="drawer-section__text drawer-section__text--secondary">${escapeHtml(member.currentUsage)}</p>`;

      const toolChipsHtml = member.toolTags
        .map((tool) => `<span class="tool-chip">${escapeHtml(tool)}</span>`)
        .join("");

      bodyEl.innerHTML = `
        <section class="drawer-section">
          <div class="drawer-section__header">
            <span class="drawer-section__num">01</span>
            <h3 class="drawer-section__title">자기소개</h3>
          </div>
          <p class="drawer-section__text">${escapeHtml(member.intro)}</p>
        </section>

        <section class="drawer-section">
          <div class="drawer-section__header">
            <span class="drawer-section__num">02</span>
            <h3 class="drawer-section__title">자주 사용하는 AI Tool</h3>
          </div>
          <div class="drawer-section__tools-chips" aria-label="대표 AI 툴 태그">
            ${toolChipsHtml}
          </div>
        </section>

        <section class="drawer-section">
          <div class="drawer-section__header">
            <span class="drawer-section__num">03</span>
            <h3 class="drawer-section__title">현재 AI 활용방식</h3>
          </div>
          ${usageHtml}
        </section>

        <section class="drawer-section">
          <div class="drawer-section__header">
            <span class="drawer-section__num">04</span>
            <h3 class="drawer-section__title">AI 활용 시 어려운 부분</h3>
          </div>
          <div class="drawer-callout drawer-callout--muted">
            <p class="drawer-section__text drawer-section__text--secondary">${escapeHtml(member.challenges)}</p>
          </div>
        </section>

        <section class="drawer-section">
          <div class="drawer-section__header">
            <span class="drawer-section__num">05</span>
            <h3 class="drawer-section__title">발표해보고 싶은 주제</h3>
          </div>
          <div class="drawer-callout drawer-callout--accent">
            <p class="drawer-section__text">${escapeHtml(member.presentationTopic)}</p>
            <button
              type="button"
              class="drawer-track-link"
              data-jump-domain="${escapeHtml(member.domainKey)}"
            >
              <span>관련 스터디 트랙 보기 (${escapeHtml(member.domainKey)})</span>
              <span aria-hidden="true">↓</span>
            </button>
          </div>
        </section>

        <section class="drawer-section">
          <div class="drawer-section__header">
            <span class="drawer-section__num">06</span>
            <h3 class="drawer-section__title">스터디를 통해 기대하는 점</h3>
          </div>
          <p class="drawer-section__text drawer-section__text--secondary">${escapeHtml(member.expectations)}</p>
        </section>
      `;

      bodyEl.scrollTop = 0;
    }
  }

  function openMemberDrawer(memberId, triggerEl) {
    const index = MEMBERS.findIndex((m) => m.id === memberId);
    if (index === -1) return;

    const drawer = document.getElementById("member-drawer");
    const backdrop = document.getElementById("member-drawer-backdrop");
    const closeBtn = document.getElementById("drawer-close-btn");
    if (!drawer || !backdrop) return;

    if (memberDrawerCloseTimer) {
      window.clearTimeout(memberDrawerCloseTimer);
      memberDrawerCloseTimer = null;
    }

    if (!isMemberDrawerOpen) {
      memberDrawerLastFocus =
        triggerEl || document.activeElement || null;
    }

    activeMemberIndex = index;
    renderMemberDrawerContent(index);

    if (!isMemberDrawerOpen) {
      isMemberDrawerOpen = true;
      drawer.removeAttribute("hidden");
      backdrop.removeAttribute("hidden");
      syncBodyScrollLock();
      void drawer.offsetWidth;

      window.requestAnimationFrame(() => {
        if (!isMemberDrawerOpen) return;
        drawer.classList.add("is-open");
        backdrop.classList.add("is-open");
        if (closeBtn) {
          closeBtn.focus();
        }
      });
    }
  }

  function closeMemberDrawer(options) {
    const opts = options || {};
    if (!isMemberDrawerOpen) return;

    const drawer = document.getElementById("member-drawer");
    const backdrop = document.getElementById("member-drawer-backdrop");
    if (!drawer || !backdrop) return;

    if (memberDrawerCloseTimer) {
      window.clearTimeout(memberDrawerCloseTimer);
      memberDrawerCloseTimer = null;
    }

    isMemberDrawerOpen = false;
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    syncBodyScrollLock();

    const finishClose = () => {
      memberDrawerCloseTimer = null;
      if (!isMemberDrawerOpen) {
        drawer.setAttribute("hidden", "");
        backdrop.setAttribute("hidden", "");
        if (!opts.skipFocusRestore && memberDrawerLastFocus) {
          if (typeof memberDrawerLastFocus.focus === "function") {
            memberDrawerLastFocus.focus();
          }
          memberDrawerLastFocus = null;
        }
      }
    };

    const delay = getCloseDelay();
    if (delay === 0) {
      finishClose();
    } else {
      memberDrawerCloseTimer = window.setTimeout(finishClose, delay);
    }
  }

  function stepMemberDrawer(direction) {
    if (!isMemberDrawerOpen || activeMemberIndex < 0) return;
    const total = MEMBERS.length;
    activeMemberIndex = (activeMemberIndex + direction + total) % total;
    renderMemberDrawerContent(activeMemberIndex);
  }

  function initMemberDrawer() {
    const membersGrid = document.getElementById("members-grid");
    const drawer = document.getElementById("member-drawer");
    const backdrop = document.getElementById("member-drawer-backdrop");
    const closeBtn = document.getElementById("drawer-close-btn");
    const prevBtn = document.getElementById("drawer-prev-btn");
    const nextBtn = document.getElementById("drawer-next-btn");

    // Delegate click on member cards & explicit trigger buttons
    if (membersGrid) {
      membersGrid.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-open-member]");
        if (trigger) {
          openMemberDrawer(trigger.dataset.openMember, trigger);
          return;
        }
        const card = event.target.closest("[data-member-card]");
        if (card) {
          const cardTrigger = card.querySelector("[data-open-member]");
          openMemberDrawer(card.dataset.memberCard, cardTrigger || card);
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => closeMemberDrawer());
    }
    if (backdrop) {
      backdrop.addEventListener("click", () => closeMemberDrawer());
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", () => stepMemberDrawer(-1));
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => stepMemberDrawer(1));
    }

    // Reverse cross-section link: Drawer -> Topics domain filter
    if (drawer) {
      drawer.addEventListener("click", (event) => {
        const jumpBtn = event.target.closest("[data-jump-domain]");
        if (!jumpBtn) return;

        const domainKey = jumpBtn.dataset.jumpDomain;
        closeMemberDrawer({ skipFocusRestore: true });
        setTopicFilter(domainKey, true);

        const topicsSection = document.getElementById("topics");
        if (topicsSection) {
          topicsSection.scrollIntoView({
            behavior: prefersReducedMotion.matches ? "auto" : "smooth"
          });
        }

        const activeTab = document.getElementById(`tab-${domainKey}`);
        if (activeTab) {
          window.setTimeout(() => {
            activeTab.focus({ preventScroll: true });
          }, getCloseDelay() + 40);
        }
      });
    }

    // Global keyboard shortcuts when drawer is open
    document.addEventListener("keydown", (event) => {
      if (!isMemberDrawerOpen || !drawer) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeMemberDrawer();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepMemberDrawer(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        stepMemberDrawer(1);
      } else if (event.key === "Tab") {
        trapFocus(event, drawer);
      }
    });
  }

  /* ========================================================================
     4. Topics Domain Filter Tabs & Member Pill Linkage
     ======================================================================== */

  function setTopicFilter(filterKey, announce) {
    const valid = TOPIC_FILTERS.some((f) => f.key === filterKey);
    activeTopicFilter = valid ? filterKey : "all";

    const tabs = Array.from(
      document.querySelectorAll("#topic-tabs [role='tab']")
    );
    tabs.forEach((tab) => {
      const isSelected = tab.dataset.filterKey === activeTopicFilter;
      tab.setAttribute("aria-selected", isSelected ? "true" : "false");
      tab.setAttribute("tabindex", isSelected ? "0" : "-1");
    });

    renderTopics(Boolean(announce));
  }

  function initTopicFilters() {
    const tabsContainer = document.getElementById("topic-tabs");
    const topicsGrid = document.getElementById("topics-grid");

    if (tabsContainer) {
      tabsContainer.addEventListener("click", (event) => {
        const tab = event.target.closest("[role='tab']");
        if (!tab) return;
        setTopicFilter(tab.dataset.filterKey, true);
      });

      tabsContainer.addEventListener("keydown", (event) => {
        const tabs = Array.from(
          tabsContainer.querySelectorAll("[role='tab']")
        );
        const currentIndex = tabs.indexOf(document.activeElement);
        if (currentIndex === -1) return;

        let targetIndex = -1;
        if (event.key === "ArrowRight") {
          targetIndex = (currentIndex + 1) % tabs.length;
        } else if (event.key === "ArrowLeft") {
          targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          targetIndex = 0;
        } else if (event.key === "End") {
          targetIndex = tabs.length - 1;
        }

        if (targetIndex !== -1) {
          event.preventDefault();
          const targetTab = tabs[targetIndex];
          setTopicFilter(targetTab.dataset.filterKey, true);
          targetTab.focus();
        }
      });
    }

    // Topic card related member pill -> open Member Drawer
    if (topicsGrid) {
      topicsGrid.addEventListener("click", (event) => {
        const pill = event.target.closest("[data-member-id]");
        if (!pill) return;
        openMemberDrawer(pill.dataset.memberId, pill);
      });
    }
  }

  /* ========================================================================
     5. Mobile Navigation Drawer
     ======================================================================== */

  function openMobileNav() {
    const mobileNav = document.getElementById("mobile-nav");
    const backdrop = document.getElementById("mobile-nav-backdrop");
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const closeBtn = document.getElementById("mobile-nav-close");
    if (!mobileNav || !backdrop || isMobileNavOpen) return;

    if (mobileNavCloseTimer) {
      window.clearTimeout(mobileNavCloseTimer);
      mobileNavCloseTimer = null;
    }

    mobileNavLastFocus = toggleBtn || document.activeElement;
    isMobileNavOpen = true;

    mobileNav.removeAttribute("hidden");
    backdrop.removeAttribute("hidden");
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
    syncBodyScrollLock();
    void mobileNav.offsetWidth;

    window.requestAnimationFrame(() => {
      if (!isMobileNavOpen) return;
      mobileNav.classList.add("is-open");
      backdrop.classList.add("is-open");
      if (closeBtn) closeBtn.focus();
    });
  }

  function closeMobileNav(options) {
    const opts = options || {};
    const mobileNav = document.getElementById("mobile-nav");
    const backdrop = document.getElementById("mobile-nav-backdrop");
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    if (!mobileNav || !backdrop || !isMobileNavOpen) return;

    if (mobileNavCloseTimer) {
      window.clearTimeout(mobileNavCloseTimer);
      mobileNavCloseTimer = null;
    }

    isMobileNavOpen = false;
    mobileNav.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
    syncBodyScrollLock();

    const finishClose = () => {
      mobileNavCloseTimer = null;
      if (!isMobileNavOpen) {
        mobileNav.setAttribute("hidden", "");
        backdrop.setAttribute("hidden", "");
        if (!opts.skipFocusRestore && mobileNavLastFocus) {
          if (typeof mobileNavLastFocus.focus === "function") {
            mobileNavLastFocus.focus();
          }
          mobileNavLastFocus = null;
        }
      }
    };

    const delay = getCloseDelay();
    if (delay === 0) {
      finishClose();
    } else {
      mobileNavCloseTimer = window.setTimeout(finishClose, delay);
    }
  }

  function initMobileNav() {
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const closeBtn = document.getElementById("mobile-nav-close");
    const backdrop = document.getElementById("mobile-nav-backdrop");
    const mobileNav = document.getElementById("mobile-nav");

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (isMobileNavOpen) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => closeMobileNav());
    }

    if (backdrop) {
      backdrop.addEventListener("click", () => closeMobileNav());
    }

    if (mobileNav) {
      mobileNav.addEventListener("click", (event) => {
        const navLink = event.target.closest("[data-mobile-nav-link]");
        if (navLink) {
          closeMobileNav({ skipFocusRestore: true });
        }
      });
    }

    document.addEventListener("keydown", (event) => {
      if (!isMobileNavOpen || !mobileNav) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileNav();
      } else if (event.key === "Tab") {
        trapFocus(event, mobileNav);
      }
    });

    // Close mobile nav automatically if viewport widens to desktop
    window.addEventListener("resize", () => {
      if (isMobileNavOpen && window.innerWidth >= 768) {
        closeMobileNav({ skipFocusRestore: true });
      }
    });
  }

  /* ========================================================================
     6. Scroll-Spy Navigation
     ======================================================================== */

  function initScrollSpy() {
    const navLinks = Array.from(
      document.querySelectorAll("[data-nav-section]")
    );
    const sections = ["purpose", "members", "topics", "join-us"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (navLinks.length === 0 || sections.length === 0) return;

    function setActiveSection(sectionId) {
      navLinks.forEach((link) => {
        if (link.dataset.navSection === sectionId) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    function updateFromScroll() {
      const scrollY = window.scrollY;
      const offset = window.innerWidth >= 768 ? 140 : 110;

      // Near top (Hero area) -> clear active nav link
      if (scrollY < Math.max(200, sections[0].offsetTop - offset)) {
        setActiveSection(null);
        return;
      }

      // Near bottom of document -> highlight Join Us
      const docHeight = document.documentElement.scrollHeight;
      if (window.innerHeight + scrollY >= docHeight - 40) {
        setActiveSection("join-us");
        return;
      }

      let currentId = sections[0].id;
      for (const section of sections) {
        if (scrollY + offset >= section.offsetTop) {
          currentId = section.id;
        }
      }
      setActiveSection(currentId);
    }

    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateFromScroll();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    updateFromScroll();
  }

  /* ========================================================================
     7. Progressive Enhancement Scroll Reveal
     ======================================================================== */

  function initScrollReveal() {
    const revealEls = Array.from(document.querySelectorAll(".reveal"));
    if (revealEls.length === 0) return;

    if (
      prefersReducedMotion.matches ||
      typeof window.IntersectionObserver !== "function"
    ) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("js-motion");

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -16px 0px"
      }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ========================================================================
     Bootstrap
     ======================================================================== */

  function init() {
    renderPurpose();
    renderMembers();
    renderTopicTabs();
    renderTopics(false);
    renderOpenTrackAndJoin();

    initHeroMatrix();
    initMemberDrawer();
    initTopicFilters();
    initMobileNav();
    initScrollSpy();
    initScrollReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
