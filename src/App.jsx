import { useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MessagePanel from './components/MessagePanel.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { decodeFragment } from './utils/fragment.js';

export default function App() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const fragmentId = decodeFragment(hash);
    if (fragmentId) {
      document.getElementById(fragmentId)?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    if (previousPath.current !== pathname) {
      document.getElementById('main-content')?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services-pricing" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/t-c-s" element={<TermsPage />} />
          <Route path="/about-us" element={<Navigate to="/#about" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
      <MessagePanel />
    </>
  );
}
