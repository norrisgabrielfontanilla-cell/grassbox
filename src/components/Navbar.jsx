import { useEffect, useState } from 'react';

export default function Navbar({ config, bookingUrl, onBook, hasClients }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => { if (!menuOpen) return; const onKey = e => { if (e.key === 'Escape') setMenuOpen(false); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [menuOpen]);
  const links = [['Training', '#training'], ...(hasClients ? [['Clients', '#clients']] : []), ['Pricing', '#pricing'], ['Coach', '#coach'], ['FAQ', '#faq'], ['Contact', '#contact']];
  return <header className={`site-header ${scrolled || menuOpen ? 'solid' : ''}`}>
    <div className="nav-inner">
      <a href="#top" className="wordmark" onClick={() => setMenuOpen(false)} aria-label={`${config.brandName} home`}>{config.brandName.split(' ')[0]}<span>{config.brandName.split(' ').slice(1).join(' ')}</span><i aria-hidden="true">.</i></a>
      <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation" id="main-navigation">
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-mobile-book" href={bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => { setMenuOpen(false); onBook('mobile_menu'); }}>BOOK SESSION ↗</a>
      </nav>
      <a className="nav-book" href={bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => onBook('desktop_nav')}>BOOK SESSION <span>↗</span></a>
      <button className={`menu-toggle ${menuOpen ? 'active' : ''}`} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    </div>
  </header>;
}
