import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@components/ui/button';
import { Post } from '@business/types/post';

/**
 * 게시글 폼 스키마
 */
export const postFormSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  author: z.string().min(1, '작성자를 입력해주세요.'),
});

export type PostFormData = z.infer<typeof postFormSchema>;

export interface PostFormProps {
  /**
   * 초기 폼 데이터 (수정 시 사용)
   */
  initialData?: Post;

  /**
   * 로딩 상태
   */
  isLoading?: boolean;

  /**
   * 폼 제출 핸들러
   */
  onSubmit: (data: PostFormData) => void;

  /**
   * 취소 버튼 클릭 핸들러
   */
  onCancel: () => void;

  /**
   * 제출 버튼 텍스트
   */
  submitText?: string;
}

/**
 * 게시글 작성/수정 폼 컴포넌트
 */
export function PostForm({
  initialData,
  isLoading = false,
  onSubmit,
  onCancel,
  submitText = '저장하기',
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: initialData 
      ? {
          title: initialData.title,
          content: initialData.content,
          author: initialData.author,
        } 
      : undefined,
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        content: initialData.content,
        author: initialData.author,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          제목
        </label>
        <input
          id="title"
          {...register('title')}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="author"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          작성자
        </label>
        <input
          id="author"
          {...register('author')}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
        />
        {errors.author && (
          <p className="text-sm text-red-500">{errors.author.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="content"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          내용
        </label>
        <textarea
          id="content"
          {...register('content')}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isLoading}
        >
          취소
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '처리 중...' : submitText}
        </Button>
      </div>
    </form>
  );
} 