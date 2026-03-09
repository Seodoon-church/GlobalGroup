import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '../../../i18n';
import { BASE_URL, SITE_NAME } from '@/lib/constants';
import Hero from '@/components/Hero';
import GlobalNetwork from '@/components/GlobalNetwork';
import Business from '@/components/Business';
import Leadership from '@/components/Leadership';
import Stats from '@/components/Stats';
import InvestmentApproach from '@/components/InvestmentApproach';
import News from '@/components/News';
import CTA from '@/components/CTA';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const languages: Record<string, string> = {};
  locales.forEach(loc => {
    languages[loc] = `${BASE_URL}/${loc}/`;
  });
  languages['x-default'] = `${BASE_URL}/en/`;

  return {
    title: t('home.title'),
    description: t('home.description'),
    keywords: t('home.keywords'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/`,
      languages,
    },
    openGraph: {
      title: t('home.title'),
      description: t('home.description'),
      url: `${BASE_URL}/${locale}/`,
      siteName: SITE_NAME,
      type: 'website',
      images: [{
        url: `${BASE_URL}/images/logo.png`,
        width: 800,
        height: 600,
        alt: SITE_NAME,
      }],
    },
  };
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <GlobalNetwork />
      <Business />
      <Leadership />
      <Stats />
      <InvestmentApproach />
      <News />
      <CTA />
    </>
  );
}
