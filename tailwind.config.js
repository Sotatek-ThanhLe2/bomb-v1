tailwind.config = {
  content: [],
  theme: {
    fontSize: {
      '16-22': ['1rem', '1.375rem'],
      '20-28': ['1.25rem', '2.75rem'],
      '24-32': ['1.5rem', '2rem'],
      '40-40': ['2.5rem', '2.5rem'],
      '50-50': ['3.125rem', '3.125rem'],
      '50-68': ['3.125rem', '4.25rem']
    },
    extend: {
      color: {
        'nav-btn': 'rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'bg1': "url('/img/bg.png')",

      }
    },
  },
  plugins: [],
}