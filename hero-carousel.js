const heroCarousel = document.querySelector(".hero-carousel");
const heroSlides = heroCarousel ? [...heroCarousel.querySelectorAll(".hero-product-photo")] : [];
let heroSlideIndex = 0;
let heroCarouselTimer;

function showNextHeroSlide() {
  if (heroSlides.length < 2) return;
  heroSlides[heroSlideIndex].classList.remove("is-active");
  heroSlides[heroSlideIndex].setAttribute("aria-hidden", "true");
  heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
  heroSlides[heroSlideIndex].classList.add("is-active");
  heroSlides[heroSlideIndex].setAttribute("aria-hidden", "false");
}

function startHeroCarousel() {
  if (heroSlides.length > 1 && !heroCarouselTimer) {
    heroCarouselTimer = window.setInterval(showNextHeroSlide, 9000);
  }
}

function stopHeroCarousel() {
  window.clearInterval(heroCarouselTimer);
  heroCarouselTimer = undefined;
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopHeroCarousel();
  else startHeroCarousel();
});

startHeroCarousel();
