import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '../../../../i18n';
import { BASE_URL } from '@/lib/constants';
import BusinessContent from './BusinessContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const languages: Record<string, string> = {};
  locales.forEach(loc => {
    languages[loc] = `${BASE_URL}/${loc}/business/`;
  });
  languages['x-default'] = `${BASE_URL}/en/business/`;

  return {
    title: t('business.title'),
    description: t('business.description'),
    keywords: t('business.keywords'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/business/`,
      languages,
    },
    openGraph: {
      title: t('business.title'),
      description: t('business.description'),
    },
  };
}

export default async function BusinessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BusinessContent />;
}
