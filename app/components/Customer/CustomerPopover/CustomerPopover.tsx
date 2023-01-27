import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { useCustomer } from "~/hooks";
import { Form, Link } from "@remix-run/react";
export default function CustomerPopover() {
  const customer = useCustomer();
  if (!customer) return null;

  return (
    <Popover className="flow-root text-sm lg:relative">
      <Popover.Button className="-m-2 p-2 text-gray-400 hover:text-gray-500">
        <UserIcon className="h-6 w-6" aria-hidden="true" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel className="absolute inset-x-0 top-16 mt-px bg-white pb-2 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-52 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
          <h2 className="sr-only">Customer</h2>
          <div className="flex flex-col items-center py-4">
            <span>Welcome back, {customer.firstName}</span>
            <ul className="divide-y divide-gray-200">
              {accountLinks.map((link) => (
                <li key={link.path} className="flex items-center py-4">
                  <div className="flex-auto">
                    <h3 className="font-medium text-gray-900">
                      <Link to={link.path} prefetch="intent">
                        {link.name}
                      </Link>
                    </h3>
                  </div>
                </li>
              ))}
              <li className="flex items-center py-4">
                <div className="flex-auto">
                  <Form method="post" action="/account/logout">
                    <button className="font-medium text-gray-900">
                      Logout
                    </button>
                  </Form>
                </div>
              </li>
            </ul>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

const accountLinks = [
  {
    name: "Orders",
    path: "/account/orders",
  },
  {
    name: "Addresses",
    path: "/account/addresses",
  },
];
