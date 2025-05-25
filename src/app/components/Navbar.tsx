'use client';

import Link from "next/link";
import styles from "./navbar.module.scss";
import { useState } from "react";
import { AlignRight, X } from "lucide-react";


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

export default function Navbar({ }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className={`${styles.menu_bg} ${isMenuOpen ? styles.open : ''}`} />
      <nav className={styles.nav} data-is-menu-open={isMenuOpen}>
        {/* Mobile Menu Button */}
        <button
          className={`${styles.menu_button} ${isMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X />
          ) : (
            <AlignRight />
          )}
        </button>

        {/* Navigation Links */}
        <div className={`${styles.nav_menu} ${isMenuOpen ? styles.open : ''}`}>
          {Object.entries(navItems).map(([path, { title }]) => (
            <Link key={path} href={path} onClick={handleLinkClick}>
              {title}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}