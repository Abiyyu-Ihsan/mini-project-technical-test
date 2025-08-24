/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./shadcn/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
         aspectRatio: {
        "3/2": "3 / 2",
      },
      backgroundColor: {
        main: "#F7FAFC",
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(113.88deg, #6B73FF -18.53%, #2949B9 83.91%), url('/images/bg-layout.png')",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        danger: "#EB5757",
        success: "#27AE60",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        sijaka12: "#4C0033",
        sijaka15: "#950101",
        sijaka24: "#00337C",
        sijaka6: "#0E8388",
        sisukaHaji: "#00818A",
        sisukaPendidikan: "#7D0633",
        sisukaHariTua: "#C02739",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      boxShadow: {
        primary:
          "0px 2px 4px rgba(0, 0, 0, 0.14), 0px 1px 1px rgba(0, 0, 0, 0.1)",
      },
      screens: {
        xs: "300px",
        sm: "320px",
        md: "768px",
        lg: "1023px",
        xl: "1281px",
        "2xl": "1441px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["checked"],
    },
  },
  plugins: [require("tailwindcss-animate")],
};
