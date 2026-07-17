// LOADER
      window.addEventListener("load", () => {
        setTimeout(
          () => document.getElementById("loader").classList.add("hide"),
          2000,
        );
      });

      // MOBILE MENU
      const ham = document.getElementById("ham"),
        mobNav = document.getElementById("mobNav");
      if (ham && mobNav) {
        ham.addEventListener("click", () => {
          const o = mobNav.classList.toggle("open");
          ham.setAttribute("aria-expanded", o);
        });
        mobNav.querySelectorAll("a").forEach((a) =>
          a.addEventListener("click", () => {
            mobNav.classList.remove("open");
            ham.setAttribute("aria-expanded", "false");
          }),
        );
      }

      // MODAL
      function openModal() {
        const m = document.getElementById("surveyModal"),
          inner = m.querySelector(".modal-inner");
        m.style.opacity = "1";
        m.style.visibility = "visible";
        inner.style.transform = "scale(1) translateY(0)";
        document.body.style.overflow = "hidden";
      }
      function closeModal() {
        const m = document.getElementById("surveyModal"),
          inner = m.querySelector(".modal-inner");
        m.style.opacity = "0";
        m.style.visibility = "hidden";
        inner.style.transform = "scale(.96) translateY(10px)";
        document.body.style.overflow = "";
      }
      document
        .getElementById("modalClose")
        .addEventListener("click", closeModal);
      document.getElementById("surveyModal").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeModal();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
      });

      // SURVEY DATA
      const allSurveys = [
        {
          cat: "shopping",
          icon: "fas fa-shopping-cart",
          iconBg: "var(--blue-bg)",
          iconColor: "var(--blue)",
          badge: "Hot",
          badgeClass: "badge-hot",
          earn: "$7.20",
          title: "Online Shopping Behaviour",
          desc: "Help global e-commerce brands understand buying patterns across African markets. Quick and straightforward questions.",
          time: "14 min",
          match: "88%",
          spots: 23,
          payout: "Instant",
        },
        {
          cat: "tech",
          icon: "fas fa-mobile-alt",
          iconBg: "var(--amber-bg)",
          iconColor: "var(--amber)",
          badge: "New",
          badgeClass: "badge-new",
          earn: "$4.80",
          title: "Mobile App Experience",
          desc: "Test a new app and share detailed feedback. Your review will directly shape the experience for millions of users.",
          time: "9 min",
          match: "92%",
          spots: 45,
          payout: "< 12h",
        },
        {
          cat: "health",
          icon: "fas fa-heartbeat",
          iconBg: "var(--green-bg)",
          iconColor: "var(--green)",
          badge: "Featured",
          badgeClass: "badge-feat",
          earn: "$11.50",
          title: "Health & Wellness Trends",
          desc: "Research study on lifestyle and wellness preferences in Africa. Share your habits to help brands build better products.",
          time: "20 min",
          match: "67%",
          spots: 12,
          payout: "24h",
        },
        {
          cat: "finance",
          icon: "fas fa-chart-bar",
          iconBg: "var(--purple-bg)",
          iconColor: "var(--purple)",
          badge: "Popular",
          badgeClass: "badge-pop",
          earn: "$14.00",
          title: "Digital Banking Habits",
          desc: "Leading bank wants to understand how Africans interact with mobile banking and digital financial services.",
          time: "22 min",
          match: "74%",
          spots: 8,
          payout: "24h",
        },
        {
          cat: "food",
          icon: "fas fa-utensils",
          iconBg: "var(--orange-bg)",
          iconColor: "var(--orange)",
          badge: "New",
          badgeClass: "badge-new",
          earn: "$5.40",
          title: "Food Delivery Preferences",
          desc: "Share your experience with food delivery apps and restaurant choices. Help brands improve their African market strategy.",
          time: "10 min",
          match: "81%",
          spots: 34,
          payout: "< 12h",
        },
        {
          cat: "auto",
          icon: "fas fa-car",
          iconBg: "var(--red-bg)",
          iconColor: "var(--red)",
          badge: "Hot",
          badgeClass: "badge-hot",
          earn: "$18.00",
          title: "Vehicle Ownership Survey",
          desc: "Tell automotive manufacturers about your vehicle ownership experience and preferences in African road conditions.",
          time: "28 min",
          match: "55%",
          spots: 6,
          payout: "24h",
        },
        {
          cat: "media",
          icon: "fas fa-play-circle",
          iconBg: "var(--blue-bg)",
          iconColor: "var(--blue)",
          badge: "Popular",
          badgeClass: "badge-pop",
          earn: "$6.20",
          title: "Streaming Habits Study",
          desc: "A major streaming platform wants to know what content Africans enjoy most and how they consume media daily.",
          time: "12 min",
          match: "79%",
          spots: 19,
          payout: "Instant",
        },
        {
          cat: "tech",
          icon: "fas fa-laptop",
          iconBg: "var(--blue-bg)",
          iconColor: "var(--blue)",
          badge: "Hot",
          badgeClass: "badge-hot",
          earn: "$9.60",
          title: "Work-From-Home Technology",
          desc: "How do remote workers across Africa use technology? Share your setup and experience for a major tech company.",
          time: "17 min",
          match: "83%",
          spots: 27,
          payout: "< 12h",
        },
        {
          cat: "health",
          icon: "fas fa-pills",
          iconBg: "var(--green-bg)",
          iconColor: "var(--green)",
          badge: "New",
          badgeClass: "badge-new",
          earn: "$8.40",
          title: "Pharmaceutical Access Survey",
          desc: "Help global health organisations understand how Africans access medicines and healthcare products.",
          time: "15 min",
          match: "70%",
          spots: 41,
          payout: "24h",
        },
        {
          cat: "shopping",
          icon: "fas fa-tag",
          iconBg: "var(--amber-bg)",
          iconColor: "var(--amber)",
          badge: "Featured",
          badgeClass: "badge-feat",
          earn: "$6.80",
          title: "Brand Loyalty & Preferences",
          desc: "Which brands do Africans trust? Help consumer goods companies understand loyalty and purchasing decisions.",
          time: "13 min",
          match: "86%",
          spots: 30,
          payout: "Instant",
        },
        {
          cat: "finance",
          icon: "fas fa-coins",
          iconBg: "var(--purple-bg)",
          iconColor: "var(--purple)",
          badge: "Hot",
          badgeClass: "badge-hot",
          earn: "$12.00",
          title: "Cryptocurrency in Africa",
          desc: "Leading fintech firm wants to know how Africans view and use cryptocurrency and digital assets.",
          time: "18 min",
          match: "62%",
          spots: 15,
          payout: "24h",
        },
        {
          cat: "food",
          icon: "fas fa-coffee",
          iconBg: "var(--orange-bg)",
          iconColor: "var(--orange)",
          badge: "New",
          badgeClass: "badge-new",
          earn: "$4.20",
          title: "Morning Routine & Beverages",
          desc: "Global beverage brand wants to understand morning habits and drink preferences across African households.",
          time: "8 min",
          match: "90%",
          spots: 52,
          payout: "Instant",
        },
      ];

      const catLabels = {
        shopping: "Shopping",
        tech: "Technology",
        auto: "Automotive",
        media: "Media",
        finance: "Finance",
        food: "Food & Drink",
        health: "Health",
      };
      let currentCat = "all";

      function renderSurveys() {
        const filtered =
          currentCat === "all"
            ? allSurveys
            : allSurveys.filter((s) => s.cat === currentCat);
        const toShow = filtered.slice(0, 9);
        const grid = document.getElementById("surveysGrid");
        grid.innerHTML = toShow
          .map(
            (s) => `
          <article class="survey-card" onclick="openModal()">
            <div class="sc-top">
              <div class="sc-icon" style="background:${s.iconBg};color:${s.iconColor}"><i class="${s.icon}"></i></div>
              <span class="sc-badge ${s.badgeClass}">${s.badge}</span>
            </div>
            <div class="sc-cat">${catLabels[s.cat] || s.cat}</div>
            <div class="sc-earn">${s.earn} <small>per survey</small></div>
            <h3 class="sc-title">${s.title}</h3>
            <p class="sc-desc">${s.desc}</p>
            <div class="sc-meta">
              <div class="sc-meta-item"><i class="fas fa-clock"></i> ${s.time}</div>
              <div class="sc-meta-item"><i class="fas fa-user-check"></i> ${s.match} match</div>
              <div class="sc-meta-item"><i class="fas fa-bolt"></i> ${s.payout}</div>
            </div>
            <div class="sc-spots">Only <span>${s.spots} spots left</span> — fills fast</div>
            <button class="btn-survey">Take Survey <i class="fas fa-arrow-right"></i></button>
          </article>`,
          )
          .join("");
        document.getElementById("showCount").textContent = toShow.length;
        grid.querySelectorAll(".survey-card").forEach((el, i) => {
          el.style.opacity = "0";
          el.style.transform = "translateY(14px)";
          setTimeout(() => {
            el.style.transition = "opacity .5s ease, transform .5s ease";
            el.style.opacity = "1";
            el.style.transform = "none";
          }, i * 60);
        });
      }

      document.querySelectorAll(".filter-btn").forEach((btn) =>
        btn.addEventListener("click", () => {
          document
            .querySelectorAll(".filter-btn")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          currentCat = btn.dataset.cat;
          renderSurveys();
        }),
      );
      renderSurveys();
      setInterval(() => {
        allSurveys.forEach((s) => {
          if (Math.random() > 0.72)
            s.spots = Math.max(1, s.spots + (Math.random() > 0.5 ? -1 : 1));
        });
        renderSurveys();
      }, 9000);

      // LIVE FEED
      const feedNames = [
        "Amara K.",
        "Blessing O.",
        "Chidi N.",
        "Diane M.",
        "Emmanuel T.",
        "Fatima S.",
        "Grace A.",
        "Hassan B.",
        "Irene W.",
        "Joseph K.",
        "Kemi L.",
        "Linet A.",
        "Moses D.",
        "Naomi J.",
        "Omar F.",
        "Priscilla G.",
        "Rashid M.",
        "Stella N.",
        "Tunde A.",
        "Wangari M.",
      ];
      const feedCountries = [
        "Nairobi, Kenya",
        "Lagos, Nigeria",
        "Accra, Ghana",
        "Kampala, Uganda",
        "Dar es Salaam, TZ",
        "Lusaka, Zambia",
        "Kigali, Rwanda",
        "Addis Ababa, ETH",
        "Abidjan, CI",
        "Dakar, Senegal",
      ];
      const feedSurveys = [
        "Health Survey",
        "Shopping Survey",
        "Tech Feedback",
        "Finance Study",
        "Food Survey",
        "App Review",
        "Brand Survey",
        "Media Survey",
        "Auto Survey",
      ];
      const feedAmounts = [
        "$4.20",
        "$6.50",
        "$8.40",
        "$9.60",
        "$11.50",
        "$14.00",
        "$5.40",
        "$7.20",
        "$12.00",
        "$18.00",
      ];
      const feedColors = [
        "#1d52cc",
        "#0d7a52",
        "#6d28d9",
        "#b45309",
        "#c0392b",
        "#a21caf",
        "#c2410c",
      ];

      function addFeedItem() {
        const feed = document.getElementById("liveFeed");
        const name = feedNames[Math.floor(Math.random() * feedNames.length)];
        const country =
          feedCountries[Math.floor(Math.random() * feedCountries.length)];
        const survey =
          feedSurveys[Math.floor(Math.random() * feedSurveys.length)];
        const amount =
          feedAmounts[Math.floor(Math.random() * feedAmounts.length)];
        const color = feedColors[Math.floor(Math.random() * feedColors.length)];
        const mins = Math.floor(Math.random() * 15) + 1;
        const div = document.createElement("div");
        div.className = "feed-item";
        div.innerHTML = `<div class="feed-av" style="background:${color}">${name.charAt(0)}</div><div style="flex:1;min-width:0"><div class="feed-name">${name} · ${country}</div><div class="feed-detail">Completed ${survey} · ${mins} min ago</div></div><div class="feed-amt">${amount}</div>`;
        feed.querySelector(".feed-scroll").prepend(div);
        const items = feed.querySelectorAll(".feed-item");
        if (items.length > 12) items[items.length - 1].remove();
      }
      for (let i = 0; i < 8; i++) addFeedItem();
      setInterval(addFeedItem, 2800);

      function initSurveyListScroll() {
        const list = document.querySelector(".survey-list");
        if (
          !list ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;

        const rows = Array.from(list.children);
        if (rows.length < 2) return;

        rows.forEach((row) => {
          const copy = row.cloneNode(true);
          copy.setAttribute("aria-hidden", "true");
          list.appendChild(copy);
        });

        let paused = false;
        let resumeTimer;
        let lastFrame = performance.now();
        const pause = () => {
          paused = true;
          clearTimeout(resumeTimer);
        };
        const resume = () => {
          paused = false;
          lastFrame = performance.now();
        };
        const pauseAfterInteraction = () => {
          pause();
          resumeTimer = setTimeout(resume, 1600);
        };

        list.addEventListener("mouseenter", pause);
        list.addEventListener("mouseleave", resume);
        list.addEventListener("focusin", pause);
        list.addEventListener("focusout", resume);
        list.addEventListener("wheel", pauseAfterInteraction, {
          passive: true,
        });
        list.addEventListener("touchstart", pauseAfterInteraction, {
          passive: true,
        });

        function scrollSurveys(now) {
          if (!paused && list.scrollHeight > list.clientHeight) {
            list.scrollTop += (now - lastFrame) * 0.018;
            const rowGap = parseFloat(getComputedStyle(list).rowGap) || 0;
            const loopPoint =
              rows.reduce((height, row) => height + row.offsetHeight, 0) +
              rowGap * rows.length;
            if (list.scrollTop >= loopPoint) list.scrollTop -= loopPoint;
          }
          lastFrame = now;
          requestAnimationFrame(scrollSurveys);
        }
        requestAnimationFrame(scrollSurveys);
      }
      initSurveyListScroll();

      setInterval(() => {
        document.getElementById("liveCount").textContent =
          `${5230 + Math.floor(Math.random() * 40)} members active now`;
      }, 5000);

      // SCROLL ANIMATIONS
      const obs = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("visible");
          }),
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
      );
      document.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));

      // NAVBAR SCROLL
      window.addEventListener(
        "scroll",
        () => {
          document.querySelector(".navbar").style.boxShadow =
            window.scrollY > 30 ? "0 2px 12px rgba(0,0,0,.1)" : "var(--sh-xs)";
        },
        { passive: true },
      );