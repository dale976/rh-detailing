import assert from 'node:assert/strict';
import test from 'node:test';
import { validateEnquiry, submitEnquiry } from '../src/lib/enquiries.js';

const valid = {
  firstName: ' Jo ',
  lastName: ' Smith ',
  email: ' jo@example.com ',
  message: ' Please quote for my car. ',
  source: 'contact',
  service: 'Deep clean',
};
const accepted = () =>
  new Response(JSON.stringify({ success: true }), { status: 200 });

test('requires real contact details, a valid email and a bounded message', () => {
  assert.deepEqual(validateEnquiry(valid), {});
  const errors = validateEnquiry({
    ...valid,
    firstName: ' ',
    lastName: '',
    email: 'invalid',
    message: ' ',
  });
  assert.deepEqual(Object.keys(errors), [
    'firstName',
    'lastName',
    'email',
    'message',
  ]);
  assert.ok(validateEnquiry({ ...valid, message: 'x'.repeat(5001) }).message);
  assert.ok(
    validateEnquiry({ ...valid, firstName: 'x'.repeat(101) }).firstName,
  );
});

test('message panel accepts one name while keeping email and message required', () => {
  assert.deepEqual(
    validateEnquiry({
      name: 'Jo Smith',
      email: 'jo@example.com',
      message: 'Hello',
      source: 'message-panel',
    }),
    {},
  );
  assert.ok(
    validateEnquiry({
      name: ' ',
      email: 'jo@example.com',
      message: 'Hello',
      source: 'message-panel',
    }).name,
  );
});

test('maps contact details and reply email into the Web3Forms request', async () => {
  let request;
  await submitEnquiry(valid, {
    accessKey: 'test-access-key',
    fetchImpl: async (url, options) => {
      request = { url, ...options };
      return accepted();
    },
  });
  assert.equal(request.url, 'https://api.web3forms.com/submit');
  const payload = JSON.parse(request.body);
  assert.equal(payload.name, 'Jo Smith');
  assert.equal(payload.first_name, 'Jo');
  assert.equal(payload.last_name, 'Smith');
  assert.equal(payload.email, 'jo@example.com');
  assert.equal(payload.message, 'Please quote for my car.');
  assert.equal(payload.service, 'Deep clean');
  assert.match(payload.subject, /Deep clean/);
});

test('missing configuration and invalid fields never send a request', async () => {
  let requests = 0;
  const fetchImpl = async () => {
    requests++;
    return accepted();
  };
  await assert.rejects(
    () => submitEnquiry(valid, { accessKey: '', fetchImpl }),
    (error) => error.code === 'not-configured',
  );
  await assert.rejects(
    () =>
      submitEnquiry({ ...valid, email: '' }, { accessKey: 'test', fetchImpl }),
    (error) => error.code === 'validation',
  );
  assert.equal(requests, 0);
});

test('only a successful HTTP response with provider success confirms sending', async () => {
  for (const response of [
    new Response(JSON.stringify({ success: false }), { status: 200 }),
    new Response(JSON.stringify({ success: true }), { status: 500 }),
    new Response('not json', { status: 200 }),
  ]) {
    await assert.rejects(() =>
      submitEnquiry(valid, {
        accessKey: 'test',
        fetchImpl: async () => response,
      }),
    );
  }
  await assert.rejects(
    () =>
      submitEnquiry(valid, {
        accessKey: 'test',
        fetchImpl: async () => {
          throw new TypeError('offline');
        },
      }),
    (error) => error.code === 'network',
  );
  await assert.rejects(
    () =>
      submitEnquiry(valid, {
        accessKey: 'test',
        fetchImpl: async () => new Response('{}', { status: 429 }),
      }),
    (error) => error.code === 'rate-limited',
  );
});
