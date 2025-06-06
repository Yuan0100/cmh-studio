import CraftList from "../components/CraftList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./page.module.scss";

export default function CraftPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <div className={styles.container}>
          <h1>Crafts</h1>
          <CraftList />
        </div>
      </main>
      <Footer />
    </div>
  )
}