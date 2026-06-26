const faders = document.querySelectorAll(".fade-in-on-scroll");

const observerOptions = {
  threshold: 0.2,
};

const onIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(onIntersection, observerOptions);

faders.forEach((el) => observer.observe(el));

const siteHeader = document.querySelector(".site-header");

const updateHeaderSize = () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeaderSize();
window.addEventListener("scroll", updateHeaderSize, { passive: true });

// ABOUT SECTION INTERACTION
const aboutTabs = document.querySelectorAll(".about-tab");
const aboutPanels = {
  hobbies: document.getElementById("about-hobbies"),
  interests: document.getElementById("about-interests"),
  aspirations: document.getElementById("about-aspirations"),
  "language-strengths": document.getElementById("about-language-strengths"),
  "school-projects": document.getElementById("about-school-projects"),
};

const aboutSound = document.getElementById("about-sound");

aboutTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const topic = tab.dataset.topic;

    // play click sound (if loaded)
    if (aboutSound) {
      aboutSound.currentTime = 0;
      aboutSound.play().catch(() => {
        // ignore autoplay errors if browser blocks sound
      });
    }

    // activate clicked tab
    aboutTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    // show matching panel
    Object.values(aboutPanels).forEach((panel) =>
      panel.classList.remove("active")
    );
    const activePanel = aboutPanels[topic];
    if (activePanel) {
      activePanel.classList.add("active");
    }
  });
});

const galleries = {
  "cowboy-standoff": {
    title: "Cowboy Standoff",
    src: "demos/unity/stickman-shooter-unity.mp4",
  },
  "bri-hoops": {
    title: "Bri Hoops",
    src: "demos/unity/bri-hoops-final-demo-unity.mp4",
  },
  "backyard-cinema": {
    title: "Backyard Cinema",
    src: "demos/websites/BackyardCinemaDemo.mp4",
  },
  "polaroid-print": {
    title: "Polaroid Prints",
    src: "demos/websites/polaroid-print-personal-project.mp4",
  },
  "nearby-memories": {
    title: "NearbyMemories App",
    src: "nearbyMemories.mp4",
  },
};

const modal = document.getElementById("slideshow-modal");
const modalTitle = document.getElementById("modal-title");
const modalMedia = document.getElementById("modal-media");
const modalCounter = document.getElementById("modal-counter");
const modalDots = document.getElementById("modal-dots");
const modalStage = document.querySelector(".modal-stage");
const galleryButtons = document.querySelectorAll("[data-gallery]");
let activeGallery = null;

const renderGalleryItem = () => {
  if (!activeGallery) return;

  modalTitle.textContent = activeGallery.title;
  modalMedia.innerHTML = "";

  const video = document.createElement("video");
  video.src = activeGallery.src;
  video.controls = true;
  video.autoplay = true;
  video.muted = true;
  video.playsInline = true;
  modalMedia.appendChild(video);

  modalCounter.textContent = "Demo preview";
  modalDots.innerHTML = "";
};

const openGallery = (galleryKey) => {
  activeGallery = galleries[galleryKey];
  if (!activeGallery || !modal) return;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  renderGalleryItem();
};

const closeGallery = () => {
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalMedia.innerHTML = "";
  activeGallery = null;
};

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => openGallery(button.dataset.gallery));
  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGallery(button.dataset.gallery);
    }
  });
});

document
  .querySelector("[data-modal-prev]")
  ?.addEventListener("click", closeGallery);

document
  .querySelector("[data-modal-next]")
  ?.addEventListener("click", closeGallery);

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeGallery);
});

document.addEventListener("keydown", (event) => {
  if (!activeGallery) return;

  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") closeGallery();
});
