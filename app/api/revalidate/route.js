import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

function isAuthorized(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return false;

  const fromQuery = request.nextUrl.searchParams.get("secret");
  const fromHeader = request.headers.get("x-revalidate-secret");

  return fromQuery === secret || fromHeader === secret;
}

function revalidateAllContent() {
  revalidateTag("cole-content");
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 401 });
  }

  revalidateAllContent();
  return NextResponse.json({ ok: true, revalidated: true, at: new Date().toISOString() });
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 401 });
  }

  revalidateAllContent();
  return NextResponse.json({ ok: true, revalidated: true, at: new Date().toISOString() });
}
