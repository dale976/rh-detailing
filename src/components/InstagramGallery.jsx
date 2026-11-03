import { useEffect, useRef, useState } from 'react';
import { loadInstagramPosts } from '../lib/instagram.js';
import snapshot from '../content/instagram-fallback.json';

const profileUrl = 'https://www.instagram.com/rh.detail/';
const fallbackPhotos = snapshot.posts;

const feedId = import.meta.env.VITE_BEHOLD_FEED_ID?.trim();
export default function InstagramGallery() {
  const section = useRef(null);
  const [posts, setPosts] = useState([]);
  const showingFallback = posts.length === 0;
  const galleryPhotos = showingFallback ? fallbackPhotos : posts;
  useEffect(() => {
    if (!feedId) return;
    const controller = new AbortController();
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        loadInstagramPosts(feedId, { signal: controller.signal })
          .then(setPosts)
          .catch(() => {
            /* Keep the saved feed snapshot when Behold is unavailable. */
          });
      },
      { rootMargin: '200px' },
    );
    observer.observe(section.current);
    return () => {
      observer.disconnect();
      controller.abort();
    };
  }, []);
  return (
    <section
      ref={section}
      className="instagram-section container"
      aria-labelledby="instagram-heading"
    >
      <p className="eyebrow">From the studio & on the road</p>
      <div className="instagram-heading">
        <div>
          <h2 id="instagram-heading">Follow the detail.</h2>
          <p>
            {showingFallback
              ? 'A selection from our Instagram. Visit our profile for the latest.'
              : 'See the latest work from RH Detailing on Instagram.'}
          </p>
        </div>
        <a
          className="text-link"
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          @rh.detail
        </a>
      </div>
      <div className="instagram-grid">
        {galleryPhotos.map((post) => (
          <a
            href={post.href}
            key={post.id}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              post.caption
                ? `${post.caption.slice(0, 180)} — view on Instagram`
                : 'View detailing work on Instagram'
            }
          >
            <img
              src={post.image}
              alt={post.alt}
              loading="lazy"
              width="700"
              height="700"
              onError={() => {
                if (!showingFallback) setPosts([]);
              }}
            />
            {post.type === 'VIDEO' && (
              <span className="instagram-video">Video</span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
