import { NextRequest, NextResponse } from "next/server";
import { api} from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { isAxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name =
      typeof body?.name === "string" ? body.name.trim() : "";
    const username =
      typeof body?.username === "string" ? body.username.trim() : name;
    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password =
      typeof body?.password === "string" ? body.password.trim() : "";

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          error: "Missing required registration fields",
          message: "Будь ласка, заповніть ім'я, email та пароль.",
        },
        { status: 400 },
      );
    }

    const apiRes = await api.post("/auth/register", {
      username,
      name: name || username,
      email,
      password,
    });

    const cookieStore = await cookies();
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed["Max-Age"]),
        };

        if (parsed.accessToken)
          cookieStore.set("accessToken", parsed.accessToken, options);
        if (parsed.refreshToken)
          cookieStore.set("refreshToken", parsed.refreshToken, options);
      }

      return NextResponse.json(apiRes.data, { status: apiRes.status });
    }

    console.error("Register proxy error: backend did not return auth cookies", {
      status: apiRes.status,
      data: apiRes.data,
    });
    return NextResponse.json(
      {
        error: "Registration completed without session",
        message: "Реєстрацію завершено, але вхід не виконано автоматично. Спробуйте увійти.",
      },
      { status: 502 },
    );
  } catch (error) {
    if (isAxiosError(error)) {
      const backendMessage = error.response?.data?.message;
      const status = error.response?.status ?? 500;
      console.error("Register proxy server error:", {
        status,
        data: error.response?.data,
        message: error.message,
      });
      return NextResponse.json(
        {
          error: backendMessage ?? error.response?.data?.error ?? error.message,
          message:
            backendMessage ??
            error.response?.data?.error ??
            "Не вдалося зареєструватися. Спробуйте ще раз пізніше.",
        },
        { status },
      );
    }
    console.error("Unknown register route error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Сталася помилка під час реєстрації. Спробуйте ще раз пізніше.",
      },
      { status: 500 },
    );
  }
}
