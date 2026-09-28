import { useEffect, useState } from 'react';
import { gallery } from '../data/gallery.js';

const photos = import.meta.glob('../assets/gallery/*', { eager: true, query: '?url', import: 'default' });
const photoFor = (name) => photos[`../assets/gallery/${name}`];

export default function Gallery() {
  const [active, setActive] = useState(null);
  const entries = gallery.filter(item => photoFor(item.image));
  useEffect(() => {
    if (active === null) return undefined;
    const onKey = event => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') setActive(i => (i + 1) % entries.length);
      if (event.key === 'ArrowLeft') setActive(i => (i - 1 + entries.length) % entries.length);
    };
    document.body.style.overflow = 'hidden'; window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [active, entries.length]);
  if (!entries.length) return null;
  return <section id="gallery" className="gallery-section section-pad"><div className="container">
    <div className="section-kicker"><span>THE WORK / IN FRAMES</span><span>{String(entries.length).padStart(2, '0')} PHOTOS</span></div><h2>THE WORK.</h2>
    <div className="gallery-grid">{entries.map((item, i) => <button className="gallery-item" key={`${item.image}-${i}`} onClick={() => setActive(i)} aria-label={`Open photo ${i + 1}: ${item.alt || 'Training moment'}`}><img src={photoFor(item.image)} alt={item.alt || 'Grass Boxing training'} loading="lazy" /><span>VIEW PHOTO ↗</span></button>)}</div>
  </div>{active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Training photo viewer" onMouseDown={e => { if (e.target === e.currentTarget) setActive(null); }}>
    <button className="lightbox-close" autoFocus onClick={() => setActive(null)} aria-label="Close photo">×</button><button className="lightbox-prev" onClick={() => setActive((active - 1 + entries.length) % entries.length)} aria-label="Previous photo">←</button><img src={photoFor(entries[active].image)} alt={entries[active].alt || 'Grass Boxing training'} /><button className="lightbox-next" onClick={() => setActive((active + 1) % entries.length)} aria-label="Next photo">→</button><span className="lightbox-count">{active + 1} / {entries.length}</span>
  </div>}</section>;
}
