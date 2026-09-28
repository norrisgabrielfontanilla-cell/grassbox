# GRASS BOXING

A mobile-first, one-page private boxing coaching site built with React, Vite and CSS. The hero and defensive-training images are AI-generated editorial placeholders. Replace them with your own work before treating them as documentary photos of GRASS BOXING. The coach portrait is a real photo supplied by Norris. Client testimonials and the client gallery remain hidden until real content is added.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To produce and check a release build:

```bash
npm run build
npm run preview
```

## Edit the site

Most copy and business details live in `src/config/siteConfig.js`. Save the file and Vite will reload the page.

| Change | Where |
| --- | --- |
| Rate | `price: 500` in `siteConfig.js`; prices in the hero, card, booking CTA, FAQ and mobile CTA update together |
| Optional gloves charge | `gloveFee: 100` in `siteConfig.js`; the pricing note and gloves FAQ update together |
| Phone number | `phone` in `siteConfig.js`; WhatsApp, Viber, Telegram by phone, call and SMS links use it unless an override is provided |
| Instagram | `instagram` in `siteConfig.js`, without `@` |
| Booking text | `bookingMessage` in `siteConfig.js` |
| Location or duration | `location`, `duration`, `durationNote` in `siteConfig.js` |
| Training and hero copy | `hero`, `intro`, `training`, `privateTraining`, `philosophy`, `faq` in `siteConfig.js` |
| Glove availability | Edit `equipmentAnswer` in `siteConfig.js`; `{gloveFee}` inserts the configured charge |
| Experience/bio | Fill `coachBio` with accurate information |

Phone links use Philippine international format (`0956…` becomes `63956…`). Telegram's phone-based app link can depend on the visitor's device and privacy settings; set `telegramUsername` if you have a public username. The booking sheet always offers a copy-number fallback. WhatsApp and Viber can use separate numbers through `whatsappNumber` and `viberNumber`.

### Replace the hero and training photos

Place compressed images in `src/assets/images/`. In `src/config/siteConfig.js`, update the two `import` paths at the top and the `hero.image` / `images.training` values. WebP or AVIF is best. Keep the hero near or below 500 KB when possible. The included photos are generated placeholders and do not represent an actual GRASS BOXING client or the coach.

To replace the coach portrait, put your new photo in `src/assets/images/`, then update its import above `siteConfig`, for example:

```js
import coachPortrait from '../assets/images/coach-profile.jpg';
```

Keep `images.coachPortrait: coachPortrait`. To temporarily hide the photo, set it to `null`; the page then uses a typography panel.

### Add or remove testimonials

1. Obtain the client's permission to publish their photo and words.
2. Put a compressed photo such as `client-01.jpg` in `src/assets/clients/`.
3. Add an object to the array in `src/data/testimonials.js`:

```js
export const testimonials = [
  {
    id: 'client-01',
    name: 'Actual client name',
    image: 'client-01.jpg',
    testimonial: 'Their exact approved testimonial.',
    category: 'Beginner', // optional
    duration: '2 months', // optional
    instagram: '', // optional, only with permission
    rating: null, // optional, not displayed by default
  },
];
```

The card and mobile swipe track appear automatically. The first four fields are required. To remove a testimonial, remove its object from the array; you may then remove its unused photo. When there are no valid entries, the section and Clients navigation link disappear. Images are loaded only from the project, with no Instagram scraping.

### Add gallery photos

Put photos in `src/assets/gallery/`, then add entries to `src/data/gallery.js`:

```js
export const gallery = [
  { image: 'mitt-session.jpg', alt: 'Client practicing a combination on mitts' },
];
```

The gallery and lightbox appear automatically. Photo filenames are case-sensitive. The `.gitkeep` files simply preserve empty image folders in Git.

## Publish with GitHub

Create an empty GitHub repository, then from this folder run:

```bash
git init
git add .
git commit -m "Build GRASS BOXING website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

In the repository settings, open **Pages**, set **Build and deployment → Source** to **GitHub Actions**. The included workflow builds on every push to `main`, sets Vite's base path from the repository name and deploys `dist`. The URL will be `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`. For a custom domain or username root site, adjust `VITE_BASE_PATH` in `.github/workflows/deploy.yml` to `/` and configure the domain in GitHub Pages.

## Website QR code

The contact section automatically creates a QR code for the site's deployed homepage and includes a **Download QR** link for a PNG you can use on flyers. Open the **live deployed site** and download it there; a QR downloaded from local development points to your local computer. If you later change the domain, download a fresh QR from the new URL before printing more materials.

## Netlify or Vercel

Import the GitHub repository. Use build command `npm run build` and output directory `dist`. Leave `VITE_BASE_PATH` unset for a root-domain deployment. If you set it locally through `.env`, do not copy that setting into these hosts.

## SEO and final launch checks

`index.html` includes the title, description, viewport, Open Graph placeholders and favicon. Replace `public/social-preview.svg` with a real share image and use its absolute public URL in `og:image` after choosing your domain. Update the title and description in `index.html` if you change the brand or location. Google Fonts is used for typography; it needs a network connection. Check the actual device behavior of Viber, Telegram, WhatsApp and SMS after publishing, since installed apps and privacy settings differ.

## Structure

```text
grass-boxing/
├── .github/workflows/deploy.yml
├── public/                  favicon and social preview
├── src/
│   ├── assets/images/       bundled editorial images
│   ├── assets/clients/      real client photos you add
│   ├── assets/gallery/      real training photos you add
│   ├── components/          navigation, contact sheet, testimonials, gallery
│   ├── config/siteConfig.js  main content and contact settings
│   ├── data/                testimonial and gallery entries
│   ├── styles/main.css       responsive visual system
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```
