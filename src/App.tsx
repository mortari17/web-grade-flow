import { Analytics } from '@vercel/analytics/react'
import { FiapPage } from './pages/fiap'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <FiapPage />

      <Analytics />
    </div>
  )
}
