
import React, { useState } from 'react';
import { User, Award, GraduationCap, Briefcase, Loader2, FileText, Send, ArrowUpRight, CloudUpload } from 'lucide-react';
import { SCHOOL_ASSETS } from '../constants/assets';

interface Teacher {
  name: string;
  role: string;
  type: 'kepala' | 'guru' | 'staf';
}

const TEACHERS_DATA: Teacher[] = [
  { name: 'Junus N M Akay', role: 'Kepala Sekolah', type: 'kepala' },
  { name: 'Novie Kalengkongan', role: 'Guru PJOK', type: 'guru' },
  { name: 'Diane Langi', role: 'Guru Fisika', type: 'guru' },
  { name: 'Rosni Lumentah', role: 'Guru Informatika', type: 'guru' },
  { name: 'Rike Tulenan', role: 'Guru Biologi', type: 'guru' },
  { name: 'Junita Takalamingan', role: 'Guru Kimia', type: 'guru' },
  { name: 'Merina Sumera', role: 'Guru Kimia', type: 'guru' },
  { name: 'Riany Kolibu', role: 'Guru Biologi', type: 'guru' },
  { name: 'Elsa Palar', role: 'Guru PPKN', type: 'guru' },
  { name: 'Yola Keles', role: 'Guru Ekonomi', type: 'guru' },
  { name: 'Ruly Kaparang', role: 'Guru Geografi', type: 'guru' },
  { name: 'Ireine Mukuan', role: 'Guru Bahasa Inggris', type: 'guru' },
  { name: 'Jessica Umboh', role: 'Guru Sosiologi', type: 'guru' },
  { name: 'Amelia Umboh', role: 'Guru Bahasa Indonesia', type: 'guru' },
  { name: 'Djenly Pajow', role: 'Guru Sejarah', type: 'guru' },
  { name: 'Natalia Siri', role: 'Guru Agama', type: 'guru' },
  { name: 'Eva Sepang', role: 'Guru Bahasa Jerman', type: 'guru' },
  { name: 'David Paembonan', role: 'Guru Matematika', type: 'guru' },
  { name: 'Jimri Roring', role: 'Staf TU', type: 'staf' },
  { name: 'Oktavia Laloan', role: 'Staf TU', type: 'staf' },
];

const TeacherCard: React.FC<{ teacher: Teacher }> = ({ teacher }) => {
  const isPrincipal = teacher.type === 'kepala';
  const [imgLoading, setImgLoading] = useState(true);
  
  return (
    <div className={`group relative overflow-hidden transition-all duration-500 ${
      isPrincipal ? 'col-span-full mb-12' : ''
    }`}>
      <div className={`p-8 rounded-[40px] border border-gray-100 h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        isPrincipal ? 'bg-[#0A0F1E] text-white flex flex-col md:flex-row items-center gap-10' : 'bg-white'
      }`}>
        
        <div className={`relative shrink-0 w-24 h-24 md:w-40 md:h-40 rounded-[32px] overflow-hidden flex items-center justify-center text-3xl font-black shadow-xl transform group-hover:rotate-3 transition-transform ${
          isPrincipal ? 'bg-[#F3C623] text-[#0A0F1E]' : 'bg-gray-50 text-gray-300 group-hover:bg-[#F3C623]/10 group-hover:text-[#F3C623]'
        }`}>
          {isPrincipal ? (
            <>
              {imgLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#F3C623]">
                  <Loader2 className="h-6 w-6 animate-spin text-[#0A0F1E]" />
                </div>
              )}
              <img 
                src={SCHOOL_ASSETS.PRINCIPAL_PHOTO} 
                alt={teacher.name}
                onLoad={() => setImgLoading(false)}
                className={`w-full h-full object-cover object-top transition-opacity duration-700 ${imgLoading ? 'opacity-0' : 'opacity-100'}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop';
                  setImgLoading(false);
                }}
              />
            </>
          ) : (
            teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)
          )}
        </div>

        <div className="flex-grow">
          <div className="flex items-center space-x-3 mb-2">
             {isPrincipal ? (
               <Award className="h-5 w-5 text-[#F3C623]" />
             ) : teacher.type === 'guru' ? (
               <GraduationCap className="h-4 w-4 text-[#F3C623]" />
             ) : (
               <Briefcase className="h-4 w-4 text-[#F3C623]" />
             )}
             <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isPrincipal ? 'text-[#F3C623]' : 'text-gray-400'}`}>
               {teacher.role}
             </span>
          </div>
          <h3 className={`text-2xl md:text-4xl font-black tracking-tight ${isPrincipal ? 'text-white' : 'text-[#0A0F1E]'}`}>
            {teacher.name}
          </h3>
          {isPrincipal && (
            <p className="mt-6 text-white/50 font-light max-w-2xl text-base md:text-lg leading-relaxed italic">
              "Kami berkomitmen membangun ekosistem pendidikan yang tidak hanya unggul secara akademis, namun juga kuat dalam karakter dan integritas budaya."
            </p>
          )}
        </div>
        
        {!isPrincipal && (
          <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-10 transition-opacity">
            <User className="h-20 w-20 text-[#0A0F1E]" />
          </div>
        )}
      </div>
    </div>
  );
};

const TeachersSection: React.FC = () => {
  const kepala = TEACHERS_DATA.find(t => t.type === 'kepala');
  const guru = TEACHERS_DATA.filter(t => t.type === 'guru');
  const staf = TEACHERS_DATA.filter(t => t.type === 'staf');

  // URL Google Form resmi yang diberikan oleh user
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdk_7z2iWeIGTFdZ8JpKZV5pEP57snFDUuCofZWl3IDj67AZQ/viewform";

  return (
    <div className="pt-40 pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <span className="text-[#F3C623] font-black tracking-[0.5em] uppercase text-xs mb-6 block">Our Educator Team</span>
          <h1 className="text-5xl md:text-7xl font-black text-[#0A0F1E] tracking-tighter leading-none mb-8">
            Direktori <br /> <span className="text-gray-200">Guru & Staf.</span>
          </h1>
          <p className="text-gray-500 text-xl font-light leading-relaxed">
            Mengenal lebih dekat para pendidik dan tenaga kependidikan hebat yang membimbing siswa-siswi SMAN 2 Tompaso setiap harinya.
          </p>
        </div>

        {/* Kepala Sekolah Highlight */}
        {kepala && <TeacherCard teacher={kepala} />}

        {/* Tenaga Pendidik Section */}
        <div className="mb-20">
          <div className="flex items-center space-x-6 mb-12">
            <h2 className="text-2xl font-black text-[#0A0F1E] tracking-tight uppercase">Tenaga Pendidik</h2>
            <div className="h-px flex-grow bg-gray-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guru.map((t, i) => (
              <TeacherCard key={i} teacher={t} />
            ))}
          </div>
        </div>

        {/* Tenaga Kependidikan Section */}
        <div className="mb-32">
          <div className="flex items-center space-x-6 mb-12">
            <h2 className="text-2xl font-black text-[#0A0F1E] tracking-tight uppercase">Tenaga Kependidikan</h2>
            <div className="h-px flex-grow bg-gray-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staf.map((t, i) => (
              <TeacherCard key={i} teacher={t} />
            ))}
          </div>
        </div>

        {/* TEACHER CONTRIBUTION HUB (Google Form Link) */}
        <div className="relative group overflow-hidden bg-[#0A0F1E] rounded-[60px] p-12 md:p-24 text-white shadow-3xl shadow-blue-900/20">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F3C623]/10 rounded-full blur-[100px] -mr-40 -mt-40 animate-pulse"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-8">
                <CloudUpload className="h-4 w-4 text-[#F3C623]" />
                <span className="text-[#F3C623] text-[10px] font-black uppercase tracking-[0.3em]">Portal Kontribusi Guru</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
                Submit Warta <br /> <span className="text-white/20 italic font-serif">Vision 2026.</span>
              </h2>
              <p className="text-white/40 text-lg font-light leading-relaxed mb-4">
                Punya kabar berita, prestasi siswa, atau agenda kelas? Kirimkan melalui Portal Kontribusi Guru untuk kami publikasikan di website resmi.
              </p>
            </div>

            <div className="shrink-0">
              <a 
                href={GOOGLE_FORM_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/btn relative flex flex-col items-center bg-[#F3C623] text-[#0A0F1E] p-14 rounded-[50px] shadow-2xl hover:scale-105 active:scale-95 transition-all duration-500"
              >
                <div className="absolute top-4 right-4 bg-[#0A0F1E] p-2 rounded-full text-white group-hover/btn:rotate-45 transition-transform">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <FileText className="h-12 w-12 mb-6" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Isi Google Form</span>
                <span className="text-[8px] font-bold text-[#0A0F1E]/40 mt-2 uppercase tracking-widest">Digital Submission Port</span>
              </a>
            </div>
          </div>
          
          {/* Footer Atribusi dalam hub */}
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] font-bold text-white/20 uppercase tracking-[0.4em]">
            <p>INTEGRATED NEWS SYSTEM BY CHRISTIAN LEMPOY</p>
            <p>SMAN 2 TOMPASO OFFICIAL ECOSYSTEM</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeachersSection;
