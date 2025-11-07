import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'danger' | 'ghost'
  size?: 'sm' | 'md'
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = 'default', size = 'md', ...props },
  ref,
) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors motion-safe:transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:motion-safe:scale-[0.98] shadow-sm'
  const sizes = size === 'sm' ? 'h-8 px-3 text-sm' : 'h-9 px-3.5 text-sm'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-900',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent hover:bg-gray-50',
  }[variant]
  return <button ref={ref} className={cn(base, sizes, variants, className)} {...props} />
})
