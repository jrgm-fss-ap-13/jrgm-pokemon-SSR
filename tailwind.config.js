/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
              "on-secondary-container": "#004b76",
              "surface-dim": "#d3d5d5",
              "secondary-fixed-dim": "#8ec9ff",
              "inverse-primary": "#ff5357",
              "on-background": "#2d2f2f",
              "inverse-surface": "#0c0f0f",
              "on-error": "#ffefef",
              "secondary-dim": "#005482",
              "tertiary-dim": "#5b5000",
              "on-primary-fixed-variant": "#60000d",
              "surface-container-low": "#f0f1f1",
              "surface-bright": "#f6f6f6",
              "outline": "#767777",
              "on-secondary": "#ebf3ff",
              "on-secondary-fixed-variant": "#005584",
              "surface": "#f6f6f6",
              "background": "#f6f6f6",
              "on-surface-variant": "#5a5c5c",
              "outline-variant": "#acadad",
              "surface-container-high": "#e1e3e3",
              "tertiary-fixed-dim": "#eed535",
              "on-primary-container": "#4e0009",
              "surface-container-lowest": "#ffffff",
              "on-primary-fixed": "#000000",
              "surface-container-highest": "#dbdddd",
              "on-tertiary-container": "#5d5200",
              "tertiary-container": "#fde343",
              "secondary-fixed": "#acd6ff",
              "tertiary": "#685c00",
              "error": "#b41340",
              "primary-dim": "#a3001d",
              "secondary-container": "#acd6ff",
              "primary-fixed": "#ff7574",
              "surface-tint": "#ba0023",
              "on-tertiary": "#fff3bf",
              "secondary": "#006095",
              "inverse-on-surface": "#9c9d9d",
              "tertiary-fixed": "#fde343",
              "on-error-container": "#510017",
              "on-tertiary-fixed": "#493f00",
              "error-container": "#f74b6d",
              "on-secondary-fixed": "#003758",
              "primary": "#ba0023",
              "on-tertiary-fixed-variant": "#685c00",
              "primary-container": "#ff7574",
              "surface-container": "#e7e8e8",
              "on-primary": "#ffefee",
              "surface-variant": "#dbdddd",
              "error-dim": "#a70138",
              "on-surface": "#2d2f2f",
              "primary-fixed-dim": "#ff595c"
            },
            keyframes: {
              fadeIn: {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              }
            },
            animation: {
              fadeIn: 'fadeIn .2s ease-in-out',
            }
    },
  },
  plugins: [],
}

