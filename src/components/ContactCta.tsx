import styles from './ContactCta.module.css'

export default function ContactCta({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className={styles.cta}>
      <span className={`${styles.edge} ${styles.edgeLeft}`} aria-hidden="true" />
      <span className={`${styles.edge} ${styles.edgeRight}`} aria-hidden="true" />
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
      <span className={styles.arrow} aria-hidden="true">
        ↗
      </span>
    </a>
  )
}
