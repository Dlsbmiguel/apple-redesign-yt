import groq from "groq";
import { sanityClient } from "../sanity";

const query = groq`*[_type == "category"] {
  _id,
  ...
}`;

export const fetchCategories = async () => {
  const categories: Category[] = await sanityClient.fetch(query);

  return categories;
};
