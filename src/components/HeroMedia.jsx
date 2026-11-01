import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

/** Decorative video, with a photo fallback and no downloads for reduced motion. */
export default function HeroMedia({ poster, alt }) {
  const videoRef = useRef(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    const connection = navigator.connection;
    function updatePreference() {
      setVideoEnabled(!motionPreference.matches && !connection?.saveData);
    }
    updatePreference();
    motionPreference.addEventListener('change', updatePreference);
    connection?.addEventListener('change', updatePreference);
    return () => {
      motionPreference.removeEventListener('change', updatePreference);
      connection?.removeEventListener('change', updatePreference);
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      // Autoplay can be blocked; a rejected play request leaves the photo visible.
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }

  return (
    <>
      <img
        className="hero-image"
        src={poster}
        alt={alt}
        width="1920"
        height="1080"
        fetchPriority="high"
      />
      {videoEnabled && (
        <>
          <video
            ref={videoRef}
            className={`hero-video ${hasPlayed ? 'has-played' : ''}`}
            src="/detailing-hero.mp4"
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => {
              setIsPlaying(true);
              setHasPlayed(true);
            }}
            onPause={() => setIsPlaying(false)}
            onError={() => setVideoEnabled(false)}
          />
          <button
            className="hero-video-toggle"
            type="button"
            aria-label={
              isPlaying ? 'Pause background video' : 'Play background video'
            }
            onClick={togglePlayback}
          >
            <Icon name={isPlaying ? 'pause' : 'play'} />
            {isPlaying ? 'Pause video' : 'Play video'}
          </button>
        </>
      )}
    </>
  );
}
