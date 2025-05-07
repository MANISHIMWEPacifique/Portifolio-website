
  // Debounce function for performance optimization
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Log applied font for debugging
    const computedFont = window.getComputedStyle(document.body).fontFamily;
    console.log('Applied font:', computedFont);

    // Theme toggle functionality with switch icon
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
      body.setAttribute('data-theme', 'dark');
      themeIcon.classList.add('fa-toggle-on');
      themeIcon.classList.remove('fa-toggle-off');
    } else {
      body.setAttribute('data-theme', 'light');
      themeIcon.classList.add('fa-toggle-off');
      themeIcon.classList.remove('fa-toggle-on');
    }

    themeToggle.addEventListener('click', function () {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      if (newTheme === 'dark') {
        themeIcon.classList.add('fa-toggle-on');
        themeIcon.classList.remove('fa-toggle-off');
      } else {
        themeIcon.classList.add('fa-toggle-off');
        themeIcon.classList.remove('fa-toggle-on');
      }
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          try {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
            if (window.innerWidth <= 768) {
              navLinks.classList.remove('active');
              menuBtn.setAttribute('aria-expanded', 'false');
            }
          } catch (error) {
            console.error('Scroll error:', error);
          }
        }
      });
    });

    // Highlight active section in navigation
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    const highlightActiveSection = debounce(function () {
      let current = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });

      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
          item.classList.add('active');
        }
      });
    }, 100);

    window.addEventListener('scroll', highlightActiveSection);

    // Form validation and submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
          e.preventDefault();
          alert('Please fill out all fields.');
          return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
          e.preventDefault();
          alert('Please enter a valid email address.');
          return;
        }

        alert('Thank you for your message! You will receive a confirmation soon.');
      });
    }

    // Dynamic footer copyright year
    document.getElementById('footer-copyright')
      .textContent = `© ${new Date().getFullYear()} Manishimwe Pacifique. All rights reserved.`;
  });

