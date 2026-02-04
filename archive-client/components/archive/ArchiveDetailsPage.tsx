import { BreadcrumbDemo } from "./BreadcrumbDemo";
import ArticlePage from "./ArticlePage";
import { ApiPost } from "@/types/blog.type";

interface ArchiveDetailsPageProps {
  post: ApiPost;
}

const ArchiveDetailsPage = ({ post }: ArchiveDetailsPageProps) => {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <BreadcrumbDemo />
      </div>

      <ArticlePage post={post} />
    </>
  );
};

export default ArchiveDetailsPage;
