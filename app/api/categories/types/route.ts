import { NextResponse } from 'next/server';
const BASE_URL = 'https://relax-map-back.onrender.com/api';

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/categories/location-types`, { cache: 'no-store' });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Failed to fetch location types:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
