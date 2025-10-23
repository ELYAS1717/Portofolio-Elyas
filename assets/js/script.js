/* main script for Elyas portfolio */
(() => {
  const themeToggleButtons = document.querySelectorAll('#themeToggle');
  const body = document.body;
  const yearNodes = ['year','year2','year3','year4','year5'];
  yearNodes.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = new Date().getFullYear();
  });

  // Theme init: check localStorage
  const stored = localStorage.getItem('elyas_theme');
  if(stored === 'light'){
    document.documentElement.classList.add('light');
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
    themeToggleButtons.forEach(b=>b.textContent='☀️');
  } else {
    document.documentElement.classList.remove('light');
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
    themeToggleButtons.forEach(b=>b.textContent='🌙');
  }

  function toggleTheme(){
    if(document.documentElement.classList.contains('light')){
      document.documentElement.classList.remove('light');
      localStorage.setItem('elyas_theme','dark');
      themeToggleButtons.forEach(b=>b.textContent='🌙');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('elyas_theme','light');
      themeToggleButtons.forEach(b=>b.textContent='☀️');
    }
  }

  themeToggleButtons.forEach(btn => btn.addEventListener('click', toggleTheme));

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if(menuToggle && navLinks){
    menuToggle.addEventListener('click', ()=>{
      if(navLinks.style.display === 'flex') navLinks.style.display = 'none';
      else navLinks.style.display = 'flex';
    });
  }

  // Nav shrink on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 30) navbar.style.backdropFilter = 'blur(8px)';
    else navbar.style.backdropFilter = 'blur(0px)';
  });

  // Gallery modal
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');

  function openModal(e){
    const node = e.currentTarget;
    const img = node.querySelector('img');
    const title = node.dataset.title || img.alt || '';
    const desc = node.dataset.desc || '';
    modalImg.src = img.src;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.setAttribute('aria-hidden','false');
  }

  galleryItems.forEach(it => it.addEventListener('click', openModal));
  galleryItems.forEach(it => it.addEventListener('keypress', e => {
    if(e.key === 'Enter') openModal({currentTarget: e.currentTarget});
  }));

  if(modalClose){
    modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  }
  if(modal){
    modal.addEventListener('click', (e)=>{
      if(e.target === modal) modal.setAttribute('aria-hidden','true');
    });
  }

  // Contact form handling (no backend) — just show a friendly alert
  window.handleContact = function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !email || !message){
      alert('Mohon lengkapi semua field.');
      return false;
    }
    // Here you can integrate an API (email/Google Forms) if needed.
    alert(`Terima kasih ${name}! Pesanmu sudah diterima (demo).`);
    e.target.reset();
    return false;
  }
  

})();
