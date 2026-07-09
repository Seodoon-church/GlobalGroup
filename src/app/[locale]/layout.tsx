import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, Locale } from '../../../i18n';
import { BASE_URL, SITE_NAME } from '@/lib/constants';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FirebaseAnalytics from '@/components/FirebaseAnalytics';
import PageViewTracker from '@/components/PageViewTracker';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const languages: Record<string, string> = {};
  locales.forEach(loc => {
    languages[loc] = `${BASE_URL}/${loc}/`;
  });
  languages['x-default'] = `${BASE_URL}/en/`;

  return {
    title: {
      default: t('title'),
      template: `%s | ${SITE_NAME}`,
    },
    description: t('description'),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}/`,
      languages,
    },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      url: `${BASE_URL}/${locale}/`,
      siteName: SITE_NAME,
      locale: locale,
      type: 'website',
      images: [{
        url: `${BASE_URL}/images/logo.png`,
        width: 800,
        height: 600,
        alt: SITE_NAME,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('ogDescription'),
      images: [`${BASE_URL}/images/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Global Group Korea Co., Ltd.',
    alternateName: ['GGK', 'Global Group Korea', '글로벌그룹코리아'],
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description: 'International commodity trading company specializing in crude oil, copper, quartz, and gold across 25+ countries since 1987.',
    foundingDate: '1987',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
    },
    areaServed: ['Africa', 'Asia', 'Middle East', 'North America'],
    knowsAbout: ['Crude Oil Trading', 'Copper Trading', 'Quartz Mining', 'Gold Trading', 'International Commodity Trading'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '#507 New Family Officetels 2, 28 Gil 6 Songpa-dae-ro',
      addressLocality: 'Songpa-gu',
      addressRegion: 'Seoul',
      addressCountry: 'KR',
      postalCode: '05836',
    },
    telephone: '+82-2-400-3084',
    faxNumber: '+82-2-400-3089',
    email: 'info@globalgroupkorea.com',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-2-400-3084',
      email: 'info@globalgroupkorea.com',
      contactType: 'customer service',
      availableLanguage: ['English', 'Korean', 'Japanese', 'Chinese', 'French', 'Arabic', 'Hindi', 'Bengali', 'Swahili'],
    },
    sameAs: [
      'https://www.linkedin.com/company/global-group-korea',
    ],
  };

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="naver-site-verification" content="naverf27c62c630ee2a6de6a4dd0e2ef1f076" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <FirebaseAnalytics />
        <PageViewTracker />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
