import heroImage from '../assets/images/hero-boxing.webp';
import defenseImage from '../assets/images/defense.webp';
import coachPortrait from '../assets/images/coach-profile.webp';

// Edit this file for the site-wide copy, contact details, rate and photos.
// The coach portrait is a real photo supplied by Norris. Replace the import to change it.
export const siteConfig = {
  brandName: 'GRASS BOXING',
  coachName: 'Norris Fontanilla',
  location: 'Grass Residences, Quezon City',
  price: 500,
  gloveFee: 100,
  currency: 'PHP',
  duration: '60+ MINUTES',
  durationNote: 'Sessions are generally around one hour and may extend depending on the training plan and client.',
  instagram: 'norris_fontanilla',
  bookingMessage: 'Hi Norris, I would like to book a private boxing session at Grass Residences.',
  hero: {
    eyebrow: 'PRIVATE BOXING TRAINING  /  QUEZON CITY',
    headline: ['GRASS', 'BOXING'],
    subtitle: 'Real boxing skills. One-on-one attention.',
    image: heroImage,
  },
  images: {
    training: defenseImage,
    coachPortrait,
  },
  intro: {
    title: 'BOXING IS MORE THAN THROWING PUNCHES.',
    body: 'Learn movement, defense, timing, footwork and fight-specific situations through focused one-on-one coaching.',
  },
  training: [
    { title: 'FUNDAMENTALS', description: 'Stance, balance, guard, punching mechanics and proper technique.' },
    { title: 'MITT WORK', description: 'Structured combinations, timing, reactions and realistic sequences.' },
    { title: 'FOOTWORK', description: 'Move forward, backward and laterally. Create angles and control distance.' },
    { title: 'DEFENSE', description: 'Slips, rolls, blocks, parries and defensive positioning.' },
    { title: 'FIGHT SITUATIONS', description: 'Apply techniques in realistic situations, with a reason behind every move.' },
    { title: 'CONDITIONING', description: 'Boxing-specific conditioning adjusted to your fitness and experience.' },
  ],
  privateTraining: 'Every session is adjusted to your experience, fitness level, weaknesses and goals. One coach, one client, focused work.',
  philosophy: 'Mitt work should feel connected to the fight: when to attack, when to defend, where to move and how to create the next opening.',
  coachBio: '', // Add your own verified experience and philosophy here.
  equipmentAnswer: 'Bring your own gloves if you have them. If you do not have gloves yet, a pair is available for an additional {gloveFee}.',
  faq: [
    { question: 'Do I need boxing experience?', answer: 'No. Beginners are welcome.' },
    { question: 'How long is one session?', answer: 'Sessions are normally around 60 minutes and may extend depending on the training program and client.' },
    { question: 'How much is a session?', answer: '{price} for a private boxing session.' },
    { question: 'Where is training held?', answer: 'Grass Residences, Quezon City.' },
    { question: 'Can I train for fitness even if I do not plan to fight?', answer: 'Yes. Sessions can be adjusted around fitness while still teaching proper boxing technique.' },
    { question: 'How do I book?', answer: 'Send Norris a message on Instagram to arrange a session.' },
  ],
};
