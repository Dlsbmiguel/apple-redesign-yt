import type { NextApiRequest, NextApiResponse } from "next";
import { fetchCategories } from "../../utils/fetchCategories";

interface Data {
  categories: Category[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categories = await fetchCategories();
  res.status(200).json({ categories });
}
