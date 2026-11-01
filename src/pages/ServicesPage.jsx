import { Link } from 'react-router-dom';
import { services } from '../content/services.js';
import PageMeta from '../components/PageMeta.jsx';
import Icon from '../components/Icon.jsx';
import ContactBanner from '../components/ContactBanner.jsx';

export default function ServicesPage() {
  return (
    <>
      <PageMeta
        title="Services & pricing | RH Detailing"
        description="Compare enhancement details from £450, deep cleans from £175, mini valets from £90 and returning-customer maintenance from £75."
      />
      <section className="page-intro container pricing-intro">
        <p className="eyebrow">
          <span />
          Services & pricing
        </p>
        <h1>
          The right detail.
          <br />
          <span className="text-gold">For your car.</span>
        </h1>
        <p>
          From the everyday to the exceptional, choose a starting point.
          <br />
          We’ll help tailor the care to your vehicle.
        </p>
        <p className="pricing-note">
          Starting prices shown. Your vehicle’s size and condition determine the
          final quote, confirmed after assessment.
        </p>
      </section>
      <div className="container packages">
        {services.map((service) => (
          <article className="package" id={service.id} key={service.id}>
            <div className="package-overview">
              <p className="eyebrow">
                {service.number} / {service.category}
              </p>
              <div className="package-title-row">
                <h2>{service.name}</h2>
                <div className="package-price">
                  <span>From</span>
                  <strong>£{service.price}</strong>
                </div>
              </div>
              <p>{service.description}</p>
              {service.eligibility && (
                <p className="eligibility">{service.eligibility}</p>
              )}
              <Link
                className="button button-gold"
                to={`/contact?service=${service.id}`}
              >
                Enquire about this service
              </Link>
            </div>
            <div className="package-inclusions">
              <h3>What’s included</h3>
              <ul>
                {service.inclusions.map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
        <aside className="bespoke-note">
          <div>
            <p className="eyebrow">Something more specific?</p>
            <h2>Care that fits.</h2>
          </div>
          <div>
            <p>
              Looking for a concours detail, end-of-lease or pre-sale valet, or
              more extensive paint correction? Get in touch and we’ll discuss a
              package for your vehicle.
            </p>
            <Link className="text-link" to="/contact">
              Let’s find the right service
            </Link>
          </div>
        </aside>
        <p className="pricing-note">
          Please read our <Link to="/t-c-s">terms & conditions</Link>, including
          deposits and cancellation, before booking.
        </p>
      </div>
      <ContactBanner />
    </>
  );
}
