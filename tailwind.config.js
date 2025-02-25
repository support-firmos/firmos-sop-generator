/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vampireBlack: '#0A0303',
        cultured: '#F7F4F4',
        argent: '#BFBFBF',
        surface: {
          1: '#141414',
          2: '#1A1A1A',
          3: '#202020',
        }
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(165deg, #0A0303, #141414)',
        'gradient-card': 'linear-gradient(165deg, #141414, #1A1A1A)',
        'gradient-hover': 'linear-gradient(165deg, #1A1A1A, #202020)',
      },
      boxShadow: {
        'sm': '0 4px 6px rgba(0, 0, 0, 0.2)',
        'md': '0 8px 12px rgba(0, 0, 0, 0.25)',
        'lg': '0 12px 24px rgba(0, 0, 0, 0.3)',
      },
      typography: (theme) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.cultured'),
            '--tw-prose-headings': theme('colors.cultured'),
            '--tw-prose-lead': theme('colors.argent'),
            '--tw-prose-links': theme('colors.cultured'),
            '--tw-prose-bold': theme('colors.cultured'),
            '--tw-prose-counters': theme('colors.argent'),
            '--tw-prose-bullets': theme('colors.argent'),
            '--tw-prose-hr': theme('colors.surface.1'),
            '--tw-prose-quotes': theme('colors.cultured'),
            '--tw-prose-quote-borders': theme('colors.surface.2'),
            '--tw-prose-captions': theme('colors.argent'),
            '--tw-prose-code': theme('colors.cultured'),
            '--tw-prose-pre-code': theme('colors.cultured'),
            '--tw-prose-pre-bg': theme('colors.surface.1'),
            '--tw-prose-th-borders': theme('colors.surface.2'),
            '--tw-prose-td-borders': theme('colors.surface.1'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};