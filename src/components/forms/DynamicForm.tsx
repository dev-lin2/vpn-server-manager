import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ProviderSchema } from '../../features/providers/schema'
import { Label } from '../ui/Label'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Button } from '../ui/Button'

type Props = {
  schema: ProviderSchema
  initial?: Record<string, unknown>
  onSubmit: (values: Record<string, unknown>) => void
}

export function DynamicForm({ schema, initial, onSubmit }: Props) {
  const zshape = useMemo(() => {
    const shape: Record<string, z.ZodTypeAny> = {}
    for (const f of schema.config.fields) {
      let base: z.ZodTypeAny = z.any()
      if (f.type === 'text' || f.type === 'password' || f.type === 'textarea') base = z.string()
      if (f.type === 'number') base = z.coerce.number()
      if (f.type === 'select') base = z.string()
      shape[f.key] = f.required ? base : base.optional()
    }
    return z.object(shape)
  }, [schema])

  const form = useForm<{ [k: string]: any }>({
    resolver: zodResolver(zshape),
    defaultValues: (initial as any) ?? {},
  })

  const submit = form.handleSubmit((v) => onSubmit(v))

  return (
    <form onSubmit={submit} className="space-y-4">
      {schema.config.fields.map((f) => (
        <div key={f.key} className="space-y-1.5">
          <Label htmlFor={f.key}>{f.label}</Label>
          {f.type === 'textarea' ? (
            <Textarea id={f.key} {...form.register(f.key)} />
          ) : (
            <Input
              id={f.key}
              type={f.type === 'password' ? 'password' : f.type === 'number' ? 'number' : 'text'}
              {...form.register(f.key)}
            />
          )}
          <p className="text-xs text-red-600">{form.formState.errors[f.key]?.message as any}</p>
        </div>
      ))}
      <div className="pt-2">
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
