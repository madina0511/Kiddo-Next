import { JournalPost, JournalPostDetail } from "./journal.types";

const GQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3000/graphql";

// ── Mock data ─────────────────────────────────────────
const MOCK_POSTS: JournalPost[] = [
  {
    id: "1",
    slug: "yes-sun-fleece-edit",
    title: "Yes, Sun — the fleece edit",
    brand: "MOLO",
    coverImage: "/images/journal/fleece-edit.jpg",
    publishedAt: "2025-04-01",
  },
  {
    id: "2",
    slug: "stripes-and-soft-mornings",
    title: "Stripes & soft mornings",
    brand: "NORALEE",
    coverImage: "/images/journal/stripes.jpg",
    publishedAt: "2025-03-18",
  },
  {
    id: "3",
    slug: "built-for-every-adventure",
    title: "Built for every adventure",
    brand: "COSMO",
    coverImage: "/images/journal/adventure.jpg",
    publishedAt: "2025-03-05",
  },
  {
    id: "4",
    slug: "sweet-layers-for-spring",
    title: "Sweet layers for spring",
    brand: "SWEEBIES",
    coverImage: "/images/journal/spring-layers.jpg",
    publishedAt: "2025-02-20",
  },
];

const MOCK_DETAIL: Record<string, JournalPostDetail> = {
  "yes-sun-fleece-edit": {
    id: "1",
    slug: "yes-sun-fleece-edit",
    title: "Yes, Sun — the fleece edit",
    brand: "MOLO",
    coverImage: "/images/journal/fleece-edit.jpg",
    publishedAt: "2025-04-01",
    excerpt: "Soft, lightweight cotton fleece perfect for layering.",
    author: "Kiddo Editorial",
    tags: ["fleece", "spring", "molo"],
    body: `<p>Our <strong>cotton fleece</strong> is super soft and lightweight — perfect for layering in spring or on those cooler summer afternoons.</p>
<p>It comes in solids or stripes, so there's something for everyone. These clothes also feature printed details that celebrate the joy of sunny days, too.</p>`,
  },
  "stripes-and-soft-mornings": {
    id: "2",
    slug: "stripes-and-soft-mornings",
    title: "Stripes & soft mornings",
    brand: "NORALEE",
    coverImage: "/images/journal/stripes.jpg",
    publishedAt: "2025-03-18",
    excerpt: "Relaxed stripe pieces built for lazy weekend starts.",
    author: "Kiddo Editorial",
    tags: ["stripes", "weekend", "noralee"],
    body: `<p>Soft mornings call for softer clothes. Our <strong>stripe collection</strong> is built for lazy weekend starts — relaxed fits, breathable fabrics, easy to wear.</p>
<p>Mix and match the stripes freely. There are no wrong combinations here.</p>`,
  },
  "built-for-every-adventure": {
    id: "3",
    slug: "built-for-every-adventure",
    title: "Built for every adventure",
    brand: "COSMO",
    coverImage: "/images/journal/adventure.jpg",
    publishedAt: "2025-03-05",
    excerpt: "Durable, washable pieces that keep up with every adventure.",
    author: "Kiddo Editorial",
    tags: ["adventure", "durable", "cosmo"],
    body: `<p>Whether it's a muddy park or a beach afternoon, these pieces are made to keep up. <strong>Durable, washable, and always comfortable.</strong></p>
<p>Adventure-ready doesn't mean compromise on style. Every detail is considered.</p>`,
  },
  "sweet-layers-for-spring": {
    id: "4",
    slug: "sweet-layers-for-spring",
    title: "Sweet layers for spring",
    brand: "SWEEBIES",
    coverImage: "/images/journal/spring-layers.jpg",
    publishedAt: "2025-02-20",
    excerpt: "Light spring layers for unpredictable in-between days.",
    author: "Kiddo Editorial",
    tags: ["spring", "layers", "sweebies"],
    body: `<p>Spring layers done right. Light enough to shed, warm enough to keep — our <strong>spring collection</strong> handles those unpredictable in-between days with ease.</p>
<p>Soft palettes, playful prints, and shapes that let kids move freely all day long.</p>`,
  },
};

// ── getJournalPosts ───────────────────────────────────
// When backend is ready, replace body with:
//   const res = await axios.post(GQL_ENDPOINT, { query: GET_JOURNAL_POSTS })
//   return res.data.data.journalPosts
export function getJournalPosts(): JournalPost[] {
  return MOCK_POSTS;
}

// ── getJournalPostBySlug ──────────────────────────────
// When backend is ready, replace body with:
//   const res = await axios.post(GQL_ENDPOINT, {
//     query: GET_JOURNAL_POST,
//     variables: { slug },
//   })
//   return res.data.data.journalPost ?? null
export function getJournalPostBySlug(slug: string): JournalPostDetail | null {
  return MOCK_DETAIL[slug] ?? null;
}

// ── GraphQL queries ───────────────────────────────────
export const GET_JOURNAL_POSTS = `
  query GetJournalPosts {
    journalPosts {
      id
      slug
      title
      brand
      coverImage
      publishedAt
    }
  }
`;

export const GET_JOURNAL_POST = `
  query GetJournalPost($slug: String!) {
    journalPost(slug: $slug) {
      id
      slug
      title
      brand
      coverImage
      publishedAt
      excerpt
      author
      tags
      body
      relatedProducts {
        id
        slug
        name
        price
        imageUrl
        brand
      }
    }
  }
`;
