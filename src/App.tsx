import { useState, useEffect } from 'react';
import { Leaf, Upload, Menu, X, ChevronRight, Building2, Award } from 'lucide-react';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import SpeciesPage from './pages/SpeciesPage';
import AboutPage from './pages/AboutPage';
import { INITIAL_DATASET_SEQUENCES, SequenceRecord } from './data/sequencesDataset';

export type Page = 'home' | 'dashboard' | 'upload' | 'species' | 'about';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dataset, setDataset] = useState<SequenceRecord[]>(INITIAL_DATASET_SEQUENCES);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash === 'dashboard') setCurrentPage('dashboard');
      else if (hash === 'dashboard/upload' || hash === 'upload') setCurrentPage('upload');
      else if (hash === 'species') setCurrentPage('species');
      else if (hash === 'about') setCurrentPage('about');
      else setCurrentPage('home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'home') window.location.hash = '#/';
    else if (page === 'dashboard') window.location.hash = '#/dashboard';
    else if (page === 'upload') window.location.hash = '#/dashboard/upload';
    else if (page === 'species') window.location.hash = '#/species';
    else if (page === 'about') window.location.hash = '#/about';
  };

  const handleAddReads = (newReads: SequenceRecord[]) => {
    setDataset((prev) => [...newReads, ...prev]);
  };

  const getBreadcrumbLabel = () => {
    switch (currentPage) {
      case 'dashboard': return 'Sequence Reads Dashboard';
      case 'upload': return 'Dashboard > Upload Sample File';
      case 'species': return 'Sequence Register & Species Info';
      case 'about': return 'About eDNA BioTrack & Documentation';
      default: return 'Portal Overview';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F1] text-[#222222]">
      {/* Top Utility & Emblem Header Bar */}
      <div className="bg-[#1B5E20] text-white py-1.5 px-4 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-[#A5D6A7]" />
            <span>National Environmental DNA Biodiversity Portal • SIH 2025</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#C8E6C9]">
            <span>Platform: eDNA BioTrack</span>
            <span>•</span>
            <span>Dataset: 200 Real Reads</span>
          </div>
        </div>
      </div>

      {/* Main Government Portal Header */}
      <header className="bg-white border-b border-[#D7D6D0] sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Name (Left) */}
          <div
            onClick={() => navigate('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-sm bg-[#E8F5E9] border border-[#A5D6A7] text-[#1B5E20] flex items-center justify-center font-bold shadow-xs">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-[#1B5E20] leading-tight">
                eDNA BioTrack
              </div>
              <div className="text-xs text-[#555555]">
                National Environmental DNA Biodiversity Portal
              </div>
            </div>
          </div>

          {/* Nav Links (Center/Right) */}
          <nav className="hidden md:flex items-center gap-1 border-l border-[#D7D6D0] pl-6">
            <button
              onClick={() => navigate('home')}
              className={`px-4 py-2 text-xs font-bold rounded-sm cursor-pointer transition-colors ${
                currentPage === 'home'
                  ? 'bg-[#E8F5E9] text-[#1B5E20] border-b-2 border-b-[#2E7D32]'
                  : 'text-[#444444] hover:text-[#1B5E20] hover:bg-[#FAF9F5]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('dashboard')}
              className={`px-4 py-2 text-xs font-bold rounded-sm cursor-pointer transition-colors ${
                currentPage === 'dashboard'
                  ? 'bg-[#E8F5E9] text-[#1B5E20] border-b-2 border-b-[#2E7D32]'
                  : 'text-[#444444] hover:text-[#1B5E20] hover:bg-[#FAF9F5]'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('species')}
              className={`px-4 py-2 text-xs font-bold rounded-sm cursor-pointer transition-colors ${
                currentPage === 'species'
                  ? 'bg-[#E8F5E9] text-[#1B5E20] border-b-2 border-b-[#2E7D32]'
                  : 'text-[#444444] hover:text-[#1B5E20] hover:bg-[#FAF9F5]'
              }`}
            >
              Species Info
            </button>
            <button
              onClick={() => navigate('about')}
              className={`px-4 py-2 text-xs font-bold rounded-sm cursor-pointer transition-colors ${
                currentPage === 'about'
                  ? 'bg-[#E8F5E9] text-[#1B5E20] border-b-2 border-b-[#2E7D32]'
                  : 'text-[#444444] hover:text-[#1B5E20] hover:bg-[#FAF9F5]'
              }`}
            >
              About
            </button>
          </nav>

          {/* Outlined "Upload Sample" CTA Button (Right) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('upload')}
              className="btn-gov-outline flex items-center gap-2 text-xs"
            >
              <Upload className="w-4 h-4 text-[#2E7D32]" />
              <span>Upload Sample</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-sm border border-[#D7D6D0] bg-[#FAF9F5] text-[#222222]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#D7D6D0] px-4 py-4 space-y-2">
            <button
              onClick={() => navigate('home')}
              className="w-full text-left px-3 py-2 text-xs font-bold text-[#222222] hover:bg-[#FAF9F5]"
            >
              Home Overview
            </button>
            <button
              onClick={() => navigate('dashboard')}
              className="w-full text-left px-3 py-2 text-xs font-bold text-[#222222] hover:bg-[#FAF9F5]"
            >
              Sequence Dashboard
            </button>
            <button
              onClick={() => navigate('species')}
              className="w-full text-left px-3 py-2 text-xs font-bold text-[#222222] hover:bg-[#FAF9F5]"
            >
              Species Info Register
            </button>
            <button
              onClick={() => navigate('about')}
              className="w-full text-left px-3 py-2 text-xs font-bold text-[#222222] hover:bg-[#FAF9F5]"
            >
              About Section
            </button>
            <div className="pt-2">
              <button
                onClick={() => navigate('upload')}
                className="w-full btn-gov-outline text-xs flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Sample</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Breadcrumbs Bar */}
      <div className="bg-[#EFEEE8] border-b border-[#D7D6D0] py-2 px-4 text-xs text-[#555555]">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <span className="font-semibold text-[#1B5E20]">Portal Home</span>
          <ChevronRight className="w-3 h-3 text-[#777777]" />
          <span className="font-semibold text-[#222222]">{getBreadcrumbLabel()}</span>
        </div>
      </div>

      {/* Page Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentPage === 'home' && <HomePage navigate={navigate} />}
        {currentPage === 'dashboard' && <DashboardPage navigate={navigate} dataset={dataset} />}
        {currentPage === 'upload' && <UploadPage navigate={navigate} onAddReads={handleAddReads} />}
        {currentPage === 'species' && <SpeciesPage dataset={dataset} />}
        {currentPage === 'about' && <AboutPage navigate={navigate} />}
      </main>

      {/* Footer with SIH 2025 Credit Line */}
      <footer className="bg-[#2E7D32] text-white border-t border-[#1B5E20] mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
            <div className="space-y-2 md:col-span-2">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#A5D6A7]" />
                <span>eDNA BioTrack — National Biodiversity Portal</span>
              </div>
              <p className="text-[#C8E6C9] leading-relaxed max-w-md">
                An original web platform built for environmental DNA sequence validation, automated quality control metrics, and standardized taxonomy classification services.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#FFF59D]">
                <Award className="w-4 h-4 text-[#FFF59D]" />
                <span>Built for Smart India Hackathon (SIH 2025)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-sm text-[#A5D6A7] uppercase tracking-wider">Quick Links</div>
              <ul className="space-y-1.5 text-[#C8E6C9]">
                <li>
                  <button onClick={() => navigate('home')} className="hover:underline cursor-pointer">
                    Home Portal Overview
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('dashboard')} className="hover:underline cursor-pointer">
                    Sequence Reads Console
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('upload')} className="hover:underline cursor-pointer">
                    Upload Sample Dataset
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('species')} className="hover:underline cursor-pointer">
                    Species Info Register
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-sm text-[#A5D6A7] uppercase tracking-wider">Project Notice</div>
              <ul className="space-y-1.5 text-[#C8E6C9]">
                <li>SIH 2025 Problem Statement Solution</li>
                <li>Open Access Sequence Inspection</li>
                <li>Client-Side Privacy & Blob Exports</li>
                <li>ISO & Gene Barcode Standards</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1B5E20] flex flex-col sm:flex-row items-center justify-between text-xs text-[#C8E6C9] gap-4">
            <div>© 2025-2026 eDNA BioTrack. Built for Smart India Hackathon (SIH 2025). All Rights Reserved.</div>
            <div className="flex items-center gap-4">
              <a href="#/about" onClick={() => navigate('about')} className="hover:underline">
                Terms of Use
              </a>
              <span>•</span>
              <a href="#/about" onClick={() => navigate('about')} className="hover:underline">
                SIH Documentation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
