"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";

import { defineConfig } from "sanity";
import { documentInternationalization } from "@sanity/document-internationalization";
import { presentationTool } from "sanity/presentation";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    ...schema,
    // Filter out the default template for new "post" and "category" type documents
    templates: (prev) =>
      prev.filter((template) => !["post", "category"].includes(template.id)),
  },
  plugins: [
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        { id: "es", title: "Spanish" },
        { id: "en", title: "English" },
      ],
      schemaTypes: ["post", "category"],
      languageField: `language`, // defauts to "language"
    }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
