'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './LoopingWords.module.css'

export default function LoopingWords({ words }: { words: string[] }) {
  const listRef = useRef<HTMLUListElement>(null)
  const selectorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    const selector = selectorRef.current
    if (!list || !selector || words.length < 2) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(selector, { width: '100%' })
      return
    }

    const context = gsap.context(() => {
      const items = Array.from(list.children) as HTMLElement[]
      const count = items.length
      const step = 100 / count
      let index = 0

      const frameWord = (targetIndex: number) => {
        const item = items[targetIndex % count]
        if (!item) return
        const wordEl = item.firstElementChild as HTMLElement | null
        const wordWidth = wordEl?.getBoundingClientRect().width ?? item.getBoundingClientRect().width
        const maxWidth = list.parentElement?.getBoundingClientRect().width ?? wordWidth
        const width = Math.min(Math.max(wordWidth + 28, 80), maxWidth)

        gsap.to(selector, {
          width,
          duration: 0.5,
          ease: 'expo.out',
        })
      }

      const onResize = () => frameWord(index)
      window.addEventListener('resize', onResize)
      document.fonts?.ready.then(() => frameWord(index))

      const move = () => {
        index += 1
        frameWord(index)
        gsap.to(list, {
          yPercent: -step * index,
          duration: 1.1,
          ease: 'elastic.out(1, 0.85)',
          onComplete: () => {
            if (index >= count - 2) {
              list.appendChild(list.children[0])
              index -= 1
              gsap.set(list, { yPercent: -step * index })
            }
          },
        })
      }

      frameWord(0)
      const interval = window.setInterval(move, 2400)

      return () => {
        window.clearInterval(interval)
        window.removeEventListener('resize', onResize)
      }
    }, list)

    return () => context.revert()
  }, [words.join('|')])

  return (
    <div className={styles.wrap}>
      <div className={styles.viewport}>
        <ul ref={listRef} className={styles.list}>
          {[...words, ...words].map((word, index) => (
            <li key={`${word}-${index}`} className={styles.item}>
              <span className={styles.word}>{word}</span>
            </li>
          ))}
        </ul>
      </div>

      <div ref={selectorRef} className={styles.selector} aria-hidden="true">
        <span className={styles.edge} />
        <span className={styles.edge} />
        <span className={styles.edge} />
        <span className={styles.edge} />
      </div>
    </div>
  )
}
