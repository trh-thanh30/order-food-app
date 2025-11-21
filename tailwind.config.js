/** @type {import("tailwindcss").Config} */

let presets = [];

// Only load nativewind preset if it exists
try {
  if (process.env.NODE_ENV !== 'test') {
    presets = [require('nativewind/preset')];
  }
} catch (e) {
  // Preset not available, continue without it
  console.warn('NativeWind preset not available');
}

module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: presets,
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FF4D4F',
          secondary: '#FFA940',
          muted: '#F5F5F5',
        },
      },
    },
  },
};
