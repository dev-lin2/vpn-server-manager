import { cn } from '../../lib/cn'

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('block text-sm font-medium text-gray-800', className)} {...props} />
}

