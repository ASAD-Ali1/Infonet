/* ===== Header dropdown ===== */
(function initHeaderDropdown(){
  const toggle = document.getElementById('contactToggle');
  const menu = document.getElementById('contactDropdown');

  if (!toggle || !menu) return;

  const wrapper = toggle.closest('.dropdown');
  let hoverTimer;

  function openMenu() {
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    if (menu.hidden) openMenu(); else closeMenu();
  }

  // Hover: open immediately, close after short delay
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimer);
      openMenu();
    });
    wrapper.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(closeMenu, 250); // linger before closing
    });
  }

  // Touch/mobile fallback: toggle on tap/click when hover isn't available
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // close on outside click
  document.addEventListener('click', (e) => {
    if (!menu.hidden && !menu.contains(e.target) && e.target !== toggle) {
      closeMenu();
    }
  });

  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Route dropdown clicks to panels
  menu.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('.js-nav-target');
    if (!targetBtn) return;
    const id = targetBtn.getAttribute('data-target');
    if (id) {
      activate(id);
      closeMenu();
    }
  });
})();

/* ===== Panels activation ===== */
const tabs = Array.from(document.querySelectorAll('[role="tab"]')); // none now, safe
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

function activate(id){
  // If any legacy tabs exist, sync them (no-op otherwise)
  tabs.forEach(t => t.setAttribute('aria-selected', t.getAttribute('aria-controls') === id));
  panels.forEach(p => p.classList.toggle('active', p.id === id));
  document.getElementById('main').scrollIntoView({ behavior:'smooth', block:'start' });
}

/* ===== Demo confirmation (unchanged) ===== */
function demoConfirm(e, form){
  e.preventDefault();

  const missing = Array.from(form.querySelectorAll('[required]')).some(el => {
    if (el.type === 'file') return el.files.length === 0;
    return !el.value || (el.type === 'email' && !el.value.includes('@'));
  });

  const ok = form.querySelector('.confirm');
  const err = form.querySelector('.error');

  if (missing) {
    if (err) { err.style.display = 'block'; }
    if (ok)  { ok.style.display = 'none'; }
    return;
  }

  if (ok) { ok.style.display = 'block'; }
  if (err) { err.style.display = 'none'; }
}
window.demoConfirm = demoConfirm;
