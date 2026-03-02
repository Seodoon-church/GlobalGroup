import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import GlobalNetwork from '@/components/GlobalNetwork';
import Business from '@/components/Business';
import Leadership from '@/components/Leadership';
import Stats from '@/components/Stats';
import InvestmentApproach from '@/components/InvestmentApproach';
import CTA from '@/components/CTA';

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
      <CTA />
    </>
  );
}
