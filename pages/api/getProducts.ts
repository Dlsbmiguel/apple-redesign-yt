import type { NextApiRequest, NextApiResponse } from "next";
import { fetchProducts } from "../../utils/fetchProducts";

interface Data {
  products: Product[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const products = await fetchProducts();
  res.status(200).json({ products });
}
