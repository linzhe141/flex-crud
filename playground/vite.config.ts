import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export default defineConfig({
  resolve: {
    // 直接使用源码
    alias: [
      {
        find: 'flex-crud',
        replacement: path.join(__dirname, '..', 'packages/flex-crud/index.ts'),
      },
      {
        find: /^@flex-crud\/(.+)$/,
        replacement: path.join(__dirname, '..', 'packages', '$1', 'index.ts'),
      },
    ],
  },
  plugins: [vue(), tailwindcss()],
})
