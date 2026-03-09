'use client';

import { useState, useEffect, useCallback } from 'react';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, query, orderBy, getDocs, limit, Timestamp } from 'firebase/firestore';
import styles from './page.module.css';

interface Inquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp | null;
  status: string;
  locale: string;
}

interface PageView {
  page: string;
  count: number;
}

interface LanguageView {
  language: string;
  count: number;
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard data
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [languageViews, setLanguageViews] = useState<LanguageView[]>([]);
  const [totalPageViews, setTotalPageViews] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setDataLoading(true);

    try {
      // Fetch inquiries
      const inquiriesQuery = query(
        collection(db, 'inquiries'),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const inquiriesSnapshot = await getDocs(inquiriesQuery);
      const inquiriesData: Inquiry[] = inquiriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name || '',
        company: doc.data().company || '',
        email: doc.data().email || '',
        subject: doc.data().subject || '',
        message: doc.data().message || '',
        createdAt: doc.data().createdAt || null,
        status: doc.data().status || 'new',
        locale: doc.data().locale || 'en',
      }));
      setInquiries(inquiriesData);

      // Fetch page views
      const pageViewsQuery = query(collection(db, 'pageViews'));
      const pageViewsSnapshot = await getDocs(pageViewsQuery);
      const pageViewsMap: Record<string, number> = {};
      const langViewsMap: Record<string, number> = {};
      let total = 0;

      pageViewsSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const page = data.page || doc.id;
        const count = data.count || 1;
        const lang = data.locale || data.language || 'unknown';

        // Aggregate by page
        pageViewsMap[page] = (pageViewsMap[page] || 0) + count;

        // Aggregate by language
        langViewsMap[lang] = (langViewsMap[lang] || 0) + count;

        total += count;
      });

      const sortedPageViews = Object.entries(pageViewsMap)
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count);

      const sortedLangViews = Object.entries(langViewsMap)
        .map(([language, count]) => ({ language, count }))
        .sort((a, b) => b.count - a.count);

      setPageViews(sortedPageViews);
      setLanguageViews(sortedLangViews);
      setTotalPageViews(total);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setDataLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoginLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setInquiries([]);
      setPageViews([]);
      setLanguageViews([]);
      setTotalPageViews(0);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const formatDate = (timestamp: Timestamp | null): string => {
    if (!timestamp) return '-';
    try {
      const date = timestamp.toDate();
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '-';
    }
  };

  const truncateMessage = (msg: string, maxLen: number = 80): string => {
    if (!msg) return '-';
    return msg.length > maxLen ? msg.substring(0, maxLen) + '...' : msg;
  };

  if (authLoading) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  // Login Screen
  if (!user) {
    return (
      <div className={styles.loginPage}>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <h1>Admin Dashboard</h1>
          <p className={styles.loginSubtitle}>GlobalGroup Korea</p>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@globalgroup.co.kr"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className={styles.loginButton} disabled={loginLoading}>
            {loginLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    );
  }

  // Dashboard
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>Admin Dashboard</h1>
        <div className={styles.headerButtons}>
          <button className={styles.refreshButton} onClick={fetchData} disabled={dataLoading}>
            {dataLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {dataLoading && <div className={styles.loading}>Loading dashboard data...</div>}

      {/* Summary Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Page Views</h3>
          <div className={styles.statValue}>{totalPageViews.toLocaleString()}</div>
        </div>
        <div className={styles.statCard}>
          <h3>Total Inquiries</h3>
          <div className={styles.statValue}>{inquiries.length}</div>
        </div>
        <div className={styles.statCard}>
          <h3>Active Languages</h3>
          <div className={styles.statValue}>{languageViews.length || 2}</div>
        </div>
      </div>

      {/* Page Views by Page */}
      <div className={styles.section}>
        <h2>Page Views by Page</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Page</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {pageViews.length > 0 ? (
                pageViews.map((pv, index) => (
                  <tr key={pv.page}>
                    <td>{index + 1}</td>
                    <td>{pv.page}</td>
                    <td>{pv.count.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: '#999' }}>
                    No page view data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Views by Language */}
      <div className={styles.section}>
        <h2>Views by Language</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Language</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {languageViews.length > 0 ? (
                languageViews.map((lv, index) => (
                  <tr key={lv.language}>
                    <td>{index + 1}</td>
                    <td>{lv.language.toUpperCase()}</td>
                    <td>{lv.count.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: '#999' }}>
                    No language data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Inquiries */}
      <div className={styles.section}>
        <h2>Contact Inquiries</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length > 0 ? (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td>{formatDate(inquiry.createdAt)}</td>
                    <td>{inquiry.name}</td>
                    <td>{inquiry.company || '-'}</td>
                    <td>
                      <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
                    </td>
                    <td>{inquiry.subject}</td>
                    <td title={inquiry.message}>{truncateMessage(inquiry.message)}</td>
                    <td>
                      <span className={styles.statusBadge}>{inquiry.status}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', color: '#999' }}>
                    No inquiries yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
