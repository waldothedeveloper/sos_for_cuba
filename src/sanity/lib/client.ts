import "server-only";

import { createClient, QueryOptions, type QueryParams } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";
import { token } from "./token";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === "preview",
    studioUrl: "/studio",
  },
});

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 5, // default revalidation time in seconds
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  if (!token) {
    throw new Error("Missing environment variable SANITY_API_READ_TOKEN");
  }

  const queryOptions: QueryOptions = {};

  return client.fetch(query, params, {
    ...queryOptions,
    next: {
      revalidate,
      tags,
    },
  });
}
