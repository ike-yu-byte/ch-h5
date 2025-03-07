import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        uni: true,
        UniHelper: true,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        /** 允许在.vue 文件中使用 JSX */
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  // 上面都是默认生成的配置，不用动
  {
    // 忽略的文件夹
    ignores: [
      'node_modules',
      'dist',
      'public',
      'public/**/html',
      'apps/**/dist',
      'apps/**/static',
      'apps/**/node_modules',
      'apps/**/uni_modules',
      'packages/**/node_modules',
      'packages/**/wot-design-uni',
      'packages/**/assets',
    ],
  }, // 规则定制
  // prettier配置
  eslintPluginPrettierRecommended,
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      'no-undef': 'off',
      'vue/no-v-text-v-html-on-component': 'off',
      'vue/valid-v-for': 'off',
    },
  },
]
