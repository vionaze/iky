import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`home_works_carousel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_works_carousel_order_idx\` ON \`home_works_carousel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_works_carousel_parent_id_idx\` ON \`home_works_carousel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_works_carousel_image_idx\` ON \`home_works_carousel\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_works_carousel_locales\` (
  	\`title\` text NOT NULL,
  	\`kicker\` text,
  	\`meta\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_works_carousel\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_works_carousel_locales_locale_parent_id_unique\` ON \`home_works_carousel_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_works_carousel_locales_parent_id_idx\` ON \`home_works_carousel_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_about_process_words\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_about_process_words_order_idx\` ON \`home_about_process_words\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_about_process_words_parent_id_idx\` ON \`home_about_process_words\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_about_process_words_locales\` (
  	\`word\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_about_process_words\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_about_process_words_locales_locale_parent_id_unique\` ON \`home_about_process_words_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_about_process_words_locales_parent_id_idx\` ON \`home_about_process_words_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_about_partners\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`logo_id\` integer,
  	\`invert\` integer DEFAULT false,
  	\`square\` integer DEFAULT false,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_about_partners_order_idx\` ON \`home_about_partners\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_about_partners_parent_id_idx\` ON \`home_about_partners\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_about_partners_logo_idx\` ON \`home_about_partners\` (\`logo_id\`);`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`contact_email\` text;`)
  await db.run(sql`ALTER TABLE \`home_locales\` ADD \`hero_stage_small\` text;`)
  await db.run(sql`ALTER TABLE \`home_locales\` ADD \`hero_stage_ghost\` text;`)
  await db.run(sql`ALTER TABLE \`home_locales\` ADD \`hero_stage_cta\` text;`)
  await db.run(sql`ALTER TABLE \`home_locales\` ADD \`about_me_title\` text;`)
  await db.run(sql`ALTER TABLE \`home_locales\` ADD \`about_me_lead\` text;`)
  await db.run(sql`ALTER TABLE \`home_locales\` ADD \`about_me_p1\` text;`)
  await db.run(sql`ALTER TABLE \`home_locales\` ADD \`about_me_p2\` text;`)
  await db.run(sql`ALTER TABLE \`home_locales\` ADD \`about_me_p3\` text;`)
  await db.run(sql`ALTER TABLE \`home_locales\` ADD \`about_me_closing\` text;`)
  await db.run(sql`ALTER TABLE \`home_locales\` ADD \`contact_cta_label\` text;`)
  await db.run(sql`ALTER TABLE \`home_locales\` ADD \`footer_marquee\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`home_works_carousel\`;`)
  await db.run(sql`DROP TABLE \`home_works_carousel_locales\`;`)
  await db.run(sql`DROP TABLE \`home_about_process_words\`;`)
  await db.run(sql`DROP TABLE \`home_about_process_words_locales\`;`)
  await db.run(sql`DROP TABLE \`home_about_partners\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`contact_email\`;`)
  await db.run(sql`ALTER TABLE \`home_locales\` DROP COLUMN \`hero_stage_small\`;`)
  await db.run(sql`ALTER TABLE \`home_locales\` DROP COLUMN \`hero_stage_ghost\`;`)
  await db.run(sql`ALTER TABLE \`home_locales\` DROP COLUMN \`hero_stage_cta\`;`)
  await db.run(sql`ALTER TABLE \`home_locales\` DROP COLUMN \`about_me_title\`;`)
  await db.run(sql`ALTER TABLE \`home_locales\` DROP COLUMN \`about_me_lead\`;`)
  await db.run(sql`ALTER TABLE \`home_locales\` DROP COLUMN \`about_me_p1\`;`)
  await db.run(sql`ALTER TABLE \`home_locales\` DROP COLUMN \`about_me_p2\`;`)
  await db.run(sql`ALTER TABLE \`home_locales\` DROP COLUMN \`about_me_p3\`;`)
  await db.run(sql`ALTER TABLE \`home_locales\` DROP COLUMN \`about_me_closing\`;`)
  await db.run(sql`ALTER TABLE \`home_locales\` DROP COLUMN \`contact_cta_label\`;`)
  await db.run(sql`ALTER TABLE \`home_locales\` DROP COLUMN \`footer_marquee\`;`)
}
