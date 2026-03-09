import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '../../../../i18n';
import { BASE_URL } from '@/lib/constants';
import NewsContent from './NewsContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const languages: Record<string, string> = {};
  locales.forEach(loc => {
    languages[loc] = `${BASE_URL}/${loc}/news/`;
  });
  languages['x-default'] = `${BASE_URL}/en/news/`;

  return {
    title: t('news.title'),
    description: t('news.description'),
    keywords: t('news.keywords'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/news/`,
      languages,
    },
    openGraph: {
      title: t('news.title'),
      description: t('news.description'),
    },
  };
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NewsContent />;
}
