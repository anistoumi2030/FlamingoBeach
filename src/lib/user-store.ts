/**
 * User data access layer.
 * Tries Supabase first, falls back to file-based storage (data/users.json)
 * for local development when Supabase credentials are not configured.
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const usersFile = join(process.cwd(), "data", "users.json");
const SALT_ROUNDS = 10;

function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

/* ─── File-based fallback helpers ─── */

function readUsersFromFile(): any[] {
  if (!existsSync(usersFile)) return [];
  return JSON.parse(readFileSync(usersFile, "utf-8"));
}

function writeUsersToFile(users: any[]): void {
  writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

function findUserInFile(email: string): any | null {
  const users = readUsersFromFile();
  return (
    users.find(
      (u: any) => u.email.toLowerCase() === email.toLowerCase()
    ) || null
  );
}

/* ─── Supabase helpers ─── */

async function findUserInSupabase(email: string): Promise<any | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .ilike("email", email)
    .limit(1);

  if (error) {
    console.error("Supabase findUser error:", error.message);
    return null;
  }
  return data?.[0] ?? null;
}

async function createUserInSupabase(
  name: string,
  email: string,
  password: string
): Promise<any> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error("Supabase n'est pas configuré");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("users")
    .insert(newUser)
    .select()
    .single();

  if (error) {
    console.error("Supabase createUser error:", error.message);
    throw new Error(
      `Erreur lors de la création du compte dans Supabase : ${error.message}`
    );
  }
  return data;
}

async function updateUserPasswordInSupabase(
  email: string,
  newPassword: string
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

  const { error } = await supabase
    .from("users")
    .update({ password: hashedPassword })
    .ilike("email", email);

  if (error) {
    console.error("Supabase updatePassword error:", error.message);
    return false;
  }
  return true;
}

/* ─── Public API ─── */

export async function findUserByEmail(email: string): Promise<any | null> {
  if (isSupabaseConfigured()) {
    const user = await findUserInSupabase(email);
    if (user) return user;
    // Fallback to file-based storage if the user isn't in Supabase
    // (covers accounts created before Supabase was configured).
    return findUserInFile(email);
  }
  return findUserInFile(email);
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<any | null> {
  let user: any | null = null;

  if (isSupabaseConfigured()) {
    user = await findUserInSupabase(email);
  } else {
    user = findUserInFile(email);
  }

  if (!user) return null;

  // Compare the provided password with the stored (hashed) password
  const valid = await bcrypt.compare(password, user.password);
  return valid ? user : null;
}

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<any | null> {
  // Check for duplicate
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new Error("User already exists");
  }

  // Always use Supabase when configured (including on Vercel)
  // File-based fallback is only for local development without Supabase
  if (isSupabaseConfigured()) {
    return createUserInSupabase(name, email, password);
  }

  // File-based fallback for local development only
  const users = readUsersFromFile();
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  writeUsersToFile(users);
  return newUser;
}

export async function updateUserPassword(
  email: string,
  newPassword: string
): Promise<boolean> {
  if (isSupabaseConfigured()) {
    return updateUserPasswordInSupabase(email, newPassword);
  }

  // File-based fallback
  const users = readUsersFromFile();
  const user = users.find(
    (u: any) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (!user) return false;
  user.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
  writeUsersToFile(users);
  return true;
}

/**
 * Strip password from user object before returning to client.
 */
export function sanitizeUser(user: any): any {
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
}