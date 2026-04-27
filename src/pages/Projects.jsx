import { useTranslation } from 'react-i18next'
import { ArrowRight, Search } from 'lucide-react'
import Button from '../components/Button'

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
    category: 'Incubation',
    name: 'Solidus AI Tech',
    stats: ['4.4M', '700%', '41x', '84'],
  },
  {
    id: 'p2',
    category: 'Acceleration',
    name: 'Cookie3',
    stats: ['6.2M', '1000%', '9x', '92'],
  },
  {
    id: 'p3',
    category: 'Acceleration',
    name: 'Engines Of Fury',
    stats: ['5.7M', '2000%', '9x', '57'],
  },
  {
    id: 'p4',
    category: 'Incubation',
    name: 'Omnia',
    stats: ['5.3M', '2000%', 'TBA', '72'],
  },
  {
    id: 'p5',
    category: 'Incubation',
    name: 'DexCheck',
    stats: ['2.1M', '800%', '18x', '65'],
  },
  {
    id: 'p6',
    category: 'Incubation',
    name: 'Shieldeum',
    stats: ['2.2M', '1000%', 'TBA', '30'],
  },
]

// 项目页组件，按参考稿组织作品总览、精选卡片与项目网格。
export default function Projects() {
  const { t } = useTranslation()
  const filters = t('projects.filters', { returnObjects: true })

  return (
    <section className="container-content pt-[120px] pb-20">
      <div className="paper-panel border-[3px] border-border rounded-[28px] overflow-hidden shadow-[0_18px_80px_rgba(17,17,17,0.05)]">
        <div className="grid lg:grid-cols-[220px_1fr] border-b border-border">
          <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-border">
            <p className="section-label mb-4">{t('projects.sideLabel')}</p>
            <p className="max-w-[140px] text-sm leading-relaxed text-text-secondary">
              {t('projects.sideBody')}
            </p>
            <div className="mt-8">
              <p className="section-label mb-2">{t('projects.countLabel')}</p>
              <p className="display-title text-3xl">{String(PROJECTS.length + 1).padStart(2, '0')}</p>
            </div>
          </div>

          <div>
            <div className="p-6 md:p-8 lg:p-10 border-b border-border">
              <div className="flex items-center justify-between gap-4">
                <p className="section-label">{t('projects.eyebrow')}</p>
                <Button variant="primary" size="sm">
                  {t('projects.applyNow')}
                </Button>
              </div>
              <h1 className="display-title mt-4 text-[3.4rem] sm:text-[4.8rem] lg:text-[6.6rem] leading-[0.88] tracking-[-0.08em]">
                PORT_FOLIO
              </h1>
            </div>

            <div className="grid lg:grid-cols-[180px_1fr]">
              <div className="hidden lg:flex items-center justify-center border-r border-border bg-bg-tertiary/45">
                <div className="h-20 w-20 rotate-45 border border-border-subtle bg-bg-secondary" />
              </div>
              <article className="grid md:grid-cols-[1.15fr_0.85fr]">
                <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border">
                  <div className="inline-flex px-2 py-1 border border-border bg-accent text-white text-[10px] uppercase tracking-[0.18em]">
                    {FEATURED_PROJECT.category}
                  </div>
                  <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight">
                    {FEATURED_PROJECT.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-text-secondary leading-relaxed">
                    {FEATURED_PROJECT.description}
                  </p>
                </div>
                <div className="grid grid-cols-2">
                  {FEATURED_PROJECT.stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`p-6 border-border ${
                        index % 2 === 0 ? 'border-r' : ''
                      } ${index < 2 ? 'border-b' : ''}`}
                    >
                      <p className="text-2xl font-semibold tabular-nums">{stat.value}</p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-text-muted">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>

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
                <div className="grid grid-cols-[repeat(4,1fr)_56px] border-t border-border">
                  {project.stats.map((value, statIndex) => (
                    <div key={`${project.id}-${statIndex}`} className="p-3 border-r border-border">
                      <p className="text-sm font-semibold tabular-nums">{value}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-text-muted">
                        {t(`projects.statLabels.${statIndex}`)}
                      </p>
                    </div>
                  ))}
                  <div className="grid place-items-center">
                    <ArrowRight
                      size={18}
                      className="text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent"
                    />
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
            <Button variant="primary" size="lg">
              {t('projects.primaryAction')}
            </Button>
            <Button variant="secondary" size="lg">
              {t('projects.secondaryAction')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
