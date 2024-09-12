// @ts-check

import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    ignores: [
      '**/*.d.ts',
      '*.js',
      'node_modules/**/*',
    ],
    files: ['*.ts'],
  },
);
