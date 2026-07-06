import { EmailAttributes } from '@/types';

export const permanentData: EmailAttributes[] = [
  {
    id: 'kosh',
    subject: 'Welcome to Kosh: market briefs without the noise',
    summary:
      'Kosh turns scheduled market jobs into validated Indian stock-market reports, portfolio snapshots, and research notes you can revisit anytime.',
    body: 'Kosh is ready with daily market intelligence, scorecards, portfolio views, and research archives for the Indian market.',
    priority: 1,
    sender: {
      name: 'Kosh',
      logo: 'kosh.svg',
      email: 'briefings@kosh.ahampriyanshu.com',
    },
    type: 'inbox',
    tag: 'primary',
  },
  {
    id: 'supertrips',
    subject: 'SuperTrips: Discover curated routes across India',
    summary:
      'SuperTrips helps you browse curated India journeys, compare route stops, and open trip details like a travel diary built for planning.',
    body: 'SuperTrips is ready with curated route cards, city-by-city trip details, and a map-first way to explore journeys across India.',
    priority: 2,
    sender: {
      name: 'SuperTrips',
      logo: 'supertrips.svg',
      email: 'routes@supertrips.ahampriyanshu.com',
    },
    type: 'inbox',
    tag: 'primary',
  },
];

export const asyncData: EmailAttributes[] = [
  {
    id: 'linkedin',
    subject: 'I want to connect',
    summary:
      "join your LinkedIn network. Hi there, I'd like to join your professional network.",
    body: 'Hi, just a reminder that we have a meeting tomorrow at 10:00 AM.',
    priority: 1,
    sender: {
      name: 'Priyanshu Tiwari',
      logo: 'linkedin.png',
      email: 'invitations@linkedin.com',
    },
    type: 'inbox',
    tag: 'primary',
  },
  {
    id: 'drive',
    sender: {
      name: 'Priyanshu (via Google Drive)',
      email: 'drive-shares-dm-noreply@google.com',
    },
    subject: 'Item shared with you: ‘Resume.pdf’',
    summary:
      "Priyanshu shared an item Priyanshu (avampriyanshu@gmail.com) has shared the following item: Vaibhav-Resume.pdf Open If you don't want to receive files from this person, block the sender from Drive",
    file: {
      name: 'Resume.pdf',
      size: '1.2 MB',
      type: 'pdf',
    },
    priority: 2,
    type: 'inbox',
    tag: 'primary',
  },
];

export const defaultData: EmailAttributes[] = [...permanentData, ...asyncData];
