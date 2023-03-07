/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Rubik", "sans-serif"]
      },
      colors: {
        base: {
          "0": "#040E1B",
          "1": "#1B2534",
          "2": "#2D3B4E",
          "3": "#506178",
          "4": "#7B8FAB",
          "5": "#CBDFFB",
        },
        neutral: {
          "0": "#FFFFFF",
          "1": "#F5F5F5",
          "2": "#EDEDED",
          "3": "#E0E0E0",
          "4": "#C2C2C2",
          "5": "#9E9E9E",
          "6": "#757575",
          "7": "#616161",
          "8": "#404040",
          "9": "#0A0A0A",
        },
        primary: {
          "main": "#1D6ED6",
          "surface": "#CCCCCC",
          "border": "#185CB2",
          "pressed": "#0E376B",
          "focus": "#8BB3E7",
        },
        success: {
          "main": "#24B97A",
          "surface": "#B6E8D3",
          "border": "#1E9A66",
          "pressed": "#125C3D",
          "focus": "#63D7A5",
        },
        error: {
          "main": "#FF5E5E",
          "surface": "#FDCACA",
          "border": "#CF5151",
          "pressed": "#7D3131",
          "focus": "#FA8989",
        },
        warning: {
          "main": "#F5A623",
          "surface": "#FCE1B6",
          "border": "#CC8A1D",
          "pressed": "#AB570A",
          "focus": "#F7B955",
        },
        accent: {
          "0": "#FF0080",
          "1": "#50E3C2",
          "2": "#8A63D2",
          "3": "#F3CC67",
          "4": "#2C64AC",
          "5": "#8025C5",
          "6": "#D66666",
          "7": "#00CEDB",
          "8": "#86DE60",
          "9": "#FFF5DB",
        },
        other: {
          "riot": "#EB0029",
          "discord": "#5865F2",
          "ea": "#FF4747"
        }
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
};
