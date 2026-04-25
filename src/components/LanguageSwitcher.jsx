import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Languages, Check } from 'lucide-react'

const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh', label: '中文', short: '中' },
  { code: 'ja', label: '日本語', short: '日' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = LANGS.find((l) => l.code === i18n.language) || LANGS[0]

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function change(code) {
    i18n.changeLanguage(code)
    document.documentElement.lang = code
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch language"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 border border-border px-3 py-2 min-h-[42px] text-xs uppercase tracking-[0.16em] text-text-secondary hover:text-text-primary bg-bg-secondary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Languages size={16} strokeWidth={2} />
        <span>{current.short}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[160px] py-1.5 bg-bg-secondary border border-border shadow-lg shadow-black/5 animate-fade-in z-50">
          {LANGS.map((lang) => {
            const active = lang.code === i18n.language
            return (
              <button
                key={lang.code}
                onClick={() => change(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors ${
                  active
                    ? 'text-accent bg-accent-subtle'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                <span>{lang.label}</span>
                {active && <Check size={14} strokeWidth={2.5} />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
