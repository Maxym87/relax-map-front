import { nextServer } from './api';
import type { User, Feedback, FeedbacksResponse } from '@/types/types';
import { AxiosError } from 'axios';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const baseURL = "/api";

export const clientApi = axios.create({
  baseURL,
  withCredentials: true,
});

export const nextClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export type LoginData = {
  email: string;
  password: string;
};
export interface FetchLocationsParams {
  page?: number;
  limit?: number;
  search?: string;
  region?: string;
  type?: string;
  sort?: string;
}

export const fetchLocations = async (params: FetchLocationsParams) => {
  const response = await clientApi.get("/locations", { params });
  const items = response.data.data || [];
  
  return {
    items,
    hasNextPage: items.length === (params.limit || 9),
  };
};

export const fetchRegions = async () => {
  const response = await clientApi.get("/categories/regions");
  return response.data.regions;
};

export const fetchLocationTypes = async () => {
  const response = await clientApi.get("/categories/types");
  return response.data.locationTypes;
};

export const register = async (data: RegisterData): Promise<User> => {
  try {
    const response = await nextServer.post<User>('/auth/register', data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ error?: string }>;
    throw new Error(err.response?.data?.error || 'Помилка реєстрації');
  }
};

export async function login(data: LoginData) {
  try {
    const res = await nextServer.post('/auth/login', data);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error('Помилка входу');
  }
}

export const getLocationFeedbacks = async (locationId: string): Promise<Feedback[]> => {
  const res = await nextServer.get<FeedbacksResponse>(
    `/locations/${locationId}/feedbacks`
  );
  return res.data?.feedbacks ?? [];
};

export const clientUserService = {
  getCurrentUser: async () => {
    try {
      const res = await nextServer.get('/users/current');
      return res.data;
    } catch {
      return null;
    }
  },
  getUserById: async (userId: string) => {
    try {
      const res = await nextServer.get(`/users/${userId}`);
      return res.data;
    } catch {
      return null;
    }
  },
  getUserLocations: async (userId: string) => {
    try {
      const res = await nextServer.get(`/users/${userId}/locations`);
      return res.data;
    } catch (error) {
      return { data: { data: [], totalItems: 0 } };
    }
  },
};

export const clientLocationService = {
  createLocation: async (formData: FormData) => {
    const res = await nextServer.post('/locations', formData);
    return res.data;
  },
  updateLocation: async (locationId: string, formData: FormData) => {
    const res = await nextServer.patch(`/locations/${locationId}`, formData);
    return res.data;
  },
  getLocationById: async (locationId: string) => {
    const res = await nextServer.get(`/locations/${locationId}`);
    return res.data;
  },
};

const fetchLocationsInternal = async (params: FetchLocationsParams) => {
  const response = await clientApi.get("/locations", { params });
  return response.data.data || [];
};

export const usePopularLocations = (limit: number = 6) => {
  return useQuery({
    queryKey: ["popularLocations", { limit }],
    queryFn: () => fetchLocationsInternal({ limit, page: 1 }),
    staleTime: 5 * 60 * 1000,
  });
};

export const useFilteredLocations = (params: FetchLocationsParams) => {
  return useQuery({
    queryKey: ["locations", params],
    queryFn: () => fetchLocationsInternal(params),
    staleTime: 5 * 60 * 1000,
  });
};