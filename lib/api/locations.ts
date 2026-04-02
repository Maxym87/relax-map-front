export type CreateLocationPayload = FormData;

export const createLocation = async (formData: CreateLocationPayload) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const response = await fetch(
    'https://relax-map-back.onrender.com/api/locations',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Не вдалося створити локацію');
  }

  return data;
};