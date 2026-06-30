/* =====================================================
   TEMPORARY — Theme preview switcher
   Lets you preview palettes A–E live, then pick one.
   Remove this file + its <script> tag in index.html
   once a theme is chosen.
   ===================================================== */
(function () {
  var STORAGE_KEY = "previewTheme";

  var THEMES = [
    { id: "", label: "A", name: "Warm Editorial", swatch: "#a85c42", bg: "#f6f3ee" },
    { id: "blueprint", label: "B", name: "Blueprint Ink", swatch: "#b25c40", bg: "#18202b" },
    { id: "mono", label: "C", name: "Monochrome", swatch: "#3a3a38", bg: "#161513" },
    { id: "sage", label: "D", name: "Sage Natural", swatch: "#6e7257", bg: "#232821" },
    { id: "forest", label: "E", name: "Forest Brass", swatch: "#b08a4f", bg: "#1e2a24" },
  ];

  function applyTheme(id) {
    if (id) {
      document.documentElement.setAttribute("data-theme", id);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  function getSaved() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch (e) {
      return "";
    }
  }

  function save(id) {
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch (e) {}
  }

  // Allow forcing a theme via ?theme=blueprint|mono|sage|forest (also persists).
  function fromQuery() {
    try {
      var m = /[?&]theme=([a-z]*)/i.exec(window.location.search);
      return m ? m[1].toLowerCase() : null;
    } catch (e) {
      return null;
    }
  }

  // Apply saved (or query-forced) theme ASAP to avoid a flash.
  var forced = fromQuery();
  if (forced !== null) save(forced);
  applyTheme(getSaved());

  function injectStyles() {
    var css =
      "#theme-preview{position:fixed;left:18px;bottom:18px;z-index:9999;" +
      "font-family:'Jost',Arial,sans-serif;background:rgba(20,18,16,.92);" +
      "color:#fff;border:1px solid rgba(255,255,255,.16);border-radius:10px;" +
      "padding:12px;backdrop-filter:blur(6px);box-shadow:0 12px 30px -12px rgba(0,0,0,.6);" +
      "width:208px;transition:transform .25s ease,opacity .25s ease;}" +
      "#theme-preview.tp-hidden{transform:translateY(calc(100% + 28px));opacity:0;}" +
      "#theme-preview .tp-head{display:flex;align-items:center;justify-content:space-between;" +
      "font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#cdb8ac;margin-bottom:10px;}" +
      "#theme-preview .tp-head button{all:unset;cursor:pointer;color:#cdb8ac;font-size:14px;line-height:1;padding:2px 4px;}" +
      "#theme-preview .tp-row{display:flex;align-items:center;gap:10px;width:100%;cursor:pointer;" +
      "background:none;border:none;color:#fff;text-align:left;padding:7px 8px;border-radius:7px;" +
      "font-size:12px;transition:background .2s ease;}" +
      "#theme-preview .tp-row:hover{background:rgba(255,255,255,.08);}" +
      "#theme-preview .tp-row.active{background:rgba(255,255,255,.14);}" +
      "#theme-preview .tp-sw{width:22px;height:22px;border-radius:5px;flex:0 0 auto;" +
      "border:1px solid rgba(255,255,255,.25);}" +
      "#theme-preview .tp-name{font-weight:500;}" +
      "#theme-preview .tp-key{opacity:.55;margin-left:auto;font-size:11px;letter-spacing:.1em;}" +
      "#theme-preview-toggle{position:fixed;left:18px;bottom:18px;z-index:9998;cursor:pointer;" +
      "background:rgba(20,18,16,.92);color:#fff;border:1px solid rgba(255,255,255,.16);" +
      "border-radius:10px;padding:10px 14px;font-family:'Jost',Arial,sans-serif;font-size:11px;" +
      "letter-spacing:.14em;text-transform:uppercase;display:none;}";
    var style = document.createElement("style");
    style.id = "theme-preview-style";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function build() {
    injectStyles();

    var panel = document.createElement("div");
    panel.id = "theme-preview";

    var head = document.createElement("div");
    head.className = "tp-head";
    var title = document.createElement("span");
    title.textContent = "Theme preview";
    var hide = document.createElement("button");
    hide.textContent = "—";
    hide.title = "Hide";
    head.appendChild(title);
    head.appendChild(hide);
    panel.appendChild(head);

    var current = getSaved();
    var rows = [];

    THEMES.forEach(function (t) {
      var row = document.createElement("button");
      row.className = "tp-row" + (t.id === current ? " active" : "");
      row.setAttribute("data-id", t.id);

      var sw = document.createElement("span");
      sw.className = "tp-sw";
      sw.style.background =
        "linear-gradient(135deg," + t.bg + " 0 55%," + t.swatch + " 55% 100%)";

      var name = document.createElement("span");
      name.className = "tp-name";
      name.textContent = t.name;

      var key = document.createElement("span");
      key.className = "tp-key";
      key.textContent = t.label;

      row.appendChild(sw);
      row.appendChild(name);
      row.appendChild(key);

      row.addEventListener("click", function () {
        applyTheme(t.id);
        save(t.id);
        rows.forEach(function (r) {
          r.classList.toggle("active", r.getAttribute("data-id") === t.id);
        });
      });

      rows.push(row);
      panel.appendChild(row);
    });

    var toggle = document.createElement("button");
    toggle.id = "theme-preview-toggle";
    toggle.textContent = "Theme";

    hide.addEventListener("click", function () {
      panel.classList.add("tp-hidden");
      toggle.style.display = "block";
    });
    toggle.addEventListener("click", function () {
      panel.classList.remove("tp-hidden");
      toggle.style.display = "none";
    });

    document.body.appendChild(panel);
    document.body.appendChild(toggle);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
