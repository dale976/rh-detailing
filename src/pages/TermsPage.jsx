import { terms } from '../content/terms.js';
import PageMeta from '../components/PageMeta.jsx';
import { business } from '../content/business.js';

export default function TermsPage() {
  return (
    <>
      <PageMeta
        title="Terms & conditions | RH Detailing"
        description="RH Detailing’s terms for payments, deposits, cancellations and preparing for a mobile detailing appointment."
      />
      <div className="container terms-page">
        <header className="page-intro">
          <p className="eyebrow">
            <span />
            The practical details
          </p>
          <h1>
            Terms &<br />
            <span className="text-gold">conditions.</span>
          </h1>
          <p>Please read before arranging your appointment.</p>
        </header>
        <div className="terms-content">
          {terms.map(({ title, paragraphs }, index) => (
            <section key={title}>
              <span className="term-number">0{index + 1}</span>
              <div>
                <h2>{title}</h2>
                {paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </section>
          ))}
          <p className="terms-question">
            Questions before booking?{' '}
            <a href={business.emailHref}>Get in touch</a> and we’ll be happy to
            help.
          </p>
        </div>
      </div>
    </>
  );
}
