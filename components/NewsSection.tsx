
import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, Search, Clock, User, X, Share2, ArrowLeft, Bookmark, Loader2 } from 'lucide-react';
import { NewsItem } from '../types';
import { fetchNews } from '../lib/actions';

interface NewsSectionProps {
  isFullPage?: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({ isFullPage = false }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    const { data } = await fetchNews();
    if (data) setNews(data);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedNews) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedNews]);

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = (news: NewsItem) => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <section className={`relative ${isFullPage ? 'pt-40 pb-20' : 'py-32'} bg-white`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 space-y-8 md:space-y-0">
          <div className="max-w-2xl">
            <span className="text-[#F3C623] text-xs font-black uppercase tracking-[0.5em] mb-6 block">Kanal Informasi</span>
            <h2 className="text-5xl md:text-7xl font-black text-[#0A0F1E] tracking-tighter leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
              Warta <br /> <span className="text-gray-200">Terbaru.</span>
            </h2>
          </div>
          
          <div className="w-full md:w-auto flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus-within:border-[#F3C623] transition-all">
            <Search className="h-5 w-5 text-gray-400 mr-4" />
            <input 
              type="text" 
              placeholder="Cari berita..."
              className="bg-transparent outline-none text-sm font-medium w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-[#F3C623] animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Memuat Warta...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-medium italic">Tidak ada berita yang ditemukan dengan kata kunci tersebut.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredNews.slice(0, isFullPage ? undefined : 3).map((item) => (
              <div 
                key={item.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedNews(item)}
              >
                <div className="relative h-[450px] rounded-[48px] overflow-hidden mb-8 shadow-2xl transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-yellow-500/10">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                    onError={(e) => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop'}
                  />
                  <div className="absolute top-8 left-8">
                    <span className="bg-[#F3C623] text-[#0A0F1E] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="flex items-center space-x-3 text-white/60 text-[10px] font-bold uppercase tracking-widest mb-4">
                      <Clock className="h-3.5 w-3.5 text-[#F3C623]" />
                      <span>{item.date}</span>
                    </div>
                    <h4 className="text-2xl font-black text-white leading-tight mb-2 group-hover:text-[#F3C623] transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      {item.title}
                    </h4>
                  </div>
                </div>
                
                <div className="px-4">
                  <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-2 mb-8 italic font-serif">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-3 w-3 text-gray-400" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.author_name}</span>
                    </div>
                    <button className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#0A0F1E] group/btn">
                      <span>Baca Detail</span>
                      <ChevronRight className="h-3 w-3 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reader Overlay */}
      {selectedNews && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-white overflow-hidden animate-reveal">
          <div className="h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-8 md:px-12 sticky top-0 z-10">
            <button 
              onClick={() => setSelectedNews(null)}
              className="group flex items-center space-x-4 text-[#0A0F1E] font-black text-[10px] uppercase tracking-widest hover:text-[#F3C623] transition-all"
            >
              <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-[#F3C623]/10 transition-all">
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline">Kembali</span>
            </button>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleShare(selectedNews)}
                className="p-4 hover:bg-gray-50 rounded-2xl text-gray-400 hover:text-[#0A0F1E] transition-all"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setSelectedNews(null)}
                className="p-4 bg-[#0A0F1E] text-white hover:bg-[#F3C623] hover:text-[#0A0F1E] rounded-2xl transition-all shadow-xl active:scale-90"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto custom-scrollbar">
            <div className="w-full h-[60vh] md:h-[75vh] relative overflow-hidden">
              <img 
                src={selectedNews.image_url} 
                alt={selectedNews.title} 
                className="w-full h-full object-cover"
                onError={(e) => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 max-w-7xl mx-auto">
                <div className="inline-block bg-[#F3C623] text-[#0A0F1E] px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl">
                  {selectedNews.category}
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-[#0A0F1E] leading-[0.95] tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>
                  {selectedNews.title}
                </h1>
              </div>
            </div>

            <div className="max-w-4xl mx-auto px-8 md:px-20 py-20">
              <div className="flex flex-wrap items-center gap-10 mb-20 pb-10 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-[20px] flex items-center justify-center text-[#F3C623]">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mb-1">Diterbitkan Oleh</p>
                    <p className="text-[#0A0F1E] font-black text-sm">{selectedNews.author_name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-[20px] flex items-center justify-center text-[#F3C623]">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mb-1">Tanggal Rilis</p>
                    <p className="text-[#0A0F1E] font-black text-sm">{selectedNews.date}</p>
                  </div>
                </div>
              </div>

              <div className="prose prose-xl prose-slate max-w-none">
                <p className="text-2xl font-serif italic text-gray-400 mb-16 leading-relaxed bg-gray-50 p-10 rounded-[40px] border-l-8 border-[#F3C623]">
                  {selectedNews.excerpt}
                </p>
                <div className="text-gray-600 text-xl font-light leading-[1.8] space-y-10 whitespace-pre-line">
                  {selectedNews.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsSection;
