import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from './layout.module.scss'

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <div className={styles.container}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}