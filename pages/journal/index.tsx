import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import styles from "../../scss/pc/journal/journal.module.scss";
import { getJournalPosts } from "@/libs/types/journal/journal.api";
import JournalCard from "@/libs/components/journal/JournalCard";
import withLayoutBase from "@/libs/components/layout/LayoutBase";

export const metadata: Metadata = {
  title: "Journal | Kiddo",
  description:
    "Stories, lookbooks and editorials from our favourite kids brands.",
};

function JournalPage() {
  const posts = getJournalPosts();

  return (
    <Box className={styles.page}>
      <Container maxWidth="xl" disableGutters>
        {/* Header */}
        <Box className={styles.header}>
          <Typography className={styles.pageTitle}>Journal</Typography>
          <Typography className={styles.postCount}>
            {posts.length} stories
          </Typography>
        </Box>

        {/* Cards */}
        <Box className={styles.list}>
          {posts.map((post, index) => (
            <JournalCard key={post.id} post={post} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
export default withLayoutBase(JournalPage);
