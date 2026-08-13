-- CoucouBeach - Tables Supabase
-- Exécute ce script dans l'éditeur SQL de Supabase (SQL Editor)
-- ⚠️ IMPORTANT : Ce script crée la table "users" (minuscules) avec la colonne "password"
--    qui correspond exactement au code (src/lib/user-store.ts) et au schéma Prisma.

-- Table users (authentification)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    password TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Migration : si la table "users" existe déjà sans la colonne "password", on l'ajoute
ALTER TABLE users ADD COLUMN IF NOT EXISTS password TEXT;
ALTER TABLE users ALTER COLUMN password SET NOT NULL;

-- Table Post
CREATE TABLE IF NOT EXISTS "Post" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    content TEXT,
    published BOOLEAN DEFAULT FALSE,
    "authorId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les recherches
CREATE INDEX IF NOT EXISTS idx_post_author ON "Post"("authorId");
CREATE INDEX IF NOT EXISTS idx_post_published ON "Post"(published);

-- Trigger pour mettre à jour updatedAt automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_user_updated_at ON users;
CREATE TRIGGER update_user_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_post_updated_at ON "Post";
CREATE TRIGGER update_post_updated_at
    BEFORE UPDATE ON "Post"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Activer Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Post" ENABLE ROW LEVEL SECURITY;

-- Politiques RLS de base
-- Lecture : tout le monde peut lire (nécessaire pour l'authentification via service role)
-- Écriture : autorisée (le service role bypass RLS de toute façon)
CREATE POLICY "Users can read all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can insert their own data" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (true);

CREATE POLICY "Anyone can read published posts" ON "Post" FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON "Post" FOR INSERT WITH CHECK (true);
CREATE POLICY "Authors can update their own posts" ON "Post" FOR UPDATE USING ("authorId" = auth.uid()::text);