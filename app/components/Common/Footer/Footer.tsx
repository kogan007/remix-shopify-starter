import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Await, useAsyncValue } from "@remix-run/react";
import { Suspense, useState } from "react";
import classNames from "~/framework/lib/classNames";
import { type LocalizationResponse } from "~/framework/types/global";
import { useFooterMenu, useLocalizations } from "~/hooks";

const accountLinks = [
  {
    title: "Login",
    handle: "/account/login",
  },
  {
    title: "Orders",
    handle: "/account/orders",
  },
];
export default function Footer() {
  const menu = useFooterMenu();
  const localizationPromise = useLocalizations();

  return (
    <footer aria-labelledby="footer-heading" className="bg-gray-900 mt-auto">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              <div>
                <h3 className="text-sm font-medium text-white">Shop</h3>
                <ul className="mt-6 space-y-6">
                  {menu.footerShop.items.map((item) => (
                    <li key={item.title} className="text-sm">
                      <a
                        href={item.handle}
                        className="text-gray-300 hover:text-white"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Company</h3>
                <ul className="mt-6 space-y-6">
                  {menu.footerCompany.items.map((item) => (
                    <li key={item.title} className="text-sm">
                      <a
                        href={item.handle}
                        className="text-gray-300 hover:text-white"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              <div>
                <h3 className="text-sm font-medium text-white">Account</h3>
                <ul className="mt-6 space-y-6">
                  {accountLinks.map((item) => (
                    <li key={item.title} className="text-sm">
                      <a
                        href={item.handle}
                        className="text-gray-300 hover:text-white"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Connect</h3>
                <ul className="mt-6 space-y-6">
                  {menu.footerSocial.items.map((item) => (
                    <li key={item.title} className="text-sm">
                      <a
                        href={item.handle}
                        className="text-gray-300 hover:text-white"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-16 xl:mt-0">
            <h3 className="text-sm font-medium text-white mb-2">Country</h3>
            <Suspense fallback="">
              <Await resolve={localizationPromise}>
                <CountrySelector />
              </Await>
            </Suspense>
          </div>
        </div>

        <div className="border-t border-gray-800 py-10">
          <p className="text-sm text-gray-400">
            Copyright &copy; 2021 Your Company, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}

const CountrySelector = () => {
  const availableCountries =
    useAsyncValue() as LocalizationResponse["localization"]["availableCountries"];
  const [country, setCountry] = useState(
    availableCountries.find((country) => country.isoCode === "US")!
  );

  return (
    <div className="relative">
      <Listbox onChange={setCountry}>
        {({ open }) => {
          return (
            <>
              <Listbox.Button
                className={`flex items-center justify-between w-full py-3 px-4 border text-white`}
              >
                <span className="">{country.name}</span>
                <ChevronDownIcon
                  className={classNames(
                    "h-4 w-4 transition-all ease-in-out",
                    open ? "rotate-180" : ""
                  )}
                />
              </Listbox.Button>

              <Listbox.Options
                className={`bg-[#141414] absolute bottom-12 z-10 grid
                h-36 w-full overflow-y-scroll rounded-t border dark:border-white px-2 py-2
                transition-[max-height] duration-150 sm:bottom-auto md:rounded-b md:rounded-t-none
                md:border-t-0 md:border-b `}
              >
                {availableCountries.map((country) => (
                  <Listbox.Option key={country.isoCode} value={country}>
                    {({ active }) => (
                      <div className={`text-white dark:text-primary p-2`}>
                        {country.name}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </>
          );
        }}
      </Listbox>
    </div>
  );
};
