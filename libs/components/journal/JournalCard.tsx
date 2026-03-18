import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import styles from "../../../scss/pc/journal/journalcard.module.scss";
import { JournalPost } from "@/libs/types/journal/journal.types";

interface JournalCardProps {
  post: JournalPost;
  index: number;
}

export default function JournalCard({ post, index }: JournalCardProps) {
  const isReversed = index % 2 !== 0;

  return (
    <Link href={`/journal/${post.slug}`} className={styles.link}>
      <Box className={`${styles.card} ${isReversed ? styles.reversed : ""}`}>
        {/* Image */}
        <div className={styles.imageWrap}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="50vw"
            className={styles.image}
          />
        </div>

        {/* Text */}
        <div className={styles.textWrap}>
          <Typography className={styles.brand}>{post.brand}</Typography>
          <Typography className={styles.title}>{post.title}</Typography>
          <div className={styles.readMore}>
            <span className={styles.line} />
            <span className={styles.readLabel}>Read</span>
          </div>
        </div>
      </Box>
    </Link>
  );
}
