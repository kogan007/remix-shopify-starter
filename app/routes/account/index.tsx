import { type LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { config } from "~/framework";
import { type Order } from "~/framework/types/account";

export async function loader({ request }: LoaderArgs) {
  return await config.operations.account.getAccount(request);
}
export default function Account() {
  const account = useLoaderData<typeof loader>();
  if (!account) return null;

  return (
    <div className="mt-6 max-w-3xl mx-auto">
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
        <h2 className="font-bold text-lead">Order History</h2>
        {account.orders?.length ? (
          <Orders orders={account.orders} />
        ) : (
          <EmptyOrders />
        )}
      </div>
      <AccountDetails
        firstName={account.firstName}
        lastName={account.lastName}
        email={account.email}
        phone={account.phone}
      />
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const legacyOrderId = order.id.split("/").pop()?.split("?")[0];
  return (
    <li className="grid text-center border rounded">
      <Link
        className="grid items-center gap-4 p-4 md:gap-6 md:p-6 md:grid-cols-2"
        to={`/account/orders/${legacyOrderId}`}
      >
        {/* {lineItems[0].variant?.image && (
          <div className="card-image aspect-square bg-primary/5">
            <Image
              width={168}
              height={168}
              widths={[168]}
              className="w-full fadeIn cover"
              alt={lineItems[0].variant?.image?.altText ?? 'Order image'}
              // @ts-expect-error Stock line item variant image type has `url` as optional
              data={lineItems[0].variant?.image}
              loaderOptions={{scale: 2, crop: 'center'}}
            />
          </div>
        )} */}
        <div className={`flex-col justify-center text-left`}>
          <dl className="grid grid-gap-1">
            <dt className="sr-only">Order ID</dt>
            <dd>
              <div>Order No. {order.orderNumber}</div>
            </dd>
            <dt className="sr-only">Order Date</dt>
            <dd>
              <div>{new Date(order.processedAt).toDateString()}</div>
            </dd>
            <dt className="sr-only">Fulfillment Status</dt>
            <dd className="mt-2">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  order.fulfillmentStatus === "FULFILLED"
                    ? "bg-green-100 text-green-800"
                    : "bg-primary/5 text-primary/50"
                }`}
              >
                <div>{order.fulfillmentStatus}</div>
              </span>
            </dd>
          </dl>
        </div>
      </Link>
      <div className="self-end border-t">
        <Link
          className="block w-full p-2 text-center"
          to={`/account/orders/${legacyOrderId}`}
        >
          <div className="ml-3">View Details</div>
        </Link>
      </div>
    </li>
  );
}

function EmptyOrders() {
  return (
    <div>
      <div className="mb-1">You haven&apos;t placed any orders yet.</div>
      <div className="w-48">
        <button className="text-sm mt-2 w-full">Start Shopping</button>
      </div>
    </div>
  );
}

function Orders({ orders }: { orders: Order[] }) {
  return (
    <ul className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </ul>
  );
}

function AccountDetails({
  firstName,
  lastName,
  phone,
  email,
}: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const close = () => setIsEditing(false);

  return (
    <>
      {/* {isEditing ? (
        <Modal close={close}>
          <Seo type="noindex" data={{title: 'Account details'}} />
          <AccountDetailsEdit
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            email={email}
            close={close}
          />
        </Modal>
      ) : null} */}
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
        <h3 className="font-bold text-lead">Account Details</h3>
        <div className="lg:p-8 p-6 border border-gray-200 rounded">
          <div className="flex">
            <h3 className="font-bold text-base flex-1">Profile & Security</h3>
            <button
              className="underline text-sm font-normal"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
          <div className="mt-4 text-sm text-primary/50">Name</div>
          <p className="mt-1">
            {firstName || lastName
              ? (firstName ? firstName + " " : "") + lastName
              : "Add name"}{" "}
          </p>

          <div className="mt-4 text-sm text-primary/50">Contact</div>
          <p className="mt-1">{phone ?? "Add mobile"}</p>

          <div className="mt-4 text-sm text-primary/50">Email address</div>
          <p className="mt-1">{email}</p>

          <div className="mt-4 text-sm text-primary/50">Password</div>
          <p className="mt-1">**************</p>
        </div>
      </div>
    </>
  );
}
