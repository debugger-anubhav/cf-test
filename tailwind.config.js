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
        Inter: "Inter",
      },
      colors: {
        primary: "#3E688E",
        offwhite: "#EFECE6",
        "btn-primary": "#F6B704",
        "btn-primary-hover": "#FACC15",
        "3A3A3A": "#3A3A3A",
        "6A6A6A": "#6A6A6A",
        fff: "#ffffff",
        222: "#222",
        "45454A": "#45454A",
        "9A9AA2": "#9A9AA2",
        "71717A": "#71717A",
        EDEDEE: "#EDEDEE",
        ECECEC: "#ECECEC",
        F7F7F8: "#F7F7F8",
        FFCB45: "#FFCB45",
        F6B704: "#F6B704",
        DDDDDF: "#DDDDDF",
        "5774AC": "#5774AC",
        E5EFF4: "#E5EFF4",
        F9F9F9: "#F9F9F9",
      },
      fontSize: {
        "main-head": "40px",
        10: "10px",
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
        xs1: "481px",
        ms: "520px",
        cxl: "1360px",
        macbook: "1440px",
        macbook1: "1400px",
        "3xl": "1660px",
        "4xl": "1850px",
        "last-screen": "2000px",
        custom: "1140px",
      },
      boxShadow: {
        popper_shadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        sticky_btn: "0px -1px 4px 0px #00000040",
      },
      letterSpacing: {
        heading: "-0.4px",
        headingOne: "-0.48px",
        desc: "-0.28px",
        subHeading: "-0.32px",
        desktop_sub_heading: "-0.64px",
        0.36: "-0.36px",
        0.3: "-0.32px",
        0.6: " -0.64px",
        0.24: "-0.24px",
        0.4: " -0.4px",
        0.48: "-0.48px",
      },
      animation: {
        fade: "fadeOut 0.5s ease-in-out",
      },
      spacing: {
        mobile: "calc(100vh - 32px)",
      },

      // that is actual animation
      keyframes: theme => ({
        fadeOut: {
          "0%": {
            opacity: "0.2",
          },
          "25%": {
            opacity: "0.4",
          },
          "50%": {
            opacity: "0.6",
          },
          "75%": {
            opacity: "0.8",
          },
          "100%": {
            opacity: "1",
          },
        },
      }),
    },
  },
  plugins: [],
};

// text-20 tracking-0.4
// text-24 tracking-0.48
// text-16 tracking-0.3
// text-14 tracking-desc
// text-12 tracking-0.24
