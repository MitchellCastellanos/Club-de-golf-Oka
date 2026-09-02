/**
 * Sistema de diseno compartido, extraido de las 3 maquetas HTML
 * (design/mockups/golf-oka-maqueta.html, golf-oka-emails.html,
 * golf-oka-admin.html). Los 3 archivos usan exactamente la misma paleta y
 * tipografia — este es el punto unico de verdad para Next.js (via
 * globals.css) y para los componentes de React Email en fases posteriores.
 */
export const theme = {
  colors: {
    forestDeep: "#14261C",
    forest: "#1E3B2C",
    forestLight: "#3E624A",
    lake: "#3C6E8F",
    lakeLight: "#8FB9CC",
    sand: "#C7A768",
    sandLight: "#E4D5A8",
    paper: "#F3EFE1",
    paperDark: "#E8E0C8",
    ink: "#20241C",
    inkSoft: "#4B5245",
    brass: "#9C6B26",
    white: "#FFFFFF",
    red: "#A9432F",
    greenOk: "#3E624A",
  },
  fonts: {
    serif:
      "Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Times New Roman', serif",
    sans: "'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
  },
} as const;
