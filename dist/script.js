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
const demoButton = document.querySelector('#demo-next');
const countLabel = document.querySelector('#reel-count');
const counterStatus = document.querySelector('#counter-status');
const counterView = document.querySelector('#counter-view');
const limitView = document.querySelector('#limit-view');
const ring = document.querySelector('.counter-ring');
let count = 18;
demoButton.addEventListener('click', () => {
  count = count >= 20 ? 18 : count + 1;
  const reachedLimit = count >= 20;
  countLabel.textContent = String(count);
  ring.style.background = `conic-gradient(#5e7055 0deg ${count / 20 * 360}deg, #e3e7dc ${count / 20 * 360}deg)`;
  counterView.hidden = reachedLimit;
  limitView.hidden = !reachedLimit;
  demoButton.innerHTML = reachedLimit ? 'Try the demo again <span aria-hidden="true">↺</span>' : 'Try it: count a video <span aria-hidden="true">+</span>';
  demoButton.setAttribute('aria-label', reachedLimit ? '20-video limit reached. Reset the demo.' : `Count another video. ${count} of 20 videos watched.`);
  counterStatus.textContent = `${20 - count} ${count === 19 ? 'video' : 'videos'} left. Make them count.`;
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
