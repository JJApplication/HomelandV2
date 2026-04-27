import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Github, Mail } from 'lucide-react'
import Button from '../components/Button'
import { EMAIL, GITHUB, FRIENDLY_LINKS } from '../constants'

// 关于页组件，使用简约的纵向结构展示个人志向、友好链接与技术栈。
export default function About() {
  const { t } = useTranslation()
  const links = t('about.links.items', { returnObjects: true })
  const stacks = t('about.stack.items', { returnObjects: true })

  return (
    <section className="container-content pt-[120px] pb-20">
      <div className="paper-panel border border-border overflow-hidden shadow-[0_18px_80px_rgba(17,17,17,0.05)]">
        <div className="border-b border-border px-6 py-12 md:px-10 md:py-16 lg:px-16 text-center">
          <p className="section-label opacity-0 animate-fade-up">{t('about.eyebrow')}</p>
          <h1
            className="display-title mt-6 text-4xl sm:text-5xl lg:text-6xl leading-[0.95] opacity-0 animate-fade-up"
            style={{ animationDelay: '120ms' }}
          >
            {t('about.heroTitle')}
          </h1>
          <p
            className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary opacity-0 animate-fade-up"
            style={{ animationDelay: '220ms' }}
          >
            {t('about.subtitle')}
          </p>
        </div>

        <div className="border-b border-border px-6 py-10 md:px-10 lg:px-16">
          <p className="section-label mb-4">{t('about.storyLabel')}</p>
          <div className="max-w-3xl space-y-5">
            <p className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
              {t('about.ambitionTitle')}
            </p>
            <p className="text-text-secondary leading-relaxed">{t('about.ambitionBody')}</p>
            <p className="text-text-secondary leading-relaxed">{t('about.originBody')}</p>
          </div>
        </div>

        <div className="border-b border-border px-6 py-10 md:px-10 lg:px-16">
          <div className="max-w-3xl">
            <p className="section-label mb-4">{t('about.links.label')}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {t('about.links.title')}
            </h2>
            <p className="mt-4 text-text-secondary leading-relaxed">{t('about.links.subtitle')}</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {FRIENDLY_LINKS.map((link, index) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group border border-border bg-bg-secondary p-6 transition-colors hover:bg-bg-tertiary/55"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-label">{links[index].label}</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">{links[index].title}</h3>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center border border-border bg-bg-primary text-text-secondary transition-all group-hover:border-accent group-hover:text-accent">
                    <ArrowUpRight size={18} strokeWidth={2} />
                  </span>
                </div>
                <p className="mt-5 text-text-secondary leading-relaxed">{links[index].body}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="border-b border-border px-6 py-10 md:px-10 lg:px-16">
          <div className="max-w-3xl">
            <p className="section-label mb-4">{t('about.stack.label')}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {t('about.stack.title')}
            </h2>
            <p className="mt-4 text-text-secondary leading-relaxed">{t('about.stack.subtitle')}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {stacks.map((stack) => (
              <span
                key={stack}
                className="inline-flex items-center border border-border bg-bg-secondary px-4 py-3 text-sm uppercase tracking-[0.14em] text-text-secondary"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>

        <div className="border-b border-border px-6 py-10 md:px-10 lg:px-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="section-label mb-3">{t('about.ctaLabel')}</p>
              <h2 className="display-title text-3xl md:text-4xl leading-[0.95]">
                {t('about.ctaTitle')}
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button as="a" href={`mailto:${EMAIL}`} variant="primary" size="lg" icon={Mail}>
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

        <div className="px-6 py-8 md:px-10 md:py-10 text-center">
          <p className="text-sm uppercase tracking-[0.18em] text-text-muted">
            在与GPT-5.4的合作下开发❤
          </p>
        </div>
      </div>
    </section>
  )
}
