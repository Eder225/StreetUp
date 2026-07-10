import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + "-" + file.name.replace(/\s+/g, "-");
  const dir = path.join(process.cwd(), "public/images");
  const filepath = path.join(dir, filename);

  await mkdir(dir, { recursive: true });
  await writeFile(filepath, buffer);

  return NextResponse.json({ url: "/images/" + filename.replace(/\\/g, "/") });
}
