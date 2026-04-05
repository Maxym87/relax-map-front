import { nextServer } from "./api";
import { Feedback, FeedbacksResponse } from "@/types/types";

// : Feedbacks API
export const getFeedbacks = async (): Promise<Feedback[]> => {
  const res = await nextServer.get<FeedbacksResponse>("/api/feedback", {
    params: { perPage: 10 },
  });
  return (res.data?.feedbacks ?? []).map((f) => ({
    ...f,
    id: f._id,
  }));
};

export const getLocationFeedbacks = async (
  locationId: string,
): Promise<Feedback[]> => {
  const res = await nextServer.get<FeedbacksResponse>(
    `/api/locations/${locationId}/feedbacks`,
  );
  return res.data?.feedbacks ?? [];
};
