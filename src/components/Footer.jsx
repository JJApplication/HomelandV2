import { useTranslation } from 'react-i18next'

// 页脚组件，仅承接全站底部版权信息。
export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border bg-bg-primary">
      <div>
        <div className="container-content py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-text-muted">
          <span>{t('footer.copyright')}</span>
          <span>{t('footer.tagline')}</span>
        </div>
      </div>
    </footer>
  )
}
