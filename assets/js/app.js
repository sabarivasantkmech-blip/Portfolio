(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const content = window.PORTFOLIO_CONTENT || {};
  const state = {
    activeFilter: "all",
    lastScrollY: window.scrollY,
    scrollTicking: false,
  };

  const selectors = {
    articleList: "#article-list",
    filterButtons: ".filter-button",
    galleryGrid: "#gallery-grid",
    journalGrid: "#journal-grid",
    navLinks: ".site-nav a",
    navToggle: ".nav-toggle",
    cookieAccept: "[data-cookie-accept]",
    cookieBanner: "[data-cookie-banner]",
    projectGrid: "#project-grid",
    reveal: "[data-reveal]",
    siteHeader: ".site-header",
    themeToggle: ".theme-toggle",
    themeToggleText: ".theme-toggle-text",
    year: "#year",
  };

  const elements = {
    articleList: document.querySelector(selectors.articleList),
    cookieAccept: document.querySelector(selectors.cookieAccept),
    cookieBanner: document.querySelector(selectors.cookieBanner),
    filterButtons: [...document.querySelectorAll(selectors.filterButtons)],
    galleryGrid: document.querySelector(selectors.galleryGrid),
    journalGrid: document.querySelector(selectors.journalGrid),
    navLinks: [...document.querySelectorAll(selectors.navLinks)],
    navToggle: document.querySelector(selectors.navToggle),
    projectGrid: document.querySelector(selectors.projectGrid),
    siteHeader: document.querySelector(selectors.siteHeader),
    themeToggle: document.querySelector(selectors.themeToggle),
    themeToggleText: document.querySelector(selectors.themeToggleText),
    year: document.querySelector(selectors.year),
  };

  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function sanitizeStyle(value = "") {
    return String(value).includes("linear-gradient") ? value : "linear-gradient(135deg, transparent, transparent)";
  }

  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage can be unavailable in private or restricted browser modes.
    }
  }

  function renderTags(tags = []) {
    return tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  }

  function renderProjects() {
    if (!elements.projectGrid) return;

    elements.projectGrid.innerHTML = (content.projects || [])
      .map(
        (project) => `
          <article class="project-card" style="--card-gradient: ${sanitizeStyle(project.gradient)}">
            <div class="project-meta">
              <span>${escapeHtml(project.category)}</span>
              <span>${escapeHtml(project.year)}</span>
            </div>
            <h3>${escapeHtml(project.title)}</h3>
            <p>${escapeHtml(project.description)}</p>
            <div class="tag-row">${renderTags(project.tags)}</div>
          </article>
        `
      )
      .join("");
  }

  function renderJournal(filter = "all") {
    if (!elements.journalGrid) return;

    const items = content.journalItems || [];
    const filteredItems = filter === "all" ? items : items.filter((item) => item.category === filter);

    elements.journalGrid.innerHTML = filteredItems
      .map(
        (item) => `
          <article class="journal-card" style="--card-gradient: ${sanitizeStyle(item.gradient)}">
            <div class="journal-meta">
              <span>${escapeHtml(item.category)}</span>
              <span>${escapeHtml(item.format)}</span>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <div class="tag-row">${renderTags(item.tags)}</div>
          </article>
        `
      )
      .join("");
  }

  function renderGallery() {
    if (!elements.galleryGrid) return;

    elements.galleryGrid.innerHTML = (content.galleryItems || [])
      .map(
        (item) => `
          <article id="${escapeHtml(item.id)}" class="gallery-card" style="--card-gradient: ${sanitizeStyle(item.gradient)}">
            <div class="gallery-frame">${escapeHtml(item.placeholder)}</div>
            <div class="journal-meta">
              <span>${escapeHtml(item.category)}</span>
              <span>Host managed</span>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderArticles() {
    if (!elements.articleList) return;

    elements.articleList.innerHTML = (content.articleItems || [])
      .map(
        (item) => `
          <article id="${escapeHtml(item.id)}" class="article-card" style="--card-gradient: ${sanitizeStyle(item.gradient)}">
            <div class="article-meta">
              <span>${escapeHtml(item.category)}</span>
              <span>${escapeHtml(item.readTime)}</span>
              <span>Host managed</span>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <div class="tag-row">${renderTags(item.tags)}</div>
          </article>
        `
      )
      .join("");
  }

  function setupFilters() {
    elements.filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        state.activeFilter = button.dataset.filter || "all";

        elements.filterButtons.forEach((item) => {
          item.classList.remove("active");
          item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
        renderJournal(state.activeFilter);
      });
    });
  }

  function setupReveal() {
    const revealElements = [...document.querySelectorAll(selectors.reveal)];

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  function setupMenu() {
    if (!elements.navToggle || !elements.siteHeader) return;

    elements.navToggle.addEventListener("click", () => {
      const expanded = elements.navToggle.getAttribute("aria-expanded") === "true";
      elements.navToggle.setAttribute("aria-expanded", String(!expanded));
      elements.siteHeader.classList.toggle("menu-open", !expanded);
      elements.siteHeader.classList.remove("header-hidden");
    });

    elements.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        elements.navToggle.setAttribute("aria-expanded", "false");
        elements.siteHeader.classList.remove("menu-open");
      });
    });
  }

  function setupScrollHeader() {
    if (!elements.siteHeader) return;

    const sections = elements.navLinks
      .map((link) => {
        const id = link.getAttribute("href");
        return id && id.startsWith("#") ? { link, section: document.querySelector(id) } : null;
      })
      .filter((item) => item && item.section);

    function updateActiveLink(scrollY) {
      let activeItem = sections[0];
      const activationLine = scrollY + 150;

      sections.forEach((item) => {
        if (item.section.offsetTop <= activationLine) {
          activeItem = item;
        }
      });

      sections.forEach((item) => {
        const isActive = item === activeItem;
        item.link.classList.toggle("active", isActive);

        if (isActive) {
          item.link.setAttribute("aria-current", "page");
        } else {
          item.link.removeAttribute("aria-current");
        }
      });
    }

    function updateHeader() {
      const currentY = Math.max(window.scrollY, 0);
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(currentY / scrollable, 1);
      const menuOpen = elements.siteHeader.classList.contains("menu-open");
      const scrollingDown = currentY > state.lastScrollY;

      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
      elements.siteHeader.classList.toggle("header-compact", currentY > 32);
      elements.siteHeader.classList.toggle("header-hidden", scrollingDown && currentY > 180 && !menuOpen);

      if (currentY < 8) {
        elements.siteHeader.classList.remove("header-hidden");
      }

      updateActiveLink(currentY);
      state.lastScrollY = currentY;
      state.scrollTicking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!state.scrollTicking) {
          state.scrollTicking = true;
          requestAnimationFrame(updateHeader);
        }
      },
      { passive: true }
    );

    window.addEventListener("resize", updateHeader);
    updateHeader();
  }

  function setTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    writeStorage("portfolio-theme", nextTheme);

    if (!elements.themeToggle || !elements.themeToggleText) return;

    const isDark = nextTheme === "dark";
    elements.themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    elements.themeToggleText.textContent = isDark ? "Dark" : "Light";
  }

  function setupTheme() {
    if (!elements.themeToggle) return;

    setTheme(document.documentElement.dataset.theme || "light");

    elements.themeToggle.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    });
  }

  function setupCookieNotice() {
    if (!elements.cookieBanner || !elements.cookieAccept) return;

    const consent = readStorage("portfolio-cookie-consent");
    elements.cookieBanner.hidden = consent === "accepted";

    elements.cookieAccept.addEventListener("click", () => {
      writeStorage("portfolio-cookie-consent", "accepted");
      elements.cookieBanner.hidden = true;
    });
  }

  function init() {
    renderProjects();
    renderJournal(state.activeFilter);
    renderGallery();
    renderArticles();
    setupTheme();
    setupCookieNotice();
    setupFilters();
    setupReveal();
    setupMenu();
    setupScrollHeader();

    if (elements.year) {
      elements.year.textContent = new Date().getFullYear();
    }
  }

  init();
})();
