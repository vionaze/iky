'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './WorksCarousel.module.css'

gsap.registerPlugin(ScrollTrigger)

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
      let iteration = 0
      let trigger: ScrollTrigger

      const loop = buildSeamlessLoop(items, spacing)

      const scrub = gsap.to(loop, {
        totalTime: 0,
        duration: 0.5,
        ease: 'power3',
        paused: true,
      })

      function wrapForward(self: ScrollTrigger) {
        iteration++
        ;(self as ScrollTrigger & { wrapping?: boolean }).wrapping = true
        self.scroll(self.start + 1)
      }

      function wrapBackward(self: ScrollTrigger) {
        iteration--
        if (iteration < 0) {
          iteration = 9
          loop.totalTime(loop.totalTime() + loop.duration() * 10)
          scrub.pause()
        }
        ;(self as ScrollTrigger & { wrapping?: boolean }).wrapping = true
        self.scroll(self.end - 1)
      }

      function scrubTo(totalTime: number) {
        const progress = (totalTime - loop.duration() * iteration) / loop.duration()
        if (progress > 1) {
          wrapForward(trigger)
        } else if (progress < 0) {
          wrapBackward(trigger)
        } else {
          trigger.scroll(trigger.start + progress * (trigger.end - trigger.start))
        }
      }

      trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: '+=3000',
        pin: true,
        onUpdate(self) {
          const state = self as ScrollTrigger & { wrapping?: boolean }
          if (self.progress === 1 && self.direction > 0 && !state.wrapping) {
            wrapForward(self)
          } else if (self.progress < 1e-5 && self.direction < 0 && !state.wrapping) {
            wrapBackward(self)
          } else {
            scrub.vars.totalTime = snap((iteration + self.progress) * loop.duration())
            scrub.invalidate().restart()
            state.wrapping = false
          }
        },
      })

      const onPrev = () => scrubTo(scrub.vars.totalTime - spacing)
      const onNext = () => scrubTo(scrub.vars.totalTime + spacing)

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
                <span className={styles.overlay}>
                  <span className={styles.cardKicker}>{card.kicker}</span>
                  <span className={styles.cardTitle}>{card.title}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.actions}>
        <button ref={prevRef} type="button" className={styles.button}>
          Prev
        </button>
        <button ref={nextRef} type="button" className={styles.button}>
          Next
        </button>
      </div>
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
