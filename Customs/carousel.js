// -------------------------
// MUSIC (auto-start)
// -------------------------
const song = document.getElementById('birthday-song');

window.addEventListener('load', async () => {
    try {
        await song.play();
        console.log("Music playing ✔️");
    } catch (e) {
        console.log("Music blocked ❌", e);
    }
});

// -------------------------
// CAROUSEL SWIPE
// -------------------------
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);

let currentIndex = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

// Touch events
track.addEventListener('touchstart', touchStart);
track.addEventListener('touchmove', touchMove);
track.addEventListener('touchend', touchEnd);

// Mouse events for desktop dragging
track.addEventListener('mousedown', touchStart);
track.addEventListener('mousemove', touchMove);
track.addEventListener('mouseup', touchEnd);
track.addEventListener('mouseleave', () => { if (isDragging) touchEnd(); });

function touchStart(event) {
  startX = getX(event);
  isDragging = true;
  track.style.transition = 'none';
}

function touchMove(event) {
  if (!isDragging) return;
  const currentX = getX(event);
  const deltaX = currentX - startX;
  track.style.transform = `translateX(${prevTranslate + deltaX}px)`;
}

function touchEnd() {
  isDragging = false;
  const slideWidth = slides[0].getBoundingClientRect().width;
  const movedBy = prevTranslate - parseInt(track.style.transform.replace('translateX(', '').replace('px)', '')) || 0;

  if (movedBy > slideWidth / 4 && currentIndex < slides.length - 1) currentIndex++;
  if (movedBy < -slideWidth / 4 && currentIndex > 0) currentIndex--;

  setPositionByIndex();
}

function getX(event) {
  return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
}

function setPositionByIndex() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  currentTranslate = -currentIndex * slideWidth;
  prevTranslate = currentTranslate;
  track.style.transition = 'transform 0.3s ease-in-out';
  track.style.transform = `translateX(${currentTranslate}px)`;
}

// Responsive
window.addEventListener('resize', setPositionByIndex);
