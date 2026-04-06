import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { mcpPlugin } from "@payloadcms/plugin-mcp";
import path from "path";
import { fileURLToPath } from "url";

import { Media } from "./payload/collections/Media";
import { HeroBlocks } from "./payload/collections/HeroBlocks";
import { MenuItems } from "./payload/collections/MenuItems";
import { MenuCategories } from "./payload/collections/MenuCategories";
import { Jobs } from "./payload/collections/Jobs";
import { Pages } from "./payload/collections/Pages";
import { SiteSettings } from "./payload/globals/SiteSettings";
import { Navigation } from "./payload/globals/Navigation";
import { FooterContent } from "./payload/globals/FooterContent";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-in-production",
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Nederlands', code: 'nl' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
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
    Pages,
    {
      slug: "users",
      auth: true,
      admin: { useAsTitle: "email" },
      fields: [],
    },
  ],
  globals: [SiteSettings, Navigation, FooterContent],
  db: postgresAdapter({
    push: true,
    pool: {
      connectionString:
        process.env.DATABASE_URL_UNPOOLED ||
        process.env.DATABASE_URL ||
        "postgresql://localhost:5432/netherlands_bagels",
    },
  }),
  plugins: [
    mcpPlugin({
      collections: {
        'hero-blocks': { enabled: true },
        'menu-items': { enabled: true },
        'menu-categories': { enabled: true },
        jobs: { enabled: true },
        media: { enabled: true },
        pages: { enabled: true },
        users: { enabled: false },
      },
      globals: {
        'site-settings': { enabled: true },
        'navigation': { enabled: true },
        'footer-content': { enabled: true },
      },
    }),
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
