/**
 * Benefits of AI in Frontend Development
 * Presentation Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressFill = document.getElementById("progressFill");
  const currentSlideEl = document.getElementById("currentSlide");
  const totalSlidesEl = document.getElementById("totalSlides");
  const presentation = document.querySelector(".presentation");

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Initialize
  totalSlidesEl.textContent = totalSlides;
  updateSlide();
  updateProgress();
  updateNavState();

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    const leavingSlide = slides[currentIndex];
    const enteringSlide = slides[index];
    const goingForward = index > currentIndex;

    // Clear direction classes from entering slide FIRST (before adding active)
    // so it doesn't get stuck with prev/next transform when navigating
    enteringSlide.classList.remove("prev", "next");

    // Update leaving slide - animate out to left (prev) or right (next)
    leavingSlide.classList.remove("active");
    leavingSlide.classList.add(goingForward ? "prev" : "next");

    currentIndex = index;

    // Now add active to entering slide
    enteringSlide.classList.add("active");

    updateSlide();
    updateProgress();
    updateNavState();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function updateSlide() {
    currentSlideEl.textContent = currentIndex + 1;
  }

  function updateProgress() {
    const progress = ((currentIndex + 1) / totalSlides) * 100;
    progressFill.style.width = `${progress}%`;
  }

  function updateNavState() {
    presentation.classList.toggle("first-slide", currentIndex === 0);
    presentation.classList.toggle(
      "last-slide",
      currentIndex === totalSlides - 1,
    );
  }

  // Button events
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
      case " ":
        e.preventDefault();
        nextSlide();
        break;
      case "ArrowLeft":
        e.preventDefault();
        prevSlide();
        break;
      case "Home":
        e.preventDefault();
        goToSlide(0);
        break;
      case "End":
        e.preventDefault();
        goToSlide(totalSlides - 1);
        break;
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  presentation.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  presentation.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true },
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  }
});
