const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
  navbar.classList.toggle('mobile-active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-items a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('mobile-active');
  });
});