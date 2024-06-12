// Suggested code may be subject to a license. Learn more: ~LicenseLog:573882424.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1495636491.
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/scss/_variables.scss";`
      }
    }
  }
})
