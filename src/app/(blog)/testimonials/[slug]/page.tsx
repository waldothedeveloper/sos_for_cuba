import { POST_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/components/post";
import { QueryParams } from "next-sanity";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/client";

export default async function Page({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const postParams = await params;

  const post = await sanityFetch({
    query: POST_QUERY,
    params: postParams,
  });
  if (!post) {
    return notFound();
  }
  return <Post post={post} />;
}
