import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api, ApiError } from '../../../api';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  const cookieStore = await cookies();

  try {
    const { id } = await context.params;
    const params = Object.fromEntries(req.nextUrl.searchParams.entries());
    const { data, status } = await api.get(`/users/${id}/locations`, {
      params,
      headers: { Cookie: cookieStore.toString() },
    });

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
