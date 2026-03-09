import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '../../../../i18n';
import { BASE_URL } from '@/lib/constants';
import ContactContent from './ContactContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const languages: Record<string, string> = {};
  locales.forEach(loc => {
    languages[loc] = `${BASE_URL}/${loc}/contact/`;
  });
  languages['x-default'] = `${BASE_URL}/en/contact/`;

  return {
    title: t('contact.title'),
    description: t('contact.description'),
    keywords: t('contact.keywords'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact/`,
      languages,
    },
    openGraph: {
      title: t('contact.title'),
      description: t('contact.description'),
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}
