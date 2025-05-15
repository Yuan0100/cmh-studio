import Link from "next/link"
import styles from "./header.module.scss"
import { SITE_TITLE } from "../consts"
import Navbar from "./Navbar"

export default function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.title}>
          <Link href="/">
            {SITE_TITLE}
          </Link>
        </div>
        <Navbar />
      </div>
    </header>
  )
}