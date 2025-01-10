/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom_white': '#fff',
      },
      backgroundImage: {
        'custom-gradient': "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        'custom-gradient-2': "radial-gradient( circle farthest-corner at 22.4% 21.7%, rgba(4,189,228,1) 0%, rgba(2,83,185,1) 100.2% )",
        // 'custom-gradient-3': "linear-gradient(to right bottom, #4158d0, #c850c0, #ffcc70)",
        'custom-gradient-main': 'linear-gradient(to right top, #4158d0, #6657d0, #8255ce, #9a54cb, #af52c7, #cf50ba, #e752ab, #fa599c, #ff7183, #ff8f71, #ffae69, #ffcc70)',
        'custom-radial': 'radial-gradient(circle, #4158d0, #6657d0, #8255ce, #9a54cb, #af52c7, #cf50ba, #e752ab, #fa599c, #ff7183, #ff8f71, #ffae69, #ffcc70)',
      },
      textColor: {
        'custom-white': '#fff',
        'custom-navy': "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

