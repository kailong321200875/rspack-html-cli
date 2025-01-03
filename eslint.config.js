const { antfu } = require('@antfu/eslint-config')

module.exports = antfu({
  typescript: true,
  vue: false,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,
  formatters: {
    /**
     * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
     * By default uses Prettier
     */
    css: true,
    /**
     * Format HTML files
     * By default uses Prettier
     */
    html: true,
    /**
     * Format Markdown files
     * Supports Prettier and dprint
     * By default uses Prettier
     */
    markdown: 'prettier',
  },
  ignores: ['*-lock', 'dist/*', 'public/*', 'assets/*'],
  rules: {
    'n/prefer-global/process': 'off',
  },
  globals: {
    process: true,
  },
})
