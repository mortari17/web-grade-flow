import { Analytics } from '@vercel/analytics/react'
import { FiapPage } from './pages/fiap'

export default function App() {
  return (
    <>
      <FiapPage />
      <Analytics />
    </>
  )
}
