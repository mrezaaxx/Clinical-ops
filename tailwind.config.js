/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        clinic: {
          ink: '#0f172a',
          muted: '#64748b',
          line: '#d9e2ec',
          wash: '#f8fafc',
          teal: '#0f766e',
          tealSoft: '#ccfbf1',
        },
      },
      boxShadow: {
        panel: '0 14px 35px rgba(15, 23, 42, 0.06)',
      },
      borderRadius: {
        clinical: '8px',
      },
    },
  },
  plugins: [],
};
