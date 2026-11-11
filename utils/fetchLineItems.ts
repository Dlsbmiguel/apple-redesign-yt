import { stripe } from "./stripe";

export const fetchLineItems = async (sessionId: string) => {
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

  return lineItems.data as unknown as StripeProduct[];
};
