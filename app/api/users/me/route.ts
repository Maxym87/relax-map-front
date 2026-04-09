import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { api, ApiError } from "../../api";

const getCookieHeader = async () => {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((current) => `${current.name}=${current.value}`)
    .join("; ");
};

const getBearerToken = async (req?: NextRequest) => {
  const authHeader = req?.headers.get("authorization");

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }

  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value ?? "";
};

const applySetCookieHeaders = async (response: NextResponse, setCookie: string | string[]) => {
  const cookieStore = await cookies();
  const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

  cookieArray.forEach((current) => {
    response.headers.append("Set-Cookie", current);
  });

  for (const cookieStr of cookieArray) {
    const parsed = parse(cookieStr);
    const options = {
      path: parsed.Path ?? "/",
      expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
      maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
    };

    if (parsed.accessToken) {
      cookieStore.set("accessToken", parsed.accessToken, options);
    }

    if (parsed.refreshToken) {
      cookieStore.set("refreshToken", parsed.refreshToken, options);
    }

    if (parsed.sessionId) {
      cookieStore.set("sessionId", parsed.sessionId, options);
    }
  }
};

const getAuthHeaders = async (req?: NextRequest) => {
  const cookieHeader = await getCookieHeader();
  const token = await getBearerToken(req);

  return {
    Cookie: cookieHeader,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const tryRefreshAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return "";
  }

  const refreshResponse = await api.post(
    "/auth/refresh",
    {},
    {
      headers: {
        Cookie: await getCookieHeader(),
      },
    },
  );

  const setCookie = refreshResponse.headers["set-cookie"];

  if (!setCookie) {
    return "";
  }

  const response = NextResponse.next();
  await applySetCookieHeaders(response, setCookie);

  return (await cookies()).get("accessToken")?.value ?? "";
};

const unauthorizedResponse = (message: string) =>
  NextResponse.json(
    {
      error: message,
      message,
    },
    { status: 401 },
  );

export async function GET(req: NextRequest) {
  const token = await getBearerToken(req);

  if (!token) {
    return unauthorizedResponse("Authorization failed: missing Bearer token.");
  }

  try {
    const { data, status } = await api.get("/users/current", {
      headers: await getAuthHeaders(req),
    });

    return NextResponse.json(data, { status });
  } catch (error) {
    const err = error as ApiError;

    if (err.response?.status === 401) {
      try {
        const refreshedToken = await tryRefreshAccessToken();

        if (!refreshedToken) {
          return unauthorizedResponse(
            "Authorization failed: token is missing or expired. Please sign in again.",
          );
        }

        const { data, status, headers } = await api.get("/users/current", {
          headers: {
            Cookie: await getCookieHeader(),
            Authorization: `Bearer ${refreshedToken}`,
          },
        });

        const response = NextResponse.json(data, { status });
        const setCookie = headers["set-cookie"];

        if (setCookie) {
          await applySetCookieHeaders(response, setCookie);
        }

        return response;
      } catch {
        return unauthorizedResponse(
          "Authorization failed: token is invalid or expired. Please sign in again.",
        );
      }
    }

    return NextResponse.json(
      { error: err.response?.data?.error ?? err.message },
      { status: err.response?.status || 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  const token = await getBearerToken(req);

  if (!token) {
    return unauthorizedResponse("Authorization failed: missing Bearer token.");
  }

  const body = await req.json();

  try {
    const { data, status, headers } = await api.patch("/users/me", body, {
      headers: await getAuthHeaders(req),
    });
    const res = NextResponse.json(data, { status });
    const setCookie = headers["set-cookie"];

    if (setCookie) {
      await applySetCookieHeaders(res, setCookie);
    }

    return res;
  } catch (error) {
    const err = error as ApiError;

    if (err.response?.status === 401) {
      return unauthorizedResponse(
        "Authorization failed: token is invalid or expired. Please sign in again.",
      );
    }

    return NextResponse.json(
      { error: err.response?.data?.error ?? err.message },
      { status: err.response?.status || 500 },
    );
  }
}
