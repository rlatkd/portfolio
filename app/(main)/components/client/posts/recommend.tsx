"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { dateFormatter } from 'app/(main)/utils/dateFormatter';

type RecommendProps = {
  posts: any[];
  currentPostIndex: number;
};

export default function Recommend({ posts, currentPostIndex }: RecommendProps) {
  const [randomPosts, setRandomPosts] = useState<any[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && posts && posts.length > 0) {
      const otherPosts = posts.filter((post) => post.metadata.index !== currentPostIndex);
      const shuffledPosts = [...otherPosts].sort(() => Math.random() - 0.5).slice(0, 4);
      setRandomPosts(shuffledPosts);
      initialized.current = true;
    }
  }, [posts, currentPostIndex]); 

  if (randomPosts.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {randomPosts.map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col h-80 space-y-1 border border-neutral-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            href={`/posts/${post.metadata.index}`}
          >
            <div className="flex flex-col space-y-2">
              <p className="text-neutral-600 dark:text-neutral-400 text-sm tabular-nums">
                {dateFormatter(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 text-sm">
                {post.metadata.category}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 text-lg font-semibold">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
