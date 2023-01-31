import type { Pagination, Review } from "~/framework/integrations/yotpo/types";
import { StarIcon } from "@heroicons/react/20/solid";
import classNames from "~/framework/lib/classNames";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
export default function YotpoReviews({
  averageScore,
  pagination,
  reviews,
}: {
  averageScore: number;
  pagination: Pagination;
  reviews: Review[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section aria-labelledby="reviews-heading" className="bg-white">
      <div className="mx-auto max-w-2xl py-24 px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:py-32 lg:px-8">
        <div className="lg:col-span-4">
          <h2
            id="reviews-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Customer Reviews
          </h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      averageScore > rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "flex-shrink-0 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{averageScore} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">
              Based on {pagination.total} reviews
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {[1, 2, 3, 4, 5].reverse().map((count) => (
                <div key={count} className="flex items-center text-sm">
                  <dt className="flex flex-1 items-center">
                    <p className="w-3 font-medium text-gray-900">
                      {count}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div
                      aria-hidden="true"
                      className="ml-1 flex flex-1 items-center"
                    >
                      <StarIcon
                        className={classNames(
                          count > 0 ? "text-yellow-400" : "text-gray-300",
                          "flex-shrink-0 h-5 w-5"
                        )}
                        aria-hidden="true"
                      />

                      <div className="relative ml-3 flex-1">
                        <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                        {count > 0 ? (
                          <div
                            className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                            style={{
                              width: `calc(${0} / ${
                                pagination.total === 0 ? 1 : pagination.total
                              } * 100%)`,
                              visibility: "hidden",
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                    {/* {Math.round((count / pagination.total) * 100)}% */}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">
              Share your thoughts
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              If you’ve used this product, share your thoughts with other
              customers
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
            >
              Write a review
            </button>
          </div>
        </div>

        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {reviews.map((review) => (
                <div key={review.id} className="py-12">
                  <div className="flex items-center">
                    {/* <img src={review.user.image} alt={`${review.author}.`} className="h-12 w-12 rounded-full" /> */}
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-gray-900">
                        {review.user.displayName}
                      </h4>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review.score > rating
                                ? "text-yellow-400"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{review.score} out of 5 stars</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-6 text-base italic text-gray-600">
                    {review.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ReviewModal open={modalOpen} setOpen={setModalOpen} />
    </section>
  );
}
