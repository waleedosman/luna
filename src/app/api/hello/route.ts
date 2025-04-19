// src/app/api/hello/route.ts
import { NextResponse } from 'next/server';

// Handler for GET requests
export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello from GET!" }, { status: 200 });
}

// Handler for POST requests
export async function POST(request: Request) {
  // You could optionally try parsing request body here if needed for test
  // const data = await request.json().catch(() => ({}));
  return NextResponse.json({ message: "Hello from POST!", /* received: data */ }, { status: 200 });
}

// Optional: Handler for other methods to return 405 explicitly
export async function PUT(request: Request) { return new NextResponse(null, { status: 405 }) }
export async function DELETE(request: Request) { return new NextResponse(null, { status: 405 }) }
// Add others if needed