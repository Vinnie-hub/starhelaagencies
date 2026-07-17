/* ==========================================================================
       starhela — SPIN & WIN (functionality unchanged)
       ========================================================================== */

      (() => {
        "use strict";

        /* ============================= THEME ============================= */

        const THEME_KEY = "starhela_theme";

        function updateThemeIcon(theme) {
          const icon = document.getElementById("themeIcon");
          if (!icon) return;
          if (theme === "dark") {
            icon.innerHTML =
              '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="none"/>';
          } else {
            icon.innerHTML =
              '<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.8"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';
          }
        }

        function applyTheme(theme) {
          document.documentElement.setAttribute("data-theme", theme);
          try {
            localStorage.setItem(THEME_KEY, theme);
          } catch (e) {}
          const toggleBtn = document.getElementById("themeToggle");
          if (toggleBtn) {
            toggleBtn.title =
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
            toggleBtn.setAttribute(
              "aria-pressed",
              theme === "dark" ? "true" : "false",
            );
          }
          updateThemeIcon(theme);
        }

        function initTheme() {
          let saved = null;
          try {
            saved = localStorage.getItem(THEME_KEY);
          } catch (e) {}
          applyTheme(saved === "dark" ? "dark" : "light");
        }
        initTheme();

        /* ============================= CONFIG ============================= */

        const SEGMENTS = [
          {
            label: "100",
            icon: "🪙",
            value: 100,
            weight: 10,
            color: "#F5C451",
          },
          {
            label: "Free Spin",
            icon: "🔄",
            value: 0,
            weight: 8,
            isFreeSpin: true,
            color: "#4C2A8C",
          },
          { label: "500", icon: "💰", value: 500, weight: 5, color: "#E8A93C" },
          { label: "20", icon: "🪙", value: 20, weight: 14, color: "#6B3FB8" },
          {
            label: "JACKPOT",
            icon: "💎",
            value: 3000,
            weight: 2,
            isJackpot: true,
            color: "#FFE8A3",
          },
          { label: "50", icon: "🪙", value: 50, weight: 12, color: "#3A2270" },
          {
            label: "Mystery",
            icon: "🎁",
            value: 150,
            weight: 7,
            color: "#F5C451",
          },
          { label: "10", icon: "🪙", value: 10, weight: 16, color: "#4C2A8C" },
          { label: "200", icon: "💰", value: 200, weight: 6, color: "#E8A93C" },
          { label: "VIP", icon: "👑", value: 800, weight: 3, color: "#6B3FB8" },
          { label: "5", icon: "🪙", value: 5, weight: 18, color: "#3A2270" },
          {
            label: "Lucky Star",
            icon: "⭐",
            value: 250,
            weight: 4,
            color: "#F5C451",
          },
        ];

        const WINNER_NAMES = [
          "Amara K.",
          "Devon R.",
          "Priya S.",
          "Marcus L.",
          "Elena V.",
          "Noah T.",
          "Yuki M.",
          "Isabella F.",
        ];
        const AVATAR_EMOJI = ["🐯", "🦁", "🐺", "🦊", "🐉", "🦅", "🐬", "🦄"];

        const STORAGE_KEY = "starhela_spinwin_v1";
        const TRIAL_SPIN_LIMIT = 3;
        const REGISTERED_TICKET_CAP = 5;
        const TICKET_REGEN_MS = 5 * 60 * 1000;

        /* ============================= STATE ============================= */

        function defaultState() {
          return {
            registered: false,
            name: null,
            email: null,
            coins: 0,
            lifetimeCoins: 0,
            ticketsLeft: TRIAL_SPIN_LIMIT,
            trialSpinsUsed: 0,
            lastSegmentIndex: null,
            history: [],
          };
        }

        function loadState() {
          try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return defaultState();
            const saved = JSON.parse(raw);
            return { ...defaultState(), ...saved };
          } catch (e) {
            return defaultState();
          }
        }

        function saveState() {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          } catch (e) {}
        }

        const state = {
          ...loadState(),
          isSpinning: false,
          currentRotation: 0,
          soundOn: true,
        };

        /* ============================= DOM REFS ============================= */

        const $ = (id) => document.getElementById(id);
        const wheelCanvas = $("wheelCanvas");
        const wheelCtx = wheelCanvas.getContext("2d");
        const confettiCanvas = $("confettiCanvas");
        const confettiCtx = confettiCanvas.getContext("2d");
        const particleCanvas = $("particleCanvas");
        const particleCtx = particleCanvas.getContext("2d");

        const spinButton = $("spinButton");
        const hubSpinBtn = $("hubSpinBtn");
        const ticketCountEl = $("ticketCount");
        const ticketPillText = $("ticketPillText");
        const coinBalanceEl = $("coinBalance");
        const coinLabelEl = $("coinLabel");
        const walletBalanceEl = $("walletBalance");
        const modalOverlay = $("modalOverlay");
        const modalIcon = $("modalIcon");
        const modalTitle = $("modalTitle");
        const modalAmount = $("modalAmount");
        const historyBody = $("historyBody");
        const winnersList = $("winnersList");
        const sparkleLayer = $("sparkleLayer");
        const trialFill = $("trialFill");
        const trialText = $("trialText");
        const avatarInitial = $("avatarInitial");
        const avatarBtn = $("avatarBtn");
        const soundBtn = $("soundBtn");

        const authOverlay = $("authOverlay");
        const authGateView = $("authGateView");
        const gateCoinsEarned = $("gateCoinsEarned");
        const gateDeclineBtn = $("gateDeclineBtn");
        const toastStack = $("toastStack");

        /* ============================= AUDIO ============================= */

        let audioCtx = null;
        function ensureAudio() {
          if (!audioCtx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (AC) audioCtx = new AC();
          }
          return audioCtx;
        }
        function playTone(
          freq,
          duration,
          type = "sine",
          gainPeak = 0.05,
          delay = 0,
        ) {
          if (!state.soundOn) return;
          const ctx = ensureAudio();
          if (!ctx) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = type;
          osc.frequency.value = freq;
          osc.connect(gain);
          gain.connect(ctx.destination);
          const t0 = ctx.currentTime + delay;
          gain.gain.setValueAtTime(0.0001, t0);
          gain.gain.exponentialRampToValueAtTime(gainPeak, t0 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
          osc.start(t0);
          osc.stop(t0 + duration + 0.05);
        }
        function sfxTick() {
          playTone(1200, 0.05, "square", 0.03);
        }
        function sfxWin() {
          playTone(660, 0.18, "triangle", 0.06, 0);
          playTone(880, 0.18, "triangle", 0.06, 0.12);
          playTone(1320, 0.3, "triangle", 0.07, 0.24);
        }
        function sfxJackpot() {
          [523, 659, 784, 1046, 1318].forEach((f, i) =>
            playTone(f, 0.35, "triangle", 0.07, i * 0.09),
          );
        }

        /* ============================= AMBIENT PARTICLES ============================= */

        function initParticles() {
          let particles = [];
          function resize() {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
          }
          resize();
          window.addEventListener("resize", resize);

          const COUNT = window.innerWidth < 700 ? 26 : 46;
          for (let i = 0; i < COUNT; i++) {
            particles.push({
              x: Math.random() * particleCanvas.width,
              y: Math.random() * particleCanvas.height,
              r: Math.random() * 1.8 + 0.4,
              vy: -(Math.random() * 0.25 + 0.05),
              vx: (Math.random() - 0.5) * 0.15,
              alpha: Math.random() * 0.5 + 0.15,
              hue: Math.random() > 0.5 ? "245,196,81" : "139,92,246",
            });
          }

          function tick() {
            particleCtx.clearRect(
              0,
              0,
              particleCanvas.width,
              particleCanvas.height,
            );
            for (const p of particles) {
              p.x += p.vx;
              p.y += p.vy;
              if (p.y < -10) {
                p.y = particleCanvas.height + 10;
                p.x = Math.random() * particleCanvas.width;
              }
              if (p.x < -10) p.x = particleCanvas.width + 10;
              if (p.x > particleCanvas.width + 10) p.x = -10;
              particleCtx.beginPath();
              particleCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              particleCtx.fillStyle = `rgba(${p.hue},${p.alpha})`;
              particleCtx.fill();
            }
            requestAnimationFrame(tick);
          }
          tick();
        }

        /* ============================= WHEEL DRAWING ============================= */

        const WHEEL_SIZE = 640;
        const WHEEL_RADIUS = 300;
        const WHEEL_CENTER = WHEEL_SIZE / 2;

        function drawWheel(rotationDeg = 0) {
          const count = SEGMENTS.length;
          const anglePerSeg = (2 * Math.PI) / count;
          const rotRad = (rotationDeg * Math.PI) / 180;

          wheelCtx.clearRect(0, 0, WHEEL_SIZE, WHEEL_SIZE);

          const ringGrad = wheelCtx.createRadialGradient(
            WHEEL_CENTER,
            WHEEL_CENTER,
            WHEEL_RADIUS - 6,
            WHEEL_CENTER,
            WHEEL_CENTER,
            WHEEL_RADIUS + 14,
          );
          ringGrad.addColorStop(0, "#3a2b12");
          ringGrad.addColorStop(0.5, "#F5C451");
          ringGrad.addColorStop(1, "#7a5217");
          wheelCtx.beginPath();
          wheelCtx.arc(
            WHEEL_CENTER,
            WHEEL_CENTER,
            WHEEL_RADIUS + 12,
            0,
            Math.PI * 2,
          );
          wheelCtx.fillStyle = ringGrad;
          wheelCtx.fill();

          for (let i = 0; i < count; i++) {
            const start = i * anglePerSeg + rotRad;
            const end = start + anglePerSeg;

            wheelCtx.beginPath();
            wheelCtx.moveTo(WHEEL_CENTER, WHEEL_CENTER);
            wheelCtx.arc(WHEEL_CENTER, WHEEL_CENTER, WHEEL_RADIUS, start, end);
            wheelCtx.closePath();

            const segGrad = wheelCtx.createLinearGradient(
              WHEEL_CENTER,
              WHEEL_CENTER,
              WHEEL_CENTER + Math.cos(start + anglePerSeg / 2) * WHEEL_RADIUS,
              WHEEL_CENTER + Math.sin(start + anglePerSeg / 2) * WHEEL_RADIUS,
            );
            segGrad.addColorStop(0, shadeColor(SEGMENTS[i].color, -25));
            segGrad.addColorStop(1, SEGMENTS[i].color);
            wheelCtx.fillStyle = segGrad;
            wheelCtx.fill();
            wheelCtx.strokeStyle = "rgba(11,10,23,0.65)";
            wheelCtx.lineWidth = 2;
            wheelCtx.stroke();

            const mid = start + anglePerSeg / 2;
            const normalizedMid =
              ((mid % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
            const onLeftHalf =
              normalizedMid > Math.PI / 2 && normalizedMid < (Math.PI * 3) / 2;
            const textRot = mid + Math.PI / 2 + (onLeftHalf ? Math.PI : 0);

            const iconR = WHEEL_RADIUS * 0.72;
            const ix = WHEEL_CENTER + Math.cos(mid) * iconR;
            const iy = WHEEL_CENTER + Math.sin(mid) * iconR;
            wheelCtx.save();
            wheelCtx.translate(ix, iy);
            wheelCtx.rotate(textRot);
            wheelCtx.font = '38px "Segoe UI Emoji", sans-serif';
            wheelCtx.textAlign = "center";
            wheelCtx.textBaseline = "middle";
            wheelCtx.fillText(SEGMENTS[i].icon, 0, 0);
            wheelCtx.restore();

            const labelR = onLeftHalf
              ? WHEEL_RADIUS * 0.5
              : WHEEL_RADIUS * 0.42;
            const lx = WHEEL_CENTER + Math.cos(mid) * labelR;
            const ly = WHEEL_CENTER + Math.sin(mid) * labelR;
            wheelCtx.save();
            wheelCtx.translate(lx, ly);
            wheelCtx.rotate(textRot);
            wheelCtx.font = "700 17px Poppins, sans-serif";
            wheelCtx.textAlign = "center";
            wheelCtx.textBaseline = "middle";
            wheelCtx.fillStyle = isLightColor(SEGMENTS[i].color)
              ? "#1a1226"
              : "#FFF6DE";
            wheelCtx.fillText(SEGMENTS[i].label, 0, 0);
            wheelCtx.restore();
          }

          wheelCtx.beginPath();
          wheelCtx.arc(
            WHEEL_CENTER,
            WHEEL_CENTER,
            WHEEL_RADIUS - 2,
            0,
            Math.PI * 2,
          );
          wheelCtx.strokeStyle = "rgba(0,0,0,0.35)";
          wheelCtx.lineWidth = 6;
          wheelCtx.stroke();
        }

        function shadeColor(hex, percent) {
          const num = parseInt(hex.replace("#", ""), 16);
          let r = (num >> 16) + Math.round(2.55 * percent);
          let g = ((num >> 8) & 0x00ff) + Math.round(2.55 * percent);
          let b = (num & 0x0000ff) + Math.round(2.55 * percent);
          r = Math.max(0, Math.min(255, r));
          g = Math.max(0, Math.min(255, g));
          b = Math.max(0, Math.min(255, b));
          return `rgb(${r},${g},${b})`;
        }
        function isLightColor(hex) {
          const num = parseInt(hex.replace("#", ""), 16);
          const r = num >> 16,
            g = (num >> 8) & 0xff,
            b = num & 0xff;
          return 0.299 * r + 0.587 * g + 0.114 * b > 165;
        }

        /* ============================= SPIN ENGINE ============================= */

        function weightedPick() {
          const pool = SEGMENTS.map((s, i) => ({ i, weight: s.weight }));
          const avoidIndex = state.lastSegmentIndex;
          const filtered =
            pool.length > 1 ? pool.filter((p) => p.i !== avoidIndex) : pool;
          const usable = filtered.length ? filtered : pool;
          const total = usable.reduce((sum, p) => sum + p.weight, 0);
          let r = Math.random() * total;
          for (const p of usable) {
            r -= p.weight;
            if (r <= 0) return p.i;
          }
          return usable[usable.length - 1].i;
        }

        function performSpin() {
          if (state.isSpinning) return;

          if (!state.registered && state.trialSpinsUsed >= TRIAL_SPIN_LIMIT) {
            openAuthGate();
            return;
          }
          if (state.ticketsLeft <= 0) {
            shakeButton(spinButton);
            toast(
              state.registered
                ? "No spins left — check back after your daily refresh."
                : "No spins left.",
              "error",
            );
            return;
          }

          state.isSpinning = true;
          state.ticketsLeft -= 1;
          if (!state.registered) state.trialSpinsUsed += 1;
          saveState();
          updateWalletUI();
          setSpinButtonsDisabled();

          const chosenIndex = weightedPick();
          const segCount = SEGMENTS.length;
          const segAngle = 360 / segCount;
          const targetSegMiddle = chosenIndex * segAngle + segAngle / 2;
          let targetRotation =
            270 - targetSegMiddle + 360 * (7 + Math.floor(Math.random() * 4));
          while (targetRotation <= state.currentRotation) targetRotation += 360;

          const startRotation = state.currentRotation;
          const deltaRotation = targetRotation - startRotation;
          const duration = 5200 + Math.random() * 800;
          const startTime = performance.now();
          let lastTickSegment = -1;

          function animate(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 5);
            const rot = startRotation + deltaRotation * eased;
            state.currentRotation = rot;
            drawWheel(rot);

            const normalized = (((270 - rot) % 360) + 360) % 360;
            const seg = Math.floor(normalized / segAngle);
            if (seg !== lastTickSegment) {
              lastTickSegment = seg;
              sfxTick();
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              state.currentRotation = targetRotation;
              drawWheel(targetRotation);
              onSpinComplete(chosenIndex);
            }
          }
          requestAnimationFrame(animate);
        }

        function onSpinComplete(index) {
          const prize = SEGMENTS[index];
          state.isSpinning = false;
          state.lastSegmentIndex = index;

          if (prize.isFreeSpin) {
            state.ticketsLeft += 1;
          } else {
            state.coins += prize.value;
            state.lifetimeCoins += prize.value;
          }
          saveState();
          updateWalletUI();
          pushHistory(prize);

          launchConfetti(prize.isJackpot ? 260 : 130);
          launchSparkles();
          if (prize.isJackpot) sfxJackpot();
          else sfxWin();

          openModal(prize);
        }

        function setSpinButtonsDisabled() {
          const trialExhausted =
            !state.registered && state.trialSpinsUsed >= TRIAL_SPIN_LIMIT;
          spinButton.disabled =
            state.isSpinning || (state.ticketsLeft <= 0 && !trialExhausted);
          hubSpinBtn.style.pointerEvents = state.isSpinning ? "none" : "auto";
          ticketCountEl.textContent = Math.max(0, state.ticketsLeft);
          updateTicketPillText();
          updateTrialStrip();
        }

        function updateTicketPillText() {
          if (state.registered) {
            ticketPillText.innerHTML = `<span id="ticketCount">${Math.max(0, state.ticketsLeft)}</span> spins left today`;
          } else {
            const remaining = Math.max(
              0,
              TRIAL_SPIN_LIMIT - state.trialSpinsUsed,
            );
            ticketPillText.innerHTML = `<span id="ticketCount">${remaining}</span> free spins left`;
          }
        }

        function updateTrialStrip() {
          if (state.registered) {
            trialFill.style.width = "100%";
            trialText.textContent = `Welcome back${state.name ? ", " + state.name.split(" ")[0] : ""} — your coins are saved.`;
            return;
          }
          const used = Math.min(state.trialSpinsUsed, TRIAL_SPIN_LIMIT);
          trialFill.style.width = `${(used / TRIAL_SPIN_LIMIT) * 100}%`;
          if (used >= TRIAL_SPIN_LIMIT) {
            trialText.textContent =
              "Free trial complete — register to save your coins and keep spinning.";
          } else {
            trialText.textContent = `Free trial: spin ${TRIAL_SPIN_LIMIT - used} more time${TRIAL_SPIN_LIMIT - used === 1 ? "" : "s"}, then register to save your coins.`;
          }
        }

        function shakeButton(el) {
          el.animate(
            [
              { transform: "translateX(0)" },
              { transform: "translateX(-6px)" },
              { transform: "translateX(6px)" },
              { transform: "translateX(0)" },
            ],
            { duration: 300, easing: "ease-in-out" },
          );
        }

        function updateWalletUI() {
          coinBalanceEl.textContent = state.coins.toLocaleString();
          walletBalanceEl.textContent = state.lifetimeCoins.toLocaleString();
          coinLabelEl.textContent = state.registered
            ? "Coins"
            : "Coins (unsaved)";
          ticketCountEl.textContent = Math.max(0, state.ticketsLeft);
        }

        /* ============================= HISTORY & WINNERS ============================= */

        function pushHistory(prize) {
          const row = document.createElement("tr");
          const time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const rewardText = prize.isFreeSpin
            ? "Free spin"
            : `+${prize.value} coins`;
          row.innerHTML = `<td>${prize.icon} ${prize.label}</td><td style="color:var(--ink-gold)">${rewardText}</td><td style="color:var(--text-muted)">${time}</td>`;
          historyBody.prepend(row);
          while (historyBody.children.length > 6)
            historyBody.removeChild(historyBody.lastChild);
        }

        function seedHistory() {
          const samples = [
            { icon: "🪙", label: "50", value: 50 },
            { icon: "🎁", label: "Mystery", value: 150 },
            { icon: "🪙", label: "10", value: 10 },
            { icon: "💰", label: "200", value: 200 },
          ];
          samples.forEach((s, i) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${s.icon} ${s.label}</td><td style="color:var(--ink-gold)">+${s.value} coins</td><td style="color:var(--text-muted)">${(i + 1) * 3}m ago</td>`;
            historyBody.appendChild(row);
          });
        }

        function seedWinners() {
          winnersList.innerHTML = "";
          for (let i = 0; i < 5; i++) {
            const name =
              WINNER_NAMES[Math.floor(Math.random() * WINNER_NAMES.length)];
            const avatar =
              AVATAR_EMOJI[Math.floor(Math.random() * AVATAR_EMOJI.length)];
            const amount = [80, 150, 300, 500, 1200][
              Math.floor(Math.random() * 5)
            ];
            const li = document.createElement("li");
            li.innerHTML = `
            <span class="winner-avatar">${avatar}</span>
            <span class="winner-info"><strong>${name}</strong><span>${i + 1} min ago</span></span>
            <span class="winner-amount">+${amount}</span>`;
            winnersList.appendChild(li);
          }
        }

        /* ============================= CONFETTI ============================= */

        let confettiPieces = [];
        function resizeConfettiCanvas() {
          confettiCanvas.width = confettiCanvas.clientWidth;
          confettiCanvas.height = confettiCanvas.clientHeight;
        }

        function launchConfetti(count) {
          resizeConfettiCanvas();
          const colors = [
            "#F5C451",
            "#FFE8A3",
            "#8B5CF6",
            "#2ED9A0",
            "#F45B8D",
          ];
          const cx = confettiCanvas.width / 2;
          const cy = confettiCanvas.height / 2;
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 3;
            confettiPieces.push({
              x: cx,
              y: cy,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 2,
              size: Math.random() * 7 + 4,
              color: colors[Math.floor(Math.random() * colors.length)],
              rot: Math.random() * 360,
              vr: (Math.random() - 0.5) * 12,
              life: 0,
              maxLife: 70 + Math.random() * 40,
            });
          }
          if (!confettiRunning) runConfetti();
        }

        let confettiRunning = false;
        function runConfetti() {
          confettiRunning = true;
          confettiCtx.clearRect(
            0,
            0,
            confettiCanvas.width,
            confettiCanvas.height,
          );
          confettiPieces.forEach((p) => {
            p.vy += 0.13;
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.vr;
            p.life += 1;
            const alpha = Math.max(0, 1 - p.life / p.maxLife);
            confettiCtx.save();
            confettiCtx.translate(p.x, p.y);
            confettiCtx.rotate((p.rot * Math.PI) / 180);
            confettiCtx.globalAlpha = alpha;
            confettiCtx.fillStyle = p.color;
            confettiCtx.fillRect(
              -p.size / 2,
              -p.size / 2,
              p.size,
              p.size * 0.6,
            );
            confettiCtx.restore();
          });
          confettiPieces = confettiPieces.filter((p) => p.life < p.maxLife);
          if (confettiPieces.length > 0) {
            requestAnimationFrame(runConfetti);
          } else {
            confettiCtx.clearRect(
              0,
              0,
              confettiCanvas.width,
              confettiCanvas.height,
            );
            confettiRunning = false;
          }
        }

        /* ============================= SPARKLES ============================= */

        function launchSparkles() {
          const rect = wheelCanvas.getBoundingClientRect();
          for (let i = 0; i < 18; i++) {
            const s = document.createElement("div");
            s.className = "sparkle";
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * (rect.width / 2);
            const x = rect.left + rect.width / 2 + Math.cos(angle) * dist;
            const y = rect.top + rect.height / 2 + Math.sin(angle) * dist;
            s.style.left = `${x}px`;
            s.style.top = `${y}px`;
            s.style.animationDelay = `${Math.random() * 0.3}s`;
            sparkleLayer.appendChild(s);
            setTimeout(() => s.remove(), 1300);
          }
        }

        /* ============================= MODAL ============================= */

        function openModal(prize) {
          modalIcon.textContent = prize.icon;
          if (prize.isJackpot) {
            modalTitle.textContent = "JACKPOT! You hit the big one!";
          } else if (prize.isFreeSpin) {
            modalTitle.textContent = "A free spin, on the house!";
          } else {
            modalTitle.textContent = `You won ${prize.label}!`;
          }
          modalAmount.textContent = prize.isFreeSpin
            ? "+1 free spin"
            : `+${prize.value} coins`;
          modalOverlay.classList.add("is-open");
        }
        function closeModal() {
          modalOverlay.classList.remove("is-open");
          setSpinButtonsDisabled();
          if (!state.registered && state.trialSpinsUsed >= TRIAL_SPIN_LIMIT) {
            setTimeout(openAuthGate, 260);
          }
        }

        /* ============================= JACKPOT TICKER ============================= */

        let jackpotValue = 428650;
        function renderJackpotDigits() {
          const el = $("jackpotTicker");
          el.innerHTML = "";
          const str = jackpotValue.toLocaleString();
          for (const ch of str) {
            const span = document.createElement("span");
            span.className = ch === "," ? "" : "jackpot-digit";
            span.textContent = ch;
            el.appendChild(span);
          }
        }
        function tickJackpot() {
          jackpotValue += Math.floor(Math.random() * 6) + 1;
          renderJackpotDigits();
        }

        /* ============================= COUNTDOWN ============================= */

        function startCountdown() {
          let secondsLeft = TICKET_REGEN_MS / 1000;
          const el = $("countdownTimer");
          const label = document.querySelector(".countdown-card__label");

          function render() {
            const m = Math.floor(secondsLeft / 60)
              .toString()
              .padStart(2, "0");
            const s = (secondsLeft % 60).toString().padStart(2, "0");
            el.textContent = `${m}:${s}`;
            if (label) {
              label.textContent = state.registered
                ? "Next free spin in"
                : "Register for daily free spins";
            }
          }
          render();
          setInterval(() => {
            secondsLeft =
              secondsLeft > 0 ? secondsLeft - 1 : TICKET_REGEN_MS / 1000;
            if (
              secondsLeft === TICKET_REGEN_MS / 1000 &&
              state.registered &&
              state.ticketsLeft < REGISTERED_TICKET_CAP
            ) {
              state.ticketsLeft += 1;
              saveState();
              updateWalletUI();
              setSpinButtonsDisabled();
              toast("A new free spin is ready!", "success");
            }
            render();
          }, 1000);
        }

        /* ============================= ANIMATED STAT COUNTERS ============================= */

        function animateCounters() {
          const blocks = document.querySelectorAll(".stat-block__value");
          const io = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  animateOne(entry.target);
                  io.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.4 },
          );
          blocks.forEach((b) => io.observe(b));

          function animateOne(el) {
            const target = parseInt(el.dataset.target, 10);
            const prefix = el.dataset.prefix || "";
            const duration = 1600;
            const start = performance.now();
            function step(now) {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const value = Math.floor(target * eased);
              el.textContent = prefix + value.toLocaleString();
              if (progress < 1) requestAnimationFrame(step);
              else el.textContent = prefix + target.toLocaleString();
            }
            requestAnimationFrame(step);
          }
        }

        /* ============================= ACCOUNT / AUTH ============================= */

        function syncAccountUI() {
          if (state.registered) {
            const initial =
              (state.name || "?").trim().charAt(0).toUpperCase() || "?";
            avatarInitial.textContent = initial;
            avatarBtn.title = `Signed in as ${state.name}`;
          } else {
            avatarInitial.textContent = "?";
            avatarBtn.title = "Guest — not registered";
          }
          updateTicketPillText();
          updateTrialStrip();
        }

        function openAuthGate() {
          gateCoinsEarned.textContent = state.coins.toLocaleString();
          authOverlay.classList.add("is-open");
        }

        function closeAuthOverlay() {
          authOverlay.classList.remove("is-open");
        }

        function declineAndResetTrial() {
          const lost = state.coins;
          state.coins = 0;
          state.trialSpinsUsed = 0;
          state.ticketsLeft = TRIAL_SPIN_LIMIT;
          state.lastSegmentIndex = null;
          saveState();
          updateWalletUI();
          setSpinButtonsDisabled();
          closeAuthOverlay();
          toast(
            lost > 0
              ? `Trial reset — ${lost.toLocaleString()} unsaved coins were cleared. Spin again anytime!`
              : "Trial reset. Spin again anytime!",
            "error",
          );
        }

        /* ============================= TOASTS ============================= */

        function toast(message, kind = "success") {
          const el = document.createElement("div");
          el.className = `toast toast--${kind}`;
          el.textContent = message;
          toastStack.appendChild(el);
          setTimeout(() => {
            el.classList.add("is-leaving");
            setTimeout(() => el.remove(), 320);
          }, 3600);
        }

        /* ============================= RIPPLE ============================= */

        function attachRipple(el) {
          el.addEventListener("click", (e) => {
            const rect = el.getBoundingClientRect();
            const ripple = document.createElement("span");
            const size = Math.max(rect.width, rect.height);
            ripple.className = "ripple";
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            el.style.position = el.style.position || "relative";
            el.style.overflow = "hidden";
            el.appendChild(ripple);
            setTimeout(() => ripple.remove(), 620);
          });
        }

        /* ============================= INIT ============================= */

        function init() {
          drawWheel(0);
          seedHistory();
          seedWinners();
          renderJackpotDigits();
          startCountdown();
          animateCounters();
          initParticles();
          syncAccountUI();
          updateWalletUI();
          setSpinButtonsDisabled();

          if (!state.registered && state.trialSpinsUsed >= TRIAL_SPIN_LIMIT) {
            setTimeout(openAuthGate, 500);
          }

          setInterval(tickJackpot, 2600);
          setInterval(seedWinners, 9000);

          [
            spinButton,
            hubSpinBtn,
            $("modalCollect"),
            $("modalContinue"),
          ].forEach(attachRipple);

          spinButton.addEventListener("click", performSpin);
          hubSpinBtn.addEventListener("click", performSpin);
          wheelCanvas.addEventListener("click", performSpin);

          $("modalCollect").addEventListener("click", closeModal);
          $("modalContinue").addEventListener("click", closeModal);
          modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) closeModal();
          });

          avatarBtn.addEventListener("click", () => {
            if (state.registered) {
              if (confirm(`Signed in as ${state.name}. Sign out?`)) {
                const fresh = defaultState();
                Object.assign(state, fresh);
                saveState();
                syncAccountUI();
                updateWalletUI();
                setSpinButtonsDisabled();
                toast("Signed out. Trial spins reset.", "success");
              }
            } else {
              openAuthGate();
            }
          });

          gateDeclineBtn.addEventListener("click", declineAndResetTrial);
          authOverlay.addEventListener("click", (e) => {
            if (e.target === authOverlay) closeAuthOverlay();
          });

          soundBtn.addEventListener("click", () => {
            state.soundOn = !state.soundOn;
            soundBtn.classList.toggle("is-muted", !state.soundOn);
            soundBtn.title = state.soundOn ? "Mute sound" : "Unmute sound";
          });

          $("themeToggle").addEventListener("click", () => {
            const current =
              document.documentElement.getAttribute("data-theme") || "light";
            applyTheme(current === "light" ? "dark" : "light");
          });

          window.addEventListener("resize", resizeConfettiCanvas);
        }

        document.addEventListener("DOMContentLoaded", init);
      })();