import { MoveUpRight } from "lucide-react";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} MIT Licensed
      </p>
      <ul>
        <li>
          <a href="https://cmhsieh.github.io/ComputingAestheticsLab/" target="_blank" className={styles.footer_link}>
            <p>演算美學實驗室</p>
            <MoveUpRight size={16} />
          </a>
        </li>
      </ul>
    </footer>
  )
}