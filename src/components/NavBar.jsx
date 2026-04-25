import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

// 顶部导航组件，提供公告条、主导航与移动端菜单。
export default function NavBar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/blog', label: t('nav.blog') },
  ]

  const navClass = `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
    scrolled
      ? 'paper-panel border-b border-border shadow-[0_8px_30px_rgba(17,17,17,0.04)]'
      : 'bg-bg-primary/88 border-b border-border-subtle'
  }`

  return (
    <>
      <nav className={navClass}>
        <div className="border-b border-border overflow-hidden">
          <div className="container-content h-8 flex items-center">
            <p className="w-full whitespace-nowrap text-[10px] uppercase tracking-[0.26em] text-text-secondary">
              {t('nav.marquee')} {t('nav.marquee')} {t('nav.marquee')}
            </p>
          </div>
        </div>
        <div className="container-content flex items-center justify-between h-[72px]">
          <NavLink
            to="/"
            className="flex items-center gap-3 font-semibold text-text-primary hover:text-accent transition-colors"
          >
            <span className="text-xl tracking-tight lowercase">homeland.</span>
          </NavLink>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 min-h-[40px] inline-flex items-center text-[11px] uppercase tracking-[0.16em] transition-colors ${
                    isActive
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-6 bg-accent" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="md:hidden p-2 min-w-[44px] min-h-[44px] grid place-items-center text-text-secondary hover:text-text-primary border border-border bg-bg-secondary transition-colors cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-bg-primary animate-fade-in">
          <div className="container-content flex items-center justify-between h-[72px] border-b border-border">
            <span className="font-semibold tracking-tight lowercase">homeland.</span>
            <button
              className="p-2 min-w-[44px] min-h-[44px] grid place-items-center text-text-secondary hover:text-text-primary border border-border bg-bg-secondary cursor-pointer"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={2} />
            </button>
          </div>
          <div className="container-content flex flex-col gap-1 mt-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-4 text-2xl font-medium border-b border-border transition-colors ${
                    isActive
                      ? 'text-accent bg-accent-subtle'
                      : 'text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
