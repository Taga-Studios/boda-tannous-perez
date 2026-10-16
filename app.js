import { invitation as i } from './content.js';

const root = document.querySelector('#invitation');
const mapLink = (url) => url ? `<a class="map-link" target="_blank" rel="noreferrer" href="${url}">Ubicación <span>↗</span></a>` : '';
const schedule = i.itinerary.map(([time, label]) => `<li><time>${time}</time><span>${label}</span></li>`).join('');

root.innerHTML = `
  <header class="hero" aria-label="Sobre de la invitación">
    <img class="hero-paper" src="${i.assets.paper}" alt="">
    <div class="callas callas-left" aria-hidden="true"><img src="${i.assets.flowers}" alt=""></div>
    <div class="callas callas-right" aria-hidden="true"><img src="${i.assets.flowers}" alt=""></div>
    <div class="envelope-tableau">
      <img class="envelope-shell" src="${i.assets.envelope}" alt="Sobre color vino">
      <img class="envelope-photo" src="${i.assets.couple}" alt="Fotografía de la pareja">
      <span class="wax-seal" aria-hidden="true">O<span>J</span></span>
    </div>
    <button class="music" id="music-button" hidden type="button" aria-label="Reproducir nuestra canción">♫ <span>Dale play para escuchar<br>nuestra canción</span></button>
  </header>

  <main>
    <section class="cover section">
      <p class="eyebrow">Tenemos el honor de invitarte a la boda de</p>
      <h1><span>${i.couple.primary}</span><b>&</b><span>${i.couple.secondary}</span></h1>
      <p class="date">${i.date.label}</p><p class="place">${i.location}</p>
      <span class="ornament" aria-hidden="true">❦</span>
    </section>

    <section class="venue section layered ceremony" id="ceremonia"><img class="circle" src="assets/source/5672fca60c7cc4221d87cd5e7274d85f.png" alt=""><p class="eyebrow">Ceremonia</p><h2>${i.ceremony.name}</h2><p class="address">${i.ceremony.address.join('<br>')}</p><p class="time">Hora: ${i.ceremony.time}</p>${mapLink(i.ceremony.mapUrl)}</section>
    <section class="itinerary section layered"><img class="wide-photo" src="assets/source/2076ec9d18adfcb4d8d90869a1872e3b.jpg" alt=""><img class="itinerary-art" src="assets/source/7842638da60aa8819ee3a54635bd4dfe.png" alt=""><p class="eyebrow">Itinerario</p><ol>${schedule}</ol></section>
    <section class="dress section layered"><img class="circle" src="assets/source/5672fca60c7cc4221d87cd5e7274d85f.png" alt=""><img class="dress-art" src="assets/source/6ffd2d6f0b5e8be8e8fbee200adec567.png" alt=""><div class="dress-card"><p class="eyebrow">Dress code</p><h2>Formal de noche</h2><p>${i.dressCode}</p><p class="small-note">${i.dressNote}</p></div></section>
    <section class="message section"><span class="flourish" aria-hidden="true">❦</span><p>${i.welcome}</p></section>
    <section class="gifts section layered"><img class="gift-art" src="assets/source/2e40c67670812ad3cde88adcb5301f22.png" alt=""><p>${i.giftMessage}</p><div class="gift-card"><span>R</span><b>EGALOS</b></div></section>
    <section class="countdown-section section"><p class="eyebrow">Faltan</p><div id="countdown" aria-live="polite" aria-label="Cuenta regresiva"></div><p class="count-caption">Para nuestro gran día</p></section>
    <section class="rsvp section layered" id="confirmar"><img class="rsvp-art" src="assets/source/b96e7809c0e7cee6c915061a579a1451.png" alt=""><img class="rsvp-photo" src="assets/source/2076ec9d18adfcb4d8d90869a1872e3b.jpg" alt=""><span class="rsvp-ornament" aria-hidden="true">❦</span><p class="deadline">${i.rsvpDeadline}</p></section>
  </main>
  <footer>${i.couple.primary} &amp; ${i.couple.secondary} · ${i.date.label}</footer>
`;

const countdown = document.querySelector('#countdown');
function updateCountdown() {
  let seconds = Math.max(0, Math.floor((new Date(i.date.iso) - Date.now()) / 1000));
  const values = [[Math.floor(seconds / 86400), 'Días'], [Math.floor(seconds % 86400 / 3600), 'Horas'], [Math.floor(seconds % 3600 / 60), 'Min'], [seconds % 60, 'Seg']];
  countdown.innerHTML = values.map(([value, label]) => `<div><b>${String(value).padStart(2, '0')}</b><small>${label}</small></div>`).join('');
}
updateCountdown(); setInterval(updateCountdown, 1000);

if (i.musicUrl) {
  const audio = new Audio(i.musicUrl); const button = document.querySelector('#music-button'); button.hidden = false;
  button.addEventListener('click', () => { if (audio.paused) { audio.play(); button.classList.add('playing'); } else { audio.pause(); button.classList.remove('playing'); } });
}
