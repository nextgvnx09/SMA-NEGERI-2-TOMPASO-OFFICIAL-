
import { NewsItem } from '../types';

/**
 * MOCK DATABASE ACTIONS (LocalStorage Based)
 * Sistem ini memungkinkan Admin Dashboard bekerja tanpa backend database.
 */

const STORAGE_KEY = 'sman2t_news_data';
const AUTH_KEY = 'sman2t_admin_session';

// Data Awal untuk simulasi
const INITIAL_NEWS: NewsItem[] = [
  {
    id: '1',
    title: "SMAN 2 Tompaso Raih Penghargaan Sekolah Digital Terinovatif 2026",
    category: "Prestasi",
    date: new Date().toLocaleDateString('id-ID'),
    author_name: "Tim Humas",
    excerpt: "Berkat integrasi sistem pembelajaran berbasis AI, SMAN 2 Tompaso diakui sebagai pionir transformasi digital.",
    content: "SMAN 2 Tompaso resmi dinobatkan sebagai sekolah digital paling inovatif tahun ini. Penghargaan ini diberikan atas keberhasilan sekolah dalam mengimplementasikan platform pembelajaran berbasis cloud dan kecerdasan buatan (AI).",
    image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
    created_at: new Date().toISOString()
  }
];

// Sinkronisasi Data
const getStoredNews = (): NewsItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NEWS));
    return INITIAL_NEWS;
  }
  return JSON.parse(stored);
};

/**
 * Authentication (Mock)
 */
export const login = async (email: string, password: string) => {
  // Simulasi login sederhana: email apapun & password 'admin123' atau 'sman2tompaso'
  if ((email.includes('@') && password === 'admin123') || password === 'sman2tompaso') {
    const session = { id: 'admin-1', email, expires: Date.now() + 86400000 };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return { data: { user: session }, error: null };
  }
  return { data: { user: null }, error: { message: 'Kredensial salah. Gunakan password: admin123' } };
};

export const logout = async () => {
  localStorage.removeItem(AUTH_KEY);
  return { error: null };
};

export const getCurrentUser = async () => {
  const session = localStorage.getItem(AUTH_KEY);
  if (!session) return null;
  const parsed = JSON.parse(session);
  if (Date.now() > parsed.expires) {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
  return parsed;
};

/**
 * Database Operations (LocalStorage Implementation)
 */
export const fetchNews = async () => {
  try {
    const data = getStoredNews();
    return { data, error: null };
  } catch (err) {
    return { data: [], error: err };
  }
};

export const fetchCategories = async () => {
  return { 
    data: [
      { name: 'Pendidikan' }, 
      { name: 'Prestasi' }, 
      { name: 'Kegiatan Siswa' }, 
      { name: 'Agenda Sekolah' }, 
      { name: 'Pengumuman' }
    ], 
    error: null 
  };
};

export const insertNews = async (news: Omit<NewsItem, 'id' | 'date'>) => {
  const currentNews = getStoredNews();
  const newEntry: NewsItem = {
    ...news,
    id: Math.random().toString(36).substring(2, 11),
    date: new Date().toLocaleDateString('id-ID'),
    created_at: new Date().toISOString()
  };
  
  const updated = [newEntry, ...currentNews];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return { data: [newEntry], error: null };
};

export const updateNews = async (id: string | number, news: Omit<NewsItem, 'id' | 'date'>) => {
  const currentNews = getStoredNews();
  const updated = currentNews.map(item => 
    item.id.toString() === id.toString() 
      ? { ...item, ...news } 
      : item
  );
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return { data: updated, error: null };
};

export const deleteNews = async (id: string | number) => {
  const currentNews = getStoredNews();
  const filtered = currentNews.filter(item => item.id.toString() !== id.toString());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return { error: null };
};
