import assert from 'node:assert/strict';
import test from 'node:test';
import { business } from '../src/content/business.js';
import { services } from '../src/content/services.js';

test('published packages retain the existing starting prices and coating inclusion', () => {
  assert.deepEqual(
    services.map(({ id, price }) => [id, price]),
    [
      ['enhancement-detail', 450],
      ['deep-clean', 175],
      ['mini-valet', 90],
      ['maintenance', 75],
    ],
  );
  assert.ok(services[0].inclusions.includes('3-year ceramic coating'));
  assert.match(services[3].eligibility, /returning customers.*initial clean/i);
});

test('enquiry destinations reach the existing business', () => {
  assert.equal(business.phoneHref, 'tel:+447453290694');
  assert.equal(business.emailHref, 'mailto:rhdetailing@outlook.com');
  assert.deepEqual(business.serviceAreas, ['Surrey', 'Hampshire', 'Berkshire']);
});
