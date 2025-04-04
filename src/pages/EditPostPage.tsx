import { useCallback, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { PostForm, PostFormData } from '@components/post/PostForm';
import { usePostQuery, useUpdatePostMutation } from '@store/queries/usePostQueries';

/**
 * 게시글 수정 페이지 컴포넌트
 */
function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const postId = id ? Number(id) : 0;
  const navigate = useNavigate();
  
  const { data: post, isLoading: isLoadingPost } = usePostQuery(postId);
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePostMutation();

  const isLoading = isLoadingPost || isUpdating;

  // 게시글 수정 처리
  const handleSubmit = useCallback((data: PostFormData) => {
    updatePost(
      {
        id: postId,
        data,
      },
      {
        onSuccess: () => {
          navigate(`/posts/${postId}`);
        },
      },
    );
  }, [postId, updatePost, navigate]);

  // 취소 처리
  const handleCancel = useCallback(() => {
    navigate(`/posts/${postId}`);
  }, [postId, navigate]);

  if (isLoadingPost && !post) {
    return <div>로딩 중...</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>게시글 수정</CardTitle>
          <CardDescription>게시글을 수정해보세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <PostForm
            initialData={post}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitText="수정하기"
          />
        </CardContent>
      </Card>
    </div>
  );
}

// 메모이제이션 적용
export default memo(EditPostPage); 