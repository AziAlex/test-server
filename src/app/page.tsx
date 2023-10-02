import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <a href="/api">
        <h1>Go to api</h1>
      </a>
    </main>
  )
}
