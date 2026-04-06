import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BASE_URL = 'https://relax-map-back.onrender.com/api';

type RouteContext = {
  params: Promise<{ locationId: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { locationId } = await context.params;
    const response = await fetch(`${BASE_URL}/locations/${locationId}`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const { locationId } = await context.params;
    const formData = await req.formData();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const headers: HeadersInit = {};
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${BASE_URL}/locations/${locationId}`, {
      method: 'PATCH',
      headers,
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}