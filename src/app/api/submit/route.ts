import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    if (!GOOGLE_SCRIPT_URL) {
      console.error("GOOGLE_SCRIPT_URL not set");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "text/plain" },
      redirect: "follow",
    });

    const text = await res.text();
    try {
      const json = JSON.parse(text);
      if (json.status === "success") {
        return NextResponse.json({ success: true });
      }
    } catch {
      // Google Apps Script may return HTML on redirect — treat as success if 200
      if (res.ok) {
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
