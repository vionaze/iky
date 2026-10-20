'use client'

import { useEffect, useState } from 'react'
import styles from './Preloader.module.css'

const phrases = [
  'Story direction',
  'AI Series, AI music videos, AI short films, AI tutorials',
]

export default function Preloader() {
  const [leaving, setLeaving] = useState(false)
  const [done, setDone] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hold = reduceMotion ? 350 : 2500
    const fade = reduceMotion ? 200 : 500

    document.documentElement.style.overflow = 'hidden'

    const leaveTimer = window.setTimeout(() => setLeaving(true), hold)
    const doneTimer = window.setTimeout(() => {
      setDone(true)
      document.documentElement.style.overflow = ''
    }, hold + fade)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(doneTimer)
      document.documentElement.style.overflow = ''
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
          <span className={styles.line}>Ikymian</span>
          <span className={styles.line}>Studios</span>
        </div>
        <svg
          className={styles.heart}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <div className={styles.status} key={phraseIndex} aria-live="polite">
          <span>
            {phrases[phraseIndex]}
            <span className={styles.caret} aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  )
}
