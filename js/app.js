const projects = [
  {
    id: "robotic-arm",
    title: "ROBOTIC ARM",
    type: "ENGINEERING",
    year: "2026",
    image: "images/robotic-arm.svg",
    description: "A six-axis robotic arm developed as a modular platform for precision manipulation and research. The work covered mechanical design, prototyping, actuator integration and control.",
    role: "Mechanical design / prototyping / controls",
    tools: "CAD / machining / embedded systems",
    images: ["images/robotic-arm.svg", "images/robotic-arm-detail.svg", "images/robotic-arm-cad.svg"],
    youtube: "" // Paste the YouTube video URL or video ID here
  },
  {
    id: "terrain-rover",
    title: "TERRAIN ROVER",
    type: "FABRICATION",
    year: "2025",
    image: "images/terrain-rover.svg",
    description: "A compact off-road rover built around a modular chassis. The project combined mechanical fabrication, electronics integration and software for field testing.",
    role: "Design / fabrication / integration",
    tools: "CAD / CNC / electronics",
    images: ["images/terrain-rover.svg", "images/terrain-rover-detail.svg", "images/terrain-rover-cad.svg"],
    youtube: ""
  },
  {
    id: "heat-exchanger",
    title: "HEAT EXCHANGER",
    type: "ENGINEERING",
    year: "2024",
    image: "images/heat-exchanger.svg",
    description: "A compact thermal system exploring high-efficiency heat transfer in constrained environments, balancing manufacturability with performance.",
    role: "Thermal design / testing",
    tools: "CAD / simulation / fabrication",
    images: ["images/heat-exchanger.svg", "images/heat-exchanger-detail.svg"],
    youtube: ""
  },
  {
    id: "bracket-system",
    title: "BRACKET SYSTEM",
    type: "DESIGN",
    year: "2024",
    image: "images/bracket-system.svg",
    description: "A lightweight structural bracket system designed for rapid manufacture and repeatable assembly.",
    role: "Mechanical design",
    tools: "CAD / FEA / manufacturing",
    images: ["images/bracket-system.svg", "images/bracket-system-cad.svg"],
    youtube: ""
  },
  {
    id: "laser-cutter",
    title: "LASER CUTTER",
    type: "FABRICATION",
    year: "2023",
    image: "images/laser-cutter.svg",
    description: "A fabrication workflow focused on precision cutting, fixture design and repeatable part production.",
    role: "Fabrication / process development",
    tools: "CAM / CNC / fixtures",
    images: ["images/laser-cutter.svg"],
    youtube: ""
  },
  {
    id: "vertical-turbine",
    title: "VERTICAL AXIS TURBINE",
    type: "RESEARCH",
    year: "2023",
    image: "images/vertical-turbine.svg",
    description: "An experimental vertical-axis turbine exploring compact energy generation and mechanical efficiency.",
    role: "Concept / prototype / testing",
    tools: "CAD / prototyping / testing",
    images: ["images/vertical-turbine.svg", "images/vertical-turbine-detail.svg"],
    youtube: ""
  }
];

const app = document.querySelector("#app");
document.querySelector("#year").textContent = new Date().getFullYear();

function projectCard(p, i) {
  return `
    <a class="project-card" href="#/project/${p.id}">
      <img class="project-image" src="${p.image}" alt="${p.title}">
      <div class="project-meta">
        <div>
          <div class="project-title">${String(i + 1).padStart(2,"0")} / ${p.title}</div>
          <div class="project-type">${p.type} / ${p.year}</div>
        </div>
        <div class="project-arrow">→</div>
      </div>
    </a>`;
}

function home() {
  app.innerHTML = `
    <section class="home-intro">
      <div class="profile-photo-wrap profile-photo-wrap--home">
        <img class="profile-photo" src="images/terrain-rover.svg" alt="Profile photo" onerror="this.hidden=true; this.nextElementSibling.hidden=false;">
        <div class="profile-photo-placeholder" hidden>ADD PROFILE PHOTO</div>
      </div>
      <div class="home-intro-copy">
        <div class="eyebrow">ENGINEERING / FABRICATION / EXPERIMENTS</div>
        <h1>ENGINEER / MAKER</h1>
        <p>Physical systems, machines and prototypes — from first sketch to working hardware.</p>
      </div>
    </section>
    <section class="section-label">
      <span>SELECTED PROJECTS</span>
      <span>01 — ${String(projects.length).padStart(2,"0")}</span>
    </section>
    <section class="project-grid">
      ${projects.map(projectCard).join("")}
    </section>`;
}

function youtubeId(value) {
  if (!value) return "";
  const input = value.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;

  try {
    const url = new URL(input);
    if (url.hostname.includes("youtu.be")) return url.pathname.slice(1).split("/")[0];
    if (url.searchParams.get("v")) return url.searchParams.get("v");
    const parts = url.pathname.split("/").filter(Boolean);
    const embedIndex = parts.indexOf("embed");
    if (embedIndex !== -1 && parts[embedIndex + 1]) return parts[embedIndex + 1];
    const shortsIndex = parts.indexOf("shorts");
    if (shortsIndex !== -1 && parts[shortsIndex + 1]) return parts[shortsIndex + 1];
  } catch (_) {}

  return "";
}

function projectPage(id) {
  const p = projects.find(x => x.id === id);
  if (!p) return home();

  app.innerHTML = `
    <article class="page">
      <section class="project-intro">
        <div>
          <div class="eyebrow">01 / ${String(projects.length).padStart(2,"0")}</div>
          <h1>${p.title}</h1>
          <div class="eyebrow">${p.type} / ${p.year}</div>
        </div>
        <div class="project-description">
          <p>${p.description}</p>
          <div class="specs">
            <div class="spec"><span>ROLE</span><span>${p.role}</span></div>
            <div class="spec"><span>TOOLS</span><span>${p.tools}</span></div>
            <div class="spec"><span>IMAGES</span><span>${p.images.length} / ADD AS MANY AS NEEDED</span></div>
          </div>
        </div>
      </section>

      <section class="project-video">
        <div class="video-header">
          <span class="eyebrow">MAIN VIDEO</span>
          <span class="video-note">YOUTUBE / FULL PROJECT</span>
        </div>
        ${youtubeId(p.youtube) ? `
          <div class="video-frame">
            <iframe
              src="https://www.youtube-nocookie.com/embed/${youtubeId(p.youtube)}?rel=0"
              title="${p.title} — main project video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
          </div>
        ` : `
          <div class="video-placeholder">
            <span>ADD YOUTUBE VIDEO</span>
            <small>Set the <code>youtube</code> field for this project to a YouTube URL or video ID.</small>
          </div>
        `}
      </section>

      <section class="case-collage">
        ${p.images.map((src, i) => `
          <figure class="collage-item item-${i + 1}">
            <img src="${src}" alt="${p.title} — image ${i + 1}" data-lightbox>
            <figcaption>${String(i + 1).padStart(2,"0")} / ${p.title}</figcaption>
          </figure>
        `).join("")}
      </section>

      <section class="copy-block">
        <div>
          <div class="eyebrow">PROJECT NOTES</div>
          <h2>DESIGN / DEVELOPMENT / FABRICATION</h2>
        </div>
        <div>
          <p>${p.description}</p>
        </div>
      </section>
      <a class="back" href="#/">← BACK TO PROJECTS</a>
    </article>`;
}

function simplePage(type) {
  const isAbout = type === "about";
  app.innerHTML = `
    <section class="prose-page ${isAbout ? "about-page" : "contact-page"}">
      <div class="eyebrow">${isAbout ? "ABOUT" : "CONTACT"}</div>
      ${isAbout ? `
        <div class="profile-photo-wrap profile-photo-wrap--about">
          <img class="profile-photo" src="images/profile.jpg" alt="Profile photo" onerror="this.hidden=true; this.nextElementSibling.hidden=false;">
          <div class="profile-photo-placeholder" hidden>ADD PROFILE PHOTO</div>
        </div>
        <h1>ENGINEER / MAKER</h1>
        <div class="about-copy">
          <p>I work across engineering, fabrication and experimental hardware. I enjoy turning rough ideas into physical systems through design, prototyping and testing.</p>
        </div>
      ` : `
        <div class="contact-copy">
          <p>For collaborations, engineering work, fabrication projects or just to talk about making things, get in touch.</p>
          <div class="contact-specs">
            <div class="spec"><span>EMAIL</span><span>hello@example.com</span></div>
            <div class="spec"><span>LOCATION</span><span>GERMANY</span></div>
          </div>
        </div>
      `}
    </section>`;
}

function route() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (parts[0] === "project") projectPage(parts[1]);
  else if (parts[0] === "about") simplePage("about");
  else if (parts[0] === "contact") simplePage("contact");
  else home();
}
window.addEventListener("hashchange", route);
let lightboxImages = [];
let lightboxIndex = 0;
let lightboxOverlay = null;

function openLightbox(images, index) {
  lightboxImages = images;
  lightboxIndex = index;

  lightboxOverlay = document.createElement("div");
  lightboxOverlay.className = "lightbox";
  lightboxOverlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">×</button>
    <button class="lightbox-prev" aria-label="Previous image">←</button>
    <figure class="lightbox-stage">
      <img class="lightbox-image" alt="">
      <figcaption class="lightbox-count"></figcaption>
    </figure>
    <button class="lightbox-next" aria-label="Next image">→</button>
  `;

  document.body.appendChild(lightboxOverlay);
  updateLightbox();

  lightboxOverlay.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightboxOverlay.querySelector(".lightbox-prev").addEventListener("click", e => {
    e.stopPropagation();
    previousLightboxImage();
  });
  lightboxOverlay.querySelector(".lightbox-next").addEventListener("click", e => {
    e.stopPropagation();
    nextLightboxImage();
  });

  lightboxOverlay.addEventListener("click", e => {
    if (e.target === lightboxOverlay) closeLightbox();
  });
}

function updateLightbox() {
  if (!lightboxOverlay || !lightboxImages.length) return;

  const image = lightboxOverlay.querySelector(".lightbox-image");
  const count = lightboxOverlay.querySelector(".lightbox-count");
  image.src = lightboxImages[lightboxIndex];
  image.alt = `Project image ${lightboxIndex + 1}`;
  count.textContent = `${String(lightboxIndex + 1).padStart(2, "0")} / ${String(lightboxImages.length).padStart(2, "0")}`;

  const hideControls = lightboxImages.length <= 1;
  lightboxOverlay.querySelector(".lightbox-prev").hidden = hideControls;
  lightboxOverlay.querySelector(".lightbox-next").hidden = hideControls;
}

function nextLightboxImage() {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  updateLightbox();
}

function previousLightboxImage() {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  updateLightbox();
}

function closeLightbox() {
  lightboxOverlay?.remove();
  lightboxOverlay = null;
  lightboxImages = [];
}

document.addEventListener("click", e => {
  const img = e.target.closest("[data-lightbox]");
  if (!img) return;

  const gallery = img.closest(".case-collage");
  const images = gallery
    ? [...gallery.querySelectorAll("[data-lightbox]")].map(item => item.src)
    : [img.src];

  const index = Math.max(0, images.indexOf(img.src));
  openLightbox(images, index);
});

document.addEventListener("keydown", e => {
  if (!lightboxOverlay) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextLightboxImage();
  if (e.key === "ArrowLeft") previousLightboxImage();
});
route();
