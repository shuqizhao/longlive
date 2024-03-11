import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: '/',
    publicPath: '/',
    publicDir:'public',
    plugins: [
      vue()
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        '@img': resolve(__dirname, 'src/assets/img')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`
        }
      }
    },
    server: {
      port: 5173,
      open: true,
      hmr: true,
      proxy: {
        '/api': {
          target: '',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp('^/api'), '')
        }
      }
    },
    build: {
      // sourcemap: true,
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'vuex'],
            'element-plus': ['element-plus'],
            echarts: ['echarts']
          }
        }
      },
      chunkSizeWarningLimit: 1600
    }
  }
})
