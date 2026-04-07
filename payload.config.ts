import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { mcpPlugin } from "@payloadcms/plugin-mcp";
import path from "path";
import { fileURLToPath } from "url";

import { Media } from "./payload/collections/Media.ts";
import { HeroBlocks } from "./payload/collections/HeroBlocks.ts";
import { MenuItems } from "./payload/collections/MenuItems.ts";
import { MenuCategories } from "./payload/collections/MenuCategories.ts";
import { Jobs } from "./payload/collections/Jobs.ts";
import { Pages } from "./payload/collections/Pages.ts";
import { SiteSettings } from "./payload/globals/SiteSettings.ts";
import { Navigation } from "./payload/globals/Navigation.ts";
import { FooterContent } from "./payload/globals/FooterContent.ts";

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
