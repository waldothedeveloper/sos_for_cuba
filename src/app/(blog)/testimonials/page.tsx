// ./src/app/(blog)/page.tsx

import { POSTS_QUERY } from "@/sanity/lib/queries";
import { Posts } from "@/components/posts";
import { sanityFetch } from "@/sanity/lib/client";

export default async function Page() {
  const posts = await sanityFetch({
    query: POSTS_QUERY,
  });

  return <Posts posts={posts} />;
}
