'use client'

import { useEffect, useRef } from 'react'
import styles from './MagicDust.module.css'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  scale: number
  rotation: number
  vr: number
  sprite: HTMLCanvasElement
  gravity: number
}

const COLORS: Array<[number, number, number]> = [
  [255, 138, 193],
  [111, 141, 255],
  [177, 255, 252],
  [202, 76, 255],
]

function makeSprite([r, g, b]: [number, number, number]) {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  const radius = size / 2
  const gradient = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius)
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`)
  gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.28)`)
  gradient.addColorStop(0.65, `rgba(${r}, ${g}, ${b}, 0)`)
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return canvas
}

export default function MagicDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = canvas?.closest('section')
    if (!canvas || !section) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const particles: Particle[] = []
    const sprites = COLORS.map(makeSprite)
    const maxParticles = 220

    let width = 0
    let height = 0
    let frame = 0
    let lastTime = performance.now()
    let ambientTimer = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = section.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = (x: number, y: number, burst = false) => {
      if (particles.length >= maxParticles) return

      const sprite = sprites[Math.floor(Math.random() * sprites.length)]
      const maxLife = burst ? 1.6 + Math.random() * 1.4 : 3 + Math.random() * 3

      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * (burst ? 1.6 : 0.5),
        vy: burst ? (Math.random() - 0.5) * 1.2 : -0.25 - Math.random() * 0.45,
        life: 0,
        maxLife,
        scale: (burst ? 0.25 : 0.12) + Math.random() * 0.55,
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.02,
        sprite,
        gravity: burst ? 0.02 : 0.004,
      })
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return
      for (let i = 0; i < 4; i++) spawn(x, y, true)
    }

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time
      ctx.clearRect(0, 0, width, height)

      ambientTimer += delta
      if (ambientTimer > 0.08 && particles.length < maxParticles - 40) {
        ambientTimer = 0
        spawn(Math.random() * width, height * (0.25 + Math.random() * 0.75))
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life += delta
        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        p.vy += p.gravity * delta * 60
        p.x += p.vx * delta * 60
        p.y += p.vy * delta * 60
        p.rotation += p.vr * delta * 60

        const progress = p.life / p.maxLife
        const alpha = Math.sin(Math.PI * progress) * 0.9
        const size = 46 * p.scale

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.drawImage(p.sprite, -size / 2, -size / 2, size, size)
        ctx.restore()
      }

      frame = window.requestAnimationFrame(render)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(section)
    section.addEventListener('pointermove', onPointerMove, { passive: true })
    frame = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      section.removeEventListener('pointermove', onPointerMove)
      particles.length = 0
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
