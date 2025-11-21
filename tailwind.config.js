/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#FF4D4F",
          secondary: "#FFA940",
          muted: "#F5F5F5"
        }
      }
    }
  }
};
