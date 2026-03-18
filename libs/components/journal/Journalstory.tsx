import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import styles from "../../../scss/pc/journal/journalstory.module.scss";
import { JournalPostDetail } from "@/libs/types/journal/journal.types";

interface JournalStoryProps {
  post: JournalPostDetail;
}

export default function JournalStory({ post }: JournalStoryProps) {
  return (
    <Box className={styles.wrap}>
      {/* ── Left — sticky image ── */}
      <div className={styles.imageCol}>
        <div className={styles.imageInner}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="50vw"
            className={styles.image}
            priority
          />
        </div>
      </div>

      {/* ── Right — scrollable content ── */}
      <div className={styles.contentCol}>
        <div className={styles.contentInner}>
          <Link href="/journal" className={styles.back}>
            <span className={styles.backLine} />
            Journal
          </Link>

          <Typography className={styles.brand}>{post.brand}</Typography>

          <Typography component="h1" className={styles.title}>
            {post.title}
          </Typography>

          <div className={styles.divider} />

          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>
      </div>
    </Box>
  );
}
