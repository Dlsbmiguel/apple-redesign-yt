import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../utils/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionId = req.query.sessionId as string;

  const session = await stripe.checkout.sessions.listLineItems(sessionId);

  res.status(200).json({ session });
}
