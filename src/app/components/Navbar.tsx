import Link from "next/link";
import styles from "./navbar.module.scss";

type Props = {}

const navItems = {
  '/craft': {
    title: 'Craft',
  },
  '/about': {
    title: 'About',
  },
}

export default function Navbar({ }: Props) {
  return (
    <nav className={styles.nav}>
      {Object.entries(navItems).map(([path, { title }]) => (
        <Link key={path
        } href={path}>
          {title}
        </Link>
      ))}
    </nav>
  )
}