/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  safelist: [
    {
      pattern: /./,
    },
  ],
  theme: {
    extend: {
      spacing: {
        45: "45rem",
        "90%": "90%",
        "-10": "-10rem",
      },
      animation: {
        appear: "appear 1s forwards",
        bump: "bump 300ms ease-out",
      },
      keyframes: {
        bump: {
          "0%": {
            transform: "scale(1)",
          },
          "10%": {
            transform: "scale(0.9)",
          },
          "30%": {
            transform: "scale(1.1)",
          },
          "50%": {
            transform: "scale(1.15)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        appear: {
          from: {
            opacity: "0",
            transform: "translateY(3rem)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
