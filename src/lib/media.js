// Source errors bubble to the video in React. A skipped source is not a
// playback failure when the video can still select another format or size.
export function isPlaybackFailure(event) {
  return (
    event.target === event.currentTarget && Boolean(event.currentTarget.error)
  );
}
