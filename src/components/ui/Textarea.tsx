import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
  { className, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        'block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-gray-400',
        'focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:ring-offset-1',
        'transition-colors',
        className,
      )}
      {...props}
    />
  )
})
