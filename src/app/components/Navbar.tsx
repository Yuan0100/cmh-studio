'use client';

import Link from "next/link";
import styles from "./navbar.module.scss";
import { useState } from "react";

type Props = {}

const navItems = {
  '/craft': {
    title: 'Craft',
  },
  '/resources': {
    title: 'Resources',
  },
  '/about': {
    title: 'About',
  },
}

export default function Navbar({ }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      {/* Mobile Menu Button */}
      {/* <button
        className={styles.menu_button}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button> */}

      {/* Navigation Links */}
      <div className={`${styles.nav_menu} ${isMenuOpen ? styles.open : ''}`}>
        {Object.entries(navItems).map(([path, { title }]) => (
          <Link key={path
          } href={path}>
            {title}
          </Link>
        ))}
      </div>
    </nav>
  )
}