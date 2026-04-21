import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbwDl7PMkKxEtz5vJUUty5NwVBi70l3FQcMrrBT9fcMRzEyOhpETRxOHeXdQ8j4uWUwbVg/exec",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "text/plain" },
        redirect: "follow",
      }
    );

    if (res.ok) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
