import { Analytics } from '@vercel/analytics/react'
import { FiapPage } from './pages/FiapPage'

export default function App() {
  return (
    <>
      <FiapPage />
      <Analytics />
    </>
  )
}
