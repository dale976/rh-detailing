const clean = (value) => (typeof value === 'string' ? value.trim() : '');
const failure = (code, message, fields) =>
  Object.assign(new Error(message), { code, fields });

export function validateEnquiry(fields) {
  const errors = {};
  const names =
    fields.source === 'message-panel' ? ['name'] : ['firstName', 'lastName'];
  for (const name of names) {
    if (
      !clean(fields[name]) ||
      clean(fields[name]).length > (name === 'name' ? 200 : 100)
    )
      errors[name] = 'Please enter your name (up to 100 characters per name).';
  }
  const email = clean(fields.email);
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Please enter a valid email address.';
  if (!clean(fields.message) || clean(fields.message).length > 5000)
    errors.message = 'Please enter a message of up to 5,000 characters.';
  return errors;
}

export async function submitEnquiry(
  fields,
  { accessKey, fetchImpl = fetch } = {},
) {
  const errors = validateEnquiry(fields);
  if (Object.keys(errors).length)
    throw failure('validation', 'Please check the highlighted fields.', errors);
  if (!clean(accessKey))
    throw failure(
      'not-configured',
      'Online messaging is temporarily unavailable. Please call or email us.',
    );
  const compact = fields.source === 'message-panel';
  const service = clean(fields.service)
    .replace(/[\r\n]/g, ' ')
    .slice(0, 150);
  const payload = {
    access_key: clean(accessKey),
    name: compact
      ? clean(fields.name)
      : `${clean(fields.firstName)} ${clean(fields.lastName)}`,
    ...(!compact && {
      first_name: clean(fields.firstName),
      last_name: clean(fields.lastName),
    }),
    email: clean(fields.email),
    message: clean(fields.message),
    service,
    source: compact ? 'Message panel' : 'Contact form',
    from_name: 'RH Detailing website',
    subject: service
      ? `RH Detailing enquiry: ${service}`
      : 'RH Detailing website enquiry',
  };
  let response;
  try {
    response = await fetchImpl('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw failure(
      'network',
      'Your message could not be sent. Please check your connection and try again, or call us.',
    );
  }
  if (response.status === 429)
    throw failure(
      'rate-limited',
      'Please wait a little before trying again, or contact us by phone or email.',
    );
  let result;
  try {
    result = await response.json();
  } catch {
    /* An unreadable response cannot confirm delivery. */
  }
  if (!response.ok || result?.success !== true)
    throw failure(
      'provider',
      'Your message could not be sent. Please try again, or contact us by phone or email.',
    );
}
