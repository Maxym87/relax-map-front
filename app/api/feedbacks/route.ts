import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api} from '../api';
import { cookies } from "next/headers";

export async function GET() {
  try {
    const apiRes = await api.get("/feedback");
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

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  try {
    const body = await req.json();
    const locationId =
      typeof body?.locationId === "string" ? body.locationId : undefined;
    const payload = {
      locationId,
      description: body?.description,
      rate: Number(body?.rate),
    };

    if (!locationId) {
      throw new Error("Location id is required");
    }

    if (!cookieHeader) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Щоб залишити відгук, потрібно увійти в акаунт",
        },
        { status: 401 },
      );
    }

    let apiRes;

    try {
      apiRes = await api.post("/feedback", payload, {
        headers: { Cookie: cookieHeader },
      });
    } catch (error) {
      if (!isAxiosError(error) || ![404, 405].includes(error.response?.status ?? 0)) {
        throw error;
      }

      apiRes = await api.post(
        `/feedback/locations/${locationId}/feedbacks`,
        {
          description: payload.description,
          rate: payload.rate,
        },
        {
          headers: { Cookie: cookieHeader },
        },
      );
    }

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.error ?? error.response?.data?.message ?? error.message,
          message: error.response?.data?.message ?? error.response?.data?.error ?? error.message,
        },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error", message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
