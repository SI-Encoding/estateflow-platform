import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        estate: {
          gold: '#f3c66a',
          ink: '#102438',
          pine: '#183d38',
        },
      },
      boxShadow: {
        glow: '0 24px 80px rgba(0, 0, 0, 0.28)',
      },
    },
  },
} satisfies Config
