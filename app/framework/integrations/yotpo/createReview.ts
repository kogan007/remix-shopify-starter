import judge from ".";

type CreateReviewArgs = {
  name: string;
  email: string;
  rating: number;
  body: string;
  id: string;
  title?: string;
  ip_addr?: string;
};
export default async function createReview(args: CreateReviewArgs) {
  const data = await judge.fetch("/reviews", {
    body: args,
    method: "post",
  });
  console.log(data);
  return null;
}
