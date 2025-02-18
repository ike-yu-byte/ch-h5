import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import postCssPxToRem from 'postcss-pxtorem'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  // base: '/',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    vueJsx(), // jsx、tsx都用插件
    viteMockServe({
      mockPath: './src/mock',
      enable: true,
      logger: false,
    }),
    legacy({
      // 打包出来的html页面可浏览器直接运行
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  server: {
    port: 5000,
  },
  build: {
    assetsDir: 'assets',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // 分包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/')
            : []
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
          return `js/${fileName}/[name].[hash].js`
        },
      },
    },
  },
  resolve: {
    alias: {
      // "@": path.resolve(__dirname, 'src'),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '@packages': path.resolve(__dirname, './node_modules/@packages'),
      '@packages/components': 'common-components',
      '@packages/assets': 'common-assets',
    },
  },
  define: {
    // 定义一个全局常量
    // 注意配置类型：declare const __APP_VERSION__: string;
    __APP_VERSION__: JSON.stringify('v1.0.0'),
    __API_URL__: JSON.stringify('window.__backend_api_url'),
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 100,
          propList: ['*'],
          selectorBlackList: [],
          // exclude: "/node_modules",
        }),
      ],
    },
  },
})
