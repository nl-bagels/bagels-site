import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_announcements_type" AS ENUM('promo', 'news', 'event');

   CREATE TABLE "announcements" (
    "id" serial PRIMARY KEY NOT NULL,
    "type" "enum_announcements_type" DEFAULT 'news' NOT NULL,
    "is_active" boolean DEFAULT true,
    "published_at" timestamp(3) with time zone,
    "expires_at" timestamp(3) with time zone,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );

   CREATE TABLE "announcements_locales" (
    "title" varchar NOT NULL,
    "content" jsonb,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
   );

   CREATE TABLE "pages_blocks_announcements_block" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "max_items" numeric DEFAULT 3,
    "block_name" varchar
   );

   CREATE TABLE "pages_blocks_announcements_block_locales" (
    "heading" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
   );

   CREATE TABLE "_pages_v_blocks_announcements_block" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "max_items" numeric DEFAULT 3,
    "_uuid" varchar,
    "block_name" varchar
   );

   CREATE TABLE "_pages_v_blocks_announcements_block_locales" (
    "heading" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
   );

   ALTER TABLE "site_settings" ADD COLUMN "order_url" varchar;

   ALTER TABLE "announcements_locales" ADD CONSTRAINT "announcements_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
   ALTER TABLE "pages_blocks_announcements_block" ADD CONSTRAINT "pages_blocks_announcements_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
   ALTER TABLE "pages_blocks_announcements_block_locales" ADD CONSTRAINT "pages_blocks_announcements_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_announcements_block"("id") ON DELETE cascade ON UPDATE no action;
   ALTER TABLE "_pages_v_blocks_announcements_block" ADD CONSTRAINT "_pages_v_blocks_announcements_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
   ALTER TABLE "_pages_v_blocks_announcements_block_locales" ADD CONSTRAINT "_pages_v_blocks_announcements_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_announcements_block"("id") ON DELETE cascade ON UPDATE no action;

   ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "announcements_id" integer;
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_announcements_fk" FOREIGN KEY ("announcements_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;

   CREATE INDEX "announcements_updated_at_idx" ON "announcements" USING btree ("updated_at");
   CREATE INDEX "announcements_created_at_idx" ON "announcements" USING btree ("created_at");
   CREATE UNIQUE INDEX "announcements_locales_locale_parent_id_unique" ON "announcements_locales" USING btree ("_locale","_parent_id");

   CREATE INDEX "pages_blocks_announcements_block_order_idx" ON "pages_blocks_announcements_block" USING btree ("_order");
   CREATE INDEX "pages_blocks_announcements_block_parent_id_idx" ON "pages_blocks_announcements_block" USING btree ("_parent_id");
   CREATE INDEX "pages_blocks_announcements_block_path_idx" ON "pages_blocks_announcements_block" USING btree ("_path");
   CREATE UNIQUE INDEX "pages_blocks_announcements_block_locales_locale_parent_id_uni" ON "pages_blocks_announcements_block_locales" USING btree ("_locale","_parent_id");

   CREATE INDEX "_pages_v_blocks_announcements_block_order_idx" ON "_pages_v_blocks_announcements_block" USING btree ("_order");
   CREATE INDEX "_pages_v_blocks_announcements_block_parent_id_idx" ON "_pages_v_blocks_announcements_block" USING btree ("_parent_id");
   CREATE INDEX "_pages_v_blocks_announcements_block_path_idx" ON "_pages_v_blocks_announcements_block" USING btree ("_path");
   CREATE UNIQUE INDEX "_pages_v_blocks_announcements_block_locales_locale_parent_id_" ON "_pages_v_blocks_announcements_block_locales" USING btree ("_locale","_parent_id");

   CREATE INDEX "payload_locked_documents_rels_announcements_id_idx" ON "payload_locked_documents_rels" USING btree ("announcements_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_announcements_fk";
   ALTER TABLE "announcements_locales" DROP CONSTRAINT "announcements_locales_parent_id_fk";
   ALTER TABLE "pages_blocks_announcements_block" DROP CONSTRAINT "pages_blocks_announcements_block_parent_id_fk";
   ALTER TABLE "pages_blocks_announcements_block_locales" DROP CONSTRAINT "pages_blocks_announcements_block_locales_parent_id_fk";
   ALTER TABLE "_pages_v_blocks_announcements_block" DROP CONSTRAINT "_pages_v_blocks_announcements_block_parent_id_fk";
   ALTER TABLE "_pages_v_blocks_announcements_block_locales" DROP CONSTRAINT "_pages_v_blocks_announcements_block_locales_parent_id_fk";

   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "announcements_id";
   ALTER TABLE "site_settings" DROP COLUMN "order_url";

   DROP TABLE "announcements_locales";
   DROP TABLE "announcements";
   DROP TABLE "pages_blocks_announcements_block_locales";
   DROP TABLE "pages_blocks_announcements_block";
   DROP TABLE "_pages_v_blocks_announcements_block_locales";
   DROP TABLE "_pages_v_blocks_announcements_block";

   DROP TYPE "public"."enum_announcements_type";
  `)
}
