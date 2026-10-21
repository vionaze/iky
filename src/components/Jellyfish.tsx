'use client'

import { useEffect, useRef } from 'react'
import styles from './Jellyfish.module.css'

export default function Jellyfish() {
  const rootRef = useRef<HTMLDivElement>(null)
  const jellyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const jelly = jellyRef.current
    if (!root || !jelly) return

    if (
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const width = 130
    const height = 150
    const pad = 16

    let targetX = window.innerWidth - width - 32
    let targetY = window.innerHeight - height - 80
    let currentX = targetX
    let currentY = targetY
    let frame = 0
    let happyTimer = 0

    jelly.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value))

    const onPointerMove = (event: PointerEvent) => {
      targetX = clamp(event.clientX - width / 2, pad, window.innerWidth - width - pad)
      targetY = clamp(event.clientY - height * 0.85, pad, window.innerHeight - height - pad)
    }

    const onPointerDown = () => {
      jelly.classList.add(styles.happy)
      window.clearTimeout(happyTimer)
      happyTimer = window.setTimeout(() => jelly.classList.remove(styles.happy), 1300)
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.11
      currentY += (targetY - currentY) * 0.11
      jelly.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      frame = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    frame = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.cancelAnimationFrame(frame)
      window.clearTimeout(happyTimer)
    }
  }, [])

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <div ref={jellyRef} className={styles.jelly}>
        <div className={styles.float}>
          <span className={`${styles.bubble} ${styles.b1}`} />
          <span className={`${styles.bubble} ${styles.b2}`} />
          <span className={`${styles.bubble} ${styles.b3}`} />

          <span className={styles.heart}>♥</span>

          <div className={styles.head}>
            <span className={styles.shine} />
            <span className={styles.eye} />
            <span className={styles.eye} />
            <span className={styles.mouth} />
          </div>
          <div className={styles.tentacles}>
            <i /><i /><i /><i />
          </div>
        </div>
      </div>
    </div>
  )
}
