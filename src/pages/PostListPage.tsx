import { memo, useMemo } from 'react';

import PostCard from '@components/post/PostCard';
import { usePostsQuery } from '@store/queries/usePostQueries';

/**
 * 게시글 목록 페이지 컴포넌트
 */
function PostListPage() {
  const { data: posts, isLoading } = usePostsQuery();

  // 게시글 목록 메모이제이션
  const postList = useMemo(() => {
    if (!posts) return null;
    
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    );
  }, [posts]);

  // 로딩 중 처리
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 게시글이 없는 경우
  if (!posts || posts.length === 0) {
    return <div>게시글이 없습니다.</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">게시글 목록</h1>
      {postList}
    </div>
  );
}

// 메모이제이션 적용
export default memo(PostListPage); 