import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from '@components/layout/RootLayout';

// 지연 로딩 적용
const HomePage = lazy(() => import('@pages/HomePage'));
const PostListPage = lazy(() => import('@pages/PostListPage'));
const PostDetailPage = lazy(() => import('@pages/PostDetailPage'));
const EditPostPage = lazy(() => import('@pages/EditPostPage'));
const WritePostPage = lazy(() => import('@pages/WritePostPage'));

// 로딩 컴포넌트
const PageLoading = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    페이지 로딩 중...
  </div>
);

/**
 * 쿼리 클라이언트 설정
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * 라우터 설정
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoading />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'posts',
        element: (
          <Suspense fallback={<PageLoading />}>
            <PostListPage />
          </Suspense>
        ),
      },
      {
        path: 'posts/:id',
        element: (
          <Suspense fallback={<PageLoading />}>
            <PostDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'posts/:id/edit',
        element: (
          <Suspense fallback={<PageLoading />}>
            <EditPostPage />
          </Suspense>
        ),
      },
      {
        path: 'write',
        element: (
          <Suspense fallback={<PageLoading />}>
            <WritePostPage />
          </Suspense>
        ),
      },
    ],
  },
]);

/**
 * 앱 최상위 컴포넌트
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
