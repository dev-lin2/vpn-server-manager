import { Link, Outlet, useParams } from '@tanstack/react-router'
import { providers } from '../features/providers'
import { storage, STORAGE_KEYS } from '../lib/storage'
import type { ConfigMap } from '../lib/storage'
import { Card, CardContent } from '../components/ui/Card'
import { cn } from '../lib/cn'

export default function ProviderLayout() {
  const { providerId } = useParams({ from: '/$providerId' })
  const meta = providers.find((p) => p.id === providerId)

  if (!meta) {
    return <div>Provider not found.</div>
  }

  const configs = storage.read<ConfigMap>(STORAGE_KEYS.configs, {})
  const hasConfig = Boolean(configs[providerId])

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white">
              <img src={meta.logo} alt="" className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{meta.name}</h2>
              <p className="text-sm text-gray-600">{meta.summary}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
            <Tab to={`/${providerId}/guide`} label="Guide" />
            <Tab to={`/${providerId}/config`} label="Config" />
            {hasConfig ? (
              <Tab to={`/${providerId}/instances`} label="Instances" />
            ) : (
              <span className="cursor-not-allowed rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-400">
                Instances
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Outlet />
    </div>
  )
}

function Tab({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className={cn(
        'rounded-md border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors',
      )}
      activeProps={{ className: 'bg-gray-100 border-gray-300 shadow-xs' }}
    >
      {label}
    </Link>
  )
}
