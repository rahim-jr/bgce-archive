import ArchiveWrapper from "@/components/archive/ArchiveWrapper";
import { getPosts } from "@/lib/api";
import { transformPostsToArticles } from "@/lib/transformers";

const ArticlesPage = async () => {
  // Fetch real posts from Postal API
  const posts = await getPosts({ limit: 50 });

  // Transform API posts to Article format
  const articles = transformPostsToArticles(posts);

  return (
    <>
      <ArchiveWrapper articles={articles} />
    </>
  );
};

export default ArticlesPage;
