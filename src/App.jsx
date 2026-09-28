import { useCallback, useEffect, useState } from 'react';
import { siteConfig as c } from './config/siteConfig.js';
import { testimonials } from './data/testimonials.js';
import { gallery } from './data/gallery.js';
import Navbar from './components/Navbar.jsx';
import BookingModal, { contactLinks } from './components/BookingModal.jsx';
import Testimonials from './components/Testimonials.jsx';
import Gallery from './components/Gallery.jsx';
import SiteQRCode from './components/SiteQRCode.jsx';

const price = new Intl.NumberFormat('en-PH', { style: 'currency', currency: c.currency, maximumFractionDigits: 0 }).format(c.price);
const gloveFee = new Intl.NumberFormat('en-PH', { style: 'currency', currency: c.currency, maximumFractionDigits: 0 }).format(c.gloveFee);
const scrollLink = (href, label) => <a href={href} className="text-link">{label} <span aria-hidden="true">↗</span></a>;

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = useCallback(() => setBookingOpen(true), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);
  const hasClients = testimonials.length > 0 || gallery.length > 0;
  const faq = [...c.faq];
  if (c.equipmentAnswer) faq.splice(4, 0, { question: 'Do I need my own boxing gloves?', answer: c.equipmentAnswer });

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const elements = document.querySelectorAll('.section-kicker, .intro-grid, .section-heading-row, .training-item, .private-copy, .philosophy-grid, .audience-grid article, .pricing-card, .coach-copy, .faq-list');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: .08, rootMargin: '0px 0px -30px 0px' });
    elements.forEach(element => { element.classList.add('reveal'); observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar config={c} onBook={openBooking} hasClients={hasClients} />
    <main id="main">
      <section id="top" className="hero" style={{ '--hero-image': `url(${c.hero.image})` }}>
        <div className="hero-image" aria-hidden="true" /><div className="hero-shade" aria-hidden="true" />
        <div className="hero-content container">
          <div className="hero-topline"><span>{c.hero.eyebrow}</span><span>01 / 06</span></div>
          <div className="hero-center"><span className="hero-dash" aria-hidden="true" /><h1>{c.hero.headline.map(line => <span key={line}>{line}</span>)}</h1><div className="hero-bottom"><p>{c.hero.subtitle}<br /><span>Private coaching at {c.location}.</span></p><div className="hero-actions"><button className="button button-light" onClick={openBooking}>BOOK A SESSION <span>↗</span></button><a className="button button-outline" href="#training">VIEW TRAINING <span>↓</span></a></div></div></div>
          <div className="hero-foot"><span>PRIVATE COACHING FROM {price} / SESSION</span><span>SCROLL TO EXPLORE ↓</span></div>
        </div>
      </section>

      <section className="intro-section section-pad"><div className="container">
        <div className="section-kicker"><span>01 / THE APPROACH</span><span>TRAIN WITH INTENTION</span></div>
        <div className="intro-grid"><h2>{c.intro.title}</h2><div><span className="red-rule" /><p>{c.intro.body}</p>{scrollLink('#training', 'EXPLORE THE TRAINING')}</div></div>
        <div className="approach-strip"><span>TECHNIQUE</span><i>✳</i><span>MOVEMENT</span><i>✳</i><span>DECISION-MAKING</span><i>✳</i><span>CONDITIONING</span></div>
      </div></section>

      <section id="training" className="training-section section-pad"><div className="container">
        <div className="section-kicker"><span>02 / THE TRAINING</span><span>BUILD THE COMPLETE BOXER</span></div>
        <div className="section-heading-row"><h2>WORK ON<br /><em>WHAT MATTERS.</em></h2><p>Every drill has a purpose. We build skill you can understand, repeat and use.</p></div>
        <div className="training-grid">{c.training.map((item, index) => <article className="training-item" key={item.title}><span className="item-number">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><span className="item-arrow" aria-hidden="true">↗</span></article>)}</div>
      </div></section>

      <section className="private-section"><div className="private-photo"><img src={c.images.training} alt="Boxer working on defensive movement during a private training session" loading="lazy" /></div><div className="private-copy"><span className="eyebrow">03 / PRIVATE MEANS PERSONAL</span><h2>YOUR SESSION.<br />YOUR PACE.<br /><em>YOUR BOXING.</em></h2><p>{c.privateTraining}</p><div className="private-detail"><span>01 COACH</span><span>01 CLIENT</span><span>01 CLEAR PURPOSE</span></div></div></section>

      <section className="philosophy-section section-pad"><div className="container philosophy-grid"><div><span className="eyebrow">THE PHILOSOPHY</span><span className="asterisk" aria-hidden="true">✳</span></div><div><h2>DON'T JUST HIT<br />THE MITTS.<br /><em>KNOW WHY.</em></h2><p>{c.philosophy}</p><div className="philosophy-tags"><span>WHEN TO ATTACK</span><span>WHEN TO DEFEND</span><span>WHERE TO MOVE</span><span>HOW TO CREATE ANGLES</span></div></div></div></section>

      <section className="audience-section section-pad"><div className="container"><div className="section-kicker"><span>04 / WHO THIS IS FOR</span><span>START WHERE YOU ARE</span></div><h2>ALL LEVELS.<br /><em>REAL WORK.</em></h2><div className="audience-grid">
        {[['BEGINNERS','Learn proper boxing fundamentals from the beginning.'],['FITNESS','Build conditioning while learning a real combat sport.'],['BOXING ENTHUSIASTS','Develop your technique, movement and boxing IQ.'],['EXPERIENCED TRAINEES','Refine fundamentals, defense and situational skills.']].map(([title, desc], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{desc}</p></article>)}
      </div></div></section>

      <Testimonials /><Gallery />

      <section id="pricing" className="pricing-section section-pad"><div className="container pricing-grid"><div className="pricing-left"><div className="section-kicker"><span>06 / PRIVATE SESSION</span></div><h2>PUT IN<br /><em>THE WORK.</em></h2><p>Focused one-on-one coaching at Grass Residences. Come ready to learn, move and improve.</p></div><div className="pricing-card"><span className="eyebrow">PRIVATE BOXING SESSION</span><div className="price-line"><strong>{price}</strong><span>/ SESSION</span></div><h3>{c.duration}</h3><p className="price-note">{c.durationNote}</p><p className="glove-note">Need to use boxing gloves? Add {gloveFee}. Bring your own and there is no glove charge.</p><div className="price-divider" /><ul>{['1-on-1 coaching', 'Mitt work and fundamentals', 'Footwork and defense', 'Fight-situation drills', 'Technique corrections'].map(item => <li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul><button className="button button-dark" onClick={openBooking}>BOOK A SESSION <span>↗</span></button></div></div></section>

      <section id="coach" className="coach-section section-pad"><div className="container coach-grid"><div className="coach-visual">{c.images.coachPortrait ? <img src={c.images.coachPortrait} alt={`${c.coachName}, boxing coach`} loading="lazy" /> : <div className="coach-placeholder" aria-label="Coach portrait coming soon"><span>GB.</span><small>THE COACH / {c.brandName}</small></div>}</div><div className="coach-copy"><span className="eyebrow">07 / MEET YOUR COACH</span><h2>{c.coachName.split(' ').slice(0, -1).join(' ')}<br /><em>{c.coachName.split(' ').at(-1)}.</em></h2><p>Private boxing training built around technique, movement and real situations. The goal is to help you understand what you are doing and why.</p>{c.coachBio && <p>{c.coachBio}</p>}<a className="text-link" href={`https://instagram.com/${c.instagram}`} target="_blank" rel="noopener noreferrer">@{c.instagram} <span>↗</span></a></div></div></section>

      <section id="faq" className="faq-section section-pad"><div className="container faq-grid"><div><span className="eyebrow">08 / GOOD TO KNOW</span><h2>QUESTIONS,<br /><em>ANSWERED.</em></h2></div><div className="faq-list">{faq.map((item, index) => <details key={item.question}><summary><span>0{index + 1}</span><strong>{item.question}</strong><b aria-hidden="true">+</b></summary><p>{item.answer.replace('{price}', price).replace('{gloveFee}', gloveFee)}</p></details>)}</div></div></section>

      <section id="contact" className="contact-section section-pad"><div className="container"><span className="eyebrow">PRIVATE TRAINING / {c.location.toUpperCase()}</span><h2>READY<br />TO TRAIN<span className="accent">?</span></h2><div className="contact-bottom"><p>Book a private boxing session.<br />{price} / session.</p><button className="button button-light" onClick={openBooking}>BOOK A SESSION <span>↗</span></button></div><SiteQRCode brandName={c.brandName} /></div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-top"><div><a className="footer-brand" href="#top">{c.brandName.split(' ')[0]}<br />{c.brandName.split(' ').slice(1).join(' ')}<span>.</span></a><p>Private boxing training<br />{c.location}</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="#training">Training</a><a href="#pricing">Pricing</a><a href="#coach">Coach</a><a href="#faq">FAQ</a></div><div><span>CONTACT</span>{contactLinks(c).map(item => <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>)}</div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {c.brandName}. ALL RIGHTS RESERVED.</span><span>BUILT FOR THE WORK.</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>
    <button className="mobile-sticky" onClick={openBooking}>BOOK SESSION <span>· {price} ↗</span></button>
    <BookingModal open={bookingOpen} onClose={closeBooking} config={c} />
  </>;
}

export default App;
