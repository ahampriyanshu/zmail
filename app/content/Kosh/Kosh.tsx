import { ProductWelcome } from '../ProductWelcome/ProductWelcome';

export const Kosh = () => (
  <ProductWelcome
    variant='kosh'
    logo='/icons/kosh.svg'
    brand='Kosh'
    eyebrow='Market intelligence'
    title='Your Indian-market brief is already being assembled.'
    intro='Kosh is a personal stock-intelligence desk for NSE/BSE. Scheduled jobs collect market data, generate validated reports, and publish a static dashboard without an always-on server.'
    cta={{
      label: 'Open Kosh',
      href: 'https://kosh.ahampriyanshu.com',
    }}
    highlights={[
      { label: 'Cadence', value: 'Daily, weekly, monthly' },
      { label: 'Focus', value: 'Signals over noise' },
      { label: 'Source', value: 'Git-backed reports' },
    ]}
    sections={[
      {
        title: 'Start with the daily brief',
        body: 'Read the market outlook, key takeaways, global cues, sector movement, and stocks in focus before the session gets noisy.',
      },
      {
        title: 'Track calls over time',
        body: 'Weekly and monthly views keep a scorecard of previous calls, so the dashboard stays accountable instead of becoming another feed.',
      },
      {
        title: 'Bring portfolio context',
        body: 'The encrypted portfolio page lets you review holdings privately after syncing a Kite snapshot with your own phrase.',
      },
    ]}
  />
);
