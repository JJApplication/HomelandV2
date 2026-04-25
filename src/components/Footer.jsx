import { useTranslation } from 'react-i18next'
import { Mail, Github } from 'lucide-react'
import Button from './Button'

const EMAIL = 'hello@example.com'
const GITHUB = 'https://github.com'

// 页脚组件，承接底部行动区与版权信息。
export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border bg-bg-primary">
      <section className="container-content py-16 md:py-20">
        <div className="paper-panel border border-border grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-border">
            <p className="section-label mb-4">{t('cta.letsWork')}</p>
            <h2 className="display-title text-4xl md:text-6xl leading-[0.95] max-w-xl">
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
          </div>
        </div>
      </section>

      <div className="border-t border-border-subtle">
        <div className="container-content py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-text-muted">
          <span>{t('footer.copyright')}</span>
          <span>{t('footer.tagline')}</span>
        </div>
      </div>
    </footer>
  )
}
