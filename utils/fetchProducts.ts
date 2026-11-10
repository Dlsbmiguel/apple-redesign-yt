import groq from "groq";
import { sanityClient } from "../sanity";

const query = groq`*[_type == "product"] {
  _id,
  ...
} | order(_createdAt asc)`;

export const fetchProducts = async () => {
  const products: Product[] = await sanityClient.fetch(query);

  return products;
};
