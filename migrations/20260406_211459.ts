import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'nl');
  CREATE TYPE "public"."enum_hero_blocks_text_color" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_menu_items_tags" AS ENUM('vegan', 'new', 'popular', 'seasonal', 'gluten_free');
  CREATE TYPE "public"."enum_menu_items_category" AS ENUM('savory', 'sweet', 'loose_bagels', 'drinks', 'catering');
  CREATE TYPE "public"."enum_menu_categories_slug" AS ENUM('savory', 'sweet', 'loose_bagels', 'drinks', 'catering');
  CREATE TYPE "public"."enum_pages_blocks_hero_block_text_color" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_block_background" AS ENUM('white', 'gray', 'black');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_block_max_width" AS ENUM('narrow', 'default', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_cta_block_buttons_style" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_menu_page_header_block_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_block_text_color" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_block_background" AS ENUM('white', 'gray', 'black');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_block_max_width" AS ENUM('narrow', 'default', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_block_buttons_style" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_menu_page_header_block_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'nl');
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "hero_blocks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"background_image_id" integer NOT NULL,
  	"background_video" varchar,
  	"text_color" "enum_hero_blocks_text_color" DEFAULT 'light',
  	"is_active" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "menu_items_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_menu_items_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "menu_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"price" numeric NOT NULL,
  	"category" "enum_menu_items_category" NOT NULL,
  	"image_id" integer,
  	"available" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "menu_items_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"subcategory" varchar,
  	"notes" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "menu_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" "enum_menu_categories_slug" NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"visible" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "menu_categories_locales" (
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"is_open" boolean DEFAULT true,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_url" varchar,
  	"background_image_id" integer,
  	"background_video" varchar,
  	"text_color" "enum_pages_blocks_hero_block_text_color" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_block_usps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "pages_blocks_about_block_usps_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_block_locales" (
  	"heading" varchar,
  	"p1" varchar,
  	"p2" varchar,
  	"photo_soon_label" varchar DEFAULT 'Photo coming soon',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_menu_preview_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_menu_preview_block_locales" (
  	"heading" varchar,
  	"subtitle" varchar,
  	"view_full_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_block_packages_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_block_packages_items_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_block_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_block_packages_locales" (
  	"name" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_email" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_catering_block_locales" (
  	"heading" varchar,
  	"subtitle" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_location_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"map_embed_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_location_block_locales" (
  	"heading" varchar,
  	"address_label" varchar,
  	"hours_label" varchar,
  	"contact_label" varchar,
  	"whatsapp_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_jobs_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_jobs_list_block_locales" (
  	"heading" varchar,
  	"subtitle" varchar,
  	"apply_now_label" varchar,
  	"open_application_label" varchar,
  	"send_c_v_label" varchar,
  	"application_subject_prefix" varchar,
  	"open_application_subject" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_rich_text_block_background" DEFAULT 'white',
  	"max_width" "enum_pages_blocks_rich_text_block_max_width" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_block_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_block_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"style" "enum_pages_blocks_cta_block_buttons_style" DEFAULT 'primary',
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_cta_block_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_block_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_menu_page_header_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_menu_page_header_block_background" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_menu_page_header_block_locales" (
  	"heading" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_allergies_note_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_allergies_note_block_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"status" "enum_pages_status" DEFAULT 'draft',
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_url" varchar,
  	"background_image_id" integer,
  	"background_video" varchar,
  	"text_color" "enum__pages_v_blocks_hero_block_text_color" DEFAULT 'light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_about_block_usps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_block_usps_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_about_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_block_locales" (
  	"heading" varchar,
  	"p1" varchar,
  	"p2" varchar,
  	"photo_soon_label" varchar DEFAULT 'Photo coming soon',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_menu_preview_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_menu_preview_block_locales" (
  	"heading" varchar,
  	"subtitle" varchar,
  	"view_full_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_block_packages_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_block_packages_items_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_block_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_block_packages_locales" (
  	"name" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_email" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_block_locales" (
  	"heading" varchar,
  	"subtitle" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_location_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"map_embed_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_location_block_locales" (
  	"heading" varchar,
  	"address_label" varchar,
  	"hours_label" varchar,
  	"contact_label" varchar,
  	"whatsapp_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_jobs_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_jobs_list_block_locales" (
  	"heading" varchar,
  	"subtitle" varchar,
  	"apply_now_label" varchar,
  	"open_application_label" varchar,
  	"send_c_v_label" varchar,
  	"application_subject_prefix" varchar,
  	"open_application_subject" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_rich_text_block_background" DEFAULT 'white',
  	"max_width" "enum__pages_v_blocks_rich_text_block_max_width" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_block_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_block_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"style" "enum__pages_v_blocks_cta_block_buttons_style" DEFAULT 'primary',
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_block_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_block_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_menu_page_header_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_menu_page_header_block_background" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_menu_page_header_block_locales" (
  	"heading" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_allergies_note_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_allergies_note_block_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"version_seo_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_mcp_api_keys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"hero_blocks_find" boolean DEFAULT false,
  	"hero_blocks_create" boolean DEFAULT false,
  	"hero_blocks_update" boolean DEFAULT false,
  	"hero_blocks_delete" boolean DEFAULT false,
  	"menu_items_find" boolean DEFAULT false,
  	"menu_items_create" boolean DEFAULT false,
  	"menu_items_update" boolean DEFAULT false,
  	"menu_items_delete" boolean DEFAULT false,
  	"menu_categories_find" boolean DEFAULT false,
  	"menu_categories_create" boolean DEFAULT false,
  	"menu_categories_update" boolean DEFAULT false,
  	"menu_categories_delete" boolean DEFAULT false,
  	"jobs_find" boolean DEFAULT false,
  	"jobs_create" boolean DEFAULT false,
  	"jobs_update" boolean DEFAULT false,
  	"jobs_delete" boolean DEFAULT false,
  	"media_find" boolean DEFAULT false,
  	"media_create" boolean DEFAULT false,
  	"media_update" boolean DEFAULT false,
  	"media_delete" boolean DEFAULT false,
  	"pages_find" boolean DEFAULT false,
  	"pages_create" boolean DEFAULT false,
  	"pages_update" boolean DEFAULT false,
  	"pages_delete" boolean DEFAULT false,
  	"site_settings_find" boolean DEFAULT false,
  	"site_settings_update" boolean DEFAULT false,
  	"navigation_find" boolean DEFAULT false,
  	"navigation_update" boolean DEFAULT false,
  	"footer_content_find" boolean DEFAULT false,
  	"footer_content_update" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"hero_blocks_id" integer,
  	"menu_items_id" integer,
  	"menu_categories_id" integer,
  	"jobs_id" integer,
  	"pages_id" integer,
  	"users_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hours" varchar
  );
  
  CREATE TABLE "site_settings_opening_hours_locales" (
  	"day_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"announcement_bar_enabled" boolean DEFAULT false,
  	"announcement_bar_text" varchar,
  	"announcement_bar_link_text" varchar,
  	"announcement_bar_link_url" varchar,
  	"contact_email" varchar,
  	"phone" varchar,
  	"whatsapp" varchar,
  	"instagram_url" varchar,
  	"facebook_url" varchar,
  	"address" varchar,
  	"reservation_url" varchar,
  	"site_metadata_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"site_metadata_title" varchar,
  	"site_metadata_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "navigation_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_nav_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_locales" (
  	"reserve_label" varchar,
  	"open_menu_label" varchar,
  	"close_menu_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_content_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "footer_content_bottom_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_content_locales" (
  	"tagline" varchar,
  	"since" varchar,
  	"contact_label" varchar,
  	"follow_us_label" varchar,
  	"copyright_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "hero_blocks" ADD CONSTRAINT "hero_blocks_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items_tags" ADD CONSTRAINT "menu_items_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items_locales" ADD CONSTRAINT "menu_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_categories_locales" ADD CONSTRAINT "menu_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_block" ADD CONSTRAINT "pages_blocks_hero_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_block" ADD CONSTRAINT "pages_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_block_locales" ADD CONSTRAINT "pages_blocks_hero_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_block_usps" ADD CONSTRAINT "pages_blocks_about_block_usps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_block_usps_locales" ADD CONSTRAINT "pages_blocks_about_block_usps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_block_usps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_block" ADD CONSTRAINT "pages_blocks_about_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_block" ADD CONSTRAINT "pages_blocks_about_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_block_locales" ADD CONSTRAINT "pages_blocks_about_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_preview_block" ADD CONSTRAINT "pages_blocks_menu_preview_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_preview_block_locales" ADD CONSTRAINT "pages_blocks_menu_preview_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_menu_preview_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_block_packages_items" ADD CONSTRAINT "pages_blocks_catering_block_packages_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_block_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_block_packages_items_locales" ADD CONSTRAINT "pages_blocks_catering_block_packages_items_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_block_packages_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_block_packages" ADD CONSTRAINT "pages_blocks_catering_block_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_block_packages_locales" ADD CONSTRAINT "pages_blocks_catering_block_packages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_block_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_block" ADD CONSTRAINT "pages_blocks_catering_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_block_locales" ADD CONSTRAINT "pages_blocks_catering_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_location_block" ADD CONSTRAINT "pages_blocks_location_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_location_block_locales" ADD CONSTRAINT "pages_blocks_location_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_location_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_jobs_list_block" ADD CONSTRAINT "pages_blocks_jobs_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_jobs_list_block_locales" ADD CONSTRAINT "pages_blocks_jobs_list_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_jobs_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_block" ADD CONSTRAINT "pages_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_block_locales" ADD CONSTRAINT "pages_blocks_rich_text_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block_buttons" ADD CONSTRAINT "pages_blocks_cta_block_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block_buttons_locales" ADD CONSTRAINT "pages_blocks_cta_block_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_block_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block" ADD CONSTRAINT "pages_blocks_cta_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block_locales" ADD CONSTRAINT "pages_blocks_cta_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_page_header_block" ADD CONSTRAINT "pages_blocks_menu_page_header_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_page_header_block_locales" ADD CONSTRAINT "pages_blocks_menu_page_header_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_menu_page_header_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_allergies_note_block" ADD CONSTRAINT "pages_blocks_allergies_note_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_allergies_note_block_locales" ADD CONSTRAINT "pages_blocks_allergies_note_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_allergies_note_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_block" ADD CONSTRAINT "_pages_v_blocks_hero_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_block" ADD CONSTRAINT "_pages_v_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_block_locales" ADD CONSTRAINT "_pages_v_blocks_hero_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_block_usps" ADD CONSTRAINT "_pages_v_blocks_about_block_usps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_block_usps_locales" ADD CONSTRAINT "_pages_v_blocks_about_block_usps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_block_usps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_block" ADD CONSTRAINT "_pages_v_blocks_about_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_block" ADD CONSTRAINT "_pages_v_blocks_about_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_block_locales" ADD CONSTRAINT "_pages_v_blocks_about_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_preview_block" ADD CONSTRAINT "_pages_v_blocks_menu_preview_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_preview_block_locales" ADD CONSTRAINT "_pages_v_blocks_menu_preview_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_menu_preview_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_block_packages_items" ADD CONSTRAINT "_pages_v_blocks_catering_block_packages_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_block_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_block_packages_items_locales" ADD CONSTRAINT "_pages_v_blocks_catering_block_packages_items_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_block_packages_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_block_packages" ADD CONSTRAINT "_pages_v_blocks_catering_block_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_block_packages_locales" ADD CONSTRAINT "_pages_v_blocks_catering_block_packages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_block_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_block" ADD CONSTRAINT "_pages_v_blocks_catering_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_block_locales" ADD CONSTRAINT "_pages_v_blocks_catering_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_location_block" ADD CONSTRAINT "_pages_v_blocks_location_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_location_block_locales" ADD CONSTRAINT "_pages_v_blocks_location_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_location_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_jobs_list_block" ADD CONSTRAINT "_pages_v_blocks_jobs_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_jobs_list_block_locales" ADD CONSTRAINT "_pages_v_blocks_jobs_list_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_jobs_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_block" ADD CONSTRAINT "_pages_v_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_block_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_block_buttons" ADD CONSTRAINT "_pages_v_blocks_cta_block_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_block_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_cta_block_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_block_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_block" ADD CONSTRAINT "_pages_v_blocks_cta_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_block_locales" ADD CONSTRAINT "_pages_v_blocks_cta_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_page_header_block" ADD CONSTRAINT "_pages_v_blocks_menu_page_header_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_page_header_block_locales" ADD CONSTRAINT "_pages_v_blocks_menu_page_header_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_menu_page_header_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_allergies_note_block" ADD CONSTRAINT "_pages_v_blocks_allergies_note_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_allergies_note_block_locales" ADD CONSTRAINT "_pages_v_blocks_allergies_note_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_allergies_note_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hero_blocks_fk" FOREIGN KEY ("hero_blocks_id") REFERENCES "public"."hero_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_categories_fk" FOREIGN KEY ("menu_categories_id") REFERENCES "public"."menu_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_opening_hours" ADD CONSTRAINT "site_settings_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_opening_hours_locales" ADD CONSTRAINT "site_settings_opening_hours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_opening_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_site_metadata_og_image_id_media_id_fk" FOREIGN KEY ("site_metadata_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_nav_links" ADD CONSTRAINT "navigation_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_nav_links_locales" ADD CONSTRAINT "navigation_nav_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_locales" ADD CONSTRAINT "navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_content_bottom_links" ADD CONSTRAINT "footer_content_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_content_bottom_links_locales" ADD CONSTRAINT "footer_content_bottom_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_content_bottom_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_content_locales" ADD CONSTRAINT "footer_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "hero_blocks_background_image_idx" ON "hero_blocks" USING btree ("background_image_id");
  CREATE INDEX "hero_blocks_updated_at_idx" ON "hero_blocks" USING btree ("updated_at");
  CREATE INDEX "hero_blocks_created_at_idx" ON "hero_blocks" USING btree ("created_at");
  CREATE INDEX "menu_items_tags_order_idx" ON "menu_items_tags" USING btree ("order");
  CREATE INDEX "menu_items_tags_parent_idx" ON "menu_items_tags" USING btree ("parent_id");
  CREATE INDEX "menu_items_image_idx" ON "menu_items" USING btree ("image_id");
  CREATE INDEX "menu_items_updated_at_idx" ON "menu_items" USING btree ("updated_at");
  CREATE INDEX "menu_items_created_at_idx" ON "menu_items" USING btree ("created_at");
  CREATE UNIQUE INDEX "menu_items_locales_locale_parent_id_unique" ON "menu_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "menu_categories_updated_at_idx" ON "menu_categories" USING btree ("updated_at");
  CREATE INDEX "menu_categories_created_at_idx" ON "menu_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "menu_categories_locales_locale_parent_id_unique" ON "menu_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE INDEX "pages_blocks_hero_block_order_idx" ON "pages_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_block_parent_id_idx" ON "pages_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_block_path_idx" ON "pages_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_block_background_image_idx" ON "pages_blocks_hero_block" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_block_locales_locale_parent_id_unique" ON "pages_blocks_hero_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_block_usps_order_idx" ON "pages_blocks_about_block_usps" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_block_usps_parent_id_idx" ON "pages_blocks_about_block_usps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_block_usps_locales_locale_parent_id_uniqu" ON "pages_blocks_about_block_usps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_block_order_idx" ON "pages_blocks_about_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_block_parent_id_idx" ON "pages_blocks_about_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_block_path_idx" ON "pages_blocks_about_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_block_image_idx" ON "pages_blocks_about_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_about_block_locales_locale_parent_id_unique" ON "pages_blocks_about_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_menu_preview_block_order_idx" ON "pages_blocks_menu_preview_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_menu_preview_block_parent_id_idx" ON "pages_blocks_menu_preview_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_preview_block_path_idx" ON "pages_blocks_menu_preview_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_menu_preview_block_locales_locale_parent_id_uni" ON "pages_blocks_menu_preview_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_block_packages_items_order_idx" ON "pages_blocks_catering_block_packages_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_block_packages_items_parent_id_idx" ON "pages_blocks_catering_block_packages_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_catering_block_packages_items_locales_locale_pa" ON "pages_blocks_catering_block_packages_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_block_packages_order_idx" ON "pages_blocks_catering_block_packages" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_block_packages_parent_id_idx" ON "pages_blocks_catering_block_packages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_catering_block_packages_locales_locale_parent_i" ON "pages_blocks_catering_block_packages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_block_order_idx" ON "pages_blocks_catering_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_block_parent_id_idx" ON "pages_blocks_catering_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_block_path_idx" ON "pages_blocks_catering_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_catering_block_locales_locale_parent_id_unique" ON "pages_blocks_catering_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_location_block_order_idx" ON "pages_blocks_location_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_location_block_parent_id_idx" ON "pages_blocks_location_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_location_block_path_idx" ON "pages_blocks_location_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_location_block_locales_locale_parent_id_unique" ON "pages_blocks_location_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_jobs_list_block_order_idx" ON "pages_blocks_jobs_list_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_jobs_list_block_parent_id_idx" ON "pages_blocks_jobs_list_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_jobs_list_block_path_idx" ON "pages_blocks_jobs_list_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_jobs_list_block_locales_locale_parent_id_unique" ON "pages_blocks_jobs_list_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_block_order_idx" ON "pages_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_block_parent_id_idx" ON "pages_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_block_path_idx" ON "pages_blocks_rich_text_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_block_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_block_buttons_order_idx" ON "pages_blocks_cta_block_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_block_buttons_parent_id_idx" ON "pages_blocks_cta_block_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_block_buttons_locales_locale_parent_id_uniq" ON "pages_blocks_cta_block_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_block_order_idx" ON "pages_blocks_cta_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_block_parent_id_idx" ON "pages_blocks_cta_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_block_path_idx" ON "pages_blocks_cta_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cta_block_locales_locale_parent_id_unique" ON "pages_blocks_cta_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_menu_page_header_block_order_idx" ON "pages_blocks_menu_page_header_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_menu_page_header_block_parent_id_idx" ON "pages_blocks_menu_page_header_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_page_header_block_path_idx" ON "pages_blocks_menu_page_header_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_menu_page_header_block_locales_locale_parent_id" ON "pages_blocks_menu_page_header_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_allergies_note_block_order_idx" ON "pages_blocks_allergies_note_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_allergies_note_block_parent_id_idx" ON "pages_blocks_allergies_note_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_allergies_note_block_path_idx" ON "pages_blocks_allergies_note_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_allergies_note_block_locales_locale_parent_id_u" ON "pages_blocks_allergies_note_block_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages" USING btree ("seo_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_block_order_idx" ON "_pages_v_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_block_parent_id_idx" ON "_pages_v_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_block_path_idx" ON "_pages_v_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_block_background_image_idx" ON "_pages_v_blocks_hero_block" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_about_block_usps_order_idx" ON "_pages_v_blocks_about_block_usps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_block_usps_parent_id_idx" ON "_pages_v_blocks_about_block_usps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_about_block_usps_locales_locale_parent_id_un" ON "_pages_v_blocks_about_block_usps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_about_block_order_idx" ON "_pages_v_blocks_about_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_block_parent_id_idx" ON "_pages_v_blocks_about_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_block_path_idx" ON "_pages_v_blocks_about_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_block_image_idx" ON "_pages_v_blocks_about_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_about_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_about_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_preview_block_order_idx" ON "_pages_v_blocks_menu_preview_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_menu_preview_block_parent_id_idx" ON "_pages_v_blocks_menu_preview_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_preview_block_path_idx" ON "_pages_v_blocks_menu_preview_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_menu_preview_block_locales_locale_parent_id_" ON "_pages_v_blocks_menu_preview_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_block_packages_items_order_idx" ON "_pages_v_blocks_catering_block_packages_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_block_packages_items_parent_id_idx" ON "_pages_v_blocks_catering_block_packages_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_block_packages_items_locales_locale" ON "_pages_v_blocks_catering_block_packages_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_block_packages_order_idx" ON "_pages_v_blocks_catering_block_packages" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_block_packages_parent_id_idx" ON "_pages_v_blocks_catering_block_packages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_block_packages_locales_locale_paren" ON "_pages_v_blocks_catering_block_packages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_block_order_idx" ON "_pages_v_blocks_catering_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_block_parent_id_idx" ON "_pages_v_blocks_catering_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_block_path_idx" ON "_pages_v_blocks_catering_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_block_locales_locale_parent_id_uniq" ON "_pages_v_blocks_catering_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_location_block_order_idx" ON "_pages_v_blocks_location_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_location_block_parent_id_idx" ON "_pages_v_blocks_location_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_location_block_path_idx" ON "_pages_v_blocks_location_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_location_block_locales_locale_parent_id_uniq" ON "_pages_v_blocks_location_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_jobs_list_block_order_idx" ON "_pages_v_blocks_jobs_list_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_jobs_list_block_parent_id_idx" ON "_pages_v_blocks_jobs_list_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_jobs_list_block_path_idx" ON "_pages_v_blocks_jobs_list_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_jobs_list_block_locales_locale_parent_id_uni" ON "_pages_v_blocks_jobs_list_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_block_order_idx" ON "_pages_v_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_block_parent_id_idx" ON "_pages_v_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_block_path_idx" ON "_pages_v_blocks_rich_text_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_text_block_locales_locale_parent_id_uni" ON "_pages_v_blocks_rich_text_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_block_buttons_order_idx" ON "_pages_v_blocks_cta_block_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_block_buttons_parent_id_idx" ON "_pages_v_blocks_cta_block_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_block_buttons_locales_locale_parent_id_u" ON "_pages_v_blocks_cta_block_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_block_order_idx" ON "_pages_v_blocks_cta_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_block_parent_id_idx" ON "_pages_v_blocks_cta_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_block_path_idx" ON "_pages_v_blocks_cta_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_page_header_block_order_idx" ON "_pages_v_blocks_menu_page_header_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_menu_page_header_block_parent_id_idx" ON "_pages_v_blocks_menu_page_header_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_page_header_block_path_idx" ON "_pages_v_blocks_menu_page_header_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_menu_page_header_block_locales_locale_parent" ON "_pages_v_blocks_menu_page_header_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_allergies_note_block_order_idx" ON "_pages_v_blocks_allergies_note_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_allergies_note_block_parent_id_idx" ON "_pages_v_blocks_allergies_note_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_allergies_note_block_path_idx" ON "_pages_v_blocks_allergies_note_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_allergies_note_block_locales_locale_parent_i" ON "_pages_v_blocks_allergies_note_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_image_idx" ON "_pages_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "payload_mcp_api_keys_user_idx" ON "payload_mcp_api_keys" USING btree ("user_id");
  CREATE INDEX "payload_mcp_api_keys_updated_at_idx" ON "payload_mcp_api_keys" USING btree ("updated_at");
  CREATE INDEX "payload_mcp_api_keys_created_at_idx" ON "payload_mcp_api_keys" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_hero_blocks_id_idx" ON "payload_locked_documents_rels" USING btree ("hero_blocks_id");
  CREATE INDEX "payload_locked_documents_rels_menu_items_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_items_id");
  CREATE INDEX "payload_locked_documents_rels_menu_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_categories_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx" ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_opening_hours_order_idx" ON "site_settings_opening_hours" USING btree ("_order");
  CREATE INDEX "site_settings_opening_hours_parent_id_idx" ON "site_settings_opening_hours" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_opening_hours_locales_locale_parent_id_unique" ON "site_settings_opening_hours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_site_metadata_site_metadata_og_image_idx" ON "site_settings" USING btree ("site_metadata_og_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_nav_links_order_idx" ON "navigation_nav_links" USING btree ("_order");
  CREATE INDEX "navigation_nav_links_parent_id_idx" ON "navigation_nav_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_nav_links_locales_locale_parent_id_unique" ON "navigation_nav_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "navigation_locales_locale_parent_id_unique" ON "navigation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_content_bottom_links_order_idx" ON "footer_content_bottom_links" USING btree ("_order");
  CREATE INDEX "footer_content_bottom_links_parent_id_idx" ON "footer_content_bottom_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_content_bottom_links_locales_locale_parent_id_unique" ON "footer_content_bottom_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_content_locales_locale_parent_id_unique" ON "footer_content_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media" CASCADE;
  DROP TABLE "hero_blocks" CASCADE;
  DROP TABLE "menu_items_tags" CASCADE;
  DROP TABLE "menu_items" CASCADE;
  DROP TABLE "menu_items_locales" CASCADE;
  DROP TABLE "menu_categories" CASCADE;
  DROP TABLE "menu_categories_locales" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "pages_blocks_hero_block" CASCADE;
  DROP TABLE "pages_blocks_hero_block_locales" CASCADE;
  DROP TABLE "pages_blocks_about_block_usps" CASCADE;
  DROP TABLE "pages_blocks_about_block_usps_locales" CASCADE;
  DROP TABLE "pages_blocks_about_block" CASCADE;
  DROP TABLE "pages_blocks_about_block_locales" CASCADE;
  DROP TABLE "pages_blocks_menu_preview_block" CASCADE;
  DROP TABLE "pages_blocks_menu_preview_block_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_block_packages_items" CASCADE;
  DROP TABLE "pages_blocks_catering_block_packages_items_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_block_packages" CASCADE;
  DROP TABLE "pages_blocks_catering_block_packages_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_block" CASCADE;
  DROP TABLE "pages_blocks_catering_block_locales" CASCADE;
  DROP TABLE "pages_blocks_location_block" CASCADE;
  DROP TABLE "pages_blocks_location_block_locales" CASCADE;
  DROP TABLE "pages_blocks_jobs_list_block" CASCADE;
  DROP TABLE "pages_blocks_jobs_list_block_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text_block" CASCADE;
  DROP TABLE "pages_blocks_rich_text_block_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_block_buttons" CASCADE;
  DROP TABLE "pages_blocks_cta_block_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_block" CASCADE;
  DROP TABLE "pages_blocks_cta_block_locales" CASCADE;
  DROP TABLE "pages_blocks_menu_page_header_block" CASCADE;
  DROP TABLE "pages_blocks_menu_page_header_block_locales" CASCADE;
  DROP TABLE "pages_blocks_allergies_note_block" CASCADE;
  DROP TABLE "pages_blocks_allergies_note_block_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_block" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_about_block_usps" CASCADE;
  DROP TABLE "_pages_v_blocks_about_block_usps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_about_block" CASCADE;
  DROP TABLE "_pages_v_blocks_about_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_preview_block" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_preview_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_block_packages_items" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_block_packages_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_block_packages" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_block_packages_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_block" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_location_block" CASCADE;
  DROP TABLE "_pages_v_blocks_location_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_jobs_list_block" CASCADE;
  DROP TABLE "_pages_v_blocks_jobs_list_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_block" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_block_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_block_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_block" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_page_header_block" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_page_header_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_allergies_note_block" CASCADE;
  DROP TABLE "_pages_v_blocks_allergies_note_block_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_mcp_api_keys" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_opening_hours" CASCADE;
  DROP TABLE "site_settings_opening_hours_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "navigation_nav_links" CASCADE;
  DROP TABLE "navigation_nav_links_locales" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "navigation_locales" CASCADE;
  DROP TABLE "footer_content_bottom_links" CASCADE;
  DROP TABLE "footer_content_bottom_links_locales" CASCADE;
  DROP TABLE "footer_content" CASCADE;
  DROP TABLE "footer_content_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_hero_blocks_text_color";
  DROP TYPE "public"."enum_menu_items_tags";
  DROP TYPE "public"."enum_menu_items_category";
  DROP TYPE "public"."enum_menu_categories_slug";
  DROP TYPE "public"."enum_pages_blocks_hero_block_text_color";
  DROP TYPE "public"."enum_pages_blocks_rich_text_block_background";
  DROP TYPE "public"."enum_pages_blocks_rich_text_block_max_width";
  DROP TYPE "public"."enum_pages_blocks_cta_block_buttons_style";
  DROP TYPE "public"."enum_pages_blocks_menu_page_header_block_background";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_block_text_color";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_block_background";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_block_max_width";
  DROP TYPE "public"."enum__pages_v_blocks_cta_block_buttons_style";
  DROP TYPE "public"."enum__pages_v_blocks_menu_page_header_block_background";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";`)
}
