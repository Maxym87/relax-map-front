import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../api';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const imageData =
      typeof body?.imageData === 'string' ? body.imageData.trim() : '';

    if (!imageData) {
      return NextResponse.json(
        {
          error: 'Image data is required',
          message: 'Image data is required',
        },
        { status: 400 },
      );
    }

    const { data, status } = await api.post('/image', { imageData });

    return NextResponse.json(data, { status });
  } catch (error) {
    const err = error as ApiError;

    return NextResponse.json(
      {
        error: err.response?.data?.error ?? err.response?.data?.message ?? err.message,
        message: err.response?.data?.message ?? err.response?.data?.error ?? err.message,
      },
      { status: err.response?.status || 500 },
    );
  }
}
