import { 
  useMutation, 
  useQuery, 
  useQueryClient, 
  type UseMutationResult, 
  type UseQueryResult 
} from '@tanstack/react-query';

import { CreatePostInput, Post, UpdatePostInput } from '@business/types/post';
import { postService } from '@business/services/postService';

/**
 * 게시글 관련 쿼리 키 상수
 */
export const POST_QUERY_KEYS = {
  all: ['posts'] as const,
  detail: (id: number) => ['posts', id] as const,
};

/**
 * 게시글 목록 조회 훅
 */
export function usePostsQuery(): UseQueryResult<readonly Post[]> {
  return useQuery({
    queryKey: POST_QUERY_KEYS.all,
    queryFn: () => postService.getPosts(),
    staleTime: 1000 * 60, // 1분
  });
}

/**
 * 특정 게시글 조회 훅
 */
export function usePostQuery(id: number): UseQueryResult<Post | undefined> {
  return useQuery({
    queryKey: POST_QUERY_KEYS.detail(id),
    queryFn: () => postService.getPost(id),
    enabled: id > 0,
    staleTime: 1000 * 60, // 1분
  });
}

/**
 * 게시글 수정 파라미터 타입
 */
export interface UpdatePostParams {
  id: number;
  data: UpdatePostInput;
}

/**
 * 게시글 생성 뮤테이션 훅
 */
export function useCreatePostMutation(): UseMutationResult<
  Post, 
  Error, 
  CreatePostInput
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePostInput) => postService.createPost(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.all });
    },
  });
}

/**
 * 게시글 수정 뮤테이션 훅
 */
export function useUpdatePostMutation(): UseMutationResult<
  Post | undefined, 
  Error, 
  UpdatePostParams
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdatePostParams) => postService.updatePost(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.detail(id) });
    },
  });
}

/**
 * 게시글 삭제 뮤테이션 훅
 */
export function useDeletePostMutation(): UseMutationResult<
  boolean, 
  Error, 
  number
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => postService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.all });
    },
  });
} 