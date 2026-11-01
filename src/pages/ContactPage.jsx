import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { business } from '../content/business.js';
import { services } from '../content/services.js';
import interior from '../assets/detailing-finish-1280.webp';
import interiorSmall from '../assets/detailing-finish-640.webp';
import EnquiryForm from '../components/EnquiryForm.jsx';
import PageMeta from '../components/PageMeta.jsx';

export default function ContactPage() {
  const [params] = useSearchParams();
  // Match the static HTML on first render, then apply enquiry query parameters.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const service = ready
    ? services.find((item) => item.id === params.get('service'))
    : undefined;
  const subject = service
    ? `Enquiry: ${service.name}`
    : 'Vehicle detailing enquiry';
  const emailHref = `${business.emailHref}?subject=${encodeURIComponent(subject)}`;

  return (
    <>
      <PageMeta
        title="Contact | RH Detailing, Lightwater"
        description="Discuss your vehicle with RH Detailing. Call 07453 290694 or email rhdetailing@outlook.com. Serving Surrey, Hampshire and Berkshire."
      />
      <header className="page-intro container contact-intro">
        <p className="eyebrow">
          <span />
          Start a conversation
        </p>
        <h1>
          Your car deserves
          <br />
          <span className="text-gold">that extra care.</span>
        </h1>
        <p className="contact-lead">
          Tell us what you drive and what you have in mind.
          <br />
          We’ll take it from there.
        </p>
        {service && (
          <div className="selected-service">
            <span className="eyebrow">Your selected service</span>
            <p>
              {service.name} <span>from £{service.price}</span>
            </p>
            <Link to="/services-pricing">Compare services</Link>
          </div>
        )}
      </header>
      <section className="container contact-page" aria-label="Contact details">
        <div className="contact-page-copy">
          <div className="contact-form-card">
            <h2>Tell us about your car.</h2>
            <p>
              Include its make, model, condition and your location so we can
              recommend the right care.
            </p>
            <EnquiryForm service={service?.name} />
          </div>
          <div className="contact-methods">
            <a href={business.phoneHref}>
              <div>
                <span className="eyebrow">Give us a call</span>
                <strong>{business.phone}</strong>
              </div>
            </a>
            <a href={emailHref}>
              <div>
                <span className="eyebrow">Send an email</span>
                <strong>{business.email}</strong>
              </div>
            </a>
          </div>
          <p className="email-note">
            Prefer to speak directly? Call or email using the details above.
          </p>
          <div className="contact-location">
            <div>
              <h2>{business.location}</h2>
              <p>
                Mobile valeting and unit-based detailing across Surrey,
                Hampshire and Berkshire. Contact us to confirm availability in
                your area.
              </p>
            </div>
          </div>
        </div>
        <aside className="contact-aside">
          <figure>
            <img
              src={interior}
              srcSet={`${interiorSmall} 640w, ${interior} 1280w`}
              sizes="(max-width: 800px) 100vw, 40vw"
              loading="lazy"
              alt="Carefully finished Mercedes cabin with clean leather and dashboard"
              width="1280"
              height="720"
            />
            <figcaption>Care in every detail.</figcaption>
          </figure>
          <div className="before-visit">
            <p className="eyebrow">Before we get started</p>
            <p>
              For mobile appointments, we ask for access to an outdoor tap and
              an electrical socket. Please clear personal belongings and rubbish
              from your car.
            </p>
            <Link className="text-link" to="/t-c-s">
              Read our terms & conditions
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}
