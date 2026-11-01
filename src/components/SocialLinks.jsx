import { socialLinks } from '../content/business.js';

export default function SocialLinks() {
  return (
    <div className="social-links" role="group" aria-label="Follow RH Detailing">
      {socialLinks.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`RH Detailing on ${label}`}
        >
          {label === 'Instagram' ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M14 21v-8h2.7l.4-3H14V8c0-.9.3-1.5 1.6-1.5h1.7V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H8v3h2.6v8H14Z" />
            </svg>
          )}
        </a>
      ))}
    </div>
  );
}
