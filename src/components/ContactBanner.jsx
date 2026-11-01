import { Link } from 'react-router-dom';

export default function ContactBanner() {
  return (
    <section className="contact-banner">
      <div className="container contact-banner-inner">
        <div>
          <p className="eyebrow">Your car. Our attention.</p>
          <h2>
            Let’s bring out
            <br />
            its best.
          </h2>
        </div>
        <div>
          <p>
            Not sure where to start? Tell us about your car.
            <br />
            We’ll help you choose the right level of care.
          </p>
          <p>
            Based in Lightwater, offering mobile valeting and unit-based
            detailing across Surrey, Hampshire and Berkshire.
          </p>
          <Link className="button button-gold" to="/contact">
            Make an enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}
