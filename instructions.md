# VPN Server Manager — Project Plan

## Overview

**VPN Server Manager** is a frontend-only React + Vite + TypeScript project designed to manage multiple VPN server types such as Outline, OpenVPN, and WireGuard.  
It provides a structured UI with modular components, configuration persistence via local storage, and a flexible CRUD interface for managing multiple VPN instances.

---

## Tech Stack

- **React 18** + **Vite**
- **TypeScript**
- **TanStack Router** (for routing)
- **TanStack Query** (for state management & async ops)
- **Tailwind CSS** + **shadcn/ui** (for styling and components)
- **Zod** + **React Hook Form** (for schema validation and forms)

---

## Key Features

1. **Home Page**
   - Displays list of supported VPN services (Outline, OpenVPN, WireGuard, etc.).
   - Data is loaded from a static `providers.json` file.
   - Clicking a VPN redirects to its detail page.

2. **Detail Page** (3-tab layout, vertical on the left)
   - **Connection Guide:** How to create the chosen VPN server on a VPS instance.
   - **Configurations:** Dynamic form based on JSON schema for each VPN provider.  
     - Data is saved in `localStorage`.
     - Mandatory step before accessing Instances tab.
   - **Instances (CRUD):** Manage multiple configured instances.
     - View, create, update, delete simulated instances.
     - Once configuration is done, Instances tab is unlocked.

3. **Offline-first Design**
   - Uses local storage to persist configurations and instances.
   - Mock adapters simulate API calls.

---

## Folder Structure

```
vpn-server-manager/
├─ src/
│  ├─ app/
│  │  ├─ router.tsx
│  │  └─ queryClient.ts
│  ├─ components/
│  │  ├─ layout/
│  │  ├─ forms/
│  │  ├─ instances/
│  │  └─ ui/
│  ├─ features/
│  │  ├─ providers/        # JSON data for VPNs (Outline, OpenVPN, etc.)
│  │  ├─ config/           # Form schema, storage helpers
│  │  └─ instances/        # CRUD logic and hooks
│  ├─ pages/
│  │  ├─ home.route.tsx
│  │  └─ provider.route.tsx
│  ├─ lib/
│  │  ├─ markdown.ts
│  │  └─ storage.ts
│  └─ main.tsx
├─ public/
│  └─ logos/
└─ package.json
```

---

## Routing Plan

| Path | Description |
|------|--------------|
| `/` | Home page showing VPN service list |
| `/:providerId/guide` | Connection guide for selected VPN |
| `/:providerId/config` | Configuration form for VPN |
| `/:providerId/instances` | CRUD interface for configured instances |

Access control: `instances` route disabled until at least one configuration exists in `localStorage`.

---

## Data Definitions

### Provider Metadata (providers.json)

```json
[
  {
    "id": "outline",
    "name": "Outline",
    "summary": "Self-hosted Shadowsocks VPN manager.",
    "logo": "/logos/outline.svg",
    "configSchemaRef": "/features/providers/outline.json"
  }
]
```

### Provider Config Schema (outline.json)

```json
{
  "providerId": "outline",
  "guide": {
    "title": "Create Outline Server",
    "markdown": "1. Launch VPS.\n2. Install Outline server.\n3. Save management API URL and token."
  },
  "config": {
    "fields": [
      { "key": "apiBaseUrl", "label": "API URL", "type": "text", "required": true },
      { "key": "accessToken", "label": "Access Token", "type": "password", "required": true }
    ]
  }
}
```

---

## Persistence Plan

| Key | Description |
|-----|--------------|
| `vpn:configs` | Stores saved VPN configurations |
| `vpn:instances` | Stores all created instances |

Utility functions in `storage.ts` handle reading/writing JSON safely to `localStorage`.

---

## Development Plan

1. **Setup & Initialization**
   - Initialize with Vite (React + TS template)
   - Install TanStack Router, Query, Tailwind, shadcn/ui

2. **Implement Core Pages**
   - Home (providers grid)
   - Provider detail layout (tabs navigation)

3. **Add Dynamic Form System**
   - Load schema from provider JSON
   - Render form fields dynamically
   - Save config data to localStorage

4. **Implement CRUD for Instances**
   - Create mock adapter
   - CRUD operations via TanStack Query

5. **Add Styling & UI Components**
   - Use shadcn/ui for cards, forms, tables
   - Tailwind for layout and responsive styling

6. **Optional Enhancements**
   - Markdown rendering for guides
   - Export/import configurations (JSON file)
   - Add persistent toast notifications

---

## Future Integrations

- Add backend adapters to connect real VPN APIs (e.g., Outline Management API)
- Add user authentication for sync
- Add dashboard analytics for connection usage

---

## Milestones

| Phase | Tasks | Estimated Duration |
|-------|--------|--------------------|
| **Phase 1** | Project setup, home & routing | 1 week |
| **Phase 2** | Config form and schema system | 1 week |
| **Phase 3** | CRUD instance manager | 1 week |
| **Phase 4** | Styling, polish, testing | 1 week |

**Total:** 4 weeks (frontend-only MVP)

---

## Deliverables

- Functional Vite + React app
- Configurable via JSON metadata
- LocalStorage-based configuration persistence
- CRUD simulation for VPN instances
- Polished UI using shadcn + Tailwind
