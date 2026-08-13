/**
 * Data migration script: Migrates users from data/users.json to Supabase.
 * Run this script after executing supabase-schema.sql in the Supabase SQL Editor.
 *
 * Usage: node scripts/migrate-users.cjs
 */
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

// Read .env file for DATABASE_URL
let connectionString;
const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    if (line.startsWith("DATABASE_URL=")) {
      connectionString = line.substring("DATABASE_URL=".length).trim();
      break;
    }
  }
}

if (!connectionString) {
  console.error("DATABASE_URL not found in .env file!");
  process.exit(1);
}

async function main() {
  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log("Connecting to Supabase database...");
    await pool.query("SELECT 1");
    console.log("✓ Connected to Supabase PostgreSQL database\n");

    // Ensure table exists
    console.log("Creating users table if not exists...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log("✓ Table ready\n");

    // Migrate from data/users.json
    const usersFile = path.join(process.cwd(), "data", "users.json");
    if (!fs.existsSync(usersFile)) {
      console.log("data/users.json not found. Nothing to migrate.");
      return;
    }

    const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
    console.log(`Migrating ${users.length} users from data/users.json...`);

    let migrated = 0;
    let skipped = 0;

    for (const user of users) {
      try {
        // Hash the password before storing (bcrypt)
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
        await pool.query(
          `INSERT INTO users (id, name, email, password, "createdAt")
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (email) DO UPDATE SET
             name = EXCLUDED.name,
             password = EXCLUDED.password,
             "createdAt" = EXCLUDED."createdAt"
           RETURNING email`,
          [user.id, user.name, user.email, hashedPassword, user.createdAt]
        );
        console.log(`  ✓ ${user.email}`);
        migrated++;
      } catch (err) {
        console.log(`  ✗ ${user.email} - ${err.message}`);
        skipped++;
      }
    }

    const total = await pool.query("SELECT COUNT(*) FROM users");
    console.log(`\n✅ Migration complete!`);
    console.log(`   Migrated: ${migrated}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Total users in database: ${total.rows[0].count}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
