/* =====================================================
   Aniket Singh — Architecture Portfolio
   Data-driven rendering + interactions
   ===================================================== */

const DATA_FILES = {
  profile: "data/profile.json",
  experience: "data/experience.json",
  projects: "data/projects.json",
  skills: "data/skills.json",
};

function esc(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------------- Renderers ---------------- */

function renderProfile(p) {
  if (!p) return;
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  const setHref = (id, href) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute("href", href);
  };

  set("logo-name", p.name);
  set("logo-tag", p.logoTag);
  set("hero-eyebrow", p.heroEyebrow);
  set("hero-name", p.name);
  set("hero-objective", p.objective);
  set("foot-name", p.name);
  set("foot-copy-name", p.name);

  if (p.email) {
    setHref("hero-email", "mailto:" + p.email);
    setHref("foot-email", "mailto:" + p.email);
    setHref("contact-email", "mailto:" + p.email);
    const ce = document.getElementById("contact-email");
    if (ce) ce.textContent = p.email;
  }
  if (p.cvLink) setHref("hero-cv", p.cvLink);
  set("contact-location", p.location);

  if (p.contact) {
    set("contact-heading", p.contact.heading);
    const msg = document.getElementById("contact-message");
    if (msg) msg.setAttribute("placeholder", p.contact.formIntro || "");
  }

  // About column
  const about = p.about || {};
  const aboutEl = document.getElementById("about-text");
  if (aboutEl) {
    const paras = (about.paragraphs || [])
      .map((t) => `<p>${esc(t)}</p>`)
      .join("");
    const lead = about.lead ? `<p class="lead">${esc(about.lead)}</p>` : "";
    const stats = (about.stats || [])
      .map(
        (s) =>
          `<div class="item"><div class="num">${esc(s.num)}</div><div class="lbl">${esc(
            s.lbl
          )}</div></div>`
      )
      .join("");
    aboutEl.innerHTML =
      (about.title ? `<h2>${esc(about.title)}</h2>` : "") +
      lead +
      paras +
      (stats ? `<div class="about-meta">${stats}</div>` : "");
  }

  // Animated hero role cycling
  startRoleCycle(p.heroRoles || []);
}

function startRoleCycle(roles) {
  const el = document.getElementById("hero-role");
  if (!el || !roles.length) return;
  let i = 0;
  el.textContent = roles[0];
  if (roles.length === 1) return;
  setInterval(() => {
    i = (i + 1) % roles.length;
    el.classList.add("swap");
    setTimeout(() => {
      el.textContent = roles[i];
      el.classList.remove("swap");
    }, 280);
  }, 2600);
}

function renderExperience(items) {
  const container = document.getElementById("timeline");
  if (!container || !Array.isArray(items)) return;

  const groups = [
    { kind: "experience", label: "Professional Experience" },
    { kind: "education", label: "Education & Activities" },
  ];

  let html = "";
  groups.forEach((group) => {
    const entries = items.filter((it) => (it.kind || "experience") === group.kind);
    if (!entries.length) return;
    html += `<h3 class="timeline-group-title reveal">${esc(group.label)}</h3>`;
    html += `<div class="time-line">`;
    entries.forEach((it) => {
      const logo = it.logo
        ? `<img class="role-logo" src="${esc(it.logo)}" alt="${esc(it.org)}" />`
        : "";
      const heading = it.org
        ? `${esc(it.role)} &mdash; ${esc(it.org)}`
        : esc(it.role);
      html += `
        <div class="block ${it.current ? "current" : ""} reveal">
          <h4>${esc(it.date)}</h4>
          <h3>${logo}${heading}</h3>
          <p>${it.description || ""}</p>
        </div>`;
    });
    html += `</div>`;
  });
  container.innerHTML = html;
}

function renderProjects(projects) {
  const container = document.getElementById("projects");
  if (!container || !Array.isArray(projects)) return;

  let html = "";
  projects.forEach((proj, idx) => {
    const n = String(idx + 1).padStart(2, "0");
    const galleryClass = "gallery" + (idx + 1);

    const cover = `
      <div class="project-main">
        <a href="${esc(proj.cover)}" class="${galleryClass}">
          <img src="${esc(proj.cover)}" alt="${esc(proj.title)} — main view" />
        </a>
      </div>`;

    const thumbs = (proj.images || [])
      .map(
        (src) => `
        <a href="${esc(src)}" class="${galleryClass}">
          <img src="${esc(src)}" alt="${esc(proj.title)} view" />
        </a>`
      )
      .join("");

    const meta = (proj.meta || [])
      .map(
        (m) =>
          `<div class="meta-row"><span class="mk">${esc(m.k)}</span><span class="mv">${esc(
            m.v
          )}</span></div>`
      )
      .join("");

    html += `
      <div class="project reveal">
        <div class="project-index">
          <span class="pnum">${n}</span>
          <h3>${esc(proj.title)}</h3>
        </div>
        ${cover}
        <div class="project-thumbs">${thumbs}</div>
        <div class="project-info">
          <div class="project-meta">${meta}</div>
          <div class="cat">${esc(proj.description)}</div>
        </div>
      </div>`;
  });
  container.innerHTML = html;
}

function renderSkills(data) {
  if (!data) return;
  const grid = document.getElementById("skills-grid");
  if (grid && Array.isArray(data.tools)) {
    grid.innerHTML = data.tools
      .map(
        (t) =>
          `<div class="tool"><img src="${esc(t.logo)}" alt="${esc(
            t.name
          )}" /><span>${esc(t.name)}</span></div>`
      )
      .join("");
  }
  const note = document.getElementById("skills-note");
  if (note && data.note) note.textContent = data.note;
}

/* ---------------- Interactions ---------------- */

function initGalleries() {
  const groups = {};
  $('[class*="gallery"]').each(function () {
    const cls = ($(this).attr("class").match(/gallery\d+/) || [])[0];
    if (cls) groups[cls] = true;
  });
  Object.keys(groups).forEach(function (group) {
    $("." + group).magnificPopup({
      type: "image",
      gallery: { enabled: true },
      image: {
        titleSrc: function (item) {
          return item.el.find("img").attr("alt");
        },
      },
      closeOnContentClick: true,
      mainClass: "mfp-fade mfp-img-mobile",
      removalDelay: 200,
      fixedContentPos: true,
    });
  });
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
  } else {
    els.forEach((el) => el.classList.add("visible"));
  }
}

function initBlueprint() {
  // Set each path's dash length so the draw-in animation runs from full length.
  const paths = document.querySelectorAll(".blueprint .bp");
  paths.forEach((path, i) => {
    let len = 0;
    try {
      len = path.getTotalLength();
    } catch (e) {
      len = 600;
    }
    path.style.setProperty("--len", len);
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.style.animationDelay = (i * 0.12).toFixed(2) + "s";
  });
  // Trigger animation on next frame
  requestAnimationFrame(() => {
    const svg = document.querySelector(".blueprint");
    if (svg) svg.classList.add("draw");
  });
}

function initChrome() {
  const $navbar = $(".navbar");
  const $gotop = $(".gotop");

  $(window).on("scroll", function () {
    if (window.scrollY > 20) {
      $navbar.addClass("sticky");
      $gotop.fadeIn();
    } else {
      $navbar.removeClass("sticky");
      $gotop.fadeOut();
    }
  });

  $(".menu-toggler").on("click", function () {
    $(this).toggleClass("active");
    $(".navbar-menu").toggleClass("active");
  });

  $(".navbar-menu a").on("click", function () {
    $(".menu-toggler").removeClass("active");
    $(".navbar-menu").removeClass("active");
  });

  $gotop.on("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  $("#year").text(new Date().getFullYear());
}

/* ---------------- Boot ---------------- */

function fetchJSON(path) {
  return fetch(path).then((res) => {
    if (!res.ok) throw new Error("Failed to load " + path);
    return res.json();
  });
}

$(document).ready(function () {
  initChrome();
  initBlueprint();

  Promise.all([
    fetchJSON(DATA_FILES.profile),
    fetchJSON(DATA_FILES.experience),
    fetchJSON(DATA_FILES.projects),
    fetchJSON(DATA_FILES.skills),
  ])
    .then(([profile, experience, projects, skills]) => {
      renderProfile(profile);
      renderExperience(experience);
      renderProjects(projects);
      renderSkills(skills);

      // Content is in the DOM — wire up galleries and reveals.
      initGalleries();
      initReveal();
    })
    .catch((err) => {
      console.error(err);
      // Reveal anything already present so the page is never stuck hidden.
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("visible"));
    });
});
