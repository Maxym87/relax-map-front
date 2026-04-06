

// lib/api/auth.ts
import { nextServer } from "./api";
import { User } from "@/types/types";



export const getCurrentUser = async (): Promise<User | null> => {
  const res = await nextServer.get('/users/current', {
    withCredentials: true,
  });

  return res.data;

};

