'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { logo } from './logoPaths'
import styles from './Preloader.module.css'

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const paths = Array.from(root.querySelectorAll<SVGPathElement>('path'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.documentElement.style.overflow = 'hidden'

    const finish = () => {
      document.documentElement.style.overflow = ''
      setDone(true)
    }

    if (reduceMotion) {
      paths.forEach((path) => gsap.set(path, { opacity: 1, strokeDasharray: 'none', strokeDashoffset: 0 }))
      const tween = gsap.to(root, { opacity: 0, duration: 0.4, delay: 0.4, onComplete: finish })
      return () => {
        tween.kill()
        document.documentElement.style.overflow = ''
      }
    }

    paths.forEach((path) => {
      const length = path.getTotalLength() + 1
      gsap.set(path, {
        opacity: 1,
        strokeDasharray: length,
        strokeDashoffset: length,
      })
    })

    const heart = paths[paths.length - 1]
    const letters = paths.slice(0, -1)

    const timeline = gsap.timeline({
      onComplete: finish,
    })

    timeline
      .to(letters, {
        strokeDashoffset: 0,
        duration: 0.36,
        stagger: 0.055,
        ease: 'power2.inOut',
      }, 0.15)
      .to(heart, {
        strokeDashoffset: 0,
        duration: 0.45,
        ease: 'power2.inOut',
      }, '>-0.05')
      .to(root, {
        yPercent: -100,
        duration: 0.75,
        ease: 'power4.inOut',
      }, '+=0.3')

    return () => {
      timeline.kill()
      document.documentElement.style.overflow = ''
    }
  }, [])

  if (done) return null

  return (
    <div ref={rootRef} data-preloader className={styles.overlay} role="status" aria-label="Loading Ikymian Studios">
      <div className={styles.glow} aria-hidden="true" />
      <svg
        className={styles.svg}
        viewBox={`0 0 ${logo.width} ${logo.height}`}
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <g transform={`translate(${-logo.minX} ${-logo.minY})`}>
          {logo.paths.map((path, index) => (
            <path
              key={`${path.ch}-${index}`}
              d={path.d}
              className={path.ch === 'heart' ? styles.heart : styles.stroke}
            />
          ))}
        </g>
      </svg>
      <div className={styles.hint}>Loading</div>
    </div>
  )
}
