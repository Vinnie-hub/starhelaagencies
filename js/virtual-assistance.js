/* Virtual Assistance page: live time-zone board + weekly estimate. */
(function () {
  "use strict";

  /* ── time-zone board ─────────────────────────────── */
  var CITIES = [
    { name: "You, Nairobi", tz: "Africa/Nairobi", me: true },
    { name: "London", tz: "Europe/London" },
    { name: "New York", tz: "America/New_York" },
    { name: "Sydney", tz: "Australia/Sydney" },
  ];
  var CELLS = 48; // half-hour cells across a Nairobi day
  var rowsEl = document.getElementById("rows");
  var noteEl = document.getElementById("boardNote");
  var radios = document.querySelectorAll('input[name="mine"]');
  var LABELS = { "6-12": "morning", "9-17": "daytime", "16-22": "evening" };
  var built = [];

  function minutesIn(tz, date) {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(date);
    var h = 0,
      m = 0;
    parts.forEach(function (p) {
      if (p.type === "hour") h = parseInt(p.value, 10) % 24;
      if (p.type === "minute") m = parseInt(p.value, 10);
    });
    return h * 60 + m;
  }
  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }
  function clock(mins) {
    return pad(Math.floor(mins / 60)) + ":" + pad(mins % 60);
  }
  function myWindow() {
    var v = document.querySelector('input[name="mine"]:checked').value.split("-");
    return [parseInt(v[0], 10) * 60, parseInt(v[1], 10) * 60];
  }

  function build() {
    CITIES.forEach(function (c, r) {
      var row = document.createElement("div");
      row.className = "row";
      var who = document.createElement("div");
      who.className = "who";
      who.innerHTML = "<b></b><span class='clock'></span>";
      who.firstChild.textContent = c.name;
      var strip = document.createElement("div");
      strip.className = "strip";
      strip.style.setProperty("--r", r);
      strip.setAttribute("role", "img");
      var cells = [];
      for (var i = 0; i < CELLS; i++) {
        var cell = document.createElement("i");
        strip.appendChild(cell);
        cells.push(cell);
      }
      var now = document.createElement("span");
      now.className = "now";
      strip.appendChild(now);
      var ov = document.createElement("div");
      ov.className = "ov";
      row.appendChild(who);
      row.appendChild(strip);
      row.appendChild(ov);
      rowsEl.appendChild(row);
      built.push({ city: c, clock: who.lastChild, strip: strip, cells: cells, now: now, ov: ov });
    });
  }

  function update() {
    var date = new Date();
    var nairobi = minutesIn("Africa/Nairobi", date);
    var win = myWindow();
    var best = null;

    built.forEach(function (b) {
      var local = minutesIn(b.city.tz, date);
      var shift = ((((local - nairobi) % 1440) + 1440 + 720) % 1440) - 720; // local = nairobi + shift
      var overlap = 0;
      b.cells.forEach(function (cell, k) {
        var m = k * 30;
        var mine = m >= win[0] && m < win[1];
        var biz = false;
        if (!b.city.me) {
          var lm = (((m + shift) % 1440) + 1440) % 1440;
          biz = lm >= 540 && lm < 1020;
        }
        var both = mine && biz;
        if (both) overlap += 0.5;
        cell.className = both ? "both" : b.city.me ? (mine ? "mine" : "") : biz ? "biz" : "";
      });
      b.clock.textContent = clock(local);
      b.now.style.left = "calc(" + (nairobi / 1440) * 100 + "% - 1px)";
      if (b.city.me) {
        b.ov.textContent = "";
        b.strip.setAttribute("aria-label", "Your hours: " + clock(win[0]) + " to " + clock(win[1]) + " Nairobi time");
      } else {
        b.ov.textContent = overlap + " h";
        b.ov.className = "ov" + (overlap > 0 ? " has" : "");
        b.strip.setAttribute("aria-label", b.city.name + ": " + overlap + " hours overlap with your hours");
        if (!best || overlap > best.h) best = { name: b.city.name, h: overlap };
      }
    });

    var label = LABELS[document.querySelector('input[name="mine"]:checked').value];
    noteEl.textContent =
      best && best.h > 0
        ? "With " + label + " hours you share up to " + best.h + " hours a day with " + best.name + ". Clients are assumed to work 09:00 to 17:00 where they live."
        : "None of these cities overlap with your " + label + " hours. Try another window.";
  }

  if (rowsEl && noteEl) {
    build();
    update();
    radios.forEach(function (r) {
      r.addEventListener("change", update);
    });
    setInterval(update, 30000);
  }

  /* ── weekly estimate ─────────────────────────────── */
  var hours = document.getElementById("calcHours");
  var rate = document.getElementById("calcRate");
  var fee = document.getElementById("calcFee");
  if (hours && rate && fee) {
    var money = function (n) {
      return "$" + Math.round(n).toLocaleString("en-US");
    };
    var $ = function (id) {
      return document.getElementById(id);
    };
    var calc = function () {
      var h = +hours.value,
        r = +rate.value,
        f = +fee.value;
      var gross = h * r;
      var cut = (gross * f) / 100;
      var net = gross - cut;
      var monthly = Math.round((net * 4.33) / 5) * 5;
      $("hoursOut").textContent = h + " h";
      $("rateOut").textContent = "$" + r;
      $("feeOut").textContent = f + "%";
      $("lineWork").textContent = h + " h × $" + r;
      $("gross").textContent = money(gross);
      $("lineFee").textContent = "Platform fee (" + f + "%)";
      $("feeAmt").textContent = cut ? "−" + money(cut) : "$0";
      $("net").textContent = money(net);
      $("monthly").textContent = net ? "About " + money(monthly) + " a month" : "Move the sliders to estimate";
    };
    [hours, rate, fee].forEach(function (el) {
      el.addEventListener("input", calc);
    });
    calc();
  }
})();
