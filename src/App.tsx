import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSun, FaMoon, FaLanguage, FaGithub, FaLinkedin, FaDownload, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa'
import CustomCursor from './components/CustomCursor'
import CoinFlipImage from './components/CoinFlipImage'
import { useTranslation } from 'react-i18next'
import Logo from './components/Logo'
import cvPDF from './assets/CV Ines ES.pdf'
import { useTheme } from './context/ThemeContext'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState<boolean>(false)
  const [currentLanguage, setCurrentLanguage] = useState<string>('en')
  const { t, i18n: i18nInstance } = useTranslation() as { t: (key: string) => string, i18n: any }
  const { isDarkMode, toggleTheme } = useTheme()
  const [repos, setRepos] = useState<any[]>([])

  useEffect(() => {
    fetch('https://api.github.com/users/inespr/repos')
      .then(res => res.json())
      .then(data => setRepos(data))
  }, [])

  const languages: Array<{code: string, name: string}> = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'pt', name: 'Português' },
    { code: 'it', name: 'Italiano' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ]

  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode)
    i18nInstance.changeLanguage(langCode)
    setIsLanguageMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-secondary text-text dark:bg-primary-dark dark:text-text-dark transition-colors duration-500">
      <CustomCursor />
      
      {/* Navbar */}
      <nav className="fixed w-full glass-effect z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="nav-link text-lg" onClick={closeMenu}>{t('about')}</a>
              <a href="#experience" className="nav-link text-lg" onClick={closeMenu}>{t('experience')}</a>
              <a href="#projects" className="nav-link text-lg" onClick={closeMenu}>{t('projects')}</a>
              <a href="#contact" className="nav-link text-lg" onClick={closeMenu}>{t('contact')}</a>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
                aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                onClick={toggleTheme}
              >
                <div className="absolute inset-0 bg-accent-purple/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                <div className="relative text-light group-hover:text-accent-purple transition-colors">
                  {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
                </div>
              </motion.button>

              {/* Language Selector */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="relative group flex items-center space-x-2"
                >
                  <div className="absolute inset-0 bg-accent-orange/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                  <div className="relative text-light group-hover:text-accent-orange transition-colors flex items-center">
                    <FaLanguage size={24} />
                    <FaChevronDown size={16} className="ml-1" />
                  </div>
                </motion.button>

                <AnimatePresence>
                  {isLanguageMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 glass-effect rounded-lg overflow-hidden"
                    >
                      <div className="py-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full text-left px-4 py-2 text-light hover:bg-accent-orange/20 transition-colors ${
                              currentLanguage === lang.code ? 'bg-accent-orange/30' : ''
                            }`}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/inespr"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group hidden md:block"
              >
                <div className="absolute inset-0 bg-accent-purple/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                <div className="relative text-light group-hover:text-accent-purple transition-colors">
                  <FaGithub size={24} />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-accent-purple whitespace-nowrap">
                  GitHub
                </span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/ines-pernil-romero-a08749143/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group hidden md:block"
              >
                <div className="absolute inset-0 bg-accent-orange/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                <div className="relative text-light group-hover:text-accent-orange transition-colors">
                  <FaLinkedin size={24} />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-accent-orange whitespace-nowrap">
                  LinkedIn
                </span>
              </motion.a>

              {/* Hamburger Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMenu}
                className="relative group md:hidden"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-accent-purple/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                <div className="relative text-light group-hover:text-accent-purple transition-colors">
                  {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 w-full glass-effect z-40 md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#about" className="nav-link text-lg" onClick={closeMenu}>{t('about')}</a>
                <a href="#experience" className="nav-link text-lg" onClick={closeMenu}>{t('experience')}</a>
                <a href="#projects" className="nav-link text-lg" onClick={closeMenu}>{t('projects')}</a>
                <a href="#contact" className="nav-link text-lg" onClick={closeMenu}>{t('contact')}</a>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className="relative group self-start"
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <div className="absolute inset-0 bg-accent-purple/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                  <div className="relative text-light group-hover:text-accent-purple transition-colors">
                    {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
                  </div>
                </motion.button>
                <div className="flex space-x-4 pt-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/inespr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-accent-purple/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                    <div className="relative text-light group-hover:text-accent-purple transition-colors">
                      <FaGithub size={24} />
                    </div>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.linkedin.com/in/ines-pernil-romero-a08749143/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-accent-orange/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                    <div className="relative text-light group-hover:text-accent-orange transition-colors">
                      <FaLinkedin size={24} />
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/10 via-accent-purple/10 to-accent-orange/10" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <p className="text-accent-pink mb-4 animate-float text-lg md:text-xl">{t('greeting')}</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 gradient-text">Inés Pernil</h1>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-accent-orange mb-8">
              {t('role')}
            </h2>
            <p className="text-tertiary dark:text-tertiary-dark max-w-2xl mb-8 text-base md:text-lg">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#contact" className="btn-primary border-accent-pink text-accent-pink hover:bg-accent-pink/10 text-center">
                {t('contactMe')}
              </a>
              <a href="#projects" className="btn-primary border-accent-green text-accent-green hover:bg-accent-green/10 text-center">
                {t('viewProjects')}
              </a>
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href={cvPDF}
                download
                className="btn-primary border-accent-purple text-accent-purple hover:bg-accent-purple/10 flex items-center justify-center space-x-2"
              >
                <FaDownload />
                <span>{t('downloadCV')}</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-tl from-accent-purple/5 via-accent-pink/5 to-accent-orange/5" />
        <div className="container mx-auto px-4 relative">
          <h2 className="section-title text-3xl md:text-4xl">{t('experienceTitle')}</h2>
          <div className="space-y-8 mt-8">
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * (i - 1) }}
                viewport={{ once: true }}
                className="card"
              >
                <h3 className="text-xl md:text-2xl font-bold text-accent-orange mb-2">{t(`experience${i}.title`)}</h3>
                <p className="text-accent-purple mb-2 text-lg">{t(`experience${i}.company`)}</p>
                <p className="text-tertiary dark:text-tertiary-dark mb-1">{t(`experience${i}.period`)}</p>
                <p className="text-tertiary dark:text-tertiary-dark mb-1">{t(`experience${i}.location`)}</p>
                <p className="text-tertiary dark:text-tertiary-dark mb-2">{t(`experience${i}.type`)}</p>
                <p className="text-tertiary dark:text-tertiary-dark text-base md:text-lg">{t(`experience${i}.description`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-tl from-accent-purple/5 via-accent-pink/5 to-accent-orange/5" />
        <div className="container mx-auto px-4 relative">
          <h2 className="section-title text-3xl md:text-4xl">{t('aboutMe')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-items-center mt-8">
            <div className="card">
              <p className="text-tertiary dark:text-tertiary-dark mb-4 text-base md:text-lg">
                {t('aboutText1')}
              </p>
              <p className="text-tertiary dark:text-tertiary-dark text-base md:text-lg">
                {t('aboutText2')}
              </p>
            </div>
            <div className="flex justify-center w-full">
              <CoinFlipImage />
            </div>
          </div>
          <div className="card space-y-6 mt-8">
            <h3 className="text-accent-orange text-2xl md:text-3xl font-bold">{t('skills')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Frontend */}
              <div className="space-y-4">
                <h4 className="text-accent-purple text-lg md:text-xl font-semibold">Frontend</h4>
                <ul className="space-y-2">
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-pink transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-pink rounded-full"></span>
                    <span>React</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-purple transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-purple rounded-full"></span>
                    <span>React Native</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-orange transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-orange rounded-full"></span>
                    <span>Angular</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-green transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-green rounded-full"></span>
                    <span>Ionic Framework</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-pink transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-pink rounded-full"></span>
                    <span>JavaScript/TypeScript</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-purple transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-purple rounded-full"></span>
                    <span>HTML/CSS</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-orange transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-orange rounded-full"></span>
                    <span>SCSS/SASS</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-green transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-green rounded-full"></span>
                    <span>Bootstrap</span>
                  </motion.li>
                </ul>
              </div>

              {/* Backend & Databases */}
              <div className="space-y-4">
                <h4 className="text-accent-purple text-lg md:text-xl font-semibold">Backend & Bases de Datos</h4>
                <ul className="space-y-2">
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-pink transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-pink rounded-full"></span>
                    <span>Node.js</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-purple transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-purple rounded-full"></span>
                    <span>Nest.js</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-orange transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-orange rounded-full"></span>
                    <span>PHP/Laravel</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-green transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-green rounded-full"></span>
                    <span>MySQL</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-pink transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-pink rounded-full"></span>
                    <span>MariaDB</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-purple transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-purple rounded-full"></span>
                    <span>MongoDB</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-orange transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-orange rounded-full"></span>
                    <span>API REST</span>
                  </motion.li>
                </ul>
              </div>

              {/* Tools & Soft Skills */}
              <div className="space-y-4">
                <h4 className="text-accent-purple text-lg md:text-xl font-semibold">Herramientas & Soft Skills</h4>
                <ul className="space-y-2">
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-pink transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-pink rounded-full"></span>
                    <span>Git/GitLab</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-purple transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-purple rounded-full"></span>
                    <span>Jira/Trello</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-orange transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-orange rounded-full"></span>
                    <span>Confluence</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-green transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-green rounded-full"></span>
                    <span>Diseño UX/UI</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-pink transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-pink rounded-full"></span>
                    <span>Trabajo en equipo</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 10 }}
                    className="text-tertiary dark:text-tertiary-dark hover:text-accent-purple transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-purple rounded-full"></span>
                    <span>Resolución de problemas</span>
                  </motion.li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="projects" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-tl from-accent-purple/10 via-accent-orange/10 to-accent-pink/10" />
        <div className="container mx-auto px-4 relative">
          <h2 className="section-title text-3xl md:text-4xl mb-8">Proyectos en GitHub</h2>
          <div className="card">
            <ul className="space-y-2">
              {repos.map(repo => (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-orange hover:underline"
                  >
                    {repo.name}
                  </a>
                  <span className="ml-2 text-tertiary text-sm">{repo.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-tl from-accent-orange/10 via-accent-purple/10 to-accent-pink/10" />
        <div className="container mx-auto px-4 relative">
          <h2 className="section-title text-3xl md:text-4xl mb-8">Contacto</h2>
          <div className="card flex flex-col items-center space-y-6">
            <p className="text-lg text-tertiary dark:text-tertiary-dark">¿Quieres ponerte en contacto conmigo? ¡Estoy disponible para nuevas oportunidades y colaboraciones!</p>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <a
                href="mailto:inespromero@gmail.com"
                className="btn-primary border-accent-orange text-accent-orange hover:bg-accent-orange/10 flex items-center space-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>inespromero@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ines-pernil-romero-a08749143/"
                className="btn-primary border-accent-purple text-accent-purple hover:bg-accent-purple/10 flex items-center space-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
