// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    ignores: [
      '**/*.d.ts',
      '*.js',
      'node_modules/**/*',
    ],
    files: ['*.ts'],
  },
);
