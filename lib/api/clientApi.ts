import { nextServer } from "./api";
import type { User, Feedback, FeedbacksResponse } from "@/types/types";

// Auth API
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
export const register = async (data: RegisterData): Promise<User> => {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginData): Promise<User> => {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
};
// Feedbacks API
export const getLocationFeedbacks = async (
  locationId: string,
): Promise<Feedback[]> => {
  const res = await nextServer.get<FeedbacksResponse>(
    `/api/locations/${locationId}/feedbacks`,
  );
  return res.data?.feedbacks ?? [];
};
