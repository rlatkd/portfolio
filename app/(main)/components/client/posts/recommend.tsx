'use client';

import { useEffect, useState } from 'react';
import { Posts } from 'app/(main)/components/posts';

type RecommendProps = {
  posts: any[]; // 서버에서 가져온 게시글 데이터
  currentPostIndex: number; // 현재 상세 페이지의 게시글 인덱스
};

export default function Recommend({ posts, currentPostIndex }: RecommendProps) {

  console.log(posts)
  const [randomPosts, setRandomPosts] = useState<any[]>([]);

  useEffect(() => {
    // 랜덤 추천 게시물 계산, 컴포넌트가 처음 마운트될 때만 실행
    const otherPosts = posts.filter((post) => post.metadata.index !== currentPostIndex);
    const shuffledPosts = [...otherPosts].sort(() => Math.random() - 0.5).slice(0, 4);
    setRandomPosts(shuffledPosts);
  }, []); // 의존성 배열을 비워두어서 마운트 시 한 번만 실행되도록 설정

  if (randomPosts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold mb-4">추천 글</h2>
      <Posts posts={randomPosts} />
    </div>
  );
}
