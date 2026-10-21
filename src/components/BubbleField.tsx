'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './BubbleField.module.css'

gsap.registerPlugin(ScrollTrigger)

export type Bubble = {
  type: string
  title: string
  img: string
  size: number
  left: number
  top: number
  center?: boolean
}

type BubbleFieldProps = {
  bubbles: Bubble[]
  kicker: string
  hint: string
  explore: string
}

export default function BubbleField({ bubbles, kicker, hint, explore }: BubbleFieldProps) {
  const rootRef = useRef<HTMLElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const field = fieldRef.current
    if (!root || !field) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const context = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(`.${styles.bubble}`, field)

      items.forEach((bubble, index) => {
        gsap.set(bubble, { xPercent: -50, yPercent: -50 })

        gsap.to(bubble, {
          x: index % 3 === 0 ? -12 : 12,
          y: index % 2 === 0 ? 16 : -16,
          duration: 5 + (index % 4) * 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.3,
        })
      })

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=170%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        timeline
          .to(field, { scale: 3, ease: 'none' }, 0)
          .to(`.${styles.copy}`, { opacity: 0, y: -40, ease: 'none' }, 0)
      })
    }, root)

    return () => context.revert()
  }, [])

  return (
    <section ref={rootRef} className={styles.section} aria-label={kicker}>
      <div className={styles.stars} aria-hidden="true" />

      <div className={styles.copy}>
        <p className={styles.kicker}>{kicker}</p>
        <p className={styles.hint}>{hint}</p>
      </div>

      <div ref={fieldRef} className={styles.field}>
        {bubbles.map((bubble, index) => (
          <a
            key={`${bubble.type}-${index}`}
            href="#work"
            className={`${styles.bubble} ${bubble.center ? styles.center : ''}`}
            style={{
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              width: `clamp(${Math.round(bubble.size * 0.5)}px, ${(bubble.size / 14.4).toFixed(1)}vw, ${bubble.size}px)`,
            }}
            aria-label={`${bubble.type}: ${bubble.title}`}
          >
            <img src={bubble.img} alt="" loading="lazy" />
            <span className={styles.glass} aria-hidden="true" />
            <span className={styles.info}>
              <span className={styles.type}>{bubble.type}</span>
              <span className={styles.title}>{bubble.title}</span>
              <span className={styles.explore}>
                {explore} <span aria-hidden="true">↗</span>
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
