import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail, Github, ArrowDown, ArrowUpRight } from 'lucide-react'
import Button from '../components/Button'
import ScrambleText from '../components/ScrambleText'
import { EMAIL, GITHUB } from '../constants'
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
  const titleBottomRanges = useMemo(
    () => resolveTitleScrambleRanges(i18n.language, titleBottom),
    [i18n.language, titleBottom],
  )

  return (
    <section className="relative overflow-hidden">
      <div className="container-content pt-[120px] pb-10">
        <div className="paper-panel border border-border grid lg:grid-cols-[1.02fr_0.98fr] overflow-hidden">
          <div className="relative min-h-[420px] md:min-h-[560px] border-b lg:border-b-0 lg:border-r border-border overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(244,241,234,0.92))]" />
            <div className="absolute left-8 top-8 h-20 w-20 border border-border-subtle rotate-45 bg-bg-secondary/70" />
            <div className="absolute left-[10%] top-[18%] h-64 w-40 rounded-[40px] border border-border-subtle bg-white/75 shadow-[0_30px_80px_rgba(17,17,17,0.08)]" />
            <div className="absolute left-[18%] top-[12%] h-10 w-16 rounded-t-[16px] rounded-b-md bg-lime border border-border-subtle" />
            <div className="absolute left-[42%] top-[24%] h-56 w-32 rounded-[34px] border border-border-subtle bg-white/70 rotate-[18deg] shadow-[0_20px_60px_rgba(17,17,17,0.08)]" />
            <div className="absolute left-[53%] top-[17%] h-9 w-14 rounded-t-[14px] rounded-b-md bg-lime border border-border-subtle rotate-[18deg]" />
            <div className="absolute left-[18%] top-[31%] h-px w-40 bg-border rotate-[38deg]" />
            <div className="absolute left-[45%] top-[41%] h-px w-28 bg-border rotate-[30deg]" />
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
                <span className="block">{t('hero.titleTop')}</span>
                <ScrambleText
                  as="span"
                  className="block"
                  text={titleBottom}
                  scrambleRanges={titleBottomRanges}
                  duration={1750}
                  animation="fade"
                  locale={i18n.language}
                />
              </h1>
              <p
                className="mt-8 max-w-xl text-lg md:text-xl text-text-secondary leading-relaxed opacity-0 animate-fade-up"
                style={{ animationDelay: '320ms' }}
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
                <p className="text-sm text-text-secondary leading-relaxed max-w-[220px]">
                  {t('hero.availability')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="paper-panel mt-0 border-x border-b border-border grid md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div className="px-6 py-5 border-b md:border-b-0 md:border-r border-border">
            <p className="section-label">{t('home.partnersLabel')}</p>
          </div>
          {partners.map((partner) => (
            <div
              key={partner}
              className="px-6 py-5 border-b md:border-b-0 md:border-r last:border-r-0 border-border text-center text-sm uppercase tracking-[0.18em] text-text-secondary"
            >
              {partner}
            </div>
          ))}
        </div>

        <div className="paper-panel mt-8 border border-border grid lg:grid-cols-[1fr_1.05fr] overflow-hidden">
          <div className="p-8 md:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-border">
            <p className="section-label">{t('home.servicesLabel')}</p>
            <h2 className="display-title mt-5 text-4xl md:text-6xl leading-[0.98] max-w-lg">
              {t('home.statement')}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-text-secondary leading-relaxed">
              {t('home.statementBody')}
            </p>
          </div>

          <div>
            {services.map((service, index) => (
              <article
                key={service.title}
                className={`grid md:grid-cols-[88px_1fr] gap-6 p-8 md:p-10 ${
                  index !== services.length - 1 ? 'border-b border-border' : ''
                }`}
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

        <div className="paper-panel border-x border-b border-border px-6 py-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-text-secondary">
          <div className="flex items-center gap-3">
            <ArrowDown size={16} />
            <span>{t('hero.scrollHint')}</span>
          </div>
          <span>{t('home.footerNote')}</span>
        </div>
      </div>
    </section>
  )
}
