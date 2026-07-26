(function() {
    // ── PAGE LOADER ───────────────────────────
    window.addEventListener('load', function() {
      const loader = document.getElementById('pageLoader');
      if (loader) {
        setTimeout(() => {
          loader.classList.add('loaded');
        }, 1200);
      }
    });

    // ── MOBILE MENU ───────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    const body = document.body;

    function openMenu() {
      mobileMenu.classList.add('open');
      overlay.classList.add('show');
      overlay.style.display = 'block';
      hamburger.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden';
    }

    function closeMenu() {
      mobileMenu.classList.remove('open');
      overlay.classList.remove('show');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300);
      hamburger.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
    }

    if (hamburger) {
      hamburger.addEventListener('click', function() {
        if (mobileMenu.classList.contains('open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });
    }

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.mob-link, .mob-cta').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    // ── FAQ ACCORDION ──────────────────────────
    document.querySelectorAll('.faq-q').forEach(function(q) {
      q.addEventListener('click', function() {
        const item = this.parentElement;
        const isOpen = item.classList.contains('open');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(function(faq) {
          faq.classList.remove('open');
          faq.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        });
        
        // Open clicked item if it wasn't already open
        if (!isOpen) {
          item.classList.add('open');
          this.setAttribute('aria-expanded', 'true');
        }
      });

      // Keyboard support
      q.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });

    // ── OFFERWALL MODAL ────────────────────────
    const offerwallOv = document.getElementById('offerwallOv');
    const owClose = document.getElementById('owClose');
    const owProceedBtn = document.getElementById('owProceedBtn');
    const registerButtons = document.querySelectorAll('.go-register');

    function openOfferwall() {
      if (offerwallOv) {
        offerwallOv.classList.add('on');
        offerwallOv.style.display = 'flex';
        body.style.overflow = 'hidden';
        detectUserLocation();
      }
    }

    function closeOfferwall() {
      if (offerwallOv) {
        offerwallOv.classList.remove('on');
        setTimeout(() => {
          offerwallOv.style.display = 'none';
        }, 300);
        body.style.overflow = '';
      }
    }

    if (owClose) {
      owClose.addEventListener('click', closeOfferwall);
    }

    if (offerwallOv) {
      offerwallOv.addEventListener('click', function(e) {
        if (e.target === offerwallOv) {
          closeOfferwall();
        }
      });
    }

    if (owProceedBtn) {
      owProceedBtn.addEventListener('click', function() {
        // Redirect to registration
        window.open('https://starhela.com/c/U3lkbmV5', '_blank');
        closeOfferwall();
      });
    }

    // Register buttons open offerwall
    registerButtons.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        openOfferwall();
      });
    });

    // ── LOCATION DETECTION ─────────────────────
    function detectUserLocation() {
      const geoLoading = document.getElementById('owGeoLoading');
      const countryBadge = document.getElementById('owCountryBadge');
      const countryFlag = document.getElementById('owCountryFlag');
      const countryName = document.getElementById('owCountryName');
      const countryDetectedLabel = document.getElementById('owCountryDetectedLabel');
      const owFeeVal = document.getElementById('owFeeVal');
      const owFeeLabel = document.getElementById('owFeeLabel');
      const owFeeSub = document.getElementById('owFeeSub');
      const owTrustPayment = document.getElementById('owTrustPayment');
      const owPaymentChips = document.getElementById('owPaymentChips');

      // Country data mapping
      const countryData = {
        KE: { name: 'Kenya', flag: '🇰🇪', fee: 'KSH 550', feeUSD: '$5', currency: 'KSH', payment: '📱 M-Pesa', chips: ['📱 M-Pesa', '📲 Airtel Money', '🏦 Bank Transfer'] },
        UG: { name: 'Uganda', flag: '🇺🇬', fee: 'UGX 19,500', feeUSD: '$5', currency: 'UGX', payment: '📲 Airtel Money', chips: ['📲 Airtel Money', '📱 MTN Money', '🏦 Bank Transfer'] },
        NG: { name: 'Nigeria', flag: '🇳🇬', fee: '₦9,000', feeUSD: '$5', currency: '₦', payment: '🏦 Bank Transfer', chips: ['🏦 Bank Transfer', '📱 Mobile Money'] },
        TZ: { name: 'Tanzania', flag: '🇹🇿', fee: 'TZS 11,000', feeUSD: '$5', currency: 'TZS', payment: '📱 M-Pesa', chips: ['📱 M-Pesa', '📲 Airtel Money', '🏦 Bank Transfer'] },
        GH: { name: 'Ghana', flag: '🇬🇭', fee: 'GH₵ 95', feeUSD: '$5', currency: 'GH₵', payment: '📱 MTN Money', chips: ['📱 MTN Money', '📲 AirtelTigo', '🏦 Bank Transfer'] },
        CM: { name: 'Cameroon', flag: '🇨🇲', fee: 'XAF 4,500', feeUSD: '$5', currency: 'XAF', payment: '📱 MTN Money', chips: ['📱 MTN Money', '📲 Orange Money', '🏦 Bank Transfer'] },
        ZA: { name: 'South Africa', flag: '🇿🇦', fee: 'ZAR 70', feeUSD: '$4', currency: 'ZAR', payment: '🏦 Bank Transfer', chips: ['🏦 Bank Transfer', '📱 Mobile Money'] },
        RW: { name: 'Rwanda', flag: '🇷🇼', fee: 'RWF 6,500', feeUSD: '$5', currency: 'RWF', payment: '📱 MTN Money', chips: ['📱 MTN Money', '📲 Airtel Money', '🏦 Bank Transfer'] },
        ZM: { name: 'Zambia', flag: '🇿🇲', fee: 'ZK 130', feeUSD: '$5', currency: 'ZK', payment: '📱 Airtel Money', chips: ['📲 Airtel Money', '📱 MTN Money', '🏦 Bank Transfer'] },
        BI: { name: 'Burundi', flag: '🇧🇮', fee: 'BIF 30,000', feeUSD: '$5', currency: 'BIF', payment: '📱 Lumicash', chips: ['📱 Lumicash', '📲 EcoCash', '🏦 Bank Transfer'] },
        default: { name: 'Your Country', flag: '🌍', fee: '$5', feeUSD: '$5', currency: 'USD', payment: '📱 Mobile Money', chips: ['📱 M-Pesa', '🏦 Bank Transfer', '📲 Airtel Money'] }
      };

      // Try to get user's country
      fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
          const countryCode = data.country_code;
          const country = countryData[countryCode] || countryData.default;

          // Update UI
          if (countryFlag) countryFlag.textContent = country.flag;
          if (countryName) countryName.textContent = country.name;
          if (owFeeVal) owFeeVal.textContent = country.fee;
          if (owTrustPayment) owTrustPayment.textContent = country.payment;

          // Update payment chips
          if (owPaymentChips) {
            owPaymentChips.innerHTML = country.chips.map(chip => `<span class="ow-chip">${chip}</span>`).join('');
          }

          // Show country badge, hide loading
          if (geoLoading) geoLoading.style.display = 'none';
          if (countryBadge) countryBadge.style.display = 'inline-flex';
        })
        .catch(() => {
          // Fallback to default
          const country = countryData.default;
          if (countryFlag) countryFlag.textContent = country.flag;
          if (countryName) countryName.textContent = country.name;
          if (owFeeVal) owFeeVal.textContent = country.fee;
          if (geoLoading) geoLoading.style.display = 'none';
          if (countryBadge) countryBadge.style.display = 'inline-flex';
          if (countryDetectedLabel) countryDetectedLabel.textContent = 'Default';
        });
    }

    // ── SCROLL REVEAL ──────────────────────────
    function revealOnScroll() {
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
      const revealPoint = 80;

      reveals.forEach(function(reveal) {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('in');
        }
      });
    }

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

    // ── SCROLL PROGRESS BAR ────────────────────
    function updateProgressBar() {
      const progressBar = document.querySelector('.sh-progress-fill');
      if (progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
      }
    }

    window.addEventListener('scroll', updateProgressBar);

    // ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // ── CLICK LOADER ───────────────────────────
    const clickLoader = document.getElementById('clickLoader');
    
    function showClickLoader() {
      if (clickLoader) clickLoader.classList.add('active');
    }
    
    function hideClickLoader() {
      if (clickLoader) clickLoader.classList.remove('active');
    }

    // ── ACTIVITY TABS ──────────────────────────
    const tabButtons = document.querySelectorAll('.sh-tab');
    const actCards = document.querySelectorAll('.act-card');

    tabButtons.forEach(function(tab) {
      tab.addEventListener('click', function() {
        // Update active tab
        tabButtons.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        this.classList.add('is-active');
        this.setAttribute('aria-selected', 'true');

        const filter = this.textContent.trim();
        
        actCards.forEach(function(card) {
          card.style.display = 'block';
          card.style.opacity = '1';
          
          if (filter === 'All Activities') return;
          
          if (filter === 'Highest Paying') {
            const earnText = card.querySelector('.act-earn')?.textContent || '';
            const earnValue = parseFloat(earnText.replace(/[^0-9.]/g, ''));
            if (earnValue < 10) {
              card.style.display = 'none';
              card.style.opacity = '0';
            }
          } else if (filter === 'Most Popular') {
            const badge = card.querySelector('.act-badge');
            const isPopular = badge && (badge.textContent.includes('POPULAR') || badge.textContent.includes('HOT') || badge.textContent.includes('TOP'));
            if (!isPopular) {
              card.style.display = 'none';
              card.style.opacity = '0';
            }
          } else if (filter === 'Beginner Friendly') {
            const badge = card.querySelector('.act-badge');
            const isBeginner = badge && (badge.textContent.includes('FREE') || badge.textContent.includes('NEW'));
            if (!isBeginner) {
              card.style.display = 'none';
              card.style.opacity = '0';
            }
          }
        });
      });
    });

    // ── QUICK ACCESS FAB ───────────────────────
    const quickFab = document.querySelector('.sh-quick-fab');
    const quickItems = document.querySelector('.sh-quick-items');

    if (quickFab && quickItems) {
      quickFab.addEventListener('click', function() {
        const isOpen = quickItems.classList.contains('is-open');
        if (isOpen) {
          quickItems.classList.remove('is-open');
          this.setAttribute('aria-expanded', 'false');
        } else {
          quickItems.classList.add('is-open');
          this.setAttribute('aria-expanded', 'true');
        }
      });

      // Close when clicking outside
      document.addEventListener('click', function(e) {
        if (!quickFab.contains(e.target) && !quickItems.contains(e.target)) {
          quickItems.classList.remove('is-open');
          quickFab.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // ── BONUS BANNER ───────────────────────────
    const bonusBanner = document.querySelector('.sh-bonus');
    const bonusClose = document.querySelector('.sh-bonus-x');
    const bonusCta = document.querySelector('.sh-bonus-cta');

    if (bonusClose && bonusBanner) {
      bonusClose.addEventListener('click', function() {
        bonusBanner.style.display = 'none';
      });
    }

    if (bonusCta) {
      bonusCta.addEventListener('click', function() {
        openOfferwall();
      });
    }

    // ── BONUS TIMER ────────────────────────────
    const timerElement = document.querySelector('.sh-bonus-text strong');
    if (timerElement) {
      function updateTimer() {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const diff = endOfDay - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        timerElement.textContent = `${hours}:${minutes.toString().padStart(2, '0')}`;
      }

      updateTimer();
      setInterval(updateTimer, 60000); // Update every minute
    }

    // ── CAROUSEL (Simplified) ──────────────────
    const carouselPrev = document.querySelector('.sh-carousel-ctrls button:first-child');
    const carouselNext = document.querySelector('.sh-carousel-ctrls button:last-child');
    const carouselStory = document.querySelector('.sh-story');
    const carouselDots = document.querySelectorAll('.sh-dots button');

    // Story data (could be expanded)
    const stories = [
      {
        img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=160&h=160&fit=crop&crop=faces',
        name: 'Amina Wanjiru',
        location: '🇰🇪 Nairobi, Kenya',
        earned: '💰 KSH 48,200 in 3 months',
        quote: '"I started chatting after my morning shift. The first withdrawal hit my M-Pesa in under five minutes and I have not missed a week since."'
      },
      {
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces',
        name: 'Emmanuel Okoro',
        location: '🇳🇬 Lagos, Nigeria',
        earned: '💰 ₦180,000 in 2 months',
        quote: '"The AI training tasks are perfect for me. I work from home and earn enough to support my family. Starhela is legit!"'
      },
      {
        img: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=160&h=160&fit=crop&crop=faces',
        name: 'Sarah Nakato',
        location: '🇺🇬 Kampala, Uganda',
        earned: '💰 UGX 450,000 in 4 months',
        quote: '"Teaching Luganda to foreigners has been such a rewarding experience. I earn while sharing my culture and language."'
      },
      {
        img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=faces',
        name: 'Kwame Mensah',
        location: '🇬🇭 Accra, Ghana',
        earned: '💰 GH₵ 1,200 in 3 months',
        quote: '"I started with surveys and worked my way up to chatting. The agent support is incredible—they guide you every step."'
      }
    ];

    let currentStory = 0;

    function updateCarousel(index) {
      if (!carouselStory) return;
      
      const story = stories[index];
      const img = carouselStory.querySelector('img');
      const quote = carouselStory.querySelector('.sh-story-quote');
      const meta = carouselStory.querySelector('.sh-story-meta');
      
      if (img) img.src = story.img;
      if (quote) quote.textContent = story.quote;
      if (meta) {
        meta.innerHTML = `<strong>${story.name}</strong><span>${story.location}</span><span class="sh-story-earned">${story.earned}</span>`;
      }

      // Update dots
      carouselDots.forEach(function(dot, i) {
        if (i === index) {
          dot.classList.add('is-active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('is-active');
          dot.setAttribute('aria-selected', 'false');
        }
      });
    }

    if (carouselPrev) {
      carouselPrev.addEventListener('click', function() {
        currentStory = (currentStory - 1 + stories.length) % stories.length;
        updateCarousel(currentStory);
      });
    }

    if (carouselNext) {
      carouselNext.addEventListener('click', function() {
        currentStory = (currentStory + 1) % stories.length;
        updateCarousel(currentStory);
      });
    }

    carouselDots.forEach(function(dot, index) {
      dot.addEventListener('click', function() {
        currentStory = index;
        updateCarousel(currentStory);
      });
    });

    // Auto-rotate carousel
    setInterval(function() {
      currentStory = (currentStory + 1) % stories.length;
      updateCarousel(currentStory);
    }, 5000);

    // ── EARNINGS CALCULATOR ────────────────────
    const calcChips = document.querySelectorAll('.sh-calc-chip');
    const calcHours = document.getElementById('calc-hours');
    const calcDays = document.getElementById('calc-days');
    const calcCur = document.getElementById('calc-cur');
    const calcResultDay = document.querySelector('.sh-calc-line:first-child strong');
    const calcResultMonth = document.querySelector('.sh-calc-line-big strong');
    const calcNote = document.querySelector('.sh-calc-note');

    // Activity rates per hour in USD
    const activityRates = {
      'Chat with Foreigners': 8,
      'AI Training Tasks': 6,
      'Teach a Language': 5,
      'Paid Surveys': 4,
      'Watch & Post Videos': 3,
      'Online Writing': 7
    };

    // Currency conversion rates (approximate)
    const currencyRates = {
      USD: 1,
      KES: 145,
      UGX: 3700,
      NGN: 1550,
      GHS: 15.5,
      TZS: 2500
    };

    function updateCalculator() {
      // Get selected activities
      let totalRate = 0;
      const selectedActivities = [];
      
      calcChips.forEach(function(chip) {
        if (chip.classList.contains('is-on')) {
          const activityName = chip.textContent.replace(/[✓+]/g, '').trim();
          if (activityRates[activityName]) {
            totalRate += activityRates[activityName];
            selectedActivities.push(activityName);
          }
        }
      });

      if (totalRate === 0) totalRate = 8; // Default to chatting
      if (selectedActivities.length === 0) selectedActivities.push('Chat with Foreigners');

      const hours = parseInt(calcHours?.value || 3);
      const days = parseInt(calcDays?.value || 5);
      const currency = calcCur?.value || 'KES';
      const rate = currencyRates[currency] || 1;
      const currencySymbol = calcCur?.selectedOptions?.[0]?.text?.split(' ')[0] || 'KSH';

      const dailyUSD = totalRate * hours;
      const monthlyUSD = dailyUSD * days * 4.33; // Average weeks per month
      const dailyLocal = Math.round(dailyUSD * rate);
      const monthlyLocal = Math.round(monthlyUSD * rate);

      if (calcResultDay) calcResultDay.textContent = `${dailyLocal.toLocaleString()} ${currencySymbol}`;
      if (calcResultMonth) calcResultMonth.textContent = `${monthlyLocal.toLocaleString()} ${currencySymbol}`;
      
      if (calcNote) {
        const avgRate = (totalRate / selectedActivities.length).toFixed(2);
        calcNote.textContent = `Based on ${selectedActivities.length} selected ${selectedActivities.length === 1 ? 'activity' : 'activities'} at an average of $${avgRate}/hour.`;
      }
    }

    calcChips.forEach(function(chip) {
      chip.addEventListener('click', function() {
        const isOn = this.classList.contains('is-on');
        if (isOn) {
          this.classList.remove('is-on');
          this.setAttribute('aria-pressed', 'false');
          const span = this.querySelector('span');
          if (span) span.textContent = '+';
        } else {
          this.classList.add('is-on');
          this.setAttribute('aria-pressed', 'true');
          const span = this.querySelector('span');
          if (span) span.textContent = '✓';
        }
        updateCalculator();
      });
    });

    if (calcHours) calcHours.addEventListener('input', function() {
      const label = this.previousElementSibling?.querySelector('strong');
      if (label) label.textContent = this.value + 'h';
      updateCalculator();
    });

    if (calcDays) calcDays.addEventListener('input', function() {
      const label = this.previousElementSibling?.querySelector('strong');
      if (label) label.textContent = this.value;
      updateCalculator();
    });

    if (calcCur) calcCur.addEventListener('change', updateCalculator);

    // Initialize calculator
    updateCalculator();

    // ── ESCAPE KEY TO CLOSE MODALS ─────────────
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMenu();
        closeOfferwall();
      }
    });

    // ── INITIALIZE ─────────────────────────────
    console.log('Starhela Agencies - Ready');
  })();