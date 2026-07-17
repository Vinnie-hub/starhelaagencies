 /* ── PAGE ROUTER ── */
      let currentPage = "landing";

      function showPage(name) {
        if (currentPage === name) return;

        // Fade out current
        const prev = document.getElementById("page-" + currentPage);
        prev.classList.remove("active");

        // Update nav appearance
        const nav = document.getElementById("mainNav");
        const navLanding = document.getElementById("nav-landing");
        const navWriteCenter = document.getElementById("nav-write-center");
        const navRightLanding = document.getElementById("nav-right-landing");
        const navRightWrite = document.getElementById("nav-right-write");

        if (name === "write") {
          nav.classList.add("solid");
          nav.classList.remove("scrolled");
          navLanding.style.display = "none";
          navWriteCenter.style.display = "";
          navRightLanding.style.display = "none";
          navRightWrite.style.display = "flex";
        } else {
          nav.classList.remove("solid");
          navLanding.style.display = "";
          navWriteCenter.style.display = "none";
          navRightLanding.style.display = "flex";
          navRightWrite.style.display = "none";
          // Restore scrolled state for landing
          nav.classList.toggle("scrolled", window.scrollY > 40);
        }

        // Fade in new page
        window.scrollTo({ top: 0, behavior: "instant" });
        const next = document.getElementById("page-" + name);
        // Small delay so the fade-out plays first
        setTimeout(() => {
          next.classList.add("active");
          currentPage = name;

          // Re-run reveal observer for newly visible elements
          if (name === "landing") {
            document
              .querySelectorAll("#page-landing .reveal")
              .forEach((el) => revealObs.observe(el));
          }
          // Restore draft when switching to write
          if (name === "write") restoreDraft();
        }, 60);

        // Update URL hash without reloading
        history.replaceState(null, "", "#" + name);
      }

      /* Load page from hash on initial load */
      (function initFromHash() {
        const hash = location.hash.replace("#", "");
        if (hash === "write") {
          // Defer so DOM is fully ready
          setTimeout(() => showPage("write"), 0);
        }
      })();

      /* ── LANDING: NAV SCROLL ── */
      window.addEventListener("scroll", () => {
        if (currentPage === "landing") {
          document
            .getElementById("mainNav")
            .classList.toggle("scrolled", window.scrollY > 40);
        }
      });

      /* ── LANDING: SCROLL TO SECTION ── */
      function scrollToSection(id) {
        setTimeout(
          () => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          },
          currentPage === "landing" ? 0 : 80,
        );
      }

      /* ── LANDING: REVEAL OBSERVER ── */
      function toggleMobileMenu() {
        const menu = document.getElementById("mobileMenu");
        const toggle = document.getElementById("navToggle");
        const open = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute(
          "aria-label",
          open ? "Close navigation menu" : "Open navigation menu",
        );
        toggle.querySelector("i").className = open ? "ti ti-x" : "ti ti-menu-2";
      }

      function closeMobileMenu() {
        const menu = document.getElementById("mobileMenu");
        const toggle = document.getElementById("navToggle");
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
        toggle.querySelector("i").className = "ti ti-menu-2";
      }

      function mobileNavigate(section) {
        closeMobileMenu();
        showPage("landing");
        scrollToSection(section);
      }

      document.addEventListener("click", (event) => {
        if (!document.getElementById("mainNav").contains(event.target))
          closeMobileMenu();
      });
      window.addEventListener("resize", () => {
        if (window.innerWidth > 960) closeMobileMenu();
      });

      const revealObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.12 },
      );
      document
        .querySelectorAll("#page-landing .reveal")
        .forEach((el) => revealObs.observe(el));

      /* ── PAYOUT BAR ANIMATION ── */
      const earnObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              document.getElementById("payoutBar").style.width = "70%";
              earnObs.disconnect();
            }
          });
        },
        { threshold: 0.2 },
      );
      earnObs.observe(document.getElementById("earnVisual"));

      /* ── WRITE: TYPING STATUS ── */
      let typingTimer;
      function onTyping() {
        const dot = document.getElementById("statusDot");
        const txt = document.getElementById("statusText");
        dot.classList.add("active");
        txt.textContent = "Writing…";
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          dot.classList.remove("active");
          txt.textContent = "Paused";
        }, 2000);
      }

      /* ── WRITE: WORD COUNT ── */
      function updateWordCount() {
        const body = document.getElementById("articleBody").value.trim();
        const count = body ? body.split(/\s+/).length : 0;
        document.getElementById("wordCount").textContent =
          count + " word" + (count !== 1 ? "s" : "");
      }

      /* ── EDITOR HELPERS ── */
      function fmt(cmd) {
        try {
          document.execCommand(cmd, false, null);
        } catch (e) {}
      }
      function insertLink() {
        const url = prompt("Enter URL (e.g. https://example.com):");
        if (url && url.startsWith("http")) {
          fmt("createLink", url);
          showToast("Link inserted");
        } else if (url)
          showToast("Enter a valid URL starting with https://", "error");
      }

      /* ── SAVE / RESTORE DRAFT ── */
      function saveDraft() {
        const title = document.getElementById("articleTitle").value.trim();
        const body = document.getElementById("articleBody").value.trim();
        if (!title && !body) {
          showToast("Nothing to save yet", "error");
          return;
        }
        try {
          localStorage.setItem(
            "starhela_draft",
            JSON.stringify({ title, body, saved: new Date().toISOString() }),
          );
          showToast("Draft saved!");
        } catch (e) {
          showToast("Draft saved!");
        }
      }

      function restoreDraft() {
        try {
          const d = localStorage.getItem("starhela_draft");
          if (d) {
            const { title, body } = JSON.parse(d);
            if (title) document.getElementById("articleTitle").value = title;
            if (body) document.getElementById("articleBody").value = body;
            updateWordCount();
          }
        } catch (e) {}
      }

      /* ── IMAGE UPLOAD ── */
      function handleImgUpload(e) {
        const grid = document.getElementById("imgGrid");
        Array.from(e.target.files).forEach((file) => {
          const r = new FileReader();
          r.onload = (ev) => {
            const w = document.createElement("div");
            w.style.cssText =
              "position:relative;display:inline-block;margin-top:8px;";
            w.innerHTML = `
              <img src="${ev.target.result}" style="width:80px;height:80px;border-radius:10px;object-fit:cover;border:1px solid var(--border);" alt="Uploaded image"/>
              <button onclick="this.parentElement.remove()" style="position:absolute;top:-6px;right:-6px;width:20px;height:20px;background:var(--p);color:#fff;border:none;border-radius:50%;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;padding:0;" aria-label="Remove">×</button>
            `;
            grid.appendChild(w);
          };
          r.readAsDataURL(file);
        });
        e.target.value = "";
        showToast("Image added");
      }

      /* ── MODAL ── */
      function openModal(name) {
        document.getElementById(name + "Modal").classList.add("show");
        document.body.style.overflow = "hidden";
      }
      function closeModal(name) {
        document.getElementById(name + "Modal").classList.remove("show");
        document.body.style.overflow = "";
      }
      document.querySelectorAll(".modal-backdrop").forEach((bd) => {
        bd.addEventListener("click", (e) => {
          if (e.target === bd) closeModal(bd.id.replace("Modal", ""));
        });
      });

      /* ── PUBLISH ── */
      function handlePublish() {
        const title = document.getElementById("articleTitle").value.trim();
        const body = document.getElementById("articleBody").value.trim();
        if (!title) {
          showToast("Please add a title first", "error");
          return;
        }
        if (!body) {
          showToast("Write something before publishing!", "error");
          return;
        }
        openModal("publish");
        runPublishLoader();
      }

      function runPublishLoader() {
        const bar = document.getElementById("pubBar");
        const steps = ["ps1", "ps2", "ps3"].map((id) =>
          document.getElementById(id),
        );
        bar.style.width = "0%";
        steps.forEach((s, i) => {
          s.className = "loader-step";
          s.querySelector(".step-dot").textContent = i + 1;
        });
        document.getElementById("publishLoader").style.display = "block";
        document.getElementById("publishSuccess").style.display = "none";
        document.getElementById("pubSpinner").style.display = "block";
        let pct = 0;
        const marks = [30, 65, 92];
        const iv = setInterval(() => {
          pct += Math.random() * 7 + 3;
          if (pct > 100) pct = 100;
          bar.style.width = pct + "%";
          marks.forEach((m, i) => {
            if (pct >= m) {
              steps[i].className = "loader-step done";
              steps[i].querySelector(".step-dot").textContent = "✓";
              if (i + 1 < steps.length)
                steps[i + 1].className = "loader-step active";
            }
          });
          if (pct >= 100) {
            clearInterval(iv);
            setTimeout(showPublishResult, 400);
          }
        }, 90);
      }

      function showPublishResult() {
        document.getElementById("pubSpinner").style.display = "none";
        document.getElementById("publishLoader").style.display = "none";
        document.getElementById("publishSuccess").style.display = "flex";
      }

      /* ── TOAST ── */
      let toastTimer;
      function showToast(msg, type) {
        const t = document.getElementById("toast");
        document.getElementById("toastMsg").textContent = msg;
        document.getElementById("toastIcon").className =
          "ti " + (type === "error" ? "ti-alert-circle" : "ti-check");
        t.className = "toast show" + (type === "error" ? " error" : "");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
      }

      /* ── KEYBOARD SHORTCUTS ── */
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeModal("publish");
          closeMobileMenu();
        }
        if (currentPage === "write") {
          if ((e.ctrlKey || e.metaKey) && e.key === "s") {
            e.preventDefault();
            saveDraft();
          }
          if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "P") {
            e.preventDefault();
            handlePublish();
          }
        }
      });