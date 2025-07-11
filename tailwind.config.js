/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }

      xxl: "1400px",
      // => @media (min-width: 1400px) { ... }
    },
    extend: {
      fontFamily: {
        // Add your custom fonts
        dmSans: ["DM Sans", "sans-serif"],
        clashDisplay: ["Clash Display", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        spaceGrotesk: ["Space Grotesk", "sans-serif"],
        plusJakarta: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },

      colors: {
        colorCodGray: "#191919",
        colorOrangyRed: "#FFE3A9",
        colorLinenRuffle: "#EFEAE3",
        colorViolet: "#0B1D51",
        colorGreen: "#3A4767",
        darkGreen: "#219c0b",
        colorItera: "#c8b579",
        colorDarkBlue: "#2A1458",
        colorUngu: "#6963ac"
      },
    },
  },
  plugins: [],
}

