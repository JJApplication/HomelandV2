import { useMemo, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail, Github, ArrowDown, ArrowUpRight } from 'lucide-react'
import Button from '../components/Button'
import ChaosPendulum from '../components/ChaosPendulum'
import ScrambleText from '../components/ScrambleText'
import FoilRevealText from '../components/FoilRevealText'
import { EMAIL, GITHUB } from '../constants'
import profileImage from '../profile.jpg'
const TITLE_PUNCTUATION_REGEX = /[.,!?;:，。！？；：、]/u

function findTextRanges(text, tokens) {
  const characters = Array.from(text)
  const ranges = []
  let searchFrom = 0

  tokens.forEach((token) => {
    const tokenCharacters = Array.from(token)

    for (let start = searchFrom; start <= characters.length - tokenCharacters.length; start += 1) {
      const matched = tokenCharacters.every(
        (character, offset) => characters[start + offset] === character,
      )

      if (matched) {
        ranges.push({ start, end: start + tokenCharacters.length })
        searchFrom = start + tokenCharacters.length
        break
      }
    }
  })

  return ranges
}

function buildVisibleRanges(text) {
  const characters = Array.from(text)
  const ranges = []
  let rangeStart = null

  characters.forEach((character, index) => {
    const canScramble = /\S/u.test(character) && !TITLE_PUNCTUATION_REGEX.test(character)

    if (canScramble && rangeStart === null) {
      rangeStart = index
    }

    if (!canScramble && rangeStart !== null) {
      ranges.push({ start: rangeStart, end: index })
      rangeStart = null
    }
  })

  if (rangeStart !== null) {
    ranges.push({ start: rangeStart, end: characters.length })
  }

  return ranges
}

function resolveTitleScrambleRanges(language, text) {
  if (language.toLowerCase().startsWith('en')) {
    const ranges = findTextRanges(text, ['unique', 'brands'])
    return ranges.length > 0 ? ranges : buildVisibleRanges(text)
  }

  return buildVisibleRanges(text)
}

// 首页组件，按照亮色编辑风格组织首屏、合作品牌与服务介绍。
export default function Home() {
  const { t, i18n } = useTranslation()
  const partners = t('home.partners', { returnObjects: true })
  const services = t('home.services', { returnObjects: true })
  const titleBottom = t('hero.titleBottom')
  const [isProfileSpotlighted, setIsProfileSpotlighted] = useState(false)
  const timelineItems = t('home.timeline', { returnObjects: true })
  const titleBottomRanges = useMemo(
    () => resolveTitleScrambleRanges(i18n.language, titleBottom),
    [i18n.language, titleBottom],
  )

  const profileRef = useRef(null)
  const [tiltStyle, setTiltStyle] = useState({})
  const TILT_MAX = 40

  const handleProfileMouseMove = useCallback((e) => {
    const el = profileRef.current
    if (!el || isProfileSpotlighted) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateY = ((x - centerX) / centerX) * TILT_MAX
    const rotateX = ((centerY - y) / centerY) * TILT_MAX

    setTiltStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    })
  }, [isProfileSpotlighted])

  const handleProfileMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg)',
    })
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="container-content pt-[120px] pb-10">
        <div className="paper-panel border border-border grid lg:grid-cols-[0.82fr_1.18fr] overflow-hidden opacity-0 animate-fade-up"
    style={{ animationDelay: '0ms' }}
  >
          <div className="relative min-h-[420px] md:min-h-[460px] border-b lg:border-b-0 lg:border-r border-border overflow-hidden">
            <ChaosPendulum />
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 border-t border-border">
              <div className="p-6 md:p-8 border-r border-border">
                <p className="section-label mb-3">{t('hero.visualLabel')}</p>
                <p className="max-w-[220px] text-sm md:text-base text-text-secondary leading-relaxed">
                  {t('hero.visualDescription')}
                </p>
              </div>
              <div className="p-6 md:p-8 bg-bg-secondary/80">
                <p className="section-label mb-3">{t('hero.metricLabel')}</p>
                <p className="display-title text-4xl md:text-5xl">{t('hero.metricValue')}</p>
                <p className="mt-2 text-sm text-text-secondary">{t('hero.metricDescription')}</p>
              </div>
            </div>
          </div>

          <div className="flex min-h-[420px] md:min-h-[560px] flex-col">
            <div className="flex-1 p-8 md:p-12 lg:p-14">
              <p
                className="section-label opacity-0 animate-fade-up"
                style={{ animationDelay: '80ms' }}
              >
                {t('hero.eyebrow')}
              </p>
              <h1
                className="display-title mt-8 text-5xl sm:text-6xl lg:text-7xl leading-[0.95] opacity-0 animate-fade-up"
                style={{ animationDelay: '180ms' }}
              >
                <span className="block mb-4">{t('hero.titleTop')}</span>
                <ScrambleText
                  as="span"
                  className="block"
                  text={titleBottom}
                  scrambleRanges={titleBottomRanges}
                  duration={2000}
                  animation="fade"
                  locale={i18n.language}
                />
              </h1>
              <p
                className="mt-8 max-w-xl text-lg md:text-xl text-text-secondary leading-relaxed opacity-0 animate-fade-up"
                style={{ animationDelay: '350ms' }}
              >
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-[1fr_auto] border-t border-border">
              <div className="p-6 md:p-8 lg:p-10 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Mail}
                  onClick={() => (window.location.href = `mailto:${EMAIL}`)}
                >
                  {t('cta.email')}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  icon={Github}
                  onClick={() => window.open(GITHUB, '_blank', 'noopener,noreferrer')}
                >
                  {t('cta.github')}
                </Button>
              </div>
              <div className="p-6 md:p-8 lg:p-10 border-t md:border-t-0 md:border-l border-border flex items-end">
                <p className="text-sm text-text-secondary leading-relaxed max-w-[200px]">
                  {t('hero.availability')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="paper-panel mt-0 border-x border-b border-border grid md:grid-cols-[1.2fr_repeat(4,1fr)] opacity-0 animate-fade-up"
          style={{ animationDelay: '100ms' }}
        >
          <div className="px-6 py-5 border-b md:border-b-0 md:border-r border-border">
            <p className="section-label">{t('home.partnersLabel')}</p>
          </div>
          {partners.map((partner) => (
            <div
              key={partner}
              className="px-6 py-5 border-b md:border-b-0 md:border-r last:border-r-0 border-border text-center text-sm uppercase tracking-[0.18em] text-text-secondary"
            >
              <FoilRevealText
                originalText={partner}
                transformedText={partner}
              />
            </div>
          ))}
        </div>

        <div className="paper-panel mt-8 border border-border grid lg:grid-cols-[1fr_1.05fr] overflow-hidden opacity-0 animate-fade-up"
          style={{ animationDelay: '200ms' }}
        >
          <div className="p-8 md:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-border">
            <p className="section-label">{t('home.servicesLabel')}</p>
            <h2 className="display-title mt-5 text-4xl md:text-6xl leading-[0.98] max-w-lg">
              {t('home.statement')}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-text-secondary leading-relaxed">
              {t('home.statementBody')}
            </p>
            <div
                className="mt-10 opacity-0 animate-fade-up"
                style={{ animationDelay: '450ms' }}
              >
                <button
                  type="button"
                  ref={profileRef}
                  aria-pressed={isProfileSpotlighted}
                  onMouseMove={handleProfileMouseMove}
                  onMouseLeave={handleProfileMouseLeave}
                  onClick={() => setIsProfileSpotlighted((value) => !value)}
                  className="group relative inline-flex cursor-pointer touch-manipulation"
                >
                  <span
                    className={`absolute inset-[-24px] rounded-full transition-all duration-700 ease-out ${
                      isProfileSpotlighted
                        ? 'scale-125 opacity-100'
                        : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                    }`}
                    style={{
                      background: isProfileSpotlighted
                        ? 'radial-gradient(circle at 50% 50%, rgba(255,186,120,0.35) 0%, rgba(255,186,120,0.10) 40%, rgba(212,175,55,0.06) 65%, transparent 80%)'
                        : 'radial-gradient(circle at 50% 50%, rgba(255,186,120,0.28) 0%, rgba(255,186,120,0.08) 45%, transparent 72%)',
                    }}
                  />
                  <span className="absolute inset-[-6px] rounded-full opacity-0 transition-opacity duration-700 ease-out bg-[radial-gradient(circle,color-mix(in srgb,var(--accent,#FF6A1A)_12%,transparent)_0%,transparent_70%)] blur-xl group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <span
                    className={`relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-full border bg-[#16120f] p-2 shadow-[0_18px_40px_rgba(17,17,17,0.24)] transition-all duration-500 ease-out will-change-transform xs:h-48 xs:w-48 md:h-64 md:w-64 ${
                      isProfileSpotlighted
                        ? 'scale-110 border-[#f4f1ea] shadow-[0_28px_60px_rgba(17,17,17,0.34)]'
                        : 'border-border group-hover:scale-105 group-hover:border-[#e8e0d0] group-hover:shadow-[0_28px_60px_rgba(17,17,17,0.34)] group-focus-visible:scale-105 group-focus-visible:border-[#e8e0d0] group-focus-visible:shadow-[0_28px_60px_rgba(17,17,17,0.34)]'
                    }`}
                    style={tiltStyle}
                  >
                    <span className={`absolute inset-3 rounded-full border transition-all duration-500 ease-out ${
                      isProfileSpotlighted
                        ? 'border-white/70 scale-110'
                        : 'border-white/55 group-hover:border-white/70 group-hover:scale-105'
                    }`} />
                    <img
                      src={profileImage}
                      alt="Landers 个人海报照片"
                      className={`h-full w-full rounded-full object-cover object-center transition-all duration-700 ease-out ${
                        isProfileSpotlighted
                          ? 'scale-125 saturate-110 brightness-110'
                          : 'group-hover:scale-110 group-focus-visible:scale-110'
                      }`}
                    />
                    <span className={`pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(145deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.04)_38%,rgba(0,0,0,0.34)_100%)] transition-opacity duration-500 ease-out ${
                      isProfileSpotlighted ? 'opacity-80' : 'opacity-100'
                    }`} />
                  </span>
                </button>
              </div>
          </div>

          <div>
            {services.map((service, index) => (
              <article
                key={service.title}
                className={`grid md:grid-cols-[88px_1fr] gap-6 p-8 md:p-10 opacity-0 animate-fade-up ${
                  index !== services.length - 1 ? 'border-b border-border' : ''
                }`}
                style={{ animationDelay: `${300 + index * 120}ms` }}
              >
                <div className="flex items-start md:justify-center">
                  <div className="mt-1 h-12 w-12 rotate-45 border border-border-subtle bg-bg-tertiary/80" />
                </div>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-text-primary">
                      {service.title}
                    </h3>
                    <ArrowUpRight size={20} className="shrink-0 text-text-muted" />
                  </div>
                  <p className="mt-3 text-text-secondary leading-relaxed">{service.description}</p>
                  <p className="mt-5 text-xs uppercase tracking-[0.18em] text-text-primary">
                    {service.link}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="paper-panel border-x border-b border-border px-6 py-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-text-secondary opacity-0 animate-fade-up"
          style={{ animationDelay: '400ms' }}
        >
          <div className="flex items-center gap-3">
            <ArrowDown size={16} />
            <span>{t('hero.scrollHint')}</span>
          </div>
          <span>{t('home.footerNote')}</span>
        </div>

        <div className="paper-panel mt-8 border border-border px-6 py-10 md:px-10 md:py-10 text-sm md:text-base tracking-[0.12em] text-text-secondary leading-relaxed cursor-pointer opacity-0 animate-fade-up"
          style={{ animationDelay: '500ms' }}
        >
          <FoilRevealText
            originalText={t('home.missionOriginal')}
            transformedText={t('home.missionTransformed')}
          />
        </div>

        <div className="paper-panel border-x border-b border-border grid grid-cols-[30%_70%] text-sm tracking-[0.12em] text-text-secondary opacity-0 animate-fade-up"
          style={{ animationDelay: '600ms' }}
        >
          <span className="px-6 py-4 border-r border-border text-xs">{t('home.missionLabel')}</span>
          <span className="px-6 py-2 flex items-center justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block will-change-transform animate-scale-wave"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                🥇
              </span>
            ))}
          </span>
        </div>

        <section className="py-6 md:py-10">
          <div className="paper-panel border border-border p-8 md:p-12 lg:p-14 opacity-0 animate-fade-up"
              style={{ animationDelay: '700ms' }}
            >
            <div className="flex items-center gap-3 mb-2">
              <span className="section-label">{t('home.timelineLabel')}</span>
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs tracking-[0.18em] text-text-secondary uppercase">{t('home.timelineSublabel')}</span>
            </div>

            <div className="relative mt-14 pb-2">
              <div className="absolute left-0 right-0 top-[7px] h-px bg-border hidden lg:block" />

              <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 sm:gap-y-10">
                {timelineItems.map((item, index) => (
                  <div
                    key={item.date + item.text}
                    className="flex flex-col items-center text-center group opacity-0 animate-fade-up"
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="w-[14px] h-[14px] rounded-full bg-accent border-[3px] border-bg-primary shadow-[0_0_0_1px_rgba(255,106,26,0.25)] z-10 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:shadow-[0_0_0_3px_rgba(255,106,26,0.35)]" />
                    <div className="w-px h-5 bg-gradient-to-b from-accent/25 to-transparent" />
                    <div className="pt-2 px-1">
                      <p className="text-sm md:text-base font-medium text-text-primary leading-snug">
                        {item.text}
                      </p>
                      <p className="mt-1.5 text-xs tracking-[0.12em] text-text-secondary">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 md:py-10">
          <div className="paper-panel border border-border grid lg:grid-cols-[1.28fr_0.72fr] opacity-0 animate-fade-up"
              style={{ animationDelay: '800ms' }}
            >
            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-border">
              <p className="section-label mb-4">{t('cta.letsWork')}</p>
              <h2 className="display-title text-4xl md:text-6xl leading-[0.95] max-w-2xl">
                {t('cta.yourProject')}
              </h2>
              <p className="mt-5 max-w-md text-text-secondary leading-relaxed">
                {t('footer.description')}
              </p>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-between gap-8">
              <div className="space-y-3 text-sm text-text-secondary">
                <p>{t('footer.availability')}</p>
                <p>{EMAIL}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  as="a"
                  href={`mailto:${EMAIL}`}
                  variant="primary"
                  size="lg"
                  icon={Mail}
                >
                  {t('cta.email')}
                </Button>
                <Button
                  as="a"
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  size="lg"
                  icon={Github}
                >
                  {t('cta.github')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
