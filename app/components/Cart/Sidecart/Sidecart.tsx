import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useCart, usePrice } from "~/hooks";
import { Link, useFetcher } from "@remix-run/react";
import type { Cart } from "~/framework/types/cart";
import classNames from "~/framework/lib/classNames";
import { useUI } from "~/components/UI/context";

export default function Sidecart() {
  const cart = useCart();
  const { cartOpen, closeCart } = useUI();
  const { price: subtotal } = usePrice({
    amount: cart?.cost.subtotalAmount.amount ?? 0,
    currencyCode: cart?.cost.subtotalAmount.currencyCode ?? "",
  });
  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={closeCart}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-gray-200">
                            {cart?.lines.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <Item item={item} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <DiscountForm />
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{subtotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={closeCart}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const Item = ({ item }: { item: Cart["lines"][0] }) => {
  const fetcher = useFetcher();
  const { price } = usePrice({
    amount: item.product.price.amount,
    currencyCode: item.product.price.currencyCode,
  });
  const variantId = item.product.variantId.split(
    "gid://shopify/ProductVariant/"
  )[1];

  return (
    <>
      <div
        className={classNames(
          "h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200",
          fetcher.state === "submitting" ? "opacity-80" : ""
        )}
      >
        <img
          src={item.product.images[0]?.url}
          alt={item.product.images[0]?.altText}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link
                to={
                  `/products/` + item.product.handle + `?variant=${variantId}`
                }
                prefetch="intent"
              >
                {item.product.title}
              </Link>
            </h3>
            <p className="ml-4">{price}</p>
          </div>
        </div>

        <div className="mb-1">
          {item.product.selectedOptions.map((opt) => (
            <div key={opt.name} className="text-xs">
              {opt.name}: {opt.value}
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-between text-sm">
          <Quantity lineId={item.id} quantity={item.quantity} />

          <div className="flex">
            <fetcher.Form action="/cart?action=remove" method="post">
              <button
                className="font-medium text-indigo-600 hover:text-indigo-500"
                name="lineId"
                value={item.id}
              >
                Remove
              </button>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </>
  );
};

function Quantity({ lineId, quantity }: { lineId: string; quantity: number }) {
  const fetcher = useFetcher();
  return (
    <>
      <label htmlFor={`quantity-${lineId}`} className="sr-only">
        Quantity, {quantity}
      </label>
      <fetcher.Form
        method="post"
        action="/cart?action=quantity"
        className="flex items-center border rounded"
      >
        <input type="hidden" name="id" value={lineId} />
        <button
          name="quantity"
          value={quantity - 1}
          aria-label="Decrease quantity"
          className="w-10 h-10 transition text-primary/50 hover:text-primary disabled:cursor-wait"
        >
          &#8722;
        </button>
        <div>{quantity}</div>
        <button
          name="quantity"
          value={quantity + 1}
          aria-label="Increase quantity"
          className="w-10 h-10 transition text-primary/50 hover:text-primary disabled:cursor-wait"
        >
          &#43;
        </button>
      </fetcher.Form>
    </>
  );
}

const DiscountForm = () => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post" action="/cart?action=applyDiscount">
      <input name="code" />
      <button>Submit</button>
    </fetcher.Form>
  );
};
