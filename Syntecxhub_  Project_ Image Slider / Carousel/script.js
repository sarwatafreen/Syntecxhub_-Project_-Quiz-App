// let currentIndex = 0;
// const slides = document.querySelectorAll('.slide');
// const dots = document.querySelectorAll('.dot');

// function showSlide(index) {
//     if (index >= slides.length) currentIndex = 0;
//     else if (index < 0) currentIndex = slides.length - 1;
//     else currentIndex = index;

//     slides.forEach(slide => slide.classList.remove('active'));
//     dots.forEach(dot => dot.classList.remove('active-dot'));

//     slides[currentIndex].classList.add('active');
//     dots[currentIndex].classList.add('active-dot');
// }

// document.getElementById('nextBtn').addEventListener('click', () => showSlide(currentIndex + 1));
// document.getElementById('prevBtn').addEventListener('click', () => showSlide(currentIndex - 1));

// // Auto-play
// setInterval(() => showSlide(currentIndex + 1), 5000);    


// Image list (high‑quality placeholder images)
const images = [
  "https://picsum.photos/id/1015/800/500",   // mountain landscape
  "https://picsum.photos/id/104/800/500",    // peaceful lake
  "https://picsum.photos/id/169/800/500",    // sunset over sea
  "https://picsum.photos/id/155/800/500" ,    // city architecture   
  "https://picsum.photos/id/10/800/400",   // Nature
  "https://picsum.photos/id/20/800/400",   // Tech
  "https://picsum.photos/id/30/800/400",   // City
  "https://picsum.photos/id/15/800/400",   // Leaves
  "https://picsum.photos/id/22/800/400",   // Coffee
  "https://picsum.photos/id/26/800/400"    // Architecture
];

let currentSlide = 0;
let autoInterval = null;
let autoActive = true;

// DOM elements
const slidesContainer = document.getElementById('slidesContainer');
const dotsContainer = document.getElementById('dotsContainer');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const toggleAutoBtn = document.getElementById('toggleAutoBtn');
const slideCounterSpan = document.getElementById('slideCounter');

// Build slides and dots
function buildSlider() {
  slidesContainer.innerHTML = '';
  images.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('slide');
    if (idx === currentSlide) img.classList.add('active');
    img.alt = `Slide ${idx + 1}`;
    slidesContainer.appendChild(img);
  });

  dotsContainer.innerHTML = '';
  images.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === currentSlide) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  updateCounter();
}

function updateCounter() {
  slideCounterSpan.textContent = `${currentSlide + 1} / ${images.length}`;
}

function updateActiveClasses() {
  const allSlides = document.querySelectorAll('.slide');
  const allDots = document.querySelectorAll('.dot');
  allSlides.forEach((slide, i) => {
    if (i === currentSlide) slide.classList.add('active');
    else slide.classList.remove('active');
  });
  allDots.forEach((dot, i) => {
    if (i === currentSlide) dot.classList.add('active');
    else dot.classList.remove('active');
  });
  updateCounter();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % images.length;
  updateActiveClasses();
  resetAutoTimer();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + images.length) % images.length;
  updateActiveClasses();
  resetAutoTimer();
}

function goToSlide(index) {
  currentSlide = index;
  updateActiveClasses();
  resetAutoTimer();
}

function startAutoPlay() {
  if (autoInterval) clearInterval(autoInterval);
  autoInterval = setInterval(() => {
    nextSlide();
  }, 3000);
}

function stopAutoPlay() {
  if (autoInterval) {
    clearInterval(autoInterval);
    autoInterval = null;
  }
}

function resetAutoTimer() {
  if (autoActive) {
    stopAutoPlay();
    startAutoPlay();
  }
}

function toggleAutoPlay() {
  autoActive = !autoActive;
  if (autoActive) {
    startAutoPlay();
    toggleAutoBtn.textContent = '⏸ Pause';
    toggleAutoBtn.style.background = '#eef2ff';
  } else {
    stopAutoPlay();
    toggleAutoBtn.textContent = '▶️ Play';
    toggleAutoBtn.style.background = '#e2e8f0';
  }
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
toggleAutoBtn.addEventListener('click', toggleAutoPlay);

// Initialise slider
buildSlider();
startAutoPlay();