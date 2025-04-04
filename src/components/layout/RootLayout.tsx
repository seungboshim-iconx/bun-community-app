import { Link, Outlet } from 'react-router-dom';

import { Button } from '@components/ui/button';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">커뮤니티</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/posts">게시글</Link>
            <Link to="/write">
              <Button>글쓰기</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  );
} 