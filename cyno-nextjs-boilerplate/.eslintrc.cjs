/** @type {import("eslint").Linter.Config} */
const config = {
  globals: {
    Headers: 'readonly',
    fetch: 'readonly',
    localStorage: 'readonly',
    Request: 'readonly',
    RequestInfo: 'readonly', // eslint-disable-line no-restricted-syntax
    RequestInit: 'readonly',
    Response: 'readonly',
    sessionStorage: 'readonly',
    Storage: 'readonly',
    URL: 'readonly',

    // DOM
    window: 'readonly',
    document: 'readonly',
    HTMLButtonElement: 'readonly',
    HTMLInputElement: 'readonly',
    HTMLOptionElement: 'readonly',
    HTMLSelectElement: 'readonly',
    HTMLTextAreaElement: 'readonly',
    RadioNodeList: 'readonly', // eslint-disable-line no-restricted-syntax
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: true,
    sourceType: 'module',
  },

  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ],
      },
    },
  },

  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'eslint:recommended',
    'plugin:tailwindcss/recommended',
  ],

  plugins: [
    '@typescript-eslint',
    'tailwindcss'
  ],

  rules: {
    // Next specific rules
    '@next/next/no-img-element': 'error',
    '@next/next/no-html-link-for-pages': 'error',

    // TypeScript specific rules
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',

    // React specific rules
    'react/prop-types': 'error',
    'react/jsx-key': 'error',
    'react/no-unused-state': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/no-array-index-key': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-pascal-case': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/self-closing-comp': 'error',
    'react/jsx-curly-brace-presence': 'error',
    'react/no-deprecated': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/no-children-prop': 'error',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration'],
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],
    'react/no-typos': 'error',
    'react/forbid-prop-types': 'error',
    'react/no-unused-prop-types': 'error',
    'react/jsx-boolean-value': 'error',
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],
    'react/no-multi-comp': [
      'error',
      {
        ignoreStateless: true,
      },
    ],
    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: 1,
        when: 'multiline'
      },
    ],
    'react/jsx-first-prop-new-line': [
      'error',
      'multiline'
    ],
    'react/jsx-closing-bracket-location': [
      'error',
      'line-aligned'
    ],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-indent-props': [
      'error',
      2
    ],
    'react/jsx-one-expression-per-line': [
      'error',
      {
        allow: 'single-child'
      }
    ],
    'react/jsx-equals-spacing': [
      'error',
      'never'
    ],
    'react/jsx-indent': [
      'error',
      2
    ],
    'react/jsx-curly-spacing': [
      'warn',
      {
        when: 'never',
        children: true
      }
    ],
    'react/no-unknown-property': 'error',
    'react/no-string-refs': 'error',
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    'react/jsx-child-element-spacing': 'error',
    'react/no-unstable-nested-components': 'error',
    'react/boolean-prop-naming': [
      'error',
      {
        rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+'
      },
    ],
    'react/default-props-match-prop-types': 'error',
    'react/no-danger-with-children': 'error',
    'react/style-prop-object': 'error',
    'react/jsx-no-constructed-context-values': 'error',

    // General JavaScript rules
    'no-console': 'error',
    'no-unused-vars': 'error',
    'prefer-const': 'warn',
    'no-var': 'error',
    eqeqeq: [
      'error',
      'always'
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxEOF: 1
      }
    ],
    'arrow-body-style': [
      'error',
      'as-needed'
    ],
    'no-param-reassign': 'error',
    'no-shadow': 'error',
    'no-nested-ternary': 'error',
    'no-return-await': 'error',
    'max-lines-per-function': [
      'warn',
      {
        max: 50,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'react/no-adjacent-inline-elements': 'error',
    'no-await-in-loop': 'warn',
    'no-else-return': 'warn',
    'no-useless-return': 'warn',
    'prefer-arrow-callback': 'warn',
    'no-unused-expressions': 'error',
    'no-loop-func': 'error',
    'no-template-curly-in-string': 'warn',
    'no-floating-decimal': 'error',
    'no-multi-spaces': 'error',
    'no-whitespace-before-property': 'error',
    'space-before-blocks': 'error',
    'arrow-spacing': 'error',
    'prefer-spread': 'error',
    'array-callback-return': 'error',
    'no-duplicate-imports': 'error',
    'no-const-assign': 'error',
    'no-unreachable': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    camelcase: [
      'warn',
      {
        properties: 'never'
      }
    ],
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: 'always',
        ExportDeclaration: 'always',
        ObjectExpression: {
          multiline: true,
          minProperties: 1,
        },
        ObjectPattern: {
          multiline: true,
          minProperties: 1,
        },
      },
    ],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false
      },
    ],
    'function-paren-newline': [
      'error',
      'multiline'
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector:
          'CallExpression[callee.type=MemberExpression][callee.property.name=/^(every|filter|find|findIndex|findLast|findLastIndex|flatMap|forEach|group|groupToMap|map|reduce|reduceRight|some)$/] IfStatement',
        message: 'Never use if in higher-order function',
      },
      {
        selector: 'DoWhileStatement',
        message: 'Never use do-while',
      },
      {
        selector: 'ForInStatement',
        message: 'Never use for-in',
      },
      {
        selector: 'ForOfStatement',
        message: 'Never use for-of',
      },
      {
        selector: 'ForStatement',
        message: 'Never use for',
      },
      {
        selector:
          'Identifier[name=/.+(Data|Info|(<?![gs]et)Item|List|Manager)$/]', // "Identifier[name=/.+(Data|Info|Item|List|Manager)$/]"
        message:
          "Not allowed to use 'Data', 'Info', 'Item', 'List', and 'Manager' as suffix of identifier.",
      },
      {
        selector: 'IfStatement IfStatement',
        message: 'Never use nested-if including else-if',
      },
      {
        selector: 'SwitchStatement',
        message: 'Never use switch',
      },
    ],
    'max-len': [
      'off',
      {
        code: 80,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
      },
    ],
    'max-depth': [
      'warn',
      3
    ],
    'max-nested-callbacks': [
      'warn',
      3
    ],
    'max-params': [
      'warn',
      4
    ],
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems: 2
      }
    ],
    'array-element-newline': [
      'error',
      {
        multiline: true,
        minItems: 2
      }
    ],
    'no-trailing-spaces': 'error',
    'eol-last': [
      'error',
      'always'
    ],
    'padded-blocks': [
      'error',
      'never'
    ],
    'space-in-parens': [
      'error',
      'never'
    ],
    'array-bracket-spacing': [
      'error',
      'never'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'no-promise-executor-return': 'error',
    'prefer-promise-reject-errors': 'error',
    'no-unused-private-class-members': 'error',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true
      },
    ],
    'no-lone-blocks': 'error',
    'no-unneeded-ternary': 'error',
    'indent': [
      'error',
      2
    ],
    complexity: [
      'error',
      {
        max: 8,
      },
    ],
    'consistent-return': [
      'error',
      {
        treatUndefinedAsUnspecified: true, // false
      },
    ],

    // Import rules
    'import/no-unresolved': 'off',
    'import/newline-after-import': [
      'error',
      {
        count: 1
      }
    ],
    'import/max-dependencies': [
      'warn',
      {
        max: 15
      }
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node.js built-in modules
          'external', // npm-installed packages
          'internal', // Paths aliased to internal folders
          'parent', // Imports from parent directories
          'sibling', // Imports from sibling directories
          'index', // Index imports
          'object', // Object imports
          'type', // Type imports
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '~/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-duplicates': 'error',
    'semi': [
      'error',
      'never'
    ],

    // Tailwindcss rules
    'tailwindcss/classnames-order': 'error',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/no-contradicting-classname': 'error',
    'tailwindcss/enforces-negative-arbitrary-values': 'error',
    'tailwindcss/enforces-shorthand': 'warn',
    'tailwindcss/migration-from-tailwind-2': 'warn',
    'tailwindcss/no-arbitrary-value': 'off',
  },
}
module.exports = config
