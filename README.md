# ZachFlipsWhips

Personal site for ZachFlipsWhips. It introduces car-flipping mentorship and dealer-only auction education, then asks visitors to apply before they can book a call.

The page is a static React app. Ordinary copy, photos, video, and integration URLs live in [`src/config/siteConfig.ts`](src/config/siteConfig.ts).

## Run it locally

Requires Node 22.

```bash
npm install
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`.

```bash
npm test          # qualification, video URL, and tracking checks
npm run lint
npm run build     # typecheck and production build
npm run preview   # serve the production build
```

## What is already working

- Single-page home: navigation, hero, video placeholder, two offers, about, process, sample stories, FAQ, closing call to action, footer.
- Sticky navigation, smooth in-page links, and a full-screen mobile menu.
- Sticky Apply bar on phones after the hero.
- Application window. Until a Typeform URL is saved, this is a **preview**. Answers stay in the browser and are not submitted. The preview still applies the qualification rules below.
- People who qualify see a scheduler panel. With no Calendly URL, that panel explains that times are not available yet. It does not invent appointments.
- People under $3,000, people who are only researching, and people who are not interested in mentorship see a calmer “start with the education” message and links to Instagram and TikTok.
- Privacy, Terms, and Disclaimer drafts. Each one is marked for attorney review and is set to `noindex` until `legalReviewed` is turned on.
- Optional analytics hooks for Google Analytics, Meta, and TikTok. They stay off until IDs are added **and** a visitor clicks Allow.

## What still needs your accounts

These are placeholders. The site does not pretend they are connected.

| Setting | Where | Current value |
| --- | --- | --- |
| Typeform | `siteConfig.typeformUrl` | `YOUR_TYPEFORM_URL_HERE` |
| Calendly | `siteConfig.calendlyUrl` | `YOUR_CALENDLY_URL_HERE` |
| Google Analytics | `siteConfig.tracking.googleAnalyticsId` | empty |
| Meta Pixel | `siteConfig.tracking.metaPixelId` | empty |
| TikTok Pixel | `siteConfig.tracking.tiktokPixelId` | empty |
| Public site URL | `siteConfig.siteUrl` | empty |
| Contact email | `siteConfig.contactEmail` | empty |
| Portrait and dealership photos | `siteConfig.about` | empty |
| Sales video | `siteConfig.video` | empty |

The preview application and the booking confirmation screen were exercised locally. A live Typeform form, a live Calendly event, and the ad pixels were not, because those accounts are not in this repo.

## Add your video

1. Put an MP4 in `public/video/`, for example `public/video/intro.mp4`.
2. In `siteConfig.video`, set `mp4` to `"/video/intro.mp4"`.
3. Optional poster image: `poster: "/photos/video-poster.jpg"`.

Or set `embedUrl` to a YouTube or Vimeo link:

```ts
embedUrl: "https://www.youtube.com/watch?v=YOUR_ID"
```

If both an MP4 and an embed URL are set, the MP4 is used. Leave both empty and the player shows “Your Video Goes Here.”

## Add your photos

1. Export a portrait and a dealership photo as JPG or WebP. Aim for roughly 1600px on the long edge and under 300KB each.
2. Save them in `public/photos/`.
3. Point the config at them:

```ts
portrait: {
  src: "/photos/zach.jpg",
  alt: "Portrait of Zach",
  label: "Portrait",
},
dealershipPhoto: {
  src: "/photos/dealership.jpg",
  alt: "Zach at Regal Auto Sales",
  label: "At the dealership",
},
```

Empty `src` values keep the designed placeholders. Do not drop in random stock photos.

## Replace the sample stories

The Results section is labeled **Sample content**. Those five stories are fictional layout placeholders. They are not customers and they are not results.

Before launch, either delete `testimonials` down to an empty array, or replace each item with a real story you have permission to publish and set `sample: false`. Add a photo only when you have permission:

```ts
{
  id: "jordan",
  quote: "Their words.",
  name: "Jordan P.",
  initials: "JP",
  context: "What they were working on",
  sample: false,
  photo: "/photos/jordan.jpg",
}
```

While any item still has `sample: true`, the warning stays on the page.

Video testimonial and message screenshot:

```ts
results: {
  video: { src: "/video/customer.mp4", poster: "/photos/customer-poster.jpg", ... },
  message: { src: "/photos/message.jpg", alt: "Text message from a customer", ... },
}
```

Empty slots are hidden once every testimonial has `sample: false`.

## Connect Typeform

1. Create a form in Typeform with these questions, in this order.

| # | Question | Answer type |
| --- | --- | --- |
| 1 | What is your full name? | Short text |
| 2 | What is your email address? | Email |
| 3 | What is your phone number? | Phone |
| 4 | Where are you located? | Short text |
| 5 | What are you most interested in? | Learning to flip cars. / One-on-one mentorship. / Dealer-only auction information. / Starting a dealership. / Not sure yet. |
| 6 | Have you flipped cars before? | Never. / 1–3 cars. / 4–10 cars. / More than 10 cars. |
| 7 | How much capital do you currently have available for your car-flipping business? | Under $1,000. / $1,000–$2,999. / $3,000–$4,999. / $5,000–$9,999. / $10,000+. |
| 8 | How soon do you want to start? | Immediately. / Within 30 days. / Within 90 days. / Just researching. |
| 9 | What is your biggest challenge right now? | Long text |
| 10 | Why do you want to work with me? | Long text |
| 11 | Are you interested in investing in mentorship if we determine it’s a good fit? | Yes. / Possibly. / Not currently. |

2. Copy the form’s public URL. It looks like `https://form.typeform.com/to/abc123`.
3. Paste it into `siteConfig.typeformUrl`.
4. Republish the site.

Every Apply button opens that form in a window on the page. “Open in a new tab” is the fallback if the embed does not load. The on-site preview is replaced as soon as the URL is a real Typeform link.

### Branching inside Typeform

The website cannot see which Typeform ending someone reached. Build the same rules in Typeform Logic so the calendar only appears after the form. The reference implementation is `isQualifiedLead` in [`src/lib/qualification.ts`](src/lib/qualification.ts).

**Show Calendly** when all of these are true:

- Capital is `$3,000–$4,999`, `$5,000–$9,999`, or `$10,000+`.
- Timing is `Immediately`, `Within 30 days`, or `Within 90 days`.
- Mentorship interest is `Yes` or `Possibly`.

**Show the education ending** when any of these are true:

- Capital is `Under $1,000` or `$1,000–$2,999`.
- Timing is `Just researching`.
- Mentorship interest is `Not currently`.

If more than one rule fails, capital is the one that matters most, then timing, then interest. Suggested endings:

- Under $3,000: thank them, say a call is not the best next step yet, and point them to the free videos on Instagram and TikTok. Invite them to apply again when they have capital they can use for the business. No pressure and no guarantee of profit.
- Still researching: tell them there is no need to book yet, and point them to the same videos.
- Not interested in investing: thank them for the straight answer and do not push a call.

On the qualified ending, add Typeform’s Calendly integration so the calendar is the screen after submit. Do not put a public booking link in the navigation.

Change the rules in both places if you change them: Typeform Logic, and `isQualifiedLead`.

## Connect Calendly

1. Create the event type you actually want to sell from. Choose the length yourself.
2. In Typeform, connect Calendly on the qualified ending only.
3. Paste the same event link into `siteConfig.calendlyUrl`, for example `https://calendly.com/your-name/intro`.

That URL is not shown on the public page. It is only embedded after someone qualifies in the on-site preview, which is the fallback if you are not using Typeform’s own ending.

Optional confirmation on your domain: in Calendly, set the redirect URL to `https://YOUR_DOMAIN/?scheduled=1`. The site shows a “Your call is booked.” banner. It does not list a time of its own. Calendly’s email is the confirmation of record.

Do not turn on a public “book without applying” link.

## Analytics

Leave the tracking IDs empty until you want them. When any ID is present, visitors get an Allow / Decline choice before a script loads.

Events prepared, and not verified against live pixels:

- `page_view`
- `video_play`
- `application_opened`
- `application_started`
- `application_completed`
- `qualified_lead`
- `call_booked`

`qualified_lead` and `call_booked` fire from the on-site preview and from a `?scheduled=1` redirect. Typeform’s embedded form does not tell this website which ending ran. For the Typeform path, mark those conversions inside Typeform and Calendly, or with their own pixel settings.

Set `siteConfig.siteUrl` to the real domain, including `https`, when you have one. That turns on the canonical URL and `og:url`.

## Legal pages

`/privacy`, `/terms`, and `/disclaimer` are drafts for a lawyer. They are not legal advice. `legalReviewed` is `false`, which keeps the draft banner up and tells search engines not to index those three pages.

After a lawyer reviews them, update the copy and set `legalReviewed` to `true`. Do not flip that flag only to hide the banner.

Add `contactEmail` when you have an address you want on the legal pages and in the footer.

## Deploy to Netlify

Do not deploy until you want the site public.

The repo already includes `netlify.toml` and `public/_redirects`.

1. Push this branch and merge it when you are ready.
2. In Netlify, add a new site from this GitHub repo.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Node version: 22 (already set in `netlify.toml`)
6. No environment variables are required. URLs are edited in `siteConfig.ts`, then the site is rebuilt.
7. After the first deploy, set `siteConfig.siteUrl` to the Netlify or custom domain and redeploy so canonical links are correct.

Netlify will serve the app as a single page and send `/privacy`, `/terms`, and `/disclaimer` to `index.html`.

## Checks already run

- `npm test` — 14 tests passed.
- `npm run lint` — clean.
- `npm run build` — typecheck and production build succeeded.

The production JavaScript is about 105KB gzipped, with the Typeform embed loaded only if a form URL is configured.
