// =========================================
// SMOOTH SCROLL & NAVIGATION
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // =========================================
  // MOBILE MENU TOGGLE
  // =========================================

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      // Animate menu icon
      const spans = menuToggle.querySelectorAll('span');
      if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // =========================================
  // HEADER SCROLL EFFECT
  // =========================================

  const header = document.querySelector('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
  });

  // =========================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // =========================================

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
  const animateElements = document.querySelectorAll('.project-card, .skill-category, .contact-card');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // =========================================
  // SKILL BARS ANIMATION ON SCROLL
  // =========================================

  const skillBarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          fill.style.animation = 'fillBar 1.5s ease-out forwards';
        });
        skillBarsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
    skillBarsObserver.observe(skillsSection);
  }

  // =========================================
  // PARALLAX EFFECT FOR HERO
  // =========================================

  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroContent = document.querySelector('.hero-content');
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
      }
    });
  }

  // =========================================
  // ACTIVE NAVIGATION LINK
  // =========================================

  const sections = document.querySelectorAll('.section, .hero');
  const navLinksItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // =========================================
  // CURSOR FOLLOW EFFECT (Desktop only)
  // =========================================

  if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      // Smooth cursor follow
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';

      requestAnimationFrame(animate);
    }
    animate();

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.borderColor = 'var(--color-accent)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.borderColor = 'var(--color-gray)';
      });
    });
  }

  // =========================================
  // TYPING EFFECT FOR HERO (Optional Enhancement)
  // =========================================

  const typingElement = document.querySelector('.hero-subtitle');
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    let index = 0;

    setTimeout(() => {
      function type() {
        if (index < text.length) {
          typingElement.textContent += text.charAt(index);
          index++;
          setTimeout(type, 30);
        }
      }
      type();
    }, 1000);
  }

  // =========================================
  // PERFORMANCE: Reduce animations on low-end devices
  // =========================================

  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
    document.documentElement.style.setProperty('--transition-slow', '0.3s ease');
    document.documentElement.style.setProperty('--transition-base', '0.2s ease');
  }
});

// =========================================
// ADD CUSTOM CURSOR STYLES
// =========================================

const style = document.createElement('style');
style.textContent = `
  .custom-cursor {
    position: fixed;
    width: 30px;
    height: 30px;
    border: 2px solid var(--color-gray);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.2s ease, border-color 0.2s ease;
    mix-blend-mode: difference;
  }

  .cursor-dot {
    position: fixed;
    width: 6px;
    height: 6px;
    background: var(--color-accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10001;
  }

  @media (max-width: 768px) {
    .custom-cursor,
    .cursor-dot {
      display: none;
    }
  }

  /* Mobile Menu Styles */
  @media (max-width: 768px) {
    .nav-links {
      position: fixed;
      top: 70px;
      right: -100%;
      width: 70%;
      height: calc(100vh - 70px);
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      flex-direction: column;
      padding: 2rem;
      box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
      transition: right 0.3s ease;
      align-items: flex-start;
      gap: 1.5rem;
    }

    .nav-links.active {
      right: 0;
    }

    .nav-links a {
      font-size: 1.1rem;
      width: 100%;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--color-light-gray);
    }

    .nav-cta {
      margin-top: 1rem;
      text-align: center;
    }
  }

  /* Active nav link styling */
  .nav-links a.active:not(.nav-cta) {
    color: var(--color-accent);
  }

  .nav-links a.active:not(.nav-cta)::after {
    width: 100%;
  }
`;
document.head.appendChild(style);
