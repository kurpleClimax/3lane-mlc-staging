/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "360px",
      xsm: "450px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    },
    extend: {
      fontFamily: {
        pbsKidsHeadline: "PBS KIDS Headline, Arial, sans-serif",
        cubano: "Cubano, Arial, sans-serif",
        openSans: "Open Sans, Arial, sans-serif",
        roboto: "Roboto, Arial, sans-serif",
      },
      fontSize: {
        large: ["6.25rem", "5.5rem"], // 100px, 88px
        h1: ["5rem", "5.5rem"], // 80px, 88px
        h2: ["3rem", "3.5rem"], // 48px, 56px
        h3: ["2.5rem", "3rem"], // 40px, 48px
        h4: ["2rem", "2.5rem"], // 32px, 40px
        p1: ["1.5rem", "2rem"], // 24px, 32px
        p2: ["1.25rem", "1.75rem"], // 20px, 28px
        p3: ["1.125rem", "1.625rem"], // 18px, 26px
        p4: ["1rem", "1.5rem"], // 16px, 24px
      },
      colors: {
        "brand-navy": "#0A145A",
        "brand-blue-dark": "#0F1E8C",
        "brand-blue": "#0C566F",
        "brand-denim-blue": "#1068A8",
        "brand-blue-light-primary": "#0E6481",
        "brand-blue-light-secondary": "#107293",
        "brand-blue-light": "#5f86be",
        "brand-sky-blue": "#54A4DB",
        "brand-royal-blue": "#1180D0",
        "brand-orange-light": "#FEC461",
        "brand-pumpkin-orange": "#F79226",
        "brand-yellow": "#F6D579",
        "brand-golden-yellow": "#F2AE1D",
        "brand-mustard-yellow": "#F9BD19",
        "brand-yellow-light": "#F7DB8D",
        "brand-pale-yellow": "#F8E1A0",
        "brand-peach": "#FFF0D9",
        "brand-light-peach": "#FFDCA8",
        "brand-pink": "#F27BAA",
        "brand-cyan": "#6a979a",
        "brand-turquoise-dark": "#00A3A3",
        "brand-turquoise": "#00B8B8",
        "brand-turquoise-light": "#0CC",
        "brand-green": "#079247",
        "brand-green-secondary": "#6DC067",
        "brand-lime-green": "#8DC641",
        "brand-light-green": "#d9fab4",
        "brand-black-darker": "#010101",
        "brand-black": "#525252",
        "brand-black-secondary": "#262626",
        "brand-light-grey": "#F5F5F5",
        "brand-neutral-2": "#F0F5F9",
        "brand-neutral-3": "#C6DDFF",
        "brand-grey-2": "#EBEBEB",
        "brand-grey": "#D6D6D6",
        "brand-gray": "#737373",
        "brand-dark-gray": "#636363",
      },
    },
  },

  safelist: [
    {
      pattern:
        /(bg|text|border)-(brand-navy|brand-blue-dark|brand-blue|brand-denim-blue|brand-blue-light-primary|brand-blue-light-secondary|brand-blue-light|brand-sky-blue|brand-royal-blue|brand-orange-light|brand-pumpkin-orange|brand-yellow|brand-golden-yellow|brand-mustard-yellow|brand-yellow-light|brand-pale-yellow|brand-peach|brand-light-peach|brand-pink|brand-cyan|brand-turquoise-dark|brand-turquoise|brand-turquoise-light|brand-green|brand-green-secondary|brand-lime-green|brand-light-green|brand-black-darker|brand-black|brand-black-secondary|brand-light-grey|brand-neutral-2|brand-neutral-3|brand-grey-2|brand-grey|brand-gray|brand-dark-gray)/,
    },
  ],
  plugins: [],
};
