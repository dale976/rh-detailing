import { useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { business } from '../content/business.js';
import { submitEnquiry, validateEnquiry } from '../lib/enquiries.js';

const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
export default function EnquiryForm({ compact = false, service = '' }) {
  const id = useId();
  const busy = useRef(false);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ kind: '', message: '' });
  const source = compact ? 'message-panel' : 'contact';
  const fields = compact
    ? [['name', 'Your name', 'name']]
    : [
        ['firstName', 'First name', 'given-name'],
        ['lastName', 'Last name', 'family-name'],
      ];

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy.current) return;
    const data = { ...values, source, service };
    const invalid = validateEnquiry(data);
    setErrors(invalid);
    if (Object.keys(invalid).length) {
      event.currentTarget
        .querySelector(`[name="${Object.keys(invalid)[0]}"]`)
        ?.focus();
      return;
    }
    busy.current = true;
    setStatus({ kind: 'sending', message: 'Sending your message…' });
    try {
      await submitEnquiry(data, { accessKey });
      setStatus({
        kind: 'success',
        message: 'Thank you. Your message has been sent. We’ll reply by email.',
      });
      setValues({
        firstName: '',
        lastName: '',
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setStatus({ kind: 'error', message: error.message });
    } finally {
      busy.current = false;
    }
  }
  function field(name, label, autocomplete, textarea = false) {
    const props = {
      id: `${id}-${name}`,
      name,
      value: values[name],
      required: true,
      maxLength: textarea
        ? 5000
        : name === 'email'
          ? 254
          : name === 'name'
            ? 200
            : 100,
      'aria-invalid': Boolean(errors[name]),
      'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
      onChange: (event) => {
        setValues((current) => ({ ...current, [name]: event.target.value }));
        setErrors((current) => ({ ...current, [name]: undefined }));
      },
    };
    return (
      <div className="enquiry-field" key={name}>
        <label htmlFor={props.id}>{label}</label>
        {textarea ? (
          <textarea {...props} rows={compact ? 4 : 6} />
        ) : (
          <input
            {...props}
            type={name === 'email' ? 'email' : 'text'}
            autoComplete={autocomplete}
          />
        )}
        {errors[name] && (
          <span className="field-error" id={`${id}-${name}-error`}>
            {errors[name]}
          </span>
        )}
      </div>
    );
  }
  return (
    <form
      className={`enquiry-form${compact ? ' enquiry-form-compact' : ''}`}
      onSubmit={handleSubmit}
    >
      {compact && !accessKey && (
        <p className="form-notice">
          Online messaging will be available soon. For now,{' '}
          <a href={business.phoneHref}>call us</a> or{' '}
          <a href={business.emailHref}>send an email</a>.
        </p>
      )}
      <div className="enquiry-names">
        {fields.map((args) => field(...args))}
      </div>
      {field('email', 'Email address', 'email')}
      {field('message', 'Your message', undefined, true)}
      <p className="form-privacy">
        We use your details to respond to your enquiry.{' '}
        <Link to="/privacy">Privacy notice</Link>.
      </p>
      <button
        className="button button-gold"
        type="submit"
        disabled={!accessKey || status.kind === 'sending'}
      >
        {status.kind === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      <p
        className={`form-status ${status.kind}`}
        role="status"
        aria-live="polite"
      >
        {status.message}
      </p>
    </form>
  );
}
