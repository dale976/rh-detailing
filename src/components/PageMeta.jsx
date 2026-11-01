import { useLocation } from 'react-router-dom';

const origin = 'https://www.rhdetailing.co.uk';
export default function PageMeta({ title, description, noindex = false }) {
  const { pathname } = useLocation();
  const canonical = `${origin}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {!noindex && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="RH Detailing" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${origin}/social-preview.jpg`} />
      <meta
        property="og:image:alt"
        content="RH Detailing — specialist vehicle care in Surrey"
      />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
