import { Outlet, Link } from '@tanstack/react-router'

export default function Root() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 antialiased">
      <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-14 items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-base font-semibold tracking-tight hover:opacity-90 transition-opacity">
              <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-blue-600 to-blue-400 shadow-sm"></span>
              <span>VPN Server Manager</span>
            </Link>
            <div className="text-xs text-gray-500">React • Vite • TS</div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-6 motion-safe:animate-[fade-in_0.25s_ease-out]">
        <Outlet />
      </main>
    </div>
  )
}

