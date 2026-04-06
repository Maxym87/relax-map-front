import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BASE_URL = 'https://relax-map-back.onrender.com/api';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const headers: HeadersInit = {};
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${BASE_URL}/locations`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.toString();
    const url = search ? `${BASE_URL}/locations?${search}` : `${BASE_URL}/locations`;

    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}