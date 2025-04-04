import { memo } from 'react';
import { Link } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Post } from '@business/types/post';

export interface PostCardProps {
  /**
   * 게시글 데이터
   */
  post: Post;

  /**
   * 상세 페이지로 이동 여부
   */
  isLinkable?: boolean;
}

/**
 * 게시글 카드 컴포넌트
 */
export function PostCard({ post, isLinkable = true }: PostCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();
  const content = (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="line-clamp-1">{post.title}</CardTitle>
        <CardDescription>
          작성자: {post.author} | 작성일: {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {post.content}
        </p>
      </CardContent>
    </Card>
  );

  if (isLinkable) {
    return (
      <Link to={`/posts/${post.id}`} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

// 메모이제이션 적용
export default memo(PostCard); 