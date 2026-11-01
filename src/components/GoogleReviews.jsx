import { googleReviews } from '../content/reviews.js';

export default function GoogleReviews() {
  return (
    <section
      className="google-reviews container"
      aria-labelledby="reviews-heading"
    >
      <div className="google-reviews-inner">
        <div>
          <h2 id="reviews-heading">Google reviews</h2>
          <p>RH Detailing Surrey</p>
        </div>
        <div className="google-reviews-rating">
          <strong>
            {googleReviews.rating}
            <span> / 5</span>
          </strong>
          <div>
            <div className="google-reviews-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z" />
                </svg>
              ))}
            </div>
            <p>Based on {googleReviews.count} Google reviews</p>
          </div>
        </div>
        <a
          className="text-link"
          href={googleReviews.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read our Google reviews (opens in a new tab)"
        >
          Read our Google reviews
        </a>
      </div>
    </section>
  );
}
