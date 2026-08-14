import { useState } from 'react'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import DownloadsPage from './pages/DownloadsPage'
import SpeciesPage from './pages/SpeciesPage'
import AboutPage from './pages/AboutPage'

export type Page = 'home' | 'dashboard' | 'downloads' | 'species' | 'about'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navigate = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navItems: { id: Page; label: string }[] = [
    { id: 'dashboard', label: 'Data' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'species', label: 'Species Info' },
    { id: 'about', label: 'About' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#060f1c', color: '#dde9f8' }}>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        backgroundColor: 'rgba(6, 15, 28, 0.97)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(20, 184, 166, 0.12)',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 60,
        }}>
          <button
            onClick={() => navigate('home')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          >
            <div style={{
              width: 34, height: 34,
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 12px rgba(20, 184, 166, 0.4)',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 12h2m14 0h2M12 3v2m0 14v2M5.6 5.6l1.4 1.4m9.9 9.9l1.4 1.4M5.6 18.4l1.4-1.4m9.9-9.9l1.4-1.4" stroke="#060f1c" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="3" fill="#060f1c"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 20, color: '#dde9f8', letterSpacing: '0.03em' }}>
              BIO<span style={{ color: '#14b8a6' }}>CODE</span>
            </span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`nav-link${currentPage === item.id ? ' active' : ''}`}
              >
                {item.label}
              </button>
            ))}
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />
            <button
              onClick={() => navigate('dashboard')}
              className="btn-primary"
              style={{ padding: '7px 16px', fontSize: 13 }}
            >
              Upload Sequences
            </button>
          </div>
        </div>
      </nav>

      <main>
        {currentPage === 'home' && <HomePage navigate={navigate} />}
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'downloads' && <DownloadsPage />}
        {currentPage === 'species' && <SpeciesPage />}
        {currentPage === 'about' && <AboutPage />}
      </main>

      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 24px',
        textAlign: 'center',
        color: '#3a5577',
        fontSize: 13,
        fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'Fraunces, serif', color: '#14b8a6', fontWeight: 600 }}>BIOCODE</span>
          <span>DNA Barcoding & Biodiversity Database Platform · {new Date().getFullYear()}</span>
          <span style={{ color: '#14b8a6', fontSize: 12 }}>74 sequences · 28 species · 12 countries</span>
        </div>
      </footer>
    </div>
  )
}
