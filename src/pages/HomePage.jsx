import InstagramGallery from '../components/InstagramGallery.jsx';
import { Link } from 'react-router-dom';
import { services } from '../content/services.js';
import hero from '../assets/detailing-studio.jpg';
import wash from '../assets/detailing-wash.jpg';
import interior from '../assets/detailing-finish.jpg';
import PageMeta from '../components/PageMeta.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import ContactBanner from '../components/ContactBanner.jsx';
import HeroMedia from '../components/HeroMedia.jsx';

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="RH Detailing | Paint correction & ceramic coatings in Surrey"
        description="Specialist paint correction, ceramic coatings and mobile valeting. Based in Lightwater, serving Surrey, Hampshire and Berkshire since 2021."
      />
      <section className="hero" aria-labelledby="hero-title">
        <HeroMedia
          poster={hero}
          alt="A Mercedes receiving a thorough snow-foam wash by RH Detailing"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <p className="eyebrow hero-eyebrow">
            <span />
            Specialist car care
          </p>
          <h1 id="hero-title">
            DETAILING.
            <br />
            DONE <em>PROPERLY.</em>
          </h1>
          <p className="hero-description">
            Restore the finish. Protect the feeling.
            <br />
            Paint correction, ceramic coatings and meticulous
            <br className="desktop-break" /> car care from someone who shares
            your passion.
          </p>
          <div className="button-row">
            <Link className="button button-gold" to="/services-pricing">
              Explore our services
            </Link>
            <Link className="button button-outline" to="/contact">
              Let’s talk about your car
            </Link>
          </div>
        </div>
        <div className="container hero-bottom">
          <span className="hero-location">
            <span>Lightwater, Surrey</span>
            <span className="gold-dot" aria-hidden="true">
              ·
            </span>
            <span>Est. 2021</span>
          </span>
        </div>
      </section>

      <section id="services" className="section container services-section">
        <div id="care-introduction" className="services-intro">
          <SectionHeading eyebrow="Care without compromise">
            Good looks.
            <br />
            <span className="text-gold">Lasting protection.</span>
          </SectionHeading>
          <p>
            Specialist paint correction, ceramic coatings and mobile valeting
            across Surrey, Hampshire and Berkshire. From a thorough refresh to a
            gloss-restoring detail, every service starts with understanding your
            car and what it needs.
          </p>
          <Link className="text-link" to="/services-pricing">
            All services & pricing
          </Link>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <p className="pricing-note">
          Starting prices shown. Your vehicle’s size and condition determine the
          final quote.
        </p>
      </section>

      <section id="about" className="about-section">
        <div className="container about-grid">
          <figure className="about-image">
            <img
              src={wash}
              alt="RH Detailing carefully washing a silver Mercedes on a customer's driveway"
              width="3840"
              height="2160"
              loading="lazy"
            />
            <figcaption>
              <span className="eyebrow">RH Detailing</span>
              <span>Passion, put into practice.</span>
            </figcaption>
          </figure>
          <div className="about-copy">
            <SectionHeading eyebrow="The person behind the polish">
              A passion for cars.
              <br />
              An eye for <span className="text-gold">detail.</span>
            </SectionHeading>
            <p>
              RH Detailing was founded in 2021, built on a background in
              prestige bodywork and a lifelong enthusiasm for looking after cars
              properly.
            </p>
            <p>
              With over a decade in the automotive industry and more than 14
              years of valeting and detailing experience, I understand paintwork
              beyond the surface. That knowledge shapes every assessment, every
              polishing stage and every finishing touch.
            </p>
            <p>
              Whether it’s your daily driver or your pride and joy, you’ll get
              honest advice, careful workmanship and a service tailored to your
              car.
            </p>
            <Link className="text-link" to="/contact">
              A personal approach. From the first conversation.
            </Link>
          </div>
        </div>
      </section>

      <section className="section container workmanship-section">
        <div className="services-intro">
          <SectionHeading eyebrow="More than the surface">
            Every detail.
            <br />
            Considered.
          </SectionHeading>
          <p>
            A careful wash, considered preparation and attention inside and out.
            The little things make the difference.
          </p>
        </div>
        <div className="workmanship-grid">
          <div className="process-list">
            {[
              [
                '01',
                'Understand',
                'We talk through your car, its condition and the result you’re looking for. Clear advice comes first.',
              ],
              [
                '02',
                'Refine',
                'From safe washing to machine polishing, we recommend the right approach for your vehicle.',
              ],
              [
                '03',
                'Protect',
                'Wax or ceramic protection helps preserve the finish, with maintenance to keep it looking its best.',
              ],
            ].map(([number, title, copy]) => (
              <div className="process-step" key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
          <figure className="workmanship-photo">
            <img
              src={interior}
              alt="Detailed Mercedes interior, including leather seats, steering wheel and dashboard"
              width="3840"
              height="2160"
              loading="lazy"
            />
            <figcaption>
              <span>01 / THE FINISHING TOUCHES</span>
              <span>Inside matters, too.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <InstagramGallery />
      <ContactBanner />
    </>
  );
}
