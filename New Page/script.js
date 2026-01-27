const card = document.querySelector('.glass-card');

document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 20;
  const y = (window.innerHeight / 2 - e.clientY) / 20;

  card.style.transform = `
    rotateY(${x}deg)
    rotateX(${y}deg)
    translateZ(30px)
  `;
});

document.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateY(0) rotateX(0)';
});

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

const skills = document.querySelectorAll('.skill');

skills.forEach(skill => {
    const logo = document.createElement('img');
    logo.src = skill.dataset.logo;
    logo.classList.add('skill-logo');
    logo.style.position = 'absolute';
    logo.style.top = '-60px';
    logo.style.left = '50%';
    logo.style.transform = 'translateX(-50%)';
    logo.style.width = '50px';
    logo.style.height = '50px';
    logo.style.opacity = '0';
    logo.style.transition = 'opacity 0.3s, transform 0.3s';
    skill.appendChild(logo);

    skill.addEventListener('mouseenter', () => {
        logo.style.opacity = '1';
        logo.style.transform = 'translateX(-50%) translateY(-10px)';
    });
    skill.addEventListener('mouseleave', () => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateX(-50%) translateY(0)';
    });
});
