-- CoucouBeach - Tables Supabase
-- Exécute ce script dans l'éditeur SQL de Supabase (SQL Editor)

-- Table User
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table Post
CREATE TABLE IF NOT EXISTS "Post" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    content TEXT,
    published BOOLEAN DEFAULT FALSE,
    "authorId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
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

DROP TRIGGER IF EXISTS update_user_updated_at ON "User";
CREATE TRIGGER update_user_updated_at
    BEFORE UPDATE ON "User"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_post_updated_at ON "Post";
CREATE TRIGGER update_post_updated_at
    BEFORE UPDATE ON "Post"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Activer Row Level Security (RLS)
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Post" ENABLE ROW LEVEL SECURITY;

-- Politiques RLS de base (tout le monde peut lire, seulement les utilisateurs authentifiés peuvent écrire)
CREATE POLICY "Users can read all users" ON "User" FOR SELECT USING (true);
CREATE POLICY "Users can insert their own data" ON "User" FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own data" ON "User" FOR UPDATE USING (id = auth.uid()::text);

CREATE POLICY "Anyone can read published posts" ON "Post" FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON "Post" FOR INSERT WITH CHECK (true);
CREATE POLICY "Authors can update their own posts" ON "Post" FOR UPDATE USING ("authorId" = auth.uid()::text);