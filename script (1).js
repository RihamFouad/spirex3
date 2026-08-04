(function(){
  const navbar = document.getElementById('navbar');
  const links = document.getElementById('navLinks');
  const runner = document.getElementById('navRunner');
  const anchors = links.querySelectorAll('a');
  const toggle = document.getElementById('menuToggle');
  const overlay = document.getElementById('mobileOverlay');

  // --- Shrink navbar on scroll ---
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });

  // --- Runner follows hovered / active link ---
  function moveRunner(el){
    if(!el) return;
    const linkBox = el.getBoundingClientRect();
    const parentBox = links.getBoundingClientRect();
    runner.style.width = linkBox.width + 'px';
    runner.style.transform = `translateX(${linkBox.left - parentBox.left}px)`;
    runner.classList.add('settled');
  }

  let activeLink = links.querySelector('a.active');
  moveRunner(activeLink);

  anchors.forEach(a => {
    a.addEventListener('mouseenter', () => moveRunner(a));
    a.addEventListener('click', (e) => {
      e.preventDefault();
      anchors.forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      activeLink = a;
      moveRunner(a);
    });
  });

  links.addEventListener('mouseleave', () => moveRunner(activeLink));
  window.addEventListener('resize', () => moveRunner(activeLink));

  // --- Mobile menu toggle ---
  function setMenu(open){
    toggle.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  let menuOpen = false;
  toggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    setMenu(menuOpen);
  });
  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      menuOpen = false;
      setMenu(false);
    });
  });

  // Close overlay if window is resized back to desktop
  window.addEventListener('resize', () => {
    if(window.innerWidth > 900 && menuOpen){
      menuOpen = false;
      setMenu(false);
    }
  });
})();
