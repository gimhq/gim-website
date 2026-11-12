import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'app',
    react: true,
    astro: true,
    typescript: true,
    ignores: ['dist/**', '.astro/**', '.tmp/**', 'src/content/docs/**'],
  },
  {
    // Registry output: its house style is the registry's, not ours. Diverging
    // would only make the next `shadcn add` conflict.
    files: ['src/shared/components/ui/**/*.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
)
