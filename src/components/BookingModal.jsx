import { useEffect, useRef, useState } from 'react';

const cleanPhone = (phone) => phone.replace(/\D/g, '').replace(/^0/, '63');

export function contactLinks(config) {
  const international = cleanPhone(config.phone);
  const wa = cleanPhone(config.whatsappNumber || config.phone);
  const viber = cleanPhone(config.viberNumber || config.phone);
  const message = encodeURIComponent(config.bookingMessage);
  const telegram = config.telegramUsername
    ? `https://t.me/${config.telegramUsername.replace(/^@/, '')}`
    : `tg://resolve?phone=${international}`;
  return [
    { label: 'WhatsApp', detail: 'Start a chat', href: `https://wa.me/${wa}?text=${message}` },
    { label: 'Viber', detail: 'Open Viber', href: `viber://chat?number=%2B${viber}` },
    { label: 'Telegram', detail: config.telegramUsername ? 'Start a chat' : 'Open by phone number', href: telegram },
    { label: 'Call', detail: config.phone, href: `tel:+${international}` },
    { label: 'Text / iMessage', detail: config.phone, href: `sms:+${international}` },
    { label: 'Instagram', detail: `@${config.instagram}`, href: `https://instagram.com/${config.instagram}` },
  ];
}

export default function BookingModal({ open, onClose, config }) {
  const [copied, setCopied] = useState(false);
  const closeRef = useRef(null);
  const priorFocus = useRef(null);
  const gloveFee = new Intl.NumberFormat('en-PH', { style: 'currency', currency: config.currency, maximumFractionDigits: 0 }).format(config.gloveFee);

  useEffect(() => {
    if (!open) return undefined;
    priorFocus.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const focusable = [...document.querySelectorAll('.booking-dialog button, .booking-dialog a')];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      priorFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;
  return <div className="booking-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="booking-dialog" role="dialog" aria-modal="true" aria-labelledby="booking-heading">
      <div className="modal-top"><span className="eyebrow">PRIVATE SESSION / {config.location}</span><button ref={closeRef} className="icon-button" onClick={onClose} aria-label="Close booking options">×</button></div>
      <h2 id="booking-heading">LET'S GET<br /><em>TO WORK.</em></h2>
      <p>Choose how you want to reach out. Tell me your experience level and preferred training time. Need gloves? A pair is available for an additional {gloveFee}.</p>
      <div className="booking-options">
        {contactLinks(config).map((item) => <a key={item.label} href={item.href} target={item.href.startsWith('https:') ? '_blank' : undefined} rel={item.href.startsWith('https:') ? 'noopener noreferrer' : undefined}>
          <strong>{item.label}</strong><span>{item.detail}</span><b aria-hidden="true">↗</b>
        </a>)}
      </div>
      <button className="copy-number" onClick={async () => {
        try { await navigator.clipboard.writeText(config.phone); setCopied(true); setTimeout(() => setCopied(false), 2500); }
        catch { setCopied(false); }
      }}>{copied ? 'NUMBER COPIED ✓' : `COPY NUMBER  /  ${config.phone}`}</button>
      <small>Some apps must be installed on your device to open their links. If a link does not open, copy the number above.</small>
    </div>
  </div>;
}
