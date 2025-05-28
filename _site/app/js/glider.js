window.addEventListener("load", function () {
  const gliderEl = document.querySelector(".glider");
  if (!gliderEl) return;

  const glider = new Glider(gliderEl, {
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    dots: ".dots",
    scrollLock: true,
    arrows: {
      prev: ".glider-prev",
      next: ".glider-next",
    },
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });
  let currentIndex = 0;
  const totalSlides = glider.track.childElementCount;
  const slidesToShow = () =>
    glider.settings?.slidesToShow || glider.options?.slidesToShow || 1;

  function startAutoplay() {
    return setInterval(() => {
      const maxIndex = totalSlides - slidesToShow();
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      glider.scrollItem(currentIndex);
    }, 3000);
  }

  let autoplay = startAutoplay();

  // Pause on hover
  gliderEl.addEventListener("mouseover", () => {
    clearInterval(autoplay);
  });

  gliderEl.addEventListener("mouseout", () => {
    autoplay = startAutoplay();
  });
});
