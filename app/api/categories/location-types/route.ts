import { NextResponse } from "next/server";
import { api, ApiError } from "../../api";

export async function GET() {
  try {
    const apiRes = await api.get("/api/categories/location-types");

    return NextResponse.json(apiRes.data);
  } catch (error) {
    const err = error as ApiError;

    return NextResponse.json(
      {
        error: err.response?.data?.error ?? err.message,
      },
      {
        status: err.response?.status || 500,
      },
    );
  }
}


// import { NextResponse } from 'next/server';
// const BASE_URL = 'https://relax-map-back.onrender.com/api';

// export async function GET() {
//   try {
// const response = await fetch(`${BASE_URL}/categories/location-types`, { cache: 'no-store' });
//     const data = await response.json();
//     return NextResponse.json(data, { status: response.status });
//   } catch {
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }