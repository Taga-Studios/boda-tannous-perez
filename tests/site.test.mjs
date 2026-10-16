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
console.log('content configuration is complete');
