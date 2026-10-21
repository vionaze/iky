'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './WorksCarousel.module.css'

export type WorkCard = {
  img: string
  kicker: string
  title: string
}

type WorksCarouselProps = {
  label: string
  index: string
  intro: string
  cards: WorkCard[]
}

export default function WorksCarousel({ label, index, intro, cards }: WorksCarouselProps) {
  const rootRef = useRef<HTMLElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      gsap.set(root.querySelectorAll(`.${styles.card}`), { opacity: 1 })
      return
    }

    const context = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(`.${styles.card}`, root)
      const spacing = 0.1
      const snap = gsap.utils.snap(spacing)
      const loop = buildSeamlessLoop(items, spacing)
      loop.pause()

      const scrub = gsap.to(loop, {
        totalTime: 0,
        duration: 0.7,
        ease: 'power3',
        paused: true,
      })

      const go = (direction: number) => {
        scrub.vars.totalTime = snap((scrub.vars.totalTime ?? 0) + direction * spacing)
        scrub.invalidate().restart()
      }

      const onPrev = () => go(-1)
      const onNext = () => go(1)

      prevRef.current?.addEventListener('click', onPrev)
      nextRef.current?.addEventListener('click', onNext)
    }, root)

    return () => context.revert()
  }, [])

  return (
    <section id="work" ref={rootRef} className={styles.section}>
      <div className={styles.head}>
        <p className={styles.kicker}>
          {index} / Work
        </p>
        <h2 className={styles.title}>{label}</h2>
        <p className={styles.intro}>{intro}</p>
      </div>

      <div className={styles.gallery}>
        <ul className={styles.cards}>
          {cards.map((card, cardIndex) => (
            <li key={`${card.title}-${cardIndex}`} className={styles.card}>
              <a href="#work" aria-label={`${card.kicker}: ${card.title}`}>
                <img src={card.img} alt="" loading="lazy" />
                <span className={styles.glow} aria-hidden="true" />
                <span className={styles.overlay}>
                  <span className={styles.cardKicker}>{card.kicker}</span>
                  <span className={styles.cardTitle}>{card.title}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <button
        ref={prevRef}
        type="button"
        className={`${styles.navButton} ${styles.prev}`}
        aria-label="Previous work"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 6 9 12 15 18" />
        </svg>
      </button>

      <button
        ref={nextRef}
        type="button"
        className={`${styles.navButton} ${styles.next}`}
        aria-label="Next work"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>
    </section>
  )
}

function buildSeamlessLoop(items: HTMLElement[], spacing: number) {
  const overlap = Math.ceil(1 / spacing)
  const startTime = items.length * spacing + 0.5
  const loopTime = (items.length + overlap) * spacing + 1
  const rawSequence = gsap.timeline({ paused: true })
  const seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      const timeline = this as unknown as { _time: number; _dur: number; _tTime: number }
      if (timeline._time === timeline._dur) {
        timeline._tTime += timeline._dur - 0.01
      }
    },
  })

  gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 })

  const total = items.length + overlap * 2

  for (let i = 0; i < total; i++) {
    const item = items[i % items.length]
    const time = i * spacing

    rawSequence
      .fromTo(
        item,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: 'power1.in', immediateRender: false },
        time,
      )
      .fromTo(item, { xPercent: 400 }, { xPercent: -400, duration: 1, ease: 'none', immediateRender: false }, time)
  }

  rawSequence.time(startTime)
  seamlessLoop
    .to(rawSequence, { time: loopTime, duration: loopTime - startTime, ease: 'none' })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      { time: startTime, duration: startTime - (overlap * spacing + 1), immediateRender: false, ease: 'none' },
    )

  return seamlessLoop
}
