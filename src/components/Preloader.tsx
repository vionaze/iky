'use client'

import { useEffect, useState } from 'react'
import styles from './Preloader.module.css'

const phrases = ['AI Series', 'AI Music Video', 'AI Short Film', 'AI Education']

export default function Preloader() {
  const [leaving, setLeaving] = useState(false)
  const [done, setDone] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)

  useEffect(() => {
    let seen = false
    try {
      seen = window.sessionStorage.getItem('iky-intro-seen') === '1'
    } catch {
      seen = false
    }
    if (seen) {
      setDone(true)
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hold = reduceMotion ? 300 : 1700
    const fade = reduceMotion ? 250 : 850

    document.documentElement.style.overflow = 'hidden'

    const leaveTimer = window.setTimeout(() => {
      setLeaving(true)
      document.documentElement.classList.add('intro-reveal')
    }, hold)

    const doneTimer = window.setTimeout(() => {
      setDone(true)
      document.documentElement.style.overflow = ''
      document.documentElement.classList.remove('intro-reveal')
      try {
        window.sessionStorage.setItem('iky-intro-seen', '1')
      } catch {
        /* storage may be unavailable */
      }
    }, hold + fade)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(doneTimer)
      document.documentElement.style.overflow = ''
      document.documentElement.classList.remove('intro-reveal')
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(() => {
      setPhraseIndex((index) => (index + 1) % phrases.length)
    }, 420)
    return () => window.clearInterval(interval)
  }, [])

  if (done) return null

  return (
    <div
      data-preloader
      className={`${styles.overlay} ${leaving ? styles.leaving : ''}`}
      role="status"
      aria-label="Loading Ikymian Studios"
    >
      <div className={styles.inner}>
        <div className={styles.lockup}>
          <span className={styles.brand}>Ikymian Studios</span>
          <svg
            className={styles.heart}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className={styles.status} key={phraseIndex} aria-live="polite">
          <span>{phrases[phraseIndex]}</span>
        </div>
      </div>
    </div>
  )
}
