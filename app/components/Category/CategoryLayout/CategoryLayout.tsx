import { Form, Link, useSubmit } from "@remix-run/react";
import type { Collection } from "~/framework/types/collection";

export default function CategoryLayout({ data }: { data: Collection }) {
  const submit = useSubmit();
  return (
    <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
      <div className="border-b border-gray-200 pt-24 pb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          New Arrivals
        </h1>
        <p className="mt-4 text-base text-gray-500">
          Checkout out the latest release of Basic Tees, new and improved with
          four openings!
        </p>
      </div>

      <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <aside>
          <h2 className="sr-only">Filters</h2>
          {/* 
              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700">Filters</span>
                <PlusIcon className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              </button> */}

          <div className="hidden lg:block">
            <Form
              className="space-y-10 divide-y divide-gray-200"
              onChange={(e) => submit(e.currentTarget)}
            >
              <div>
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-900">
                    Price
                  </legend>
                  <div className="space-y-3 pt-6">
                    <div>
                      <input
                        name="gte"
                        type="number"
                        placeholder="From"
                        defaultValue={0}
                      />
                    </div>
                    <div>
                      <input name="lte" type="number" placeholder="To" />
                    </div>
                  </div>
                </fieldset>
              </div>
            </Form>
          </div>
        </aside>

        <section
          aria-labelledby="product-heading"
          className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
        >
          <h2 id="product-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
            {data.products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                  <img
                    src={product.images[0].url}
                    alt={product.images[0].altText}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <Link to={`/products/` + product.handle}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>

                  <div className="flex flex-1 flex-col justify-end">
                    {/* <p className="text-base font-medium text-gray-900">{product.price}</p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
