import { useEffect, useMemo, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { storage, STORAGE_KEYS } from '../lib/storage'
import type { ConfigMap, ProviderConfig } from '../lib/storage'
import { providerSchemas } from '../features/providers/schema'
import { DynamicForm } from '../components/forms/DynamicForm'
import { Card, CardContent } from '../components/ui/Card'

export default function ProviderConfigPage() {
  const { providerId } = useParams({ from: '/$providerId/config' })
  const [initial, setInitial] = useState<Record<string, unknown> | undefined>(undefined)
  const schema = useMemo(() => providerSchemas[providerId], [providerId])

  useEffect(() => {
    const configs = storage.read<ConfigMap>(STORAGE_KEYS.configs, {})
    const existing = configs[providerId] as ProviderConfig | undefined
    if (existing) setInitial(existing)
  }, [providerId])

  const save = (values: Record<string, unknown>) => {
    const configs = storage.read<ConfigMap>(STORAGE_KEYS.configs, {})
    configs[providerId] = values
    storage.write(STORAGE_KEYS.configs, configs)
    alert('Saved config')
  }

  return (
    <Card>
      <CardContent className="p-5">
        {schema ? (
          <DynamicForm schema={schema} initial={initial} onSubmit={save} />
        ) : (
          <p className="text-sm text-gray-600">No schema found for this provider.</p>
        )}
      </CardContent>
    </Card>
  )
}
