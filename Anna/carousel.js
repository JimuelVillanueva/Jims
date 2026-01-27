const balloonContainer = document.getElementById('balloons');
for (let i = 0; i < 50; i++) {  
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.left = Math.random() * 100 + '%';
  balloon.style.animationDuration = 4 + Math.random() * 2 + 's';  
  balloon.style.width = 30 + Math.random() * 20 + 'px';
  balloon.style.height = 50 + Math.random() * 20 + 'px';
  balloonContainer.appendChild(balloon);
}


const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
let currentIndex = 0, startX = 0, currentTranslate = 0, prevTranslate = 0, isDragging = false;

track.addEventListener('touchstart', touchStart);
track.addEventListener('touchmove', touchMove);
track.addEventListener('touchend', touchEnd);

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

window.addEventListener('resize', setPositionByIndex);

const sparkleBox = document.querySelector('.sparkles');

setInterval(() => {
  const s = document.createElement('span');
  s.textContent = '✨';
  s.style.left = Math.random() * 100 + '%';
  sparkleBox.appendChild(s);
  setTimeout(() => s.remove(), 4000);
}, 600);

document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    card.style.transform = `
      rotateY(${x / 18}deg)
      rotateX(${-y / 18}deg)
      scale(1.06)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  });
});

