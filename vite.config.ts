import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: '@API', replacement: '/src/API' },
      { find: '@Components', replacement: '/src/Components' },
      { find: '@Contexts', replacement: '/src/Contexts' },
      { find: '@Hooks', replacement: '/src/Hooks' },
      { find: '@Icons', replacement: '/src/Icons' },
      { find: '@Layouts', replacement: '/src/Layouts' },
      { find: '@Pages', replacement: '/src/Pages' },
      { find: '@Routes', replacement: '/src/Routes' },
      { find: '@Store', replacement: '/src/Store' },
      { find: '@Styles', replacement: '/src/Styles' },
      { find: '@Types', replacement: '/src/Types' },
      { find: '@', replacement: '/src' },
    ],
  },
});
