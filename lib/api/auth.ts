// lib/api/auth.ts
import { nextServer } from "./api";

export const getSessionStatus = async (): Promise<boolean> => {
  try {
    const res = await nextServer.get("/api/auth/session", {
      withCredentials: true,
    });

    return Boolean(res.data?.success);
  } catch {
    return false;
  }
};

export const getCurrentUser = async () => {
  const res = await nextServer.get("/api/users/me", {
    withCredentials: true,
  });
  return res.data?.data ?? res.data ?? null;
};
