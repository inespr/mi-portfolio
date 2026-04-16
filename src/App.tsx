import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaSun, FaMoon, FaLanguage, FaGithub, FaLinkedin, FaDownload,
  FaChevronDown, FaStar, FaEnvelope, FaPhone, FaBars, FaTimes,
} from 'react-icons/fa'
import CustomCursor from './components/CustomCursor'
import CoinFlipImage from './components/CoinFlipImage'
import FloatingNav from './components/FloatingNav'
import { useTranslation } from 'react-i18next'
import Logo from './components/Logo'
import cvPDF from './assets/CV Ines ES.pdf'
import { useTheme } from './context/ThemeContext'

// ─── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 70) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    setDisplayed('')
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])
  return displayed
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  fork: boolean
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const skillGroups = [
  {
    label: 'Mobile',
    color: '#ff6bcb',
    bg: 'rgba(255,107,203,0.1)',
    border: 'rgba(255,107,203,0.3)',
    skills: ['React Native', 'Expo', 'Monorepo', 'Whitelabel'],
  },
  {
    label: 'Web',
    color: '#a084ee',
    bg: 'rgba(160,132,238,0.1)',
    border: 'rgba(160,132,238,0.3)',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML / CSS', 'SCSS'],
  },
  {
    label: 'Backend & Data',
    color: '#ffb86b',
    bg: 'rgba(255,184,107,0.1)',
    border: 'rgba(255,184,107,0.3)',
    skills: ['Firebase', 'Cloudinary', 'Node.js', 'API REST', 'MySQL', 'MongoDB'],
  },
  {
    label: 'Herramientas',
    color: '#7afcff',
    bg: 'rgba(122,252,255,0.1)',
    border: 'rgba(122,252,255,0.3)',
    skills: ['Git / GitLab', 'Scrum / Agile', 'Figma', 'Jira'],
  },
]

const stats = [
  { number: '3+', label: 'Años de experiencia' },
  { number: '5', label: 'Apps en producción' },
  { number: '2', label: 'Empresas' },
]

const expColors = ['#ff6bcb', '#a084ee', '#ffb86b']

const langColorMap: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Python: '#3572A5',
  Dart: '#00B4AB',
  Vue: '#41b883',
  Shell: '#89e051',
}

// ─── Component ────────────────────────────────────────────────────────────────
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('es')
  const { t, i18n: i18nInstance } = useTranslation() as { t: (key: string) => string; i18n: { changeLanguage: (lang: string) => void } }
  const { isDarkMode, toggleTheme } = useTheme()
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [reposError, setReposError] = useState(false)

  const typedRole    = useTypewriter(t('role'), 70)
  const progressRef  = useRef<HTMLDivElement>(null)

  // Scroll progress bar — direct DOM, sin re-renders
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current && total > 0)
        progressRef.current.style.width = `${(window.scrollY / total) * 100}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    fetch('https://api.github.com/users/inespr/repos?sort=updated&per_page=20')
      .then(res => { if (!res.ok) throw new Error(''); return res.json() })
      .then(data => {
        if (Array.isArray(data)) setRepos((data as GithubRepo[]).filter(r => !r.fork))
        else setReposError(true)
      })
      .catch(() => setReposError(true))
  }, [])

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'pt', name: 'Português' },
    { code: 'it', name: 'Italiano' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ]

  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode)
    i18nInstance.changeLanguage(langCode)
    setIsLanguageMenuOpen(false)
  }


  return (
    <div className="min-h-screen bg-primary dark:bg-primary-dark text-text dark:text-text-dark transition-colors duration-500">
      <CustomCursor />

      {/* ── Animated background blobs ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* ── Scroll progress bar ── */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 h-0.5 z-[100] pointer-events-none"
        style={{ width: '0%', background: 'linear-gradient(90deg, #ff6bcb, #a084ee, #ffb86b)', transition: 'width 0.1s linear' }}
      />

      {/* ══════════════════════════════════════════
          NAVBAR — minimal: logo + utilidades
      ══════════════════════════════════════════ */}
      <nav className="fixed w-full glass-effect z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Logo />

            <div className="flex items-center gap-3">
              {/* CV download */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={cvPDF}
                download
                className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-accent-purple border border-accent-purple/40 hover:bg-accent-purple/10 transition-colors"
              >
                <FaDownload size={11} />
                CV
              </motion.a>

              {/* GitHub */}
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/inespr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/70 hover:text-accent-purple transition-colors hidden sm:block"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/ines-pernil-romero-a08749143/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/70 hover:text-accent-orange transition-colors hidden sm:block"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </motion.a>

              {/* Language selector */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="text-light/70 hover:text-accent-orange transition-colors flex items-center gap-1"
                  aria-label="Cambiar idioma"
                >
                  <FaLanguage size={20} />
                  <FaChevronDown size={10} />
                </motion.button>
                <AnimatePresence>
                  {isLanguageMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-40 glass-effect rounded-xl overflow-hidden shadow-xl"
                    >
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full text-left px-4 py-2 text-light hover:bg-accent-orange/20 transition-colors text-sm ${currentLanguage === lang.code ? 'bg-accent-orange/25 font-semibold' : ''}`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme toggle */}
              <motion.button
                whileHover={{ scale: 1.15, rotate: 20 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="text-light/70 hover:text-accent-pink transition-colors"
                aria-label="Cambiar tema"
              >
                {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </motion.button>

              {/* Mobile: menú hamburguesa (por si FloatingNav no es suficiente en pantallas muy pequeñas) */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-light/70 hover:text-accent-purple transition-colors sm:hidden"
                aria-label="Menú"
              >
                {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu (solo xs) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="fixed top-[60px] left-0 w-full glass-effect z-40 sm:hidden"
          >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex gap-4">
                <a href="https://github.com/inespr" target="_blank" rel="noopener noreferrer" className="text-light hover:text-accent-purple transition-colors">
                  <FaGithub size={20} />
                </a>
                <a href="https://www.linkedin.com/in/ines-pernil-romero-a08749143/" target="_blank" rel="noopener noreferrer" className="text-light hover:text-accent-orange transition-colors">
                  <FaLinkedin size={20} />
                </a>
              </div>
              <a
                href={cvPDF}
                download
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-accent-purple border border-accent-purple/40 hover:bg-accent-purple/10 transition-colors"
              >
                <FaDownload size={11} />
                Descargar CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating pill nav ── */}
      <FloatingNav />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-24">
        <div className="dot-grid" />
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-accent-pink mb-3 text-sm md:text-base font-semibold tracking-[0.25em] uppercase"
            >
              {t('greeting')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl sm:text-7xl md:text-9xl font-black mb-4 gradient-text leading-none tracking-tight"
            >
              Inés Pernil
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text dark:text-light mb-8 h-12 flex items-center"
            >
              <span className="text-text dark:text-white/90">{typedRole}</span>
              <span className="typewriter-cursor ml-0.5 text-accent-pink">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-tertiary dark:text-tertiary-dark max-w-xl mb-10 text-base md:text-lg leading-relaxed"
            >
              {t('description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-3"
            >
              <a href="#contact" className="btn-primary border-accent-pink text-accent-pink hover:bg-accent-pink/10">
                {t('contactMe')}
              </a>
              <a href="#projects" className="btn-primary border-accent-green text-accent-green hover:bg-accent-green/10">
                {t('viewProjects')}
              </a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={cvPDF}
                download
                className="btn-primary border-accent-purple text-accent-purple hover:bg-accent-purple/10 flex items-center gap-2"
              >
                <FaDownload size={13} />
                {t('downloadCV')}
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#experience"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-accent-pink/50 hover:text-accent-pink transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaChevronDown size={22} />
        </motion.a>
      </section>

      {/* ══════════════════════════════════════════
          STATS
      ══════════════════════════════════════════ */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="card text-center py-6"
              >
                <div className="text-4xl md:text-5xl font-black gradient-text mb-1">{stat.number}</div>
                <div className="text-xs md:text-sm text-tertiary dark:text-tertiary-dark leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EXPERIENCE — TIMELINE
      ══════════════════════════════════════════ */}
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-10"
          >
            {t('experienceTitle')}
          </motion.h2>

          <div className="timeline max-w-3xl">
            {[1, 2, 3].map((n, idx) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="timeline-item"
              >
                <div
                  className="timeline-dot"
                  style={{
                    background: expColors[idx],
                    boxShadow: `0 0 14px ${expColors[idx]}`,
                  }}
                />
                <div className="card ml-2">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-text dark:text-white">{t(`experience${n}.title`)}</h3>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: `${expColors[idx]}20`, color: expColors[idx], border: `1px solid ${expColors[idx]}40` }}
                    >
                      {t(`experience${n}.type`)}
                    </span>
                  </div>
                  <p className="font-semibold mb-1" style={{ color: expColors[idx] }}>
                    {t(`experience${n}.company`)}
                  </p>
                  <p className="text-tertiary dark:text-tertiary-dark text-sm mb-3">
                    {t(`experience${n}.period`)} · {t(`experience${n}.location`)}
                  </p>
                  <p className="text-tertiary dark:text-tertiary-dark leading-relaxed">
                    {t(`experience${n}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT + SKILLS
      ══════════════════════════════════════════ */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-10"
          >
            {t('aboutMe')}
          </motion.h2>

          {/* About text + image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-14">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card space-y-4"
            >
              <p className="text-tertiary dark:text-tertiary-dark leading-relaxed text-base md:text-lg">
                {t('aboutText1')}
              </p>
              <p className="text-tertiary dark:text-tertiary-dark leading-relaxed text-base md:text-lg">
                {t('aboutText2')}
              </p>
              {/* Languages */}
              <div className="flex gap-3 pt-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: 'rgba(255,107,203,0.1)', color: '#ff6bcb', border: '1px solid rgba(255,107,203,0.3)' }}>
                  🇪🇸 Español nativo
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: 'rgba(160,132,238,0.1)', color: '#a084ee', border: '1px solid rgba(160,132,238,0.3)' }}>
                  🇬🇧 Inglés B2
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <CoinFlipImage />
            </motion.div>
          </div>

          {/* Skills badges */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-black text-text dark:text-white mb-8">{t('skills')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {skillGroups.map((group, gi) => (
                <motion.div
                  key={gi}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.1 }}
                  className="card"
                >
                  <p className="font-bold text-sm mb-4 tracking-widest uppercase" style={{ color: group.color }}>
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(skill => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.08 }}
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: group.bg, color: group.color, border: `1px solid ${group.border}` }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════════ */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="section-title">{t('projects')}</h2>
            <p className="text-tertiary dark:text-tertiary-dark mt-6 text-sm">
              Proyectos públicos en{' '}
              <a href="https://github.com/inespr" target="_blank" rel="noopener noreferrer" className="text-accent-orange hover:underline">
                github.com/inespr
              </a>
            </p>
          </motion.div>

          {reposError ? (
            <div className="card text-center py-10">
              <p className="text-tertiary dark:text-tertiary-dark mb-4">No se pudieron cargar los repositorios.</p>
              <a href="https://github.com/inespr" target="_blank" rel="noopener noreferrer" className="btn-primary border-accent-orange text-accent-orange hover:bg-accent-orange/10 inline-flex items-center gap-2">
                <FaGithub />
                Ver en GitHub
              </a>
            </div>
          ) : repos.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-4 bg-white/10 rounded mb-3 w-3/4" />
                  <div className="h-3 bg-white/05 rounded mb-2 w-full" />
                  <div className="h-3 bg-white/05 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {repos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.06, 0.4) }}
                  whileHover={{ y: -4 }}
                  className="card flex flex-col h-full group"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-accent-orange font-bold text-base group-hover:text-accent-pink transition-colors leading-snug">
                      {repo.name}
                    </h3>
                    <FaGithub size={14} className="text-text/30 dark:text-white/30 group-hover:text-text/70 dark:group-hover:text-white/60 transition-colors shrink-0 mt-0.5 ml-2" />
                  </div>
                  <p className="text-tertiary dark:text-tertiary-dark text-sm leading-relaxed flex-1 mb-4 line-clamp-2">
                    {repo.description || <span className="italic opacity-50">Sin descripción</span>}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-tertiary dark:text-tertiary-dark">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: langColorMap[repo.language] || '#888' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-accent-yellow">
                        <FaStar size={11} />
                        {repo.stargazers_count}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-24 pb-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="section-title mx-auto mb-6">{t('contact')}</h2>

            <p className="text-tertiary dark:text-tertiary-dark text-lg leading-relaxed mb-10 mt-8">
              ¿Tienes un proyecto o quieres hablar? Estoy disponible para nuevas oportunidades.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:inespromero@gmail.com"
                className="btn-primary border-accent-orange text-accent-orange hover:bg-accent-orange/10 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <FaEnvelope />
                inespromero@gmail.com
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+34675382059"
                className="btn-primary border-accent-green text-accent-green hover:bg-accent-green/10 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <FaPhone />
                675 382 059
              </motion.a>
            </div>

            <div className="flex items-center justify-center gap-6">
              <motion.a
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/inespr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/40 dark:text-white/50 hover:text-accent-purple transition-colors"
              >
                <FaGithub size={28} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/ines-pernil-romero-a08749143/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/40 dark:text-white/50 hover:text-accent-orange transition-colors"
              >
                <FaLinkedin size={28} />
              </motion.a>
            </div>

            <p className="text-text/30 dark:text-white/20 text-xs mt-12">
              Inés Pernil · Málaga, España · {new Date().getFullYear()}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default App
