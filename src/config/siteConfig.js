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
  duration: 'AROUND 60 MINUTES',
  durationNote: 'Plan for about an hour. Some sessions may run up to 90 minutes depending on the training plan and client.',
  instagram: 'norris_fontanilla',
  bookingMessage: 'Hi Norris, I would like to book a private boxing session at Grass Residences.',
  hero: {
    eyebrow: 'PRIVATE BOXING TRAINING  /  QUEZON CITY',
    headline: ['GRASS', 'BOXING'],
    subtitle: 'Private boxing coaching, built around you.',
    image: heroImage,
  },
  images: {
    training: defenseImage,
    coachPortrait,
  },
  intro: {
    title: 'BOXING IS MORE THAN THROWING PUNCHES.',
    body: 'Work directly with Norris on the skills you need: proper technique, mitt work, footwork, defense and the decisions behind each move.',
  },
  training: [
    { title: 'FUNDAMENTALS', description: 'Stance, balance, guard, punching mechanics and proper technique.' },
    { title: 'MITT WORK', description: 'Structured combinations, timing, reactions and realistic sequences.' },
    { title: 'FOOTWORK', description: 'Move forward, backward and laterally. Create angles and control distance.' },
    { title: 'DEFENSE', description: 'Slips, rolls, blocks, parries and defensive positioning.' },
    { title: 'FIGHT SITUATIONS', description: 'Apply techniques in realistic situations, with a reason behind every move.' },
    { title: 'CONDITIONING', description: 'Boxing-specific conditioning adjusted to your fitness and experience.' },
  ],
  privateTraining: 'The session is yours. Norris adjusts the work to your experience, fitness level and goals, then gives you direct corrections as you train.',
  philosophy: 'Mitt work should feel connected to the fight: when to attack, when to defend, where to move and how to create the next opening.',
  coachBio: 'As an amateur boxer, Norris teaches the movement and decisions behind the punches. His mitt work mimics an opponent so you can practice when to attack, defend, move and create an opening.',
  equipmentAnswer: 'Bring your own gloves if you have them. If you do not have gloves yet, a pair is available for an additional {gloveFee}.',
  faq: [
    { question: 'Do I need boxing experience?', answer: 'No. Beginners are welcome.' },
    { question: 'How long is one session?', answer: 'Plan for about 60 minutes. Some sessions may run up to 90 minutes depending on the training plan and client.' },
    { question: 'How much is a session?', answer: '{price} for a private boxing session.' },
    { question: 'Where is training held?', answer: 'Grass Residences, Quezon City.' },
    { question: 'What should I bring?', answer: 'Wear comfortable training clothes and bring water. Bring your own boxing gloves if you have them, or use a pair for an additional {gloveFee}.' },
    { question: 'When can I train?', answer: 'Message Norris on Instagram with your preferred day and time. Availability and the exact meeting point at Grass Residences are confirmed before your session.' },
    { question: 'Can I train for fitness even if I do not plan to fight?', answer: 'Yes. Sessions can be adjusted around fitness while still teaching proper boxing technique.' },
    { question: 'How do I book?', answer: 'Message @norris_fontanilla on Instagram with your preferred day, experience level and whether you need gloves.' },
  ],
};
