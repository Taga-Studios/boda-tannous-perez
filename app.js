import { invitation as i } from './content.js';
const root=document.querySelector('#invitation');
const venue=(title,v)=>`<section class="venue"><p class="eyebrow">${title}</p><h2>${v.name}</h2><p class="address">${v.address.join('<br>')}</p><p class="time">${v.time}</p><a class="map" target="_blank" rel="noreferrer" href="${v.mapUrl}">Ubicación <span>↗</span></a></section>`;
root.innerHTML=`
 <section class="hero"><div class="flourish">&</div><p class="eyebrow">Tenemos el honor de invitarte</p><h1><span>${i.couple.primary}</span><b>&</b><span>${i.couple.secondary}</span></h1><p class="date">${i.date.label}</p><p class="place">${i.location}</p><div class="envelope"><div class="photo"><img src="${i.assets.hero}" alt="Odarlis y Jose"></div><div class="flap"></div></div></section>
 <section class="intro"><p class="script">Nos elegimos</p><p>Y queremos compartir con ustedes nuestra felicidad en el día más importante de nuestra vida.</p></section>
 <section class="schedule"><p class="eyebrow">Itinerario</p><div><time>2:00 PM</time><span>Ceremonia · Holy Cross Catholic Church</span></div><div><time>3:30 PM</time><span>Recepción · Studio 1060 Event Venue</span></div></section>
 <section class="count"><p class="eyebrow">Faltan</p><div id="countdown" aria-label="Cuenta regresiva"></div></section>
 <section class="venues">${venue('Ceremonia',i.ceremony)}${venue('Recepción',i.reception)}</section>
 <section class="rsvp"><p class="script">Confirmación de asistencia</p><p>¿Podrás acompañarnos en nuestro gran día?</p><div class="options"><button>Sí, con mucho gusto</button><button>No podré asistir</button></div><button class="send">Confirmar asistencia</button></section>
 <footer>Odarlis & Jose · ${i.date.label}</footer>`;
const target=new Date(i.date.iso);const el=document.querySelector('#countdown');
function tick(){let s=Math.max(0,Math.floor((target-Date.now())/1000));const d=Math.floor(s/86400);s%=86400;const h=Math.floor(s/3600);s%=3600;const m=Math.floor(s/60);const sec=s%60;el.innerHTML=[[d,'Días'],[h,'Horas'],[m,'Min'],[sec,'Seg']].map(([v,l])=>`<div><b>${String(v).padStart(2,'0')}</b><small>${l}</small></div>`).join('');}tick();setInterval(tick,1000);
document.querySelectorAll('.options button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.options button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')}));
