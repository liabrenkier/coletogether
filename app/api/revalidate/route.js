import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const tag = searchParams.get("tag") || "cole-content";

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  try {
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, tag, now: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { revalidated: false, message: error?.message || "Revalidate failed" },
      { status: 500 }
    );
  }
}
