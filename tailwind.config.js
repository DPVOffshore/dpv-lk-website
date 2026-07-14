/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#EC4A0A",
          "orange-light": "#FF6B35",
          "orange-alt": "#FF5722",
          "orange-dark": "#D44309",
          purple: "#251A66",
          "logo-red": "#E23B47",
          "logo-navy": "#8AA0E6",
          dark: "#1A1A1A",
          "dark-footer": "#1C1C1C",
          "dark-hero": "#0B0D12",
          section: "#F8FAFC",
          cta: "#E0DEF7",
          "text-secondary": "#4A4A68",
        },
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          alt: "rgb(var(--surface-alt) / <alpha-value>)",
          card: "rgb(var(--surface-card) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          secondary: "rgb(var(--ink-secondary) / <alpha-value>)",
        },
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        dmsans: ["var(--font-dm-sans)", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
      },
      boxShadow: {
        btn: "0 4px 20px rgba(236,74,10,0.28), 0 8px 40px rgba(236,74,10,0.14)",
        "btn-hover": "0 10px 36px rgba(236,74,10,.44), 0 20px 64px rgba(236,74,10,.22)",
        card: "0 4px 24px rgba(37,26,102,0.10)",
        "card-lg": "0 20px 60px rgba(37,26,102,0.12)",
        nav: "0 1px 8px rgba(0,0,0,0.08)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "marquee-fast": "marquee 22s linear infinite",
        "marquee-slow": "marquee 30s linear infinite",
        fadeUp: "fadeUp 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
