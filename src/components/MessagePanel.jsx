import { useEffect, useRef, useState } from 'react';
import EnquiryForm from './EnquiryForm.jsx';

export default function MessagePanel() {
  const [open, setOpen] = useState(false);
  const launcher = useRef(null);
  const panel = useRef(null);
  function close() {
    setOpen(false);
    launcher.current?.focus();
  }
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector('input')?.focus();
    const escape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        launcher.current?.focus();
      }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  return (
    <div className="message-widget">
      <aside
        ref={panel}
        id="message-panel"
        className="message-panel"
        role="dialog"
        aria-label="Leave a message for RH Detailing"
        hidden={!open}
      >
        <header className="message-panel-header">
          <div>
            <strong>RH Detailing</strong>
            <p>Leave a message. We’ll reply by email.</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close message panel"
          >
            ×
          </button>
        </header>
        <div className="message-panel-body">
          <EnquiryForm compact />
        </div>
      </aside>
      <button
        ref={launcher}
        className="message-launcher"
        type="button"
        aria-label={open ? 'Close message panel' : 'Message us'}
        title={open ? 'Close message panel' : 'Message us'}
        aria-expanded={open}
        aria-controls="message-panel"
        onClick={() => (open ? close() : setOpen(true))}
      >
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 3a9 9 0 0 0-7.7 13.65L3 22l5.35-1.3A9 9 0 1 0 12 3Zm-4 6h8v1.5H8V9Zm0 4h5v1.5H8V13Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
