import { Link } from 'react-router-dom';

import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>환영합니다! 👋</CardTitle>
          <CardDescription>
            커뮤니티에 오신 것을 환영합니다. 자유롭게 글을 작성하고 다른 사람들과
            소통해보세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4">
            <Link to="/posts">
              <Button variant="outline">게시글 보기</Button>
            </Link>
            <Link to="/write">
              <Button>글쓰기</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 