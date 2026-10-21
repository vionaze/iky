'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './HeroStage.module.css'

type CardData =
  | { kind: 'photo'; src: string; fit: 'contain' | 'cover'; alt: string }
  | { kind: 'label'; tone: 'blue' | 'pink' | 'cream' | 'indigo'; label: string; value: string }

const cards: CardData[] = [
  { kind: 'label', tone: 'blue', label: 'Format', value: 'Series' },
  { kind: 'photo', src: '/images/hero-3.webp', fit: 'cover', alt: 'Ikymian Studios portrait' },
  { kind: 'photo', src: '/images/hero-1.png', fit: 'cover', alt: 'Ikymian Studios portrait' },
  { kind: 'label', tone: 'pink', label: 'Format', value: 'Music Video' },
  { kind: 'photo', src: '/images/works/berondong/ep01.jpg', fit: 'contain', alt: 'Berondong Sebelah Rumah' },
  { kind: 'label', tone: 'cream', label: 'Format', value: 'Short Film' },
  { kind: 'photo', src: '/images/hero-2.png', fit: 'cover', alt: 'Ikymian Studios portrait' },
  { kind: 'label', tone: 'indigo', label: 'Format', value: 'Tutorial' },
]

const rotations = [-9, -5, -2, 3, 0, 4, 7, -4]
const depths = [14, 10, 8, 12, 6, 11, 9, 13]

const scrollMoves = [
  { x: -260, y: -40, rot: -25 },
  { x: -200, y: 20, rot: -18 },
  { x: -120, y: 80, rot: -10 },
  { x: -40, y: 120, rot: -4 },
  { x: 40, y: 120, rot: 4 },
  { x: 120, y: 80, rot: 12 },
  { x: 200, y: 20, rot: 22 },
  { x: 260, y: -40, rot: 28 },
]

export default function HeroStage({
  small,
  ghost,
  cta,
}: {
  small: string
  ghost: string
  cta: string
}) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compact = window.matchMedia('(max-width: 750px)').matches
    const restRotation = (index: number) => (compact ? 0 : rotations[index] ?? 0)
    const cardEls = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.card}`))
    const words = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.word} > span`))
    const letters = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.letter}`))
    const sublineEl = root.querySelector<HTMLElement>(`.${styles.subline}`)
    const ghostWrap = root.querySelector<HTMLElement>(`.${styles.ghostWrap}`)

    const cleanups: Array<() => void> = []

    cardEls.forEach((card, index) => {
      card.dataset.restRot = String(restRotation(index))
      card.dataset.depth = String(depths[index] ?? 8)
    })

    if (reduceMotion) {
      words.forEach((word) => gsap.set(word, { y: '0%' }))
      letters.forEach((letter) => gsap.set(letter, { y: 0, opacity: 1 }))
      cardEls.forEach((card) => {
        gsap.set(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: Number(card.dataset.restRot || 0),
        })
      })
      if (sublineEl) gsap.set(sublineEl, { opacity: 1, y: 0 })
      root.classList.add(styles.ready)
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.set(words, { y: '105%' })
      gsap.set(letters, { y: 80, opacity: 0 })
      if (sublineEl) gsap.set(sublineEl, { opacity: 0, y: 20 })
      cardEls.forEach((card) => {
        gsap.set(card, {
          y: -700,
          rotation: Number(card.dataset.restRot || 0) + 25,
          opacity: 0,
          scale: 0.7,
        })
      })

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(words, { y: '0%', duration: 0.9, stagger: 0.08 }, 0.2)
        .to(letters, { y: 0, opacity: 1, duration: 0.9, stagger: 0.05, ease: 'back.out(1.6)' }, 0.45)
        .to(
          cardEls,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: (index) => restRotation(index),
            duration: 1.1,
            stagger: { each: 0.08, from: 'center' },
            ease: 'back.out(1.4)',
          },
          0.7,
        )
        .to(sublineEl, { opacity: 1, y: 0, duration: 0.8 }, 1.5)
        .add(() => root.classList.add(styles.ready), 2.2)

      cardEls.forEach((card, index) => {
        const rest = restRotation(index)
        gsap.to(card, {
          y: `+=${8 + (index % 3) * 5}`,
          rotation: rest + (index % 2 === 0 ? 1.5 : -1.5),
          duration: 3 + (index % 4) * 0.5,
          delay: 1.8 + index * 0.1,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })

      let mx = 0
      let my = 0
      let tx = 0
      let ty = 0
      let frame = 0

      const onPointerMove = (event: PointerEvent) => {
        const rect = root.getBoundingClientRect()
        mx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
        my = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      }
      const onPointerLeave = () => {
        mx = 0
        my = 0
      }

      root.addEventListener('pointermove', onPointerMove)
      root.addEventListener('pointerleave', onPointerLeave)

      const parallax = () => {
        frame = requestAnimationFrame(parallax)
        tx += (mx - tx) * 0.05
        ty += (my - ty) * 0.05
        cardEls.forEach((card) => {
          const depth = Number(card.dataset.depth || 8)
          card.style.translate = `${tx * depth}px ${ty * depth * 0.5}px`
        })
      }
      parallax()

      cardEls.forEach((card) => {
        const move = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect()
          const px = (event.clientX - rect.left) / rect.width - 0.5
          const py = (event.clientY - rect.top) / rect.height - 0.5
          gsap.to(card, {
            rotateX: -py * 16,
            rotateY: px * 16,
            scale: 1.12,
            zIndex: 20,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 700,
            overwrite: 'auto',
          })
        }
        const leave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            zIndex: Number(card.dataset.restZ || 0),
            duration: 0.8,
            ease: 'elastic.out(1, 0.6)',
            overwrite: 'auto',
          })
        }
        const enter = () => {
          card.dataset.restZ = String(Number(getComputedStyle(card).zIndex) || 0)
        }
        card.addEventListener('pointerenter', enter)
        card.addEventListener('pointermove', move)
        card.addEventListener('pointerleave', leave)
        cleanups.push(() => {
          card.removeEventListener('pointerenter', enter)
          card.removeEventListener('pointermove', move)
          card.removeEventListener('pointerleave', leave)
        })
      })

      const ghostLetters = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.letter}`))
      const ghostEnter = () => {
        gsap.to(ghostLetters, { y: -8, duration: 0.5, stagger: 0.03, ease: 'back.out(1.6)' })
      }
      const ghostLeave = () => {
        gsap.to(ghostLetters, { y: 0, duration: 0.6, stagger: 0.03, ease: 'elastic.out(1, 0.6)' })
      }
      if (ghostWrap) {
        ghostWrap.addEventListener('pointerenter', ghostEnter)
        ghostWrap.addEventListener('pointerleave', ghostLeave)
        cleanups.push(() => {
          ghostWrap.removeEventListener('pointerenter', ghostEnter)
          ghostWrap.removeEventListener('pointerleave', ghostLeave)
        })
      }

      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress
          const ghost = root.querySelector<HTMLElement>(`.${styles.ghost}`)
          const smallEl = root.querySelector<HTMLElement>(`.${styles.small}`)
          if (ghost) gsap.set(ghost, { scale: 1 + 0.15 * progress, opacity: 1 - 0.4 * progress })
          if (smallEl) gsap.set(smallEl, { y: -60 * progress, opacity: 1 - progress * 1.5 })
          cardEls.forEach((card, index) => {
            const moveSet = scrollMoves[index] ?? scrollMoves[0]
            gsap.set(card, {
              x: moveSet.x * progress,
              y: moveSet.y * progress,
              rotation: Number(card.dataset.restRot || 0) + moveSet.rot * progress,
            })
          })
          if (sublineEl) gsap.set(sublineEl, { opacity: 1 - progress * 2 })
        },
      })

      cleanups.push(() => {
        cancelAnimationFrame(frame)
        root.removeEventListener('pointermove', onPointerMove)
        root.removeEventListener('pointerleave', onPointerLeave)
      })
    }, root)

    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  const smallWords = small.split(' ')
  const ghostChars = Array.from(ghost)

  return (
    <section ref={rootRef} id="top" className={styles.stage}>
      <div className={styles.grain} aria-hidden="true" />

      <h1 className={styles.small}>
        {smallWords.map((word, index) => (
          <span key={index}>
            <span className={styles.word}>
              <span>{word}</span>
            </span>
            {index < smallWords.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h1>

      <div className={styles.ghostWrap} aria-hidden="true">
        <div className={styles.ghost}>
          {ghostChars.map((char, index) => (
            <span key={index} className={styles.letter}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.cards}>
        {cards.map((card, index) => {
          const className = [
            styles.card,
            styles[`c${index + 1}`],
            card.kind === 'photo'
              ? card.fit === 'contain'
                ? styles.fitContain
                : styles.fitCover
              : styles.label,
            card.kind === 'label' ? styles[`label${card.tone[0].toUpperCase()}${card.tone.slice(1)}`] : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <a
              key={index}
              href="#work"
              className={className}
              aria-label={card.kind === 'photo' ? 'See the work' : `See ${card.value}`}
            >
              {card.kind === 'photo' ? (
                <img src={card.src} alt={card.alt} loading={index > 2 ? 'lazy' : 'eager'} />
              ) : (
                <>
                  <span className={styles.k}>{card.label}</span>
                  <span className={styles.v}>{card.value}</span>
                </>
              )}
            </a>
          )
        })}
      </div>

      <div className={styles.subline}>
        <a className={styles.pill} href="#work">
          {cta}
          <span className={styles.orb} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="6 13 12 19 18 13" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  )
}
