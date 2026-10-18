import Link from 'next/link'
import './styles.css'

export default function HomePage() {
  return (
    <main className="home">
      <div className="content">
        <h1>Ikymian Studios</h1>
        <p>CMS aktif. Halaman publik dipindahkan ke Next.js pada Phase 3.</p>
        <Link href="/adminku">Buka admin</Link>
      </div>
    </main>
  )
}
