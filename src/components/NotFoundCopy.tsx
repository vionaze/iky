'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './NotFoundCopy.module.css'

const text = '404, page not found.'

export default function NotFoundCopy() {
  const rootRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const chars = root.querySelectorAll<HTMLElement>(`.${styles.char}`)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      gsap.set(chars, { opacity: 1 })
      return
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true })
      timeline
        .set(chars, { opacity: 0 })
        .to(chars, {
          opacity: 1,
          duration: 0.01,
          stagger: 0.055,
          ease: 'none',
        })

      timelineRef.current = timeline
      timeline.restart()
    }, root)

    return () => context.revert()
  }, [])

  return (
    <main className={styles.page}>
      <span className={styles.ghost} aria-hidden="true">
        404
      </span>

      <div className={styles.panel} ref={rootRef}>
        <p className={styles.copy}>
          <span className="sr-only">{text}</span>
          <span aria-hidden="true">
            {text.split('').map((char, index) => (
              <span key={index} className={styles.char}>
                {char}
              </span>
            ))}
            <span className={styles.cursor} />
          </span>
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.replay}
            aria-label="Replay animation"
            onClick={() => timelineRef.current?.restart()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <polyline points="3 4 3 10 9 10" />
            </svg>
          </button>

          <a href="/" className={styles.home}>
            Back home
          </a>
        </div>
      </div>
    </main>
  )
}
