import assert from 'node:assert/strict';
import { invitation } from '../content.js';

assert.equal(invitation.couple.primary, 'Odarlis Peréz');
assert.equal(invitation.couple.secondary, 'Jose Tannous');
assert.equal(invitation.date.label, '09 de Enero 2027');
assert.equal(invitation.ceremony.name, 'Holy Cross Catholic Church');
assert.ok(invitation.ceremony.mapUrl.startsWith('https://maps.app.goo.gl/'));
assert.equal(invitation.itinerary[0][0], invitation.ceremony.time, 'ceremony time must match the itinerary');
assert.equal(invitation.itinerary.length, 3);
for (const asset of Object.values(invitation.assets)) {
  assert.ok(asset.startsWith('assets/art/'), `unexpected asset path: ${asset}`);
}
assert.equal(typeof invitation.rsvpUrl, 'string');

// The first viewport is an independently authored envelope tableau.
const markup = await import('node:fs/promises').then(({ readFile }) => readFile(new URL('../app.js', import.meta.url), 'utf8'));
assert.match(markup, /envelope-tableau/);
assert.match(markup, /envelope-photo/);
assert.match(markup, /wax-seal/);
console.log('content configuration and envelope cover are complete');
