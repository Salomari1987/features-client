/**
 * These rules enforce Hack Reactor's style guide.
 * Visit this repo for more information:
 * https://github.com/hackreactor-labs/eslint-config-hackreactor
 */

module.exports = {
    env: {
        "browser" : true,
        "node" : true,
        'es6': true
    },
    parserOptions: {
        "sourceType": "module",
        ecmaFeatures: {
            'jsx': true
        }
    },
    rules: {
        /* Indentation */
        'no-mixed-spaces-and-tabs': 2,
        'indent': [2, 2],
        /* Variable cames */
        'camelcase': 2,
        /* Language constructs */
        'curly': 2,
        'eqeqeq': [2, 'smart'],
        'func-style': [2, 'expression'],
        /* Semicolons */
        'semi': 2,
        'no-extra-semi': 2,
        /* Padding & additional whitespace (perferred but optional) */
        'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
        'semi-spacing': 1,
        'key-spacing': 1,
        'block-spacing': 1,
        'comma-spacing': 1,
        'no-multi-spaces': 1,
        'space-before-blocks': 1,
        'keyword-spacing': [1, { 'before': true, 'after': true }],
        'space-infix-ops': 1,
        /* Variable declaration */
        'one-var': [1, { 'uninitialized': 'always', 'initialized': 'never' }],
        /* Minuta */
        'comma-style': [2, 'last'],
        'quotes': [1, 'single'],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    },
    "ecmaFeatures": {
        "modules": true,
        "spread" : true,
        "restParams" : true
    },
    "plugins": [
        "react"
    ],
    "settings": {
        "react": {
            "createClass": "createClass",
            "pragma": "React",
            "version": "14.0"
        }
    },
};