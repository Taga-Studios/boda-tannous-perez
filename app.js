import { invitation as i } from './content.js';

const root = document.querySelector('#invitation');
const mapLink = (url) => url ? `<a class="map-link" target="_blank" rel="noreferrer" href="${url}">Ubicación <span>↗</span></a>` : '';
const schedule = i.itinerary.map(([time, label]) => `<li><time>${time}</time><span>${label}</span></li>`).join('');

root.innerHTML = `
  <header class="hero">
    <div class="hero-art" aria-hidden="true">
      <img class="hero-paper" src="${i.assets.paper}" alt="">
      <img class="hero-envelope" src="${i.assets.envelope}" alt="">
      <img class="hero-photo" src="${i.assets.couple}" alt="">
      <img class="hero-flowers" src="${i.assets.flowers}" alt="">
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

    <section class="venue section" id="ceremonia">
      <p class="eyebrow">Ceremonia</p><h2>${i.ceremony.name}</h2>
      <p class="address">${i.ceremony.address.join('<br>')}</p>
      <p class="time">Hora: ${i.ceremony.time}</p>${mapLink(i.ceremony.mapUrl)}
    </section>

    <section class="itinerary section">
      <p class="eyebrow">Itinerario</p><ol>${schedule}</ol>
    </section>

    <section class="dress section"><p class="eyebrow">Dress code</p><h2>Formal de noche</h2><p>${i.dressCode}</p><p class="small-note">${i.dressNote}</p></section>
    <section class="message section"><span class="flourish" aria-hidden="true">❦</span><p>${i.welcome}</p></section>
    <section class="gifts section"><p class="eyebrow">Regalos</p><p>${i.giftMessage}</p></section>

    <section class="countdown-section section"><p class="eyebrow">Faltan</p><div id="countdown" aria-live="polite" aria-label="Cuenta regresiva"></div><p class="count-caption">Para nuestro gran día</p></section>

    <section class="rsvp section" id="confirmar">
      <p class="eyebrow">Confirmación de asistencia</p><h2>¿Podrás acompañarnos<br>en nuestro gran día?</h2>
      <form id="rsvp-form">
        <label>Nombre y apellido<input name="name" autocomplete="name" required></label>
        <fieldset><legend>Tu respuesta</legend><label><input type="radio" name="attendance" value="yes" required> Sí, con mucho gusto</label><label><input type="radio" name="attendance" value="no"> No podré asistir</label></fieldset>
        <button type="submit">Confirmar asistencia</button><p class="form-status" id="form-status" role="status"></p>
      </form><p class="deadline">${i.rsvpDeadline}</p>
    </section>
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

const form = document.querySelector('#rsvp-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (i.rsvpUrl) window.open(i.rsvpUrl, '_blank', 'noopener');
  else document.querySelector('#form-status').textContent = 'Gracias. La confirmación quedará lista al añadir un enlace de formulario en content.js.';
});

if (i.musicUrl) {
  const audio = new Audio(i.musicUrl); const button = document.querySelector('#music-button'); button.hidden = false;
  button.addEventListener('click', () => { if (audio.paused) { audio.play(); button.classList.add('playing'); } else { audio.pause(); button.classList.remove('playing'); } });
}
