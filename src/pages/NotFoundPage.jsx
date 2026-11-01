import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta.jsx';

export default function NotFoundPage() {
  return (
    <section className="container page-intro not-found">
      <PageMeta
        title="Page not found | RH Detailing"
        description="This page could not be found. Explore RH Detailing’s services or get in touch."
      />
      <p className="eyebrow">404 / Page not found</p>
      <h1>
        Let’s get you
        <br />
        <span className="text-gold">back on track.</span>
      </h1>
      <p>We couldn’t find that page. Our services are a good place to start.</p>
      <Link className="button button-gold" to="/">
        Back to home
      </Link>
    </section>
  );
}
