 
// MOBILE MENU FUNCTIONALITY
 
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
  navbar.classList.toggle('mobile-active');
  // Animate hamburger icon
  hamburger.textContent = navbar.classList.contains('mobile-active') ? '✕' : '☰';
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-items a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('mobile-active');
    hamburger.textContent = '☰';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
    navbar.classList.remove('mobile-active');
    hamburger.textContent = '☰';
  }
});

 
// SMOOTH SCROLLING FOR ANCHOR LINKS
 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

 
// NAVBAR SCROLL EFFECT
 
let lastScroll = 0;
const navbarElement = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add shadow when scrolled
  if (currentScroll > 50) {
    navbarElement.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    navbarElement.style.boxShadow = 'none';
  }
  
  // Hide navbar on scroll down, show on scroll up
  if (currentScroll > lastScroll && currentScroll > 100) {
    navbarElement.style.transform = 'translateY(-100%)';
  } else {
    navbarElement.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});

// Add transition to navbar
navbarElement.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

 
// INTERSECTION OBSERVER FOR ANIMATIONS
 
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll('.skills > div, .project-featured, .project-card, .timeline-item');
animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

 
// SKILL CARDS STAGGER ANIMATION
 
const skillCards = document.querySelectorAll('.skills > div');
skillCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

 
// PROJECT OVERLAY ACCESSIBILITY
 
const projectCards = document.querySelectorAll('.project-featured, .project-card');
projectCards.forEach(card => {
  const overlay = card.querySelector('.project-overlay');
  
  // Make overlay visible on focus for keyboard navigation
  card.addEventListener('focusin', () => {
    if (overlay) overlay.style.opacity = '1';
  });
  
  card.addEventListener('focusout', () => {
    if (overlay) overlay.style.opacity = '0';
  });
  
  // Make entire card clickable to primary link
  card.style.cursor = 'pointer';
  card.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A') {
      const primaryLink = card.querySelector('.project-links a.primary, .project-links a');
      if (primaryLink) primaryLink.click();
    }
  });
});

 
// LOADING ANIMATION
 
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

 
// BACK TO TOP BUTTON FUNCTIONALITY
 
const backToTopBtn = document.querySelector('.footer-back-to-top a');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

 
// TYPING EFFECT FOR HERO TEXT
 
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
  const text = heroTitle.innerHTML;
  heroTitle.innerHTML = '';
  heroTitle.style.opacity = '1';
  
  let charIndex = 0;
  const typeSpeed = 50;
  
  function typeWriter() {
    if (charIndex < text.length) {
      heroTitle.innerHTML = text.slice(0, charIndex + 1);
      charIndex++;
      setTimeout(typeWriter, typeSpeed);
    }
  }
  
  // Start typing after a short delay
  setTimeout(typeWriter, 500);
}

 
// DYNAMIC YEAR IN FOOTER
 
const copyrightText = document.querySelector('.footer-copyright p');
if (copyrightText && copyrightText.textContent.includes('2025')) {
  const currentYear = new Date().getFullYear();
  copyrightText.textContent = copyrightText.textContent.replace('2025', currentYear);
}

 
// LAZY LOADING FOR IMAGES
 
const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
      
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

 
// COPY EMAIL TO CLIPBOARD
 
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
  link.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const email = link.getAttribute('href').replace('mailto:', '');
    
    navigator.clipboard.writeText(email).then(() => {
      // Show temporary tooltip
      const tooltip = document.createElement('div');
      tooltip.textContent = 'Email copied!';
      tooltip.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease;
      `;
      
      document.body.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => tooltip.remove(), 300);
      }, 2000);
    });
  });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);