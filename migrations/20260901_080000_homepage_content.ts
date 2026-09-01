import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "homepage_content" (
      "id" serial PRIMARY KEY NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE "homepage_content_marquee_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL
    );

    CREATE TABLE "homepage_content_marquee_items_locales" (
      "text" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE "homepage_content_catering_packages" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL
    );

    CREATE TABLE "homepage_content_catering_packages_locales" (
      "name" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE "homepage_content_catering_packages_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL
    );

    CREATE TABLE "homepage_content_catering_packages_items_locales" (
      "item" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE "homepage_content_location_opening_hours" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL
    );

    CREATE TABLE "homepage_content_location_opening_hours_locales" (
      "day" varchar,
      "hours" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE "homepage_content_locales" (
      "hero_title" varchar,
      "hero_subtitle" varchar,
      "hero_cta_label" varchar,
      "menu_highlight_heading" varchar,
      "menu_highlight_subtitle" varchar,
      "menu_highlight_cta_label" varchar,
      "about_heading" varchar,
      "about_paragraph_one" varchar,
      "about_paragraph_two" varchar,
      "menu_preview_heading" varchar,
      "menu_preview_subtitle" varchar,
      "menu_preview_view_full_label" varchar,
      "catering_heading" varchar,
      "catering_tagline" varchar,
      "catering_cta_label" varchar,
      "catering_email_subject" varchar,
      "catering_addons" varchar,
      "catering_order_note" varchar,
      "catering_order_contact" varchar,
      "catering_delivery_heading" varchar,
      "catering_delivery_pickup" varchar,
      "catering_delivery_local" varchar,
      "catering_delivery_n_l" varchar,
      "catering_price_note" varchar,
      "catering_b2b_note" varchar,
      "location_heading" varchar,
      "location_address_label" varchar,
      "location_hours_label" varchar,
      "location_contact_label" varchar,
      "location_whatsapp_label" varchar,
      "jobs_heading" varchar,
      "jobs_subtitle" varchar,
      "jobs_apply_now_label" varchar,
      "jobs_open_application_label" varchar,
      "jobs_send_c_v_label" varchar,
      "jobs_application_subject_prefix" varchar,
      "jobs_open_application_subject" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    ALTER TABLE "homepage_content_marquee_items"
      ADD CONSTRAINT "homepage_content_marquee_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "homepage_content_marquee_items_locales"
      ADD CONSTRAINT "homepage_content_marquee_items_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content_marquee_items"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "homepage_content_catering_packages"
      ADD CONSTRAINT "homepage_content_catering_packages_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "homepage_content_catering_packages_locales"
      ADD CONSTRAINT "homepage_content_catering_packages_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content_catering_packages"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "homepage_content_catering_packages_items"
      ADD CONSTRAINT "homepage_content_catering_packages_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content_catering_packages"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "homepage_content_catering_packages_items_locales"
      ADD CONSTRAINT "homepage_content_catering_packages_items_locales_parent_i_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content_catering_packages_items"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "homepage_content_location_opening_hours"
      ADD CONSTRAINT "homepage_content_location_opening_hours_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "homepage_content_location_opening_hours_locales"
      ADD CONSTRAINT "homepage_content_location_opening_hours_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content_location_opening_hours"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "homepage_content_locales"
      ADD CONSTRAINT "homepage_content_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "homepage_content_marquee_items_order_idx"
      ON "homepage_content_marquee_items" USING btree ("_order");
    CREATE INDEX "homepage_content_marquee_items_parent_id_idx"
      ON "homepage_content_marquee_items" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "homepage_content_marquee_items_locales_locale_parent_id_uniq"
      ON "homepage_content_marquee_items_locales" USING btree ("_locale", "_parent_id");
    CREATE INDEX "homepage_content_catering_packages_order_idx"
      ON "homepage_content_catering_packages" USING btree ("_order");
    CREATE INDEX "homepage_content_catering_packages_parent_id_idx"
      ON "homepage_content_catering_packages" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "homepage_content_catering_packages_locales_locale_parent_id_"
      ON "homepage_content_catering_packages_locales" USING btree ("_locale", "_parent_id");
    CREATE INDEX "homepage_content_catering_packages_items_order_idx"
      ON "homepage_content_catering_packages_items" USING btree ("_order");
    CREATE INDEX "homepage_content_catering_packages_items_parent_id_idx"
      ON "homepage_content_catering_packages_items" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "homepage_content_catering_packages_items_locales_locale_pare"
      ON "homepage_content_catering_packages_items_locales" USING btree ("_locale", "_parent_id");
    CREATE INDEX "homepage_content_location_opening_hours_order_idx"
      ON "homepage_content_location_opening_hours" USING btree ("_order");
    CREATE INDEX "homepage_content_location_opening_hours_parent_id_idx"
      ON "homepage_content_location_opening_hours" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "homepage_content_location_opening_hours_locales_locale_paren"
      ON "homepage_content_location_opening_hours_locales" USING btree ("_locale", "_parent_id");
    CREATE UNIQUE INDEX "homepage_content_locales_locale_parent_id_unique"
      ON "homepage_content_locales" USING btree ("_locale", "_parent_id");

    INSERT INTO "homepage_content" ("id", "updated_at", "created_at")
      VALUES (1, now(), now());
    SELECT setval(pg_get_serial_sequence('homepage_content', 'id'), 1, true);

    INSERT INTO "homepage_content_locales" (
      "hero_title",
      "hero_subtitle",
      "hero_cta_label",
      "menu_highlight_heading",
      "menu_highlight_subtitle",
      "menu_highlight_cta_label",
      "about_heading",
      "about_paragraph_one",
      "about_paragraph_two",
      "menu_preview_heading",
      "menu_preview_subtitle",
      "menu_preview_view_full_label",
      "catering_heading",
      "catering_tagline",
      "catering_cta_label",
      "catering_email_subject",
      "catering_addons",
      "catering_order_note",
      "catering_order_contact",
      "catering_delivery_heading",
      "catering_delivery_pickup",
      "catering_delivery_local",
      "catering_delivery_n_l",
      "catering_price_note",
      "catering_b2b_note",
      "location_heading",
      "location_address_label",
      "location_hours_label",
      "location_contact_label",
      "location_whatsapp_label",
      "jobs_heading",
      "jobs_subtitle",
      "jobs_apply_now_label",
      "jobs_open_application_label",
      "jobs_send_c_v_label",
      "jobs_application_subject_prefix",
      "jobs_open_application_subject",
      "_locale",
      "_parent_id"
    ) VALUES
      (
        'New York-style Bagels in The Hague',
        'Handmade, boiled, baked fresh daily',
        'Make a reservation',
        'New Fresh Summer Menu',
        'Discover our new seasonal menu. Fresh ingredients, bold flavors — handcrafted daily.',
        'Taste it',
        E'No-Nonsense\nNew York Bagels',
        'Since 2020, we''ve been bringing authentic New York-style bagels to The Hague. Our bagels are hand-rolled, boiled, and baked fresh daily using traditional methods and 100% halal, natural ingredients.',
        'We combine New York''s straightforward approach with Dutch warmth, creating a space where everyone feels welcome. No shortcuts, no compromises—just honest, delicious bagels made the way they should be.',
        'Our Menu',
        'Discover our selection of handcrafted bagels and more',
        'View Full Menu',
        'Catering',
        'We love to party. Let us make yours extra-special.',
        'Contact us for catering',
        'Catering Inquiry',
        'SO MANY CHOICES! Treat yourself with delicious add-ons.',
        'Catering orders must be placed at least 48 hours in advance.',
        'Email us at hello@netherlandsbagels.com or WhatsApp +31 6 42661915',
        'Delivery',
        'Pick up at our café: free of charge',
        'Delivery in The Hague: +€15',
        'Delivery across the Netherlands: contact us for rates',
        'Pricelist valid for 2026.',
        'We also work with businesses — restaurants, offices, events. For B2B partnerships, reach out at hello@netherlandsbagels.com',
        'Visit Us',
        'Address',
        'Hours',
        'Contact',
        'WhatsApp',
        'Join Our Team',
        'We''re always looking for passionate people who love food and hospitality. If you want to be part of our team, we''d love to hear from you.',
        'Apply now →',
        'Send open application',
        'Send us your CV',
        'Application: ',
        'Open Application',
        'en',
        1
      ),
      (
        'New Yorkse Bagels in Den Haag',
        'Met de hand gemaakt, gekookt en dagelijks vers gebakken',
        'Maak een reservering',
        'Nieuw Vers Zomermenu',
        'Ontdek ons nieuwe seizoensmenu. Verse ingrediënten, gedurfde smaken — dagelijks met de hand gemaakt.',
        'Proef het',
        E'No-Nonsense\nNew Yorkse Bagels',
        'Sinds 2020 brengen wij authentieke New Yorkse bagels naar Den Haag. Onze bagels worden met de hand gerold, gekookt en dagelijks vers gebakken met traditionele methoden en 100% halal, natuurlijke ingrediënten.',
        'Wij combineren de directe New Yorkse aanpak met Nederlandse warmte en creëren een plek waar iedereen zich welkom voelt. Geen compromissen, geen shortcuts — gewoon eerlijke, heerlijke bagels zoals ze horen te zijn.',
        'Ons Menu',
        'Ontdek ons assortiment handgemaakte bagels en meer',
        'Bekijk volledig menu',
        'Catering',
        'Wij houden van feesten. Laat ons van jou iets extra-speciaals maken.',
        'Neem contact op voor catering',
        'Cateringaanvraag',
        'ZOVEEL KEUZE! Verwenner jezelf met heerlijke add-ons.',
        'Cateringbestellingen moeten minimaal 48 uur van tevoren worden geplaatst.',
        'Stuur een e-mail naar hello@netherlandsbagels.com of WhatsApp +31 6 42661915',
        'Bezorging',
        'Ophalen bij ons café: gratis',
        'Bezorging in Den Haag: +€15',
        'Bezorging door heel Nederland: neem contact op voor tarieven',
        'Prijslijst geldig voor 2026.',
        'Wij werken ook met bedrijven — restaurants, kantoren, evenementen. Voor B2B-samenwerkingen, neem contact op via hello@netherlandsbagels.com',
        'Bezoek Ons',
        'Adres',
        'Openingstijden',
        'Contact',
        'WhatsApp',
        'Kom bij Ons Team',
        'We zijn altijd op zoek naar gepassioneerde mensen die van eten en gastvrijheid houden. Als je deel wilt uitmaken van ons team, horen wij graag van je.',
        'Solliciteer nu →',
        'Stuur een open sollicitatie',
        'Stuur ons je cv',
        'Sollicitatie: ',
        'Open Sollicitatie',
        'nl',
        1
      );

    INSERT INTO "homepage_content_marquee_items" ("_order", "_parent_id", "id") VALUES
      (1, 1, 'marquee_1'),
      (2, 1, 'marquee_2'),
      (3, 1, 'marquee_3'),
      (4, 1, 'marquee_4'),
      (5, 1, 'marquee_5'),
      (6, 1, 'marquee_6'),
      (7, 1, 'marquee_7'),
      (8, 1, 'marquee_8');
    INSERT INTO "homepage_content_marquee_items_locales" ("text", "_locale", "_parent_id") VALUES
      ('No-Nonsense New York Bagels', 'en', 'marquee_1'),
      ('Netherlands Bagels', 'en', 'marquee_2'),
      ('No-Nonsense New York Bagels', 'en', 'marquee_3'),
      ('Netherlands Bagels', 'en', 'marquee_4'),
      ('No-Nonsense New York Bagels', 'en', 'marquee_5'),
      ('Netherlands Bagels', 'en', 'marquee_6'),
      ('No-Nonsense New York Bagels', 'en', 'marquee_7'),
      ('Netherlands Bagels', 'en', 'marquee_8'),
      ('No-Nonsense New York Bagels', 'nl', 'marquee_1'),
      ('Netherlands Bagels', 'nl', 'marquee_2'),
      ('No-Nonsense New York Bagels', 'nl', 'marquee_3'),
      ('Netherlands Bagels', 'nl', 'marquee_4'),
      ('No-Nonsense New York Bagels', 'nl', 'marquee_5'),
      ('Netherlands Bagels', 'nl', 'marquee_6'),
      ('No-Nonsense New York Bagels', 'nl', 'marquee_7'),
      ('Netherlands Bagels', 'nl', 'marquee_8');

    INSERT INTO "homepage_content_catering_packages" ("_order", "_parent_id", "id") VALUES
      (1, 1, 'catering_basic'),
      (2, 1, 'catering_super'),
      (3, 1, 'catering_brunch'),
      (4, 1, 'catering_deluxe');
    INSERT INTO "homepage_content_catering_packages_locales" ("name", "_locale", "_parent_id") VALUES
      ('Basic Box €55', 'en', 'catering_basic'),
      ('Super Box €120', 'en', 'catering_super'),
      ('Brunch Box €160', 'en', 'catering_brunch'),
      ('Deluxe Box €180', 'en', 'catering_deluxe'),
      ('Basic Box €55', 'nl', 'catering_basic'),
      ('Super Box €120', 'nl', 'catering_super'),
      ('Brunch Box €160', 'nl', 'catering_brunch'),
      ('Deluxe Box €180', 'nl', 'catering_deluxe');
    INSERT INTO "homepage_content_catering_packages_items" ("_order", "_parent_id", "id") VALUES
      (1, 'catering_basic', 'catering_basic_1'),
      (2, 'catering_basic', 'catering_basic_2'),
      (3, 'catering_basic', 'catering_basic_3'),
      (1, 'catering_super', 'catering_super_1'),
      (1, 'catering_brunch', 'catering_brunch_1'),
      (2, 'catering_brunch', 'catering_brunch_2'),
      (1, 'catering_deluxe', 'catering_deluxe_1'),
      (2, 'catering_deluxe', 'catering_deluxe_2'),
      (3, 'catering_deluxe', 'catering_deluxe_3'),
      (4, 'catering_deluxe', 'catering_deluxe_4');
    INSERT INTO "homepage_content_catering_packages_items_locales" ("item", "_locale", "_parent_id") VALUES
      ('10 loose bagels', 'en', 'catering_basic_1'),
      ('1 large cream cheese', 'en', 'catering_basic_2'),
      ('1 large scallion cream cheese', 'en', 'catering_basic_3'),
      ('10 bagel sandwiches of your choice, cut in half', 'en', 'catering_super_1'),
      ('10 bagel sandwiches of your choice, cut in half', 'en', 'catering_brunch_1'),
      ('10 NY style chocolate chip cookies OR 10 portions of dessert of your choice', 'en', 'catering_brunch_2'),
      ('10 bagel sandwiches of your choice, cut in half', 'en', 'catering_deluxe_1'),
      ('10 NY style chocolate chip cookies OR 10 portions of dessert of your choice', 'en', 'catering_deluxe_2'),
      ('1 liter fresh squeezed orange juice', 'en', 'catering_deluxe_3'),
      ('1 liter organic apple juice', 'en', 'catering_deluxe_4'),
      ('10 losse bagels', 'nl', 'catering_basic_1'),
      ('1 grote roomkaas', 'nl', 'catering_basic_2'),
      ('1 grote bieslookroomkaas', 'nl', 'catering_basic_3'),
      ('10 bagelsandwiches naar keuze, doormidden gesneden', 'nl', 'catering_super_1'),
      ('10 bagelsandwiches naar keuze, doormidden gesneden', 'nl', 'catering_brunch_1'),
      ('10 NY-stijl chocoladechipcookies OF 10 porties dessert naar keuze', 'nl', 'catering_brunch_2'),
      ('10 bagelsandwiches naar keuze, doormidden gesneden', 'nl', 'catering_deluxe_1'),
      ('10 NY-stijl chocoladechipcookies OF 10 porties dessert naar keuze', 'nl', 'catering_deluxe_2'),
      ('1 liter vers geperst sinaasappelsap', 'nl', 'catering_deluxe_3'),
      ('1 liter biologisch appelsap', 'nl', 'catering_deluxe_4');

    INSERT INTO "homepage_content_location_opening_hours" ("_order", "_parent_id", "id") VALUES
      (1, 1, 'location_hours_1'),
      (2, 1, 'location_hours_2'),
      (3, 1, 'location_hours_3');
    INSERT INTO "homepage_content_location_opening_hours_locales" ("day", "hours", "_locale", "_parent_id") VALUES
      ('Monday – Friday', '7:00 AM – 6:00 PM', 'en', 'location_hours_1'),
      ('Saturday', '8:00 AM – 6:00 PM', 'en', 'location_hours_2'),
      ('Sunday', '8:00 AM – 5:00 PM', 'en', 'location_hours_3'),
      ('Maandag – Vrijdag', '7:00 AM – 6:00 PM', 'nl', 'location_hours_1'),
      ('Zaterdag', '8:00 AM – 6:00 PM', 'nl', 'location_hours_2'),
      ('Zondag', '8:00 AM – 5:00 PM', 'nl', 'location_hours_3');
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE "homepage_content_marquee_items_locales" CASCADE;
    DROP TABLE "homepage_content_marquee_items" CASCADE;
    DROP TABLE "homepage_content_catering_packages_items_locales" CASCADE;
    DROP TABLE "homepage_content_catering_packages_items" CASCADE;
    DROP TABLE "homepage_content_catering_packages_locales" CASCADE;
    DROP TABLE "homepage_content_catering_packages" CASCADE;
    DROP TABLE "homepage_content_location_opening_hours_locales" CASCADE;
    DROP TABLE "homepage_content_location_opening_hours" CASCADE;
    DROP TABLE "homepage_content_locales" CASCADE;
    DROP TABLE "homepage_content" CASCADE;
  `)
}
