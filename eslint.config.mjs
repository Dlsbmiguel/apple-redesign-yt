import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      // Separate Sanity Studio projects
      "appleredesignyt/**",
      "sanity-v3/**",
    ],
  },
];

export default eslintConfig;
