/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Poppins: "Poppins",
      },
      colors: {
        primary: "#3E688E",
        "btn-primary": "#F6B704",
        "btn-primary-hover": "#FACC15",
        "3A3A3A": "#3A3A3A",
        "6A6A6A": "#6A6A6A",
      },
      fontSize: {
        "main-head": "40px",
        18: "18px",
        20: "20px",
        14: "14px",
        12: "12px",
        24: "24px",
      },
      lineHeight: {
        "main-head": "140%",
      },
    },
  },
  plugins: [],
};
