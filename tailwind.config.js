/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        main: "#F7FAFC",
      },
      backgroundImage: {
        "hero-pattern":
          "url('/images/bg-layout.png'), linear-gradient(113.88deg, #6B73FF -18.53%, #2949B9 83.91%)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#2949B9",
        secondary: "#2949B9",
        danger: "#EB5757",
        success: "#27AE60",
        muted: "rgb(var(--color-muted) / 0.65)",
        sijaka12: "#4C0033",
        sijaka15: "#950101",
        sijaka24: "#00337C",
        sijaka6: "#0E8388",
        sisukaHaji: "#00818A",
        sisukaPendidikan: "#7D0633",
        sisukaHariTua: "#C02739",
      },
      boxShadow: {
        primary:
          "0px 2px 4px rgba(0, 0, 0, 0.14), 0px 1px 1px rgba(0, 0, 0, 0.1);",
      },
      screens: {
        xs: "300px",
        sm: "320px",
        md: "768px",
        lg: "1023px",
        xl: "1281px",
        "2xl": "1441px",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["checked"],
    },
  },
  plugins: [],
};
