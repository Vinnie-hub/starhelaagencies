(function () {
  /* TASK DATA */
  const TASKS = [
    {
      id: 1,
      title: '"The Future of AI in SaaS" — Blog Post',
      badge: "New",
      badgeClass: "new",
      words: 1200,
      posted: "4 days",
      tag: "Technology",
      price: 48,
      priority: false,
    },
    {
      id: 2,
      title: '"Zero-Waste Living: A Practical Guide" — Listicle',
      badge: "Lifestyle",
      badgeClass: "",
      words: 800,
      posted: "6 days",
      tag: "Lifestyle",
      price: 32,
      priority: false,
    },
    {
      id: 3,
      title: '"Crypto Wallets 2026: Security Deep-Dive" — Whitepaper',
      badge: "High priority",
      badgeClass: "high",
      words: 2500,
      posted: "8 days",
      tag: "Finance",
      price: 125,
      priority: true,
    },
    {
      id: 4,
      title: '"Top 10 Productivity Apps for Remote Teams" — Review',
      badge: "Software",
      badgeClass: "",
      words: 600,
      posted: "2 days",
      tag: "Technology",
      price: 24,
      priority: false,
    },
    {
      id: 5,
      title: '"Mindfulness & Mental Health at Work" — Article',
      badge: "New",
      badgeClass: "new",
      words: 1000,
      posted: "5 days",
      tag: "Wellness",
      price: 40,
      priority: false,
    },
    {
      id: 6,
      title: '"E-commerce SEO Strategies for 2026" — Guide',
      badge: "SEO",
      badgeClass: "",
      words: 1500,
      posted: "7 days",
      tag: "SEO",
      price: 60,
      priority: false,
    },
    {
      id: 7,
      title: '"The Evolution of Indie Game Storytelling" — Feature',
      badge: "Gaming",
      badgeClass: "",
      words: 1100,
      posted: "10 days",
      tag: "Lifestyle",
      price: 55,
      priority: false,
    },
    {
      id: 8,
      title: '"Smart Home Gadgets: Reviews & Comparisons" — Roundup',
      badge: "Tech",
      badgeClass: "",
      words: 900,
      posted: "3 days",
      tag: "Technology",
      price: 36,
      priority: false,
    },
    {
      id: 9,
      title: "Marketing & Social Media Manager — Education Sector",
      badge: "New",
      badgeClass: "new",
      words: 1400,
      posted: "1 day",
      tag: "Marketing",
      price: 65,
      priority: false,
    },
    {
      id: 10,
      title: "English Interpreter for Business Meeting (Brazilian Portuguese)",
      badge: "Translation",
      badgeClass: "",
      words: 500,
      posted: "1 day",
      tag: "Language",
      price: 35,
      priority: false,
    },
    {
      id: 11,
      title: "Short Video Editor for Reels, TikTok & YouTube Shorts",
      badge: "Fixed Price",
      badgeClass: "",
      words: 1000,
      posted: "23 hours",
      tag: "Video Editing",
      price: 1000,
      priority: false,
    },
    {
      id: 12,
      title: "R&D Developer for Online Learning Platform",
      badge: "Developer",
      badgeClass: "",
      words: 1800,
      posted: "23 hours",
      tag: "Software",
      price: 120,
      priority: true,
    },
    {
      id: 13,
      title: "Telehealth General Practitioner / Nurse Practitioner",
      badge: "Healthcare",
      badgeClass: "",
      words: 1500,
      posted: "1 day",
      tag: "Medical",
      price: 95,
      priority: false,
    },
    {
      id: 14,
      title: "Marketing Specialist for AI & Web Agency (FR/EN)",
      badge: "Fixed Price",
      badgeClass: "",
      words: 1200,
      posted: "22 hours",
      tag: "Marketing",
      price: 300,
      priority: false,
    },
    {
      id: 15,
      title: "AI Data Center Infrastructure Technical Writer",
      badge: "High Priority",
      badgeClass: "high",
      words: 2200,
      posted: "22 hours",
      tag: "Technology",
      price: 500,
      priority: true,
    },
    {
      id: 16,
      title: "Texas Content Creator for Premium Chili Oil Brand",
      badge: "Content",
      badgeClass: "",
      words: 900,
      posted: "21 hours",
      tag: "Content Creation",
      price: 55,
      priority: false,
    },
    {
      id: 17,
      title: "WordPress Website Developer for Mental Health Clinic",
      badge: "Developer",
      badgeClass: "",
      words: 2000,
      posted: "20 hours",
      tag: "Web Development",
      price: 140,
      priority: true,
    },
    {
      id: 18,
      title: "Social Media Content Editor & Manager",
      badge: "Social Media",
      badgeClass: "",
      words: 1000,
      posted: "20 hours",
      tag: "Marketing",
      price: 60,
      priority: false,
    },
    {
      id: 19,
      title: "Bilingual Spanish Case Manager for Immigration Law Firm",
      badge: "Legal",
      badgeClass: "",
      words: 1300,
      posted: "1 day",
      tag: "Legal",
      price: 80,
      priority: false,
    },
    {
      id: 20,
      title: "Native Italian Academic Proofreader (PhD Required)",
      badge: "Academic",
      badgeClass: "",
      words: 1600,
      posted: "23 hours",
      tag: "Editing",
      price: 90,
      priority: false,
    },
    {
      id: 21,
      title: "Native Spanish SEO Content Writer (Online Casino)",
      badge: "SEO",
      badgeClass: "",
      words: 1200,
      posted: "1 day",
      tag: "Writing",
      price: 50,
      priority: false,
    },
    {
      id: 22,
      title: "Shopify Marketing & Social Media Manager",
      badge: "E-commerce",
      badgeClass: "",
      words: 1400,
      posted: "23 hours",
      tag: "Marketing",
      price: 85,
      priority: false,
    },
    {
      id: 23,
      title: "User Research Interview – Sports Betting Users",
      badge: "Research",
      badgeClass: "",
      words: 300,
      posted: "1 day",
      tag: "Research",
      price: 15,
      priority: false,
    },
    {
      id: 24,
      title: "Social Media Manager for Auto Protection Brand",
      badge: "Long Term",
      badgeClass: "high",
      words: 1500,
      posted: "22 hours",
      tag: "Marketing",
      price: 95,
      priority: true,
    },
    {
      id: 25,
      title: "SEO Content Writer & Copywriter",
      badge: "SEO",
      badgeClass: "",
      words: 1300,
      posted: "21 hours",
      tag: "Writing",
      price: 70,
      priority: false,
    },
    {
      id: 26,
      title: "Content Planning, Design & Social Media Management",
      badge: "Fixed Price",
      badgeClass: "",
      words: 800,
      posted: "21 hours",
      tag: "Social Media",
      price: 20,
      priority: false,
    },
    {
      id: 27,
      title: "Social Media & Creative Assistant",
      badge: "Creative",
      badgeClass: "",
      words: 1000,
      posted: "20 hours",
      tag: "Social Media",
      price: 60,
      priority: false,
    },
    {
      id: 28,
      title: "Social Media Reel Creator",
      badge: "Video",
      badgeClass: "",
      words: 700,
      posted: "20 hours",
      tag: "Video Editing",
      price: 40,
      priority: false,
    },
  ];

  const iconFor = (tag) =>
    ({
      Technology: "fa-microchip",
      Lifestyle: "fa-leaf",
      Finance: "fa-coins",
      Wellness: "fa-spa",
      SEO: "fa-magnifying-glass-chart",
    })[tag] || "fa-tag";

  /* DOM refs */
  const taskFeed = document.getElementById("taskFeed");
  const taskSearch = document.getElementById("taskSearch");
  const filterTabs = document.getElementById("filterTabs");
  const workspaceModal = document.getElementById("workspaceModal");
  const editorArea = document.getElementById("editorArea");
  const taskTitleModal = document.getElementById("taskTitleModal");
  const taskWordGoal = document.getElementById("taskWordGoal");
  const wordGoalDisplay = document.getElementById("wordGoalDisplay");
  const wordCountDisplay = document.getElementById("wordCountDisplay");
  const progressFill = document.getElementById("progressFill");
  const submitBtn = document.getElementById("submitBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const saveDraftBtn = document.getElementById("saveDraftBtn");
  const toast = document.getElementById("toast");

  let activeFilter = "all";
  let currentTask = { id: null, title: "", wordGoal: 0 };
  const draftStore = {};

  /* render */
  function renderTasks() {
    const query = taskSearch.value.trim().toLowerCase();
    const filtered = TASKS.filter((t) => {
      const matchesFilter = activeFilter === "all" || t.tag === activeFilter;
      const matchesSearch =
        !query ||
        t.title.toLowerCase().includes(query) ||
        t.tag.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      taskFeed.innerHTML = `<div class="no-results"><i class="fa-solid fa-magnifying-glass" style="font-size:22px;margin-bottom:10px;display:block;"></i>No open briefs match that search yet.</div>`;
      return;
    }

    taskFeed.innerHTML = filtered
      .map(
        (t, i) => `
        <div class="task-card${t.priority ? " priority" : ""}" style="animation-delay:${i * 0.05}s">
          <div class="card-top">
            <h4>${t.title}</h4>
            <span class="badge ${t.badgeClass}">${t.badge}</span>
          </div>
          <div class="card-meta">
            <span><i class="fa-solid fa-file-lines"></i>${t.words.toLocaleString()} words</span>
            <span><i class="fa-solid fa-clock"></i>posted ${t.posted} ago</span>
            <span><i class="fa-solid ${iconFor(t.tag)}"></i>${t.tag}</span>
          </div>
          <div class="card-bottom">
            <div class="task-price">$${t.price} <small>fixed</small></div>
            <button class="btn-take" data-id="${t.id}">Claim brief</button>
          </div>
        </div>
      `,
      )
      .join("");
  }

  /* filter */
  filterTabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    filterTabs
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderTasks();
  });

  let searchDebounce;
  taskSearch.addEventListener("input", () => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(renderTasks, 150);
  });

  /* open workspace */
  function openWorkspace(task) {
    currentTask = { id: task.id, title: task.title, wordGoal: task.words };
    taskTitleModal.textContent = task.title;
    taskWordGoal.textContent = `Goal: ${task.words.toLocaleString()} words`;
    wordGoalDisplay.textContent = task.words.toLocaleString();

    editorArea.value = draftStore[task.id] || "";
    updateWordCount();

    if (draftStore[task.id]) {
      showToast("Draft restored from this session.", "fa-clock-rotate-left");
    }

    workspaceModal.classList.add("show");
    document.body.style.overflow = "hidden";
    editorArea.focus();

    submitBtn.disabled = true;
    submitBtn.classList.remove("active");
  }

  function closeWorkspace() {
    workspaceModal.classList.remove("show");
    document.body.style.overflow = "";
    if (editorArea.value.trim().length > 10 && currentTask.id != null) {
      draftStore[currentTask.id] = editorArea.value;
    }
  }

  function updateWordCount() {
    const text = editorArea.value.trim();
    const words = text === "" ? 0 : text.split(/\s+/).length;
    wordCountDisplay.textContent = words.toLocaleString();
    const pct =
      Math.min(100, Math.round((words / currentTask.wordGoal) * 100)) || 0;
    progressFill.style.width = pct + "%";
  }

  /* toast */
  let toastTimer;
  function showToast(message, icon = "fa-circle-check") {
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> ${message}`;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  /* event listeners */
  taskFeed.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-take");
    if (!btn) return;
    const task = TASKS.find((t) => t.id === Number(btn.dataset.id));
    if (task) openWorkspace(task);
  });

  closeModalBtn.addEventListener("click", closeWorkspace);
  workspaceModal.addEventListener("click", (e) => {
    if (e.target === workspaceModal) closeWorkspace();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && workspaceModal.classList.contains("show"))
      closeWorkspace();
    if (
      (e.ctrlKey || e.metaKey) &&
      e.key === "s" &&
      workspaceModal.classList.contains("show")
    ) {
      e.preventDefault();
      saveDraftBtn.click();
    }
  });

  editorArea.addEventListener("input", updateWordCount);

  saveDraftBtn.addEventListener("click", () => {
    const text = editorArea.value;
    if (text.trim().length < 5) {
      showToast(
        "Write a few words before saving a draft.",
        "fa-triangle-exclamation",
      );
      return;
    }
    if (currentTask.id != null) draftStore[currentTask.id] = text;
    showToast("Draft saved for this session.", "fa-circle-check");
  });

  submitBtn.addEventListener("click", () => {
    if (submitBtn.disabled) {
      showToast("Sign up to submit a finished draft.", "fa-lock");
      setTimeout(() => {
        window.location.href =
          "https://www.starhela.com/register.php?ref=sydney";
      }, 1200);
    }
  });

  /* "Post a brief" buttons – redirect to sign-up */
  function handlePostBrief(e) {
    e.preventDefault();
    showToast("Please sign up to post a brief.", "fa-user-plus");
    setTimeout(() => {
      window.location.href = "https://www.starhela.com/register.php?ref=sydney";
    }, 1200);
  }
  document
    .getElementById("postBriefBtn")
    .addEventListener("click", handlePostBrief);
  document
    .getElementById("ctaPostBrief")
    .addEventListener("click", handlePostBrief);

  /* typewriter */
  const typewriterEl = document.getElementById("typewriterText");
  const mcWordCount = document.getElementById("mcWordCount");
  const typewriterLines = [
    "Cold wallets keep private keys fully offline, isolating them from",
    "internet-connected devices and the malware that targets them.",
  ];
  let twLine = 0,
    twChar = 0,
    twWords = 0;

  function typeStep() {
    if (twLine >= typewriterLines.length) {
      setTimeout(() => {
        typewriterEl.textContent = "";
        twLine = 0;
        twChar = 0;
        twWords = 0;
        mcWordCount.textContent = "0";
        typeStep();
      }, 2400);
      return;
    }
    const line = typewriterLines[twLine];
    if (twChar <= line.length) {
      typewriterEl.textContent =
        typewriterLines.slice(0, twLine).join(" ") +
        (twLine > 0 ? " " : "") +
        line.slice(0, twChar);
      twWords = typewriterEl.textContent
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;
      mcWordCount.textContent = twWords;
      twChar++;
      setTimeout(typeStep, 22);
    } else {
      twLine++;
      twChar = 0;
      setTimeout(typeStep, 260);
    }
  }
  if (typewriterEl) typeStep();

  /* scroll reveal */
  const revealTargets = document.querySelectorAll(".split-cta-card");
  revealTargets.forEach((el) => el.classList.add("reveal"));
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  /* init */
  renderTasks();
  console.log("starhela marketplace UI ready.");
})();
