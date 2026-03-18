import JournalStory from "@/libs/components/journal/Journalstory";
import {
  getJournalPostBySlug,
  getJournalPosts,
} from "@/libs/types/journal/journal.api";
import { JournalPostDetail } from "@/libs/types/journal/journal.types";
import type { GetStaticPaths, GetStaticProps, Metadata, NextPage } from "next";
import { Head } from "next/document";
import { notFound } from "next/navigation";

interface Props {
  post: JournalPostDetail;
}

// ── Static paths ──────────────────────────────────────
export const getStaticPaths: GetStaticPaths = () => {
  const posts = getJournalPosts();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

// ── Static props ──────────────────────────────────────
export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const slug = params?.slug as string;
  const post = getJournalPostBySlug(slug);

  if (!post) return { notFound: true };

  return { props: { post } };
};

// ── Page ──────────────────────────────────────────────
const JournalSlugPage: NextPage<Props> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title} | Kiddo Journal</title>
        <meta
          name="description"
          content={post.excerpt ?? `${post.brand} — ${post.title}`}
        />
      </Head>

      <JournalStory post={post} />
    </>
  );
};

export default JournalSlugPage;
