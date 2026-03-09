import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '../../../../i18n';
import { BASE_URL } from '@/lib/constants';
import AboutContent from './AboutContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const languages: Record<string, string> = {};
  locales.forEach(loc => {
    languages[loc] = `${BASE_URL}/${loc}/about/`;
  });
  languages['x-default'] = `${BASE_URL}/en/about/`;

  return {
    title: t('about.title'),
    description: t('about.description'),
    keywords: t('about.keywords'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/about/`,
      languages,
    },
    openGraph: {
      title: t('about.title'),
      description: t('about.description'),
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}
