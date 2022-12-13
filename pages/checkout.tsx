import Head from "next/head";
import Header from "../components/Header";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { selectBasketItems, selectBasketTotal } from "../redux/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { Stripe } from "stripe";
import { fetchPostJSON } from "../utils/apiHelpers";
import getStripe from "../utils/getStripejs";

const Checkout = () => {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const router = useRouter();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {} as { [key: string]: Product[] });

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  const createCheckoutSession = async () => {
    setLoading(true);

    const checkOutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_sessions",
      { items: items }
    );

    // Internal server error
    if ((checkOutSession as any).statusCode === 500) {
      console.error((checkOutSession as any).message);
      return;
    }

    // Redirect to Stripe Checkout
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as argument here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkOutSession.id,
    });

    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    setLoading(false);
  };

  return (
    <div className="bg-[ min-h-screen overflow-hidden bg-[#E7ECEE]">
      <Head>
        <title>Bag - Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="max-w-5xl pb-24 mx-auto">
        <div className="px-5">
          <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
            {items.length > 0 ? "Review your bag." : "Your bag is empty."}
          </h1>
          <p className="my-4">Free delivery and free returns.</p>
          {items.length === 0 && (
            <Button
              title="Continue Shopping"
              onClick={() => router.push("/")}
            />
          )}
        </div>

        {items.length > 0 && (
          <div className="mx-5 md:mx-8">
            {Object.entries(groupedItemsInBasket).map(([key, item]) => (
              <CheckoutProduct key={key} id={key} items={item} />
            ))}

            <div className="max-w-5xl my-12 mt-6 ml-auto ">
              <div className="divide-y divide-gray-300">
                <div className="pb-4">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                      <Currency quantity={basketTotal} currency="USD" />
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-x-1 lg:flex-row">
                      Estimated tax for:{" "}
                      <p className="flex items-end text-blue-500 cursor-pointer hover:underline">
                        Enter zip code
                        <ChevronDownIcon className="w-6 h-6 " />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>

                <div className="flex justify-between pt-4 text-xl font-semibold">
                  <h4>Total</h4>
                  <h4>
                    <Currency quantity={basketTotal} currency="USD" />
                  </h4>
                </div>
              </div>

              <div className="space-y-4 my-14">
                <h4 className="text-xl font-semibold">
                  How would you like to check out?
                </h4>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex flex-col items-center flex-1 order-2 p-8 py-12 text-center bg-gray-200 rounded-xl">
                    <h4 className="flex flex-col mb-4 text-xl font-semibold">
                      <span>Pay Monthly</span>
                      <span>with Apple Card</span>
                      <span>
                        $283.16/mo at 0% ARP <sup className="-top-1">◊</sup>
                      </span>
                    </h4>
                    <Button title="Check Out with Apple Card Monthly Installments" />
                    <p className="mt-2 max-w-[240px] text-[13px]">
                      $0.00 due today, which includes applicable full-price
                      items, down payments, shipping, and taxes.
                    </p>
                  </div>
                  <div className="flex flex-col items-center flex-1 p-8 py-12 space-y-8 bg-gray-200 rounded-xl md:order-2">
                    <h4 className="flex flex-col mb-4 text-xl font-semibold">
                      Pay in full
                      <span>
                        <Currency quantity={basketTotal} currency="USD" />
                      </span>
                    </h4>
                    <Button
                      noIcon
                      loading={loading}
                      title="Check Out"
                      width="w-full"
                      onClick={createCheckoutSession}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
