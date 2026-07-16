// ── PAGE SWITCHING ──
    function showPage(name) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.getElementById('page-' + name).classList.add('active');
      document.querySelectorAll('.nav-links a[id^=nav]').forEach(a => a.classList.remove('active'));
      const navEl = document.getElementById('nav-' + name);
      if (navEl) navEl.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (name === 'tasks') initTasks();
      if (name === 'home') initReveals();
    }

    function setMobActive(id) {
      document.querySelectorAll('.mob-nav-item').forEach(el => el.classList.remove('active'));
      const el = document.getElementById(id);
      if (el) el.classList.add('active');
    }

    // ── LIVE WORKER COUNT ──
    const liveCountEl = document.getElementById('liveCount');
    let currentWorkers = 9500;
    setInterval(() => {
      const change = Math.floor(Math.random() * 8) + 1;
      currentWorkers += Math.random() > 0.5 ? change : -change;
      if (currentWorkers < 9000) currentWorkers = 9000;
      if (currentWorkers > 12000) currentWorkers = 12000;
      liveCountEl.textContent = currentWorkers.toLocaleString() + '+';
    }, 3000);

    // ── SCROLL REVEAL + EARN BARS ──
    function initReveals() {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('active');
            e.target.querySelectorAll('.earn-bar-fill').forEach(f => {
              f.style.width = f.dataset.width + '%';
            });
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('#page-home .reveal').forEach(el => io.observe(el));
    }
    initReveals();

    // ── MODAL LOADER ──
    const ld = document.getElementById('ldOverlay');
    const ldTitle = document.getElementById('ldTitle');
    const ldMsg = document.getElementById('ldMsg');
    const ldBar = document.getElementById('ldBar');
    const ldCta = document.getElementById('ldCta');
    const ldSkip = document.getElementById('ldSkip');
    const ldSpinner = document.getElementById('ldSpinner');
    const ldIco = document.getElementById('ldIco');
    const ls = [document.getElementById('ls1'), document.getElementById('ls2'), document.getElementById('ls3')];

    function runLoader() {
      ldBar.style.width = '0%';
      ldCta.style.display = 'none';
      ldSkip.style.display = 'none';
      ldSpinner.style.display = 'block';
      ldIco.style.display = 'none';
      ls.forEach(s => s.className = 'ld-step');
      ldTitle.textContent = 'Checking availability…';
      ldMsg.textContent = 'Verifying task slots and account eligibility.';
      ld.classList.add('show');
      let pct = 0, step = 0;
      const stepTimes = [28, 58, 85];
      const iv = setInterval(() => {
        pct += Math.random() * 9 + 3;
        if (pct > 100) pct = 100;
        ldBar.style.width = pct + '%';
        stepTimes.forEach((t, i) => { if (pct >= t && step <= i) { ls[i].classList.add('active'); step = i + 1; } });
        if (pct >= 100) { clearInterval(iv); setTimeout(showResult, 340); }
      }, 110);
    }

    function showResult() {
      ls.forEach(s => s.classList.add('done'));
      ldSpinner.style.display = 'none';
      ldIco.style.display = 'block';
      ldTitle.textContent = "You don't have an account yet";
      ldMsg.textContent = 'Create your account to unlock all tasks and start earning on Starhela.';
      ldCta.style.display = 'block';
      ldSkip.style.display = 'block';
    }

    function closeLoader() { ld.classList.remove('show'); }
    document.getElementById('ldSkip').onclick = closeLoader;
    ld.addEventListener('click', (e) => { if (e.target === ld) closeLoader(); });

    // ── TASKS DATA ──
    const TASKS = [
      { id: 1, icon: '🖼️', title: 'Object Detection — Vehicles', type: 'image', difficulty: 'easy', time: '2–4 min', minRate: 0.12, maxRate: 0.45, desc: 'Draw precise bounding boxes around cars, trucks, motorcycles, and buses in real street imagery. Used to train autonomous driving AI.', slots: 'Unlimited' },
      { id: 2, icon: '📝', title: 'Sentiment Classification', type: 'text', difficulty: 'easy', time: '1–2 min', minRate: 0.08, maxRate: 0.3, desc: 'Label social media posts and customer reviews as positive, negative, or neutral. Core task for emotion-aware AI models.', slots: '3,400 available' },
      { id: 3, icon: '🎧', title: 'Voice Command Tagging 🔥', type: 'audio', difficulty: 'medium', time: '3–5 min', minRate: 0.5, maxRate: 2.0, desc: 'Identify wakewords and voice commands in short audio clips. +20% bonus active this week. High demand from voice AI companies.', hot: true, slots: '800 available' },
      { id: 4, icon: '🖼️', title: 'Landmark Recognition', type: 'image', difficulty: 'easy', time: '1–3 min', minRate: 0.1, maxRate: 0.35, desc: 'Select the correct landmark or scene category from a set of images. Helps train visual recognition systems for maps and tourism AI.', slots: '2,100 available' },
      { id: 5, icon: '📝', title: 'Named Entity Recognition', type: 'text', difficulty: 'medium', time: '4–6 min', minRate: 0.14, maxRate: 0.4, desc: 'Highlight and tag persons, organizations, and geographic locations in real-world news articles and business documents.', slots: '1,200 available' },
      { id: 6, icon: '🎧', title: 'Audio Event Detection', type: 'audio', difficulty: 'medium', time: '2–4 min', minRate: 0.18, maxRate: 0.6, desc: 'Classify audio events from short clips: dog barks, car horns, music, speech, and silence. Powers smart home and surveillance AI.', slots: '560 available' },
      { id: 7, icon: '🖼️', title: 'Semantic Segmentation', type: 'image', difficulty: 'hard', time: '8–15 min', minRate: 0.22, maxRate: 0.6, desc: 'Precisely outline road surfaces, sidewalks, trees, and buildings using polygon annotation tools. Advanced task for self-driving datasets.', slots: '340 available' },
      { id: 8, icon: '📝', title: 'Text Summarization Rating', type: 'text', difficulty: 'easy', time: '2–3 min', minRate: 0.1, maxRate: 0.3, desc: 'Compare two AI-generated summaries and rate which is more accurate, complete, and helpful. Core RLHF task.', slots: '4,700 available' },
      { id: 9, icon: '💬', title: 'AI Response Evaluation', type: 'feedback', difficulty: 'medium', time: '5–8 min', minRate: 0.2, maxRate: 0.8, desc: 'Rate AI-generated answers on a structured rubric assessing accuracy, safety, helpfulness, and tone. Direct human feedback for LLMs.', slots: '900 available' },
      { id: 10, icon: '🌐', title: 'Swahili Translation Quality Review', type: 'feedback', difficulty: 'medium', time: '4–7 min', minRate: 0.15, maxRate: 0.5, desc: 'Rate machine-translated Swahili sentences for grammar, cultural accuracy, and natural flow using a clear quality rubric.', slots: '420 available' },
      { id: 11, icon: '🖼️', title: 'Medical Image Classification', type: 'image', difficulty: 'hard', time: '5–10 min', minRate: 0.4, maxRate: 1.2, desc: 'Classify X-ray and scan images into diagnostic categories with clinical labels provided. Special training materials included.', slots: '150 available' },
      { id: 12, icon: '📝', title: 'Offensive Content Moderation', type: 'text', difficulty: 'easy', time: '1–2 min', minRate: 0.06, maxRate: 0.2, desc: 'Flag social media posts containing hate speech, violence, or spam according to clear community guidelines. High-volume task.', slots: 'Unlimited' },
      { id: 13, icon: '🎧', title: 'Accent Identification', type: 'audio', difficulty: 'medium', time: '2–4 min', minRate: 0.2, maxRate: 0.7, desc: 'Listen to 30-second voice clips and identify the speaker\'s regional accent from a predefined list. Helps build multilingual ASR models.', hot: true, slots: '680 available' },
      { id: 14, icon: '💬', title: 'Instruction-Following Rating', type: 'feedback', difficulty: 'hard', time: '8–12 min', minRate: 0.35, maxRate: 0.9, desc: 'Assess whether AI completions correctly follow complex multi-step instructions. Premium RLHF task requiring careful analysis.', slots: '220 available' },
      { id: 15, icon: '🌐', title: 'French-to-English Quality Review', type: 'feedback', difficulty: 'medium', time: '5–8 min', minRate: 0.18, maxRate: 0.55, desc: 'Score bilingual Q&A pairs for accuracy, tone, and cultural appropriateness using structured reviewer feedback.', slots: '310 available' },
      { id: 16, icon: '🖼️', title: 'Retail Product Categorization', type: 'image', difficulty: 'easy', time: '1–2 min', minRate: 0.08, maxRate: 0.25, desc: 'Assign product images to the correct e-commerce category from a list. Fast and repetitive with immediate feedback.', slots: 'Unlimited' },
      { id: 17, icon: '📝', title: 'Legal Document Tagging', type: 'text', difficulty: 'hard', time: '10–15 min', minRate: 0.3, maxRate: 0.85, desc: 'Tag clauses, obligations, and parties in legal contract excerpts. Comprehensive guidelines and examples provided. High pay.', slots: '90 available' },
      { id: 18, icon: '🎧', title: 'Emotion Recognition in Speech', type: 'audio', difficulty: 'hard', time: '4–8 min', minRate: 0.25, maxRate: 0.8, desc: 'Label the emotional tone (happy, sad, angry, neutral, fearful) in short speech recordings for conversational AI training.', slots: '440 available' },
      { id: 19, icon: '💬', title: 'Chatbot Conversation Rating', type: 'feedback', difficulty: 'easy', time: '3–5 min', minRate: 0.12, maxRate: 0.4, desc: 'Rate 5-turn chatbot conversations on helpfulness, coherence, and safety. Quick, clear scoring rubric. Ideal for beginners.', slots: '1,800 available' },
      { id: 20, icon: '🌐', title: 'Yoruba Voice Localization Review', type: 'audio', difficulty: 'hard', time: '6–10 min', minRate: 0.22, maxRate: 0.65, desc: 'Listen to localized Yoruba voice prompts and verify pronunciation, naturalness, and alignment with the supplied script.', slots: '120 available' },
      { id: 21, icon: '🖼️', title: 'Facial Attribute Labeling', type: 'image', difficulty: 'easy', time: '1–3 min', minRate: 0.09, maxRate: 0.28, desc: 'Tag facial attributes (age range, expression, accessories) in image datasets for facial recognition research.', slots: '2,600 available' },
      { id: 22, icon: '📝', title: 'News Claim Verification', type: 'text', difficulty: 'medium', time: '5–8 min', minRate: 0.16, maxRate: 0.45, desc: 'Verify whether factual claims in news articles are supported, refuted, or unverifiable based on provided reference sources.', slots: '760 available' },
      { id: 23, icon: '🎧', title: 'Music Genre Classification', type: 'audio', difficulty: 'easy', time: '1–3 min', minRate: 0.08, maxRate: 0.3, desc: 'Listen to 15-second audio clips and classify the music genre from a list. Trains AI music recommendation systems.', slots: 'Unlimited' },
      { id: 24, icon: '💬', title: 'Code Quality Review', type: 'feedback', difficulty: 'hard', time: '10–20 min', minRate: 0.5, maxRate: 1.5, desc: 'Evaluate AI-generated code for correctness, efficiency, and readability. Requires basic programming knowledge. Highest pay tier.', slots: '60 available' }
    ];
    TASKS.push({ id: 25, icon: '🖼️', title: 'Document Image Quality Check', type: 'image', difficulty: 'easy', time: '2–4 min', minRate: 0.10, maxRate: 0.32, desc: 'Verify that scanned document images are readable, correctly oriented, and free from cropping errors.', slots: '1,050 available' });
    TASKS.push({ id: 26, icon: '🖼️', title: 'Food Image Attribute Tags', type: 'image', difficulty: 'medium', time: '3–5 min', minRate: 0.16, maxRate: 0.48, desc: 'Tag meal images with ingredients, cuisine style, and dietary attributes for visual search training.', slots: '720 available' });
    TASKS.push({ id: 27, icon: '📝', title: 'Customer Intent Classification', type: 'text', difficulty: 'easy', time: '2–3 min', minRate: 0.09, maxRate: 0.27, desc: 'Classify customer support messages by intent so AI assistants can route requests accurately.', slots: '2,800 available' });
    TASKS.push({ id: 28, icon: '📝', title: 'Research Passage Relevance', type: 'text', difficulty: 'medium', time: '4–6 min', minRate: 0.17, maxRate: 0.50, desc: 'Judge whether source passages directly support a research question and explain the match.', slots: '680 available' });
    TASKS.push({ id: 29, icon: '🎧', title: 'Podcast Speaker Separation', type: 'audio', difficulty: 'medium', time: '4–7 min', minRate: 0.22, maxRate: 0.65, desc: 'Mark speaker changes in short podcast clips to improve multi-speaker transcription models.', slots: '510 available' });
    TASKS.push({ id: 30, icon: '🎧', title: 'Sound Quality Assessment', type: 'audio', difficulty: 'easy', time: '2–4 min', minRate: 0.11, maxRate: 0.34, desc: 'Rate clarity, background noise, and distortion in short recordings using simple quality labels.', slots: '1,400 available' });
    TASKS.push({ id: 31, icon: '💬', title: 'Helpfulness Comparison', type: 'feedback', difficulty: 'medium', time: '4–6 min', minRate: 0.19, maxRate: 0.58, desc: 'Compare two AI answers and select the response that is clearer, safer, and more useful.', slots: '950 available' });
    TASKS.push({ id: 32, icon: '💬', title: 'Search Result Quality Rating', type: 'feedback', difficulty: 'easy', time: '2–4 min', minRate: 0.10, maxRate: 0.31, desc: 'Rate whether suggested search results answer a user query accurately and completely.', slots: '2,300 available' });

    const diffMap = { easy: '<span class="diff-easy">Easy</span>', medium: '<span class="diff-medium">Medium</span>', hard: '<span class="diff-hard">Hard</span>' };
    const typeLabel = { image: '🖼️ Image', text: '📝 Text', audio: '🎧 Audio', feedback: '💬 Feedback' };
    const DISPLAY_COUNT = 6;
    const TASK_TYPES = ['image', 'text', 'audio', 'feedback'];
    let taskRotationTimer = null, layerQueues = {}, layerVisible = {}, layerSlots = {}, layerCursor = 0, tasksInitialized = false, feedIdx = 0;

    function getTasksForType(type) {
      return TASKS.filter(t => t.type === type).sort((a, b) => b.maxRate - a.maxRate);
    }

    function taskCardMarkup(t) {
      return `<div class="task-card"><div class="tc-top"><div class="tc-icon">${t.icon}</div><div class="tc-badge">$${t.minRate.toFixed(2)}–$${t.maxRate.toFixed(2)}</div></div><div class="tc-title">${t.title}</div><div class="tc-desc">${t.desc}</div><div class="tc-meta">${diffMap[t.difficulty]}<span class="tc-tag">⏱ ${t.time}</span><span class="tc-tag">${typeLabel[t.type]}</span><span class="tc-tag">${t.slots}</span>${t.hot ? '<span class="tc-tag hot">🔥 Bonus Active</span>' : ''}</div><div class="tc-footer"><div class="tc-rate">$${t.minRate.toFixed(2)} – $${t.maxRate.toFixed(2)}</div><button class="tc-start" onclick="runLoader()"><i class="fas fa-lock" style="font-size:.6rem"></i> Unlock & Start</button></div></div>`;
    }

    function filterTasks(type, selectedButton) {
      document.querySelectorAll('.task-layer').forEach(layer => {
        layer.hidden = type !== 'all' && layer.id !== 'task-layer-' + type;
      });
      document.querySelectorAll('.task-filter').forEach(button => {
        const isActive = button === selectedButton;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
    }

    function renderTasks() {
      clearInterval(taskRotationTimer);
      TASK_TYPES.forEach(type => {
        const tasks = getTasksForType(type);
        const grid = document.getElementById('tasksGrid-' + type);
        layerQueues[type] = shuffle([...tasks]);
        layerVisible[type] = layerQueues[type].splice(0, Math.min(DISPLAY_COUNT, tasks.length));
        layerSlots[type] = 0;
        if (grid) grid.innerHTML = layerVisible[type].map(taskCardMarkup).join('');
      });
      layerCursor = 0;
      taskRotationTimer = setInterval(rotateOneTask, 3200);
    }

    function rotateOneTask() {
      const type = TASK_TYPES[layerCursor];
      const tasks = getTasksForType(type);
      const grid = document.getElementById('tasksGrid-' + type);
      const visible = layerVisible[type];
      if (!grid || !visible || tasks.length <= DISPLAY_COUNT) { layerCursor = (layerCursor + 1) % TASK_TYPES.length; return; }
      if (!layerQueues[type].length) {
        const hidden = tasks.filter(task => !visible.some(shown => shown.id === task.id));
        layerQueues[type].push(...shuffle(hidden.length ? hidden : tasks));
      }
      const slot = layerSlots[type];
      const outgoing = grid.children[slot];
      const incoming = layerQueues[type].shift();
      if (outgoing && incoming) {
        outgoing.classList.add('is-leaving');
        setTimeout(() => {
          visible[slot] = incoming;
          const fragment = document.createRange().createContextualFragment(taskCardMarkup(incoming));
          const replacement = fragment.firstElementChild;
          replacement.classList.add('is-entering');
          outgoing.replaceWith(replacement);
        }, 260);
        layerSlots[type] = (slot + 1) % visible.length;
      }
      layerCursor = (layerCursor + 1) % TASK_TYPES.length;
    }

    function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

    function initTasks() {
      if (!tasksInitialized) {
        tasksInitialized = true;
      }
      renderTasks();
    }

    function addFeedItem() {
      const ticker = document.getElementById('earningTicker');
      if (!ticker) return;
      const item = LIVE_FEED[feedIdx % LIVE_FEED.length];
      feedIdx++;
      const el = document.createElement('div');
      el.className = 'et-item';
      el.innerHTML = `<div class="et-avatar">${item.avatar}</div><div class="et-info"><div class="et-name">${item.name}</div><div class="et-task">${item.task}</div></div><div class="et-earn">${item.earn}</div>`;
      ticker.prepend(el);
      if (ticker.children.length > 6) ticker.removeChild(ticker.lastChild);
    }

    // ── SMOOTH SCROLL ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });

    // init tasks if page is loaded with tasks visible
    if (document.getElementById('page-tasks').classList.contains('active')) initTasks();