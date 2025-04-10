import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#5c9ead", // Ghibli teal/blue
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#e8b87d", // Warm sandy color
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "#e07a5f", // Soft terracotta
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#f2f0e6", // Soft cream
          foreground: "#6e7c7c", // Muted teal
        },
        accent: {
          DEFAULT: "#8fc0a9", // Soft sage green
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ghibli: {
          blue: "#5c9ead",
          green: "#8fc0a9",
          sand: "#e8b87d",
          cream: "#f2f0e6",
          terracotta: "#e07a5f",
          navy: "#3d5a80",
          forest: "#4f6d7a",
          slate: "#6e7c7c",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
