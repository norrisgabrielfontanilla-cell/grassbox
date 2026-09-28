import { useRef } from 'react';
import { testimonials } from '../data/testimonials.js';

const photos = import.meta.glob('../assets/clients/*', { eager: true, query: '?url', import: 'default' });
const photoFor = (name) => photos[`../assets/clients/${name}`];

export default function Testimonials() {
  const track = useRef(null);
  const entries = testimonials.filter(item => item.name && item.testimonial && photoFor(item.image));
  if (!entries.length) return null;
  return <section id="clients" className="testimonials-section section-pad">
    <div className="container"><div className="section-kicker"><span>05 / THE PEOPLE</span><span>REAL WORK. REAL WORDS.</span></div>
      <div className="section-heading-row"><h2>TRAINED AT<br /><em>GRASS BOXING.</em></h2><div className="carousel-buttons"><button aria-label="Previous testimonial" onClick={() => track.current?.scrollBy({ left: -track.current.clientWidth * .78, behavior: 'smooth' })}>←</button><button aria-label="Next testimonial" onClick={() => track.current?.scrollBy({ left: track.current.clientWidth * .78, behavior: 'smooth' })}>→</button></div></div>
      <div className="testimonial-track" ref={track}>{entries.map(item => <article className="testimonial-card" key={item.id}>
        <img src={photoFor(item.image)} alt={`${item.name} training at Grass Boxing`} loading="lazy" />
        <div className="testimonial-copy"><span className="eyebrow">GRASS BOXING CLIENT</span><blockquote>“{item.testimonial}”</blockquote><div className="client-line"><strong>{item.name}</strong><span>{[item.category, item.duration].filter(Boolean).join(' · ')}</span>{item.instagram && <a href={`https://instagram.com/${item.instagram.replace(/^@/, '')}`} target="_blank" rel="noopener noreferrer">@{item.instagram.replace(/^@/, '')}</a>}</div></div>
      </article>)}</div>
    </div>
  </section>;
}
