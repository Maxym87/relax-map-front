import { getFeedbacks, getLocationById, getLocationFeedbacks, serverUserService } from '@/lib/api/serverApi';
import { LocationInfoBlock } from '@/components/LocationInfoBlock/LocationInfoBlock';
import { LocationGallery } from '@/components/LocationGallery/LocationGallery';
import { LocationDescription } from '@/components/LocationDescription/LocationDescription';
import ReviewsSection from '@/components/ReviewsSection/ReviewsSection';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import type { Feedback } from '@/types/types';

interface ToolDetailsPageProps {
  params: Promise<{ locationId: string }>;
}

const getString = (value: unknown, fallback = '') =>
  typeof value === 'string' ? value : fallback;

const getNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export async function generateMetadata({ params }: ToolDetailsPageProps): Promise<Metadata> {
  const { locationId } = await params;
  const locationData = await getLocationById(locationId);

  if (!locationData) {
    return { title: 'Локацію не знайдено' };
  }

  const rawLocation = locationData as Record<string, unknown>;
  const title = getString(rawLocation.name, 'Локація');
  const description = getString(rawLocation.description).slice(0, 160);
  const image = getString(rawLocation.image);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : [],
    },
  };
}

export default async function ToolDetailsPage({ params }: ToolDetailsPageProps) {
  const { locationId } = await params;
  const [locationData, feedbacks] = await Promise.all([
    getLocationById(locationId),
    getLocationFeedbacks(locationId),
  ]);

  if (!locationData) {
    notFound();
  }

  const rawLocation = locationData as Record<string, unknown>;

  const owner = rawLocation.owner as { _id?: string } | undefined;
  const authorId =
    getString(rawLocation.ownerId) || getString(owner?._id);

  const authorResponse =
    !getString(rawLocation.authorName) && authorId
      ? await serverUserService.getUserById(authorId)
      : null;

  const authorName =
    getString(rawLocation.authorName) ||
    getString(authorResponse?.data?.name) ||
    getString(authorResponse?.name);

  const feedbackRefs = Array.isArray(rawLocation.feedbacksId)
    ? rawLocation.feedbacksId
    : [];

  const fallbackFeedbacks = feedbackRefs.filter(
    (feedback: unknown): feedback is Feedback =>
      !!feedback &&
      typeof feedback === 'object' &&
      '_id' in feedback &&
      'userName' in feedback &&
      'rate' in feedback,
  );

  const feedbackIds = feedbackRefs.map((feedback: unknown) =>
    typeof feedback === 'string'
      ? feedback
      : feedback && typeof feedback === 'object' && '_id' in feedback
        ? String(feedback._id)
        : '',
  );

  const globalFeedbacks =
    feedbacks.length === 0 && feedbackIds.length > 0 ? await getFeedbacks() : [];

  const filteredGlobalFeedbacks =
    globalFeedbacks.length > 0
      ? globalFeedbacks.filter((feedback) => feedbackIds.includes(feedback._id))
      : [];

  const resolvedFeedbacks =
    feedbacks.length > 0
      ? feedbacks
      : filteredGlobalFeedbacks.length > 0
        ? filteredGlobalFeedbacks
        : fallbackFeedbacks;

  const title = getString(rawLocation.name, 'Локація');
  const rating = getNumber(rawLocation.rate ?? rawLocation.rating, 0);
  const region =
    getString(rawLocation.regionName) ||
    getString(rawLocation.region);
  const type =
    getString(rawLocation.locationTypeName) ||
    getString(rawLocation.locationType) ||
    getString(rawLocation.type);
  const image = getString(rawLocation.image);
  const description = getString(rawLocation.description, 'Опис відсутній.');

  return (
    <div className="container">
      <LocationInfoBlock
        title={title}
        rating={rating}
        region={region}
        type={type}
        authorId={authorId}
        authorName={authorName}
      />
      <LocationGallery imageSrc={image} imageAlt={title} />
      <LocationDescription text={description} />
      <ReviewsSection locationId={locationId} feedbacks={resolvedFeedbacks} />
    </div>
  );
}
