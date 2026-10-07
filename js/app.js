const projects = [
  {
    id: "project001",
    title: "Project001",
    type: "ENGINEERING",
    year: "2026",
    image: "images/robotic-arm.svg",
    description: "Project001 came about from the idea of visualizing and expressing our innermost feelings and thoughts through a different medium. Natural language (english specially) often fails to convey the complex emotions. There’s ambiguity, tones, mood. On the other half is the person whom interprets, adding another dimension. Project001 hopes to create that bridge and challenge what it means to express.",
    shortessary: "asf",
    role: "Mechanical design / prototyping / controls",
    tools: "CAD / machining / embedded systems",
    images: ["images/robotic-arm.svg", "images/robotic-arm-detail.svg", "images/robotic-arm-cad.svg"],
    youtube: "" // Paste the YouTube video URL or video ID here
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
        <img class="profile-photo" src="images/profile.png" alt="Profile photo" onerror="this.hidden=true; this.nextElementSibling.hidden=false;">
        <div class="profile-photo-placeholder" hidden>ADD PROFILE PHOTO</div>
      </div>
      <div class="home-intro-copy">
        <div class="eyebrow">Engineering / Art </div>
        <h1>Christopher Perez</h1>
        <p>Bringing the world closer.</p>
      </div>
    </section>
    <section class="section-label">
      <span>PROJECTS</span>
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
             <div class="spec"><span><a href="https://001medialabs-glitch.github.io/project001/" target="_blank" >DOCUMENTATION LINK</a></span></div>
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
          <p>${p.shortessary}</p>
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
          <img class="profile-photo" src="images/profile.png" alt="Profile photo" onerror="this.hidden=true; this.nextElementSibling.hidden=false;">
          <div class="profile-photo-placeholder" hidden>ADD PROFILE PHOTO</div>
        </div>
        <h1>ENGINEER / MAKER</h1>
        <div class="about-copy">
          <p> 

I'm Chris and I like to build things. Some things are small, some are big. I use technology to create things that touch the edges of reality. All projects are open source.
</p>
        </div>
      ` : `
        <div class="contact-copy">
          <p>For collaborations, engineering work, OR just to talk about making things, get in touch.</p>
          <div class="contact-specs">
            <div class="spec"><span>EMAIL</span><span> 001medialabs@gmail.com</span></div>
            <span><a href="patreon.com/PartlyTrue_"> Patreon </span>
  
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
