/**
 * User data access layer.
 * Tries Supabase first, falls back to file-based storage (data/users.json)
 * for local development when Supabase credentials are not configured.
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const usersFile = join(process.cwd(), "data", "users.json");

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
    .single();

  if (error) {
    console.error("Supabase findUser error:", error.message);
    return null;
  }
  return data;
}

async function createUserInSupabase(
  name: string,
  email: string,
  password: string
): Promise<any | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("users")
    .insert(newUser)
    .select()
    .single();

  if (error) {
    console.error("Supabase createUser error:", error.message);
    return null;
  }
  return data;
}

async function updateUserPasswordInSupabase(
  email: string,
  newPassword: string
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  const { error } = await supabase
    .from("users")
    .update({ password: newPassword })
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
    return findUserInSupabase(email);
  }
  return findUserInFile(email);
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<any | null> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .ilike("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      return null;
    }
    return data;
  }

  const users = readUsersFromFile();
  const user = users.find(
    (u: any) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );
  return user || null;
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

  if (isSupabaseConfigured()) {
    return createUserInSupabase(name, email, password);
  }

  // File-based fallback
  const users = readUsersFromFile();
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
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
  user.password = newPassword;
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
