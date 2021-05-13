const rules = require('@rbkmoney/eslint-plugin/lib/rules');

const baseTsRules = {
    ...rules.createImportOrderRule({
        internalPathsPattern: '@cc/**',
    }),
    // TODO: pretenders for error
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-misused-promises': 'warn',
    '@typescript-eslint/unbound-method': 'warn',
    '@typescript-eslint/restrict-plus-operands': 'warn',
    '@typescript-eslint/restrict-template-expressions': 'warn',
};

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    ignorePatterns: ['**/gen-*/**/*'],
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: ['tsconfig.json', 'e2e/tsconfig.json'],
                createDefaultProgram: true,
            },
            extends: [
                'plugin:@rbkmoney/typescript',
                'plugin:@rbkmoney/angular',
                'plugin:@rbkmoney/lodash',
                'plugin:@rbkmoney/prettier',
            ],
            rules: {
                ...baseTsRules,
                ...rules.createAngularSelectorRules({ prefix: 'cc' }),
                // TODO: pretenders for error
                '@typescript-eslint/no-floating-promises': 'warn',
            },
        },
        {
            files: ['*.spec.ts'],
            parserOptions: {
                project: ['tsconfig.json', 'e2e/tsconfig.json'],
                createDefaultProgram: true,
            },
            extends: [
                'plugin:@rbkmoney/typescript',
                'plugin:@rbkmoney/angular',
                'plugin:@rbkmoney/jasmine',
                'plugin:@rbkmoney/lodash',
                'plugin:@rbkmoney/prettier',
            ],
            rules: baseTsRules,
        },
        {
            files: ['*.html'],
            extends: ['plugin:@angular-eslint/template/recommended'],
            rules: {
                // TODO: pretenders for error
                '@angular-eslint/template/no-negated-async': 'warn',
            },
        },
    ],
};
