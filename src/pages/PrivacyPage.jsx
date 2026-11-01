import PageMeta from '../components/PageMeta.jsx';
import { business } from '../content/business.js';
export default function PrivacyPage() {
  return (
    <div className="container terms-page">
      <PageMeta
        title="Privacy notice | RH Detailing"
        description="How RH Detailing handles website enquiries and Instagram content."
      />
      <header className="page-intro">
        <p className="eyebrow">Your information</p>
        <h1>
          Privacy <span className="text-gold">notice.</span>
        </h1>
      </header>
      <div className="privacy-copy">
        <h2>Website enquiries</h2>
        <p>
          RH Detailing uses the name, email address, message and selected
          service you provide to respond to your enquiry. Both the contact form
          and message panel send these details through Web3Forms to RH
          Detailing’s inbox. The message panel is an enquiry form, rather than a
          live chat service or automated assistant.
        </p>
        <p>
          Your draft stays in memory while this page is open. This website does
          not save your messages in browser storage. Messages received by email
          remain in RH Detailing’s email system for handling your enquiry.
        </p>
        <p>
          See{' '}
          <a
            href="https://web3forms.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Web3Forms’ privacy policy
          </a>{' '}
          for information about its processing.
        </p>
        <h2>Instagram content</h2>
        <p>
          When the Instagram gallery is connected, this website loads public
          posts and images through Behold and its media providers. Loading these
          resources shares technical information such as your IP address with
          those services. Opening a post takes you to Instagram, which has its
          own privacy policy.
        </p>
        <p>
          See{' '}
          <a
            href="https://behold.so/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Behold’s privacy policy
          </a>
          .
        </p>
        <h2>Contact</h2>
        <p>
          For questions about your enquiry or to request access to, correction
          of or deletion of your information, email{' '}
          <a href={business.emailHref}>{business.email}</a>.
        </p>
      </div>
    </div>
  );
}
