import {
  CALENDLY_URL_PLACEHOLDER,
  TYPEFORM_URL_PLACEHOLDER,
} from '../lib/integrations.ts'

/**
 * ZachFlipsWhips content settings.
 *
 * Edit this file for ordinary updates: copy, links, photos, video,
 * testimonials, and integration URLs. Components read from here.
 *
 * Do not put secrets in this file. Everything here is public in the website bundle.
 */
export const siteConfig = {
  name: 'ZachFlipsWhips',
  owner: 'Zach',
  dealership: 'Regal Auto Sales',
  region: 'California',
  contactEmail: '',
  siteUrl: '',
  legalReviewed: false,
  typeformUrl: TYPEFORM_URL_PLACEHOLDER,
  calendlyUrl: CALENDLY_URL_PLACEHOLDER,
  social: {
    instagram: 'https://www.instagram.com/zachflipswhips/',
    tiktok: 'https://www.tiktok.com/@zachflipswhips',
  },
  seo: {
    title: 'ZachFlipsWhips | Learn Car Flipping & Auction Strategies',
    description:
      'Learn how to flip cars, understand dealer-only auctions, and explore mentorship with ZachFlipsWhips.',
  },
  cta: {
    nav: 'Apply Now',
    heroPrimary: 'Apply to Work With Me',
    heroSecondary: 'Watch How It Works',
    video: 'Apply to Work With Me',
    mentorship: 'Apply for Mentorship',
    auction: 'Explore Auction Access',
    about: 'Learn From My Experience',
    final: 'Apply Now',
    sticky: 'Apply to Work With Me',
  },
  nav: [
    { label: 'About', id: 'about' },
    { label: 'Programs', id: 'programs' },
    { label: 'Results', id: 'results' },
    { label: 'FAQ', id: 'faq' },
  ],
  hero: {
    eyebrow: 'Car flipping • Mentorship • Auction education',
    lineOneLead: 'Learn to',
    lineOneAccent: 'Flip Cars.',
    lineTwoLead: 'Build Your Own',
    lineTwoTail: 'Business.',
    subheadline:
      'Learn how to find, buy, and sell profitable vehicles using the same processes I use to run my own dealership.',
    operator: 'Zach · Operator, Regal Auto Sales',
    proof: [
      { label: 'Operator', value: 'Regal Auto Sales' },
      { label: 'Licensed dealership', value: 'California' },
      { label: 'Focus', value: 'Buying, selling, auctions' },
      { label: 'Next step', value: 'Apply, then a call' },
    ],
  },
  video: {
    index: '01',
    label: 'Introduction',
    heading: 'Meet Zach.',
    placeholderTitle: 'Your Video Goes Here',
    placeholderSubtitle: 'Meet Zach and learn how car flipping works.',
    mp4: '',
    embedUrl: '',
    poster: '',
  },
  offers: {
    index: '02',
    label: 'Programs',
    title: 'Choose Your Path',
    lede: "Whether you're learning your first flip or exploring dealer-only auctions, start with the right guidance.",
    note: 'Mentorship does not make you a dealer, and it does not unlock unrestricted auction access.',
    mentorship: {
      kicker: 'Car flipping mentorship',
      title: 'Learn to Flip Cars',
      description:
        'Learn how to identify opportunities, evaluate vehicles, negotiate deals, and confidently navigate the car-flipping process.',
      benefits: [
        'Finding undervalued vehicles.',
        'Evaluating potential deals.',
        'Understanding auction buying.',
        'Negotiating purchases.',
        'Calculating costs and potential margins.',
        'Avoiding expensive beginner mistakes.',
        'Learning practical dealership strategies.',
      ],
      note: 'This is education and guidance. It is not a promise of profit, and it is not a partnership in Regal Auto Sales.',
    },
    auction: {
      kicker: 'Dealer-only auction education',
      title: 'Explore Dealer-Only Auctions',
      description:
        'Understand how dealer-only auctions work, what opportunities exist, and how to explore legitimate access options.',
      benefits: [
        'Understanding dealer-only auctions.',
        'Learning auction procedures.',
        'Understanding auction fees.',
        'Evaluating vehicle conditions.',
        'Learning licensing requirements.',
        'Exploring lawful access arrangements.',
      ],
      note: 'Access is not automatic. It depends on licensing, eligibility, auction rules, and applicable law.',
    },
  },
  about: {
    index: '03',
    label: 'About',
    titleLead: "I'm Not Just Teaching It.",
    titleAccent: "I'm Doing It.",
    paragraphs: [
      "I'm Zach, the creator of ZachFlipsWhips and operator of Regal Auto Sales.",
      "I share what I've learned buying and selling vehicles, navigating auctions, and operating a real dealership.",
      'My goal is to help aspiring car flippers understand the business and avoid common mistakes.',
    ],
    portrait: {
      src: '',
      alt: 'Portrait of Zach',
      label: 'Portrait',
    },
    dealershipPhoto: {
      src: '',
      alt: 'Zach at Regal Auto Sales',
      label: 'At the dealership',
    },
  },
  process: {
    index: '04',
    label: 'Process',
    title: 'Getting Started Is Simple',
    steps: [
      {
        title: 'Apply',
        body: 'Tell me about your goals, experience, and where you currently are.',
      },
      {
        title: 'Book a Call',
        body: 'If your application is a good fit, choose a time to discuss your goals.',
      },
      {
        title: 'Get Started',
        body: 'Explore the mentorship or educational resources that best match your situation.',
      },
    ],
  },
  results: {
    index: '05',
    label: 'Results',
    title: 'Real People. Real Progress.',
    lede: 'Stories belong here once they are real, permissioned, and specific.',
    video: {
      title: 'Video testimonial',
      caption: 'A customer, in their own words.',
      src: '',
      poster: '',
    },
    message: {
      title: 'Customer message',
      caption: 'A real conversation, shared with permission.',
      src: '',
      alt: 'Screenshot of a customer message',
    },
  },
  testimonials: [
    {
      id: 'evaluate',
      quote:
        'I kept sending cars I thought were deals, and the feedback was always about the costs I had skipped. Reconditioning, fees, how long it might sit. The first time I walked a car after that, it felt less like a guess.',
      name: 'Jordan P.',
      initials: 'JP',
      context: 'Learning to evaluate a first vehicle',
      sample: true,
      photo: '',
    },
    {
      id: 'auctions',
      quote:
        "I used to think a dealer auction was just a cheaper Marketplace. It isn't. I still don't have a dealer license, but I can follow the process now, and I know a low hammer price can get expensive once the fees land.",
      name: 'Chris A.',
      initials: 'CA',
      context: 'Getting more comfortable with auctions',
      sample: true,
      photo: '',
    },
    {
      id: 'first-flip',
      quote:
        "I was about to buy a car because I liked it. Writing the numbers out made me pass. I'd rather wait for a car that fits the plan than rush the first one.",
      name: 'Morgan L.',
      initials: 'ML',
      context: 'Approaching a first flip',
      sample: true,
      photo: '',
    },
    {
      id: 'buying',
      quote:
        "My old strategy was sorting by the lowest price. I don't do that anymore. I keep a short list of costs I check before I get attached, and I walk away more often. That part has been useful.",
      name: 'Andre S.',
      initials: 'AS',
      context: 'Improving a vehicle buying strategy',
      sample: true,
      photo: '',
    },
    {
      id: 'starting',
      quote:
        "I want to build a car business, not just sell one car. Hearing it from someone who runs a store made the unglamorous parts obvious. Licensing, patience, and not pretending a single flip is a company. I feel clearer about what I'm actually starting.",
      name: 'Taylor R.',
      initials: 'TR',
      context: 'Gaining confidence to start a car-flipping business',
      sample: true,
      photo: '',
    },
  ],
  faq: {
    index: '06',
    label: 'FAQ',
    title: 'Questions, Answered Plainly',
    items: [
      {
        question: 'Do I need experience flipping cars?',
        answer:
          'No. Beginners are welcome, and so are people who have already bought and sold a few cars. You do need to treat the money in a deal as capital you can afford to risk.',
      },
      {
        question: 'How much money do I need to start?',
        answer:
          'There isn’t one number for every market. For a mentorship call, a practical floor is about $3,000 in capital you can use for the business. With less than that, the free education is usually the better start. Don’t use rent money, grocery money, or anything you can’t afford to lose.',
      },
      {
        question: 'Do I need a dealer license?',
        answer:
          'Sometimes. Selling an occasional car is not the same as operating a dealership, and the line depends on your state. Running a store, and access to most dealer-only auctions, generally requires licensing. I operate Regal Auto Sales as a licensed California dealership. This site does not issue a license, and mentorship does not make you a dealer.',
      },
      {
        question: 'What are dealer-only auctions?',
        answer:
          'They are wholesale auctions that limit who can bid, usually to licensed dealers or other people the auction has approved. Dealers use them to buy inventory. They are not the same thing as a public listing site.',
      },
      {
        question: 'Can anyone access dealer-only auctions?',
        answer:
          'No. Each auction sets its own rules. Access also depends on licensing, eligibility, and the law where you operate. Paying for education does not unlock unrestricted access or dealer privileges.',
      },
      {
        question: 'How does mentorship work?',
        answer:
          'You apply first. If your goals, timing, and capital look like a fit, you book a call. Mentorship is practical guidance from how I buy, evaluate, and sell vehicles and how I run my dealership. It is teaching. It is not a job, not a partnership in Regal Auto Sales, and not a promise of income.',
      },
      {
        question: 'Is car flipping profitable?',
        answer:
          'It can be, and it can also lose money. The result depends on the purchase price, condition, repairs, fees, how long the car sits, and what a buyer will actually pay. Nobody can honestly guarantee a profit. The education is meant to help you judge a deal more clearly and avoid expensive beginner mistakes.',
      },
      {
        question: 'How do I get started?',
        answer:
          'Apply and answer a short set of questions. If it looks like a fit, you can book a call. If you’re still researching, or working with limited capital, start with the videos on Instagram and TikTok and learn the process before you buy a car or pay for mentorship.',
      },
    ],
  },
  finalCta: {
    title: 'Ready to Take Car Flipping Seriously?',
    lede: 'Apply to see if working together makes sense for your goals.',
  },
  tracking: {
    googleAnalyticsId: '',
    metaPixelId: '',
    tiktokPixelId: '',
  },
}

export type Testimonial = (typeof siteConfig.testimonials)[number]
