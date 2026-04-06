import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api} from '../api';

export async function GET() {
  try {
    const apiRes = await api.get("/api/feedback");
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

// import { NextResponse } from 'next/server';
// const BASE_URL = 'https://relax-map-back.onrender.com/api';

// export async function GET() {
//   try {
//     const response = await fetch(`${BASE_URL}/feedback`, { cache: 'no-store' });
//     const data = await response.json();
//     return NextResponse.json(data, { status: response.status });
//   } catch {
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }
