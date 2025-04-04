import { CreatePostInput, Post, UpdatePostInput } from '@business/types/post';

// 초기 데이터
const INITIAL_POSTS: readonly Post[] = [
  {
    id: 1,
    title: '첫 번째 게시글',
    content: '안녕하세요! 첫 번째 게시글입니다.',
    author: '홍길동',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// 데이터 스토어 (실제로는 DB를 사용할 것임)
let postsData: Post[] = [...INITIAL_POSTS];

/**
 * 게시글 관련 서비스
 */
export const postService = {
  /**
   * 모든 게시글 조회
   */
  async getPosts(): Promise<readonly Post[]> {
    return [...postsData];
  },

  /**
   * 특정 게시글 조회
   */
  async getPost(id: number): Promise<Post | undefined> {
    return postsData.find((post) => post.id === id);
  },

  /**
   * 게시글 생성
   */
  async createPost(input: CreatePostInput): Promise<Post> {
    const newId = postsData.length > 0 
      ? Math.max(...postsData.map(post => post.id)) + 1 
      : 1;
      
    const newPost: Post = {
      id: newId,
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // 불변성 유지
    postsData = [...postsData, newPost];
    
    return { ...newPost };
  },

  /**
   * 게시글 수정
   */
  async updatePost(id: number, input: UpdatePostInput): Promise<Post | undefined> {
    const index = postsData.findIndex((post) => post.id === id);
    if (index === -1) return undefined;

    const updatedPost: Post = {
      ...postsData[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    
    // 불변성 유지
    postsData = [
      ...postsData.slice(0, index),
      updatedPost,
      ...postsData.slice(index + 1),
    ];
    
    return { ...updatedPost };
  },

  /**
   * 게시글 삭제
   */
  async deletePost(id: number): Promise<boolean> {
    const index = postsData.findIndex((post) => post.id === id);
    if (index === -1) return false;
    
    // 불변성 유지
    postsData = [
      ...postsData.slice(0, index),
      ...postsData.slice(index + 1),
    ];
    
    return true;
  },
}; 