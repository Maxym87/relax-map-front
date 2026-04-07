
import { NextResponse } from 'next/server';
const BASE_URL = 'https://relax-map-back.onrender.com/api';

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/categories/regions`, { cache: 'no-store' });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Failed to fetch region categories:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
