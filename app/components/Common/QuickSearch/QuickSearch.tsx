import { Popover, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, type MouseEvent, useEffect, useRef, useState } from "react";
import { Form, Link, useFetcher } from "@remix-run/react";
import { useDebouncedValue } from "~/hooks/useDebouncedValue";
import type { ProductShort } from "~/framework/types/product";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

const RESULT_LIMIT = 4;

export default function QuickSearch() {
  return (
    <Popover>
      <Popover.Button className="-m-2 p-2 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Search</span>
        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
      </Popover.Button>
      <Popover.Overlay className="fixed inset-0 bg-black opacity-30 top-10" />
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        as={Fragment}
      >
        <Popover.Panel className="absolute left-0 top-0 w-full bg-white z-10">
          {({ open, close }) => (
            <QuickSearchContent close={close} open={open} />
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

const QuickSearchContent = ({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) => {
  const { load, data } = useFetcher();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue<string>(query, 250);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [resultsOpen, setResultsOpen] = useState(false);

  useEffect(() => {
    //@ts-ignore
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      //@ts-ignore
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node) &&
      event.target !== inputRef.current
    ) {
      console.log(event.target);
      setResultsOpen(false);
    }
  };

  useEffect(() => {
    const url = new URL("/search", "https://a");
    url.searchParams.set("query", debouncedQuery);
    url.searchParams.set("limit", String(RESULT_LIMIT));
    load(url.pathname + url.search);
  }, [debouncedQuery, load, open]);

  const products = data?.products as ProductShort[] | undefined;
  return (
    <div className="flex flex-col items-center align-center py-6">
      <Form action="/search" className="relative flex max-w-md w-full">
        <div className="grow relative">
          <input
            autoComplete="off"
            ref={inputRef}
            type="text"
            name="query"
            className="w-full"
            value={query}
            onFocus={() => {
              if (query.length > 0) {
                setResultsOpen(true);
              }
            }}
            onChange={(e) => {
              if (e.currentTarget.value.length > 0) {
                setResultsOpen(true);
              }
              setQuery(e.currentTarget.value);
            }}
            autoFocus
          />
          {products && products.length > 0 && resultsOpen && (
            <div
              className="absolute top-full left-0 bg-white w-full"
              ref={wrapperRef}
            >
              <div className=" text-[.6rem] text-gray-400 pt-2 px-6">
                <div className="border-b border-gray-200 w-full tracking-wider">
                  PRODUCTS
                </div>
              </div>
              {[...products].splice(0, RESULT_LIMIT).map((product) => (
                <div
                  key={product.id}
                  className="flex py-2 px-6 space-x-2 items-center"
                >
                  <img
                    src={product.images[0]?.url}
                    alt=""
                    width={60}
                    height={60}
                  />
                  <Link
                    to={`/products/` + product.handle}
                    className="text-sm text-gray-700 uppercase"
                  >
                    {product.title}
                  </Link>
                </div>
              ))}
              {query.length > 0 && (
                <div className="border border-gray-200">
                  <button
                    className="w-full text-xs text-left py-2 px-6 flex justify-between"
                    type="submit"
                  >
                    <span>Search for "{query}"</span>
                    <ArrowRightIcon className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <button
          className="ml-2"
          type="button"
          onClick={() => {
            if (query.length > 0) {
              setQuery("");
            } else {
              close();
            }
          }}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </Form>
    </div>
  );
};
