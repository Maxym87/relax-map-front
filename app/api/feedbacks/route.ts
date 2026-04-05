import { NextResponse } from "next/server";
import { nextServer } from "../api";
import { isAxiosError } from "axios";

export async function GET() {
  try {
    const apiRes = await nextServer.get("/api/feedback");
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
