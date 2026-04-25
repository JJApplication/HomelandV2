import { forwardRef } from 'react'

// 通用按钮组件，统一页面中的交互风格。
const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', icon: Icon, children, className = '', ...props },
  ref,
) {
  const base =
    'inline-flex items-center justify-center gap-2 border border-border font-medium uppercase tracking-[0.14em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none'

  const variants = {
    primary:
      'bg-accent text-white border-accent hover:bg-accent-hover hover:border-accent-hover hover:-translate-y-0.5 active:translate-y-0 active:bg-accent-active',
    secondary:
      'bg-bg-secondary text-text-primary hover:bg-lime-subtle hover:-translate-y-0.5 active:translate-y-0',
    ghost:
      'bg-transparent text-text-secondary border-transparent hover:text-text-primary hover:bg-bg-secondary',
  }

  const sizes = {
    sm: 'px-3 py-2 text-[11px] min-h-[38px]',
    md: 'px-5 py-3 text-xs min-h-[46px]',
    lg: 'px-7 py-4 text-sm min-h-[54px]',
  }

  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} strokeWidth={2} />}
      {children}
    </button>
  )
})

export default Button
