<script>
  const carousel = document.getElementById('carousel');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const slideWidth = () => carousel.querySelector('.carousel__slide')?.offsetWidth || 300;

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: slideWidth() + 16, behavior: 'smooth' }); // +16 for gap
  });

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -(slideWidth() + 16), behavior: 'smooth' });
  });
</script>
