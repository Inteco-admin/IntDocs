module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0b5c57',
        'gray-background': '#f7f8fc',
        'open': '#ffa607',
        'void': '#bbc9d2',
        'inwork': '#0a7cda',
        'indispute': '#ff495d',
        'ready': '#7977d9',
        'close': '#bbc9d2',
        'notapproved': '#ff495d',
        'pending': '#bbc9d2'
      },
      spacing: {
        70: '17.5rem',
        175: '43.75rem',
        104: '26rem',
        240: '60rem',
      },
      maxWidth: {
        custom: '87.5rem',

      },
      boxShadow: {
        card: '4px  4px 15px 0 rgba(36, 37, 38, 0.08)',
        dialog: '3px  4px 15px 0 rgba(36, 37, 38, 0.22)',
      },
      fontFamily: {
        sans: ['Mulish'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
