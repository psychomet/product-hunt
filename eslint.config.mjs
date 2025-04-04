import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
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
                "type:feature"
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
                "type:util"
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
