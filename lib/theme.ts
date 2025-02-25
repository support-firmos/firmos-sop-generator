// lib/theme.ts
export const theme = {
    colors: {
      primary: {
        vampireBlack: "#0A0303", // Dark background
        hex: "#121212",
      },
      secondary: {
        cultured: "#F7F4F4", // Light text
        hex: "#F8F8F8",
      },
      accent: {
        argent: "#BFBFBF", // Mid-tone
        hex: "#BFBFBF",
      },
      surface: {
        level1: "#141414",
        level2: "#1A1A1A",
        level3: "#202020",
      },
      gradient: {
        primary: "linear-gradient(165deg, #0A0303, #141414)",
        card: "linear-gradient(165deg, #141414, #1A1A1A)",
        hover: "linear-gradient(165deg, #1A1A1A, #202020)"
      }
    },
    typography: {
      heading: "Inter",
      body: "Inter",
      weights: {
        bold: 700,
        medium: 500,
      }
    },
    shadows: {
      sm: "0 4px 6px rgba(0, 0, 0, 0.2)",
      md: "0 8px 12px rgba(0, 0, 0, 0.25)",
      lg: "0 12px 24px rgba(0, 0, 0, 0.3)",
    }
  };