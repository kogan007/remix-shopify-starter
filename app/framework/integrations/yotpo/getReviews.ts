import yotpo from ".";
import type { Status, Response, Pagination, Review } from "./types";

type ReviewArgs = {
  productId?: string;
  rating?: number;
};

export default async function getReviews({
  productId,
  rating,
}: ReviewArgs = {}): Promise<{
  averageScore: number;
  pagination: Pagination;
  reviews: Review[];
}> {
  const {
    response: { bottomline, pagination, reviews },
  } = await yotpo.fetch<{ status: Status; response: Response }>(
    `/products/${productId}/reviews.json`
  );
  return {
    averageScore: bottomline.average_score,
    pagination,
    reviews: reviews.map(
      ({
        id,
        score,
        votes_up,
        votes_down,
        content,
        title,
        created_at,
        user,
      }) => ({
        id,
        score,
        upvotes: votes_up,
        downvotes: votes_down,
        content,
        title,
        createdAt: created_at,
        user: {
          id: user.user_id,
          image: user.social_image,
          displayName: user.display_name,
        },
      })
    ),
  };
}
