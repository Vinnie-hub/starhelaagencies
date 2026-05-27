(function () {
        "use strict";
        const REG = "https://Starhela.com/register.php?ref=sydney";
        const $ = (id) => document.getElementById(id);
        const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        function shuffle(a) {
          const b = [...a];
          for (let i = b.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [b[i], b[j]] = [b[j], b[i]];
          }
          return b;
        }

        /* LIVE BAR */
        const LAB = [
          "15,000+ Verified Earners","$890K+ Paid Out","One-Time Fee Only","5 Ways to Earn",
          "$2–$8 Per Hour","UK · USA · Canada · Qatar","Daily M-Pesa/MTN Money/Airtel Money Payouts",
          "4.6★ Rating","Funza wazungu kiswahili","Real-Time Withdrawals","No Monthly Subscriptions",
          "Piga Gumzo kwa Kiswahili","Tafsiri Otomatiki kwa Wateja","8,400+ Active Earners",
        ];
        const feed = $("labFeed");
        if (feed) [...LAB, ...LAB].forEach((ev) => {
          const s = document.createElement("span");
          s.className = "lab-item";
          s.innerHTML = `<i class="fas fa-check-circle"></i>${ev}`;
          feed.appendChild(s);
        });
        let labN = 3847;
        setInterval(() => {
          if (!document.hidden) {
            labN = Math.max(800, labN + Math.floor(Math.random() * 12) - 5);
            const e = $("labCount");
            if (e) e.textContent = fmt(labN) + " online";
          }
        }, 2200);

        /* NAV */
        const ham = $("ham"), mobNav = $("mobNav");
        function closeMob() {
          if (!ham || !mobNav) return;
          ham.classList.remove("x");
          mobNav.classList.remove("open");
          ham.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
        ham && ham.addEventListener("click", (e) => {
          e.stopPropagation();
          mobNav.classList.contains("open") ? closeMob() : (() => {
            ham.classList.add("x");
            mobNav.classList.add("open");
            ham.setAttribute("aria-expanded", "true");
            document.body.style.overflow = "hidden";
          })();
        });
        mobNav && mobNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMob));
        document.addEventListener("click", (e) => {
          if (mobNav && mobNav.classList.contains("open") && !mobNav.contains(e.target) && ham && !ham.contains(e.target)) closeMob();
        });
        window.addEventListener("scroll", () => { $("nav").classList.toggle("solid", window.scrollY > 50); }, { passive: true });
        document.querySelectorAll('a[href^="#"]').forEach((a) => {
          a.addEventListener("click", (e) => {
            const id = a.getAttribute("href").slice(1), el = document.getElementById(id);
            if (el) { e.preventDefault(); closeMob(); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
          });
        });

        /* ROUTING */
        window.openBrowsePage = function () {
          document.body.classList.add("browse-view");
          window.scrollTo(0, 0);
          initBrowseGrid();
        };
        window.goHome = function () {
          document.body.classList.remove("browse-view");
          window.scrollTo(0, 0);
        };

        /* MODAL HELPERS */
        function checkScroll() {
          const any = ["offerOv","pmodOv","acctOv"].some((id) => { const el = $(id); return el && el.classList.contains("on"); });
          if (!any) document.body.style.overflow = "";
        }
        function closeAll() {
          ["offerOv","pmodOv","acctOv"].forEach((id) => { const el = $(id); if (el) el.classList.remove("on"); });
          checkScroll();
        }
        window.openAcctModal = function () { $("acctOv").classList.add("on"); document.body.style.overflow = "hidden"; };
        $("acctClose") && $("acctClose").addEventListener("click", () => { $("acctOv").classList.remove("on"); checkScroll(); });
        $("acctOv") && $("acctOv").addEventListener("click", (e) => { if (e.target === $("acctOv")) { $("acctOv").classList.remove("on"); checkScroll(); } });
        window.openOffer = function () { $("offerOv").classList.add("on"); document.body.style.overflow = "hidden"; };
        window.closeOffer = function () { $("offerOv").classList.remove("on"); checkScroll(); };
        $("offerClose") && $("offerClose").addEventListener("click", closeOffer);
        $("offerOv") && $("offerOv").addEventListener("click", (e) => { if (e.target === $("offerOv")) closeOffer(); });
        const pmodOv = $("pmodOv");
        function closePmod() { pmodOv && pmodOv.classList.remove("on"); checkScroll(); }
        pmodOv && pmodOv.addEventListener("click", (e) => { if (e.target === pmodOv) closePmod(); });
        document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });

        /* ═══════════════════════════════════════
           48 PROFILES
        ═══════════════════════════════════════ */
        const ALL_PROFILES = [
          { id:1,  name:"Emily",       age:65, loc:"London, UK",           flag:"🇬🇧", country:"uk",     desc:"Wants to chat with you", full:"Hi! I'm Emily. I love love stories, romance novels, and hearing how people met their partners. Let's share sweet stories!", price:4,  tags:["Love Stories","Romance","Friendly","Patient"],            img:"https://plus.unsplash.com/premium_photo-1679439492693-05a8e642381d?w=500&auto=format&fit=crop&q=60", badge:"Popular", badgeClass:"def"  },
          { id:2,  name:"Robert",      age:58, loc:"New York, USA",        flag:"🇺🇸", country:"usa",    desc:"Wants to chat with you", full:"Hi! I'm Robert. I enjoy business talks, but I also love hearing about faith and how religion shapes daily life.",               price:6,  tags:["Faith","Business","Mentor","Respectful"],                 img:"https://plus.unsplash.com/premium_photo-1672297543351-17987c5c9361?q=80&w=385&auto=format&fit=crop", badge:"Premium", badgeClass:"prem" },
          { id:3,  name:"Linda",       age:68, loc:"Toronto, Canada",      flag:"🇨🇦", country:"canada", desc:"Wants to chat with you", full:"Hi! I'm Linda. I'm looking for companionship and someone to share daily life chats with. Let's be friends!",                   price:8,  tags:["Companionship","Friendship","Warm","Family"],             img:"https://images.unsplash.com/photo-1615538786254-ad8b50de17dc?q=80&w=387&auto=format&fit=crop", badge:"Top",     badgeClass:"top"  },
          { id:4,  name:"Michael",     age:54, loc:"Manchester, UK",       flag:"🇬🇧", country:"uk",     desc:"Wants to chat with you", full:"Hi! I'm Michael. I love talking about science, God, and the big questions in life. Let's have deep chats!",                    price:3,  tags:["Science","Faith","Philosophy","Curious"],                 img:"https://i.pravatar.cc/400?img=68", badge:"New",     badgeClass:"def"  },
          { id:5,  name:"Susan",       age:61, loc:"Melbourne, Australia",  flag:"🇦🇺", country:"other",  desc:"Wants to chat with you", full:"Hi! I'm Susan. I just want a good friend to share daily life, laugh, and maybe cry together sometimes.",                       price:5,  tags:["Friendship","Listener","Warm","Kind"],                    img:"https://i.pravatar.cc/400?img=49", badge:"Verified",badgeClass:"def"  },
          { id:6,  name:"Ahmed",       age:47, loc:"Doha, Qatar",          flag:"🇶🇦", country:"qatar",  desc:"Wants to chat with you", full:"Hi! I'm Ahmed. I love hearing about Islamic traditions from different African countries. Let's share our faith!",               price:7,  tags:["Islam","Faith","Culture","Respectful"],                   img:"https://i.pravatar.cc/400?img=60", badge:"Premium", badgeClass:"prem" },
          { id:7,  name:"Helena",      age:52, loc:"Amsterdam, Netherlands",flag:"🇳🇱", country:"other",  desc:"Wants to chat with you", full:"Hi! I'm Helena. I love art, but also romance and sweet love stories. Tell me about your first love!",                         price:5,  tags:["Love Stories","Art","Romance","Creative"],                img:"https://i.pravatar.cc/400?img=47", badge:"Popular", badgeClass:"def"  },
          { id:8,  name:"Carlos",      age:44, loc:"Madrid, Spain",        flag:"🇪🇸", country:"other",  desc:"Wants to chat with you", full:"Hi! I'm Carlos. I love good food and even better company. Let's chat about life, love, and everything!",                       price:4,  tags:["Friendly","Life Talks","Food","Warm"],                    img:"https://i.pravatar.cc/400?img=64", badge:"New",     badgeClass:"def"  },
          { id:9,  name:"Sophia",      age:39, loc:"Sydney, Australia",    flag:"🇦🇺", country:"other",  desc:"Wants to chat with you", full:"Hi! I'm Sophia. I'm a Christian who loves talking about faith, prayer, and how God works in our lives.",                       price:3,  tags:["Christianity","Faith","Prayer","Kind"],                   img:"https://i.pravatar.cc/400?img=41", badge:"Verified",badgeClass:"def"  },
          { id:10, name:"James",       age:53, loc:"London, UK",           flag:"🇬🇧", country:"uk",     desc:"Wants to chat with you", full:"Hi! I'm James. I want a true companion - someone to share thoughts, dreams, and everyday moments with.",                       price:6,  tags:["Companionship","Friendship","Loyal","Mentor"],            img:"https://i.pravatar.cc/400?img=12", badge:"Popular", badgeClass:"def"  },
          { id:11, name:"Marie",       age:49, loc:"Paris, France",        flag:"🇫🇷", country:"other",  desc:"Wants to chat with you", full:"Hi! I'm Marie. I love romantic stories, fashion, and learning about love in different cultures.",                               price:7,  tags:["Romance","Love Stories","Fashion","Culture"],             img:"https://i.pravatar.cc/400?img=45", badge:"Premium", badgeClass:"prem" },
          { id:12, name:"George",      age:62, loc:"Toronto, Canada",      flag:"🇨🇦", country:"canada", desc:"Wants to chat with you", full:"Hi! I'm George. I'm a Christian who loves Bible discussions, prayer, and faith-based companionship.",                           price:4,  tags:["Christianity","Faith","Prayer","Gentle"],                 img:"https://i.pravatar.cc/400?img=70", badge:"Top",     badgeClass:"top"  },
          { id:13, name:"Nina",        age:36, loc:"Berlin, Germany",      flag:"🇩🇪", country:"other",  desc:"Wants to chat with you", full:"Hi! I'm Nina. I love stories - love stories, family stories, any stories. Share your life with me!",                           price:5,  tags:["Stories","Love","Listener","Friendly"],                   img:"https://i.pravatar.cc/400?img=39", badge:"Verified",badgeClass:"def"  },
          { id:14, name:"David",       age:55, loc:"Boston, USA",          flag:"🇺🇸", country:"usa",    desc:"Wants to chat with you", full:"Hi! I'm David. I'm interested in all religions - Christianity, Islam, African traditions. Let's learn together!",               price:8,  tags:["Religion","Faith","Respectful","Academic"],               img:"https://i.pravatar.cc/400?img=59", badge:"Premium", badgeClass:"prem" },
          { id:15, name:"Amelia",      age:42, loc:"Edinburgh, UK",        flag:"🇬🇧", country:"uk",     desc:"Wants to chat with you", full:"Hi! I'm Amelia. I want a friend to talk about family, parenting, and the simple joys of life.",                                price:3,  tags:["Family","Friendship","Warm","Kind"],                      img:"https://i.pravatar.cc/400?img=43", badge:"New",     badgeClass:"def"  },
          { id:16, name:"Omar",        age:50, loc:"Dubai, UAE",           flag:"🇦🇪", country:"other",  desc:"Wants to chat with you", full:"Hi! I'm Omar. I want to learn about Muslim life in Africa and share Islamic teachings together.",                               price:7,  tags:["Islam","Faith","Brotherhood","Culture"],                  img:"https://i.pravatar.cc/400?img=62", badge:"Popular", badgeClass:"def"  },
          { id:17, name:"Grace",       age:67, loc:"Dublin, Ireland",      flag:"🇮🇪", country:"other",  desc:"Wants to chat with you", full:"Hi! I'm Grace. I love companionship - just sitting, talking, and enjoying each other's company.",                              price:4,  tags:["Companionship","Stories","Gentle","Warm"],                img:"https://i.pravatar.cc/400?img=50", badge:"Verified",badgeClass:"def"  },
          { id:18, name:"Peter",       age:46, loc:"Zurich, Switzerland",  flag:"🇨🇭", country:"other",  desc:"Wants to chat with you", full:"Hi! I'm Peter. I love adventure stories and hearing about people's journeys through life.",                                     price:6,  tags:["Adventure","Stories","Travel","Friendly"],                img:"https://i.pravatar.cc/400?img=65", badge:"Premium", badgeClass:"prem" },
          { id:19, name:"Anna",        age:38, loc:"Stockholm, Sweden",    flag:"🇸🇪", country:"other",  desc:"Wants to chat with you", full:"Hi! I'm Anna. I love nature but also love talking about faith and finding meaning in life.",                                    price:5,  tags:["Nature","Faith","Philosophy","Curious"],                  img:"https://i.pravatar.cc/400?img=44", badge:"New",     badgeClass:"def"  },
          { id:20, name:"Marco",       age:59, loc:"Rome, Italy",          flag:"🇮🇹", country:"other",  desc:"Wants to chat with you", full:"Hi! I'm Marco. I'm Catholic and would love to share prayers and talk about faith with you.",                                    price:4,  tags:["Catholic","Faith","Prayer","Warm"],                       img:"https://i.pravatar.cc/400?img=67", badge:"Popular", badgeClass:"def"  },
          { id:21, name:"Lisa",        age:45, loc:"Vancouver, Canada",    flag:"🇨🇦", country:"canada", desc:"Wants to chat with you", full:"Hi! I'm Lisa. I just want someone to talk to - about anything. Life, love, dreams, or just the weather!",                      price:3,  tags:["Friendship","Listener","Kind","Easygoing"],               img:"https://i.pravatar.cc/400?img=40", badge:"Verified",badgeClass:"def"  },
          { id:22, name:"Tom",         age:63, loc:"Chicago, USA",         flag:"🇺🇸", country:"usa",    desc:"Wants to chat with you", full:"Hi! I'm Tom. I'm looking for a true friend - someone to share sports, stories, and good laughs with.",                          price:5,  tags:["Friendship","Sports","Loyal","Fun"],                      img:"https://i.pravatar.cc/400?img=69", badge:"Top",     badgeClass:"top"  },
          { id:23, name:"Julia",       age:41, loc:"Vienna, Austria",      flag:"🇦🇹", country:"other",  desc:"Wants to chat with you", full:"Hi! I'm Julia. I love romantic music and even more, romantic love stories. Tell me yours!",                                    price:6,  tags:["Love Stories","Music","Romance","Creative"],              img:"https://i.pravatar.cc/400?img=42", badge:"Premium", badgeClass:"prem" },
          { id:24, name:"Hassan",      age:53, loc:"Casablanca, Morocco",  flag:"🇲🇦", country:"other",  desc:"Wants to chat with you", full:"Hi! I'm Hassan. I want to learn about African spirituality and share my own faith journey too.",                               price:7,  tags:["Spirituality","Faith","Culture","Respectful"],            img:"https://i.pravatar.cc/400?img=61", badge:"Verified",badgeClass:"def"  },
          { id:25, name:"William",     age:57, loc:"Manchester, UK",       flag:"🇬🇧", country:"uk",     desc:"Wants to chat with you", full:"Hi! I'm William. I enjoy heartfelt conversations about family values, life lessons, and the beauty of everyday moments.",      price:5,  tags:["Family","Life Talks","Thoughtful","Wise"],                img:"https://i.pravatar.cc/400?img=33", badge:"Premium", badgeClass:"prem" },
          { id:26, name:"Sandra",      age:44, loc:"Houston, USA",         flag:"🇺🇸", country:"usa",    desc:"Wants to chat with you", full:"Hi! I'm Sandra. I'm a nurse who loves hearing about how people take care of each other across different cultures.",              price:4,  tags:["Healthcare","Culture","Caring","Friendly"],               img:"https://i.pravatar.cc/400?img=36", badge:"New",     badgeClass:"def"  },
          { id:27, name:"Tariq",       age:48, loc:"Doha, Qatar",          flag:"🇶🇦", country:"qatar",  desc:"Wants to chat with you", full:"Hi! I'm Tariq. I love sharing Islamic wisdom and learning about African Muslim communities and their traditions.",               price:8,  tags:["Islam","Wisdom","Culture","Brotherhood"],                 img:"https://i.pravatar.cc/400?img=57", badge:"Top",     badgeClass:"top"  },
          { id:28, name:"Patricia",    age:66, loc:"Calgary, Canada",      flag:"🇨🇦", country:"canada", desc:"Wants to chat with you", full:"Hi! I'm Patricia. I'm a retired teacher who loves warm conversations about education, children, and family life.",              price:4,  tags:["Education","Family","Mentor","Warm"],                     img:"https://i.pravatar.cc/400?img=52", badge:"Verified",badgeClass:"def"  },
          { id:29, name:"Andrew",      age:51, loc:"Edinburgh, UK",        flag:"🇬🇧", country:"uk",     desc:"Wants to chat with you", full:"Hi! I'm Andrew. I love Scottish history and I'm fascinated by African history and culture. Let's swap stories!",               price:5,  tags:["History","Culture","Stories","Curious"],                  img:"https://i.pravatar.cc/400?img=70", badge:"Popular", badgeClass:"def"  },
          { id:30, name:"Jessica",     age:39, loc:"Los Angeles, USA",     flag:"🇺🇸", country:"usa",    desc:"Wants to chat with you", full:"Hi! I'm Jessica. I work in film and I'm endlessly curious about African storytelling and creative traditions.",                 price:6,  tags:["Storytelling","Arts","Creative","Open-minded"],           img:"https://i.pravatar.cc/400?img=35", badge:"Premium", badgeClass:"prem" },
          { id:31, name:"Fatima",      age:43, loc:"Doha, Qatar",          flag:"🇶🇦", country:"qatar",  desc:"Wants to chat with you", full:"Hi! I'm Fatima. I'd love to connect with African women and hear their stories of faith, family, and resilience.",              price:5,  tags:["Faith","Women","Family","Sisterhood"],                    img:"https://i.pravatar.cc/400?img=31", badge:"Popular", badgeClass:"def"  },
          { id:32, name:"Henry",       age:60, loc:"Vancouver, Canada",    flag:"🇨🇦", country:"canada", desc:"Wants to chat with you", full:"Hi! I'm Henry. I retired early and spend my days reading, hiking, and looking for great conversations worldwide.",             price:7,  tags:["Adventure","Nature","Books","Easygoing"],                img:"https://i.pravatar.cc/400?img=55", badge:"Top",     badgeClass:"top"  },
          { id:33, name:"Charlotte",   age:47, loc:"Birmingham, UK",       flag:"🇬🇧", country:"uk",     desc:"Wants to chat with you", full:"Hi! I'm Charlotte. I'm a bookworm who loves discussing novels, life philosophies, and meaningful connections.",                price:4,  tags:["Books","Philosophy","Thoughtful","Kind"],                 img:"https://i.pravatar.cc/400?img=48", badge:"Verified",badgeClass:"def"  },
          { id:34, name:"Nathan",      age:55, loc:"Seattle, USA",         flag:"🇺🇸", country:"usa",    desc:"Wants to chat with you", full:"Hi! I'm Nathan. I work in tech but my heart is in connecting with people and learning about diverse lifestyles.",               price:5,  tags:["Tech","Culture","Open-minded","Friendly"],                img:"https://i.pravatar.cc/400?img=61", badge:"New",     badgeClass:"def"  },
          { id:35, name:"Abdullah",    age:52, loc:"Doha, Qatar",          flag:"🇶🇦", country:"qatar",  desc:"Wants to chat with you", full:"Hi! I'm Abdullah. I value deep, respectful conversations about Quranic teachings and African Islamic traditions.",              price:8,  tags:["Islam","Quran","Faith","Respectful"],                     img:"https://i.pravatar.cc/400?img=58", badge:"Premium", badgeClass:"prem" },
          { id:36, name:"Margaret",    age:63, loc:"Ottawa, Canada",       flag:"🇨🇦", country:"canada", desc:"Wants to chat with you", full:"Hi! I'm Margaret. I love gardening, cooking, and sharing recipes. Tell me about your favourite African dishes!",              price:3,  tags:["Food","Gardening","Culture","Warm"],                      img:"https://i.pravatar.cc/400?img=53", badge:"Popular", badgeClass:"def"  },
          { id:37, name:"Oliver",      age:44, loc:"Bristol, UK",          flag:"🇬🇧", country:"uk",     desc:"Wants to chat with you", full:"Hi! I'm Oliver. I'm a music lover and I'm fascinated by African rhythms, instruments, and musical heritage.",                 price:6,  tags:["Music","Culture","Arts","Energetic"],                     img:"https://i.pravatar.cc/400?img=12", badge:"Top",     badgeClass:"top"  },
          { id:38, name:"Rachel",      age:37, loc:"Miami, USA",           flag:"🇺🇸", country:"usa",    desc:"Wants to chat with you", full:"Hi! I'm Rachel. I love the beach, positive energy, and finding joy in every conversation. Let's brighten each other's day!", price:4,  tags:["Positivity","Lifestyle","Fun","Friendly"],                img:"https://i.pravatar.cc/400?img=34", badge:"Verified",badgeClass:"def"  },
          { id:39, name:"Mohammed",    age:49, loc:"Doha, Qatar",          flag:"🇶🇦", country:"qatar",  desc:"Wants to chat with you", full:"Hi! I'm Mohammed. I travel widely and I'm always eager to understand the daily life of Muslim Africans.",                      price:6,  tags:["Travel","Islam","Culture","Curious"],                     img:"https://i.pravatar.cc/400?img=56", badge:"Verified",badgeClass:"def"  },
          { id:40, name:"Elizabeth",   age:58, loc:"Montreal, Canada",     flag:"🇨🇦", country:"canada", desc:"Wants to chat with you", full:"Hi! I'm Elizabeth. I'm bilingual and love conversations about language, culture, and the stories that shape us.",              price:7,  tags:["Language","Culture","Stories","Thoughtful"],              img:"https://i.pravatar.cc/400?img=54", badge:"Premium", badgeClass:"prem" },
          { id:41, name:"Christopher", age:53, loc:"Leeds, UK",            flag:"🇬🇧", country:"uk",     desc:"Wants to chat with you", full:"Hi! I'm Christopher. I enjoy football, community life, and deep conversations about faith and purpose.",                      price:4,  tags:["Football","Community","Faith","Fun"],                     img:"https://i.pravatar.cc/400?img=14", badge:"Popular", badgeClass:"def"  },
          { id:42, name:"Stephanie",   age:46, loc:"Boston, USA",          flag:"🇺🇸", country:"usa",    desc:"Wants to chat with you", full:"Hi! I'm Stephanie. I'm a professor who loves cross-cultural dialogue and learning from diverse perspectives.",                 price:7,  tags:["Academic","Culture","Learning","Respectful"],             img:"https://i.pravatar.cc/400?img=33", badge:"Top",     badgeClass:"top"  },
          { id:43, name:"Khalid",      age:55, loc:"Doha, Qatar",          flag:"🇶🇦", country:"qatar",  desc:"Wants to chat with you", full:"Hi! I'm Khalid. I'm a family man who enjoys wholesome chats about raising children with strong values and faith.",             price:5,  tags:["Family","Faith","Parenting","Warm"],                      img:"https://i.pravatar.cc/400?img=55", badge:"New",     badgeClass:"def"  },
          { id:44, name:"Dorothy",     age:70, loc:"Halifax, Canada",      flag:"🇨🇦", country:"canada", desc:"Wants to chat with you", full:"Hi! I'm Dorothy. At 70, I've got plenty of stories! I love exchanging life wisdom with people across the world.",             price:3,  tags:["Wisdom","Life Talks","Stories","Gentle"],                 img:"https://i.pravatar.cc/400?img=51", badge:"Verified",badgeClass:"def"  },
          { id:45, name:"Edward",      age:48, loc:"Glasgow, UK",          flag:"🇬🇧", country:"uk",     desc:"Wants to chat with you", full:"Hi! I'm Edward. I'm a chef who is obsessed with food culture. Let's talk about incredible African cuisines!",                price:6,  tags:["Food","Culture","Creative","Passionate"],                 img:"https://i.pravatar.cc/400?img=8",  badge:"Premium", badgeClass:"prem" },
          { id:46, name:"Jennifer",    age:52, loc:"Denver, USA",          flag:"🇺🇸", country:"usa",    desc:"Wants to chat with you", full:"Hi! I'm Jennifer. I practice yoga and meditation and I'm curious about African spiritual practices and traditions.",            price:5,  tags:["Spirituality","Wellness","Culture","Open-minded"],        img:"https://i.pravatar.cc/400?img=32", badge:"Popular", badgeClass:"def"  },
          { id:47, name:"Nasser",      age:45, loc:"Doha, Qatar",          flag:"🇶🇦", country:"qatar",  desc:"Wants to chat with you", full:"Hi! I'm Nasser. I run a business and admire African entrepreneurship. Let's talk about dreams and building something great.", price:8, tags:["Business","Entrepreneurship","Motivated","Respectful"],  img:"https://i.pravatar.cc/400?img=63", badge:"Top",     badgeClass:"top"  },
          { id:48, name:"Alice",       age:61, loc:"Winnipeg, Canada",     flag:"🇨🇦", country:"canada", desc:"Wants to chat with you", full:"Hi! I'm Alice. I volunteer at a community center and love connecting with people, sharing kindness and good stories.",         price:4,  tags:["Community","Kindness","Stories","Volunteer"],             img:"https://i.pravatar.cc/400?img=46", badge:"Verified",badgeClass:"def"  },
        ];

        /* CARD BUILDER */
        function buildCard(p) {
          const stars = "★".repeat(Math.random() < 0.28 ? 4 : 5);
          return `<div class="prf-top"><img src="${p.img}" alt="${p.name}" class="prf-img" loading="lazy"/><div class="prf-overlay"></div><div class="prf-badge ${p.badgeClass}">${p.badge}</div><div class="prf-online"><div class="prf-online-dot"></div></div><div class="prf-identity"><div class="prf-name">${p.name}, ${p.age}</div><div class="prf-loc">${p.flag} ${p.loc}</div></div></div><div class="prf-body"><div class="prf-rate-row"><div class="prf-rate">$${p.price}<span>/hr</span></div><div class="prf-stars" aria-label="${stars.length} stars">${stars}</div></div><p class="prf-desc">${p.desc}</p><div class="prf-actions"><button class="prf-accept" data-id="${p.id}" aria-label="Accept request from ${p.name}"><i class="fas fa-check"></i> Accept Request</button><button class="prf-view" data-id="${p.id}" aria-label="View ${p.name}"><i class="fas fa-user"></i> View</button></div></div>`;
        }

        /* GRID CLICK HANDLER */
        function handleGridClick(e) {
          const ab = e.target.closest(".prf-accept"), vb = e.target.closest(".prf-view");
          if (ab && !ab.disabled) {
            const p = ALL_PROFILES.find((x) => x.id === +ab.dataset.id);
            if (!p) return;
            ab.disabled = true;
            ab.innerHTML = `<span style="display:inline-flex;align-items:center;gap:.3rem"><span style="width:9px;height:9px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;display:inline-block;animation:spin .5s linear infinite"></span> Accepting…</span>`;
            setTimeout(() => { showNotif(`Register to chat with ${p.name}!`); openOffer(); }, 800);
          }
          if (vb) {
            const p = ALL_PROFILES.find((x) => x.id === +vb.dataset.id);
            if (p) openPmod(p);
          }
        }

        /* ═══════════════════════════════════════
           MAIN PAGE ROTATING GRID
           CHANGE 2: Bigger pool, cooldown set, 1-3 random swaps, smoother
        ═══════════════════════════════════════ */
        const SLOTS = 6,
          ROT_MS = 4800,
          STAGGER = 200,
          FADE_OUT = 260,
          FADE_IN = 360;
        let slotProfs = new Array(SLOTS).fill(null),
          queue = [],
          qCursor = 0,
          rotTmr = null,
          isRot = false;
        const slotT = new Array(SLOTS).fill(0);

        // Cooldown: a profile won't repeat until COOLDOWN others have shown
        const COOLDOWN = 18;
        let recentIds = [];
        function markSeen(id) {
          recentIds.push(id);
          if (recentIds.length > COOLDOWN) recentIds.shift();
        }
        function refillQ() {
          queue = [...queue, ...shuffle(ALL_PROFILES), ...shuffle(ALL_PROFILES)];
        }
        function nextP(excl) {
          const cooled = new Set(recentIds);
          const lim = queue.length + ALL_PROFILES.length * 3;
          for (let t = 0; t < lim; t++) {
            if (qCursor >= queue.length) refillQ();
            const p = queue[qCursor++];
            if (!excl.has(p.id) && !cooled.has(p.id)) return p;
          }
          // fallback: ignore cooldown, just avoid excl
          const fb = [...ALL_PROFILES].filter(p => !excl.has(p.id));
          return fb[Math.floor(Math.random() * fb.length)] || ALL_PROFILES[0];
        }
        function pickSlots(n) {
          const now = Date.now(),
            s = Array.from({ length: SLOTS }, (_, i) => ({ idx: i, score: now - slotT[i] + Math.random() * 2000 }));
          s.sort((a, b) => b.score - a.score);
          return s.slice(0, n).map((s) => s.idx);
        }

        function initGrid() {
          const grid = $("profileGrid");
          if (!grid) return;
          // Start with a large queue pool (5× shuffled)
          queue = [
            ...shuffle(ALL_PROFILES), ...shuffle(ALL_PROFILES), ...shuffle(ALL_PROFILES),
            ...shuffle(ALL_PROFILES), ...shuffle(ALL_PROFILES),
          ];
          qCursor = 0;
          const excl = new Set();
          for (let i = 0; i < SLOTS; i++) {
            const p = nextP(excl);
            slotProfs[i] = p;
            excl.add(p.id);
            markSeen(p.id);
            slotT[i] = Date.now() - Math.random() * 30000;
          }
          grid.innerHTML = slotProfs.map((p, i) => `<div class="prf-card" data-slot="${i}" role="listitem">${buildCard(p)}</div>`).join("");
          grid.addEventListener("click", handleGridClick);
          setTimeout(startRot, 3800);
        }

        function rotateCards() {
          if (isRot || document.hidden) return;
          const grid = $("profileGrid");
          if (!grid) return;
          const cards = grid.querySelectorAll(".prf-card[data-slot]");
          if (cards.length < SLOTS) return;
          isRot = true;
          // CHANGE 2: random 1–3 cards swapped
          const count = Math.random() < 0.3 ? 1 : Math.random() < 0.5 ? 2 : 3;
          const slots = pickSlots(count);
          const excl = new Set(slotProfs.filter(Boolean).map((p) => p.id));
          const reps = slots.map(() => { const p = nextP(excl); excl.add(p.id); return p; });
          let done = 0;
          slots.forEach((si, bi) => {
            const card = grid.querySelector(`.prf-card[data-slot="${si}"]`), np = reps[bi];
            if (!card || !np) { done++; return; }
            setTimeout(() => {
              card.style.transition = `opacity ${FADE_OUT}ms ease,transform ${FADE_OUT}ms ease`;
              card.style.opacity = "0";
              card.style.transform = "translateY(-8px) scale(.97)";
              setTimeout(() => {
                card.innerHTML = buildCard(np);
                card.style.transition = "none";
                card.style.opacity = "0";
                card.style.transform = "translateY(10px) scale(.97)";
                requestAnimationFrame(() => requestAnimationFrame(() => {
                  card.style.transition = `opacity ${FADE_IN}ms ease,transform ${FADE_IN}ms cubic-bezier(.34,1.56,.64,1)`;
                  card.style.opacity = "1";
                  card.style.transform = "translateY(0) scale(1)";
                }));
                slotProfs[si] = np;
                slotT[si] = Date.now();
                markSeen(np.id); // CHANGE 2: track seen for cooldown
                done++;
                if (done === count) setTimeout(() => { isRot = false; }, FADE_IN + 70);
              }, FADE_OUT + 20);
            }, bi * STAGGER);
          });
        }

        function startRot() {
          if (rotTmr) clearInterval(rotTmr);
          rotTmr = setInterval(rotateCards, ROT_MS);
        }
        document.addEventListener("visibilitychange", () => {
          if (document.hidden) { clearInterval(rotTmr); rotTmr = null; }
          else if (!rotTmr) startRot();
        });

        /* ═══════════════════════════════════════
           BROWSE PAGE — FILTERED GRID
        ═══════════════════════════════════════ */
        let browseInited = false, browseOffset = 0, browseShuffled = [], currentFilter = "all";

        function getFilteredProfiles(filter) {
          if (filter === "all")     return shuffle([...ALL_PROFILES]);
          if (filter === "uk")      return shuffle(ALL_PROFILES.filter((p) => p.country === "uk"));
          if (filter === "usa")     return shuffle(ALL_PROFILES.filter((p) => p.country === "usa"));
          if (filter === "canada")  return shuffle(ALL_PROFILES.filter((p) => p.country === "canada"));
          if (filter === "qatar")   return shuffle(ALL_PROFILES.filter((p) => p.country === "qatar"));
          if (filter === "premium") return shuffle(ALL_PROFILES.filter((p) => p.badgeClass === "prem"));
          if (filter === "top")     return shuffle(ALL_PROFILES.filter((p) => p.badgeClass === "top"));
          return shuffle([...ALL_PROFILES]);
        }

        function applyFilter(filter) {
          currentFilter = filter;
          browseShuffled = getFilteredProfiles(filter);
          browseOffset = 0;
          const grid = $("browseGrid");
          if (!grid) return;
          grid.innerHTML = "";
          const badge = $("filterCountBadge");
          const lmw = $("loadMoreWrap");

          if (browseShuffled.length === 0) {
            grid.innerHTML = `<div class="no-results" style="grid-column:1/-1"><i class="fas fa-search"></i>No profiles match this filter.</div>`;
            // CHANGE 1: vague text only
            if (badge) badge.textContent = "No results";
            if (lmw) lmw.style.display = "none";
            return;
          }
          if (lmw) lmw.style.display = "";
          // CHANGE 1: no exact count shown
          if (badge) badge.textContent = "Showing results";
          renderBrowseBatch(grid, Math.min(12, browseShuffled.length));
        }

        function initBrowseGrid() {
          const grid = $("browseGrid");
          if (!grid) return;
          if (!browseInited) {
            browseInited = true;
            document.querySelectorAll(".filter-chip").forEach((chip) => {
              chip.addEventListener("click", () => {
                document.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("on"));
                chip.classList.add("on");
                applyFilter(chip.dataset.filter);
              });
            });
          }
          applyFilter(currentFilter);
          grid.removeEventListener("click", handleGridClick);
          grid.addEventListener("click", handleGridClick);
        }

        function renderBrowseBatch(grid, count) {
          const remaining = browseShuffled.length - browseOffset;
          const actual = Math.min(count, remaining);
          if (actual <= 0) {
            // All current slice shown — but Load More always stays enabled (see below)
            return;
          }
          for (let i = 0; i < actual; i++) {
            const p = browseShuffled[browseOffset + i];
            const card = document.createElement("div");
            card.className = "prf-card";
            card.setAttribute("role", "listitem");
            card.innerHTML = buildCard(p);
            grid.appendChild(card);
          }
          browseOffset += actual;
          // CHANGE 3: Load More is always enabled — never says "all loaded"
          const lmw = $("loadMoreWrap");
          if (lmw) {
            const btn = lmw.querySelector(".btn-load");
            if (btn) {
              btn.disabled = false;
              btn.innerHTML = '<i class="fas fa-plus-circle"></i> Load More Profiles';
              btn.style.opacity = "";
              btn.style.cursor = "";
            }
          }
        }

        // CHANGE 3: When offset reaches end, append another shuffled batch and continue
        window.loadMoreProfiles = function () {
          const grid = $("browseGrid");
          if (!grid) return;
          if (browseOffset >= browseShuffled.length) {
            browseShuffled = [...browseShuffled, ...getFilteredProfiles(currentFilter)];
          }
          renderBrowseBatch(grid, 8);
        };

        /* PROFILE MODAL */
        function openPmod(p) {
          const inner = $("pmodInner");
          const stars = "★".repeat(Math.random() < 0.28 ? 4 : 5);
          const tagsHtml = p.tags.map((t) => `<span class="pm-tag">${t}</span>`).join("");
          inner.innerHTML = `
            <button class="modal-x" id="pmodX" aria-label="Close"><i class="fas fa-times"></i></button>
            <div class="pm-head">
              <img src="${p.img}" class="pm-av" loading="lazy" alt="${p.name}" width="68" height="68"/>
              <div>
                <div class="pm-name">${p.name}, ${p.age}</div>
                <div class="pm-loc">${p.flag} ${p.loc}</div>
                <div style="display:flex;align-items:center;gap:.5rem;margin-top:.3rem;flex-wrap:wrap">
                  <div class="pm-rate-badge"><span>$${p.price}</span><small>/hr</small></div>
                  <span class="pm-online-tag">Online now</span>
                </div>
              </div>
            </div>
            <div class="pm-body">
              <p class="pm-bio">${p.full}</p>
              <div class="pm-tags">${tagsHtml}</div>
              <div class="pm-note"><i class="fas fa-info-circle"></i><span>Create your account to start chatting with ${p.name} and earning per message.</span></div>
              <div class="pm-cta">
                <a href="${REG}" target="_blank" rel="noopener" class="pm-reg"><i class="fas fa-user-plus"></i> Create Account</a>
                <button class="pm-acc" data-pid="${p.id}"><i class="fas fa-check"></i> Accept Request</button>
              </div>
            </div>`;
          inner.querySelector("#pmodX").addEventListener("click", closePmod);
          inner.querySelector(".pm-acc").addEventListener("click", function () {
            if (this.disabled) return;
            this.disabled = true;
            this.innerHTML = `<span style="display:inline-flex;align-items:center;gap:.3rem"><span style="width:9px;height:9px;border:2px solid rgba(0,0,0,.15);border-top-color:var(--green2);border-radius:50%;display:inline-block;animation:spin .5s linear infinite"></span> Accepting…</span>`;
            setTimeout(() => { closePmod(); showNotif(`Register to chat with ${p.name}!`); openOffer(); }, 850);
          });
          pmodOv.classList.add("on");
          document.body.style.overflow = "hidden";
        }

        /* DEMO CHAT */
        const DEMO = [
          { name:"James, 52 · UK 🇬🇧",  img:"https://i.pravatar.cc/88?img=12", first:"Hi 👋 I'm James from London — I'd love to learn about your culture and daily life!" },
          { name:"Emily, 48 · USA 🇺🇸",  img:"https://i.pravatar.cc/88?img=5",  first:"Hi 👋 I'm Emily from Chicago — really curious about African languages and traditions!" },
          { name:"Maria, 45 · Spain 🇪🇸", img:"https://i.pravatar.cc/88?img=47", first:"Hola 👋 I'm Maria from Barcelona — I'd love a cultural exchange chat!" },
        ];
        let demoIdx = Math.floor(Math.random() * DEMO.length), chatReplied = false, chatTmr = null;
        const demoInp = $("demoInp");
        function addMsg(side, text) {
          const now = new Date(), tm = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
          const d = document.createElement("div");
          d.className = "cm " + side;
          d.innerHTML = `<div class="cm-bub">${text}</div><div class="cm-time">${tm}</div>`;
          const msgs = $("demoMsgs");
          if (msgs) { msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; }
        }
        function addTyping() {
          const d = document.createElement("div");
          d.className = "cm them";
          d.innerHTML = '<div class="typing-ind"><span></span><span></span><span></span></div>';
          const msgs = $("demoMsgs");
          if (msgs) { msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; }
          return d;
        }
        function initDemo() {
          const p = DEMO[demoIdx % DEMO.length];
          demoIdx++;
          chatReplied = false;
          clearTimeout(chatTmr);
          const msgs = $("demoMsgs");
          if (msgs) msgs.innerHTML = "";
          if (demoInp) { demoInp.value = ""; demoInp.disabled = false; demoInp.placeholder = "Type a reply to earn…"; }
          const send = $("demoSend");
          if (send) send.disabled = false;
          const av = $("demoAv"), nm = $("demoName");
          if (av) av.src = p.img;
          if (nm) nm.innerHTML = p.name;
          const ty = addTyping();
          chatTmr = setTimeout(() => { ty.remove(); addMsg("them", p.first); demoInp && demoInp.focus(); }, 2500);
        }
        function sendDemo() {
          if (chatReplied) return;
          const txt = ((demoInp && demoInp.value) || "").trim();
          if (!txt) return;
          if (demoInp) { demoInp.value = ""; demoInp.disabled = true; demoInp.placeholder = "Please wait…"; }
          const send = $("demoSend");
          if (send) send.disabled = true;
          clearTimeout(chatTmr);
          chatReplied = true;
          addMsg("me", txt);
          const ty = addTyping();
          chatTmr = setTimeout(() => { ty.remove(); openOffer(); }, 2900);
        }
        $("demoSend") && $("demoSend").addEventListener("click", sendDemo);
        demoInp && demoInp.addEventListener("keypress", (e) => { if (e.key === "Enter") sendDemo(); });

        /* FAQ */
        const FAQS = [
          { q:"How do I get paid?",          a:"Once your balance reaches the $5 minimum, withdraw via M-Pesa, PayPal, MTN Money, or Airtel Money. Payments process within 2 hours with zero withdrawal fees." },
          { q:"What are the 5 ways to earn?", a:"Per hour (auto-tracked), per message (every reply), per completed session (flat fee), voluntary tips from clients, and daily rewards for consistent activity." },
          { q:"How much can I earn per month?", a:"Results vary by activity. Members doing 3–5 chats daily typically earn $50–$200/month. Highly active members can earn $200–$350/month. Figures depend entirely on your effort." },
          { q:"What do I chat about?",        a:"Culture, travel, daily life, companionship, language lessons, and advice — with clients from UK, USA, Canada, Qatar and more. All chats are friendly, text-only, and appropriate." },
          { q:"Do I need to speak English?",  a:"No! You can chat entirely in Kiswahili. The platform auto-translates your messages for international clients on their side — no language barrier." },
          { q:"Why is there a registration fee?", a:"The small one-time fee covers verification, platform setup, and access. Most active members recover it within their first week of chatting." },
          { q:"Is StarHela legitimate?",      a:"Yes. StarHela is registered in Kenya and operates across Africa. We've paid out over $890K to verified earners and publish our earnings disclaimer openly." },
        ];
        const fw = $("faqWrap");
        if (fw) {
          const fr = document.createDocumentFragment();
          FAQS.forEach((f) => {
            const d = document.createElement("div");
            d.className = "faq-item";
            d.innerHTML = `<div class="faq-q">${f.q} <i class="fas fa-chevron-down"></i></div><div class="faq-a">${f.a}</div>`;
            const qd = d.querySelector(".faq-q"), ad = d.querySelector(".faq-a");
            qd.addEventListener("click", () => {
              const was = ad.classList.contains("on");
              document.querySelectorAll(".faq-a").forEach((x) => x.classList.remove("on"));
              document.querySelectorAll(".faq-q").forEach((x) => x.classList.remove("on"));
              if (!was) { ad.classList.add("on"); qd.classList.add("on"); }
            });
            fr.appendChild(d);
          });
          fw.appendChild(fr);
        }

        /* LIVE COUNTERS */
        let lc = 2847, rc = 1312;
        setInterval(() => {
          if (!document.hidden) {
            lc = Math.max(600, lc + Math.floor(Math.random() * 8) - 3);
            const lce = $("liveCount"); if (lce) lce.textContent = fmt(lc);
            rc = Math.max(200, Math.min(1500, rc + Math.floor(Math.random() * 7) - 3));
            const rce = $("activeReqs"); if (rce) rce.textContent = fmt(rc);
            const bpl = $("bpLiveCount"); if (bpl) bpl.textContent = fmt(rc);
          }
        }, 2200);

        /* NOTIFICATION */
        let nTmr = null;
        function showNotif(msg) {
          const n = $("notif"), t = $("notifTxt");
          if (!n || !t) return;
          t.textContent = msg;
          n.classList.add("show");
          clearTimeout(nTmr);
          nTmr = setTimeout(() => n.classList.remove("show"), 3500);
        }

        /* SOCIAL PROOF */
        const spNames = ["Sarah","John","Maria","David","Linda","Grace","Amina","Paul","Kevin","Aisha"];
        const spCities = ["Nairobi","Lagos","Dar es Salaam","Accra","Kampala","Mombasa","Enugu","Johannesburg"];
        const spActs = [
          { i:"fa-user-plus",   t:"just activated their account" },
          { i:"fa-comment",     t:"started chatting with a client" },
          { i:"fa-dollar-sign", t:"just earned from a chat" },
          { i:"fa-star",        t:"received a 5-star rating" },
          { i:"fa-gift",        t:"received a tip from a client" },
        ];
        let spBusy = false, lastSPMsg = "";
        function showSP() {
          const spW = $("spWrap");
          if (!spW || spBusy || document.hidden) return;
          spBusy = true;
          let msg;
          do {
            const n = spNames[Math.floor(Math.random() * spNames.length)],
              c = spCities[Math.floor(Math.random() * spCities.length)],
              a = spActs[Math.floor(Math.random() * spActs.length)];
            msg = `<i class="fas ${a.i}"></i><span><strong>${n} from ${c}</strong> ${a.t}</span>`;
          } while (msg === lastSPMsg);
          lastSPMsg = msg;
          const el = document.createElement("div");
          el.className = "sp-item";
          el.innerHTML = msg;
          spW.appendChild(el);
          setTimeout(() => {
            el.style.opacity = "0";
            el.style.transition = "opacity .4s ease";
            setTimeout(() => { el.remove(); spBusy = false; }, 420);
          }, Math.floor(Math.random() * 3000) + 6000);
        }
        function loopSP() { showSP(); setTimeout(loopSP, Math.floor(Math.random() * 6000) + 10000); }
        setTimeout(loopSP, 9000);

        /* COOKIE */
        const hasCk = () => { try { return !!localStorage.getItem("SH_ck"); } catch { return true; } };
        const setCk = (v) => { try { localStorage.setItem("SH_ck", v); } catch {} };
        if (!hasCk()) setTimeout(() => $("cookieBar") && $("cookieBar").classList.add("show"), 3800);
        $("cookieOk") && $("cookieOk").addEventListener("click", () => { setCk("1"); $("cookieBar").classList.remove("show"); });
        $("cookieNo") && $("cookieNo").addEventListener("click", () => { setCk("0"); $("cookieBar").classList.remove("show"); });

        /* INTERSECTION OBSERVER */
        const io = new IntersectionObserver(
          (entries) => { entries.forEach((e) => { if (e.isIntersecting && e.target.classList.contains("fu")) e.target.classList.add("vis"); }); },
          { threshold: 0.07, rootMargin: "0px 0px -36px 0px" }
        );
        document.querySelectorAll(".fu").forEach((el) => io.observe(el));

        /* INIT */
        initGrid();
        initDemo();
      })();