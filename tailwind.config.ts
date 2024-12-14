import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "898px",
      // xl:"1024px"
    },
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {},
      fontFamily: {
        heading: ["var(--font-camera)", "system-ui", "sans-serif"],
        body: ["var(--font-camera-plain)"],
      },
    },
  },
  plugins: [],
};
export default config;
