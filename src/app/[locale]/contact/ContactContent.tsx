'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './page.module.css';

const OFFICES = [
  { city: 'Seoul', country: 'South Korea', id: 'seoul', tag: 'HQ' },
  { city: 'Morogoro', country: 'Tanzania', id: 'morogoro', tag: 'Exclusive' },
  { city: 'Dubai', country: 'UAE', id: 'dubai', tag: '' },
  { city: 'Accra', country: 'Ghana', id: 'accra', tag: '' },
  { city: 'Cape Town', country: 'South Africa', id: 'capeTown', tag: '' },
  { city: 'Dhaka', country: 'Bangladesh', id: 'dhaka', tag: '' },
  { city: 'Montreal', country: 'Canada', id: 'montreal', tag: '' },
];

export default function ContactContent() {
  const t = useTranslations();
  const tc = useTranslations('contactPage');
  const [formData, setFormData] = useState({ name: '', company: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new',
        locale: typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en',
      });
      setSubmitStatus('success');
      setFormData({ name: '', company: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Page hero */}
      <section className={styles.pageHero}>
        <div className={styles.heroGlow} />
        <div className={styles.container}>
          <p className={styles.eyebrow}>{t('pages.contact.hero.eyebrow')}</p>
          <h1 className={styles.heroTitle}>{t('pages.contact.hero.title')}</h1>
          <p className={styles.heroLede}>{t('pages.contact.hero.lede')}</p>
        </div>
      </section>

      {/* Contact grid */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Info */}
            <div>
              <div className={styles.rule} />
              <h2 className={styles.infoTitle}>{t('pages.contact.hq.title')}</h2>
              <div className={styles.infoList}>
                <div>
                  <div className={styles.infoLabel}>{tc('info.address.label')}</div>
                  <div className={styles.infoValue}>{tc('info.address.value')}</div>
                </div>
                <div>
                  <div className={styles.infoLabel}>{tc('info.phone.label')}</div>
                  <a className={styles.infoValue} href="tel:+82-2-400-3084">+82-(0)2-400-3084</a>
                  <div className={styles.infoMuted}>{tc('info.fax.label')}: +82-(0)2-3444-3084</div>
                </div>
                <div>
                  <div className={styles.infoLabel}>{tc('info.email.label')}</div>
                  <a className={styles.infoValue} href="mailto:info@globalgroupkorea.com">info@globalgroupkorea.com</a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className={styles.formCard}>
              {submitStatus === 'success' ? (
                <div className={styles.success}>
                  <div className={styles.successCheck}>✓</div>
                  <h3 className={styles.successTitle}>{t('pages.contact.success.title')}</h3>
                  <p className={styles.successText}>{t('pages.contact.success.text')}</p>
                  <button type="button" className={styles.sendAnother} onClick={() => setSubmitStatus('idle')}>
                    {t('pages.contact.success.another')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className={styles.formTitle}>{t('pages.contact.form.title')}</h3>
                  {submitStatus === 'error' && <div className={styles.errorMsg}>{tc('form.error')}</div>}
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="name">{tc('form.name')} *</label>
                      <input id="name" name="name" className={styles.input} type="text" required value={formData.name} onChange={handleChange} disabled={isSubmitting} />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="company">{tc('form.company')}</label>
                      <input id="company" name="company" className={styles.input} type="text" value={formData.company} onChange={handleChange} disabled={isSubmitting} />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="email">{tc('form.email')} *</label>
                      <input id="email" name="email" className={styles.input} type="email" required value={formData.email} onChange={handleChange} disabled={isSubmitting} />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="subject">{tc('form.subject')} *</label>
                      <select id="subject" name="subject" className={styles.input} required value={formData.subject} onChange={handleChange} disabled={isSubmitting}>
                        <option value="">{tc('form.selectSubject')}</option>
                        <option value="energy-fuels">{t('home.areas.cards.energyFuels.name')}</option>
                        <option value="quartz">{t('home.areas.cards.quartz.name')}</option>
                        <option value="copper">{t('home.areas.cards.copper.name')}</option>
                        <option value="gold">{t('home.areas.cards.gold.name')}</option>
                        <option value="other">{tc('form.subjects.other')}</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="message">{tc('form.message')} *</label>
                    <textarea id="message" name="message" className={styles.input} rows={5} required value={formData.message} onChange={handleChange} disabled={isSubmitting}></textarea>
                  </div>
                  <button type="submit" className={styles.submit} disabled={isSubmitting}>
                    {isSubmitting ? tc('form.submitting') : tc('form.submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className={styles.offices}>
        <div className={styles.container}>
          <div className={styles.officesHeader}>
            <div className={styles.rule} />
            <h2 className={styles.sectionTitle}>{t('pages.contact.offices.title')}</h2>
            <p className={styles.sectionSub}>{t('pages.contact.offices.subtitle')}</p>
          </div>
          <div className={styles.officeGrid}>
            {OFFICES.map((o) => {
              const hq = o.tag === 'HQ';
              return (
                <div key={o.id} className={`${styles.officeCard} ${hq ? styles.officeHq : ''}`}>
                  <div className={styles.officeTop}>
                    <h3 className={styles.officeCity}>{o.city}</h3>
                    {o.tag && <span className={styles.officeTag}>{o.tag}</span>}
                  </div>
                  <div className={styles.officeCountry}>{o.country}</div>
                  <div className={styles.officeRole}>{t(`pages.contact.offices.roles.${o.id}`)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
