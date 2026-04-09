import { NextResponse } from 'next/server';
import { api } from '../../api';

export async function GET() {
  try {
    const response = await api.get('/categories/location-types');
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Failed to fetch location types:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
