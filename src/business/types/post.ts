export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  author: string;
}

// Partial<CreatePostInput>과 동일하지만 나중에 확장을 위해 명시적으로 타입 정의
export type UpdatePostInput = Partial<CreatePostInput>;

export interface PostQueryFilters {
  author?: string;
  searchTerm?: string;
} 