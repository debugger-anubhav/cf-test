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
        offwhite: "#EFECE6",
        "btn-primary": "#F6B704",
        "btn-primary-hover": "#FACC15",
        "3A3A3A": "#3A3A3A",
        "6A6A6A": "#6A6A6A",
        fff: "#ffffff",
        "45454A": "#45454A",
        "9A9AA2": "#9A9AA2",
        "71717A": "#71717A",
        EDEDEE: "#EDEDEE",
        ECECEC: "#ECECEC",
        F7F7F8: "#F7F7F8",
        FFCB45: "#FFCB45",
        F6B704: "#F6B704",
        DDDDDF: "#DDDDDF",
      },
      fontSize: {
        "main-head": "40px",
        18: "18px",
        16: "16px",
        20: "20px",
        14: "14px",
        12: "12px",
        24: "24px",
        32: "32px",
      },
      lineHeight: {
        "main-head": "140%",
      },
      screens: {
        mobile: "360px",
        xs: "428px",
        macbook: "1440px",
        "3xl": "1660px",
        "last-screen": "2000px",
      },
      letterSpacing: {
        heading: "-0.4px",
        headingOne: "-0.48px",
        desc: "-0.28px",
        subHeading: "-0.32px",
        desktop_sub_heading: "-0.64px",
        0.3: "-0.32px",
        0.6: " -0.64px",
        0.24: "-0.24px",
      },
    },
  },
  plugins: [],
};
