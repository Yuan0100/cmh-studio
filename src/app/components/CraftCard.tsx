import Image from "next/image";
import styles from "./craft-card.module.scss";

type Props = {
  heroImage: string | undefined;
  title: string;
}

export default function CraftCard({ heroImage, title }: Props) {
  return (
    <div className={styles.container}>
      <div className={`thumb_area ${styles.thumb_area}`}>
        {heroImage && (
          <Image
            src={heroImage}
            alt={title}
            width={300}
            height={300}
          />
        )}
        <div className={styles.title}>
          <span>{title}</span>
        </div>
      </div>
    </div>
  )
}