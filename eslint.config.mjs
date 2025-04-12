import nx from '@nx/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              "sourceTag": "type:app",
              "onlyDependOnLibsWithTags": [
                "type:feature",
                "type:util",
              ]
            },
            {
              "sourceTag": "type:feature",
              "onlyDependOnLibsWithTags": [
                "type:feature",
                "type:ui",
                "type:util",
                "type:data-access"
              ]
            },
            {
              "sourceTag": "type:ui",
              "onlyDependOnLibsWithTags": [
                "type:ui",
                "type:util"
              ]
            },
            {
              "sourceTag": "type:util",
              "onlyDependOnLibsWithTags": [
                "type:util",
                "type:plugin"
              ]
            },
            {
              "sourceTag": "type:data-access",
              "onlyDependOnLibsWithTags": [
                "type:data-access",
                "type:util"
              ]
            }
          ],
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Angular related packages come first.
            ['^@angular'],
            // RxJS imports.
            ['^rxjs', '^apollo-angular','^@vendure'],
            // Third-party packages.
            ['^@?\\w'],
            // Side effect imports.
            ['^\\u0000'],
            // Absolute imports with the prefix @ui.
            ['^@product-hunt'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
