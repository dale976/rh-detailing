import { Link } from 'react-router-dom';
import { business, navigation } from '../content/business.js';
import logo from '../assets/rh-detailing-wordmark.png';
import SocialLinks from './SocialLinks.jsx';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link to="/" aria-label="RH Detailing home">
            <img src={logo} width="732" height="164" alt="RH Detailing" />
          </Link>
          <p>
            Care in every detail.
            <br />
            Pride in every finish.
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <nav aria-label="Footer navigation">
            {navigation.map(({ label, to }) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
            <Link to="/t-c-s">Terms & conditions</Link>
            <Link to="/privacy">Privacy notice</Link>
          </nav>
        </div>
        <div className="footer-contact">
          <p className="eyebrow">Let’s talk about your car</p>
          <a href={business.phoneHref}>{business.phone}</a>
          <a href={business.emailHref}>{business.email}</a>
          <p>
            {business.location}
            <br />
            Surrey · Hampshire · Berkshire
          </p>
          <SocialLinks />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} RH Detailing</span>
        <span>Established {business.established}. Driven by detail.</span>
      </div>
    </footer>
  );
}
