import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shuffleCycle: {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(-3deg)' },
          '45%': { transform: 'translate3d(-90%, -50px, 50px) rotate(-10deg)' },
          '75%': { transform: 'translate3d(-40%, 10px, -100px) rotate(-4deg)', opacity: '1' },
          '100%': { transform: 'translate3d(0, 0, -60px) rotate(2deg)', opacity: '1' },
        },
        fadeInRight: {
          'from': { opacity: '0', transform: 'translateX(-10px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateX(-20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fadeIn: 'fadeIn 0.2s ease-out',
        slideUp: 'slideUp 0.3s ease-out',
        slideIn: 'slideIn 0.3s ease-out forwards',
        shuffleCycle: 'shuffleCycle 0.75s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        fadeInRight: 'fadeInRight 0.4s ease-out backwards',
      },
    },
  },
  plugins: [],
};
export default config;