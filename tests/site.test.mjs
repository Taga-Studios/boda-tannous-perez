import assert from 'node:assert/strict';
import { invitation } from '../content.js';

assert.equal(invitation.couple.primary, 'Odarlis Peréz');
assert.equal(invitation.couple.secondary, 'Jose Tannous');
assert.equal(invitation.date.label, '09 de Enero 2027');
assert.equal(invitation.ceremony.name, 'Holy Cross Catholic Church');
assert.ok(invitation.ceremony.mapUrl.startsWith('https://maps.app.goo.gl/'));
console.log('content configuration is complete');
