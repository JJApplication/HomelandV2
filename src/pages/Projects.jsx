import { useTranslation } from 'react-i18next'
import { ArrowRight, Search } from 'lucide-react'
import Button from '../components/Button'
import { ORGANIZATION, SUPPORT } from '../constants'

const FEATURED_PROJECT = {
  title: 'GT Protocol',
  category: 'Incubated',
  description:
    'A clean operating layer for product discovery, investor updates, and structured launch communication.',
  stats: [
    { label: 'Funds Raised', value: '$4.1M' },
    { label: 'ATH ROI', value: '28x' },
    { label: 'Social Growth', value: '800%' },
    { label: 'Partnerships', value: '70+' },
  ],
}

const PROJECTS = [
  {
    id: 'p1',
    category: 'Foundation',
    name: 'Hamburger',
    stats: ['Golang', '-', '-'],
    link: 'https://github.com/JJApplication/hamburger',
  },
  {
    id: 'p2',
    category: 'Foundation',
    name: 'Blog',
    stats: ['Golang', '-', '-'],
    link: 'https://github.com/JJApplication/blog',
  },
  {
    id: 'p3',
    category: 'Tools',
    name: 'Mgek ImgHost',
    stats: ['Node.js', '-', '-'],
    link: 'https://github.com/landers1037/mgekimghost',
  },
  {
    id: 'p4',
    category: 'Tools',
    name: 'MedicalForm',
    stats: ['Vue.js', '-', '-'],
    link: 'https://github.com/landers1037/medicalform',
  },
  {
    id: 'p5',
    category: 'Tools',
    name: 'Moonlight Web Stream',
    stats: ['Rust', '-', '-'],
    link: 'https://github.com/landers1037/moonlight-web-stream',
  }, 
  {
    id: 'p6',
    category: 'Tools',
    name: 'RustBlog',
    stats: ['Rust', '-', '-'],
    link: 'https://github.com/JJApplication/rustblog',
  },
]

// 项目页组件，按参考稿组织作品总览、精选卡片与项目网格。
export default function Projects() {
  const { t } = useTranslation()
  const filters = t('projects.filters', { returnObjects: true })

  return (
    <section className="container-content pt-[120px] pb-20">
      <div className="paper-panel border-[3px] border-border rounded-[28px] overflow-hidden shadow-[0_18px_80px_rgba(17,17,17,0.05)]">
        <div className="grid md:grid-cols-[auto_1fr] border-b border-border">
          <div className="flex flex-wrap border-b md:border-b-0 md:border-r border-border">
            {filters.map((filter, index) => (
              <button
                key={filter}
                className={`px-4 py-3 text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  index === 0
                    ? 'bg-border text-bg-secondary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 px-5 py-3 text-sm text-text-muted">
            <Search size={15} />
            <span>{t('projects.searchPlaceholder')}</span>
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {PROJECTS.map((project, index) => (
              <article
                key={project.id}
                className="group border border-border bg-bg-secondary transition-transform duration-300 hover:-translate-y-1 opacity-0 animate-fade-up"
                style={{ animationDelay: `${80 + index * 60}ms` }}
              >
                <div className="px-4 py-3 border-b border-border">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-text-muted">
                    {project.category}
                  </span>
                </div>
                <div className="grid place-items-center px-6 py-14 min-h-[180px]">
                  <h3 className="text-2xl text-center font-semibold tracking-tight">{project.name}</h3>
                </div>
                <div className="grid grid-cols-[repeat(4,1fr)_64px] border-t border-border">
                  {project.stats.map((value, statIndex) => (
                    <div key={`${project.id}-${statIndex}`} className="p-3 border-r border-border">
                      <p className="text-sm font-semibold tabular-nums">{value}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-text-muted">
                        {t(`projects.statLabels.${statIndex}`)}
                      </p>
                    </div>
                  ))}
                  <div className="grid place-items-center">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t('projects.openProjectLink', { name: project.name })}
                      className="grid place-items-center min-h-[44px] min-w-[44px] cursor-pointer text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary rounded-sm"
                    >
                      <ArrowRight size={18} aria-hidden />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_1fr] border-t border-border">
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border">
            <p className="section-label mb-3">{t('projects.footerLabel')}</p>
            <h2 className="display-title text-3xl md:text-4xl leading-[0.95]">
              {t('projects.footerTitle')}
            </h2>
          </div>
          <div className="p-8 md:p-10 flex flex-col sm:flex-row gap-3 items-start md:items-center md:justify-end">
            <Button
              as="a"
              href={ORGANIZATION}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
            >
              {t('projects.primaryAction')}
            </Button>
            <Button
              as="a"
              href={SUPPORT}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              {t('projects.secondaryAction')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
