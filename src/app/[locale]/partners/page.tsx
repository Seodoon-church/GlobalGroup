import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '../../../../i18n';
import { BASE_URL } from '@/lib/constants';
import PartnersContent from './PartnersContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const languages: Record<string, string> = {};
  locales.forEach(loc => {
    languages[loc] = `${BASE_URL}/${loc}/partners/`;
  });
  languages['x-default'] = `${BASE_URL}/en/partners/`;

  return {
    title: t('partners.title'),
    description: t('partners.description'),
    keywords: t('partners.keywords'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/partners/`,
      languages,
    },
    openGraph: {
      title: t('partners.title'),
      description: t('partners.description'),
    },
  };
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PartnersContent />;
}
