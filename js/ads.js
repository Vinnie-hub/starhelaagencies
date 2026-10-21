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

