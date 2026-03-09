import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '../../../../i18n';
import { BASE_URL } from '@/lib/constants';
import MarketContent from './MarketContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const languages: Record<string, string> = {};
  locales.forEach(loc => {
    languages[loc] = `${BASE_URL}/${loc}/market/`;
  });
  languages['x-default'] = `${BASE_URL}/en/market/`;

  return {
    title: t('market.title'),
    description: t('market.description'),
    keywords: t('market.keywords'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/market/`,
      languages,
    },
    openGraph: {
      title: t('market.title'),
      description: t('market.description'),
    },
  };
}

export default async function MarketPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MarketContent />;
}
