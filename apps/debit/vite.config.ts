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
// import inlinePxToRemPlugin from './stylePxToRem'
import vitePluginStyleToVw from 'vite-plugin-style-to-vw'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { PlusProComponentsResolver } from '@plus-pro-components/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'
// import imagemin from 'vite-plugin-imagemin'

export default defineConfig({
  base: './',
  plugins: [
    // imagemin({
    //   gifsicle: { optimizationLevel: 3 }, // GIF 压缩
    //   mozjpeg: { quality: 75 }, // JPEG 质量
    //   optipng: { optimizationLevel: 5 }, // PNG 优化
    //   svgo: {
    //     // SVG 优化
    //     plugins: [
    //       { name: 'removeViewBox' },
    //       { name: 'removeEmptyAttrs', active: false },
    //     ],
    //   },
    //   webp: { quality: 80 }, // WebP 转换
    //   filter: (file: any) => {
    //     return file.size > 1024 // 只压缩大于 1KB 的文件
    //   },
    //   disable: true,
    // }),
    compression({
      // 只能生成js、css的.gz文件
      verbose: true,
      disable: false,
      threshold: 10240, // 压缩阈值，小于这个值的文件将不会被压缩（单位为字节）这里就是大于 10kb 菜压缩
      algorithm: 'gzip', // 压缩算法
      ext: '.gz', // 压缩文件后缀名
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, 'src/assets')],
      symbolId: 'icon-[name]',
      inject: 'body-first',
      customDomId: '__svg__icons__dom__', // svg的id
    }),
    vitePluginStyleToVw({
      allReplace: false,
      unitToConvert: 'px',
      viewportWidth: 100 * 100, // vw时为设计稿宽度，rem时为设计稿对应尺寸时字体大小的100倍
      unitPrecision: 5,
      viewportUnit: 'rem',
      fontViewportUnit: 'rem',
      minPixelValue: 1,
      attributeList: [],
    }),
    vue(),
    AutoImport({
      resolvers: [VantResolver(), ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        VantResolver(),
        ElementPlusResolver(),
        PlusProComponentsResolver(),
      ],
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
            // 拆分node_modules里面的包
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        },
        chunkFileNames: (chunkInfo) => {
          // 增加文件名可靠性
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/')
            : []
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
          return `js/${fileName}/[name].[hash].js`
        },
      },
      plugins: [
        visualizer({
          // 性能报告分析插件（打包后生成html文件）
          filename: 'stats.html', // 默认在项目根目录下生成stats.html文件，可自定义
          open: false, //生成后自动打开浏览器查看
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@packages/components': 'common-components',
      '@packages/assets': 'common-assets',
    },
    extensions: [
      '.js',
      '.mjs',
      '.vue',
      '.json',
      '.less',
      '.css',
      'scss',
      '.ts',
      '.mts',
    ],
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
        }) as any,
      ],
    },
  },
})
