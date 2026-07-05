import { EmailPage } from '../components/EmailPage/EmailPage';
import { emailList } from '../data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return emailList.map((email) => ({ id: email.id }));
}

export const dynamicParams = false;

export default async function Mail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!emailList.some((email) => email.id === id)) {
    notFound();
  }

  return <EmailPage id={id} />;
}
