/* ═══════════════════════════════════════════════════════
   STARHELA — shared site chrome behaviour
   Header menus, active-link highlighting, install button, service worker.
   Markup: /partials/header.html and /partials/footer.html
   ═══════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var header = document.getElementById("sxHeader");

  /* ── current page, normalised (no trailing slash / .html) ── */
  function clean(path) {
    path = path.replace(/\.html$/, "").replace(/\/+$/, "");
    return path === "" ? "/" : path;
  }
  var here = clean(location.pathname);

  /* ── announcement topbar: rotates through the announcements one at a time,
     pauses on hover/focus, and is dismissible for the session ── */
  var topbar = document.getElementById("sxTopbar");
  if (topbar) {
    try {
      if (sessionStorage.getItem("sx-topbar-closed")) topbar.hidden = true;
    } catch (e) {}
    var closeBtn = topbar.querySelector(".sx-topbar-x");
    if (closeBtn)
      closeBtn.addEventListener("click", function () {
        topbar.hidden = true;
        try {
          sessionStorage.setItem("sx-topbar-closed", "1");
        } catch (e) {}
      });

    var tbItems = Array.prototype.slice.call(topbar.querySelectorAll(".sx-topbar-item"));
    if (tbItems.length > 1 && !topbar.hidden) {
      var TB_DELAY = 5500;
      var tbIndex = 0;
      var tbTimer;
      var tbPaused = false;

      // first page of a visit shows the first message; later pages continue the sequence
      try {
        var last = sessionStorage.getItem("sx-topbar-i");
        if (last !== null) tbIndex = (parseInt(last, 10) + 1) % tbItems.length || 0;
      } catch (e) {}

      var tbShow = function (i) {
        var prev = tbItems[tbIndex];
        if (prev && i !== tbIndex) {
          prev.classList.remove("is-active");
          prev.classList.add("is-leaving");
          setTimeout(function () {
            prev.classList.remove("is-leaving");
          }, 420);
        }
        tbIndex = i;
        tbItems[i].classList.remove("is-leaving");
        tbItems[i].classList.add("is-active");
        try {
          sessionStorage.setItem("sx-topbar-i", String(i));
        } catch (e) {}
      };
      // one steady interval; hover, focus and hidden tabs just skip a tick
      var schedule = function () {
        clearInterval(tbTimer);
        tbTimer = setInterval(function () {
          if (tbPaused || document.hidden) return;
          tbShow((tbIndex + 1) % tbItems.length);
        }, TB_DELAY);
      };
      var pause = function (on) {
        tbPaused = on;
      };

      topbar.classList.add("is-rotating");
      tbShow(tbIndex);
      topbar.addEventListener("pointerenter", function () {
        pause(true);
      });
      topbar.addEventListener("pointerleave", function () {
        pause(false);
      });
      topbar.addEventListener("focusin", function () {
        pause(true);
      });
      topbar.addEventListener("focusout", function () {
        pause(false);
      });
      schedule();
    }
  }

  /* ── "You don't have an account yet" modal ──
     Any element with data-gate="earn|upload|apply|review|learn" opens it.
     Also available as window.StarhelaGate.open(kind).
     Markup: /partials/gate.html                                   */
  var gate = document.getElementById("sxGate");
  if (gate) {
    var KINDS = {
      earn: {
        loading: "Loading task…",
        wait: "Checking the task details and your account status.",
        emoji: "💰",
        msg: "Kindly create your account to perform this task and start earning on StarHela.",
        cta: "Create Account to Start Earning →",
      },
      upload: {
        loading: "Preparing upload portal…",
        wait: "Setting up your advertiser account. Just a moment.",
        emoji: "📤",
        msg: "Kindly create your account to upload your advert on StarHela.",
        cta: "Create Account to Upload Ads →",
      },
      apply: {
        loading: "Loading application…",
        wait: "Checking the role and your account status.",
        emoji: "📝",
        msg: "Kindly create your account to apply and start getting paid on StarHela.",
        cta: "Create Account to Apply →",
      },
      review: {
        loading: "Opening review form…",
        wait: "Checking the listing and your account status.",
        emoji: "⭐",
        msg: "Kindly create your account to write a review and get paid on StarHela.",
        cta: "Create Account to Review →",
      },
      chat: {
        loading: "Connecting you…",
        wait: "Checking availability and your account status.",
        emoji: "💬",
        msg: "Kindly create your account to start chatting with foreigners and earn on StarHela.",
        cta: "Create Account to Start Chatting →",
      },
      brief: {
        loading: "Opening brief form…",
        wait: "Setting up your client account. Just a moment.",
        emoji: "✍️",
        msg: "Kindly create your account to post your brief and get matched with writers on StarHela.",
        cta: "Create Account to Post a Brief →",
      },
      learn: {
        loading: "Opening lesson…",
        wait: "Checking availability and your account status.",
        emoji: "🎓",
        msg: "Kindly create your account to book this lesson on StarHela.",
        cta: "Create Account to Continue →",
      },
    };
    var gEl = {
      box: gate.querySelector(".sx-gate-box"),
      spin: document.getElementById("sxGateSpin"),
      emoji: document.getElementById("sxGateEmoji"),
      title: document.getElementById("sxGateTitle"),
      msg: document.getElementById("sxGateMsg"),
      bar: document.getElementById("sxGateBar"),
      steps: Array.prototype.slice.call(document.querySelectorAll("#sxGateSteps li")),
      cta: document.getElementById("sxGateCta"),
      skip: document.getElementById("sxGateSkip"),
    };
    var gTimer;
    var gReturnFocus;
    var gReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var openGate = function (kind) {
      var k = KINDS[kind] || KINDS.earn;
      clearInterval(gTimer);
      gReturnFocus = document.activeElement;
      gEl.spin.hidden = false;
      gEl.emoji.hidden = true;
      gEl.cta.hidden = true;
      gEl.skip.hidden = true;
      gEl.bar.style.width = "0%";
      gEl.steps.forEach(function (li) {
        li.className = "";
      });
      gEl.title.textContent = k.loading;
      gEl.msg.textContent = k.wait;
      gEl.cta.textContent = k.cta;
      gate.hidden = false;
      document.documentElement.classList.add("sx-lock");
      requestAnimationFrame(function () {
        gate.classList.add("is-open");
        gEl.box.focus();
      });

      var pct = 0;
      var marks = [28, 58, 85];
      gTimer = setInterval(function () {
        pct = Math.min(100, pct + (gReduced ? 34 : Math.random() * 9 + 3));
        gEl.bar.style.width = pct + "%";
        marks.forEach(function (m, i) {
          if (pct >= m) gEl.steps[i].className = "is-active";
        });
        if (pct < 100) return;
        clearInterval(gTimer);
        setTimeout(function () {
          gEl.steps.forEach(function (li) {
            li.className = "is-done";
          });
          gEl.spin.hidden = true;
          gEl.emoji.hidden = false;
          gEl.emoji.textContent = k.emoji;
          gEl.title.textContent = "You don't have an account yet";
          gEl.msg.textContent = k.msg;
          gEl.cta.hidden = false;
          gEl.skip.hidden = false;
          gEl.cta.focus();
        }, 340);
      }, 110);
    };

    var closeGate = function () {
      if (gate.hidden) return;
      clearInterval(gTimer);
      gate.classList.remove("is-open");
      document.documentElement.classList.remove("sx-lock");
      setTimeout(function () {
        gate.hidden = true;
      }, 220);
      if (gReturnFocus && gReturnFocus.focus) gReturnFocus.focus();
    };

    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-gate]");
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        openGate(trigger.getAttribute("data-gate"));
        return;
      }
      if (e.target === gate || e.target.closest("[data-gate-close]")) closeGate();
    }, true);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeGate();
      // div/span triggers (cards) behave like buttons from the keyboard
      if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches('[data-gate]:not(a):not(button)')) {
        e.preventDefault();
        openGate(e.target.getAttribute("data-gate"));
      }
    });
    window.StarhelaGate = { open: openGate, close: closeGate };
  }

  /* ── page loader: shown on the first page of a session only ── */
  var loader = document.getElementById("sxLoader");
  var root0 = document.documentElement;
  function hideLoader() {
    if (!loader) return;
    loader.classList.add("is-done");
    try {
      sessionStorage.setItem("sx-seen", "1");
    } catch (e) {}
    setTimeout(function () {
      root0.classList.remove("sx-loading");
    }, 400);
  }
  if (root0.classList.contains("sx-loading")) {
    window.addEventListener("load", function () {
      setTimeout(hideLoader, 450);
    });
    setTimeout(hideLoader, 4000); // safety net if load never fires
  }

  /* ── mark the current page in header, drawer and footer ── */
  function markCurrent() {
    document
      .querySelectorAll(".sx-header a[href], .sx-footer a[href]")
      .forEach(function (a) {
        var href = a.getAttribute("href");
        if (!href || href.charAt(0) !== "/" || href.indexOf("#") > -1) return;
        if (clean(href) === here) a.setAttribute("aria-current", "page");
      });
    if (!header) return;
    var buttons = header.querySelectorAll(".sx-dd-btn");
    if (here.indexOf("/earn/") === 0 && buttons[0]) buttons[0].classList.add("is-current");
    if (here.indexOf("/countries/") === 0 && buttons[1]) buttons[1].classList.add("is-current");
  }
  markCurrent();

  if (header) {
    /* ── scrolled shadow ── */
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ── dropdowns ── */
    var dropdowns = Array.prototype.slice.call(header.querySelectorAll(".sx-dd"));
    var hoverTimer;

    function setOpen(dd, open) {
      var btn = dd.querySelector(".sx-dd-btn");
      var panel = dd.querySelector(".sx-panel");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
    }
    function closeAll(except) {
      dropdowns.forEach(function (dd) {
        if (dd !== except) setOpen(dd, false);
      });
    }

    dropdowns.forEach(function (dd) {
      var btn = dd.querySelector(".sx-dd-btn");
      btn.addEventListener("click", function (e) {
        var open = btn.getAttribute("aria-expanded") !== "true";
        // A mouse click on a menu that hover already opened should not close it.
        if (!open && e.pointerType === "mouse") return;
        closeAll(dd);
        setOpen(dd, open);
      });
      // Mouse users get hover-to-open; touch/keyboard use the button.
      dd.addEventListener("pointerenter", function (e) {
        if (e.pointerType !== "mouse") return;
        clearTimeout(hoverTimer);
        closeAll(dd);
        setOpen(dd, true);
      });
      dd.addEventListener("pointerleave", function (e) {
        if (e.pointerType !== "mouse") return;
        hoverTimer = setTimeout(function () {
          setOpen(dd, false);
        }, 160);
      });
      dd.addEventListener("focusout", function (e) {
        if (!dd.contains(e.relatedTarget)) setOpen(dd, false);
      });
    });

    document.addEventListener("click", function (e) {
      if (!header.contains(e.target) && !(drawer && drawer.contains(e.target))) {
        closeAll();
        closeDrawer();
      }
    });

    /* ── mobile drawer ── */
    var burger = header.querySelector(".sx-burger");
    var drawer = document.getElementById("sxDrawer");
    var root = document.documentElement;

    /* The drawer is a fixed sheet that starts where the header ends, so it
       fills the rest of the screen whether or not the topbar is scrolled away. */
    function placeDrawer() {
      root.style.setProperty("--sx-drawer-top", Math.max(0, header.getBoundingClientRect().bottom) + "px");
    }
    function openDrawer() {
      closeAll();
      placeDrawer();
      drawer.hidden = false;
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Close menu");
      root.classList.add("sx-lock");
    }
    function closeDrawer() {
      if (!drawer || drawer.hidden) return;
      drawer.hidden = true;
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Open menu");
      root.classList.remove("sx-lock");
    }
    if (burger && drawer) {
      burger.addEventListener("click", function () {
        drawer.hidden ? openDrawer() : closeDrawer();
      });
      drawer.addEventListener("click", function (e) {
        if (e.target.closest("a")) closeDrawer();
      });
      window.addEventListener("resize", function () {
        if (!drawer.hidden) placeDrawer();
      });
      window.matchMedia("(min-width: 921px)").addEventListener("change", function (m) {
        if (m.matches) closeDrawer();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var openDd = dropdowns.filter(function (dd) {
        return dd.querySelector(".sx-dd-btn").getAttribute("aria-expanded") === "true";
      })[0];
      closeAll();
      if (openDd) openDd.querySelector(".sx-dd-btn").focus();
      if (drawer && !drawer.hidden) {
        closeDrawer();
        burger.focus();
      }
    });
  }

  /* ── install-app buttons ──
     The home page's starhela.js already drives every .js-install-btn,
     so only wire them up on pages that do not load it.            */
  if (!document.querySelector('script[src*="starhela.js"]')) {
    var installButtons = Array.prototype.slice.call(document.querySelectorAll(".js-install-btn"));
    var deferred;
    var standalone =
      window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    var show = function (on) {
      installButtons.forEach(function (b) {
        b.hidden = !on;
      });
    };
    if (!standalone) {
      window.addEventListener("beforeinstallprompt", function (e) {
        e.preventDefault();
        deferred = e;
        show(true);
      });
      installButtons.forEach(function (b) {
        b.addEventListener("click", function () {
          if (!deferred) return;
          deferred.prompt();
          deferred.userChoice.then(function (r) {
            deferred = null;
            if (r.outcome === "accepted") show(false);
          });
        });
      });
      window.addEventListener("appinstalled", function () {
        show(false);
      });
    }
  }

  /* ── service worker (safe to register more than once) ── */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js").catch(function () {});
    });
  }
})();
