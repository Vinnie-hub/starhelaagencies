const REG_URL = "https://starhela.com/register.php?ref=sydney";
      const SEED = [
        {
          id: 1,
          title: "Ultimate Safari Adventure 🦁",
          platform: "YouTube",
          by: "nairobi_explorer",
          views: 5240,
          earned: 3820,
        },
        {
          id: 2,
          title: "Bongo Flava Challenge 🔥",
          platform: "TikTok",
          by: "tz_vibe_official",
          views: 8912,
          earned: 6150,
        },
        {
          id: 3,
          title: "Lagos Street Food Tour 🍲",
          platform: "YouTube",
          by: "chidi_eats",
          views: 4388,
          earned: 3100,
        },
        {
          id: 4,
          title: "Nairobi Morning Fitness Vlog ☀️",
          platform: "Instagram",
          by: "fitkenyan254",
          views: 7740,
          earned: 5890,
        },
        {
          id: 5,
          title: "Jua Cali Behind The Scenes 🎵",
          platform: "Instagram",
          by: "ke_music_daily",
          views: 6120,
          earned: 4330,
        },
        {
          id: 6,
          title: "Ugali Recipe — Pro Tips 🍽️",
          platform: "TikTok",
          by: "mama_cooks_ke",
          views: 9800,
          earned: 7210,
        },
        {
          id: 7,
          title: "Epic Cape Town Sunset Reel 🌅",
          platform: "Instagram",
          by: "sa_moments",
          views: 4110,
          earned: 2980,
        },
        {
          id: 8,
          title: "Accra Night Life Highlights 🎉",
          platform: "YouTube",
          by: "ghana_liveup",
          views: 3660,
          earned: 2470,
        },
        {
          id: 9,
          title: "Kikuyu Comedy Skit — Part 3 😂",
          platform: "TikTok",
          by: "laughter_ke",
          views: 11300,
          earned: 8240,
        },
        {
          id: 10,
          title: "Kampala Street Dance Battle 💃",
          platform: "TikTok",
          by: "ug_dance_crew",
          views: 6780,
          earned: 4910,
        },
        {
          id: 11,
          title: "Swahili Cooking Masterclass 🍛",
          platform: "YouTube",
          by: "coastal_chef",
          views: 5530,
          earned: 3980,
        },
        {
          id: 12,
          title: "Mombasa Beach Vlog 🌊",
          platform: "Instagram",
          by: "coast_life254",
          views: 4920,
          earned: 3560,
        },
        {
          id: 13,
          title: "Nairobi CBD Rush Hour 🚦",
          platform: "TikTok",
          by: "nbo_daily_life",
          views: 7150,
          earned: 5200,
        },
        {
          id: 14,
          title: "Afrobeats Workout Routine 🏋️",
          platform: "Instagram",
          by: "fitafrica_official",
          views: 8440,
          earned: 6080,
        },
        {
          id: 15,
          title: "Tanzania Wildlife Drone Shots 🦒",
          platform: "YouTube",
          by: "tz_skycam",
          views: 12600,
          earned: 9100,
        },
        {
          id: 16,
          title: "Kigali Night Market Tour 🛍️",
          platform: "TikTok",
          by: "rw_explorer",
          views: 3890,
          earned: 2760,
        },
        {
          id: 17,
          title: "Lusaka Fashion Week Highlights 👗",
          platform: "Instagram",
          by: "zmb_fashion_tv",
          views: 5070,
          earned: 3640,
        },
        {
          id: 18,
          title: "Abuja Tech Startup Pitch 💼",
          platform: "YouTube",
          by: "ng_startups",
          views: 4230,
          earned: 3010,
        },
        {
          id: 19,
          title: "Johannesburg Street Art Tour 🎨",
          platform: "Instagram",
          by: "jozi_arts",
          views: 6330,
          earned: 4550,
        },
        {
          id: 20,
          title: "Kenyan Hip Hop Cypher 🎤",
          platform: "YouTube",
          by: "254_hiphop",
          views: 9980,
          earned: 7340,
        },
        {
          id: 21,
          title: "Dar es Salaam Sunset Fishing 🎣",
          platform: "TikTok",
          by: "tz_fishing_vibes",
          views: 3400,
          earned: 2390,
        },
        {
          id: 22,
          title: "Maasai Mara Hot Air Balloon 🎈",
          platform: "Instagram",
          by: "ke_adventures254",
          views: 15200,
          earned: 11080,
        },
        {
          id: 23,
          title: "Kamba Dance Festival Highlights 🥁",
          platform: "YouTube",
          by: "cultural_ke",
          views: 4700,
          earned: 3350,
        },
        {
          id: 24,
          title: "Zanzibar Spice Market Walk 🌶️",
          platform: "TikTok",
          by: "zanzi_vibes",
          views: 5880,
          earned: 4220,
        },
      ];

      const esc = (s) =>
        String(s).replace(
          /[&<>"']/g,
          (c) =>
            ({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
            })[c],
        );
      const platIcon = (p) =>
        ({ youtube: "📹", tiktok: "🎵", instagram: "📸" })[p.toLowerCase()] ??
        "🔗";
      const fmt = (n) =>
        n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : n;
      const $ = (id) => document.getElementById(id);

      /* Loading */
      function showLoader(cb) {
        const ov = $("loadOverlay");
        ov.classList.add("show");
        setTimeout(() => {
          ov.classList.remove("show");
          cb();
        }, 1300);
      }

      /* Modal */
      function openModal(title, msg) {
        $("modalTitle").textContent = title;
        $("modalMsg").textContent = msg;
        $("modal").classList.add("open");
      }
      function closeModal() {
        $("modal").classList.remove("open");
      }
      $("modal").addEventListener("click", (e) => {
        if (e.target === $("modal")) closeModal();
      });
      function goRegister() {
        window.open(REG_URL, "_blank");
        closeModal();
      }

      function handleWatchClick() {
        showLoader(() =>
          openModal(
            "You don't have an account yet.",
            "Create your Starhela account to watch videos and start earning coins instantly. ",
          ),
        );
      }

      function handlePostClick(btn) {
        btn.classList.add("loading");
        setTimeout(() => {
          btn.classList.remove("loading");
          openModal(
            "You don't have an account yet.",
            "Create your account to upload videos and start earning on Starhela.",
          );
        }, 1600);
      }

      /* Featured preview: replay its first three seconds while it is hovered. */
      document.querySelectorAll(".hero-preview-screen").forEach((preview) => {
        const video = preview.querySelector("video");
        if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const startPreview = () => {
          video.currentTime = 0;
          video.play().catch(() => {});
        };
        const stopPreview = () => {
          video.pause();
          video.currentTime = 0;
        };

        preview.addEventListener("mouseenter", startPreview);
        preview.addEventListener("mouseleave", stopPreview);
        preview.addEventListener("focusin", startPreview);
        preview.addEventListener("focusout", stopPreview);
        video.addEventListener("timeupdate", () => {
          if (video.currentTime >= 3) {
            video.currentTime = 0;
            video.play().catch(() => {});
          }
        });
      });

      /* Desktop tabs */
      document.querySelectorAll(".tab").forEach((t) => {
        t.onclick = () => {
          document
            .querySelectorAll(".tab")
            .forEach((x) => x.classList.remove("on"));
          document
            .querySelectorAll(".pane")
            .forEach((x) => x.classList.remove("on"));
          t.classList.add("on");
          $(t.dataset.tab).classList.add("on");
        };
      });

      function openVideoTab(tabId) {
        document.querySelectorAll(".tab").forEach((tab) =>
          tab.classList.toggle("on", tab.dataset.tab === tabId),
        );
        document.querySelectorAll(".pane").forEach((pane) =>
          pane.classList.toggle("on", pane.id === tabId),
        );
        document.querySelectorAll(".bnav-btn").forEach((button) =>
          button.classList.toggle("on", button.dataset.tab === tabId),
        );
        $("platform").scrollIntoView({ behavior: "smooth", block: "start" });
      }

      /* Mobile bottom nav */
      function mobileTab(btn) {
        document
          .querySelectorAll(".bnav-btn")
          .forEach((x) => x.classList.remove("on"));
        document
          .querySelectorAll(".tab")
          .forEach((x) => x.classList.remove("on"));
        document
          .querySelectorAll(".pane")
          .forEach((x) => x.classList.remove("on"));
        btn.classList.add("on");
        const tab = btn.dataset.tab;
        if (tab) {
          $(tab).classList.add("on");
          // sync desktop tab
          document
            .querySelector(`.tab[data-tab="${tab}"]`)
            ?.classList.add("on");
        }
      }

      function showDash() {
        renderAll();
        $("platform").scrollIntoView({ behavior: "smooth", block: "start" });
      }

      /* Render */
      function renderAll() {
        renderWatch();
        renderUploads();
        renderPost();
      }

      const VIDEOS_PER_VIEW = 6;
      let nextVideoIndex = VIDEOS_PER_VIEW;
      let videoSlot = 0;
      let videoRotation;
      const VIDEO_IMAGES = {
        1: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
        2: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
        3: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        4: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80",
        5: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
        6: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
        7: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80",
        8: "https://images.unsplash.com/photo-1660675134062-7d3bbb340608?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        9: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
        10: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=800&q=80",
        11: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
        12: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        13: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",
        14: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
        15: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
        16: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80",
        17: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
        18: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
        19: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80",
        20: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80",
        21: "https://images.unsplash.com/photo-1476673160081-cf065607f449?auto=format&fit=crop&w=800&q=80",
        22: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
        23: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=800&q=80",
        24: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
      };

      function videoCard(v) {
        return `
          <div class="vcard">
            <div class="thumb" style="background-image:url('${VIDEO_IMAGES[v.id]}');">
              <div class="thumb-ov" style="opacity:1;cursor:default;">
                <div style="width:48px;height:48px;border-radius:50%;background:rgba(108,62,232,.88);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(0,0,0,.3);">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" width="18" height="18"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
              </div>
            </div>
            <div class="vbody">
              <div class="vtop">
                <div class="vtitle">${esc(v.title)}</div>
                <span class="pbadge">${platIcon(v.platform)} ${esc(v.platform)}</span>
              </div>
              <div class="vmeta">👤 ${esc(v.by)} &nbsp;·&nbsp; 👁 <strong style="color:var(--dark)">${fmt(v.views)}</strong> views <span class="views-pill">🔥 ${fmt(v.earned)} earned</span></div>
              <div class="vfoot">
                <span class="reward-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  +5 coins
                </span>
                <button class="btn-watch" onclick="handleWatchClick()">
                  <svg viewBox="0 0 24 24" width="12" height="12"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/></svg>
                  Watch &amp; Earn
                </button>
              </div>
            </div>
          </div>`;
      }

      function currentVideoSet() {
        return SEED.slice(0, VIDEOS_PER_VIEW).map(videoCard).join("");
      }

      function rotateVideos() {
        const rotator = $("videoRotator");
        if (!rotator || document.hidden) return;

        const card = rotator.children[videoSlot];
        if (!card) return;

        card.classList.add("is-changing");
        setTimeout(() => {
          card.outerHTML = videoCard(SEED[nextVideoIndex]);
          nextVideoIndex = (nextVideoIndex + 1) % SEED.length;
          videoSlot = (videoSlot + 1) % VIDEOS_PER_VIEW;
        }, 520);
      }

      function renderWatch() {
        nextVideoIndex = VIDEOS_PER_VIEW;
        videoSlot = 0;

        $("t-watch").innerHTML =
          `<div class="grid video-rotator" id="videoRotator">${currentVideoSet()}</div>
          <div class="gate">
            <div class="gate-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
  
            <div class="browse-more">
              <div class="browse-more-copy">
                <strong>Want to browse more videos?</strong>
                <span>Create an account to unlock the full video library.</span>
              </div>
              <a class="browse-more-link" href="https://starhela.com/register.php?ref=sydney" id="browseMore" target="_blank" rel="noopener">
                Sign up
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </div>
            <div class="gate-perks">
              <span class="gate-perk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Instant activation</span>
              <span class="gate-perk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Earn from day one</span>
              <span class="gate-perk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> M-Pesa withdrawals</span>
              <span class="gate-perk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> All platforms</span>
            </div>
          </div>`;

        clearInterval(videoRotation);
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          videoRotation = setInterval(rotateVideos, 3200);
        }
      }

      function renderUploads() {
        $("t-uploads").innerHTML = `<div class="empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          <h4>Your uploads will appear here</h4>
          <p>Earn coins as your content gets views and engagement from thousands of Starhela members across Africa.</p>
          <button class="btn btn-brand" onclick="goRegister()" style="margin:0 auto;padding:13px 26px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
            Create Your Account
          </button>
        </div>`;
      }

      function renderPost() {
        $("t-post").innerHTML = `<div class="form-wrap">
          <div class="form-card">
            <h3>📤 Post a Video &amp; Earn +15 Coins</h3>
            <p class="sub">Share any video URL from social platforms and get rewarded instantly.</p>
            <div class="fg">
              <label>Video URL</label>
              <input type="url" id="fUrl" placeholder="https://youtube.com/watch?v=... or TikTok / Instagram link" inputmode="url"
                onfocus="this.blur();openModal('You don\\'t have an account yet.','Create your account to upload videos and start earning on Starhela.')"/>
            </div>
            <div class="fg-row">
              <div class="fg">
                <label>Video Title</label>
                <input type="text" id="fTitle" placeholder="Give your video a catchy title"
                  onfocus="this.blur();openModal('You don\\'t have an account yet.','Create your account to upload videos and start earning on Starhela.')"/>
              </div>
              <div class="fg" style="max-width:140px;">
                <label>Platform</label>
                <select id="fPlatform"
                  onfocus="this.blur();openModal('You don\\'t have an account yet.','Create your account to upload videos and start earning on Starhela.')">
                  <option>YouTube</option><option>TikTok</option><option>Instagram</option><option>Other</option>
                </select>
              </div>
            </div>
            <button id="postSubmitBtn" class="btn btn-brand btn-post-submit" onclick="handlePostClick(this)"
              style="padding:14px 26px;font-size:.9rem;width:100%;justify-content:center;position:relative;">
              <span class="btn-post-text" style="display:flex;align-items:center;gap:8px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="15" height="15"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                Post Now &amp; Get +15 Coins
              </span>
              <span class="btn-post-spinner">
                <span class="spin-ring"></span>
                <span class="spin-label">Uploading video…</span>
              </span>
            </button>
          </div>
          <div class="form-note" style="margin-top:16px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p>You earn <strong>+15 coins</strong> the moment you post. Members earn <strong>+5 coins</strong> each time they watch your video — the more views, the more everyone earns.</p>
          </div>
        </div>`;
      }

      renderAll();