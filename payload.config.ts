import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { fileURLToPath } from "url";

import { Media } from "./payload/collections/Media";
import { HeroBlocks } from "./payload/collections/HeroBlocks";
import { MenuItems } from "./payload/collections/MenuItems";
import { MenuCategories } from "./payload/collections/MenuCategories";
import { Jobs } from "./payload/collections/Jobs";
import { SiteSettings } from "./payload/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-in-production",
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor({}),
  collections: [
    Media,
    HeroBlocks,
    MenuItems,
    MenuCategories,
    Jobs,
    {
      slug: "users",
      auth: true,
      admin: {
        useAsTitle: "email",
      },
      fields: [],
    },
  ],
  globals: [SiteSettings],
  db: postgresAdapter({
    pool: {
      // Use unpooled connection: Payload manages its own pool and needs session-level
      // features for migrations. The pooled URL (pgBouncer) uses transaction mode
      // which breaks prepared statements and DDL.
      connectionString:
        process.env.DATABASE_URL_UNPOOLED ||
        process.env.DATABASE_URL ||
        "postgresql://localhost:5432/netherlands_bagels",
    },
  }),
  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  graphQL: {
    disable: false,
  },
});
