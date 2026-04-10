"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, getSessionStatus } from "../lib/api/auth";
import { nextServer } from "../lib/api/api";
import { User } from "../types/types";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: hasSession, isLoading: isSessionLoading } = useQuery<boolean>({
    queryKey: ["authSession"],
    queryFn: getSessionStatus,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const { data, isLoading, isError } = useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    enabled: hasSession === true,
  });

  const normalizedUser = data
    ? {
        ...data,
        id: data.id || data._id || "",
      }
    : null;
  
const logout = async () => {
    await nextServer.post("/api/auth/logout");
    queryClient.setQueryData(["authSession"], false);
    queryClient.setQueryData(["currentUser"], null);
    await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
  };
  
  return {
    user: normalizedUser,
    isAuthenticated: !!normalizedUser,
    isLoading: isSessionLoading || (hasSession === true && isLoading),
    isError: hasSession === true ? isError : false,
    logout
  };
};
