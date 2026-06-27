/* ═══════════════════════════════════════════
   STARHELA AGENCIES — SHARED FRAMEWORK
   ═══════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── CONFIG ─────────────────────────────── */
  const REFERRAL_URL = 'https://starhela.com/register.php?ref=sydney&utm_source=starhela&utm_medium=website&utm_campaign=referral';
  const WA_COMMUNITY = 'https://chat.whatsapp.com/Ir5lbHCr9rPCLuvVzvHAyD';
  const WA_SUPPORT = 'https://wa.me/254729743223';
  const APP_URL = 'https://www.appcreator24.com/app4050581-5zcegy';
  const LOGIN_URL = 'https://starhela.com/c/U3lkbmV5';

  const COUNTRY_DATA = {
    KE:{name:'Kenya',flag:'🇰🇪',fee:'KSH 550',feeLabel:'One-Time Activation — Kenya',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['📱 M-Pesa','🏦 Bank Transfer','📲 Airtel Money'],trust:'📱 M-Pesa Supported'},
    UG:{name:'Uganda',flag:'🇺🇬',fee:'UGX 19,500',feeLabel:'One-Time Activation — Uganda',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['📶 MTN Mobile','📲 Airtel Uganda','🏦 Bank Transfer'],trust:'📶 MTN Supported'},
    NG:{name:'Nigeria',flag:'🇳🇬',fee:'₦9,000',feeLabel:'One-Time Activation — Nigeria',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['🏦 Bank Transfer','📱 USSD Payment','💳 Card Payment'],trust:'🏦 Bank Transfer'},
    TZ:{name:'Tanzania',flag:'🇹🇿',fee:'TZS 11,000',feeLabel:'One-Time Activation — Tanzania',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['📱 M-Pesa TZ','📶 Tigo Pesa','📲 Airtel Money'],trust:'📱 M-Pesa Supported'},
    GH:{name:'Ghana',flag:'🇬🇭',fee:'GH₵ 95',feeLabel:'One-Time Activation — Ghana',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['📱 MTN MoMo','📲 Vodafone Cash','🏦 Bank Transfer'],trust:'📱 MTN MoMo'},
    CM:{name:'Cameroon',flag:'🇨🇲',fee:'XAF 4,500',feeLabel:'One-Time Activation — Cameroon',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['📶 MTN Cameroon','🟧 Orange Money','🏦 Bank Transfer'],trust:'📶 MTN Supported'},
    ZA:{name:'South Africa',flag:'🇿🇦',fee:'ZAR 70',feeLabel:'One-Time Activation — South Africa',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['💳 Card Payment','🏦 Bank Transfer','📱 SnapScan'],trust:'🏦 Bank Transfer'},
    ZM:{name:'Zambia',flag:'🇿🇲',fee:'ZK 130',feeLabel:'One-Time Activation — Zambia',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['📶 MTN Zambia','📲 Airtel Money','🏦 Bank Transfer'],trust:'📶 MTN Supported'},
    MW:{name:'Malawi',flag:'🇲🇼',fee:'MWK 26,000',feeLabel:'One-Time Activation — Malawi',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['📶 TNM Mpamba','📲 Airtel Money','🏦 Bank Transfer'],trust:'📲 Airtel Supported'},
    RW:{name:'Rwanda',flag:'🇷🇼',fee:'RWF 6,500',feeLabel:'One-Time Activation — Rwanda',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['📶 MTN Rwanda','🟧 Airtel Rwanda','🏦 Bank Transfer'],trust:'📶 MTN Supported'},
    BW:{name:'Botswana',flag:'🇧🇼',fee:'BWP 100',feeLabel:'One-Time Activation — Botswana',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['🏦 Bank Transfer','💳 Card Payment','📱 OrangeSmartCash'],trust:'🏦 Bank Transfer'},
    CI:{name:'Ivory Coast',flag:'🇨🇮',fee:'XOF 4,500',feeLabel:'One-Time Activation — Ivory Coast',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['🟧 Orange Money','📶 MTN MoMo','🏦 Bank Transfer'],trust:'🟧 Orange Supported'},
    SN:{name:'Senegal',flag:'🇸🇳',fee:'XOF 4,500',feeLabel:'One-Time Activation — Senegal',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['🟧 Orange Money','📶 Free Money','🏦 Bank Transfer'],trust:'🟧 Orange Supported'},
    SS:{name:'South Sudan',flag:'🇸🇸',fee:'SSP 20,000',feeLabel:'One-Time Activation — South Sudan',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['📶 MTN','🏦 Bank Transfer','💳 Card Payment'],trust:'📶 MTN Supported'},
    BI:{name:'Burundi',flag:'🇧🇮',fee:'BIF 30,000',feeLabel:'One-Time Activation — Burundi',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['📶 Econet Leo','🏦 Bank Transfer','💳 Card Payment'],trust:'🏦 Bank Transfer'},
    DEFAULT:{name:'Your Country',flag:'🌍',fee:'$10.00',feeLabel:'One-Time Activation — International',feeSub:'No monthly fees · No hidden charges · Lifetime access',payments:['💳 Card Payment','🏦 Bank Transfer','📱 Mobile Money'],trust:'💳 Card Supported'}
  };

  const TZ_MAP = {
    'Africa/Nairobi':'KE','Africa/Kampala':'UG','Africa/Lagos':'NG','Africa/Dar_es_Salaam':'TZ',
    'Africa/Accra':'GH','Africa/Douala':'CM','Africa/Johannesburg':'ZA','Africa/Lusaka':'ZM',
    'Africa/Blantyre':'MW','Africa/Kigali':'RW','Africa/Gaborone':'BW','Africa/Abidjan':'CI',
    'Africa/Dakar':'SN','Africa/Juba':'SS','Africa/Bujumbura':'BI'
  };

  const $ = (id) => document.getElementById(id);

  /* ── THEME ───────────────────────────────── */
  function initTheme() {
    var s = localStorage.getItem('sh-theme');
    var p = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', s || p);
    setThemeIcons(document.documentElement.getAttribute('data-theme'));
  }

  function setThemeIcons(t) {
    var m = document.getElementById('icon-moon');
    var s = document.getElementById('icon-sun');
    if (!m || !s) return;
    m.style.display = t === 'dark' ? '' : 'none';
    s.style.display = t === 'light' ? '' : 'none';
  }

  function toggleTheme() {
    var c = document.documentElement.getAttribute('data-theme');
    var n = c === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', n);
    localStorage.setItem('sh-theme', n);
    setThemeIcons(n);
  }

  /* ── PAGE LOADER ─────────────────────────── */
  function initPageLoader() {
    window.addEventListener('load', function () {
      setTimeout(function () {
        var pl = document.getElementById('pageLoader');
        if (pl) pl.classList.add('loaded');
      }, 1400);
    });
  }

  /* ── PAGE TRANSITION ─────────────────────── */
  function initPageTransition() {
    var pt = document.getElementById('page-transition');
    if (!pt) return;
    var ptActive = false;

    window.ptEnter = function (cb) {
      if (ptActive) return;
      ptActive = true;
      pt.classList.remove('exiting', 'hidden');
      pt.classList.add('entering');
      setTimeout(cb, 480);
    };

    window.ptExit = function () {
      pt.classList.remove('entering');
      pt.classList.add('exiting');
      setTimeout(function () {
        pt.classList.add('hidden');
        pt.classList.remove('exiting');
        ptActive = false;
      }, 550);
    };

    window.navigateTo = function (url) {
      window.ptEnter(function () { window.location.href = url; });
    };

    window.addEventListener('DOMContentLoaded', function () {
      if (sessionStorage.getItem('sh-transitioning')) {
        sessionStorage.removeItem('sh-transitioning');
        pt.classList.remove('hidden');
        pt.classList.add('entering');
        pt.getBoundingClientRect();
        setTimeout(window.ptExit, 60);
      }
    });

    window.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        ptActive = false;
        pt.classList.add('hidden');
      }
      hideClickLoader();
    });

  }

  /* ── CLICK LOADER ────────────────────────── */
  function initClickLoader() {
    window.showClickLoader = function () {
      var cl = document.getElementById('clickLoader');
      if (cl) cl.classList.add('active');
    };
    window.hideClickLoader = function () {
      var cl = document.getElementById('clickLoader');
      if (cl) cl.classList.remove('active');
    };
    window.goToExternal = function (url) {
      window.showClickLoader();
      setTimeout(function () { window.location.href = url; }, 380);
    };
  }

  /* ── MOBILE MENU ─────────────────────────── */
  function initMobileMenu() {
    var mobileMenu = document.getElementById('mobileMenu');
    var overlay = document.getElementById('overlay');
    var hamburger = document.getElementById('hamburger');
    if (!mobileMenu || !overlay || !hamburger) return;

    window.openMenu = function () {
      mobileMenu.classList.add('open');
      overlay.classList.add('show');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    window.closeMenu = function () {
      mobileMenu.classList.remove('open');
      overlay.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', function () {
      mobileMenu.classList.contains('open') ? window.closeMenu() : window.openMenu();
    });

    overlay.addEventListener('click', function () {
      window.closeMenu();
      closeOfferwall();
    });

    document.querySelectorAll('.mob-link').forEach(function (a) {
      a.addEventListener('click', function () { window.closeMenu(); });
    });
  }

  /* ── SMOOTH SCROLL SPY ───────────────────── */
  function initScrollSpy() {
    var mbnItems = document.querySelectorAll('.mbn-item');
    if (!mbnItems.length) return;

    var spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.id;
          mbnItems.forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: .15, rootMargin: '-15% 0px -60% 0px' });

    document.querySelectorAll('section[id]').forEach(function (s) { spyObs.observe(s); });
  }

  /* ── REVEAL ──────────────────────────────── */
  function initReveal() {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revObs.unobserve(e.target);
        }
      });
    }, { threshold: .06 });

    document.querySelectorAll('.reveal').forEach(function (el) { revObs.observe(el); });
    setTimeout(function () {
      document.querySelectorAll('.chat-block').forEach(function (el) { el.classList.add('in'); });
    }, 80);
  }

  /* ── FAQ ACCORDION ───────────────────────── */
  function initFaq() {
    document.querySelectorAll('.faq-q').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.closest('.faq-item');
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function (i) {
          i.classList.remove('open');
          i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          q.setAttribute('aria-expanded', 'true');
        }
      });
      q.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); q.click(); }
      });
    });
  }

  /* ── GEO DETECTION ───────────────────────── */
  function initGeoDetection() {
    window.detectedCountry = null;

    window.applyCountryToModal = function (code) {
      var data = COUNTRY_DATA[code] || COUNTRY_DATA.DEFAULT;
      window.detectedCountry = code;
      var geoLoading = document.getElementById('owGeoLoading');
      if (geoLoading) geoLoading.style.display = 'none';
      var badge = document.getElementById('owCountryBadge');
      if (badge) badge.style.display = 'flex';
      var flag = document.getElementById('owCountryFlag');
      if (flag) flag.textContent = data.flag;
      var name = document.getElementById('owCountryName');
      if (name) name.textContent = data.name;
      var detected = document.getElementById('owCountryDetectedLabel');
      if (detected) detected.textContent = code === 'DEFAULT' ? 'Worldwide' : 'Auto-detected';
      var feeLabel = document.getElementById('owFeeLabel');
      if (feeLabel) feeLabel.textContent = data.feeLabel;
      var feeVal = document.getElementById('owFeeVal');
      if (feeVal) feeVal.textContent = data.fee;
      var feeSub = document.getElementById('owFeeSub');
      if (feeSub) feeSub.textContent = data.feeSub;
      var trust = document.getElementById('owTrustPayment');
      if (trust) trust.textContent = data.trust;
      var chips = document.getElementById('owPaymentChips');
      if (chips) chips.innerHTML = data.payments.map(function (p) { return '<span class="ow-chip">' + p + '</span>'; }).join('');
    };

    window.detectCountry = function () {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      var tzGuess = TZ_MAP[tz];
      fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) })
        .then(function (r) { return r.json(); })
        .then(function (d) { window.applyCountryToModal(COUNTRY_DATA[d.country_code] ? d.country_code : tzGuess || 'DEFAULT'); })
        .catch(function () { window.applyCountryToModal(tzGuess || 'DEFAULT'); });
    };
  }

  /* ── OFFERWALL MODAL ─────────────────────── */
  function initOfferwall() {
    var offerwallOv = document.getElementById('offerwallOv');
    if (!offerwallOv) return;
    var offerwallOpened = false;
    var autoRedirectTimeout = null;

    window.openOfferwall = function () {
      offerwallOv.classList.add('on');
      document.body.style.overflow = 'hidden';
      if (!offerwallOpened) {
        offerwallOpened = true;
        if (typeof window.detectCountry === 'function') window.detectCountry();
        autoRedirectTimeout = setTimeout(function () { window.proceedToRegister(); }, 5000);
      }
    };

    window.closeOfferwall = function () {
      if (autoRedirectTimeout) { clearTimeout(autoRedirectTimeout); autoRedirectTimeout = null; }
      offerwallOv.classList.remove('on');
      document.body.style.overflow = '';
    };

    window.proceedToRegister = function () {
      window.closeOfferwall();
      window.goToExternal(REFERRAL_URL);
    };

    var owClose = document.getElementById('owClose');
    if (owClose) owClose.addEventListener('click', window.closeOfferwall);

    var owProceed = document.getElementById('owProceedBtn');
    if (owProceed) owProceed.addEventListener('click', window.proceedToRegister);
  }

  /* ── DISCLAIMER POPUP ────────────────────── */
  function initDisclaimer() {
    var disclaimerShown = false;

    window.showDisclaimer = function () {
      if (sessionStorage.getItem('sh-disclaimer-seen')) { window.openOfferwallWithRedirect(); return; }
      if (disclaimerShown) return;
      disclaimerShown = true;
      var popup = document.getElementById('disclaimerPopup');
      if (popup) popup.classList.add('visible');
      var fill = document.getElementById('dpTimerFill');
      if (fill) {
        fill.style.animation = 'none';
        fill.getBoundingClientRect();
        fill.style.animation = '';
      }
      setTimeout(window.hideDisclaimerAndProceed, 30000);
    };

    window.hideDisclaimerAndProceed = function () {
      var popup = document.getElementById('disclaimerPopup');
      if (popup) popup.classList.remove('visible');
      sessionStorage.setItem('sh-disclaimer-seen', '1');
      window.openOfferwallWithRedirect();
    };

    window.hideDisclaimer = function () {
      var popup = document.getElementById('disclaimerPopup');
      if (popup) popup.classList.remove('visible');
    };

    window.openOfferwallWithRedirect = function () {
      window.openOfferwall();
      setTimeout(function () { window.proceedToRegister(); }, 2000);
    };

    var dpClose = document.getElementById('dpClose');
    if (dpClose) dpClose.addEventListener('click', window.hideDisclaimer);

    document.querySelectorAll('.open-offerwall, .dp-btn-primary').forEach(function (btn) {
      btn.addEventListener('click', function (e) { e.preventDefault(); window.hideDisclaimerAndProceed(); });
    });

    document.querySelectorAll('.go-register').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); window.showDisclaimer(); });
    });

    // Show disclaimer after 30s if not seen
    setTimeout(function () {
      if (!sessionStorage.getItem('sh-disclaimer-seen')) window.showDisclaimer();
    }, 30000);
  }

  /* ── RIPPLE EFFECT ───────────────────────── */
  function initRipple() {
    document.querySelectorAll('.act-card, .country-card, .btn-primary, .cb-btn-main, .bcta-btn, .ow-cta-btn, .nav-cta, .btn-green').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var r = this.getBoundingClientRect();
        var sz = Math.max(r.width, r.height);
        var rp = document.createElement('span');
        rp.style.cssText = 'position:absolute;width:' + sz + 'px;height:' + sz + 'px;border-radius:50%;background:rgba(255,255,255,.12);transform:translate(-50%,-50%) scale(0);left:' + (e.clientX - r.left) + 'px;top:' + (e.clientY - r.top) + 'px;animation:ripple .55s ease forwards;pointer-events:none;z-index:9';
        if (getComputedStyle(this).position === 'static') this.style.position = 'relative';
        this.appendChild(rp);
        setTimeout(function () { rp.remove(); }, 600);
      });
    });
  }

  /* ── INIT ────────────────────────────────── */
  function init() {
    // Each module is independent — wrap individually so a failure in
    // one doesn't break the rest of the page.
    var modules = [
      initTheme, initPageLoader, initPageTransition, initClickLoader,
      initMobileMenu, initScrollSpy, initReveal, initFaq,
      initGeoDetection, initOfferwall, initDisclaimer, initRipple
    ];
    for (var i = 0; i < modules.length; i++) {
      try { modules[i](); } catch (err) {
        if (window.console && console.warn) console.warn('[starhela] init failed:', err);
      }
    }

    // Theme toggle
    var themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    // Close any open overlay on Escape (keyboard a11y)
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (typeof window.closeMenu === 'function') window.closeMenu();
      if (typeof window.closeOfferwall === 'function') window.closeOfferwall();
      if (typeof window.hideDisclaimer === 'function') window.hideDisclaimer();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();