import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { business, navigation } from '../content/business.js';
import logo from '../assets/rh-detailing-wordmark.png';
import Icon from './Icon.jsx';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);
  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="RH Detailing home">
          <img src={logo} width="732" height="164" alt="RH Detailing" />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(({ label, to }) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <a className="header-phone" href={business.phoneHref}>
          {business.phone}
        </a>
        <button
          className="menu-toggle"
          ref={toggleRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span
            className={`menu-lines ${menuOpen ? 'is-open' : ''}`}
            aria-hidden="true"
          >
            <i />
            <i />
          </span>
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
      >
        {navigation.map(({ label, to }) => (
          <NavLink key={to} to={to} end={to === '/'}>
            {label}
          </NavLink>
        ))}
        <a href={business.phoneHref}>
          Call {business.phone}
          <Icon name="phone" />
        </a>
      </nav>
    </header>
  );
}
