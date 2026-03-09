'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const parts = pathname.split('/').filter(Boolean);
    const locale = parts[0] || 'en';
    const page = parts.slice(1).join('/') || 'home';

    // Skip admin pages
    if (page.startsWith('admin')) return;

    const logPageView = async () => {
      try {
        await addDoc(collection(db, 'pageViews'), {
          path: pathname,
          page,
          locale,
          timestamp: serverTimestamp(),
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        });
      } catch (error) {
        // Silent fail
      }
    };

    logPageView();
  }, [pathname]);

  return null;
}
