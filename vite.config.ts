import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: '@Components', replacement: '/src/Components' },
      { find: '@Icons', replacement: '/src/Icons' },
      { find: '@Layouts', replacement: '/src/Layouts' },
      { find: '@Page', replacement: '/src/Page' },
      { find: '@Styles', replacement: '/src/Styles' },
      { find: '@', replacement: '/src' },
    ],
  },
});
