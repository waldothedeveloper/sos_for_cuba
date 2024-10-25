import { NextRequest, NextResponse } from "next/server";

import { client } from "@/sanity/lib/client";
import { draftMode } from "next/headers";
import { token } from "@/sanity/lib/token";
import { validatePreviewUrl } from "@sanity/preview-url-secret";

const clientWithToken = client.withConfig({ token });

export async function GET(request: NextRequest) {
  if (!process.env.SANITY_API_READ_TOKEN) {
    return new Response("Missing environment variable SANITY_API_READ_TOKEN", {
      status: 500,
    });
  }

  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
