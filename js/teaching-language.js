 // ============================================================
    // DATA
    // ============================================================
    const LANGUAGES = [
      { name: "Swahili", flag: "🇰🇪", learners: "640K" },
      { name: "Yoruba", flag: "🇳🇬", learners: "510K" },
      { name: "Hausa", flag: "🇳🇬", learners: "340K" },
      { name: "Amharic", flag: "🇪🇹", learners: "260K" },
      { name: "Zulu", flag: "🇿🇦", learners: "210K" },
      { name: "Igbo", flag: "🇳🇬", learners: "290K" },
      { name: "Twi", flag: "🇬🇭", learners: "170K" },
      { name: "Wolof", flag: "🇸🇳", learners: "90K" },
      { name: "Xhosa", flag: "🇿🇦", learners: "120K" },
      { name: "Somali", flag: "🇸🇴", learners: "85K" },
      { name: "Shona", flag: "🇿🇼", learners: "70K" },
      { name: "Afrikaans", flag: "🇿🇦", learners: "95K" },
      { name: "Arabic", flag: "🇪🇬", learners: "430K" },
      { name: "French", flag: "🇸🇳", learners: "380K" },
      { name: "Portuguese", flag: "🇦🇴", learners: "210K" },
      { name: "Spanish", flag: "🇪🇸", learners: "1.8M" },
      { name: "Mandarin", flag: "🇨🇳", learners: "760K" },
      { name: "Korean", flag: "🇰🇷", learners: "640K" },
    ];

    const COUNTRIES = [
      { name: "Nigeria", region: "West Africa", img: "https://images.unsplash.com/photo-1585540083814-ea6ee8af9e4f?w=500&q=80" },
      { name: "Kenya", region: "East Africa", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&q=80" },
      { name: "Ethiopia", region: "East Africa", img: "https://images.unsplash.com/photo-1730627667879-447d38cb03b3?w=500&q=80" },
      { name: "South Africa", region: "Southern Africa", img: "https://images.unsplash.com/photo-1552937075-967cf58b74a4?w=500&q=80" },
      { name: "Ghana", region: "West Africa", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80" },
      { name: "Senegal", region: "West Africa", img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=500&q=80" },
      { name: "Morocco", region: "North Africa", img: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=500&q=80" },
      { name: "Egypt", region: "North Africa", img: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=500&q=80" },
      { name: "Tanzania", region: "East Africa", img: "https://images.unsplash.com/photo-1589177900326-900782f88a55?w=500&q=80" },
      { name: "Rwanda", region: "East Africa", img: "https://plus.unsplash.com/premium_photo-1664302882084-f5df9526963a?w=500&q=80" },
      { name: "Japan", region: "East Asia", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80" },
      { name: "Brazil", region: "South America", img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500&q=80" },
    ];

    const CULTURE_EXPERIENCES = [
      { title: "Ethiopian Coffee Ceremony", country: "Ethiopia", flag: "🇪🇹", img: "https://images.unsplash.com/photo-1709719263827-2d3c00d8d19e?w=600&q=80", desc: "Learn the ritual, etiquette and history behind Ethiopia's centuries-old coffee ceremony from an Addis Ababa host." },
      { title: "Yoruba Proverbs & Storytelling", country: "Nigeria", flag: "🇳🇬", img: "https://plus.unsplash.com/premium_photo-1721736024252-1a308277e8e2?w=600&q=80", desc: "Immerse in West African oral tradition through proverbs, folk tales, and drumming with a griot-trained storyteller." },
      { title: "Kente Weaving & Adinkra Symbols", country: "Ghana", flag: "🇬🇭", img: "https://images.unsplash.com/photo-1723922967943-9d9fe2da5afd?w=600&q=80", desc: "Explore the meaning behind Ghana's Kente patterns and Adinkra symbols with a weaver from Kumasi." },
      { title: "Zulu Beadwork & Ubuntu Philosophy", country: "South Africa", flag: "🇿🇦", img: "https://plus.unsplash.com/premium_photo-1754254834933-2f9b6ffba3e5?w=600&q=80", desc: "Learn traditional Zulu beadwork alongside the community philosophy of Ubuntu — 'I am because we are.'" },
      { title: "Wolof Griot Music & Storytelling", country: "Senegal", flag: "🇸🇳", img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80", desc: "Discover the kora and the griot tradition of oral history-keeping with a Dakar-based musician." },
      { title: "Maasai Traditions & Swahili Folklore", country: "Kenya", flag: "🇰🇪", img: "https://images.unsplash.com/photo-1505147634308-9b83c4cb46b4?w=600&q=80", desc: "Explore East African heritage through Maasai traditions, Swahili storytelling, and everyday culture." },
      { title: "Moroccan Cuisine & Calligraphy", country: "Morocco", flag: "🇲🇦", img: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&q=80", desc: "Cook traditional Moroccan dishes while learning the art of Arabic calligraphy and local customs." },
      { title: "Egyptian History & Modern Arabic", country: "Egypt", flag: "🇪🇬", img: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=600&q=80", desc: "Walk through ancient and modern Egypt while picking up everyday Egyptian Arabic dialect." },
      { title: "Zanzibar Spice & Swahili Coast Life", country: "Tanzania", flag: "🇹🇿", img: "https://images.unsplash.com/photo-1610441553250-2c124a2de988?w=600&q=80", desc: "Tour the spices, cuisine and Swahili coastal traditions of Zanzibar with a local guide." },
      { title: "Intore Dance & Kinyarwanda Basics", country: "Rwanda", flag: "🇷🇼", img: "https://images.unsplash.com/photo-1678225894029-ac0fe99cc047?w=600&q=80", desc: "Learn foundational Kinyarwanda phrases alongside Rwanda's celebrated Intore dance tradition." },
      { title: "Handmade Pasta & Roman History", country: "Italy", flag: "🇮🇹", img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80", desc: "Cook authentic pasta while hearing stories of ancient Rome from a guide who lives the history daily." },
      { title: "Samba & Carnival Spirit", country: "Brazil", flag: "🇧🇷", img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80", desc: "Learn the basics of samba and the cultural significance of Carnival with a Rio-based dance instructor." },
    ];

    const LESSONS = [
      { cat: "Culture", title: "Ethiopian coffee ceremony", meta: "60 min · with Selamawit, Addis Ababa", img: "https://images.unsplash.com/photo-1768319303664-147353b831f6?w=500&q=80" },
      { cat: "Cooking", title: "Jollof rice & West African flavors", meta: "75 min · with Adaeze, Lagos", img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=500&q=80" },
      { cat: "Music", title: "Kora & griot storytelling", meta: "60 min · with Moussa, Dakar", img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=500&q=80" },
      { cat: "Tradition", title: "Kente weaving basics", meta: "70 min · with Kwabena, Kumasi", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80" },
    ];

    const TESTIMONIALS = [
      { name: "Priya S.", role: "Learning Swahili · 8 months", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", quote: "My teacher didn't just teach me grammar — she explained why her grandmother's proverbs still matter today." },
      { name: "Daniel K.", role: "Learning Yoruba · 3 months", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", quote: "I booked one cooking lesson out of curiosity and ended up with a weekly language tutor and a friend." },
      { name: "Marta L.", role: "Learning Amharic · 1 year", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80", quote: "It feels less like an app and more like being hosted by someone who's genuinely proud to share their home." },
    ];

    const TICKER_ITEMS = [
      "Emeka is teaching Yoruba proverbs to Sara in Lisbon",
      "Wanjiru is hosting a Swahili class for 4 students in Toronto",
      "Moussa is giving a kora lesson to Tom in Berlin",
      "Selamawit just finished a coffee ceremony session with Priya in Mumbai",
      "Youssef is teaching Arabic calligraphy to Elena in Madrid",
      "Kwabena is walking Daniel through Kente weaving live from Kumasi",
      "Fatima is teaching Moroccan Darija to Chris in Austin",
      "Thandiwe just booked her 40th Zulu conversation lesson with Grace",
      "Amara is teaching Igbo greetings to Noah in Sydney",
      "Aisha is hosting a Hausa class for 3 students in Dubai",
      "Kojo is teaching Twi to Sofia in Amsterdam",
      "Nadia is walking students through Egyptian hieroglyphics from Cairo",
    ];

    // ============================================================
    // TEACHERS DATA
    // ============================================================
    function makeTeachers() {
      const base = [
        { name: "Emeka Obi", country: "Nigeria", flag: "🇳🇬", native: "Yoruba", other: ["English", "Igbo"], price: 18, rating: 5.0, reviews: 196, students: 410, culture: ["Proverbs", "Drumming", "Storytelling"], bio: "Griot-trained storyteller sharing Yoruba language and oral tradition.", type: "Language + Culture", verified: true, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80", cover: "https://plus.unsplash.com/premium_photo-1669750817438-3f7f3112de8d?w=1200&q=80" },
        { name: "Wanjiru Kamau", country: "Kenya", flag: "🇰🇪", native: "Swahili", other: ["English"], price: 16, rating: 4.9, reviews: 173, students: 355, culture: ["Storytelling", "Maasai traditions"], bio: "Nairobi-based teacher sharing Swahili and East African traditions.", type: "Language + Culture", verified: true, img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80", cover: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80" },
        { name: "Selamawit Bekele", country: "Ethiopia", flag: "🇪🇹", native: "Amharic", other: ["English", "Tigrinya"], price: 17, rating: 5.0, reviews: 88, students: 150, culture: ["Coffee ceremony", "Ge'ez script"], bio: "Addis Ababa host teaching Amharic through the ritual of the Ethiopian coffee ceremony.", type: "Language + Culture", verified: true, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80", cover: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&q=80" },
        { name: "Thandiwe Nkosi", country: "South Africa", flag: "🇿🇦", native: "Zulu", other: ["English", "Xhosa"], price: 19, rating: 4.9, reviews: 214, students: 390, culture: ["Beadwork", "Ubuntu philosophy"], bio: "Durban-based teacher blending Zulu language lessons with Ubuntu philosophy.", type: "Language + Culture", verified: true, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80", cover: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80" },
        { name: "Kwabena Asante", country: "Ghana", flag: "🇬🇭", native: "Twi", other: ["English"], price: 15, rating: 4.8, reviews: 97, students: 180, culture: ["Kente weaving", "Adinkra symbols"], bio: "Kumasi-based weaver teaching Twi alongside the meaning behind Kente patterns.", type: "Language + Culture", verified: true, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", cover: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80" },
        { name: "Moussa Diop", country: "Senegal", flag: "🇸🇳", native: "Wolof", other: ["French", "English"], price: 18, rating: 4.9, reviews: 76, students: 140, culture: ["Kora music", "Griot tradition"], bio: "Dakar-based kora musician teaching Wolof through the griot tradition.", type: "Culture immersion", verified: true, img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&q=80", cover: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80" },
        { name: "Amara Adeyemi", country: "Nigeria", flag: "🇳🇬", native: "Igbo", other: ["English", "Yoruba"], price: 16, rating: 4.9, reviews: 132, students: 260, culture: ["Festivals", "Masquerade traditions"], bio: "Enugu-based teacher sharing Igbo language, festivals and masquerade traditions.", type: "Language + Culture", verified: true, img: "https://images.unsplash.com/photo-1616805765352-beedbad46b2a?w=400&q=80", cover: "https://plus.unsplash.com/premium_photo-1666278379770-440439b08656?w=1200&q=80" },
        { name: "Aisha Suleiman", country: "Nigeria", flag: "🇳🇬", native: "Hausa", other: ["English", "Arabic"], price: 15, rating: 4.8, reviews: 64, students: 110, culture: ["Textiles", "Northern Nigerian cuisine"], bio: "Kano-based teacher covering Hausa conversation, Northern Nigerian cuisine, and traditional textiles.", type: "Language + Culture", verified: false, img: "https://plus.unsplash.com/premium_photo-1687989651153-c23d9f2c9d5d?w=400&q=80", cover: "https://plus.unsplash.com/premium_photo-1675432656807-216d786dd468?w=1200&q=80" },
        { name: "Youssef El-Amin", country: "Egypt", flag: "🇪🇬", native: "Arabic", other: ["English", "French"], price: 17, rating: 4.7, reviews: 84, students: 140, culture: ["Ancient history", "Egyptian Arabic"], bio: "Cairo-based Egyptology guide teaching Egyptian Arabic dialect alongside ancient and modern history.", type: "Culture immersion", verified: true, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&sat=-20", cover: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1200&q=80" },
        { name: "Fatima Zahra", country: "Morocco", flag: "🇲🇦", native: "Arabic", other: ["French", "English"], price: 19, rating: 4.9, reviews: 118, students: 210, culture: ["Calligraphy", "Moroccan cuisine"], bio: "Teaches Modern Standard Arabic and Darija with a strong focus on calligraphy and everyday culture.", type: "Language + Culture", verified: true, img: "https://images.unsplash.com/photo-1613115015227-462623fb2491?w=400&q=80", cover: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1200&q=80" },
        { name: "Zainab Hassan", country: "Tanzania", flag: "🇹🇿", native: "Swahili", other: ["English"], price: 14, rating: 4.9, reviews: 102, students: 200, culture: ["Zanzibar spice trade", "Coastal cuisine"], bio: "Zanzibar-based teacher sharing Swahili and the coastal spice-trade traditions.", type: "Language + Culture", verified: true, img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80", cover: "https://images.unsplash.com/photo-1486548730767-5c679e8eda6b?w=1200&q=80" },
        { name: "Jean-Baptiste Uwase", country: "Rwanda", flag: "🇷🇼", native: "Kinyarwanda", other: ["French", "English"], price: 15, rating: 4.8, reviews: 58, students: 95, culture: ["Intore dance", "Basketry"], bio: "Kigali-based teacher pairing Kinyarwanda lessons with Rwanda's Intore dance and basket-weaving traditions.", type: "Language + Culture", verified: false, img: "https://images.unsplash.com/photo-1614890094520-7b8dd0ec56d2?w=400&q=80&sat=-10", cover: "https://images.unsplash.com/photo-1602237514002-c2d8ae2da393?w=1200&q=80" },
        { name: "Nomvula Dlamini", country: "South Africa", flag: "🇿🇦", native: "Xhosa", other: ["English", "Zulu"], price: 18, rating: 4.9, reviews: 141, students: 270, culture: ["Click consonants", "Traditional song"], bio: "Cape Town-based teacher known for making Xhosa's click consonants approachable through song and story.", type: "Language + Culture", verified: true, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80&sat=-15", cover: "https://images.unsplash.com/photo-1585302397841-b42e837d0d81?w=1200&q=80" },
        { name: "Tendai Moyo", country: "Zimbabwe", flag: "🇿🇼", native: "Shona", other: ["English", "Ndebele"], price: 14, rating: 4.7, reviews: 49, students: 88, culture: ["Mbira music", "Stone sculpture"], bio: "Harare-based mbira musician teaching Shona through music, proverbs and traditional stone sculpture.", type: "Culture immersion", verified: false, img: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=400&q=80&sat=-10", cover: "https://plus.unsplash.com/premium_photo-1718570256515-8ff542703621?w=1200&q=80" },
        { name: "Abdirahman Warsame", country: "Somalia", flag: "🇸🇴", native: "Somali", other: ["English", "Arabic"], price: 16, rating: 4.8, reviews: 37, students: 70, culture: ["Oral poetry", "Nomadic traditions"], bio: "Mogadishu-born teacher sharing Somali oral poetry and the traditions of pastoralist life.", type: "Language + Culture", verified: false, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&sat=-30", cover: "https://images.unsplash.com/photo-1653286288543-4de3ba66ee08?w=1200&q=80" },
        { name: "Lerato Mokoena", country: "South Africa", flag: "🇿🇦", native: "Afrikaans", other: ["English", "Zulu"], price: 17, rating: 4.8, reviews: 91, students: 160, culture: ["Braai culture", "Cape Malay cuisine"], bio: "Johannesburg-based teacher covering Afrikaans conversation and South Africa's braai and Cape Malay food traditions.", type: "Language + Culture", verified: true, img: "https://images.unsplash.com/photo-1598283122714-e7995764e81a?w=400&q=80&sat=-10", cover: "https://images.unsplash.com/photo-1631691971525-3f4b54255fea?w=1200&q=80" },
        { name: "Chidinma Eze", country: "Nigeria", flag: "🇳🇬", native: "Igbo", other: ["English"], price: 14, rating: 4.9, reviews: 120, students: 230, culture: ["Cuisine", "New Yam Festival"], bio: "Port Harcourt-based cook and teacher sharing Igbo through cuisine and the New Yam Festival traditions.", type: "Cooking + Language", verified: true, img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80", cover: "https://images.unsplash.com/photo-1582711012124-a56cf82307a0?w=1200&q=80" },
        { name: "Kofi Mensah", country: "Ghana", flag: "🇬🇭", native: "Twi", other: ["English", "French"], price: 16, rating: 4.9, reviews: 108, students: 200, culture: ["Highlife music", "Chieftaincy customs"], bio: "Accra-based musician teaching Twi through highlife music and Ghanaian chieftaincy customs.", type: "Language + Culture", verified: true, img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&q=80", cover: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80" },
        { name: "Aiko Tanaka", country: "Japan", flag: "🇯🇵", native: "Japanese", other: ["English", "Basic Korean"], price: 28, rating: 5.0, reviews: 214, students: 410, culture: ["Tea ceremony", "Etiquette", "Kyoto history"], bio: "Kyoto-raised tea ceremony practitioner teaching conversational Japanese with real cultural context.", type: "Language + Culture", verified: true, img: "https://images.unsplash.com/photo-1612892796117-dcc2f7aeb3d0?w=400&q=80", cover: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80" },
        { name: "Marco Bellini", country: "Italy", flag: "🇮🇹", native: "Italian", other: ["English", "Spanish"], price: 22, rating: 4.9, reviews: 188, students: 355, culture: ["Roman history", "Pasta making", "Opera"], bio: "Former tour guide in Rome, now teaching Italian through the city's food, history and a little bit of opera.", type: "Culture immersion", verified: true, img: "https://images.unsplash.com/photo-1577870083487-96990d067681?w=400&q=80", cover: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=1200&q=80" },
        { name: "Camille Laurent", country: "Senegal", flag: "🇸🇳", native: "French", other: ["Wolof", "English"], price: 20, rating: 4.8, reviews: 145, students: 260, culture: ["West African French", "Teranga hospitality"], bio: "Dakar-based teacher pairing French fluency with Senegal's Teranga culture of hospitality.", type: "1-on-1 lesson", verified: true, img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80", cover: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80" },
        { name: "Ana Souza", country: "Angola", flag: "🇦🇴", native: "Portuguese", other: ["English", "French"], price: 16, rating: 4.8, reviews: 98, students: 190, culture: ["Semba music", "Kizomba dance"], bio: "Luanda-based teacher blending Angolan Portuguese lessons with semba and kizomba dance traditions.", type: "Language + Culture", verified: false, img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80", cover: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1200&q=80" },
        { name: "Min-jun Park", country: "South Korea", flag: "🇰🇷", native: "Korean", other: ["English", "Japanese"], price: 24, rating: 5.0, reviews: 167, students: 290, culture: ["K-drama slang", "Street food"], bio: "Seoul-based conversation coach who teaches practical, modern Korean through K-drama and street food culture.", type: "Conversation practice", verified: true, img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&q=80", cover: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200&q=80" },
        { name: "Priya Nair", country: "India", flag: "🇮🇳", native: "Hindi", other: ["English", "Malayalam"], price: 15, rating: 4.8, reviews: 302, students: 610, culture: ["Classical dance", "Festivals"], bio: "Kathakali-trained performer teaching Hindi through festivals, film, and classical storytelling.", type: "Language + Culture", verified: true, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80", cover: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80" },
      ];
      return base.map((t, i) => ({ ...t, id: i + 1, online: i % 3 === 0 }));
    }
    const TEACHERS = makeTeachers();

    // ============================================================
    // HELPERS
    // ============================================================
    function verifiedBadgeHTML() {
      return `<span class="badge-verified"><svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#1d4ed8" stroke-width="2.6" stroke-linecap="round"/><circle cx="12" cy="12" r="9" stroke="#1d4ed8" stroke-width="1.6"/></svg>Verified</span>`;
    }

    function starString(rating) {
      const full = Math.round(rating);
      return "★".repeat(full) + "☆".repeat(5 - full);
    }

    function redirectToRegister() {
      window.location.href = "https://starhela.com/c/U3lkbmV5";
    }

    // ============================================================
    // TEACHER CARD
    // ============================================================
    function teacherCardHTML(t) {
      return `
        <div class="card t-card" onclick="location.hash='#/teacher/${t.id}'">
          <div class="t-photo-wrap">
            <img src="${t.img}" alt="${t.name}" loading="lazy">
            <div class="t-flag-badge">${t.flag} ${t.country}${t.verified ? verifiedBadgeHTML() : ""}</div>
            <button class="t-fav" aria-label="Save teacher" onclick="event.stopPropagation(); redirectToRegister();">♡</button>
            ${t.online ? '<div class="t-online"><span class="dot"></span>Online now</div>' : ""}
          </div>
          <div class="t-body">
            <div class="t-toprow">
              <div><div class="t-name">${t.name}</div><div class="t-native">Native ${t.native}</div></div>
              <div class="t-rating">★ ${t.rating.toFixed(1)} <span>(${t.reviews})</span></div>
            </div>
            <div class="t-langs">
              <span class="pill pill-blue">${t.native}</span>
              ${t.other.slice(0, 2).map(l => `<span class="pill">${l}</span>`).join("")}
            </div>
            <p class="t-bio">${t.bio}</p>
            <div class="t-bottom">
              <div class="t-price"><b>$${t.price}</b><span>/ hour</span></div>
              <span class="pill pill-green">${t.students}+ students</span>
            </div>
            <button class="btn btn-primary btn-block" style="margin-top:14px;" onclick="event.stopPropagation(); redirectToRegister();">Book lesson</button>
          </div>
        </div>`;
    }

    // ============================================================
    // ROUTER
    // ============================================================
    const pages = ["home", "browse", "cultures", "profile", "apply"];

    function router() {
      const hash = location.hash || "#/";
      let page = "home";
      let param = null;
      if (hash.startsWith("#/browse")) page = "browse";
      else if (hash.startsWith("#/cultures")) page = "cultures";
      else if (hash.startsWith("#/teacher/")) { page = "profile";
        param = hash.split("/")[2]; } else if (hash.startsWith("#/apply")) page = "apply";
      else page = "home";

      pages.forEach(p => document.getElementById("page-" + p).classList.toggle("active", p === page));
      document.querySelectorAll(".nav-links a, .nav-mobile a").forEach(a => {
        a.classList.toggle("active", a.dataset.nav === page);
      });
      closeMobileNav();
      window.scrollTo({ top: 0, behavior: "instant" });

      if (page === "profile" && param) renderProfile(parseInt(param));
      if (page === "browse") renderBrowse();
      if (page === "cultures") renderCultures();
      if (page === "apply") renderWizard();
      observeReveals();
    }

    window.addEventListener("hashchange", router);

    // ============================================================
    // MOBILE NAV
    // ============================================================
    const burgerBtn = document.getElementById("burgerBtn");
    const navMobileEl = document.getElementById("navMobile");

    burgerBtn.addEventListener("click", () => {
      const open = navMobileEl.classList.toggle("open");
      burgerBtn.setAttribute("aria-expanded", open);
    });

    function closeMobileNav() {
      navMobileEl.classList.remove("open");
      burgerBtn.setAttribute("aria-expanded", "false");
    }
    navMobileEl.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMobileNav));

    // ============================================================
    // REVEAL OBSERVER
    // ============================================================
    let revealObserver;

    function observeReveals() {
      document.querySelectorAll(".reveal").forEach(el => el.classList.remove("in"));
      if (revealObserver) revealObserver.disconnect();
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealObserver.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });
      document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
    }
    // ======== FOOTER ========
    const FOOTER_HTML = `
    <footer class="footer">
      <div class="container">
        <div class="ft-grid">
          <!-- Brand + Contact -->
          <div>
            <div class="ft-logo">
              <img
                src="https://res.cloudinary.com/duccwuddw/image/upload/q_auto/f_auto/v1779444890/starhela-official-logo_q4ip2g.png"
                alt="Starhela Logo"
                onerror="this.style.display = 'none'" />
              <div class="ft-logo-name">STARHELA</div>
            </div>

            <p class="ft-desc">
              Africa's #1 trusted online earning platform. Thousands earning
              daily through Teaching African languages and their cultures.
            </p>

            <div class="ft-contact-list">
              <div class="ft-contact">
                ✉️
                <a href="mailto:starhelaofficials@gmail.com">
                  starhelaofficials@gmail.com
                </a>
              </div>

              <div class="ft-contact">
                💬
                <a
                  href="https://wa.me/254729743223"
                  target="_blank"
                  rel="noopener noreferrer">
                  WhatsApp Support
                </a>
              </div>

              <div class="ft-contact">
                📣
                <a
                  href="https://whatsapp.com/channel/0029VbD0NZf0VycJyk85mq16"
                  target="_blank"
                  rel="noopener noreferrer">
                  Join Our Channel
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="ft-bottom">
          <div class="ft-copy">
            © 2025 Starhela Agencies · All rights reserved ·
            <a
              href="https://starhela.com/register.php?ref=sydney"
              target="_blank"
              rel="noopener noreferrer">
              Register
            </a>
            ·
            <a
              href="https://starhela.com/login.php"
              target="_blank"
              rel="noopener noreferrer">
              Login
            </a>
          </div>
          <div class="ft-social">
            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>`;
    document.getElementById("footerHome").innerHTML = FOOTER_HTML;
    document.getElementById("footerBrowse").innerHTML = FOOTER_HTML;
    document.getElementById("footerCultures").innerHTML = FOOTER_HTML;
    document.getElementById("footerProfile").innerHTML = FOOTER_HTML;


    // ============================================================
    // HOME RENDER
    // ============================================================
    document.getElementById("langGrid").innerHTML = LANGUAGES.map(l => `
      <div class="lang-chip" onclick="redirectToRegister()"><div class="flag">${l.flag}</div><b>${l.name}</b><span>${l.learners} learners</span></div>
    `).join("");

    let homeTeacherOffset = 0;

    function renderHomeTeacherGrid() {
      const grid = document.getElementById("homeTeacherGrid");
      const slice = [];
      for (let i = 0; i < 4; i++) slice.push(TEACHERS[(homeTeacherOffset + i) % TEACHERS.length]);
      grid.classList.add("fading");
      setTimeout(() => {
        grid.innerHTML = slice.map(teacherCardHTML).join("");
        grid.classList.remove("fading");
      }, 220);
    }
    renderHomeTeacherGrid();
    setInterval(() => {
      homeTeacherOffset = (homeTeacherOffset + 4) % TEACHERS.length;
      renderHomeTeacherGrid();
    }, 7000);

    function updateLiveCounter() {
      const base = 1180;
      const wiggle = Math.floor(Math.sin(Date.now() / 9000) * 40) + Math.floor(Math.random() * 15);
      document.getElementById("liveOnlineCount").textContent = (base + wiggle).toLocaleString();
    }
    updateLiveCounter();
    setInterval(updateLiveCounter, 4000);

    document.getElementById("countryGrid").innerHTML = COUNTRIES.map(c => `
      <div class="country-card" onclick="redirectToRegister()"><img src="${c.img}" alt="${c.name}" loading="lazy"><div class="country-label"><b>${c.name}</b><span>${c.region}</span></div></div>
    `).join("");

    document.getElementById("lessonGrid").innerHTML = LESSONS.map(l => `
      <div class="card lesson-card" onclick="redirectToRegister()"><div class="lesson-photo"><img src="${l.img}" alt="${l.title}" loading="lazy"></div><div class="lesson-body"><div class="lesson-cat">${l.cat}</div><div class="lesson-title">${l.title}</div><div class="lesson-meta">${l.meta}</div></div></div>
    `).join("");

    document.getElementById("testiRow").innerHTML = TESTIMONIALS.map(t => `
      <div class="card testi-card reveal"><span class="stars">★★★★★</span><p class="testi-quote">"${t.quote}"</p><div class="testi-person"><img src="${t.img}" alt="${t.name}" loading="lazy"><div><b>${t.name}</b><span>${t.role}</span></div></div></div>
    `).join("");

    document.getElementById("tickerTrack").innerHTML = TICKER_ITEMS.map(s => `<span><b>●</b> ${s}</span>`).join("") + TICKER_ITEMS.map(s => `<span><b>●</b> ${s}</span>`).join("");



    // ============================================================
    // BROWSE
    // ============================================================
    let browseFilter = "all";
    const AFRICAN_LANGS = ["Swahili", "Yoruba", "Hausa", "Amharic", "Zulu", "Igbo", "Twi", "Wolof", "Xhosa", "Somali", "Shona", "Afrikaans", "Kinyarwanda"];

    function setFilter(val, el) {
      browseFilter = val;
      document.querySelectorAll(".chip-opt").forEach(c => c.classList.remove("selected"));
      el.classList.add("selected");
      renderBrowse();
    }

    function renderBrowse() {
      const searchVal = document.getElementById("browseSearchInput").value.toLowerCase();
      const maxPrice = parseInt(document.getElementById("priceRange").value);
      const sortVal = document.getElementById("sortSelect").value;

      let list = TEACHERS.filter(t => {
        if (searchVal && !t.name.toLowerCase().includes(searchVal) && !t.native.toLowerCase().includes(searchVal)) return false;
        if (t.price > maxPrice) return false;
        if (browseFilter === "african") return AFRICAN_LANGS.includes(t.native);
        if (browseFilter === "language") return t.type.includes("Language");
        if (browseFilter === "culture") return t.type.includes("Culture");
        if (browseFilter === "cooking") return t.culture.some(c => c.toLowerCase().includes("cook") || c.toLowerCase().includes("cuisine"));
        if (browseFilter === "verified") return t.verified;
        return true;
      });

      if (sortVal === "rating") list.sort((a, b) => b.rating - a.rating);
      else if (sortVal === "price-low") list.sort((a, b) => a.price - b.price);
      else if (sortVal === "price-high") list.sort((a, b) => b.price - a.price);
      else if (sortVal === "students") list.sort((a, b) => b.students - a.students);

      document.getElementById("browseGrid").style.display = list.length ? "grid" : "none";
      document.getElementById("browseEmpty").style.display = list.length ? "none" : "block";
      document.getElementById("browseGrid").innerHTML = list.map(teacherCardHTML).join("");
    }

    // ============================================================
    // CULTURES
    // ============================================================
    function renderCultures() {
      const searchVal = document.getElementById("cultureSearchInput")?.value.toLowerCase() || "";
      let list = CULTURE_EXPERIENCES.filter(c => {
        if (searchVal && !c.title.toLowerCase().includes(searchVal) && !c.country.toLowerCase().includes(searchVal)) return false;
        return true;
      });

      document.getElementById("cultureExploreGrid").innerHTML = list.map(c => `
        <div class="card" style="overflow:hidden;cursor:pointer;" onclick="redirectToRegister()">
          <div style="height:180px;overflow:hidden;"><img src="${c.img}" alt="${c.title}" style="width:100%;height:100%;object-fit:cover;transition:0.4s;" loading="lazy"></div>
          <div style="padding:20px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;"><span style="font-size:22px;">${c.flag}</span><span style="font-size:13px;font-weight:600;color:#64748b;">${c.country}</span></div>
            <h3 style="font-size:18px;margin-bottom:8px;">${c.title}</h3>
            <p style="font-size:14px;color:#475569;line-height:1.7;">${c.desc}</p>
            <div style="margin-top:16px;"><span class="btn btn-primary btn-sm" onclick="event.stopPropagation(); redirectToRegister();">Book experience</span></div>
          </div>
        </div>
      `).join("");
    }
    setTimeout(renderCultures, 100);

    // ============================================================
    // PROFILE
    // ============================================================
    const SAMPLE_REVIEWS = [
      { name: "Grace T.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80", date: "2 weeks ago", text: "Incredibly patient and made me feel comfortable speaking from lesson one." },
      { name: "Tom R.", img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&q=80", date: "1 month ago", text: "The cultural context alongside the language lessons is what sets this apart." },
      { name: "Elena V.", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80", date: "2 months ago", text: "Booked one trial lesson and now I'm on lesson 20. Highly recommend!" },
    ];

    function renderProfile(id) {
      const t = TEACHERS.find(x => x.id === id) || TEACHERS[0];

      document.getElementById("profCover").src = t.cover;
      document.getElementById("profAvatar").src = t.img;
      document.getElementById("profName").textContent = t.name;
      document.getElementById("profFlagCountry").textContent = `${t.flag} ${t.country}`;
      document.getElementById("profVerifiedBadge").innerHTML = t.verified ? verifiedBadgeHTML() : "";
      document.getElementById("profStars").textContent = starString(t.rating) + " " + t.rating.toFixed(1);
      document.getElementById("profReviewCount").textContent = `(${t.reviews} reviews)`;
      document.getElementById("profStudentCount").textContent = `${t.students}+ students taught`;
      document.getElementById("profBio").textContent = t.bio + " I've been teaching online for over five years and love helping students connect with the culture behind the words.";
      document.getElementById("profLangTags").innerHTML = `<div class="lang-tag">${t.native} <span class="lvl">Native</span></div>` + t.other.map(l => `<div class="lang-tag">${l} <span class="lvl">Fluent</span></div>`).join("");
      document.getElementById("profVideoThumb").src = t.cover;
      document.getElementById("profVideoCaption").textContent = `"Hi, I'm ${t.name.split(" ")[0]} — here's a bit about how I teach."`;
      document.getElementById("profCultureGrid").innerHTML = t.culture.map(c => `<div class="culture-item"><span class="ic">✦</span><div><b>${c}</b><span>Woven into every lesson, from beginner to advanced.</span></div></div>`).join("");
      document.getElementById("profReviewsList").innerHTML = SAMPLE_REVIEWS.map(r => `
        <div class="review-item"><div class="review-top"><div class="review-user"><img src="${r.img}" alt="${r.name}" loading="lazy"><div><b>${r.name}</b><span class="stars">★★★★★</span></div></div><span class="review-date">${r.date}</span></div><p class="review-text">${r.text}</p></div>
      `).join("");
      const certList = ["Background Verified", t.verified ? "ID Verified" : "ID Pending Verification", "5+ Years Experience"];
      document.getElementById("profCertRow").innerHTML = certList.map(c => `<div class="cert-badge">✓ ${c}</div>`).join("");
      document.getElementById("profPrice").textContent = "$" + t.price;

      document.getElementById("profPackages").innerHTML = `
        <div class="pkg-opt selected" data-pkg="1"><div class="pkg-opt-top"><span>Single lesson</span><span>$${t.price}</span></div><small>60 minutes, one time</small></div>
        <div class="pkg-opt" data-pkg="5"><div class="pkg-opt-top"><span>5-lesson pack</span><span>$${Math.round(t.price * 5 * 0.92)}</span></div><small>Save 8% · 60 min each</small></div>
        <div class="pkg-opt" data-pkg="10"><div class="pkg-opt-top"><span>10-lesson pack</span><span>$${Math.round(t.price * 10 * 0.85)}</span></div><small>Save 15% · 60 min each</small></div>`;

      document.querySelectorAll(".pkg-opt").forEach(p => p.addEventListener("click", function() {
        document.querySelectorAll(".pkg-opt").forEach(x => x.classList.remove("selected"));
        this.classList.add("selected");
      }));

      const days = ["S", "M", "T", "W", "T", "F", "S"];
      let calHTML = days.map(d => `<div class="cal-day">${d}</div>`).join("");
      for (let i = 1; i <= 30; i++) {
        const avail = (i + t.id) % 3 !== 0;
        calHTML += `<div class="cal-slot ${avail ? "avail" : ""}" ${avail ? `onclick="selectCalDay(this)"` : ""}>${i}</div>`;
      }
      document.getElementById("profCalendar").innerHTML = calHTML;

      document.getElementById("profTimeSlots").innerHTML = ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM", "7:00 PM"].map(s =>
        `<div class="time-slot" onclick="selectTimeSlot(this)">${s}</div>`
      ).join("");

      document.getElementById("profBookBtn").onclick = redirectToRegister;

      document.querySelectorAll(".profile-tab").forEach(tab => {
        tab.onclick = function() {
          document.querySelectorAll(".profile-tab").forEach(x => x.classList.remove("active"));
          this.classList.add("active");
          document.querySelectorAll(".tab-pane").forEach(p => p.style.display = "none");
          document.getElementById("tab-" + this.dataset.tab).style.display = "block";
        };
      });
      document.querySelectorAll(".profile-tab")[0].classList.add("active");
    }

    function selectCalDay(el) {
      document.querySelectorAll(".cal-slot").forEach(s => s.classList.remove("selected"));
      el.classList.add("selected");
    }

    function selectTimeSlot(el) {
      document.querySelectorAll(".time-slot").forEach(s => s.classList.remove("selected"));
      el.classList.add("selected");
    }

    // ============================================================
    // WIZARD (APPLY)
    // ============================================================
    const WIZARD_STEPS = [
      { key: "personal", label: "Personal details" },
      { key: "languages", label: "Languages" },
      { key: "culture", label: "Cultural expertise" },
      { key: "experience", label: "Teaching experience" },
      { key: "video", label: "Introduction video" },
      { key: "availability", label: "Availability" },
      { key: "review", label: "Review & submit" },
    ];

    let wizardState = {
      step: 0,
      data: { languages: [], cultures: [], availability: new Set(), price: 20 },
      submitted: false
    };

    function renderWizard() {
      if (wizardState.submitted) { renderWizardSuccess(); return; }
      renderWizardSteps();
      renderWizardPanel();
    }

    function renderWizardSteps() {
      document.getElementById("wizardSteps").innerHTML = WIZARD_STEPS.map((s, i) => `
        <div class="wizard-step ${i === wizardState.step ? "active" : ""} ${i < wizardState.step ? "done" : ""}" onclick="jumpStep(${i})">
          <span class="num">${i < wizardState.step ? "✓" : i + 1}</span> ${s.label}
        </div>
      `).join("");
      document.getElementById("progressFill").style.width = (wizardState.step / (WIZARD_STEPS.length - 1)) * 100 + "%";
    }

    function jumpStep(i) {
      if (i <= wizardState.step) {
        wizardState.step = i;
        renderWizard();
      }
    }

    function wizardBack() {
      if (wizardState.step > 0) {
        wizardState.step--;
        renderWizard();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    function wizardNext() {
      if (wizardState.step < WIZARD_STEPS.length - 1) {
        wizardState.step++;
        renderWizard();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    function wizardSubmit() {
      wizardState.submitted = true;
      renderWizard();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function wizardNavHTML() {
      const isFirst = wizardState.step === 0;
      const isLast = wizardState.step === WIZARD_STEPS.length - 1;
      return `<div class="wizard-nav">
        <button class="btn btn-ghost" ${isFirst ? "disabled" : ""} onclick="wizardBack()">Back</button>
        <button class="btn btn-primary" onclick="${isLast ? "wizardSubmit()" : "wizardNext()"}">${isLast ? "Submit application" : "Continue"}</button>
      </div>`;
    }

    const LANGUAGE_OPTS = ["Swahili", "Yoruba", "Hausa", "Amharic", "Zulu", "Igbo", "Twi", "Wolof", "Xhosa", "Somali", "Shona", "Afrikaans", "Arabic", "French", "Portuguese"];
    const CULTURE_OPTS = ["Cooking", "Music & instruments", "Festivals & holidays", "History", "Etiquette & customs", "Storytelling", "Dance", "Religion & philosophy", "Art & crafts"];

    function renderWizardPanel() {
      const key = WIZARD_STEPS[wizardState.step].key;
      const el = document.getElementById("wizardContent");
      let html = "";

      if (key === "personal") {
        html = `
          <h2>Personal details</h2>
          <p class="sub">Tell students a little about who you are.</p>
          <div class="form-grid">
            <div class="field"><label>Full name</label><input type="text" placeholder="e.g. Amara Adeyemi" value="${wizardState.data.name || ""}" onchange="wizardState.data.name=this.value"></div>
            <div class="field"><label>Email address</label><input type="email" placeholder="you@example.com" value="${wizardState.data.email || ""}" onchange="wizardState.data.email=this.value"></div>
            <div class="field"><label>Country of residence</label><input type="text" placeholder="e.g. Nigeria" value="${wizardState.data.country || ""}" onchange="wizardState.data.country=this.value"></div>
            <div class="field"><label>Time zone</label><select onchange="wizardState.data.tz=this.value"><option>GMT</option><option>WAT (GMT+1)</option><option>EAT (GMT+3)</option><option>CAT (GMT+2)</option><option>JST (GMT+9)</option></select></div>
          </div>
          <div class="field"><label>Short headline <span class="opt">(shown on your profile card)</span></label><input type="text" placeholder="e.g. Griot-trained storyteller" value="${wizardState.data.headline || ""}" onchange="wizardState.data.headline=this.value"></div>
          <div class="field"><label>Profile photo (optional)</label>
            <div class="upload-box" onclick="document.getElementById('photoInput').click()">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style="margin:0 auto;"><path d="M12 16V4m0 0L7 9m5-5 5 5" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/><path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/></svg>
              <b id="photoFileName">${wizardState.data.photo ? wizardState.data.photo.name : "Click to upload a photo"}</b>
              <div>JPG or PNG, at least 400×400px</div>
              <input type="file" id="photoInput" accept="image/png,image/jpeg" style="display:none" onchange="selectPhoto(event)">
            </div>
          </div>
        `;
      }

      if (key === "languages") {
        html = `
          <h2>Languages you teach</h2>
          <p class="sub">Select every language you can confidently teach — African languages are always in high demand.</p>
          <div class="check-grid">
            ${LANGUAGE_OPTS.map(l => `
              <label class="check-card ${wizardState.data.languages.includes(l) ? "selected" : ""}">
                <input type="checkbox" ${wizardState.data.languages.includes(l) ? "checked" : ""} onchange="toggleArrItem('languages','${l}', this)"> ${l}
              </label>`).join("")}
          </div>
          <div class="field" style="margin-top:24px;"><label>Native language</label><input type="text" placeholder="e.g. Yoruba" value="${wizardState.data.native || ""}" onchange="wizardState.data.native=this.value"></div>
        `;
      }

      if (key === "culture") {
        html = `
          <h2>Cultural expertise</h2>
          <p class="sub">What traditions, customs or skills can you share beyond language?</p>
          <div class="check-grid">
            ${CULTURE_OPTS.map(c => `
              <label class="check-card ${wizardState.data.cultures.includes(c) ? "selected" : ""}">
                <input type="checkbox" ${wizardState.data.cultures.includes(c) ? "checked" : ""} onchange="toggleArrItem('cultures','${c}', this)"> ${c}
              </label>`).join("")}
          </div>
          <div class="field" style="margin-top:24px;"><label>Tell us more <span class="opt">(optional)</span></label><textarea placeholder="e.g. I grew up learning traditional drumming from my grandfather..." onchange="wizardState.data.cultureNote=this.value">${wizardState.data.cultureNote || ""}</textarea></div>
        `;
      }

      if (key === "experience") {
        html = `
          <h2>Teaching experience</h2>
          <p class="sub">Help students understand your background.</p>
          <div class="form-grid">
            <div class="field"><label>Years of teaching experience</label><select onchange="wizardState.data.exp=this.value"><option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>5+ years</option></select></div>
            <div class="field"><label>Teaching format</label><select onchange="wizardState.data.format=this.value"><option>1-on-1 only</option><option>Group lessons</option><option>Both</option></select></div>
          </div>
          <div class="field"><label>Certifications <span class="opt">(optional)</span></label><input type="text" placeholder="e.g. CELTA, TEFL" onchange="wizardState.data.certs=this.value"></div>
          <div class="field"><label>Tell students about your teaching style</label><textarea placeholder="e.g. I focus on real conversation from lesson one..." onchange="wizardState.data.styleNote=this.value">${wizardState.data.styleNote || ""}</textarea></div>
        `;
      }

      if (key === "video") {
        html = `
          <h2>Introduction video (optional)</h2>
          <p class="sub">A short video helps students connect with you before booking.</p>
          <div class="upload-box" onclick="document.getElementById('videoInput').click()">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" style="margin:0 auto;"><rect x="3" y="6" width="13" height="12" rx="2" stroke="#2563EB" stroke-width="2"/><path d="M16 10l5-3v10l-5-3" stroke="#2563EB" stroke-width="2" stroke-linejoin="round"/></svg>
            <b id="videoFileName">${wizardState.data.video ? wizardState.data.video.name : "Click to upload your intro video"}</b>
            <div>MP4 or MOV, under 3 minutes</div>
            <input type="file" id="videoInput" accept="video/mp4,video/quicktime" style="display:none" onchange="selectVideo(event)">
          </div>
          <div class="field-hint" style="margin-top:14px;">Tip: introduce yourself, share where you're from, and mention what makes your lessons unique.</div>
        `;
      }

      if (key === "availability") {
        const daysArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        html = `
          <h2>Availability</h2>
          <p class="sub">Click the time blocks when you're generally free to teach.</p>
          <div class="avail-grid">
            ${daysArr.map(d => `
              <div class="avail-day"><h6>${d}</h6>${["Morning", "Afternoon", "Evening"].map(t => {
                const key = d + "-" + t;
                const on = wizardState.data.availability.has(key);
                return `<div class="avail-cell ${on ? "on" : ""}" onclick="toggleAvail('${key}', this)" title="${d} ${t}"></div>`;
              }).join("")}</div>`).join("")}
          </div>
          <div class="field-hint" style="margin-top:14px;">${wizardState.data.availability.size} time blocks selected</div>
        `;
      }

      if (key === "review") {
        html = `
          <h2>Review & submit</h2>
          <p class="sub">Check your details before submitting your application.</p>
          <div class="review-summary">
            <div class="rs-row"><b>Name</b><span>${wizardState.data.name || "—"}</span></div>
            <div class="rs-row"><b>Email</b><span>${wizardState.data.email || "—"}</span></div>
            <div class="rs-row"><b>Languages</b><span>${wizardState.data.languages.join(", ") || "—"}</span></div>
            <div class="rs-row"><b>Native language</b><span>${wizardState.data.native || "—"}</span></div>
            <div class="rs-row"><b>Cultural expertise</b><span>${wizardState.data.cultures.join(", ") || "—"}</span></div>
            <div class="rs-row"><b>Availability</b><span>${wizardState.data.availability.size} time blocks</span></div>
            <div class="rs-row"><b>Hourly rate</b><span>$${wizardState.data.price || 20}</span></div>
          </div>
          <div class="field" style="margin-top:20px;"><label>Anything else?</label><textarea placeholder="Any additional info..." onchange="wizardState.data.extra=this.value"></textarea></div>
        `;
      }

      el.innerHTML = html + wizardNavHTML();
    }

    function toggleArrItem(field, val, checkboxEl) {
      const arr = wizardState.data[field];
      const i = arr.indexOf(val);
      if (i > -1) arr.splice(i, 1);
      else arr.push(val);
      checkboxEl.closest(".check-card").classList.toggle("selected");
    }

    function toggleAvail(key, el) {
      if (wizardState.data.availability.has(key)) wizardState.data.availability.delete(key);
      else wizardState.data.availability.add(key);
      el.classList.toggle("on");
    }

    function renderWizardSuccess() {
      document.getElementById("wizardSteps").innerHTML = "";
      document.getElementById("progressFill").style.width = "100%";
      document.getElementById("wizardContent").innerHTML = `
        <div class="success-panel">
          <div class="success-icon"><svg width="38" height="38" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#059669" stroke-width="2.6" stroke-linecap="round"/></svg></div>
          <h2>Application Ready!</h2>
          <p style="color:#64748b;margin-top:10px;max-width:420px;margin-left:auto;margin-right:auto;">
            Hello, ${wizardState.data.name || "friend"}! You don't have an account yet. Complete your registration to submit your application.
          </p>
          <a href="https://starhela.com/c/U3lkbmV5" class="btn btn-primary" style="margin-top:28px;">Register Your Account</a>
        </div>`;
    }

    // ============================================================
    // FILE UPLOAD HANDLERS (for wizard)
    // ============================================================
    window.selectPhoto = function(e) {
      const file = e.target.files[0];
      if (file) {
        wizardState.data.photo = file;
        document.getElementById("photoFileName").textContent = file.name;
      }
    };

    window.selectVideo = function(e) {
      const file = e.target.files[0];
      if (file) {
        wizardState.data.video = file;
        document.getElementById("videoFileName").textContent = file.name;
        const preview = document.getElementById("videoPreview");
        if (preview) {
          preview.style.display = "block";
          preview.src = URL.createObjectURL(file);
        }
      }
    };

    // ============================================================
    // INIT
    // ============================================================
    router();