import fetchJudge from "./fetch";
import getReviews from "./getReviews";
import createReview from "./createReview";
const operations = { getReviews, createReview };

const judge = {
  fetch: fetchJudge,
  operations,
};

export default judge;
