// Campaign carousel: retain six stable positions and quietly refresh one
      // card at a time, so there is always more to discover without a grid jump.
      (function () {
        const grid = document.querySelector(".ad-grid");
        if (
          !grid ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;

        const allCards = Array.from(grid.querySelectorAll(".ad-card"));
        if (allCards.length <= 6) return;

        const campaigns = allCards.map((card) => card.innerHTML);
        const slots = allCards.slice(0, 6);
        allCards.slice(6).forEach((card) => card.remove());

        let slotIndex = 0;
        let campaignIndex = 6;
        let paused = false;

        function rotateCampaign() {
          if (!paused && !document.hidden) {
            const slot = slots[slotIndex];
            slot.classList.add("ad-card--switching");
            window.setTimeout(() => {
              slot.innerHTML = campaigns[campaignIndex];
              campaignIndex = (campaignIndex + 1) % campaigns.length;
              slotIndex = (slotIndex + 1) % slots.length;
              requestAnimationFrame(() =>
                slot.classList.remove("ad-card--switching"),
              );
            }, 480);
          }
          window.setTimeout(rotateCampaign, 3200);
        }

        grid.addEventListener("mouseenter", () => (paused = true));
        grid.addEventListener("mouseleave", () => (paused = false));
        grid.addEventListener("focusin", () => (paused = true));
        grid.addEventListener("focusout", () => (paused = false));
        window.setTimeout(rotateCampaign, 4200);
      })();

      // Pages
      const pgHome = document.getElementById("pgHome"),
        pgDash = document.getElementById("pgDash");
      const navH = document.getElementById("navH"),
        navD = document.getElementById("navD");

      function goPage(p) {
        pgHome.classList.toggle("on", p === "home");
        pgDash.classList.toggle("on", p === "dash");
        navH.classList.toggle("on", p === "home");
        navD.classList.toggle("on", p === "dash");
        // bottom nav active state
        document
          .querySelectorAll(".bn-item")
          .forEach((b) => b.classList.remove("on"));
        if (p === "home") document.getElementById("bnHome").classList.add("on");
        if (p === "dash") document.getElementById("bnDash").classList.add("on");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      navH.onclick = () => goPage("home");
      navD.onclick = () => goPage("dash");
      document.getElementById("bnHome").onclick = () => goPage("home");
      document.getElementById("bnDash").onclick = () => goPage("dash");

      // Tabs
      document.querySelectorAll(".tab").forEach((t) => {
        t.onclick = () => {
          document
            .querySelectorAll(".tab")
            .forEach((x) => x.classList.remove("on"));
          document
            .querySelectorAll(".tc")
            .forEach((x) => x.classList.remove("on"));
          t.classList.add("on");
          document.getElementById("tc-" + t.dataset.tab).classList.add("on");
        };
      });

      // Modal
      const ld = document.getElementById("ldOverlay");
      const ldTitle = document.getElementById("ldTitle");
      const ldMsg = document.getElementById("ldMsg");
      const ldBar = document.getElementById("ldBar");
      const ldCta = document.getElementById("ldCta");
      const ldSkip = document.getElementById("ldSkip");
      const ldSpinner = document.getElementById("ldSpinner");
      const ldIco = document.getElementById("ldIco");
      const ls = [
        document.getElementById("ls1"),
        document.getElementById("ls2"),
        document.getElementById("ls3"),
      ];

      function runLoader(type) {
        ldBar.style.width = "0%";
        ldCta.style.display = "none";
        ldSkip.style.display = "none";
        ldSpinner.style.display = "block";
        ldIco.style.display = "none";
        ls.forEach((s) => (s.className = "ld-step"));
        ldTitle.textContent =
          type === "earn" ? "Loading ad campaign…" : "Preparing upload portal…";
        ldMsg.textContent =
          type === "earn"
            ? "Checking campaign details and your account status."
            : "Setting up your advertiser account. Just a moment.";
        ldCta.href = "https://starhela.com/register.php?ref=sydney";
        ldCta.textContent =
          type === "earn"
            ? "Create Account to Start Earning →"
            : "Create Account to Upload Ads →";
        ld.classList.add("show");
        let pct = 0,
          step = 0;
        const stepTimes = [28, 58, 85];
        const iv = setInterval(() => {
          pct += Math.random() * 9 + 3;
          if (pct > 100) pct = 100;
          ldBar.style.width = pct + "%";
          stepTimes.forEach((t, i) => {
            if (pct >= t && step <= i) {
              ls[i].classList.add("active");
              step = i + 1;
            }
          });
          if (pct === 100) {
            clearInterval(iv);
            setTimeout(() => showResult(type), 340);
          }
        }, 110);
      }

      function showResult(type) {
        ls.forEach((s) => s.classList.add("done"));
        ldSpinner.style.display = "none";
        ldIco.style.display = "block";
        ldIco.textContent = type === "earn" ? "💰" : "📤";
        ldTitle.textContent = "You don't have an account yet";
        ldMsg.textContent =
          type === "earn"
            ? "Kindly create your account to click the ad and start earning on StarHela."
            : "Kindly create your account to upload your advert on StarHela.";
        ldCta.style.display = "block";
        ldSkip.style.display = "block";
      }

      function closeLoader() {
        ld.classList.remove("show");
      }
      document.getElementById("ldSkip").onclick = closeLoader;
      ld.addEventListener("click", (e) => {
        if (e.target === ld) closeLoader();
      });

      document.addEventListener("click", (e) => {
        if (e.target.closest("[data-earn]")) {
          e.preventDefault();
          runLoader("earn");
        }
        if (e.target.closest("[data-upload]")) {
          e.preventDefault();
          runLoader("upload");
        }
        if (
          e.target === document.getElementById("bizBtn") ||
          e.target === document.getElementById("hAdBtn")
        ) {
          e.preventDefault();
          runLoader("upload");
        }
      });