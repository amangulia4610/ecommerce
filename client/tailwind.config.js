/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f9fafb",      // soft, warm off-white for page backgrounds
        card: "#ffffff",            // pure white for cards and overlays
        primaryText: "#151515",     // rich dark-gray/black for core text
        secondaryText: "#676767",   // medium gray for subtext, captions, timings
        header: "#fbfbfb",          // slightly lighter, airy background for headers
        accentBlue: "#2096F3",      // vivid blue for CTAs, active icons, gradients
        accentGreen: "#18b37c",     // clean, energetic green for success states/buttons
        accentOrange: "#f59e0b",    // warm orange for highlights/notifications
        accentPurple: "#8b5cf6",    // brand purple for premium or standout elements
        divider: "#e5e7eb",         // subtle gray for borders, underlines
        cardShadow: "rgba(35,60,93,0.08)"  // gentle shadow for cards/overlays
      },
      fontFamily: {
        sans: ["'Optima'", "'Inter'", "'Roboto'", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 12px rgba(35,60,93,0.08)",
        soft: "0 2px 8px rgba(35,60,93,0.06)",
      }
    },
  },
  plugins: [],
}