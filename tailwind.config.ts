import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryGray: "var(--primary-gray)",
        primaryGray2: "var(--primary-gray-2)",
        secondaryGray:"var(--secondary-gray)",
        primaryPurple:"var(--primary-purple)"
      },
      boxShadow: {
        shadow1: "var(--shadow-1)",
        shadow2:"var(--shadow-2)"
      },
      borderColor: {
        
      },
      
    },
  },
  plugins: [],
};
export default config;
