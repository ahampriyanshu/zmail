import { Drive, Kosh, LinkedIn, SuperTrips } from '@/app/content';

export const MailContent = ({ id }: { id: string }) => {
  switch (id) {
    case 'kosh':
      return <Kosh />;
    case 'supertrips':
      return <SuperTrips />;
    case 'drive':
      return <Drive />;
    case 'linkedin':
      return <LinkedIn />;

    default:
      return <></>;
  }
};
