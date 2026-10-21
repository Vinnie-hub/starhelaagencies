/* Hotel reviews page: lodge directory (filter, search, sort). Reviewing opens the shared sign-up modal. */
(function () {
  "use strict";

  var LODGES = [
    { id: "us-1", country: "USA", city: "Aspen, Colorado", name: "Silver Pine Lodge", rating: 4.8, img: "photo-1551882547-ff40c63fe5fa", desc: "An alpine retreat surrounded by mountain scenery, fireplaces and quiet winter charm." },
    { id: "us-2", country: "USA", city: "Sedona, Arizona", name: "Red Rock Haven", rating: 4.7, img: "photo-1564501049412-61c2a3083791", desc: "A desert hideaway inspired by dramatic red-rock landscapes and wellness escapes." },
    { id: "us-3", country: "USA", city: "Jackson, Wyoming", name: "Grand Teton Hearth", rating: 4.9, img: "photo-1549294413-26f195200c16", desc: "A timber lodge with broad mountain views and warm, rustic interiors." },
    { id: "us-4", country: "USA", city: "Lake Tahoe, California", name: "Tahoe Crest Retreat", rating: 4.6, img: "photo-1584132967334-10e028bd69f7", desc: "A lakeside lodge with pine-framed water views and a calm, year-round setting." },
    { id: "us-5", country: "USA", city: "Napa Valley, California", name: "Vineyard House Lodge", rating: 4.8, img: "photo-1568084680786-a84f91d1153c", desc: "A vineyard stay with garden courtyards and relaxed countryside styling." },
    { id: "us-6", country: "USA", city: "Maui, Hawaii", name: "Pacific Palm Lodge", rating: 4.7, img: "photo-1561501900-3701fa6a0864", desc: "A tropical lodge with open-air living spaces, palms and ocean breezes." },
    { id: "uae-1", country: "UAE", city: "Dubai", name: "Desert Pearl Retreat", rating: 4.9, img: "photo-1542314831-068cd1dbfeeb", desc: "A luxury desert retreat combining modern design and dune-inspired scenery." },
    { id: "uae-2", country: "UAE", city: "Abu Dhabi", name: "Oasis Crown Lodge", rating: 4.7, img: "photo-1520250497591-112f2f40a3f4", desc: "An oasis lodge with shaded courtyards, pools and tranquil desert styling." },
    { id: "uae-3", country: "UAE", city: "Ras Al Khaimah", name: "Jebel Vista Lodge", rating: 4.8, img: "photo-1600607687939-ce8a6c25118c", desc: "A mountain retreat with sweeping views over the Hajar range." },
    { id: "uae-4", country: "UAE", city: "Dubai", name: "Creek Lantern House", rating: 4.5, img: "photo-1571896349842-33c89424de2d", desc: "A city lodge blending traditional-inspired details with a modern waterfront feel." },
    { id: "uae-5", country: "UAE", city: "Sharjah", name: "Al Noor Garden Lodge", rating: 4.6, img: "photo-1582719478250-c89cae4dc85b", desc: "A garden-focused lodge with shaded walkways and quiet courtyards." },
    { id: "uae-6", country: "UAE", city: "Fujairah", name: "Hajar Coast Lodge", rating: 4.8, img: "photo-1540541338287-41700207dee6", desc: "An east-coast escape inspired by mountains, sea views and relaxed resort design." },
  ];
  var COUNTRY = { USA: "🇺🇸 United States", UAE: "🇦🇪 UAE" };
  var photo = function (id) {
    return "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=800&q=75";
  };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var $ = function (id) {
    return document.getElementById(id);
  };

  var grid = $("lodgeGrid");
  var state = { country: "all", q: "", sort: "top" };

  /* hero stats come from the data, so they never drift */
  $("statLodges").textContent = LODGES.length;
  $("statCountries").textContent = new Set(LODGES.map(function (l) { return l.country; })).size;
  $("statCities").textContent = new Set(LODGES.map(function (l) { return l.city; })).size;

  function visible() {
    var q = state.q.trim().toLowerCase();
    var list = LODGES.filter(function (l) {
      var okCountry = state.country === "all" || l.country === state.country;
      var okText = !q || (l.name + " " + l.city).toLowerCase().indexOf(q) > -1;
      return okCountry && okText;
    });
    list.sort(function (a, b) {
      return state.sort === "name" ? a.name.localeCompare(b.name) : b.rating - a.rating || a.name.localeCompare(b.name);
    });
    return list;
  }

  function render() {
    var list = visible();
    grid.innerHTML = list
      .map(function (l) {
        return (
          '<article class="lodge">' +
          '<div class="lodge-media"><img src="' + photo(l.img) + '" alt="' + esc(l.name) + " in " + esc(l.city) + '" loading="lazy" decoding="async" width="800" height="533" onerror="this.remove()" />' +
          '<span class="pill">' + COUNTRY[l.country] + "</span></div>" +
          '<div class="lodge-body"><div class="lodge-top"><h3>' + esc(l.name) + '</h3><span class="rate" aria-label="Rated ' + l.rating + ' out of 5">' + l.rating.toFixed(1) + "</span></div>" +
          '<div class="where"><svg class="ico" aria-hidden="true"><use href="#icon-pin"></use></svg>' + esc(l.city) + "</div>" +
          "<p>" + esc(l.desc) + "</p>" +
          '<button class="btn btn-soft" type="button" data-gate="review">Review this lodge</button></div></article>'
        );
      })
      .join("");
    $("count").textContent = "Showing " + list.length + (list.length === 1 ? " lodge" : " lodges");
    $("empty").hidden = list.length > 0;
  }

  document.querySelectorAll(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      document.querySelectorAll(".chip").forEach(function (c) {
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });
      state.country = chip.dataset.country;
      render();
    });
  });
  $("q").addEventListener("input", function (e) {
    state.q = e.target.value;
    render();
  });
  $("sort").addEventListener("change", function (e) {
    state.sort = e.target.value;
    render();
  });

  render();
})();
