// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.3 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Carousel initializer
function initCarousel(carouselId, prevBtnId, nextBtnId) {
  const carousel = document.getElementById(carouselId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  let index = 0;
  const total = carousel.children.length;

  function updateSlide() {
    const offset = index * carousel.clientWidth;
    carousel.style.transform = `translateX(-${offset}px)`;
  }

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateSlide();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (index < total - 1) {
      index++;
      updateSlide();
    }
  });

  window.addEventListener("resize", updateSlide); // Keep carousel responsive
}

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize carousels
  initCarousel("carousel-1", "prevBtn-1", "nextBtn-1");
  initCarousel("carousel-2", "prevBtn-2", "nextBtn-2");
  initCarousel("carousel-3", "prevBtn-3", "nextBtn-3");

  // Zoomable Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  document.querySelectorAll("[data-zoom]").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");
    });
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxClose) {
      lightbox.classList.remove("flex");
      lightbox.classList.add("hidden");
      lightboxImg.src = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.classList.remove("flex");
      lightbox.classList.add("hidden");
      lightboxImg.src = "";
    }
  });
});
