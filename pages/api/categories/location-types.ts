import type { NextApiRequest, NextApiResponse } from 'next';
import { api, ApiError } from '../../../app/api/api';

type ErrorBody = {
  error: string;
  message: string;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await api.get('/categories/location-types');
    return res.status(response.status).json(response.data);
  } catch (error) {
    const err = error as ApiError;

    console.error('GET /pages/api/categories/location-types failed:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });

    const body: ErrorBody = {
      error:
        err.response?.data?.error ??
        err.response?.data?.message ??
        'Failed to fetch location types',
      message:
        err.response?.data?.message ??
        err.response?.data?.error ??
        'Failed to fetch location types',
    };

    return res.status(err.response?.status || 500).json(body);
  }
}
