import { NextResponse } from 'next/server';
import { api, ApiError } from '../../../../api';

type RouteContext = {
  params: Promise<{ locationId: string }>;
};

export async function GET(_req: Request, context: RouteContext) {
  try {
    const { locationId } = await context.params;
    const { data, status } = await api.get(`/feedback/locations/${locationId}/feedbacks`);

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
