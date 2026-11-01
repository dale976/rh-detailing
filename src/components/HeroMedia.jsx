import { isPlaybackFailure } from '../lib/media.js';
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

/** Decorative video, with a photo fallback and no downloads for reduced motion. */
export default function HeroMedia({ poster, posterSmall, alt }) {
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
        srcSet={`${posterSmall} 640w, ${poster} 1280w`}
        sizes="100vw"
        alt={alt}
        width="1280"
        height="720"
        fetchPriority="high"
      />
      {videoEnabled && (
        <>
          <video
            ref={videoRef}
            className={`hero-video ${hasPlayed ? 'has-played' : ''}`}
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
            onError={(event) => {
              if (isPlaybackFailure(event)) setVideoEnabled(false);
            }}
          >
            <source
              src="/detailing-hero-mobile.mp4"
              media="(max-width: 600px)"
              type="video/mp4"
            />
            <source src="/detailing-hero.mp4" type="video/mp4" />
          </video>
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
