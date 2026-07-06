import { ProductWelcome } from '../ProductWelcome/ProductWelcome';

export const SuperTrips = () => (
  <ProductWelcome
    variant='supertrips'
    logo='/icons/supertrips.svg'
    brand='SuperTrips'
    eyebrow='Travel routes'
    title='SuperTrips: Discover curated routes across India'
    intro='SuperTrips is a curated collection of journeys across India. It turns long route ideas into browsable trip cards, city stops, map context, and practical details for planning or remembering.'
    cta={{
      label: 'Open SuperTrips',
      href: 'https://supertrips.ahampriyanshu.com',
    }}
    highlights={[
      { label: 'Coverage', value: 'Routes across India' },
      { label: 'View', value: 'Map-first planning' },
      { label: 'Use it for', value: 'Backpacking ideas' },
    ]}
    sections={[
      {
        title: 'Browse route cards',
        body: 'Start from the route grid to compare journey names, stop counts, and previews before opening the detailed itinerary.',
      },
      {
        title: 'Open city-by-city details',
        body: 'Each trip breaks into cities with local notes, highlights, movement context, and enough texture to make the route feel real.',
      },
      {
        title: 'Use it as a memory map',
        body: 'The app is built like a personal travel atlas: useful for planning, but also good for revisiting the shape of a journey later.',
      },
    ]}
  />
);
