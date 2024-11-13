import Image from "next/image";
import { loadCardStyles } from "./styles";
import { ICardProps } from "./types";
import Link from "next/link";

export const Card = ({ name, urgent, image }: ICardProps) => {
  const styles = loadCardStyles();

  return (
    <Link href="/form" passHref>
      <div className={styles.wrapper}>
        <div className={styles.top}>{urgent}</div>
        <Image
          aria-hidden
          src={image.src}
          alt={image.src}
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.bottom}>{name}</div>
      </div>
    </Link>
  );
};
