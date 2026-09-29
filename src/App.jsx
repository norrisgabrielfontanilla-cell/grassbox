import { useEffect, useState } from 'react';
import { siteConfig as c } from './config/siteConfig.js';
import Navbar from './components/Navbar.jsx';
import SessionPlanner from './components/SessionPlanner.jsx';
import Testimonials from './components/Testimonials.jsx';
import Gallery from './components/Gallery.jsx';
import SiteQRCode from './components/SiteQRCode.jsx';

const money = value => new Intl.NumberFormat('en-PH', { style: 'currency', currency: c.currency, maximumFractionDigits: 0 }).format(value);
const paths = [
  { label: 'I’m new to boxing', title: 'Start with a solid foundation.', copy: 'Get comfortable with your stance, guard and first combinations. Learn at a pace that lets you understand each movement.', skills: ['Stance & balance', 'Straight punches', 'Basic footwork'], number: '01' },
  { label: 'I want to get fitter', title: 'Put purpose behind the workout.', copy: 'Build your conditioning through mitt work and movement. The intensity follows your fitness level, while the focus stays on proper technique.', skills: ['Mitt combinations', 'Boxing conditioning', 'Movement & coordination'], number: '02' },
  { label: 'I want better technique', title: 'Make every move more deliberate.', copy: 'Work on distance, timing and defensive reactions. Practice situations that connect your punches to what an opponent might do next.', skills: ['Defense & counters', 'Angles & distance', 'Situational mitt work'], number: '03' },
];
const Arrow = () => <span aria-hidden="true">↗</span>;
export const track = (event, location) => { if (typeof window.gtag === 'function') window.gtag('event', event, { location }); };

export default function App() {
  const [goal, setGoal] = useState(0);
  const instagramUrl = `https://instagram.com/${c.instagram}`;
  const faq = [...c.faq];
  faq.splice(4, 0, { question: 'Do I need my own boxing gloves?', answer: c.equipmentAnswer });
  useEffect(() => {
    const update = () => document.documentElement.style.setProperty('--scroll-progress', `${window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight) * 100}%`);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const book = (label, className = 'button button-gold') => <a href="#book" className={className} onClick={() => track('booking_intent', label)}>PLAN YOUR SESSION <Arrow /></a>;
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar config={c} />
    <main id="main">
      <section id="top" className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> PRIVATE BOXING · GRASS RESIDENCES</div>
          <h1>MAKE YOUR<br />FIRST MOVE.<br /><em>MAKE IT COUNT.</em></h1>
          <p className="hero-description">Learn to box with a coach in your corner. Private sessions with Norris, built around your experience, fitness and goals.</p>
          <div className="hero-actions">{book('hero')}<a href="#training" className="quiet-link">See how we train <span aria-hidden="true">↓</span></a></div>
          <div className="hero-coach"><img src={c.images.coachPortrait} alt="" width="48" height="48" /><div><strong>COACHED BY NORRIS FONTANILLA</strong><span>Amateur boxer. Grass Residences resident.</span></div></div>
        </div>
        <div className="hero-visual">
          <img className="hero-photo" src={c.hero.image} alt="Illustrative boxing mitt-work scene" fetchPriority="high" />
          <div className="hero-visual-shade" />
          <div className="image-topline"><span>GB / PRIVATE TRAINING</span><span>QC, PH</span></div>
          <div className="hero-image-copy"><span className="eyebrow">ONE COACH. ONE CLIENT.</span><p>ALL THE FOCUS.<br /><em>ON YOU.</em></p></div>
          <span className="image-caption">ILLUSTRATIVE TRAINING IMAGE</span>
          <a className="hero-session-tag" href="#book"><span>YOUR FIRST SESSION</span><strong>{money(c.price)} <small>/ private session</small></strong><Arrow /></a>
        </div>
      </section>
      <div className="facts-strip"><div><span>01</span> PERSONAL COACHING</div><div><span>60–90</span> MINUTES, DEPENDING ON YOUR SESSION</div><div><span>ALL</span> EXPERIENCE LEVELS</div></div>

      <section id="training" className="section training-section"><div className="container">
        <div className="section-top"><span className="eyebrow">01 / FIND YOUR START</span><span className="section-aside">YOU DON’T NEED TO BE A BOXER TO BEGIN.</span></div>
        <div className="section-heading"><h2>YOUR GOAL.<br /><em>OUR STARTING POINT.</em></h2><p>First time holding your guard up? Working on your next combination? We start where you are.</p></div>
        <div className="training-tabs" role="tablist" aria-label="Choose your training goal">{paths.map((path, index) => <button key={path.label} role="tab" id={`goal-tab-${index}`} aria-selected={goal === index} aria-controls="goal-panel" tabIndex={goal === index ? 0 : -1} onClick={() => setGoal(index)} onKeyDown={event => { let next; if(event.key === 'ArrowRight') next = (index + 1) % paths.length; if(event.key === 'ArrowLeft') next = (index + paths.length - 1) % paths.length; if(event.key === 'Home') next = 0; if(event.key === 'End') next = paths.length - 1; if(next !== undefined) { event.preventDefault(); setGoal(next); document.getElementById(`goal-tab-${next}`)?.focus(); } }}>{path.label}<Arrow /></button>)}</div>
        <div id="goal-panel" role="tabpanel" aria-labelledby={`goal-tab-${goal}`} className="goal-panel"><div className="goal-number" aria-hidden="true">{paths[goal].number}</div><div className="goal-copy"><h3>{paths[goal].title}</h3><p>{paths[goal].copy}</p><div className="skill-tags">{paths[goal].skills.map(skill => <span key={skill}>{skill}</span>)}</div></div><a href="#book" className="round-link" aria-label="Plan a session for your goal">↗</a></div>
      </div></section>

      <section className="method-section"><div className="method-photo"><img src={c.images.training} alt="Illustrative boxer practicing defensive movement" loading="lazy" width="900" height="1100" /><span className="image-caption">ILLUSTRATIVE TRAINING IMAGE</span><div className="method-photo-copy">LESS GUESSWORK.<br /><em>BETTER BOXING.</em></div></div><div className="method-copy"><span className="eyebrow">02 / THE WAY WE TRAIN</span><h2>DON’T JUST HIT.<br /><em>UNDERSTAND.</em></h2><p className="method-intro">Mitt work should teach you what to do when someone is in front of you. Every drill connects to a decision.</p><ol className="method-list">{[['Build the basics','Stance, guard and punching mechanics you can repeat.'],['Learn to move','Footwork, distance and defense that support your punches.'],['Put it together','Situational mitt work: when to attack, defend and create an opening.']].map(([title, copy], index) => <li key={title}><span>0{index+1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol><a href="#book" className="text-link">LET’S WORK ON YOUR BOXING <Arrow /></a></div></section>

      <section id="coach" className="section coach-section"><div className="container coach-grid"><div className="coach-portrait"><img src={c.images.coachPortrait} alt="Norris Fontanilla wearing his boxing medal" loading="lazy" width="800" height="1000" /><span className="portrait-label">YOUR COACH / NORRIS FONTANILLA</span></div><div className="coach-copy"><span className="eyebrow">03 / IN YOUR CORNER</span><h2>HEY, I’M<br /><em>NORRIS.</em></h2><p className="coach-lead">Your coach. And your neighbor.</p><p>I’m an amateur boxer and a Grass Residences resident. I teach the technique, movement and decisions behind each punch, with direct feedback as you train.</p><p>Whether you’re starting from zero or refining your boxing, we’ll work at your pace and build from there.</p><div className="coach-principles"><span>PERSONAL ATTENTION</span><span>PRACTICAL TECHNIQUE</span><span>BEGINNERS WELCOME</span></div><a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-link">MEET ME ON INSTAGRAM <Arrow /></a></div></div></section>
      <Testimonials /><Gallery />

      <section id="book" className="section booking-section"><span id="pricing" className="legacy-anchor" /><div className="container booking-grid"><div className="booking-copy"><span className="eyebrow">04 / YOUR NEXT MOVE</span><h2>A SESSION<br /><em>THAT’S YOURS.</em></h2><p>Focused coaching, a clear starting point, and the space to learn. Right here at Grass Residences.</p><ul className="included-list">{['Private, one-on-one attention','Mitt work, footwork and defense','Technique feedback throughout','Training adjusted to your level'].map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><div className="session-rate"><strong>{money(c.price)}</strong><span>/ private session</span></div><p className="rate-detail">Plan for about an hour. Some sessions may run up to 90 minutes, depending on your training plan.</p><div className="meeting-note"><span aria-hidden="true">↗</span><div><strong>GRASS RESIDENCES, QUEZON CITY</strong><p>Message to confirm a time and meeting point.</p></div></div></div><SessionPlanner config={c} selectedGoal={paths[goal].label} /></div></section>

      <section id="faq" className="section faq-section"><div className="container faq-grid"><div><span className="eyebrow">05 / BEFORE YOU START</span><h2>GOOD<br /><em>TO KNOW.</em></h2><p>Still have a question? <a href={instagramUrl} target="_blank" rel="noopener noreferrer">Ask Norris ↗</a></p></div><div className="faq-list">{faq.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer.replaceAll('{price}', money(c.price)).replaceAll('{gloveFee}', money(c.gloveFee))}</p></details>)}</div></div></section>
      <section className="closing-section"><div className="container closing-inner"><div><span className="eyebrow">YOU CAN START WHERE YOU ARE.</span><h2>SEE YOU<br /><em>AT TRAINING.</em></h2></div>{book('closing','button button-dark')}</div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-main"><div><a className="wordmark" href="#top">GRASS<span>BOXING</span><i>.</i></a><p>Private boxing. Personal attention.<br />Grass Residences, Quezon City.</p></div><div className="footer-nav"><a href="#training">The training</a><a href="#coach">Your coach</a><a href="#book">Plan a session</a><a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram ↗</a></div><SiteQRCode brandName={c.brandName} /></div><div className="footer-bottom"><span>© {new Date().getFullYear()} GRASS BOXING</span><span>BUILT AROUND YOU.</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>
    <a className="mobile-sticky" href="#book" onClick={() => track('booking_intent','mobile_sticky')}><span>YOUR NEXT MOVE</span><strong>PLAN A SESSION ↗</strong></a>
  </>;
}
