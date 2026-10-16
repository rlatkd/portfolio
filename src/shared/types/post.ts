export type PostMetadata = {
  index: number;
  title: string;
  category: string;
  publishedAt: string;
  summary: string;
  image?: string;
  updatedAt?: string;
  sourceUrl?: string;
};

export type PostHeading = { level: number; text: string; id: string };
export type Post = {
  metadata: PostMetadata;
  slug: string;
  content: string;
  tableContents: PostHeading[];
};
export type PostPreview = Pick<Post, 'slug' | 'metadata'>;
