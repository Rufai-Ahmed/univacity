import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'selector',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'dark-background-one': '#071537',
        'dark-background': '#1F222E',
        'dark-text': '#E0E0E0',
        'light-background': '#FFFFFF',
        'light-text': '#FFFFFF',
        'light-text-two': '#C4C9D4',
      },
      fontFamily: {
        'neue-hass': ['Neue Haas Display Roman', 'sans-serif'],
      },
      backgroundImage: {
        content_one: "url('/assets/images/content_one.jpg')",
        content_two: "url('/assets/images/content_two.jpg')",
      },
    },
  },
  plugins: [],
};

export default config;
