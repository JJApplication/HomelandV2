import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Calendar } from 'lucide-react'

const POSTS = [
  {
    id: 1,
    title: 'Designing for Calm: Notes on Minimalism',
    date: '2026-04-12',
    tag: 'Design',
    excerpt:
      'Restraint is a feature. A reflection on how to design interfaces that feel quiet, confident, and welcoming.',
  },
  {
    id: 2,
    title: 'Why I Build with React + Tailwind',
    date: '2026-03-28',
    tag: 'Engineering',
    excerpt:
      'A pragmatic stack favoring composability, speed, and a tight design feedback loop.',
  },
  {
    id: 3,
    title: 'On Internationalization, Done Well',
    date: '2026-02-14',
    tag: 'Engineering',
    excerpt:
      'Lessons from shipping multilingual UIs — typography, layout, and content discipline.',
  },
]

export default function Blog() {
  const { t, i18n } = useTranslation()

  function formatDate(d) {
    try {
      return new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(d))
    } catch {
      return d
    }
  }

  return (
    <section className="container-content pt-32 pb-20 min-h-[100dvh]">
      <header className="mb-16 max-w-3xl">
        <p className="text-sm text-accent uppercase tracking-[0.2em] mb-4">▸ {t('blog.title')}</p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1] mb-5">
          {t('blog.title')}
        </h1>
        <p className="text-lg text-text-secondary">{t('blog.subtitle')}</p>
      </header>

      <div className="border-t border-border">
        {POSTS.map((post, idx) => (
          <article
            key={post.id}
            className="group border-b border-border py-8 md:py-10 cursor-pointer hover:bg-bg-secondary/40 transition-colors px-3 -mx-3 rounded-lg opacity-0 animate-fade-up"
            style={{ animationDelay: `${100 + idx * 80}ms` }}
          >
            <div className="grid md:grid-cols-[180px_1fr_auto] gap-4 md:gap-8 items-start md:items-center">
              <div className="flex items-center gap-2 text-text-muted text-sm">
                <Calendar size={14} strokeWidth={2} />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent-subtle text-accent border border-accent/20">
                    {post.tag}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text-primary group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-text-secondary leading-relaxed">{post.excerpt}</p>
              </div>

              <div className="hidden md:block">
                <div className="w-11 h-11 rounded-full border border-border grid place-items-center text-text-secondary group-hover:border-accent group-hover:text-accent group-hover:bg-accent-subtle transition-all">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
