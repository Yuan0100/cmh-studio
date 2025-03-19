import { MoveUpRight } from "lucide-react";
import styles from "./footer.module.scss";

type Props = {}

export default function Footer({ }: Props) {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <a href="https://cmhsieh.github.io/ComputingAestheticsLab/" target="_blank" className={styles.footer_link}>
            <MoveUpRight size={16} />
            <p>演算美學實驗室</p>
          </a>
        </li>
      </ul>
      <p>
        © {new Date().getFullYear()} MIT Licensed
      </p>
    </footer>
  )
}