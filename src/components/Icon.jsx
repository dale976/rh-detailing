// Small, shared interface icons; the brand logo remains the original image asset.
export default function Icon({ name, className = '' }) {
  const paths = {
    play: <path d="m8 5 11 7-11 7Z" />,
    pause: <path d="M8 5v14M16 5v14" />,
    check: <path d="m5 12 4 4L19 6" />,
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    phone: (
      <path d="m7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3c-1 4-4 5-8 3C7 17 3 13 3 7c0-2 2-4 4-4Z" />
    ),
  };
  return (
    <svg
      className={`icon ${className}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
