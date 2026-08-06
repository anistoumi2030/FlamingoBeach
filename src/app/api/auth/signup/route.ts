import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const usersFile = join(process.cwd(), "data", "users.json");

function ensureUsersFile() {
  const dir = join(process.cwd(), "data");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  if (!existsSync(usersFile)) {
    writeFileSync(usersFile, JSON.stringify([], null, 2));
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email and password are required" }, { status: 400 });
    }

    ensureUsersFile();
    console.log("Users file path:", usersFile);

    const users = JSON.parse(readFileSync(usersFile, "utf-8"));
    console.log("Current users count:", users.length);
    const existingUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      return NextResponse.json({ ok: false, error: "User already exists" }, { status: 400 });
    }

    const newUser = {
      id: Date.now().toString(),
      name: name || null,
      email: email.toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeFileSync(usersFile, JSON.stringify(users, null, 2));
    console.log("New user created:", newUser.email);

    return NextResponse.json({ ok: true, user: { id: newUser.id, email: newUser.email, name: newUser.name } });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}