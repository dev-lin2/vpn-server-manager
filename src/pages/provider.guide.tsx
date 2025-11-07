import { useParams } from '@tanstack/react-router'
import { providers } from '../features/providers'
import { providerSchemas } from '../features/providers/schema'
import { Card, CardContent } from '../components/ui/Card'

export default function ProviderGuide() {
  const { providerId } = useParams({ from: '/$providerId/guide' })
  const meta = providers.find((p) => p.id === providerId)
  if (!meta) return null
  const schema = providerSchemas[providerId]
  return (
    <Card>
      <CardContent className="p-5 text-gray-800">
        <h3 className="mb-3 text-base font-semibold">{schema?.guide.title ?? `${meta.name} Guide`}</h3>
        <pre className="whitespace-pre-wrap rounded-md border border-gray-200 bg-gray-50 p-3 text-sm leading-6 text-gray-700">{schema?.guide.markdown ?? 'Guide coming soon.'}</pre>
      </CardContent>
    </Card>
  )
}
