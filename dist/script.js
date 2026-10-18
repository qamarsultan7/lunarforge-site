const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
const galleryButtons = [...document.querySelectorAll('.gallery-button')];
const galleryPanels = [...document.querySelectorAll('.screenshot-panel')];
galleryButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    galleryButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    galleryPanels.forEach(panel => { panel.hidden = panel.id !== button.getAttribute('aria-controls'); });
    document.querySelector('#gallery-count').textContent = `0${index + 1} / 03`;
    document.querySelector('#gallery-status').textContent = `Screenshot ${index + 1} of 3: ${button.textContent.trim().replace(/^\d+\s*/, '')}`;
  });
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
