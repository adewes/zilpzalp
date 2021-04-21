const defaultConfig = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
    ],
    "rules": {
        "eqeqeq": "error",
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "linebreak-style": ["error", "unix"],
        "no-alert": "error",
        "no-unused-vars": ["error", { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }],
        "no-confusing-arrow": "error",
        "no-console": ["error", {"allow": ["warn", "error"]}],
        "no-implied-eval": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "prettier/prettier": "warn",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-throw-literal": "error", // only allow Errors to be thrown; the name is a historical artifact
        "no-trailing-spaces": "error",
        "no-var": "error",
        "prefer-const": "error",
        "yoda": "error",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/prop-types": "warn", // to become an error
        "react/default-props-match-prop-types": "error",
        "react/forbid-foreign-prop-types": "error",
        "react/no-unused-prop-types": "error",
        "react/sort-prop-types": "off",
        "react/no-string-refs": "warn", // to become an error
        "eol-last": ["error", "always"],
    },
};

module.exports = {
    ...defaultConfig,
    "env": {
        "browser": true,
        "es6": true,
    },
    "globals": {
        "Atomics": "readonly",
        "Buffer": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
    },
    "plugins": [
        "react",
        "prettier"
    ],
    "settings": {
        "react": {
            "version": "detect",
        },
    },
    "overrides": [
        {
            // enable the rule specifically for TypeScript files
            "files": ["*.ts", "*.tsx"],
            "extends": [
                // Import the global config, because defining `extends` clears
                // all rules of an override.
                ...defaultConfig.extends,

                // Extending this sets the parser to @typescript-eslint/parser
                "plugin:@typescript-eslint/recommended",

                // Disabled because further configuration is required.
                //"plugin:@typescript-eslint/recommended-requiring-type-checking",
            ],
            // We also need to re-apply the rules, because defining `extends`
            // clears all rules of an override.
            rules: {
                ...defaultConfig.rules,
                "no-dupe-class-members": "off", // overloads are mistaken for dupes
            },
        }
    ]
};
