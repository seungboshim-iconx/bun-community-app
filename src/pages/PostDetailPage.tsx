import { memo, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { useDeletePostMutation, usePostQuery } from '@store/queries/usePostQueries';

/**
 * 게시글 상세 페이지 컴포넌트
 */
function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const postId = id ? Number(id) : 0;
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { data: post, isLoading } = usePostQuery(postId);
  const { mutate: deletePost } = useDeletePostMutation();

  /**
   * 게시글 삭제 처리
   */
  const handleDelete = useCallback(() => {
    if (!post) return;
    
    setIsDeleting(true);
    deletePost(post.id, {
      onSuccess: () => {
        navigate('/posts');
      },
      onError: () => {
        setIsDeleting(false);
      },
    });
  }, [post, deletePost, navigate]);

  /**
   * 목록으로 이동
   */
  const handleGoToList = useCallback(() => {
    navigate('/posts');
  }, [navigate]);

  /**
   * 수정 페이지로 이동
   */
  const handleGoToEdit = useCallback(() => {
    if (!post) return;
    navigate(`/posts/${post.id}/edit`);
  }, [post, navigate]);

  // 로딩 중 처리
  if (isLoading) {
    return <div className="flex justify-center py-8">로딩 중...</div>;
  }

  // 게시글이 없는 경우
  if (!post) {
    return (
      <div className="flex flex-col items-center py-8 space-y-4">
        <div>게시글을 찾을 수 없습니다.</div>
        <Button variant="outline" onClick={handleGoToList}>목록으로</Button>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>
            작성자: {post.author} | 작성일: {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p>{post.content}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleGoToList}
          >
            목록으로
          </Button>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={handleGoToEdit}
            >
              수정
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

// 메모이제이션 적용
export default memo(PostDetailPage); 