import { useMemo, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail, Github, ArrowDown, ArrowUpRight } from 'lucide-react'
import Button from '../components/Button'
import ChaosPendulum from '../components/ChaosPendulum'
import ScrambleText from '../components/ScrambleText'
import FoilRevealText from '../components/FoilRevealText'
import { EMAIL, GITHUB } from '../constants'
import career1 from '../assets/career1.png'
import career2 from '../assets/career2.png'
import career3 from '../assets/career3.png'
import career4 from '../assets/career4.png'
import work1 from '../assets/s_1.png'
import work2 from '../assets/s_2.png'
import work3 from '../assets/s_3.png'
import work4 from '../assets/s_4.png'
import timeline1 from '../assets/t_01.png'
import timeline2 from '../assets/t_02.png'
import timeline3 from '../assets/t_03.png'
import timeline4 from '../assets/t_04.png'
import timeline5 from '../assets/t_05.png'
import timeline6 from '../assets/t_06.png'
import profileImage from '../profile.jpg'

// 工作经历图标，顺序对应 services 数组（现在、2024、2023、2020-2023）
const workIcons = [
  { src: work4, alt: '半导体产业' },
  { src: work3, alt: '设计工具产品管理' },
  { src: work2, alt: '网络安全' },
  { src: work1, alt: '运营商UI全栈' },
]
const TITLE_PUNCTUATION_REGEX = /[.,!?;:，。！？；：、]/u

const missionIcons = [
  { src: career1, alt: '星辰大海' },
  { src: career2, alt: '扬帆' },
  { src: career3, alt: '眺望' },
  { src: career4, alt: '远航' },
]

const timelineIcons = [
  { src: timeline1, alt: 'timeline_01' },
  { src: timeline2, alt: 'timeline_02' },
  { src: timeline3, alt: 'timeline_03' },
  { src: timeline4, alt: 'timeline_04' },
  { src: timeline5, alt: 'timeline_05' },
  { src: timeline6, alt: 'timeline_06' },
]

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
  const [missionHovered, setMissionHovered] = useState(false)
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
            {services.map((service, index) => {
              const wIcon = workIcons[index % workIcons.length]
              return (
              <article
                key={service.title}
                className={`grid md:grid-cols-[128px_1fr] gap-6 p-8 md:p-10 opacity-0 animate-fade-up ${
                  index !== services.length - 1 ? 'border-b border-border' : ''
                }`}
                style={{ animationDelay: `${300 + index * 120}ms` }}
              >
                <div className="flex items-start md:justify-center">
                  <div className="mt-1 flex h-32 w-32 items-center justify-center transition-all duration-300 ease-out hover:-translate-y-1">
                    <img
                      src={wIcon.src}
                      alt={wIcon.alt}
                      className="h-full w-full rounded-md object-contain [image-rendering:pixelated]"
                    />
                  </div>
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
              )
            })}
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

        <div
          className="paper-panel mt-8 border border-border px-6 py-8 md:px-10 md:py-10 cursor-pointer opacity-0 animate-fade-up"
          style={{ animationDelay: '500ms' }}
          onMouseEnter={() => setMissionHovered(true)}
          onMouseLeave={() => setMissionHovered(false)}
        >
          <div className="grid gap-6 md:grid-cols-[72px_1fr_72px] md:items-center">
            <div className="mx-auto h-20 w-20 overflow-hidden rounded-2xl shadow-[0_10px_24px_rgba(17,17,17,0.20)] transition-transform duration-300 ease-out hover:-translate-y-1">
              <img
                src={career1}
                alt="icon"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-sm md:text-base tracking-[0.12em] text-text-secondary leading-relaxed text-center md:text-left">
              <FoilRevealText
                originalText={t('home.missionOriginal')}
                transformedText={t('home.missionTransformed')}
                active={missionHovered}
              />
            </div>
          </div>
        </div>

        <div className="paper-panel border-x border-b border-border grid grid-cols-[30%_70%] text-sm tracking-[0.12em] text-text-secondary opacity-0 animate-fade-up"
          style={{ animationDelay: '600ms' }}
        >
          <span className="px-6 py-4 border-r border-border text-xs">{t('home.missionLabel')}</span>
          <span className="px-6 py-2 flex items-center justify-center">
            <div
              className="relative h-10 w-40 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_14%,black_86%,transparent)]"
              aria-hidden="true"
            >
              <div className="flex w-max gap-2.5 animate-mission-carousel hover:[animation-play-state:paused]">
                {[...missionIcons, ...missionIcons].map((icon, i) => (
                  <img
                    key={`${icon.alt}-${i}`}
                    src={icon.src}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-lg border border-border-subtle bg-bg-tertiary/80 object-cover shadow-[0_6px_16px_rgba(17,17,17,0.08)]"
                  />
                ))}
              </div>
            </div>
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
              <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 sm:gap-y-10">
                {timelineItems.map((item, index) => {
                  const icon = timelineIcons[index % timelineIcons.length]

                  return (
                    <div
                      key={item.date + item.text}
                      className="relative flex flex-col items-center text-center group opacity-0 animate-fade-up"
                      style={{ animationDelay: `${800 + index * 100}ms` }}
                    >
                      {index < timelineItems.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute left-[calc(50%+3rem)] top-12 hidden w-[calc(100%-6rem)] lg:block"
                        >
                          <div className="h-px w-full bg-border/25" />
                          <span
                            className="timeline-dot"
                            style={{ animationDelay: `${index * 0.5}s` }}
                          />
                          <svg className="absolute -right-1.5 top-1/2 -translate-y-1/2" width="6" height="8" viewBox="0 0 6 8" fill="none">
                            <path d="M1 1l3.5 3L1 7" stroke="#FF6A1A" strokeOpacity="0.55" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                      <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full transition-all duration-300 ease-out group-hover:-translate-y-1">
                        <img
                          src={icon.src}
                          alt={icon.alt}
                          className="h-full w-full rounded-2xl object-contain [image-rendering:pixelated]"
                        />
                      </div>
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
                  )
                })}
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
