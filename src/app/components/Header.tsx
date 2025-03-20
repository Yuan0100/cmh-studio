import Link from "next/link"
import styles from "./header.module.scss"
import { SITE_TITLE } from "../consts"

const navItems = {
  '/craft': {
    title: 'Craft',
  },
  '/about': {
    title: 'About',
  },
}

export default function Nav() {
  return (
    <header>
      <div className={styles.container}>
        <Link href="/">
          {SITE_TITLE}
        </Link>
        <nav className={styles.nav}>
          {Object.entries(navItems).map(([path, { title }]) => (
            <Link key={path
            } href={path}>
              {title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}