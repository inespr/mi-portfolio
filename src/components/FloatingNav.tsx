import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaHome, FaBriefcase, FaUser, FaFolderOpen, FaEnvelope } from 'react-icons/fa'

const NAV_ITEMS = [
  { id: 'hero',       label: 'Inicio',  icon: FaHome,       href: '#'           },
  { id: 'experience', label: 'Experi.', icon: FaBriefcase,  href: '#experience' },
  { id: 'about',      label: 'Sobre mí',icon: FaUser,       href: '#about'      },
  { id: 'projects',   label: 'Proyect.',icon: FaFolderOpen, href: '#projects'   },
  { id: 'contact',    label: 'Contacto',icon: FaEnvelope,   href: '#contact'    },
]

const GAP = 4

const FloatingNav = () => {
  const [active, setActive]   = useState('hero')
  const [mobile, setMobile]   = useState(() => typeof window !== 'undefined' && window.innerWidth < 520)

  // Tamaño responsive
  const ITEM_W = mobile ? 50 : 64
  const ITEM_H = mobile ? 42 : 52

  // Detectar cambio de tamaño
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 520)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Detección de sección activa por scroll
  useEffect(() => {
    const getSections = () =>
      NAV_ITEMS.map(item => ({
        id: item.id,
        el: document.getElementById(item.id),
      })).filter((s): s is { id: string; el: HTMLElement } => s.el !== null)

    const onScroll = () => {
      const sections = getSections()
      const scrollY  = window.scrollY
      const viewH    = window.innerHeight
      const docH     = document.documentElement.scrollHeight

      if (scrollY + viewH >= docH - 10) {
        setActive('contact')
        return
      }

      const trigger = scrollY + viewH * 0.4
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el.offsetTop <= trigger) {
          setActive(sections[i].id)
          return
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activeIndex = NAV_ITEMS.findIndex(n => n.id === active)
  const pillX       = activeIndex * (ITEM_W + GAP) + GAP

  return (
    <motion.nav
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
      aria-label="Navegación flotante"
      style={{
        position: 'fixed',
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        maxWidth: 'calc(100vw - 24px)',
      }}
    >
      <div
        className="relative flex"
        style={{
          padding: GAP,
          gap: GAP,
          borderRadius: 9999,
          background: 'rgba(10, 10, 20, 0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 12px 48px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.03)',
        }}
      >
        {/* Pill deslizante */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            top: GAP,
            left: 0,
            width: ITEM_W,
            height: ITEM_H,
            borderRadius: 9999,
            background: 'linear-gradient(135deg, rgba(255,107,203,0.22), rgba(160,132,238,0.22))',
            border: '1px solid rgba(255,107,203,0.4)',
            boxShadow: '0 0 20px rgba(255,107,203,0.2)',
          }}
          animate={{ x: pillX }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />

        {NAV_ITEMS.map(item => {
          const Icon     = item.icon
          const isActive = active === item.id
          return (
            <motion.a
              key={item.id}
              href={item.href}
              whileTap={{ scale: 0.88 }}
              aria-current={isActive ? 'page' : undefined}
              className="relative z-10 flex flex-col items-center justify-center"
              style={{
                width: ITEM_W,
                height: ITEM_H,
                borderRadius: 9999,
                textDecoration: 'none',
                gap: mobile ? 0 : 2,
              }}
            >
              <motion.div
                animate={{ scale: isActive ? 1.2 : 1, y: isActive ? -1 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Icon
                  size={mobile ? 17 : 15}
                  style={{
                    color: isActive ? '#ff6bcb' : 'rgba(255,255,255,0.38)',
                    transition: 'color 0.2s',
                    display: 'block',
                  }}
                />
              </motion.div>

              {/* Label: oculto en muy pequeño, visible desde 520 px */}
              {!mobile && (
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: isActive ? '#ff6bcb' : 'rgba(255,255,255,0.3)',
                    transition: 'color 0.2s',
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </span>
              )}
            </motion.a>
          )
        })}
      </div>
    </motion.nav>
  )
}

export default FloatingNav
