import { NextRequest, NextResponse } from "next/server";
import { nextServer } from "@/app/api/api";
import { isAxiosError } from "axios";

type RouteContext = {
  params: Promise<{
    locationId: string;
  }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { locationId } = await context.params;
    const apiRes = await nextServer.get(
      `/api/locations/${locationId}/feedbacks`,
    );
    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message ?? error.message },
        { status: error.response?.status ?? 500 },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
