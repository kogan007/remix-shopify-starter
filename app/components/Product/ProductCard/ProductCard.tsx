import { Link } from "@remix-run/react";
import type { ProductShort } from "~/framework/types/product";

export default function ProductCard({ product }: { product: ProductShort }) {
  return (
    <div className="inline-flex w-64 flex-col text-center lg:w-auto">
      <div className="group relative">
        <div className="w-full overflow-hidden rounded-md bg-gray-200">
          <img
            src={product.images[0].url}
            alt={product.images[0].altText}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-6">
          {/* <p className="text-sm text-gray-500">{product.color}</p> */}
          <h3 className="mt-1 font-semibold text-gray-900">
            <Link to={`/products/` + product.handle} prefetch="intent">
              <span className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          {/* <p className="mt-1 text-gray-900">{product.price}</p> */}
        </div>
      </div>
    </div>
  );
}
