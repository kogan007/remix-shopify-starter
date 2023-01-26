import type { Product } from "~/framework/types/product";
import { Tab } from "@headlessui/react";
import {
  useFetcher,
  useLocation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { useState } from "react";

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(" ");
}

type SelectedOptions = {
  [key: string]: string;
};

const getSelectedVariant = (
  variants: Product["variants"],
  options: SelectedOptions
) => {
  return variants.find((variant) => {
    return Object.entries(options).every(([name, value]) => {
      return variant.selectedOptions.some(
        (opt) => opt.name === name && opt.value === value
      );
    });
  })!;
};
export default function ProductView({ product }: { product: Product }) {
  const fetcher = useFetcher();
  const submit = useSubmit();
  const [params] = useSearchParams();
  const selectedVariant = params.get("variant");

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    () => {
      if (selectedVariant) {
        const variant = product.variants.find(
          (variant) =>
            variant.id.split("/ProductVariant/")[1] === selectedVariant
        );

        if (!variant) {
          return product.options.reduce(
            (a, v) => ({ ...a, [v.name]: v.values[0] }),
            {}
          );
        } else {
          return variant.selectedOptions.reduce(
            (a, v) => ({ ...a, [v.name]: v.value }),
            {}
          );
        }
      }
      return product.options.reduce(
        (a, v) => ({ ...a, [v.name]: v.values[0] }),
        {}
      );
    }
  );
  let location = useLocation();
  const variant = getSelectedVariant(product.variants, selectedOptions);

  return (
    <div className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {product.images.map((image) => (
                  <Tab
                    key={image.url}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img
                            src={image.url}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? "ring-indigo-500" : "ring-transparent",
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
              {product.images.map((image) => (
                <Tab.Panel key={image.url}>
                  <img
                    src={image.url}
                    alt={image.altText}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              {/* <p className="text-3xl tracking-tight text-gray-900">
              {product.price}
            </p> */}
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              {/* <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div> */}
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              {/* <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                /> */}
            </div>

            <div className="flex flex-col">
              {product.options.map((opt) => (
                <select
                  key={opt.name}
                  value={selectedOptions[opt.name]}
                  onChange={(e) => {
                    const val = e.currentTarget.value;
                    setSelectedOptions((opts) => ({
                      ...opts,
                      [opt.name]: val,
                    }));
                    const formData = new FormData();
                    formData.append(
                      "variant",
                      getSelectedVariant(product.variants, {
                        ...selectedOptions,
                        [opt.name]: val,
                      }).id.split("/ProductVariant/")[1]
                    );
                    submit(formData);
                  }}
                >
                  {opt.values.map((val) => (
                    <option key={val}>{val}</option>
                  ))}
                </select>
              ))}
            </div>

            <fetcher.Form method="post" action="/cart">
              <input type="hidden" name="id" value={variant?.id} />
              <input type="number" name="quantity" defaultValue={1} />

              <button disabled={!variant?.availableForSale}>
                {!variant?.availableForSale ? "Out of stock" : "Add to cart"}
              </button>
            </fetcher.Form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              {/* <div className="divide-y divide-gray-200 border-t">
                  {product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                              <span
                                className={classNames(
                                  open ? 'text-indigo-600' : 'text-gray-900',
                                  'text-sm font-medium'
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                            <ul role="list">
                              {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div> */}
            </section>
          </div>
        </div>

        <section
          aria-labelledby="related-heading"
          className="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0"
        >
          <h2 id="related-heading" className="text-xl font-bold text-gray-900">
            Customers also bought
          </h2>

          {/* <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((product) => (
                <div key={product.id}>
                  <div className="relative">
                    <div className="relative h-72 w-full overflow-hidden rounded-lg">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                    </div>
                    <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                      />
                      <p className="relative text-lg font-semibold text-white">{product.price}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <a
                      href={product.href}
                      className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                    >
                      Add to bag<span className="sr-only">, {product.name}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div> */}
        </section>
      </div>
    </div>
  );
}
