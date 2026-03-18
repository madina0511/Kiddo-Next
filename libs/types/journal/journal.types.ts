export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  brand: string;
  coverImage: string;
  publishedAt: string;
}

export interface JournalPostDetail extends JournalPost {
  body: string; // HTML string from rich text editor / CMS / backend
  excerpt?: string; // Short summary for meta tags / previews
  author?: string; // Author display name
  tags?: string[]; // e.g. ['fleece', 'spring', 'molo']
  relatedProducts?: RelatedProduct[];
}

export interface RelatedProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  brand: string;
}
