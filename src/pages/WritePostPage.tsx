import { useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { PostForm, PostFormData } from '@components/post/PostForm';
import { useCreatePostMutation } from '@store/queries/usePostQueries';

/**
 * 게시글 작성 페이지 컴포넌트
 */
function WritePostPage() {
  const navigate = useNavigate();
  const { mutate: createPost, isPending: isCreating } = useCreatePostMutation();

  // 게시글 생성 처리
  const handleSubmit = useCallback((data: PostFormData) => {
    createPost(data, {
      onSuccess: () => {
        navigate('/posts');
      },
    });
  }, [createPost, navigate]);

  // 취소 처리
  const handleCancel = useCallback(() => {
    navigate('/posts');
  }, [navigate]);

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>글쓰기</CardTitle>
          <CardDescription>새로운 게시글을 작성해보세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <PostForm
            isLoading={isCreating}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitText="작성하기"
          />
        </CardContent>
      </Card>
    </div>
  );
}

// 메모이제이션 적용
export default memo(WritePostPage); 